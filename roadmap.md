# Fiscare — roadmap da landing page

## Concluído

- Sistema de design da marca e todas as seções da página (hero, dores, dicionário, serviços, equipe, processo, FAQ, CTA final, rodapé).
- Formulário de diagnóstico em 3 etapas com validação Zod por etapa e envio real por EmailJS.
- Fotos reais dos fundadores, responsividade mobile-first e animações com respeito a `prefers-reduced-motion`.
- Rotas de Política de Privacidade e Termos de Uso com metadata própria.
- Projeto 100% independente: sem vínculo com editor/plataforma externa, sem pacotes ou telemetry de terceiros.
- 14 testes (regras do diagnóstico, roteamento, fluxo completo do formulário, links de WhatsApp e oferta de saída), lint e typecheck limpos.
- Rodapé com CNPJ real (69.194.376/0001-80), sem endereço fictício e com os três sociais da empresa
  (Facebook, LinkedIn e Instagram) no mesmo estilo de ícone.
- **WhatsApp (51) 98616-5920 como canal de atendimento**, com número e mensagens em uma única fonte
  (`src/lib/contact.ts` → `whatsappLink()`). São **duas entradas na página**: o botão flutuante que
  acompanha o visitante e o número escrito no rodapé. A pedido do dono, cortamos as outras dez
  (ícone do header, botão do hero, links de dores/dicionário/processo/FAQ, um link por cartão de
  serviço, rota de fuga no formulário e o ícone repetido entre os sociais do rodapé) — a página
  repetida de números passava a impressão de spam. O formulário continua o CTA primário.
- Oferta de saída (exit-intent) com o WhatsApp: dispara uma vez por sessão e só em desktop com pointer fino.
- Camada de animações novas: título do hero e do CTA revelados palavra a palavra (`RevealWords`),
  barra de progresso de leitura no header, reveals direcionais alternados nos serviços e stagger nos
  itens do FAQ, todos desativados quando o visitante pede `prefers-reduced-motion`.
- Os reveals direcionais mantêm o deslocamento inicial enquanto o cartão está fora da tela, o que
  alargava a página em ~8px no mobile; a seção `.services` usa `overflow-x: clip` para recortar o eixo
  horizontal sem afetar o `translateY` e a sombra do hover.
- Verde do WhatsApp (#25D366) restrito a superfícies escuras (botão flutuante, botão do pop-up e o
  número no rodapé, sobre o fundo navy). Os tokens claros que sobraram da fase anterior foram removidos
  junto com os links.
- **Fonte auto-hospedada:** o Plus Jakarta Sans variável (pesos 200-800, 27 kB em
  `public/fonts/plus-jakarta-sans-latin.woff2`) é servido pelo próprio site e pre-carregado no `<head>`.
  A página não faz mais nenhum pedido a `fonts.googleapis.com`/`fonts.gstatic.com`, que entregavam IP e
  user-agent de cada visitante ao Google — o único pedido a terceiro que restava.
- **Auditoria do formulário:** o payload ao EmailJS leva exatamente os 7 campos declarados (nome,
  WhatsApp, e-mail, empresa, ramo, áreas, mensagem) — sem IP, user-agent ou referrer; o `console.error`
  do envio roda só no navegador do visitante; nenhum dado pessoal vai para `localStorage`/`sessionStorage`.
  O envio real foi testado contra o EmailJS e respondeu `200 OK`.
- Corrigidos na auditoria: "Voltar ao formulário" mantinha o lead anterior preenchido (agora limpa o
  estado, com teste) e as mensagens de erro de "Ramo", "Precisa de ajuda com" e consentimento não eram
  anunciadas por leitor de tela (ligadas com `aria-describedby`).
- Política e Termos atualizados com o canal de WhatsApp, inclusive o aviso de que `wa.me` leva o
  visitante para fora do site.

## Pendente antes do lançamento

- **URL anunciada errada:** o site roda no Netlify, mas a página inicial do repositório no GitHub aponta para `fiscare-growth-hub.vercel.app`, que responde `DEPLOYMENT_NOT_FOUND`. É por abrir esse endereço morto que a foto dos fundadores parece sumida. Atualizar a URL do repositório para o endereço do Netlify.
- **Prova social:** não há depoimentos, cases ou números de resultados no site. É a alavanca de conversão
  mais citada nas referências de landing page, mas precisa de conteúdo real da Fiscare — não inventei
  clientes, avaliações nem percentuais. Escolher 2-3 depoimentos (nome, empresa e cidade autorizados)
  e/ou resultados agregados para a seção entre serviços e processo.
- **Vídeo:** um vídeo curto (fundadores explicando o diagnóstico, 30-60s) aumenta a retenção do hero.
  Precisamos do arquivo ou de um link hospedado (YouTube/Vimeo) para embutir sem pesar no carregamento.
- **Campos do formulário:** o e-mail ainda é obrigatório na etapa 1. As referências apontam conversão
  maior com menos campos — decidir se mantemos e-mail obrigatório, só WhatsApp obrigatório, etc.
- Revisão jurídica definitiva dos textos de privacidade e termos, e confirmação da razão social exibida junto ao CNPJ.
- Otimizar as fotos dos fundadores (~2,2 MB de PNG em `src/assets/`; WebP/AVIF reduziriam o peso de carregamento).
- Decidir se o EmailJS continua como transporte ou se o lead passa por uma server function própria (revalidando `diagnosisSchema` no servidor).
- **Credenciais do EmailJS são públicas por design.** As três `VITE_EMAILJS_*` entram no bundle do
  navegador (uma ocorrência cada em `dist/client`), então qualquer pessoa pode enviar e-mail pelo
  template da Fiscare, estourar a cota do plano e encher a caixa de entrada. O `.env` também esteve
  commitado e o repositório no GitHub é público: `git show 17aa970:.env` ainda revela os valores.
  Rotacionar não resolve (o navegador precisa das chaves); o que fecha isso é o relay acima, com
  revalidação do `diagnosisSchema` no servidor e limite de envio por IP.
- **Sem proteção anti-spam no formulário:** não há honeypot nem rate limit, e a validação é só do lado
  do navegador. Enquanto o transporte for o EmailJS direto, um bot consegue enviar leads falsos.
- **Consentimento sem prova:** o envio exige a marca de autorizar, mas o e-mail recebido não carrega
  data/hora nem origem do consentimento, que serviria de registro LGPD do "autorizo".

## Notas de ambiente

- `npm run dev` funcionava só com o runtime Deno instalado, porque o emulador de Netlify Edge Functions
  é carregado junto. Como o SSR é implantado em Netlify **Functions** (não Edge), o `vite.config.ts`
  agora passa `netlify({ dev: { edgeFunctions: { enabled: false } } })` — o dev server local sobe sem
  Deno e o build de produção continua idêntico.
