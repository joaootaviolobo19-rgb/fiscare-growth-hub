import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFiscare from "@/assets/logo-fiscare.png";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 75, damping: 20, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {text.split(" ").map((word, i, all) => (
        <span key={`${word}-${i}`}>
          <motion.span
            className="reveal-word"
            initial={{ opacity: 0, y: "0.4em", filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < all.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Fiscare, início" data-light={light || undefined}>
      <img
        src={logoFiscare}
        alt="Fiscare Assessoria Empresarial"
        className={light ? "h-20 w-auto max-md:h-16" : "h-16 w-auto max-md:h-14"}
      />
    </Link>
  );
}

function scrollToForm() {
  const form = document.getElementById("diagnostico");
  form?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
  window.setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 600);
}

export function DiagnosisButton({
  large = false,
  shine = false,
}: {
  large?: boolean;
  shine?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-block"
    >
      <Button
        variant="cta"
        onClick={scrollToForm}
        className={`${large ? "h-13 px-7 text-sm" : "h-11 px-5 text-xs"} ${shine ? "btn-shine" : ""}`}
      >
        Quero meu diagnóstico
        <ArrowUpRight size={16} />
      </Button>
    </motion.div>
  );
}
