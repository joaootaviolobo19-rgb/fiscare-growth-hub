/**
 * Abertura da página: uma cortina navy onde o nome, a régua e as frentes se encaixam
 * antes de revelar o hero. É 100% CSS (aparece e sai mesmo sem JavaScript) e some
 * por completo quando o visitante pede menos movimento.
 */
export function IntroCurtain() {
  return (
    <div className="intro-curtain" aria-hidden="true">
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />
      <div className="intro-inner">
        <span className="intro-kicker">Assessoria empresarial</span>
        <span className="intro-word-mask">
          <span className="intro-word">
            Fiscare<span className="intro-dot">.</span>
          </span>
        </span>
        <span className="intro-rule" />
        <span className="intro-tags">financeiro · contábil · pessoal · marketing digital</span>
      </div>
    </div>
  );
}
