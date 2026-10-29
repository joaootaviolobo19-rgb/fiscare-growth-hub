import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/fiscare/shared";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Fiscare" },
      {
        name: "description",
        content: "Conheça as diretrizes de privacidade e tratamento de dados da Fiscare.",
      },
      { property: "og:title", content: "Política de Privacidade | Fiscare" },
      {
        property: "og:description",
        content: "Informações sobre dados pessoais e contato com a Fiscare.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="legal-page">
      <Logo />
      <h1>Política de Privacidade</h1>
      <p className="rounded-md bg-accent p-4 text-sm text-primary">
        Texto preliminar para revisão jurídica antes da publicação definitiva.
      </p>
      <h2>Dados e finalidade</h2>
      <p>
        O formulário solicita nome, WhatsApp, e-mail, dados da empresa e áreas em que você busca
        ajuda. Esses dados são enviados à equipe da Fiscare por serviço de e-mail e usados apenas
        para responder ao seu pedido de diagnóstico, mediante sua autorização.
      </p>
      <h2>Contato pelo WhatsApp</h2>
      <p>
        Os botões de WhatsApp deste site abrem uma conversa em <strong>wa.me</strong>, serviço de
        terceiros. Ao clicar, você sai deste site e o atendimento passa a ser regido pelos termos e
        pela política de privacidade do WhatsApp. Recomendamos não enviar dados sensíveis (senhas,
        documentos completos ou informações de saúde) antes de falar com um integrante da equipe.
      </p>
      <h2>Consentimento e seus direitos</h2>
      <p>
        A autorização é solicitada antes do envio. Você poderá solicitar acesso, correção ou
        exclusão dos seus dados e revogar o consentimento, conforme a LGPD, usando o formulário
        deste site, o WhatsApp ou as redes sociais oficiais da Fiscare.
      </p>
      <h2>Segurança e conservação</h2>
      <p>
        Aplicamos as medidas razoáveis para proteger seus dados contra acesso não autorizado e
        limitamos sua conservação ao necessário para o atendimento.
      </p>
      <Link to="/" className="mt-8 inline-block font-bold text-primary">
        ← Voltar à Fiscare
      </Link>
    </main>
  );
}
