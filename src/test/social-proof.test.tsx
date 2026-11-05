import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SocialProof } from "@/components/fiscare/SocialProof";
import { socialProofPhrases } from "@/lib/landing-content";

const motion = { reduced: false };

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => motion.reduced };
});

describe("SocialProof", () => {
  beforeEach(() => {
    motion.reduced = false;
  });

  it("mostra a primeira frase e avança com o controle", async () => {
    render(<SocialProof />);

    expect(
      screen.getByRole("heading", { name: "O que você pode esperar da gente." }),
    ).toBeInTheDocument();
    expect(screen.getByText(socialProofPhrases[0])).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Próxima frase" }));

    expect(await screen.findByText(socialProofPhrases[1])).toBeInTheDocument();
  });

  it("não oferece nenhum link dentro da seção", () => {
    render(<SocialProof />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("vira uma grade estática quando o visitante pede menos movimento", () => {
    motion.reduced = true;
    render(<SocialProof />);

    for (const phrase of socialProofPhrases) {
      expect(screen.getByText(phrase)).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "Próxima frase" })).not.toBeInTheDocument();
  });
});
