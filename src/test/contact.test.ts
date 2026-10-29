import { describe, expect, it } from "vitest";

import { whatsappDisplay, whatsappLink, whatsappMessages } from "@/lib/contact";

describe("Contato pelo WhatsApp", () => {
  it("abre o número da Fiscare com a mensagem já preenchida", () => {
    const url = new URL(whatsappLink(whatsappMessages.contato));

    expect(`${url.origin}${url.pathname}`).toBe("https://wa.me/5551986165920");
    expect(url.searchParams.get("text")).toBe(whatsappMessages.contato);
  });

  it("tem uma mensagem própria para a oferta de saída", () => {
    expect(whatsappMessages.saida).not.toBe(whatsappMessages.contato);
  });

  it("mostra o número formatado com DDD", () => {
    expect(whatsappDisplay).toBe("(51) 98616-5920");
  });
});
