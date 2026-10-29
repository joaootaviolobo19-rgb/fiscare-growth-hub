# Fiscare — Landing Page

Landing page institucional da Fiscare Assessoria Empresarial: apresenta os serviços,
a equipe e converte visitantes por meio de um formulário de diagnóstico gratuito
em 3 etapas, que envia os dados por EmailJS, e do WhatsApp como canal direto.

## Stack

- [Vite](https://vitejs.dev) + [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- [Tailwind CSS 4](https://tailwindcss.com) + design tokens em `src/styles.css`
- [Framer Motion](https://motion.dev) para animações (com respeito a `prefers-reduced-motion`)
- [Zod](https://zod.dev) para validação do formulário (`src/lib/diagnosis.ts`)
- [EmailJS](https://www.emailjs.com) para entrega dos leads
- Tipografia Plus Jakarta Sans auto-hospedada (`public/fonts/`) — nenhum pedido a `fonts.googleapis.com`
- Deploy: Netlify (`netlify.toml`)

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Desenvolvimento

```sh
git clone https://github.com/joaootaviolobo19-rgb/fiscare-growth-hub.git
cd fiscare-growth-hub
npm install
npm run dev        # servidor local (o Vite informa o endereço no terminal)
npm test           # testes (vitest)
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build      # build de produção
```

As credenciais do EmailJS ficam em `.env` (`VITE_EMAILJS_SERVICE_ID`,
`VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`). Por serem públicas no
navegador, nunca coloque segredos de servidor em variáveis `VITE_*`.

O `npm run dev` não precisa do runtime Deno: o emulador de Netlify Edge Functions está desativado em
`vite.config.ts` porque o SSR é implantado como Netlify Function (o build de produção não muda).

## Estrutura

- `src/routes/` — rotas por arquivo (TanStack Start): `/` (landing), `/privacidade`, `/termos`.
  `routeTree.gen.ts` é gerado automaticamente; não edite à mão.
- `src/components/fiscare/` — seções da landing (`sections.tsx`), formulário (`DiagnosisForm.tsx`),
  fundadores (`Founders.tsx`), blocos compartilhados (`shared.tsx`) e controles de WhatsApp (`Whatsapp.tsx`).
- `src/components/ui/button.tsx` — único componente de UI base; novas variantes entram no `cva`
  de `buttonVariants` local ao arquivo.
- `src/lib/diagnosis.ts` — schemas Zod e listas (`industries`, `needs`) do formulário. É a fronteira
  de validação: qualquer receptor futuro dos dados deve revalidar com `diagnosisSchema`.
- `src/lib/contact.ts` — número do WhatsApp, mensagens pré-preenchidas e `whatsappLink()`. Todo ponto
  de contato no site sai daqui: para trocar o número, edite apenas este arquivo.

## Contato pelo WhatsApp

O visitante fala com a Fiscare em `(51) 98616-5920` por duas entradas: o botão flutuante, que fica
sempre na tela enquanto ele rola a página, e o número escrito no rodapé. Clicar em `wa.me` abre o
aplicativo do WhatsApp (extensão web de terceiros) com a conversa já iniciada.

Mantivemos o formulário como CTA principal e **de propósito** só essas duas entradas de WhatsApp —
repetir o número em cada seção transforma a landing em spam. Se a ideia mudar, o número e as mensagens
estão em `src/lib/contact.ts`.

A oferta de saída aparece quando o cursor deixa a janela pela parte de cima, uma vez por sessão e só
em telas largas com ponteiro fino; no celular o botão flutuante já cumpre esse papel.

## Publicação

O site roda no **Netlify** (`netlify.toml` + `@netlify/vite-plugin-tanstack-start`; o build gera
`dist/client` e a função em `.netlify/v1/functions/server.mjs`, incluindo as fotos dos fundadores).

O endereço `fiscare-growth-hub.vercel.app` ainda registrado como página inicial do repositório no
GitHub está morto (`DEPLOYMENT_NOT_FOUND`) — quem abre essa URL vê o site sem as fotos e sem páginas.
Substitua-a pela URL do Netlify para que o link anunciado aponte para o deploy real.

As três variáveis `VITE_EMAILJS_*` precisam existir também no site do Netlify (Site configuration →
Environment variables). Sem elas o build até passa, mas `import.meta.env` chega `undefined` no
navegador e o formulário quebra no ar com "Não foi possível enviar" — localmente funciona porque o
`.env` da sua máquina existe.

Os textos de privacidade e termos ainda aguardam revisão jurídica.
