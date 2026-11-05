import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  EMAILJS_NOT_CONFIGURED,
  leadTemplateParams,
  sendLead,
  type LeadFormData,
} from "@/lib/emailjs";

const send = vi.fn();

const RETRY_FIRST_DELAY = 600;
const RETRY_SECOND_DELAY = 1500;

vi.mock("@emailjs/browser", () => ({
  default: { send: (...args: unknown[]) => send(...args) },
}));

const base: LeadFormData = {
  name: "Maria Souza",
  phone: "(51) 98888-7777",
  email: "maria@empresa.com.br",
  company: "Souza Consultoria",
  industry: "Serviços",
  cnpj: "11.222.333/0001-81",
  hasNoCnpj: false,
  needs: ["Financeiro e fluxo de caixa", "Contabilidade e impostos"],
  message: "Quero organizar o caixa.",
};

const params = leadTemplateParams(base);

describe("leadTemplateParams", () => {
  it("maps the form to the template variables", () => {
    expect(params).toMatchObject({
      nome: "Maria Souza",
      whatsapp: "(51) 98888-7777",
      email: "maria@empresa.com.br",
      empresa: "Souza Consultoria",
      cnpj: "11.222.333/0001-81",
      possui_cnpj: "Sim",
      ramo: "Serviços",
      areas: "Financeiro e fluxo de caixa, Contabilidade e impostos",
      mensagem: "Quero organizar o caixa.",
      consentimento: "Sim — contato e uso dos dados para atendimento (LGPD)",
    });
  });

  it("fills the optional fields with readable defaults", () => {
    const mapped = leadTemplateParams(
      { ...base, cnpj: "", hasNoCnpj: true, message: "" },
      new Date("2026-11-04T17:32:00Z"),
    );

    expect(mapped).toMatchObject({
      cnpj: "Ainda não possui CNPJ",
      possui_cnpj: "Não",
      mensagem: "Nenhuma mensagem",
    });
    expect(mapped.enviado_em).toMatch(/04\/11\/2026/);
  });
});

describe("sendLead", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ status: 200 });
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template_test");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "public_test");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("sends the template with the v5 options object", async () => {
    await sendLead(params);

    expect(send).toHaveBeenCalledWith("service_test", "template_test", params, {
      publicKey: "public_test",
    });
  });

  it("retries a network failure and succeeds on the next attempt", async () => {
    vi.useFakeTimers();
    send.mockRejectedValueOnce(new Error("network")).mockResolvedValueOnce({ status: 200 });

    const delivery = sendLead(params);
    await vi.advanceTimersByTimeAsync(RETRY_FIRST_DELAY);

    await expect(delivery).resolves.toBeUndefined();
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("does not retry when the service answers a client error", async () => {
    const failure = { status: 400, text: "bad request" };
    send.mockRejectedValue(failure);

    await expect(sendLead(params)).rejects.toBe(failure);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("gives up after three attempts", async () => {
    vi.useFakeTimers();
    send.mockRejectedValue(new Error("network"));

    const delivery = sendLead(params);
    const result = expect(delivery).rejects.toThrow("network");
    await vi.advanceTimersByTimeAsync(RETRY_FIRST_DELAY + RETRY_SECOND_DELAY);
    await result;

    expect(send).toHaveBeenCalledTimes(3);
  });

  it("fails before any request when the environment is not configured", async () => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "");

    await expect(sendLead(params)).rejects.toThrow(EMAILJS_NOT_CONFIGURED);
    expect(send).not.toHaveBeenCalled();
  });
});
