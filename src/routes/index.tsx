import { createFileRoute } from '@tanstack/react-router';
import { Founders } from '@/components/fiscare/Founders';
import { MotionConfig } from 'framer-motion';
import { Header, Hero, Pains, Dictionary, Services, Process, FAQ, FinalCTA, Footer } from '@/components/fiscare/sections';
export const Route = createFileRoute('/')({
 head: () => ({meta:[{title:'Fiscare | Sua empresa inteira cuidada por uma só equipe'},{name:'description',content:'Financeiro, impostos, equipe, marketing e planejamento. Conheça a Fiscare Assessoria Empresarial e peça seu diagnóstico gratuito.'},{property:'og:title',content:'Fiscare | Assessoria Empresarial sem complicação'},{property:'og:description',content:'Todas as frentes do seu negócio, uma só equipe. Peça um diagnóstico gratuito e cresça com organização.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:Index,
});
function Index(){return <MotionConfig reducedMotion="user"><Header/><main><Hero/><Pains/><Dictionary/><Services/><Founders/><Process/><FAQ/><FinalCTA/></main><Footer/></MotionConfig>;}
