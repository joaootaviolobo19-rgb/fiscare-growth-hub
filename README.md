# Fiscare Growth Hub
### Landing Page Institucional de Alta Conversão

O **Fiscare Growth Hub** é uma landing page institucional desenvolvida para a Fiscare Assessoria Empresarial, com foco na conversão de visitantes em potenciais clientes. A plataforma combina uma apresentação estratégica da empresa, um dicionário interativo de termos financeiros e contábeis e um formulário inteligente de múltiplas etapas para qualificação de leads.

**Demonstração online:** https://fiscare-growth-hub.vercel.app

---

## Principais Funcionalidades

**Formulário Multietapas (Wizard)**

Fluxo intuitivo e organizado para coletar informações e qualificar potenciais clientes de maneira dinâmica, tornando o preenchimento mais simples e eficiente.

**Dicionário Financeiro Interativo**

Componente educativo que simplifica conceitos contábeis, financeiros e fiscais, tornando essas informações mais acessíveis para pequenas e médias empresas (PMEs).

**Design Orientado às Necessidades do Cliente**

Seções estratégicas voltadas aos principais desafios da gestão empresarial, apresentando soluções alinhadas às necessidades dos empreendedores.

**Experiência Mobile-First**

Interface responsiva, desenvolvida para oferecer uma experiência consistente e intuitiva em smartphones, tablets e computadores.

**Animações e Microinterações**

Utilização do Framer Motion para implementar animações fluidas e transições que tornam a navegação mais dinâmica e refinada.

---

## Tecnologias e Ferramentas

- React e TypeScript para o desenvolvimento da interface.
- Tailwind CSS para estilização e responsividade.
- Framer Motion para animações e microinterações.
- Vite para execução do ambiente de desenvolvimento e geração da versão de produção.
- Vitest para testes automatizados.

---

## Como Executar o Projeto

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/joaootaviolobo19-rgb/centro-de-crescimento-fiscal.git
```

Acesse a pasta do projeto:

```bash
cd centro-de-crescimento-fiscal
```

### 2. Instalar as dependências

Utilizando npm:

```bash
npm install
```

Ou, utilizando Bun:

```bash
bun install
```

### 3. Iniciar o servidor de desenvolvimento

Com npm:

```bash
npm run dev
```

Com Bun:

```bash
bun run dev
```

Após iniciar o servidor, acesse o endereço informado no terminal. Por padrão, o Vite utiliza:

http://localhost:5173

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão otimizada para produção. |
| `npm run preview` | Permite visualizar localmente a versão de produção. |
| `npm run test` | Executa os testes automatizados utilizando Vitest. |

---

## Arquitetura do Projeto

A aplicação segue uma estrutura modular, organizada para facilitar a manutenção, a reutilização de componentes e a evolução do sistema.

```text
src/
├── assets/       # Logotipos, imagens e recursos estáticos
├── components/   # Componentes da interface
│   ├── Header
│   ├── Hero
│   ├── FAQ
│   └── Form
├── styles/       # Estilos globais e configurações do Tailwind CSS
├── types/        # Definições e tipagens do TypeScript
└── App.tsx       # Ponto de entrada da aplicação
```

---

## Desenvolvedor

**João Otávio da Silva Lobo**

Projeto concebido e desenvolvido para a marca **Fiscare Assessoria Empresarial**, com foco em experiência do usuário, comunicação estratégica, educação financeira e conversão digital.
