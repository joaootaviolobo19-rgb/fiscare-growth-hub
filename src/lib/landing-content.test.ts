import { describe, expect, it } from "vitest";

import { faqGroups, serviceNames, services, socialProofPhrases } from "./landing-content";

const wordQuestions = [
  "A Fiscare atende MEI?",
  "Preciso contratar todas as áreas?",
  "Já tenho contador. Posso contratar a Fiscare?",
  "A Fiscare atende empresas de qualquer porte?",
  "Como funciona o BPO Financeiro?",
  "Como funciona a contratação?",
  "Quanto custa a assessoria?",
  "Como funciona o diagnóstico gratuito?",
];

describe("conteúdo da landing", () => {
  const questions = faqGroups.flatMap((group) => group.items);
  const asked = questions.map((item) => item.question);

  it("mantém as oito perguntas do documento", () => {
    for (const question of wordQuestions) expect(asked).toContain(question);
  });

  it("não promete preço, percentual nem prazo nas respostas", () => {
    for (const item of questions) {
      expect(item.answer).not.toMatch(/R\$|%|\b\d+\s*(dias?|semanas?|meses?)\b/i);
    }
  });

  it("explica o preço pelo escopo e pelo diagnóstico gratuito", () => {
    const pricing = questions.find((item) => item.question === "Quanto custa a assessoria?");
    expect(pricing?.answer).toMatch(/escopo/i);
    expect(pricing?.answer).toMatch(/diagnóstico gratuito/i);
  });

  it("mantém os seis serviços com os nomes novos", () => {
    expect(services).toHaveLength(6);
    expect(serviceNames).toContain("BPO Financeiro (Assessoria Financeira)");
    expect(serviceNames).toContain("Contabilidade e Gestão Tributária");
  });

  it("tem seis frases de prova social na voz da Fiscare", () => {
    expect(socialProofPhrases).toHaveLength(6);
    for (const phrase of socialProofPhrases) expect(phrase.length).toBeGreaterThan(20);
    expect(socialProofPhrases.join(" ")).not.toContain("@");
  });
});
