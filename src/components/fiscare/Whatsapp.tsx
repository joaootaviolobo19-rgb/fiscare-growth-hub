import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink, whatsappMessages } from "@/lib/contact";

const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

export function WhatsappGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

export function WhatsappButton({
  message = whatsappMessages.contato,
  label = "Falar no WhatsApp",
  large = false,
  className = "inline-block",
}: {
  message?: string;
  label?: string;
  large?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? {} : { scale: 1.03 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={className}
    >
      <Button
        asChild
        variant="whatsapp"
        className={large ? "h-13 px-7 text-sm" : "h-11 px-5 text-xs"}
      >
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsappGlyph size={large ? 20 : 18} />
          {label}
        </a>
      </Button>
    </motion.div>
  );
}

export function WhatsappFloat() {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink(whatsappMessages.contato)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Falar com a Fiscare no WhatsApp"
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.5 }}
    >
      <span className="whatsapp-fab-ring" aria-hidden="true" />
      <WhatsappGlyph size={26} />
      <span className="whatsapp-fab-label">WhatsApp</span>
    </motion.a>
  );
}

const exitOfferSeenKey = "fiscare:oferta-whatsapp";

export function WhatsappExitOffer() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(exitOfferSeenKey)) return;

    let offered = false;

    function onMouseLeaving(e: MouseEvent) {
      if (offered || e.clientY > 0) return;
      if (window.matchMedia("(pointer: coarse), (max-width: 1023px)").matches) return;
      offered = true;
      sessionStorage.setItem(exitOfferSeenKey, "1");
      setOpen(true);
    }

    document.addEventListener("mouseout", onMouseLeaving);
    return () => document.removeEventListener("mouseout", onMouseLeaving);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Falar com a Fiscare no WhatsApp"
          className="exit-offer"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="exit-offer-close"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
          <h2>
            Antes de sair: fala direto com a
            <br />
            gente no WhatsApp.
          </h2>
          <p>
            Sem formulário, sem espera. Você conta o que está acontecendo na sua empresa e a Fiscare
            responde.
          </p>
          <WhatsappButton large message={whatsappMessages.saida} label="Abrir conversa agora" />
          <p className="exit-offer-note">A conversa abre direto com a equipe da Fiscare.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
