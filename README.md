# Fiscare Growth Hub

:

🚀 SUPER PROMPT: Fiscare Landing Page (High-End Design)

Atue como um Designer de Produto Sênior e Desenvolvedor Frontend Especialista em UX/UI.
Crie uma landing page de alta conversão para a "Fiscare Assessoria Empresarial". O design deve ser premium, moderno, clean e transmitir extrema confiança. O site deve ser construído em React, Tailwind CSS, utilizando ícones da biblioteca lucide-react e animações suaves com framer-motion.

1. SISTEMA DE DESIGN (GLOBAL)

Cores:

Azul Escuro Principal (Autoridade): #0A2540

Azul Claro (Destaques/Ações): #2563EB

Laranja (CTA principal): #FF9900

Fundo Claro (Seções de leitura): #F8FAFC

Texto: #334155 (Cinza escuro) e Branco para fundos escuros.

Tipografia: Fonte Plus Jakarta Sans ou Inter. Títulos em font-bold ou font-extrabold, textos corridos em font-normal ou font-medium.

Micro-interações: Todos os botões devem ter transition-all duration-300 com efeito hover (mudança sutil de cor e scale-105). Cards devem ter hover com sombra mais profunda (shadow-xl) e elevação (-translate-y-1).

2. HEADER (Fixo)

Fundo branco com efeito de vidro (glassmorphism: bg-white/80 backdrop-blur-md) ao rolar a página.

Logo da Fiscare à esquerda (assuma um placeholder se não houver imagem).

Botão laranja "Quero meu diagnóstico" à direita. Ao clicar, deve rolar suavemente (smooth scroll) até o formulário no Hero.

3. SEÇÃO HERO (A Primeira Dobra)

Fundo: Azul Escuro #0A2540 com um padrão sutil de grid ou círculos geométricos abstratos ao fundo em opacidade baixa (10%).

Layout Desktop: Grid de 2 colunas (50% texto, 50% formulário). No Mobile, empilhar (formulário em cima ou embaixo do texto, com espaçamento adequado).

Coluna Esquerda (Copywriting):

Título: "Sua empresa inteira cuidada por uma só equipe, explicada do jeito que você entende."

Subtítulo: "Financeiro, impostos, funcionários, marketing e planejamento: a Fiscare assessora todas as frentes do seu negócio para você focar no que faz de melhor e crescer sem susto."

Animação: Aplique um efeito de "fade-in-up" (aparecer de baixo para cima) em cascata para o título e subtítulo ao carregar a página.

Card do Dicionário: Abaixo do texto, crie um card translúcido com borda sutil. Adicione um carrossel automático de 5 segundos que alterna entre termos como "Pró-labore", "Fluxo de caixa", etc., com uma barra de progresso laranja animada embaixo.

Coluna Direita (Formulário):

Card branco com sombra projetada forte (shadow-2xl), cantos arredondados (rounded-2xl).

MELHORIA DE UX: Transforme isso em um Formulário Multi-etapas (Wizard) para não assustar o usuário.

Etapa 1: Nome, WhatsApp, E-mail. Botão "Próximo".

Etapa 2: Nome da empresa, Ramo de atuação (Select). Botão "Próximo".

Etapa 3: "Precisa de ajuda com" (Checkboxes em formato de pílulas clicáveis, com estado ativo azul). Campo "Quer contar mais?". Checkbox de LGPD. Botão Laranja "Pedir diagnóstico gratuito".

Ao enviar, mostrar uma animação de sucesso (Check verde) e mensagem: "Recebemos seus dados! Entraremos em contato em breve."

4. SEÇÃO DORES (Identificação)

Fundo: #F8FAFC. Título em Azul Escuro: "Algum desses pensamentos já passou pela sua cabeça?"

Grid de 6 cards (3 colunas no desktop, 1 no mobile).

Correção de Design: Garanta que todos os cards tenham a mesma altura (h-full). Adicione um ícone de aspas no topo de cada card em opacidade baixa.

Textos dos cards (itálico, cinza escuro):

"Fatura bem, mas o dinheiro some antes do fim do mês."

"Será que estou pagando imposto demais?"

"Meu MEI está crescendo. E agora, o que muda?"

"Não sei quanto posso tirar da empresa para mim."

"Quero contratar, mas tenho medo da parte trabalhista."

"Minha empresa é boa, mas pouca gente conhece."

Abaixo do grid, texto centralizado em azul escuro: "Se você se identificou com pelo menos um, a gente pode ajudar."

5. SEÇÃO DICIONÁRIO (Tradução)

Fundo branco. Layout de 2 colunas.

Esquerda: Título "Sem juridiquês. A gente traduz." Subtítulo explicativo.

Direita: Uma lista interativa (Accordion ou linha do tempo). Cada item tem um termo em negrito azul escuro à esquerda e a explicação simples à direita. Termos: DAS, Regime tributário, Fluxo de caixa, eSocial, Tráfego pago, Faturamento x lucro.

Animação: Ao passar o mouse sobre o termo, a explicação deve ganhar destaque sutil (mudança de cor de fundo da linha).

6. SEÇÃO SERVIÇOS (Solução)

Fundo: Azul Escuro #0A2540. Título e subtítulo em branco.

Grid de 6 cards brancos com cantos arredondados. Garanta que todos tenham a mesma altura (h-full).

Adicione um ícone temático no topo de cada card (ex: ícone de gráfico para Financeiro).

Cards:

Assessoria Financeira (Com Tamires) - Ícone: Wallet

Fiscal e Tributária (Com Adoilson) - Ícone: FileText

Departamento Pessoal (Para quem tem ou vai ter equipe) - Ícone: Users

Marketing Digital (Para ser encontrado e vender mais) - Ícone: Megaphone

Abertura e Legalização (Do CNPJ às alterações) - Ícone: Briefcase

Consultoria e Planejamento (Para crescer com os pés no chão) - Ícone: TrendingUp

Animação: Efeito de hover: a borda do card fica laranja e ele sobe levemente.

7. SEÇÃO COMO FUNCIONA (Processo)

Fundo: #F8FAFC. Título: "Como funciona o diagnóstico gratuito".

Linha do tempo horizontal com 3 passos. No mobile, vira vertical.

Círculos numerados laranjas conectados por uma linha fina azul.

Passo 1: Você se cadastra. Passo 2: A gente analisa. Passo 3: Você recebe um plano.

Animação: A linha de conexão deve se "desenhar" na tela conforme o usuário rola a página (scroll reveal).

8. SEÇÃO FAQ (Dúvidas)

Fundo: #F8FAFC. Título à esquerda: "Dúvidas comuns".

À direita, um Accordion interativo.

Correção de UX: Substitua o "X" atual por um ícone de ChevronDown que gira 180 graus quando aberto. Adicione uma transição suave de altura ao abrir a resposta.

Perguntas: O diagnóstico é gratuito mesmo? / Preciso contratar todas as áreas? / Atendem MEI? / Já tenho contador. Faz sentido falar com vocês? / Ainda não abri minha empresa. Podem me ajudar? / Vocês cuidam da folha dos meus funcionários? / Como vocês vão entrar em contato?

9. CTA FINAL (Fechamento)

Fundo: Azul Claro #2563EB com formas geométricas abstratas em branco (opacidade 5%) ao fundo.

Título grande em branco à esquerda: "Descubra o que a sua empresa precisa para crescer organizada."

Subtítulo: "Leva menos de dois minutos."

Botão laranja grande à direita: "Quero meu diagnóstico". Ao clicar, rola para o formulário no topo.

10. FOOTER (Rodapé)

Fundo: Azul Escuro #0A2540.

Logo à esquerda.

CORREÇÃO DE ERRO CRÍTICO: Corrigir o ano de "2026" para "2024".

Adicionar links úteis: Política de Privacidade, Termos de Uso, e ícones de redes sociais (LinkedIn, Instagram).

Adicionar CNPJ fictício e endereço para dar veracidade.

11. REQUISITOS TÉCNICOS

O site deve ser 100% responsivo (Mobile-first).

Use framer-motion para animações de entrada (fade-up, stagger).

Crie componentes separados para Header, Hero, Formulário, Dores, Dicionário, Serviços, Processo, FAQ, CTA e Footer.

Garanta que o formulário esteja pronto para integração com Supabase ou envio de e-mail.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1524c965-e623-4dae-b039-c6ce8ae5a125).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
