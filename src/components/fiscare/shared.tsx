import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoFiscare from '@/assets/logo-fiscare.png';
import type { ReactNode } from 'react';

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 75, damping: 20, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}

export const Reveal = ScrollReveal;

export function Stagger({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 18 } },
  };

  return (
    <motion.div className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '-40px' }}>
      {Array.isArray(children)
        ? children.map((child, i) => <motion.div key={i} variants={item}>{child}</motion.div>)
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Fiscare, início" data-light={light || undefined}>
      <img
        src={logoFiscare}
        alt="Fiscare Assessoria Empresarial"
        className={light ? 'h-20 w-auto max-md:h-16' : 'h-16 w-auto max-md:h-14'}
      />
    </Link>
  );
}

export function scrollToForm() {
  const form = document.getElementById('diagnostico');
  form?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
  window.setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), 600);
}

export function DiagnosisButton({ large = false, shine = false }: { large?: boolean; shine?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="inline-block"
    >
      <Button variant="cta" onClick={scrollToForm} className={`${large ? 'h-13 px-7 text-sm' : 'h-11 px-5 text-xs'} ${shine ? 'btn-shine' : ''}`}>
        Quero meu diagnóstico
        <ArrowUpRight size={16} />
      </Button>
    </motion.div>
  );
}