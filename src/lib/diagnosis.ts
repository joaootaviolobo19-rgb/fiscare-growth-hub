import { z } from "zod";

export const industries = [
  "Comércio",
  "Serviços",
  "Indústria",
  "Saúde",
  "Tecnologia",
  "Ainda vou abrir",
  "Outro",
] as const;

export const needs = [
  "Fiscal e impostos",
  "Financeiro",
  "Abrir ou regularizar empresa",
  "Departamento pessoal",
  "Marketing digital",
  "Planejamento",
  "Ainda não sei",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Digite seu nome completo.").max(100, "Use até 100 caracteres."),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine(
      (value) =>
        /^\+?[\d\s()-]+$/.test(value) && [10, 11, 12, 13].includes(value.replace(/\D/g, "").length),
      "Informe um WhatsApp válido com DDD.",
    ),
  email: z.string().trim().email("Informe um e-mail válido.").max(255),
});

export const companySchema = z.object({
  company: z.string().trim().min(2, "Informe o nome da empresa ou seu projeto.").max(150),
  industry: z.enum(industries, {
    errorMap: () => ({ message: "Selecione o ramo de atuação." }),
  }),
});

export const diagnosisSchema = contactSchema.merge(companySchema).extend({
  needs: z.array(z.enum(needs)).min(1, "Escolha pelo menos uma opção.").max(7),
  message: z.string().trim().max(1000, "Use até 1.000 caracteres."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Autorize o contato para continuar." }),
  }),
});
