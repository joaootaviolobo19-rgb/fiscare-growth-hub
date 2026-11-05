import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import {
  BookOpen,
  Check,
  ChevronDown,
  ClipboardPen,
  FileCheck2,
  ScanSearch,
  ShieldCheck,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo, DiagnosisButton, Reveal, RevealWords } from "./shared";
import { WhatsappGlyph } from "./Whatsapp";
import { whatsappDisplay, whatsappLink, whatsappMessages } from "@/lib/contact";
import { faqGroups, services } from "@/lib/landing-content";
import { usePointerGlow } from "@/lib/pointer-glow";
import { DiagnosisForm } from "./DiagnosisForm";
import { FinanceBackdrop } from "./FinanceBackdrop";

export function Header() {
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 });

  return (
    <header className="site-header">
      <div className="site-container grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Logo />
        <div className="flex shrink-0 items-center gap-8">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
            <a className="header-link" href="#servicos">
              Nossas soluções
            </a>
            <a className="header-link" href="#processo">
              Como funciona
            </a>
            <a className="header-link" href="#duvidas">
              Dúvidas
            </a>
          </nav>
          <DiagnosisButton />
        </div>
      </div>
      <motion.div
        className="header-progress"
        aria-hidden="true"
        style={reduced ? { transform: "scaleX(0)" } : { scaleX: progress }}
      />
    </header>
  );
}

const miniTerms = [
  { tecnico: "Pró-labore", traducao: "O seu salário como dono." },
  { tecnico: "DAS do Simples Nacional", traducao: "A guia única do imposto do mês." },
  { tecnico: "Desenquadramento do MEI", traducao: "Quando o MEI cresce e vira microempresa." },
  { tecnico: "Fluxo de caixa", traducao: "O mapa de quando o dinheiro entra e sai." },
  { tecnico: "Regime tributário", traducao: "O jeito como sua empresa paga imposto." },
  { tecnico: "eSocial", traducao: "O sistema que recebe as informações dos seus funcionários." },
  {
    tecnico: "Tráfego pago",
    traducao: "Anúncios mostrados para quem tem interesse no que você vende.",
  },
];

export function Hero() {
  const [term, setTerm] = useState(0);
  const reduced = useReducedMotionSafe();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 130]);

  useEffect(() => {
    const timer = setTimeout(() => setTerm((t) => (t + 1) % miniTerms.length), 5000);
    return () => clearTimeout(timer);
  }, [term]);

  const item = miniTerms[term];

  return (
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-backdrop" style={reduced ? {} : { y: backdropY }}>
        <FinanceBackdrop />
      </motion.div>
      <div className="site-container hero-inner">
        <div className="hero-copy min-w-0">
          <div className="eyebrow text-on-dark-muted hero-rise">
            <span className="eyebrow-line" />
            CUIDADO COMPLETO. CONVERSA SIMPLES.
          </div>
          <h1>
            <span className="headline-line">
              <span>Sua empresa inteira</span>
            </span>{" "}
            <span className="headline-line">
              <span>cuidada por uma só equipe,</span>
            </span>{" "}
            <span className="headline-line">
              <span>explicada do jeito que</span>
            </span>{" "}
            <span className="headline-line">
              <span className="headline-accent">você entende.</span>
            </span>
          </h1>
          <p className="hero-description hero-rise" style={{ animationDelay: "1.5s" }}>
            Assessoria financeira, contábil, empresarial e marketing digital para empresas que
            querem crescer com organização, controle e planejamento.
          </p>
          <div className="hero-rise" style={{ animationDelay: "1.58s" }}>
            <div className="dictionary-mini" aria-live="polite">
              <div className="mb-3 flex items-center justify-between text-sm text-on-dark-muted">
                <span className="flex items-center gap-2">
                  <BookOpen size={13} /> DO COMPLICADO AO SIMPLES
                </span>
                <span>
                  {String(term + 1).padStart(2, "0")} / {String(miniTerms.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative min-h-[96px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {item && (
                    <motion.div
                      key={term}
                      initial={{ opacity: 0, y: reduced ? 0 : -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduced ? 0 : -14 }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                      <div className="text-sm text-on-dark-muted">O termo técnico:</div>
                      <div className="mini-term mt-1 font-bold text-on-dark line-through decoration-cta decoration-2">
                        {item.tecnico}
                      </div>
                      <div className="mt-2 text-base leading-5 text-on-dark-muted">
                        Em bom português:{" "}
                        <span className="font-semibold text-cta">{item.traducao}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.div
                key={`progress-${term}`}
                className="mini-progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </div>
          <div className="hero-checks hero-rise" style={{ animationDelay: "1.66s" }}>
            <span className="flex items-center gap-1.5">
              <Check size={12} className="text-cta" />
              Todas as áreas, uma equipe
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={12} className="text-cta" />
              Sem complicação
            </span>
          </div>
        </div>
        <div className="hero-rise" style={{ animationDelay: "1.44s" }}>
          <DiagnosisForm />
        </div>
      </div>
    </section>
  );
}

const pains = [
  "Fatura bem, mas o dinheiro some antes do fim do mês.",
  "Será que estou pagando imposto demais?",
  "Meu MEI está crescendo. E agora, o que muda?",
  "Não sei quanto posso tirar da empresa para mim.",
  "Quero contratar, mas tenho medo da parte trabalhista.",
  "Minha empresa é boa, mas pouca gente conhece.",
];

export function Pains() {
  return (
    <section className="section bg-muted pains-section">
      <div className="site-container">
        <Reveal className="mb-9 text-center">
          <p className="section-label">A GENTE ENTENDE VOCÊ</p>
          <h2 className="section-title mx-auto max-w-160">
            Algum desses pensamentos já
            <br className="hidden sm:block" /> passou pela sua cabeça?
          </h2>
        </Reveal>
        <div className="pains-grid">
          {pains.map((p, i) => (
            <Reveal key={p} delay={i * 0.04}>
              <article className="pain-card">
                <span className="pain-mark" aria-hidden="true">
                  “
                </span>
                <p className="text-base leading-6 italic">{p}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-center text-base font-semibold text-navy">
            Se você se identificou com pelo menos um,{" "}
            <span className="text-primary">a gente pode ajudar.</span>
          </p>
          <div className="mt-6 flex justify-center">
            <DiagnosisButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const terms = [
  ["DAS", "A guia única que reúne os impostos que a sua empresa precisa pagar."],
  [
    "Regime tributário",
    "A forma como a sua empresa calcula e paga impostos. Escolher a certa pode significar economia todo mês.",
  ],
  [
    "Fluxo de caixa",
    "O mapa do dinheiro que entra, sai e fica disponível. É como a saúde financeira do seu negócio.",
  ],
  [
    "eSocial",
    "O sistema do governo que recebe as informações dos seus funcionários, como admissões, férias e folha.",
  ],
  [
    "Tráfego pago",
    "Anúncios na internet para colocar sua empresa na frente de quem pode comprar de você.",
  ],
  [
    "Faturamento x lucro",
    "Faturamento é tudo que você vende. Lucro é o que sobra depois de pagar todos os custos.",
  ],
];

export function Dictionary() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();
  const selected = terms[active];

  return (
    <section className="section dictionary-section">
      <div className="site-container split-section">
        <Reveal>
          <p className="section-label">CONVERSA DE GENTE PARA GENTE</p>
          <h2 className="section-title">
            Sem juridiquês.
            <br />A gente traduz.
          </h2>
          <p className="section-copy mt-5 max-w-85">
            Você não precisa decorar termos difíceis para entender sua empresa. Precisa de alguém
            que explique e resolva.
          </p>
          <div className="mt-7 flex items-center gap-2 font-bold text-primary">
            <BookOpen size={20} />
            Clareza também é cuidado.
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="dictionary-tabs" role="tablist" aria-label="Termos de negócios">
            {terms.map(([term], i) => (
              <Button
                key={term}
                variant="ghost"
                role="tab"
                aria-selected={active === i}
                aria-controls="term-definition"
                id={`term-tab-${i}`}
                className={`dictionary-tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                {term}
              </Button>
            ))}
          </div>
          <div
            className="dictionary-definition"
            id="term-definition"
            role="tabpanel"
            aria-labelledby={`term-tab-${active}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{ duration: 0.25 }}
              >
                <span className="definition-number">0{active + 1}</span>
                <h3>{selected?.[0]}</h3>
                <p>{selected?.[1]}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  const glowRef = usePointerGlow<HTMLElement>();
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: glowRef,
    offset: ["start end", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section id="servicos" ref={glowRef} className="section services spotlight scroll-mt-22">
      <motion.div
        className="services-backdrop"
        aria-hidden="true"
        style={reduced ? {} : { y: backdropY }}
      >
        <FinanceBackdrop variant="band" />
      </motion.div>
      <div className="site-container">
        <Reveal className="services-heading">
          <p className="section-label text-cta">UM NEGÓCIO. TODAS AS FRENTES.</p>
          <h2 className="section-title">
            Uma assessoria para todas
            <br className="hidden sm:block" /> as frentes da sua empresa.
          </h2>
          <p className="section-copy text-on-dark-muted mt-5">
            Do dia a dia ao próximo grande passo, você tem com quem contar.
          </p>
        </Reveal>
        <ol className="services-list">
          {services.map((service, i) => (
            <li key={service.title} className="service-row">
              <Reveal delay={(i % 2) * 0.06} y={20} x={(i % 2 === 0 ? -1 : 1) * 16}>
                <div className="service-line">
                  <span className="service-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="service-title">
                    <service.icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    <h3>{service.title}</h3>
                  </div>
                  <ul className="service-items">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Você se cadastra.",
    description:
      "Preencha o formulário e conte um pouco sobre sua empresa. É rápido, simples e sem compromisso.",
    label: "Passo um",
    icon: ClipboardPen,
  },
  {
    title: "A gente analisa.",
    description:
      "Nossa equipe olha para o seu momento e identifica onde podemos ajudar de verdade.",
    label: "Passo dois",
    icon: ScanSearch,
  },
  {
    title: "Você recebe um plano.",
    description:
      "Conversamos com você sobre os próximos passos, de um jeito claro e que faça sentido para o seu negócio.",
    label: "Passo três",
    icon: FileCheck2,
  },
];

export function Process() {
  return (
    <section id="processo" className="section process-section scroll-mt-22">
      <div className="site-container">
        <div className="process-head">
          <Reveal>
            <p className="section-label">SIMPLES, DO COMEÇO AO FIM</p>
            <h2 className="section-title">
              Como funciona o<br className="hidden sm:block" /> diagnóstico gratuito.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="process-aside">
            <p className="section-copy">
              Três passos, nenhuma burocracia. O primeiro é só contar o que você precisa.
            </p>
            <DiagnosisButton />
          </Reveal>
        </div>
        <ol className="process-sheet">
          {steps.map(({ title, description, label, icon: Icon }, i) => (
            <li key={title} className="process-item">
              <Reveal delay={i * 0.08} className="process-row">
                <span className="process-ghost" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="process-body">
                  <span className="process-kicker">
                    <Icon size={14} />
                    {label}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqGroups[0]?.items[0]?.question ?? null);
  const reduced = useReducedMotionSafe();

  return (
    <section id="duvidas" className="section faq-section scroll-mt-22">
      <div className="site-container">
        <Reveal className="faq-head">
          <p className="section-label">PODE PERGUNTAR</p>
          <h2 className="section-title">Dúvidas comuns.</h2>
          <p className="section-copy">
            Uma boa parceria começa com clareza. Se a sua pergunta não estiver aqui, o botão verde
            do WhatsApp acompanha você pela página.
          </p>
        </Reveal>
        <div className="faq-grid">
          {faqGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 0.08} className="faq-group">
              <div className="faq-group-head">
                <span className="faq-group-dot" aria-hidden="true" />
                <h3 className="faq-group-title">{group.title}</h3>
                <span className="faq-group-count" aria-hidden="true">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="faq-list">
                {group.items.map(({ question, answer }, i) => {
                  const id = `faq-${group.id}-${i}`;
                  const isOpen = openId === question;
                  return (
                    <div key={question} className="faq-item">
                      <h4>
                        <Button
                          variant="accordion"
                          className="faq-trigger"
                          aria-expanded={isOpen}
                          aria-controls={id}
                          id={`${id}-trigger`}
                          onClick={() => setOpenId(isOpen ? null : question)}
                        >
                          {question}
                          <ChevronDown
                            className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </Button>
                      </h4>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={id}
                            role="region"
                            aria-labelledby={`${id}-trigger`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="faq-answer">{answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const glowRef = usePointerGlow<HTMLElement>();

  return (
    <section className="final-cta spotlight" ref={glowRef}>
      <div className="site-container grid grid-cols-1 items-center gap-7 md:grid-cols-[minmax(0,1fr)_auto]">
        <Reveal>
          <h2>
            <RevealWords text="Descubra o que a sua empresa precisa para crescer organizada." />
          </h2>
          <p className="mt-4 text-sm text-on-dark/80">Leva menos de dois minutos.</p>
        </Reveal>
        <Reveal delay={0.1} className="relative z-1 flex flex-col items-center gap-3">
          <DiagnosisButton large shine />
          <span className="flex items-center gap-1.5 text-sm text-on-dark/80">
            <ShieldCheck size={12} />
            Gratuito e sem compromisso
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Logo light />
            <p className="border-on-dark-muted/30 text-sm leading-6 md:border-l md:pl-5">
              Cuidar da sua empresa. Simplificar o seu dia.
            </p>
            <a
              className="footer-whatsapp"
              href={whatsappLink(whatsappMessages.contato)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappGlyph size={16} />
              {whatsappDisplay}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacidade" className="footer-link">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="footer-link">
              Termos de Uso
            </Link>
            <Button asChild variant="ghost" size="icon">
              <a
                href="https://www.facebook.com/people/Fiscare-Assessoria-Empresarial/61578118387165/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Fiscare"
              >
                <Facebook size={17} />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a
                href="https://www.linkedin.com/company/fiscare_assessoria_tributaria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Fiscare"
              >
                <Linkedin size={17} />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a
                href="https://www.instagram.com/fiscare.assessoria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Fiscare"
              >
                <Instagram size={17} />
              </a>
            </Button>
          </div>
        </div>
        <div className="footer-bottom grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <p>© 2026 Fiscare Assessoria Empresarial. Todos os direitos reservados.</p>
          <p>CNPJ 69.194.376/0001-80</p>
        </div>
      </div>
    </footer>
  );
}
