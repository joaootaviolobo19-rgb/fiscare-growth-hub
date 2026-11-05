import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    };

    element.addEventListener("pointermove", move);
    return () => {
      element.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return ref;
}
