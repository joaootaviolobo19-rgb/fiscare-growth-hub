# Fiscare — roadmap da landing page

## Concluído

- Sistema de design da marca e todas as seções da página (hero, dores, dicionário, prova social,
  serviços, processo, FAQ, CTA final, rodapé).
- Formulário de diagnóstico em 3 etapas com validação Zod por etapa e envio real por EmailJS.
- Responsividade mobile-first (320 a 1440) e animações com respeito a `prefers-reduced-motion`.
- Rotas de Política de Privacidade e Termos de Uso com metadata própria.
- Projeto 100% independente: sem vínculo com editor/plataforma externa, sem pacotes ou telemetry de terceiros.
- **35 testes** (regras do diagnóstico, máscara e validação de CNPJ, conteúdo da landing, roteamento,
  fluxo completo do formulário, falha e retentativa de envio, honeypot, prova social e links de WhatsApp),
  lint e typecheck limpos.
- Rodapé com CNPJ real (69.194.376/0001-80), sem endereço fictício e com os três sociais da empresa
  (Facebook, LinkedIn e Instagram) no mesmo estilo de ícone.
- **WhatsApp (51) 98616-5920 como canal de atendimento**, com número e mensagens em uma única fonte
  (`src/lib/contact.ts` → `whatsappLink()`). São **duas entradas na página**: o botão flutuante que
  acompanha o visitante e o número escrito no rodapé. A pedido do dono, cortamos as outras dez
  (ícone do header, botão do hero, links de dores/dicionário/processo/FAQ, um link por cartão de
  serviço, rota de fuga no formulário e o ícone repetido entre os sociais do rodapé) — a página
  repetida de números passava a impressão de spam. O formulário continua o CTA primário.
- Oferta de saída (exit-intent) com o WhatsApp: dispara uma vez por sessão e só em desktop com pointer fino.
- Camada de animações: título do hero e do CTA revelados palavra a palavra (`RevealWords`),
  barra de progresso de leitura no header, reveals direcionais alternados nos serviços e stagger nos
  itens do FAQ, todos desativados quando o visitante pede `prefers-reduced-motion`.
- Os reveals direcionais mantêm o deslocamento inicial enquanto o cartão está fora da tela, o que
  alargava a página em ~8px no mobile; a seção `.services` usa `overflow: hidden` para recortar a cena
  de fundo em parallax sem afetar o restante da página.
- Verde do WhatsApp (#25D366) restrito a superfícies escuras (botão flutuante, botão do pop-up e o
  número no rodapé, sobre o fundo navy). Os tokens claros que sobraram da fase anterior foram removidos
  junto com os links.
- **Fonte auto-hospedada:** o Plus Jakarta Sans variável (pesos 200-800, 27 kB em
  `public/fonts/plus-jakarta-sans-latin.woff2`) é servido pelo próprio site e pre-carregado no `<head>`.
  A página não faz mais nenhum pedido a `fonts.googleapis.com`/`fonts.gstatic.com`, que entregavam IP e
  user-agent de cada visitante ao Google — o único pedido a terceiro que restava.

### Mudanças pedidas pelo dono (Word) — concluídas

- **Seção dos sócios removida**: fotos, bios, faixa de avatares do hero, link `#equipe` do menu,
  componente e CSS. O menu ficou com "Nossas soluções", "Como funciona" e "Dúvidas".
- **Hero** com o subtítulo pedido: "Assessoria financeira, contábil, empresarial e marketing digital
  para empresas que querem crescer com organização, controle e planejamento."
- **Serviços renomeados**: BPO Financeiro (Assessoria Financeira), Contabilidade e Gestão Tributária,
  Departamento Pessoal, Marketing Digital, Abertura e Legalização, Consultoria e Planejamento.
  As frentes agora vêm de `src/lib/landing-content.ts`.
- **RH entrou no meio da lista** (posição 04, entre Departamento Pessoal e Marketing Digital):
  "RH (Recursos Humanos)", com recrutamento e seleção, treinamento e desenvolvimento, e clima e
  cultura organizacional. São sete frentes; o marquee e a numeração das linhas acompanham sozinhos.
- **CNPJ no diagnóstico** (`src/lib/diagnosis.ts`, `src/lib/cnpj.ts`): campo mascarado
  `XX.XXX.XXX/XXXX-XX` no meio da etapa da empresa, com checkbox "Ainda não possui CNPJ? Clique aqui."
  que desabilita e limpa o campo. **Nunca bloqueia o envio**: CNPJ vazio, inválido ou ausente passa;
  se os dígitos não fecharem aparece só o aviso "Confira o CNPJ — você pode enviar assim mesmo."
  (`aria-live`). A máscara aceita o CNPJ alfanumérico que entra em vigor em julho/2026
  (checksum ASCII-48; exemplo oficial `12.ABC.345/01DE-35` testado).
- **Payload do e-mail com 9 chaves fixas**: `nome`, `whatsapp`, `email`, `empresa`, `cnpj`,
  `possui_cnpj`, `ramo`, `areas`, `mensagem`. Sem CNPJ, `cnpj` vai como "Ainda não possui CNPJ" e
  `possui_cnpj` como "Não" — o clique na caixa fica registrado no e-mail. Nenhum campo do navegador
  (IP, user-agent, referrer) entra no objeto, e um teste compara o payload inteiro.
- **FAQ unificado em 3 grupos** (13 perguntas): "Sobre a Fiscare" (4), "Serviços" (5) e "Contratação" (4),
  incluindo "Quanto custa" respondida por escopo, sem preço, prazo, percentual ou número de clientes.
  Na tela, são três cartões curtos lado a lado (duas colunas no tablet, uma no celular), com contagem de
  perguntas por grupo e uma resposta aberta por vez — a seção deixou de ser uma lista longa e vazia.
- **Prova social da própria Fiscare**: seis frases na voz da marca em rotação automática (~6 s),
  com pausa no hover/foco, botões e indicadores. Não são depoimentos, não citam cliente, nota,
  métrica nem preço — o dono queria depoimentos inventados e recusamos (CDC art. 37).
- **Animação de alto impacto**, sem dependência nova:
  - hero entra coreografado em CSS (linhas do H1 em máscara, régua do eyebrow, subtítulo, dicionário,
    checks e formulário em escada) — funciona mesmo sem JS, ao contrário do `initial` do Framer;
  - "Como funciona" virou uma folha de protocolo: três passos em linhas separadas por tracejado, com
    numeral fantasma que se preenche no hover e seta do passo que gira de leve. A rolagem presa da
    versão anterior abria um vão branco e dava a sensação de travar a página; foi removida;
  - movimento ambiente: cena financeira em SVG (linha do gráfico, barras, mostrador e moeda) com
    parallax no hero e nos serviços, anel do CTA final girando devagar, sublinhado que cresce nos
    links do menu e traço de destaque que aparece nas dores;
  - spotlight que segue o ponteiro nos serviços e no CTA final, e botões magnéticos nos CTAs — só com
    ponteiro fino e sem `prefers-reduced-motion`;
  - carrossel de frases, marquee de serviços e reveals direcionais completam a camada.

### Redesenho visual e abertura animada

- **Abertura em cortina** (`IntroCurtain.tsx`): dois painéis navy com pinstripes se abrem ao meio
  enquanto a marca se encaixa — kicker, "Fiscare.", régua e as quatro frentes entram em sequência e o
  conjunto sai antes dos painéis. É 100% CSS (funciona sem JavaScript), não captura cliques e some
  por completo em `prefers-reduced-motion`. O hero começa a entrar em ~1,35 s, quando a fresta abre.
- **Hero reformulado**: manchete em quatro linhas com máscara no desktop e quebra natural no celular
  (30 px com `text-wrap: balance` em telas ≤379 para não deixar palavra órfã), cena financeira atrás
  do conteúdo com parallax de 130 px e os blocos entrando em escada. O formulário continua intacto.
- **Cena financeira** (`FinanceBackdrop.tsx`): SVG decorativo com a linha de gráfico desenhada (a
  assinatura da página), mapa-múndi em pontos, leituras numéricas, leque de guilhochês, velas sobre
  barras de volume, mostrador tracejado, moeda flutuante e marcas d'água de "%" e "R$". Reaproveitada
  no hero (`hero`) e nos serviços (`band`), com opacidades diferentes e `aria-hidden`. Abaixo de
  768 px a arte horizontal vira uma cena vertical compacta, para os motivos não serem recortados em
  ruído no celular.
- **Serviços em livro-caixa**: os seis cartões viraram linhas de uma tabela editorial — numeral,
  ícone fino, título e os três itens em colunas separadas por traços. No tablet os itens vão para
  duas colunas; no celular tudo empilha. O hover acende uma régua laranja no topo da linha.
- **Dores como caderno**: seis frases em régua de três colunas com aspas tipográficas penduradas
  acima de cada uma (sem ícone em círculo).
- **FAQ alinhado**: os três cartões passaram a ter a mesma altura no desktop, mantendo uma resposta
  aberta por vez e a contagem de perguntas no cabeçalho.
- **Menos "cara de IA"**: saíram a aurora em gradiente do hero, o brilho radial que derivava no cartão
  de prova social (substituído por uma pauta fixa) e o blur dos reveals; os serviços deixaram de ser
  cartões com ícone em círculo. Sobraram os movimentos que têm função (parallax, traço do gráfico,
  marquee, spotlight) e todos respeitam `prefers-reduced-motion`.
- Verificado em 1440, 768, 390 e 320 px: sem rolagem horizontal (`scrollWidth === clientWidth`), sem
  sobreposição do fundo sobre o texto e com o formulário renderizando normalmente.

### Entrega do lead à prova de falha

- **Retentativa**: até 3 tentativas (600 ms e 1.500 ms de espera) apenas para falha de rede, timeout
  ou `status >= 500`; erro 4xx não é repetido porque repetir não resolve.
- **Timeout de 15 s por tentativa**, para o botão nunca ficar preso em "Enviando…".
- A tela "Recebemos seus dados!" só aparece quando o EmailJS confirma. Em falha: mensagem clara,
  **todos os campos preservados** (CNPJ e checkbox inclusive), botão reabilitado para nova tentativa.
  Nada é limpo e nada vai para `localStorage`/`sessionStorage`.
- Guarda de duplo envio: `busy` desabilita o botão e um `if (busy || success) return` no topo do
  submit impede dois leads com dois cliques.
- **Honeypot**: campo `fiscare_extra` fora da tela, `tabIndex={-1}`, `aria-hidden`, `autoComplete="off"`;
  se vier preenchido o envio é descartado e o bot vê a tela de sucesso. Constante `HONEYPOT_ENABLED`
  desliga sem mexer no resto.
- Log de erro sem PII: só o status HTTP ou "falha de rede".
- **Decisão consciente**: o cooldown de 30 s após sucesso que estava no plano não foi implementado,
  porque impediria um segundo lead legítimo do mesmo navegador — e o dono pediu que o formulário
  nunca pare de funcionar.

### Auditoria do formulário

- O `console.error` do envio roda só no navegador do visitante; nenhum dado pessoal vai para storage.
- Corrigidos: "Voltar ao formulário" mantinha o lead anterior preenchido (agora limpa o estado, com
  teste) e as mensagens de erro de "Ramo", "Precisa de ajuda com" e consentimento não eram anunciadas
  por leitor de tela (ligadas com `aria-describedby`).
- Política e Termos atualizados com o canal de WhatsApp, o CNPJ entre os dados coletados, o aviso de
  que `wa.me` leva o visitante para fora do site e que a entrega passa pelo EmailJS.

### EmailJS revisado

- O transporte saiu de `DiagnosisForm.tsx` para `src/lib/emailjs.ts`: configuração lida das três
  `VITE_EMAILJS_*` (falha antes de qualquer tentativa quando falta alguma), envio com o objeto de
  opções do SDK 5 e o mesmo retry/timeout de antes.
- O lead agora leva também `consentimento` e `enviado_em`, fechando o registro mínimo do "autorizo"
  que faltava no e-mail. O total é de onze variáveis.
- Novo modelo pronto para colar no painel em `emailjs/template-diagnostico.html`, com as onze
  variáveis, assunto `Novo diagnóstico — {{empresa}}` e "Reply To" = `{{email}}`.
- Testes novos em `src/lib/emailjs.test.ts` cobrem o mapeamento das variáveis, o formato do payload,
  o retry de rede, a não repetição de 4xx e a falha rápida sem configuração.

### Avaliações do Google

- A prova social virou a nota **5,0 em 12 avaliações** reais do perfil da Fiscare no Google, com
  quatro depoimentos transcritos do perfil (André Valvassori, Caleandra Martins Velho, Thamyres
  Pereira e Pedro), estrelas, selo do Google, avatar de iniciais e link "Ver todas no Google".
- Os depoimentos rodam num carrossel que avança sozinho a cada 4,2s, com setas de anterior/próxima,
  botão de pausar/retomar, contador de posição e arraste/rolagem horizontal. O trilho repete os
  quatro cartões para emendar o loop sem salto; as cópias ficam `aria-hidden`.
- O carrossel pausa no hover, no foco, no arraste, fora da tela e com movimento reduzido (nesse caso
  o botão de pausa some e as setas pulam sem animação).
- O cabeçalho da seção ficou só com o título "Quem já confia na Fiscare." mais nota, total e link —
  sem o selo "AVALIAÇÕES NO GOOGLE" e sem subtítulo, como o dono pediu.
- Os textos e nomes vivem em `googleReviews` (`src/lib/landing-content.ts`) e só a ortografia foi
  ajustada; nada foi escrito pela equipe.
- A seção continua antes dos serviços e os testes conferem título, nota, total, textos, nomes,
  estrelas, link externo, setas, pausa e o caminho de movimento reduzido.

## Pendente antes do lançamento

- **URL anunciada errada:** o site roda no Netlify, mas a página inicial do repositório no GitHub
  aponta para `fiscare-growth-hub.vercel.app`, que responde `DEPLOYMENT_NOT_FOUND`. Atualizar para o
  endereço do Netlify.
- **Template do EmailJS:** colar `emailjs/template-diagnostico.html` no modelo atual do painel,
  ajustar o assunto para `Novo diagnóstico — {{empresa}}` e o "Reply To" para `{{email}}`. Se criar um
  modelo novo, copiar o id para `VITE_EMAILJS_TEMPLATE_ID` no `.env` e no Netlify.
- **Variáveis no Netlify:** as três `VITE_EMAILJS_*` precisam existir em Site configuration →
  Environment variables; sem elas o build passa e o formulário quebra no ar.
- **Quota do EmailJS:** conferir no painel se o plano tem folga (free = 200 e-mails/mês). Quota
  estourada derruba o envio e não há como corrigir no cliente.
- **Vídeo:** um vídeo curto (fundadores explicando o diagnóstico, 30-60s) aumenta a retenção do hero.
  Precisamos do arquivo ou de um link hospedado (YouTube/Vimeo) para embutir sem pesar no carregamento.
- **Campos do formulário:** o e-mail segue obrigatório na etapa 1 (decisão do dono). As referências
  apontam conversão maior com menos campos, então vale revisar quando houver dados reais de abandono
  por etapa.
- Revisão jurídica definitiva dos textos de privacidade e termos, e confirmação da razão social
  exibida junto ao CNPJ.
- Decidir se o EmailJS continua como transporte ou se o lead passa por uma server function própria
  (revalidando `diagnosisSchema` no servidor).
- **Credenciais do EmailJS são públicas por design.** As três `VITE_EMAILJS_*` entram no bundle do
  navegador (uma ocorrência cada em `dist/client`), então qualquer pessoa pode enviar e-mail pelo
  template da Fiscare, estourar a cota do plano e encher a caixa de entrada. O `.env` também esteve
  commitado e o repositório no GitHub é público: `git show 17aa970:.env` ainda revela os valores.
  Rotacionar não resolve (o navegador precisa das chaves); o que fecha isso é o relay acima, com
  revalidação do `diagnosisSchema` no servidor e limite de envio por IP.
- **Sem limite de envio:** o honeypot barra bots simples e a validação roda no navegador, mas não há
  rate limit por IP. Enquanto o transporte for o EmailJS direto, um bot dedicado ainda consegue enviar
  leads repetidos; só o relay no servidor resolve.
- **Consentimento:** o e-mail agora carrega `consentimento` e a data/hora de `enviado_em`, formando o
  registro mínimo do "autorizo". Falta a origem (IP) e uma trilha imutável — só o relay no servidor
  resolve.

## Notas de ambiente

- `npm run dev` funcionava só com o runtime Deno instalado, porque o emulador de Netlify Edge Functions
  é carregado junto. Como o SSR é implantado em Netlify **Functions** (não Edge), o `vite.config.ts`
  agora passa `netlify({ dev: { edgeFunctions: { enabled: false } } })` — o dev server local sobe sem
  Deno e o build de produção continua idêntico.
- O código publicado no GitHub está em `715434c`; falta só o deploy do lado do Netlify com as
  variáveis configuradas.
