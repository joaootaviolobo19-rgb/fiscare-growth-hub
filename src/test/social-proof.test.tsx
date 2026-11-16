import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SocialProof } from "@/components/fiscare/SocialProof";
import { googleReviews } from "@/lib/landing-content";

const motion = { reduced: false };

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => motion.reduced };
});

const STEP = 356;

function armGeometry(container: HTMLElement) {
  const viewport = screen.getByRole("region", { name: "Avaliações de clientes no Google" });
  const track = container.querySelector(".reviews-track") as HTMLElement;
  Array.from(track.children).forEach((slide, index) => {
    Object.defineProperty(slide, "offsetLeft", { value: index * STEP, configurable: true });
  });
  const scrollTo = vi.fn();
  Object.defineProperty(viewport, "scrollTo", { value: scrollTo, configurable: true });
  // jsdom não tem layout: scrollLeft precisa de um backing store para o arraste ser observável.
  let left = 0;
  Object.defineProperty(viewport, "scrollLeft", {
    configurable: true,
    get: () => left,
    set: (value: number) => {
      left = value;
    },
  });
  fireEvent(window, new Event("resize"));
  return { viewport, scrollTo };
}

describe("SocialProof", () => {
  beforeEach(() => {
    motion.reduced = false;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("mostra só o título novo, a nota e o link do Google", () => {
    render(<SocialProof />);

    expect(screen.getByRole("heading", { name: "Quem já confia na Fiscare." })).toBeInTheDocument();
    expect(screen.queryByText("AVALIAÇÕES NO GOOGLE")).not.toBeInTheDocument();
    expect(screen.queryByText(/Depoimentos reais/)).not.toBeInTheDocument();
    expect(screen.getByText(googleReviews.rating)).toBeInTheDocument();
    expect(screen.getByText(`${googleReviews.count} avaliações`)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Ver todas no Google/ });
    expect(link).toHaveAttribute("href", googleReviews.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("expõe as quatro avaliações reais uma única vez para leitores de tela", () => {
    render(<SocialProof />);

    expect(screen.getAllByRole("group")).toHaveLength(googleReviews.items.length);
    for (const review of googleReviews.items) {
      expect(screen.getAllByText(review.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(review.text).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByRole("img", { name: "5 de 5 estrelas" })).toHaveLength(
      googleReviews.items.length,
    );
  });

  it("avança e volta um cartão por vez com as setas", () => {
    const { container } = render(<SocialProof />);
    const { viewport, scrollTo } = armGeometry(container);

    fireEvent.click(screen.getByRole("button", { name: "Próxima avaliação" }));
    expect(scrollTo).toHaveBeenLastCalledWith({ left: STEP, behavior: "smooth" });

    viewport.scrollLeft = 0;
    fireEvent.click(screen.getByRole("button", { name: "Avaliação anterior" }));
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: googleReviews.items.length * STEP - STEP,
      behavior: "smooth",
    });
  });

  it("arrasta o trilho com o mouse e solta no pointerup", () => {
    const { container } = render(<SocialProof />);
    const { viewport } = armGeometry(container);

    // jsdom não tem PointerEvent: um MouseEvent com o tipo certo carrega clientX e pointerId.
    const pointer = (type: string, target: Element | Window, clientX: number) => {
      const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX, button: 0 });
      Object.defineProperty(event, "pointerId", { value: 7 });
      Object.defineProperty(event, "pointerType", { value: "mouse" });
      fireEvent(target, event);
    };

    pointer("pointerdown", viewport, 200);
    expect(viewport.className).toContain("is-dragging");

    pointer("pointermove", window, 140);
    expect(viewport.scrollLeft).toBe(60);

    pointer("pointerup", window, 140);
    expect(viewport.className).not.toContain("is-dragging");

    pointer("pointermove", window, 40);
    expect(viewport.scrollLeft).toBe(60);
  });

  it("gira sozinha e para quando o visitante pausa", () => {
    vi.useFakeTimers();
    const { container } = render(<SocialProof />);
    const { scrollTo } = armGeometry(container);

    act(() => vi.advanceTimersByTime(4300));
    expect(scrollTo).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Pausar rotação automática" }));
    expect(screen.getByRole("button", { name: "Retomar rotação automática" })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(9000));
    expect(scrollTo).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Retomar rotação automática" }));
    act(() => vi.advanceTimersByTime(4300));
    expect(scrollTo).toHaveBeenCalledTimes(2);
  });

  it("não gira sozinha quando o visitante pede menos movimento", () => {
    motion.reduced = true;
    vi.useFakeTimers();
    const { container } = render(<SocialProof />);
    const { scrollTo } = armGeometry(container);

    expect(
      screen.queryByRole("button", { name: "Pausar rotação automática" }),
    ).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(12000));
    expect(scrollTo).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Próxima avaliação" }));
    expect(scrollTo).toHaveBeenLastCalledWith({ left: STEP, behavior: "auto" });
  });
});
