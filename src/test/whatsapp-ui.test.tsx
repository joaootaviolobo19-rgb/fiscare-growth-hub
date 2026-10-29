import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { WhatsappExitOffer, WhatsappFloat } from "@/components/fiscare/Whatsapp";

beforeEach(() => sessionStorage.clear());

describe("Botão flutuante de WhatsApp", () => {
  it("abre a conversa da Fiscare em nova aba", () => {
    render(<WhatsappFloat />);

    const link = screen.getByRole("link", { name: "Falar com a Fiscare no WhatsApp" });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me/5551986165920"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Oferta de WhatsApp ao sair", () => {
  it("aparece quando o mouse deixa a página pelo topo e fecha com Esc", async () => {
    render(<WhatsappExitOffer />);

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent(document, new MouseEvent("mouseout", { clientY: -20 }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Antes de sair");

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("não reaparece na mesma sessão", async () => {
    render(<WhatsappExitOffer />);

    fireEvent(document, new MouseEvent("mouseout", { clientY: -20 }));
    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    fireEvent(document, new MouseEvent("mouseout", { clientY: -20 }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
