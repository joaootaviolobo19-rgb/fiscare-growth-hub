import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/fiscare/shared";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Fiscare" },
      {
        name: "description",
        content: "Condições de uso da página e solicitação de diagnóstico Fiscare.",
      },
      { property: "og:title", content: "Termos de Uso | Fiscare" },
      {
        property: "og:description",
        content: "Condições do diagnóstico gratuito e da utilização do site Fiscare.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="legal-page">
      <Logo />
      <h1>Termos de Uso</h1>
      <p className="rounded-md bg-accent p-4 text-sm text-primary">
        Texto preliminar sujeito à revisão jurídica antes da publicação definitiva.
      </p>
      <h2>Diagnóstico gratuito</h2>
      <p>
        O diagnóstico inicial é gratuito e sem compromisso de contratação. Os serviços de
        assessoria, escopo e valores dependem de proposta específica e aprovação do cliente.
      </p>
      <h2>Informações fornecidas</h2>
      <p>
        Ao solicitar atendimento, informe dados corretos e apenas informações que você está
        autorizado a compartilhar. Evite enviar documentos, senhas ou dados sensíveis pelo
        formulário.
      </p>
      <h2>Canais de atendimento</h2>
      <p>
        O formulário deste site e a conversa pelo WhatsApp são os canais de contato da Fiscare. A
        conversa iniciada pelo WhatsApp começa com a mensagem de exemplo sugerida pela página, que
        pode ser editada antes do envio. As mesmas recomendações de cuidado com dados sensíveis
        valem para o WhatsApp.
      </p>
      <h2>Limites das informações</h2>
      <p>
        O conteúdo do site é informativo e não substitui uma análise individual do seu negócio. Não
        há garantia de resultado financeiro ou prazo de atendimento definido nesta página.
      </p>
      <Link to="/" className="mt-8 inline-block font-bold text-primary">
        ← Voltar à Fiscare
      </Link>
    </main>
  );
}
