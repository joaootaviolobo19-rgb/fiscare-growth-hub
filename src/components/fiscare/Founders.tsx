import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, DiagnosisButton } from './shared';
import patricia from '@/assets/patricia.png.asset.json';
import adoilson from '@/assets/adoilson.png.asset.json';
import tamires from '@/assets/tamires.png.asset.json';
import group from '@/assets/fundadores.png.asset.json';

const founders = [
  { name: 'Patrícia', image: patricia.url },
  { name: 'Adoilson', image: adoilson.url },
  { name: 'Tamires', image: tamires.url },
];

export function FounderFaces() {
  return <div className="founder-faces"><div className="founder-avatars">{founders.map(person => <img key={person.name} src={person.image} alt={person.name} width={48} height={48} />)}</div><p>Patrícia, Adoilson e Tamires.<br/><span>Gente de verdade, cuidando do seu negócio.</span></p></div>;
}

export function Founders() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return <section id="equipe" className="section founders-section" ref={ref}>
    <div className="site-container">
      <div className="founders-intro">
        <Reveal><p className="section-label">QUEM ESTÁ DO SEU LADO</p><h2 className="section-title">Antes de cuidar de empresas,<br/>a gente cuida de pessoas.</h2></Reveal>
        <Reveal delay={.12}><p className="section-copy">Somos Patrícia, Adoilson e Tamires, os três sócios fundadores da Fiscare. Uma equipe próxima, para conversar com você e cuidar de cada frente do seu negócio.</p></Reveal>
      </div>
      <div className="founders-layout">
        <Reveal className="founders-group"><motion.img src={group.url} alt="Adoilson, Tamires e Patrícia conversando na Fiscare" width={446} height={661} loading="lazy" style={reduced ? {} : { y }}/></Reveal>
        <div className="founders-people">{founders.map((person, i) => <Reveal key={person.name} delay={i * .12} className="founder-person"><div className={`founder-portrait portrait-${i}`}><img src={person.image} alt={`${person.name}, ${person.name === 'Adoilson' ? 'sócio fundador' : 'sócia fundadora'} da Fiscare`} loading="lazy" width={300} height={360}/></div><div className="founder-caption"><h3>{person.name}</h3><p>{person.name === 'Adoilson' ? 'Sócio fundador' : 'Sócia fundadora'}</p></div></Reveal>)}<Reveal className="founders-invitation"><p>Seu próximo passo começa<br/>com uma boa conversa.</p><DiagnosisButton large/></Reveal></div>
      </div>
    </div>
  </section>;
}
