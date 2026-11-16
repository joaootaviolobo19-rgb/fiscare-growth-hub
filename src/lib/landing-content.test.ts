import { describe, expect, it } from "vitest";

import { faqGroups, googleReviews, serviceNames, services } from "./landing-content";

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

  it("mantém os sete serviços, com RH no meio da lista", () => {
    expect(services).toHaveLength(7);
    expect(serviceNames).toContain("BPO Financeiro (Assessoria Financeira)");
    expect(serviceNames).toContain("Contabilidade e Gestão Tributária");
    expect(services[3]?.title).toBe("RH (Recursos Humanos)");
    expect(services[3]?.items).toEqual([
      "Recrutamento e seleção",
      "Treinamento e desenvolvimento",
      "Clima e cultura organizacional",
    ]);
    for (const service of services) expect(service.items).toHaveLength(3);
  });

  it("mantém as avaliações reais copiadas do perfil do Google", () => {
    expect(googleReviews.rating).toBe("5,0");
    expect(googleReviews.count).toBe(12);
    expect(googleReviews.url).toContain("google.com/maps");
    expect(googleReviews.items).toHaveLength(4);

    for (const review of googleReviews.items) {
      expect(review.name.length).toBeGreaterThan(1);
      expect(review.text.length).toBeGreaterThan(20);
    }
  });
});
