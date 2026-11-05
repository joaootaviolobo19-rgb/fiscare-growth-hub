import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { ArrowRight, ArrowLeft, ShieldCheck, Check, CheckCircle2, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatCnpj, isValidCnpj, normalizeCnpj } from "@/lib/cnpj";
import { companySchema, contactSchema, diagnosisSchema, industries, needs } from "@/lib/diagnosis";
import { EMAILJS_NOT_CONFIGURED, leadTemplateParams, sendLead } from "@/lib/emailjs";

const stepLabels = ["Sobre você", "Seu negócio", "Como podemos ajudar"];

type TextField = "name" | "phone" | "email" | "company";
const maxLengths: Record<TextField, number> = { name: 100, phone: 20, email: 255, company: 150 };
const autoComplete: Record<TextField, string> = {
  name: "name",
  phone: "tel",
  email: "email",
  company: "organization",
};
const focusOrder = ["name", "phone", "email", "company", "industry", "needs", "consent"];

const emptyData = {
  name: "",
  phone: "",
  email: "",
  company: "",
  industry: "",
  cnpj: "",
  hasNoCnpj: false,
  needs: [] as string[],
  message: "",
  consent: false,
};

// Se algum dia o autofill de um visitante real cair neste campo, desligue a constante.
const HONEYPOT_ENABLED = true;

export function DiagnosisForm() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trap, setTrap] = useState("");
  const reduced = useReducedMotionSafe();
  const [data, setData] = useState(emptyData);

  function update(key: string, value: string | boolean | string[]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleNoCnpj(checked: boolean) {
    setData((d) => ({ ...d, hasNoCnpj: checked, cnpj: checked ? "" : d.cnpj }));
  }

  async function next(e: React.FormEvent) {
    e.preventDefault();
    if (busy || success) return;
    const result = (
      step === 0 ? contactSchema : step === 1 ? companySchema : diagnosisSchema
    ).safeParse(data);
    if (!result.success) {
      const nextErrors = Object.fromEntries(
        result.error.issues.map((i) => [String(i.path[0]), i.message]),
      );
      setErrors(nextErrors);
      const first = focusOrder.find((key) => nextErrors[key]);
      const target = first
        ? document.getElementById(first === "needs" ? "needs-group" : first)
        : null;
      target?.focus();
      return;
    }
    if (step < 2) {
      setErrors({});
      setStep((s) => s + 1);
      return;
    }

    // robô preencheu o campo escondido: descarta o envio sem gastar e-mail, mas segue o fluxo normal
    if (HONEYPOT_ENABLED && trap.trim() !== "") {
      setSuccess(true);
      return;
    }

    setBusy(true);
    setErrors({});
    try {
      await sendLead(leadTemplateParams(data));
      setSuccess(true);
    } catch (error) {
      const status = (error as { status?: unknown } | null)?.status;
      const reason =
        error instanceof Error && error.message === EMAILJS_NOT_CONFIGURED
          ? "EmailJS sem configuração"
          : typeof status === "number"
            ? status
            : "falha de rede";
      console.error("Erro ao enviar e-mail:", reason);
      setErrors({ submit: "Não foi possível enviar. Verifique sua conexão e tente novamente." });
    } finally {
      setBusy(false);
    }
  }

  function resetToForm() {
    setSuccess(false);
    setStep(0);
    setErrors({});
    setTrap("");
    // em um computador compartilhado, o próximo visitante não pode herdar o lead anterior
    setData({ ...emptyData, needs: [] });
  }

  const field = (key: TextField, label: string, placeholder: string, type = "text") => (
    <div>
      <label className="field-label" htmlFor={key}>
        {label}
      </label>
      <input
        className="field-input"
        id={key}
        name={key}
        type={type}
        value={data[key]}
        onChange={(e) => update(key, e.target.value)}
        placeholder={placeholder}
        maxLength={maxLengths[key]}
        autoComplete={autoComplete[key]}
        enterKeyHint="next"
        required
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && (
        <p className="form-error" id={`${key}-error`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  const cnpjWarning =
    !data.hasNoCnpj && normalizeCnpj(data.cnpj).length === 14 && !isValidCnpj(data.cnpj);

  return (
    <div id="diagnostico" className="form-card">
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-110 flex-col items-center justify-center text-center"
        >
          <div className="mb-6 grid size-18 place-items-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={40} />
          </div>
          <h2>Recebemos seus dados!</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Nossa equipe entrará em contato em breve pelo WhatsApp ou e-mail informado.
          </p>
          <Button variant="outline" className="mt-7" onClick={resetToForm}>
            <RotateCcw /> Voltar ao formulário
          </Button>
        </motion.div>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> UM PRIMEIRO PASSO, SEM COMPROMISSO
          </div>
          <h2>
            Peça seu diagnóstico
            <br className="hidden sm:block" /> gratuito.
          </h2>
          <p className="form-caption mt-2">
            Vamos entender seu negócio e encontrar o melhor caminho para você. São três etapas
            rápidas.
          </p>

          <div className="mt-6 mb-5">
            <div className="mb-2.5 flex justify-between text-[10px]">
              <span className="font-bold text-primary">
                0{step + 1} <span className="font-normal text-muted-foreground">/ 03</span>
              </span>
              <span className="text-muted-foreground">{stepLabels[step]}</span>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((n) => (
                <div key={n} className={`form-step-line ${step >= n ? "active" : ""}`} />
              ))}
            </div>
          </div>

          <form onSubmit={next} noValidate>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="fiscare_extra">Não preencha</label>
              <input
                id="fiscare_extra"
                name="fiscare_extra"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
              />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: reduced ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {step === 0 && (
                  <>
                    {field("name", "Seu nome", "Nome e sobrenome")}
                    {field("phone", "WhatsApp", "(00) 00000-0000", "tel")}
                    {field("email", "E-mail", "voce@suaempresa.com.br", "email")}
                  </>
                )}
                {step === 1 && (
                  <>
                    {field("company", "Nome da empresa", "Sua empresa ou seu futuro negócio")}
                    <div>
                      <label className="field-label" htmlFor="cnpj">
                        CNPJ <span className="font-normal text-muted-foreground">(opcional)</span>
                      </label>
                      <input
                        className="field-input"
                        id="cnpj"
                        name="cnpj"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        maxLength={18}
                        disabled={data.hasNoCnpj}
                        value={data.cnpj}
                        onChange={(e) => update("cnpj", formatCnpj(e.target.value))}
                        placeholder="00.000.000/0000-00"
                        aria-describedby={cnpjWarning ? "cnpj-hint" : undefined}
                      />
                      {cnpjWarning && (
                        <p className="field-hint" id="cnpj-hint" aria-live="polite">
                          Confira o CNPJ — você pode enviar assim mesmo.
                        </p>
                      )}
                      <label className="mt-2 flex items-center gap-2 text-[10px] font-medium text-primary">
                        <input
                          id="no-cnpj"
                          name="hasNoCnpj"
                          type="checkbox"
                          checked={data.hasNoCnpj}
                          onChange={(e) => toggleNoCnpj(e.target.checked)}
                          className="size-4 shrink-0 accent-primary"
                        />
                        Ainda não tenho CNPJ
                      </label>
                      {data.hasNoCnpj && (
                        <p className="field-hint">
                          Sem problema: o diagnóstico também orienta os primeiros passos.
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="industry" className="field-label">
                        Ramo de atuação
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        className="field-input"
                        value={data.industry}
                        onChange={(e) => update("industry", e.target.value)}
                        required
                        aria-invalid={Boolean(errors["industry"])}
                        aria-describedby={errors["industry"] ? "industry-error" : undefined}
                      >
                        <option value="">Selecione seu ramo</option>
                        {industries.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                      {errors["industry"] && (
                        <p className="form-error" id="industry-error">
                          {errors["industry"]}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <fieldset
                      id="needs-group"
                      tabIndex={-1}
                      aria-describedby={errors["needs"] ? "needs-error" : undefined}
                    >
                      <legend className="field-label">Precisa de ajuda com</legend>
                      <div className="flex flex-wrap gap-2">
                        {needs.map((n) => (
                          <Button
                            type="button"
                            role="checkbox"
                            aria-checked={data.needs.includes(n)}
                            key={n}
                            variant={data.needs.includes(n) ? "selected" : "pill"}
                            className="h-8 px-3 text-[10px]"
                            onClick={() =>
                              update(
                                "needs",
                                data.needs.includes(n)
                                  ? data.needs.filter((v) => v !== n)
                                  : [...data.needs, n],
                              )
                            }
                          >
                            {data.needs.includes(n) && <Check className="size-3" />}
                            {n}
                          </Button>
                        ))}
                      </div>
                      {errors["needs"] && (
                        <p className="form-error" id="needs-error">
                          {errors["needs"]}
                        </p>
                      )}
                    </fieldset>
                    <div>
                      <label htmlFor="message" className="field-label">
                        Quer contar mais?{" "}
                        <span className="font-normal text-muted-foreground">(opcional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="field-input"
                        maxLength={1000}
                        enterKeyHint="send"
                        placeholder="O que mais preocupa você hoje?"
                        value={data.message}
                        onChange={(e) => update("message", e.target.value)}
                      />
                    </div>
                    <label className="flex items-start gap-2.5 text-[10px] leading-5 text-muted-foreground">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        required
                        aria-describedby={errors["consent"] ? "consent-error" : undefined}
                        className="mt-1 size-4 shrink-0 accent-primary"
                      />
                      <span>
                        Autorizo a Fiscare a entrar em contato e usar meus dados para o atendimento,
                        conforme a LGPD e a{" "}
                        <Link className="text-primary underline" to="/privacidade">
                          Política de Privacidade
                        </Link>
                        .
                      </span>
                    </label>
                    {errors["consent"] && (
                      <p className="form-error" id="consent-error">
                        {errors["consent"]}
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="mt-5 flex gap-3">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-11 shrink-0"
                  aria-label="Etapa anterior"
                  onClick={() => {
                    setStep((s) => s - 1);
                    setErrors({});
                  }}
                >
                  <ArrowLeft />
                </Button>
              )}
              <Button
                disabled={busy}
                type="submit"
                variant={step === 2 ? "cta" : "default"}
                className="h-11 flex-1 text-xs"
              >
                {busy ? "Enviando…" : step === 2 ? "Pedir diagnóstico gratuito" : "Próximo"}
                <ArrowRight />
              </Button>
            </div>
            {errors["submit"] && (
              <p className="form-error" role="alert">
                {errors["submit"]}
              </p>
            )}
            <p className="form-security">
              <ShieldCheck size={12} /> Seus dados protegidos. Sem compromisso.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
