import { fireEvent, render, screen } from "@testing-library/react";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DiagnosisForm } from "@/components/fiscare/DiagnosisForm";

const send = vi.fn();

vi.mock("@emailjs/browser", () => ({
  default: { send: (...args: unknown[]) => send(...args) },
}));

async function renderForm() {
  const rootRoute = createRootRoute();
  const formRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: DiagnosisForm,
  });
  const router = createRouter({ routeTree: rootRoute.addChildren([formRoute]) });
  await router.load();
  render(<RouterProvider router={router} />);
}

function nextButton() {
  return screen.getByRole("button", { name: /Próximo/ });
}

function cnpjField() {
  return screen.getByLabelText(/^CNPJ/);
}

async function fillContact() {
  fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Maria Souza" } });
  fireEvent.change(screen.getByLabelText("WhatsApp"), { target: { value: "(11) 98888-7777" } });
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "maria@empresa.com.br" } });
  fireEvent.click(nextButton());
  await screen.findByLabelText("Nome da empresa");
}

async function fillCompany(cnpj = "11.222.333/0001-81") {
  fireEvent.change(screen.getByLabelText("Nome da empresa"), {
    target: { value: "Souza Consultoria" },
  });
  fireEvent.change(cnpjField(), { target: { value: cnpj } });
  fireEvent.change(screen.getByLabelText("Ramo de atuação"), { target: { value: "Serviços" } });
  fireEvent.click(nextButton());
  await screen.findByRole("checkbox", { name: "Financeiro e fluxo de caixa" });
}

async function fillRest() {
  fireEvent.click(screen.getByRole("checkbox", { name: "Financeiro e fluxo de caixa" }));
  fireEvent.change(screen.getByLabelText(/Quer contar mais/), {
    target: { value: "Quero organizar o negócio." },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: /Autorizo/ }));
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ }));
}

describe("DiagnosisForm", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({});
  });

  it("stays on the first step until the contact data is valid", async () => {
    await renderForm();

    fireEvent.click(nextButton());

    expect(await screen.findByText("Digite seu nome completo.")).toBeInTheDocument();
    expect(screen.queryByText("Nome da empresa")).not.toBeInTheDocument();
  });

  it("walks through the three steps and sends the lead with the CNPJ", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    await fillRest();
    submit();

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[2]).toEqual({
      nome: "Maria Souza",
      whatsapp: "(11) 98888-7777",
      email: "maria@empresa.com.br",
      empresa: "Souza Consultoria",
      cnpj: "11.222.333/0001-81",
      possui_cnpj: "Sim",
      ramo: "Serviços",
      areas: "Financeiro e fluxo de caixa",
      mensagem: "Quero organizar o negócio.",
      consentimento: "Sim — contato e uso dos dados para atendimento (LGPD)",
      enviado_em: expect.any(String),
    });
  });

  it("masks the CNPJ while the visitor types", async () => {
    await renderForm();
    await fillContact();

    fireEvent.change(cnpjField(), { target: { value: "11222333000181" } });

    expect(cnpjField()).toHaveValue("11.222.333/0001-81");
  });

  it("sends without a CNPJ when the visitor marks that option", async () => {
    await renderForm();

    await fillContact();
    fireEvent.change(screen.getByLabelText("Nome da empresa"), {
      target: { value: "Projeto Novo" },
    });
    fireEvent.change(cnpjField(), { target: { value: "11.222.333/0001-81" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /Ainda não tenho CNPJ/ }));
    expect(cnpjField()).toBeDisabled();
    expect(cnpjField()).toHaveValue("");
    fireEvent.change(screen.getByLabelText("Ramo de atuação"), {
      target: { value: "Serviços" },
    });
    fireEvent.click(nextButton());

    await screen.findByRole("checkbox", { name: "Financeiro e fluxo de caixa" });
    await fillRest();
    submit();

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send.mock.calls[0]?.[2]).toMatchObject({
      cnpj: "Ainda não possui CNPJ",
      possui_cnpj: "Não",
    });
  });

  it("still advances and sends when the CNPJ is invalid", async () => {
    await renderForm();

    await fillContact();
    fireEvent.change(screen.getByLabelText("Nome da empresa"), {
      target: { value: "Souza Consultoria" },
    });
    fireEvent.change(cnpjField(), { target: { value: "11.222.333/0001-80" } });
    expect(screen.getByText(/Confira o CNPJ/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Ramo de atuação"), {
      target: { value: "Serviços" },
    });
    fireEvent.click(nextButton());

    fireEvent.click(await screen.findByRole("checkbox", { name: "Financeiro e fluxo de caixa" }));
    fireEvent.click(screen.getByRole("checkbox", { name: /Autorizo/ }));
    submit();

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send.mock.calls[0]?.[2]).toMatchObject({ cnpj: "11.222.333/0001-80" });
  });

  it("clears the submitted lead when returning to the form", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    await fillRest();
    submit();
    fireEvent.click(await screen.findByRole("button", { name: /Voltar ao formulário/ }));

    expect(screen.getByLabelText("Seu nome")).toHaveValue("");
    expect(screen.getByLabelText("WhatsApp")).toHaveValue("");
    expect(screen.getByLabelText("E-mail")).toHaveValue("");

    fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Maria Souza" } });
    fireEvent.change(screen.getByLabelText("WhatsApp"), { target: { value: "(11) 98888-7777" } });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "maria@empresa.com.br" },
    });
    fireEvent.click(nextButton());

    expect(await screen.findByLabelText(/^CNPJ/)).toHaveValue("");
    expect(screen.getByRole("checkbox", { name: /Ainda não tenho CNPJ/ })).not.toBeChecked();
  });

  it("requires consent before sending", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    fireEvent.click(screen.getByRole("checkbox", { name: "Financeiro e fluxo de caixa" }));
    submit();

    expect(await screen.findByText("Autorize o contato para continuar.")).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });

  it("keeps every field and retries when the delivery fails", async () => {
    send.mockRejectedValue(new Error("network"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    await renderForm();

    await fillContact();
    await fillCompany();
    await fillRest();
    submit();

    const alert = await screen.findByRole("alert", {}, { timeout: 5_000 });
    expect(alert).toHaveTextContent("Não foi possível enviar.");
    expect(send).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByRole("button", { name: "Etapa anterior" }));
    expect(await screen.findByLabelText("Nome da empresa")).toHaveValue("Souza Consultoria");
    expect(cnpjField()).toHaveValue("11.222.333/0001-81");

    fireEvent.click(nextButton());
    const consent = await screen.findByRole("checkbox", { name: /Autorizo/ });
    expect(consent).toBeChecked();

    send.mockReset();
    send.mockResolvedValue({});
    submit();

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send).toHaveBeenCalledTimes(1);
  }, 10_000);

  it("sends only once on a double click", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    await fillRest();
    const button = screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("drops the delivery when the hidden field is filled", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    await fillRest();
    const trap = document.getElementById("fiscare_extra") as HTMLInputElement;
    fireEvent.change(trap, { target: { value: "https://spam.example" } });
    expect(trap).toHaveValue("https://spam.example");
    submit();

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });
});
