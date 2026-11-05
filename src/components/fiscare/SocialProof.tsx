import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { socialProofPhrases } from "@/lib/landing-content";
import { Reveal } from "./shared";

const ROTATION_MS = 6000;

const heading = (
  <Reveal>
    <p className="section-label">PARCERIA DE VERDADE</p>
    <h2 className="section-title">O que você pode esperar da gente.</h2>
    <p className="section-copy mt-5 max-w-85">
      Sem promessa vazia: é assim que a Fiscare trabalha com cada empresa que atende.
    </p>
  </Reveal>
);

export function SocialProof() {
  const reduced = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userNavigated, setUserNavigated] = useState(false);

  useEffect(() => {
    // A rotação continua depois de um clique: o visitante pode conduzir e a caixa volta sozinha.
    if (reduced || paused) return;
    const timer = setTimeout(
      () => setIndex((current) => (current + 1) % socialProofPhrases.length),
      ROTATION_MS,
    );
    return () => clearTimeout(timer);
  }, [index, paused, reduced]);

  function goTo(next: number) {
    setIndex((next + socialProofPhrases.length) % socialProofPhrases.length);
    setUserNavigated(true);
  }

  if (reduced) {
    return (
      <section id="parceria" className="section social-proof">
        <div className="site-container">
          {heading}
          <ul className="social-proof-grid">
            {socialProofPhrases.map((phrase) => (
              <li className="social-proof-card" key={phrase}>
                {phrase}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="parceria"
      className="section social-proof"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="site-container social-proof-inner">
        {heading}
        <div
          className="social-proof-stage"
          role="group"
          aria-roledescription="carrossel"
          aria-label="O que você pode esperar da gente"
        >
          <div className="social-quote">
            <span className="social-quote-mark" aria-hidden="true">
              “
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={index}
                className="social-quote-text"
                aria-live={userNavigated ? "polite" : "off"}
                aria-atomic="true"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {socialProofPhrases[index] ?? ""}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="social-proof-footer">
            <span className="social-count" aria-hidden="true">
              FRASE {String(index + 1).padStart(2, "0")} /{" "}
              {String(socialProofPhrases.length).padStart(2, "0")}
            </span>
            <div className="social-controls">
              <button
                type="button"
                className="social-nav"
                aria-label="Frase anterior"
                onClick={() => goTo(index - 1)}
              >
                <ArrowLeft size={15} />
              </button>
              <span className="social-dots">
                {socialProofPhrases.map((phrase, dot) => (
                  <button
                    key={phrase}
                    type="button"
                    className={`social-dot ${dot === index ? "is-active" : ""}`}
                    aria-label={`Ir para a frase ${dot + 1}`}
                    aria-current={dot === index ? "true" : undefined}
                    onClick={() => goTo(dot)}
                  />
                ))}
              </span>
              <button
                type="button"
                className="social-nav"
                aria-label="Próxima frase"
                onClick={() => goTo(index + 1)}
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
