import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

async function fillContact() {
  fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Maria Souza" } });
  fireEvent.change(screen.getByLabelText("WhatsApp"), { target: { value: "(11) 98888-7777" } });
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "maria@empresa.com.br" } });
  fireEvent.click(nextButton());
  await screen.findByLabelText("Nome da empresa");
}

async function fillCompany() {
  fireEvent.change(screen.getByLabelText("Nome da empresa"), {
    target: { value: "Souza Consultoria" },
  });
  fireEvent.change(screen.getByLabelText("Ramo de atuação"), { target: { value: "Serviços" } });
  fireEvent.click(nextButton());
  await screen.findByRole("checkbox", { name: "Financeiro" });
}

function fillNeeds() {
  fireEvent.click(screen.getByRole("checkbox", { name: "Financeiro" }));
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

  it("walks through the three steps and sends the lead", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    fillNeeds();
    fireEvent.change(screen.getByLabelText(/Quer contar mais/), {
      target: { value: "Quero abrir MEI." },
    });
    fireEvent.click(screen.getByRole("checkbox", { name: /Autorizo/ }));
    fireEvent.click(screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ }));

    expect(await screen.findByText("Recebemos seus dados!")).toBeInTheDocument();
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[2]).toEqual({
      nome: "Maria Souza",
      whatsapp: "(11) 98888-7777",
      email: "maria@empresa.com.br",
      empresa: "Souza Consultoria",
      ramo: "Serviços",
      areas: "Financeiro",
      mensagem: "Quero abrir MEI.",
    });
  });

  it("clears the submitted lead when returning to the form", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    fillNeeds();
    fireEvent.click(screen.getByRole("checkbox", { name: /Autorizo/ }));
    fireEvent.click(screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ }));
    fireEvent.click(await screen.findByRole("button", { name: /Voltar ao formulário/ }));

    expect(screen.getByLabelText("Seu nome")).toHaveValue("");
    expect(screen.getByLabelText("WhatsApp")).toHaveValue("");
    expect(screen.getByLabelText("E-mail")).toHaveValue("");
  });

  it("requires consent before sending", async () => {
    await renderForm();

    await fillContact();
    await fillCompany();
    fillNeeds();
    fireEvent.click(screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ }));

    expect(await screen.findByText("Autorize o contato para continuar.")).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });

  it("keeps the form usable when the delivery fails", async () => {
    send.mockRejectedValue(new Error("network"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    await renderForm();

    await fillContact();
    await fillCompany();
    fillNeeds();
    fireEvent.click(screen.getByRole("checkbox", { name: /Autorizo/ }));
    fireEvent.click(screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Não foi possível enviar.");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Pedir diagnóstico gratuito/ })).toBeEnabled(),
    );
  });
});
