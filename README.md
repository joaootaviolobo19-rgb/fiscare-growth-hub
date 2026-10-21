# Fiscare Growth Hub

Landing page institucional desenvolvida para a Fiscare Assessoria Empresarial. O projeto apresenta os serviços da empresa, organiza conteúdos informativos sobre temas financeiros e oferece um fluxo de diagnóstico para potenciais clientes.

**Demonstração:** [fiscare-growth-hub.vercel.app](https://fiscare-growth-hub.vercel.app)

## Funcionalidades

- Apresentação institucional e navegação pelas áreas de serviço.
- Conteúdo interativo com conceitos financeiros e contábeis.
- Formulário de diagnóstico em três etapas, com validação dos dados.
- Páginas dedicadas aos termos de uso e à política de privacidade.
- Interface responsiva e componentes de navegação e apresentação reutilizáveis.

O formulário está configurado como uma demonstração com estrutura pronta para integração. No estado atual, os dados não são enviados a um serviço de recebimento.

## Tecnologias

- React e TypeScript
- TanStack Start e TanStack Router
- Vite
- Tailwind CSS
- React Hook Form e Zod
- Framer Motion
- Vitest e Testing Library

## Requisitos

- Node.js compatível com a versão de Vite definida no projeto
- npm ou Bun

## Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/joaootaviolobo19-rgb/fiscare-growth-hub.git
cd fiscare-growth-hub
```

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço local da aplicação.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção. |
| `npm run preview` | Serve localmente a versão gerada para pré-visualização. |
| `npm run lint` | Executa o ESLint. |
| `npm run test` | Executa os testes automatizados com Vitest. |

## Estrutura

- `src/components/`: componentes da interface.
- `src/hooks/`: hooks reutilizáveis.
- `src/lib/`: utilitários e lógica compartilhada.
- `src/routes/`: rotas da aplicação, incluindo as páginas institucionais e legais.
- `src/test/`: configuração e recursos de teste.
- `src/styles.css`: estilos globais.

## Desenvolvimento

Este repositório contém a implementação da experiência digital da Fiscare Growth Hub. O fluxo de diagnóstico ainda requer a conexão com um serviço de recebimento para processar solicitações reais.