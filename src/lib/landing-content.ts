import {
  Briefcase,
  FileText,
  Megaphone,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const services: Service[] = [
  {
    title: "BPO Financeiro (Assessoria Financeira)",
    icon: Wallet,
    items: [
      "Saiba para onde vai o seu dinheiro",
      "Organize contas a pagar e receber",
      "Planeje suas retiradas com segurança",
    ],
  },
  {
    title: "Contabilidade e Gestão Tributária",
    icon: FileText,
    items: [
      "Pague os impostos certos, sem surpresas",
      "Encontre o melhor regime tributário",
      "Mantenha suas obrigações em dia",
    ],
  },
  {
    title: "Departamento Pessoal",
    icon: Users,
    items: [
      "Admissões, férias e rescisões",
      "Folha de pagamento e eSocial",
      "Segurança nas relações de trabalho",
    ],
  },
  {
    title: "Marketing Digital",
    icon: Megaphone,
    items: [
      "Presença digital que faz sentido",
      "Anúncios para alcançar seus clientes",
      "Estratégia para fortalecer sua marca",
    ],
  },
  {
    title: "Abertura e Legalização",
    icon: Briefcase,
    items: [
      "Tire sua ideia do papel",
      "Abra ou regularize sua empresa",
      "Conte com apoio em cada etapa",
    ],
  },
  {
    title: "Consultoria e Planejamento",
    icon: TrendingUp,
    items: [
      "Decisões apoiadas em números",
      "Metas e planejamento para crescer",
      "Visão completa do seu negócio",
    ],
  },
];

export const serviceNames = services.map((service) => service.title);

export type FaqGroup = {
  id: string;
  title: string;
  items: { question: string; answer: string }[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "empresa",
    title: "Sobre a Fiscare",
    items: [
      {
        question: "A Fiscare atende MEI?",
        answer:
          "Sim. Ajudamos o MEI a se organizar, cumprir suas obrigações e entender os próximos passos quando o negócio cresce.",
      },
      {
        question: "A Fiscare atende empresas de qualquer porte?",
        answer:
          "Sim. Atendemos desde quem está abrindo o primeiro CNPJ até empresas com funcionários e várias frentes para organizar. O que muda é o escopo do trabalho, definido no diagnóstico.",
      },
      {
        question: "Ainda não abri minha empresa. Podem me ajudar?",
        answer:
          "Sim. Podemos orientar o planejamento, a abertura do CNPJ e os primeiros passos para começar de forma organizada.",
      },
      {
        question: "Já tenho contador. Posso contratar a Fiscare?",
        answer:
          "Sim. Podemos apoiar o financeiro, o marketing e o planejamento, complementando o trabalho que você já tem.",
      },
    ],
  },
  {
    id: "servicos",
    title: "Serviços",
    items: [
      {
        question: "Preciso contratar todas as áreas?",
        answer:
          "Não. Você pode contar com a Fiscare apenas nas áreas de que precisa hoje e ampliar o apoio conforme sua empresa cresce.",
      },
      {
        question: "Como funciona o BPO Financeiro?",
        answer:
          "O BPO Financeiro organiza o dia a dia do caixa: contas a pagar e a receber, conciliação bancária, acompanhamento do fluxo de caixa e apoio nas retiradas. A Fiscare assume essa rotina com você, sem que a empresa precise montar um financeiro interno.",
      },
      {
        question: "Vocês cuidam da folha dos meus funcionários?",
        answer:
          "Sim. O Departamento Pessoal apoia folha de pagamento, admissões, férias, rescisões e obrigações do eSocial.",
      },
      {
        question: "Como funciona a gestão tributária?",
        answer:
          "Acompanhamos a apuração dos impostos, mantemos as obrigações em dia e avaliamos com você se o regime tributário atual ainda faz sentido para o momento da empresa. A definição do regime acontece no diagnóstico, com base nos seus números.",
      },
      {
        question: "Vocês ajudam na abertura e regularização da empresa?",
        answer:
          "Sim. Apoiamos desde o planejamento e a abertura do CNPJ até a regularização de pendências e a organização dos documentos. O passo a passo é combinado com você antes de começar.",
      },
    ],
  },
  {
    id: "contratacao",
    title: "Contratação",
    items: [
      {
        question: "Como funciona o diagnóstico gratuito?",
        answer:
          "É uma conversa em três etapas: você conta sobre a empresa, aponta as áreas em que precisa de ajuda e a gente analisa o momento do negócio. O diagnóstico é gratuito e sem compromisso — qualquer serviço depois é combinado antes.",
      },
      {
        question: "Como funciona a contratação?",
        answer:
          "Depois do diagnóstico, apresentamos uma proposta com o escopo das áreas escolhidas. Você aprova, a gente define o início do trabalho e passa a acompanhar sua empresa pelas frentes contratadas.",
      },
      {
        question: "Quanto custa a assessoria?",
        answer:
          "Depende do escopo: quais áreas você precisa, o volume de trabalho e o momento da empresa. O diagnóstico gratuito existe para entender isso e apresentar uma proposta clara antes de qualquer contratação — sem compromisso.",
      },
      {
        question: "Como vocês vão entrar em contato?",
        answer:
          "Após receber seu cadastro, nossa equipe entra em contato pelo WhatsApp ou pelo e-mail informado para conversar sobre seu negócio.",
      },
    ],
  },
];

export const socialProofPhrases = [
  "Todas as frentes do seu negócio em uma só conversa.",
  "Explicação clara, sem juridiquês.",
  "Cada empresa tem seu momento — a gente parte do seu.",
  "Do primeiro CNPJ ao próximo passo de crescimento.",
  "Você fala com gente que acompanha o seu dia a dia.",
  "Organização primeiro. Crescimento com os pés no chão.",
] as const;
