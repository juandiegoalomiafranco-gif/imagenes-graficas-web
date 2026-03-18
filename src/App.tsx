/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Users, 
  BarChart3, 
  Lightbulb,
  ChevronDown,
  ExternalLink,
  Briefcase,
  Layout,
  Palette,
  Maximize,
  PenTool,
  Type,
  Download
} from 'lucide-react';
import { GlowyWavesHero } from './components/ui/glowy-waves-hero-shadcnui';
import HeroScrollVideo from './components/ui/scroll-animated-video';

// --- Types ---
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  category: 'Investigación' | 'Planificación' | 'Creación' | 'Evaluación';
}

// --- Data ---
const timelineData: TimelineItem[] = [
  { date: '7-13 Oct', title: 'Definición de Idea', description: 'Saber que el proyecto se centrará en redes sociales y posicionamiento de marca.', category: 'Planificación' },
  { date: '14-16 Oct', title: 'Organización', description: 'Crear carpetas en Drive, subcarpetas para reels, posts, guiones y evidencias.', category: 'Planificación' },
  { date: '17-22 Oct', title: 'Análisis Inicial', description: 'Investigar el avatar de IMAGRAPHIC, público objetivo, propuesta de valor y tono.', category: 'Investigación' },
  { date: '23-27 Oct', title: 'Investigación de Marketing', description: 'Establecer valores de marca, visión, estilo visual y mensaje clave.', category: 'Investigación' },
  { date: '12-15 Feb', title: 'Publicación de Contenido', description: 'Publicar reels y posts con intervalos de días para analizar rendimiento.', category: 'Creación' },
  { date: '15-16 Feb', title: 'Diseño de Encuesta', description: 'Crear encuesta para evaluar percepción del público sobre claridad, visual y utilidad.', category: 'Evaluación' },
  { date: '16-20 Feb', title: 'Análisis Final', description: 'Comparar métricas, analizar encuestas y evaluar el producto final.', category: 'Evaluación' },
];

const contentPieces = [
  { 
    type: 'Video (Reel)', 
    title: 'Branding y Productos', 
    stats: '304 vistas | 39 interacciones', 
    description: 'Enfoque en la solución de problemas reales de emprendedores.',
    score: '8/8'
  },
  { 
    type: 'Video (Reel)', 
    title: 'Calidad y Confianza', 
    stats: '360 vistas | 49 interacciones', 
    description: 'Narrativa clara sobre los riesgos de malos distribuidores.',
    score: '8/8'
  },
  { 
    type: 'Post Estático', 
    title: 'The Sky is the Limit', 
    stats: '8 likes | 0 mensajes', 
    description: 'Refuerza valores de crecimiento y creatividad.',
    score: '6/8'
  },
  { 
    type: 'Post Estático', 
    title: 'Tote Bags + Pouches', 
    stats: '9 interacciones | 0 mensajes', 
    description: 'Muestra productos reales y beneficios de la marca.',
    score: '6/8'
  },
];

const atlSkills = [
  { 
    name: 'Comunicación', 
    desc: 'Uso de técnicas de expresión oral y no verbal para conectar con diversos públicos.',
    icon: <Users className="w-6 h-6" />
  },
  { 
    name: 'Organización', 
    desc: 'Planificación estratégica mediante diagramas de Gantt para gestionar tareas académicas y de producción.',
    icon: <Calendar className="w-6 h-6" />
  },
  { 
    name: 'Reflexión', 
    desc: 'Identificación de fortalezas y debilidades para ajustar el enfoque según el algoritmo y la audiencia.',
    icon: <Lightbulb className="w-6 h-6" />
  },
  { 
    name: 'Alfabetización Mediática', 
    desc: 'Comunicar información de manera efectiva utilizando variedad de medios y formatos digitales.',
    icon: <Instagram className="w-6 h-6" />
  },
];

const videoProcessSteps = [
  {
    title: 'Definición del objetivo y público',
    description: 'Establecer qué se quiere lograr y a quién va dirigido.',
    details: 'Antes de crear cualquier contenido, se define si el fin es atraer clientes, generar reconocimiento o mostrar servicios. Esto asegura que el tono y estilo sean efectivos.',
    icon: <Target className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1080&h=1920'
  },
  {
    title: 'Investigación y análisis de tendencias',
    description: 'Analizar formatos, audios virales y tipos de contenido.',
    details: 'Ayuda a entender qué funciona en el mercado actual y cómo adaptar esas ideas al contexto de IMAGRAPHIC sin perder la autenticidad de la marca.',
    icon: <TrendingUp className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1080&h=1920'
  },
  {
    title: 'Brainstorming y selección de ideas',
    description: 'Generación creativa y evaluación técnica.',
    details: 'Se generan múltiples ideas y se realiza una evaluación técnica de los requerimientos de grabación (iluminación, audio, encuadre).',
    icon: <Lightbulb className="w-5 h-5" />,
    image: '/assets/media__1773798494870.png'
  },
  {
    title: 'Guion y planificación visual',
    description: 'Estructurar el contenido y planificar tomas.',
    details: 'Se define qué se va a decir y cómo se va a mostrar. La planificación de encuadres y secuencias evita improvisaciones y asegura coherencia.',
    icon: <BookOpen className="w-5 h-5" />,
    image: '/assets/media__1773799825747.png'
  },
  {
    title: 'Producción (Grabación)',
    description: 'Preparación del espacio, iluminación y sonido.',
    details: 'Se preparan las luces artificiales, el trípode y los micrófonos para asegurar una calidad técnica óptima que mejore la percepción profesional del contenido.',
    icon: <Briefcase className="w-5 h-5" />,
    image: '/assets/media__1773798440331.jpg'
  },
  {
    title: 'Edición y adaptación',
    description: 'Selección de tomas, ritmo, música y efectos.',
    details: 'Proceso detallado optimizando el formato, ajustando colores y añadiendo luz post-producción para mejorar la calidad final del video.',
    icon: <Instagram className="w-5 h-5" />,
    image: '/assets/media__1773798474508.png'
  },
  {
    title: 'Feedback y publicación',
    description: 'Revisión, corrección y lanzamiento estratégico.',
    details: 'El contenido se pule tras recibir retroalimentación y se publica en horarios estratégicos con descripciones y hashtags optimizados.',
    icon: <CheckCircle2 className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1080&h=1920'
  },
  {
    title: 'Análisis y mejora continua',
    description: 'Aprendizaje a partir de errores y métricas.',
    details: 'Después de publicar, se analizan los resultados para identificar aspectos a mejorar. El feedback es fundamental para optimizar futuras estrategias.',
    icon: <BarChart3 className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080&h=1920'
  }
];

const staticPostSteps = [
  {
    title: 'Definición de la información clave',
    description: 'Se selecciona el contenido exacto que se quiere comunicar (servicios, características, beneficios), priorizando claridad y evitando sobrecargar el diseño con texto innecesario.',
    icon: <Target className="w-5 h-5" />
  },
  {
    title: 'Estructuración de la jerarquía visual',
    description: 'Se organiza la información dentro del diseño (títulos, subtítulos, elementos secundarios) para guiar la lectura del usuario de forma rápida y efectiva.',
    icon: <Layout className="w-5 h-5" />
  },
  {
    title: 'Selección de elementos gráficos',
    description: 'Se eligen colores, tipografías, íconos e imágenes alineadas con la identidad de la marca, asegurando coherencia visual en todas las piezas.',
    icon: <Palette className="w-5 h-5" />
  },
  {
    title: 'Composición y distribución del diseño',
    description: 'Se define la ubicación de cada elemento en el espacio (alineación, márgenes, balance), buscando un diseño limpio, ordenado y visualmente atractivo.',
    icon: <Maximize className="w-5 h-5" />
  },
  {
    title: 'Aplicación de principios de diseño',
    description: 'Se utilizan conceptos como contraste, balance, repetición y proximidad para mejorar la legibilidad y el impacto visual del post.',
    icon: <PenTool className="w-5 h-5" />
  },
  {
    title: 'Optimización de legibilidad',
    description: 'Se ajusta el tamaño de textos, espaciado y contraste para asegurar que la información sea fácil de leer en dispositivos móviles.',
    icon: <Type className="w-5 h-5" />
  },
  {
    title: 'Exportación y calidad visual',
    description: 'Se configura el formato final (resolución, proporciones) para garantizar que el diseño no pierda calidad al ser publicado.',
    icon: <Download className="w-5 h-5" />
  }
];

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-600 max-w-2xl font-medium"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="h-1 w-20 bg-orange-500 mt-6 rounded-full" />
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/assets/media__1773798634247.png" alt="IMAGRAPHIC Logo" className="w-10 h-10 object-contain rounded-full shadow-sm bg-white" />
            <span className="font-bold text-xl tracking-tighter">Proyecto Personal</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
            <a href="#proceso" className="hover:text-slate-900 transition-colors">Proceso</a>
            <a href="#edicion" className="hover:text-slate-900 transition-colors">Edición</a>
            <a href="#producto" className="hover:text-slate-900 transition-colors">Campaña</a>
            <a href="#resultados" className="hover:text-slate-900 transition-colors">Resultados</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <GlowyWavesHero />

      {/* Objective & Context */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle subtitle="La conexión entre un interés personal y un problema empresarial real.">
              El Propósito
            </SectionTitle>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Desde los 13 años, mi interés por el emprendimiento y la educación financiera me llevó a cuestionar cómo las empresas familiares, como <span className="font-bold text-slate-900">Imágenes Gráficas (IMAGRAPHIC)</span>, pueden expandirse globalmente.
              </p>
              
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <img src="/assets/media__1773798634247.png" alt="IMAGRAPHIC Logo" className="w-8 h-8 object-contain rounded-full shadow-sm" />
                  ¿Qué es IMAGRAPHIC?
                </h4>
                <p className="text-sm">Una empresa enfocada en ofrecer servicios de diseño gráfico, branding y productos promocionales para marcas y negocios.</p>
              </div>

              <p>
                Sin embargo, identifiqué un problema claro: la empresa tenía una  <span className="text-slate-900 font-semibold underline decoration-orange-400 decoration-2 underline-offset-4">presencia muy limitada en redes sociales</span>. Esto generaba falta de visibilidad en su catálogo y dificultades para atraer nuevos clientes potenciales.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <Target className="w-8 h-8 text-orange-500 mb-4" />
                  <h4 className="font-bold mb-2">Meta Estratégica</h4>
                  <p className="text-sm">Diseñar y ejecutar una campaña en Instagram para aumentar alcance y visibilidad.</p>
                </div>
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <TrendingUp className="w-8 h-8 text-emerald-500 mb-4" />
                  <h4 className="font-bold mb-2">Solución Digital</h4>
                  <p className="text-sm">El marketing digital como herramienta para fortalecer la identidad y generar negocio.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:mt-12"
          >
            <div className="aspect-square bg-slate-50 flex items-center justify-center p-12 rounded-3xl overflow-hidden shadow-2xl rotate-3 border border-slate-100">
              <img 
                src="/assets/media__1773798634247.png" 
                alt="Gran Logo de IMAGRAPHIC" 
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-8 rounded-2xl shadow-xl -rotate-3 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-orange-400" />
                <span className="font-bold text-sm uppercase tracking-widest text-orange-400">Impacto Esperado</span>
              </div>
              <p className="text-base font-medium leading-relaxed italic">
                "Las plataformas como Instagram permiten llegar a una audiencia masiva, aumentar el reconocimiento e influir directamente en la decisión de compra."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="proceso" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Un plan de acción detallado para lograr el producto y los criterios de logro.">
            Línea de Tiempo
          </SectionTitle>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 bg-slate-900 rounded-full -translate-x-1/2 z-10 border-4 border-white hidden md:block" />
                  
                  <div className="md:w-1/2">
                    <div className={`p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2 block">{item.category}</span>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-500 mb-4">{item.description}</p>
                      <div className={`flex items-center gap-2 text-sm font-bold text-slate-400 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Creation Process - NEW SECTION */}
      <section id="edicion" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <SectionTitle subtitle="El paso a paso detallado desde el guion hasta la publicación estratégica.">
          Proceso de Creación (Reels)
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-4">
            {videoProcessSteps.map((step, index) => (
              <motion.div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all border ${activeStep === index ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white border-slate-100 hover:border-orange-200 shadow-sm'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeStep === index ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{step.title}</h4>
                    <p className={`text-xs ${activeStep === index ? 'text-slate-300' : 'text-slate-500'}`}>{step.description}</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm text-slate-300 leading-relaxed border-t border-white/10 mt-4">
                        {step.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="sticky top-32 hidden lg:block">
            <div className="relative aspect-[9/16] bg-slate-900 rounded-[40px] border-[12px] border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={videoProcessSteps[activeStep || 0].image} 
                    alt="Process Step" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                      {videoProcessSteps[activeStep || 0].icon}
                    </div>
                    <h3 className="text-3xl font-black mb-4 leading-tight">{videoProcessSteps[activeStep || 0].title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{videoProcessSteps[activeStep || 0].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Phone UI Overlay */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 space-y-4 opacity-50">
                <div className="w-1 h-12 bg-white/20 rounded-full" />
                <div className="w-1 h-8 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* El Proceso de Creación - Posts Estáticos */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-orange-50/50 rounded-full blur-[120px] -z-10" />
        
        <div className="relative z-10 mb-16 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Creación de Posts Estáticos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Metodología paso a paso enfocada puramente en la estructura de la información y los principios de diseño gráfico efectivo.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staticPostSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden ${index === 6 ? 'md:col-span-2 lg:col-span-3 xl:col-span-1' : ''}`}
            >
              {/* Subtle background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full transition-transform duration-500 group-hover:scale-110 -mr-10 -mt-10" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                <span className="text-5xl font-black text-slate-50 group-hover:text-orange-50 transition-colors duration-300 tracking-tighter">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Bottom decorative bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Product - Content Pieces */}
      <section id="producto" className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="4 piezas de contenido diseñadas siguiendo la identidad visual de IMAGRAPHIC.">
          La Campaña Digital
        </SectionTitle>
      </section>

      {/* Publicación A */}
      <div className="w-full relative bg-slate-900 border-t border-b border-slate-800">
        <HeroScrollVideo
          title="Branding IMAGRAPHIC"
          subtitle="Publicación A"
          meta="Reel • 2026"
          media="https://www.youtube.com/embed/oGhZcT0iJzk"
          mediaType="iframe"
          overlay={{
            caption: "PUBLICACIÓN • 01",
            heading: "Branding y Promocionales",
            paragraphs: ["Hook visual fuerte en los primeros segundos. Storytelling centrado en la dificultad de los emprendedores para ordenar merch online."],
          }}
          scrollHeightVh={160}
          className="w-full"
        />
      </div>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 mb-2 block">Publicación A - Análisis Post-Lanzamiento</span>
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold">304 vistas</div>
              <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold">39 interacciones</div>
              <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Nota: 8/8</div>
            </div>
          </div>
          
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Guion y Estructura
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Hook visual fuerte en los primeros segundos. Storytelling centrado en un problema real: la dificultad de los emprendedores para ordenar merch online. Se propone una solución clara a través de IMAGRAPHIC con un CTA fuerte."
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl">
            <h4 className="font-bold text-slate-900 mb-3">Análisis Técnico</h4>
            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5 mb-4">
              <li>13 transiciones dinámicas.</li>
              <li>9 clips de B-roll para mantener el ritmo.</li>
              <li>12 efectos de sonido (swoosh, clics).</li>
              <li>Corrección de color y etalonaje.</li>
            </ul>
            <img src="/assets/media__1773798411354.png" alt="Timeline de Edición en Premiere Pro" className="w-full rounded-xl shadow-sm border border-slate-200 mt-4" />
            <p className="text-xs text-slate-500 mt-2 text-center uppercase tracking-widest font-bold">Evidencia: Timeline de Premiere Pro</p>
          </div>
        </div>
      </section>

      {/* Publicación B */}
      <div className="w-full relative bg-slate-900 border-t border-b border-slate-800">
        <HeroScrollVideo
          title="Calidad y Confianza"
          subtitle="Publicación B"
          meta="Reel • 2026"
          media="https://www.youtube.com/embed/MJ98_7vWY_8"
          mediaType="iframe"
          overlay={{
            caption: "PUBLICACIÓN • 02",
            heading: "Demostrando Valor",
            paragraphs: ["Acción inicial fuerte motivando a la reflexión. Storytelling sobre los riesgos de trabajar con malos distribuidores.", "Refuerza la identidad y visión de IMAGRAPHIC de manera convincente y clara."],
          }}
          scrollHeightVh={160}
          className="w-full"
        />
      </div>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 mb-2 block">Publicación B - Análisis Post-Lanzamiento</span>
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold">360 vistas</div>
              <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold">49 interacciones</div>
              <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Nota: 8/8</div>
            </div>
          </div>
          
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Guion y Estructura
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Hook visual fuerte con acción inicial (tirando un objeto). Storytelling sobre los riesgos de trabajar con malos distribuidores. Refuerza la identidad y visión de IMAGRAPHIC como empresa confiable."
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl">
            <h4 className="font-bold text-slate-900 mb-3">Análisis Técnico</h4>
            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
              <li>17 transiciones para mayor fluidez.</li>
              <li>13 clips de B-roll de alta calidad.</li>
              <li>Más de 10 efectos de sonido de énfasis.</li>
              <li>Uso de zoom y hook visual de impacto.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continuation of The Product Section */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-24">
          {/* Publicaciones C y D */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm p-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Publicación C - Post Estático</span>
              <h3 className="text-2xl font-bold mb-4">"The Sky is the Limit"</h3>
              <div className="bg-slate-100 rounded-2xl mb-6 overflow-hidden shadow-inner border border-slate-200">
                <img src="/assets/media__1773799988417.png" alt="The Sky is the limit" className="w-full h-auto block" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span>Nota: 6/8</span>
                  <span className="text-slate-400">8 Likes</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Logra transmitir la visión de IMAGRAPHIC con la frase "Go Beyond Branding". Refuerza valores de crecimiento y creatividad. Incluye estructura de diseño dinámico para presentar los productos.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm p-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Publicación D - Post Estático</span>
              <h3 className="text-2xl font-bold mb-4">Tote Bags + Pouches</h3>
              <div className="bg-slate-100 rounded-2xl mb-6 overflow-hidden shadow-inner border border-slate-200">
                <img src="/assets/media__1773799955287.png" alt="Tote bags" className="w-full h-auto block" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span>Nota: 6/8</span>
                  <span className="text-slate-400">9 Interacciones</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Información presentada de manera clara con buena jerarquía visual. La composición guía la atención y comunica los beneficios directos de los productos de IMAGRAPHIC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATL Skills */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Habilidades ATL</h2>
            <p className="text-slate-400 max-w-xl">Enfoques de aprendizaje aplicados para contribuir al objetivo del proyecto.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {atlSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Evaluation */}
      <section id="resultados" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <SectionTitle subtitle="Evaluación final según los criterios de éxito establecidos.">
              Resultados
            </SectionTitle>
            <div className="space-y-4">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Criterio A: Alcance</span>
                  <span className="text-orange-600 font-black text-xl">4 / 8</span>
                </div>
                <p className="text-xs text-slate-500 italic">"Resultados moderados. Los videos tuvieron mejor alcance, pero no se lograron acciones posteriores directas."</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Criterio B: Impacto</span>
                  <span className="text-orange-600 font-black text-xl">7 / 8</span>
                </div>
                <p className="text-xs text-slate-500 italic">"El público percibió el contenido como relevante, atractivo y útil para el crecimiento de una empresa."</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">Criterio C: Calidad</span>
                  <span className="text-orange-600 font-black text-xl">7 / 8</span>
                </div>
                <p className="text-xs text-slate-500 italic">"Competencias sólidas en edición y marketing. Los reels demostraron una calidad técnica superior."</p>
              </div>
              <div className="p-8 bg-slate-900 text-white rounded-2xl flex justify-between items-center shadow-xl mt-4">
                <span className="font-bold text-lg">Nota Final</span>
                <span className="text-orange-400 font-black text-3xl">6 / 8</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="text-orange-500" /> Percepción del Público
              </h3>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Claridad del Mensaje</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '88%' }}
                      viewport={{ once: true }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                  <p className="text-xs text-slate-400">El público logró identificar a quién iba dirigido el contenido.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Atractivo Visual</span>
                    <span>88.4%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '88.4%' }}
                      viewport={{ once: true }}
                      className="h-full bg-orange-500" 
                    />
                  </div>
                  <p className="text-xs text-slate-400">Percepción positiva sobre la estética y calidad de edición.</p>
                </div>
                <div className="space-y-4 sm:col-span-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Potencial de Crecimiento</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '96%' }}
                      viewport={{ once: true }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                  <p className="text-xs text-slate-400">Consideran que este contenido podría atraer clientes potenciales.</p>
                </div>
              </div>

              {/* Instagram Account After Result */}
              <div className="mt-12 bg-slate-900 rounded-3xl p-8 overflow-hidden relative shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <Instagram className="text-orange-400" /> Nueva Cara de la Compañía
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Tras la implementación de la campaña, la cuenta de Instagram "imagraphic_promo" adoptó una estética profundamente profesional. Se consolidó una identidad visual premium y un catálogo de contenido sólido que no sólo atrae miradas, sino que fomenta una percepción de alta calidad en los clientes potenciales.
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img src="/assets/media__1773799368256.png" alt="Cuenta de Instagram Final" className="w-full object-cover" />
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-orange-50 p-10 rounded-3xl border border-orange-100">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-orange-600" /> Conclusión Clave
              </h3>
              <p className="text-lg text-orange-900/80 leading-relaxed italic">
                "El éxito no es un resultado garantizado por la calidad técnica, sino que depende de la constancia, la estrategia y la adaptación al algoritmo. He aprendido que el crecimiento orgánico es un proceso a largo plazo."
              </p>
            </div>

          </div>
        </div>
      </section>

    {/* Errores y Mejoras */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-50 rounded-[40px] my-12">
        <SectionTitle subtitle="Un análisis reflexivo sobre los obstáculos encontrados y las soluciones para el futuro.">
          Errores y Mejoras
        </SectionTitle>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Columna de Errores */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
               Obstáculos Identificados
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Falta de análisis de audiencia",
                  desc: "Algunas piezas no lograron el nivel de interacción por falta de análisis profundo del contenido que conecta."
                },
                {
                  title: "Planificación limitada",
                  desc: "Generó ineficiencia durante la grabación, repetición de tomas y menor optimización del tiempo."
                },
                {
                  title: "Inconsistencia visual",
                  desc: "Se presentaron inconsistencias en colores, estilo y composición, afectando la identidad de marca."
                },
                {
                  title: "Investigación superficial",
                  desc: "Faltó una investigación constante de tendencias para adaptar mejor el contenido a formatos de mayor alcance."
                }
              ].map((error, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="p-6 bg-white border border-red-100 rounded-2xl shadow-sm"
                >
                  <h4 className="font-bold text-slate-900 mb-2">{error.title}</h4>
                  <p className="text-sm text-slate-600">{error.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Columna de Mejoras */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
               Soluciones a Futuro
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Estructura y Storyboards",
                  desc: "Priorizar guiones detallados y storyboards claros para agilizar la producción audiovisual."
                },
                {
                  title: "Análisis Estratégico",
                  desc: "Fortalecer la evaluación previa de métricas y tendencias para decisiones informadas desde el inicio."
                },
                {
                  title: "Identidad Gráfica Sólida",
                  desc: "Mantener una línea visual estricta en todas las publicaciones para reforzar la coherencia operativa."
                },
                {
                  title: "Cultura de Feedback",
                  desc: "Aprovechar la retroalimentación propia y externa como herramienta clave para elevar la calidad."
                }
              ].map((improvement, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-md text-white"
                >
                  <h4 className="font-bold text-emerald-400 mb-2">{improvement.title}</h4>
                  <p className="text-sm text-slate-300">{improvement.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-orange-100/50 border border-orange-200 rounded-3xl text-center max-w-3xl mx-auto"
        >
          <Lightbulb className="w-8 h-8 text-orange-500 mx-auto mb-4" />
          <p className="text-base text-orange-900 font-medium italic">
            "Este proceso de análisis y mejora continua resultó fundamental para el desarrollo de habilidades críticas y para optimizar futuros proyectos."
          </p>
        </motion.div>
      </section>

      {/* Final Reflection */}
      <section className="py-24 bg-[#FDFCFB]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-500 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" /> Contexto Global
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Innovación Científica y Técnica</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Este proyecto demuestra cómo la innovación tecnológica —las redes sociales, la edición digital y los algoritmos— transforma la forma en que las empresas crecen, se posicionan y comunican sus mensajes. A través de herramientas digitales, resolvemos necesidades reales en el ámbito empresarial.
            </p>
            <div className="pt-10">
              <div className="w-16 h-16 bg-slate-900 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl mb-4">J</div>
              <p className="font-bold text-lg">Juan Diego Alomia Franco</p>
              <p className="text-slate-400 text-sm">Estudiante IB - Creador del Proyecto</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/assets/media__1773798634247.png" alt="IMAGRAPHIC Logo" className="w-12 h-12 object-contain rounded-full shadow-md" />
            <span className="font-bold text-xl tracking-tighter">IMAGRAPHIC</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Proyecto Personal IB. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors"><ExternalLink className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
