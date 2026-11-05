import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `useReducedMotion` lê a preferência do sistema já no primeiro render do cliente,
 * mas o servidor sempre renderiza sem preferência. Isso faz o HTML hidratar diferente
 * e o React refazer a árvore inteira. Aqui a preferência só passa a valer depois da
 * montagem, então servidor e primeiro render do cliente continuam idênticos.
 */
export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefersReduced);
}
