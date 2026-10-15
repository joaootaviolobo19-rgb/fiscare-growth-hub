import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
 const reduced = useReducedMotion();
 return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .55, delay }}>{children}</motion.div>;
}
export function Logo({ light = false }: { light?: boolean }) { return <Link to="/" aria-label="Fiscare, início" className={`brand ${light ? 'brand-light' : ''}`}><span className="brand-mark" aria-hidden="true"/><span><span className="brand-name">Fiscare<span className="text-cta">.</span></span><span className="brand-sub">ASSESSORIA EMPRESARIAL</span></span></Link>; }
export function scrollToForm() { const form = document.getElementById('diagnostico'); form?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); window.setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), 600); }
export function DiagnosisButton({ large = false }: { large?: boolean }) { return <Button variant="cta" onClick={scrollToForm} className={large ? 'h-13 px-7 text-sm' : 'h-11 px-5 text-xs'}>Quero meu diagnóstico<ArrowUpRight size={16}/></Button>; }
