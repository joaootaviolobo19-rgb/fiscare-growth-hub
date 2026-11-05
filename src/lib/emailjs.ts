export type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  company: string;
  industry: string;
  cnpj: string;
  hasNoCnpj: boolean;
  needs: string[];
  message: string;
};

/**
 * Variáveis lidas pelo modelo de e-mail (`emailjs/template-diagnostico.html`).
 * O modelo e este objeto precisam caminhar juntos: campo sem `{{campo}}` no
 * modelo simplesmente não aparece na mensagem.
 */
export type LeadTemplateParams = {
  nome: string;
  whatsapp: string;
  email: string;
  empresa: string;
  cnpj: string;
  possui_cnpj: string;
  ramo: string;
  areas: string;
  mensagem: string;
  consentimento: string;
  enviado_em: string;
};

export const EMAILJS_NOT_CONFIGURED = "emailjs-not-configured";

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS = [600, 1500];
const TIMEOUT_MS = 15_000;

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export function leadTemplateParams(data: LeadFormData, now = new Date()): LeadTemplateParams {
  return {
    nome: data.name,
    whatsapp: data.phone,
    email: data.email,
    empresa: data.company,
    cnpj: data.hasNoCnpj ? "Ainda não possui CNPJ" : data.cnpj || "Não informado",
    possui_cnpj: data.hasNoCnpj ? "Não" : "Sim",
    ramo: data.industry,
    areas: data.needs.join(", "),
    mensagem: data.message || "Nenhuma mensagem",
    // O envio só acontece com o consentimento marcado, então este registro sempre foi autorizado.
    consentimento: "Sim — contato e uso dos dados para atendimento (LGPD)",
    enviado_em: dateFormat.format(now),
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function isRetryable(error: unknown) {
  const status = (error as { status?: unknown } | null)?.status;
  return typeof status !== "number" || status >= 500;
}

function readConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  // Sem as três variáveis o envio é impossível: falhamos antes de gastar tentativas.
  if (!serviceId || !templateId || !publicKey) throw new Error(EMAILJS_NOT_CONFIGURED);
  return { serviceId, templateId, publicKey };
}

export async function sendLead(params: LeadTemplateParams): Promise<void> {
  const { serviceId, templateId, publicKey } = readConfig();
  const emailjs = (await import("@emailjs/browser")).default;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      await withTimeout(emailjs.send(serviceId, templateId, params, { publicKey }), TIMEOUT_MS);
      return;
    } catch (error) {
      if (attempt === MAX_ATTEMPTS - 1 || !isRetryable(error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS[attempt] ?? 1000));
    }
  }
}
