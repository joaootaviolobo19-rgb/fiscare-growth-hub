import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    // O SSR é implantado como Netlify Function, não como Edge Function; o emulador de
    // Edge Functions exige o runtime Deno e derruba o `vite dev` quando ele não está instalado.
    netlify({
      dev: { edgeFunctions: { enabled: false } },
    }),
  ],
});
