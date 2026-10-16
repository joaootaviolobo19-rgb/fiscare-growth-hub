import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoFiscare from '@/assets/logo-fiscare.png.asset.json';
import type { ReactNode } from 'react';
export function ScrollReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
 const reduced = useReducedMotion();
 return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 45, scale: .98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .12 }} transition={{ type: 'spring', stiffness: 70, damping: 18, mass: .9, delay }}>{children}</motion.div>;
}
export const Reveal = ScrollReveal;
export function Logo({ light = false }: { light?: boolean }) { return <Link to="/" aria-label="Fiscare, início" data-light={light || undefined}><img src={logoFiscare.url} alt="Fiscare Assessoria Empresarial" width={117} height={40} className="h-10 w-auto max-md:h-9"/></Link>; }
export function scrollToForm() { const form = document.getElementById('diagnostico'); form?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); window.setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), 600); }
export function DiagnosisButton({ large = false, shine = false }: { large?: boolean; shine?: boolean }) { return <Button variant="cta" onClick={scrollToForm} className={`${large ? 'h-13 px-7 text-sm' : 'h-11 px-5 text-sm'} ${shine ? 'btn-shine' : ''}`}>Quero meu diagnóstico<ArrowUpRight size={16}/></Button>; }
