import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qrqzvuoymajceqplmfmc.supabase.co',
  'sb_publishable_DCR4nu-D0VQMsDtsyGP5aQ_sjhpflKl'
);

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const SERVICES = [
  {
    id: 1,
    name: 'Construção Residencial',
    description: 'Casas, apartamentos e condomínios com acabamento de alto padrão e projetos personalizados.',
    icon: '🏠',
    category: 'Obras',
  },
  {
    id: 2,
    name: 'Reformas e Ampliações',
    description: 'Reformas completas com planejamento detalhado e execução eficiente para transformar seu espaço.',
    icon: '🔨',
    category: 'Reformas',
  },
  {
    id: 3,
    name: 'Construção Comercial',
    description: 'Galpões, lojas e escritórios prontos para o seu negócio, focando em funcionalidade e design.',
    icon: '🏢',
    category: 'Obras',
  },
  {
    id: 4,
    name: 'Acabamento e Pintura',
    description: 'Pintura interna, externa e revestimentos decorativos com materiais de primeiríssima qualidade.',
    icon: '🎨',
    category: 'Acabamento',
  },
  {
    id: 5,
    name: 'Instalações Elétricas e Hidráulicas',
    description: 'Projetos e manutenção com materiais certificados e profissionais altamente qualificados.',
    icon: '⚡',
    category: 'Instalações',
  },
  {
    id: 6,
    name: 'Projetos e Consultoria',
    description: 'Acompanhamento técnico especializado do projeto à entrega final da obra.',
    icon: '📋',
    category: 'Consultoria',
  },
];

const PROJECTS = [
  {
    id: 1,
    name: 'Residencial Vila Nova',
    location: 'São Paulo, SP',
    category: 'Residencial',
    image: 'residential_project_vila_nova_1774181099037.png',
  },
  {
    id: 2,
    name: 'Centro Empresarial Horizonte',
    location: 'Campinas, SP',
    category: 'Comercial',
    image: 'commercial_project_horizonte_1774181132482.png',
  },
  {
    id: 3,
    name: 'Galpão Logístico LP-12',
    location: 'Guarulhos, SP',
    category: 'Industrial',
    image: 'industrial_project_logistics_1774181322517.png',
  },
];

const STATS = [
  { value: 350, suffix: '+', label: 'Obras Concluídas', decimal: false },
  { value: 15, suffix: '', label: 'Anos de Mercado', decimal: false },
  { value: 98, suffix: '%', label: 'Clientes Satisfeitos', decimal: false },
  { value: 47, suffix: '', label: 'Profissionais', decimal: false },
];

const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Serviços', href: '#services' },
  { label: 'Projetos', href: '#portfolio' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
];

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

function WhatsAppButton() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[100] group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Hover Info Card */}
      <div className="absolute bottom-full right-0 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 origin-bottom-right pointer-events-none translate-y-4 group-hover:translate-y-0">
        <div className="glass p-5 rounded-[2rem] border-flame/30 overflow-hidden min-w-[220px] flex flex-col items-center gap-4 text-center orange-glow">
          <div className="relative">
            <img
              src="joao-victor.png"
              alt="Joao Victor"
              className="w-28 h-28 rounded-full object-cover border-4 border-flame/50 shadow-2xl"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#25D366] rounded-full border-2 border-deep flex items-center justify-center text-[10px]">
              📱
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black text-flame uppercase tracking-[0.2em] block mb-1">Online Agora</span>
            <span className="text-sm font-black text-white uppercase tracking-widest block whitespace-nowrap">FALAR COM JOAO VICTOR</span>
          </div>
        </div>
        {/* Triangle tip */}
        <div className="absolute top-full right-6 -translate-y-4 w-4 h-4 glass border-flame/30 rotate-45 border-t-0 border-l-0" />
      </div>

      {/* Floating Button */}
      <motion.a
        href="https://wa.me/351934627192"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp-premium block w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-3xl group-hover:scale-110 glow-active"
        whileHover={{ rotate: 15, scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.82db-.333.051-.741.066-2.147-.514-1.743-.718-2.859-2.529-2.946-2.644-.087-.115-.717-.953-.717-1.815a1.868 1.868 0 0 1 .554-1.393c.189-.189.41-.284.545-.284.136 0 .272.001.392.006.124.005.291-.047.457.346.166.392.569 1.383.619 1.482.051.1.084.216.017.348-.067.133-.101.216-.201.332-.1.116-.21.26-.3.348-.1.087-.205.183-.088.383.117.2.518.854 1.112 1.385.765.684 1.408.896 1.607.994.2.098.316.083.432-.051.116-.134.502-.584.636-.784.135-.2.27-.167.455-.1.187.067 1.179.556 1.384.657.205.101.341.15.392.236.05.086.05.498-.094.903zM12 2a10 10 0 0 0-10 10c0 1.84.498 3.565 1.365 5.052L2 22l5.14-1.348A9.97 9.97 0 0 0 12 22a10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
        </svg>
      </motion.a>
    </motion.div>
  );
}

function AnimatedLogo({ size = 'normal' }: { size?: 'normal' | 'small' }) {
  const letters = ['M', 'C', 'P'];
  const isSmall = size === 'small';

  return (
    <motion.div
      className="flex items-center gap-3 group cursor-pointer select-none"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Icon badge */}
      <motion.div
        className={`relative flex items-center justify-center rounded-xl overflow-hidden
          ${isSmall ? 'w-10 h-10' : 'w-14 h-14'}
          bg-gradient-to-br from-gold via-flame to-ember shadow-xl shadow-flame/40`}
        variants={{
          hover: { scale: 1.15, rotate: -6 },
          rest: { scale: 1, rotate: 0 },
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 16 }}
      >
        {/* Pulsing glow ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-white/40"
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
        {/* Bouncing letters */}
        <div className="flex gap-px relative z-10">
          {letters.map((l, i) => (
            <motion.span
              key={l + i}
              className={`font-black text-deep leading-none ${isSmall ? 'text-[11px]' : 'text-[15px]'}`}
              variants={{
                hover: {
                  y: [0, -5, 0],
                  transition: { delay: i * 0.09, repeat: Infinity, duration: 0.55, ease: 'easeOut' },
                },
                rest: { y: 0 },
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-[-20deg]"
          animate={{ x: ['-130%', '210%'] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'linear', repeatDelay: 0.8 }}
        />
      </motion.div>

      {/* Text */}
      <div className="flex flex-col leading-none gap-0.5">
        <motion.div
          className="flex items-baseline gap-1.5"
          variants={{ hover: { x: 4 }, rest: { x: 0 } }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        >
          {'MCP'.split('').map((ch, i) => (
            <motion.span
              key={ch + i}
              className={`font-black tracking-tight text-white ${isSmall ? 'text-xl' : 'text-[1.75rem]'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 + 0.15, duration: 0.4, ease: 'easeOut' }}
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            className={`text-flame font-black uppercase tracking-wide ${isSmall ? 'text-sm' : 'text-[1.1rem]'}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: 'easeOut' }}
          >
            CONSTRUÇÕES
          </motion.span>
        </motion.div>
        {!isSmall && (
          <motion.span
            className="text-[9px] font-bold uppercase tracking-[0.4em]"
            variants={{
              hover: { opacity: 1, letterSpacing: '0.52em', color: '#f97316' },
              rest: { opacity: 0.5, letterSpacing: '0.4em', color: '#6b7280' },
            }}
            transition={{ duration: 0.3 }}
          >
            Engenharia &amp; Obras
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = '', decimal = false }: { value: number; suffix?: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frameId: number;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(decimal ? Math.round(eased * value * 10) / 10 : Math.round(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, decimal]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SparkParticles() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
        color: ['#fbbf24', '#f97316', '#ea580c'][Math.floor(Math.random() * 3)],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="ember-particle"
          style={{
            left: `${s.left}%`,
            bottom: '-10px',
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-deep/90 backdrop-blur-2xl shadow-2xl border-b border-white/5' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a href="#hero" whileTap={{ scale: 0.97 }}>
            <AnimatedLogo />
          </motion.a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.4 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-flame rounded-full transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a
              href="tel:11999999999"
              className="ml-2 px-6 py-2.5 btn-premium rounded text-sm font-bold text-white shadow-lg"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Ligar Agora
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white relative z-50" aria-label="Menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`block w-full h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-full h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-deep/98 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg font-bold text-gray-200 hover:text-flame transition-colors py-1"
                  whileTap={{ scale: 0.95, x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:11999999999"
                onClick={() => setMenuOpen(false)}
                className="btn-premium glow-active block w-full text-center px-6 py-4 rounded text-base font-black text-white shadow-lg mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Ligar Agora
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[750px] overflow-hidden flex items-center">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(hero_construction_sunset_1774181038523.png)` }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep/90 via-deep/40 to-deep" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep via-transparent to-deep/20" />

      {/* Particles */}
      <SparkParticles />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div className="max-w-3xl" style={{ opacity: contentOpacity, y: contentY }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded text-flame text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-flame animate-pulse" />
              Construção Civil de Alto Padrão
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="mb-6">
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tighter">
              Construímos o futuro
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tighter text-gradient-fire mt-2">
              com excelência
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed font-medium">
            Mais de 15 anos de experiência em obras residenciais, comerciais e industriais. Qualidade, prazo e compromisso em cada projeto.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contact"
              className="btn-premium glow-active px-10 py-5 rounded font-black text-white shadow-2xl flex items-center justify-center gap-3 group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicite um Orçamento
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.a>

            <motion.a
              href="#portfolio"
              className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-bold text-white backdrop-blur-md transition-all flex items-center justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Projetos
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating stats on desktop */}
      <div className="absolute right-0 bottom-20 hidden xl:block">
        <div className="glass p-10 rounded-l-3xl border-r-0 flex flex-col gap-10">
          {STATS.slice(0, 3).map((stat, i) => (
            <div key={i} className="text-right">
              <div className="text-4xl font-black text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="mb-20">
          <span className="text-flame font-black uppercase tracking-[0.2em] text-sm">O Que Fazemos</span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter">
            Nossos Serviços
            <span className="block text-gray-500 font-medium text-2xl md:text-3xl mt-2 tracking-normal">
              Soluções completas em construção civil
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <motion.div
                className="glass p-8 h-full rounded-2xl hover:border-flame/30 transition-colors group relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-flame transition-colors tracking-tight">
                  {service.name}
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* Visual accent */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-flame/5 rounded-full blur-xl group-hover:bg-flame/20 transition-colors" />
                <div className="mt-8">
                  <span className="text-xs font-black text-flame uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Saiba Mais →</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PORTFOLIO
   ═══════════════════════════════════════════ */

function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <AnimatedSection className="max-w-2xl">
            <span className="text-flame font-black uppercase tracking-[0.2em] text-sm">Portfólio</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter">
              Projetos que falam <br />
              <span className="text-gradient-fire">por nós</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <motion.button
              className="px-8 py-4 border border-white/10 rounded font-bold hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Todos os Projetos
            </motion.button>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.15}>
              <motion.div
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-flame rounded text-[10px] font-black uppercase tracking-widest text-white mb-2 shadow-lg">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium flex items-center gap-2 mt-1">
                      {project.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT US
   ═══════════════════════════════════════════ */

function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-flame/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection className="relative">
            <div className="relative rounded-3xl overflow-hidden orange-glow">
              <img
                src="construction_team_detail_1774181695469.png"
                alt="Equipe ConstruPRO"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating year badge */}
              <div className="absolute bottom-6 left-6 glass p-6 rounded-2xl border-flame/20">
                <div className="text-5xl font-black text-flame">15</div>
                <div className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-1">Anos de <br />Experiência</div>
              </div>
            </div>

            {/* Background geometric shape */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l-4 border-t-4 border-flame/30 -z-10 rounded-tl-3xl" />
          </AnimatedSection>

          <AnimatedSection>
            <span className="text-flame font-black uppercase tracking-[0.2em] text-sm">Sobre Nós</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter leading-none mb-8">
              Compromisso com <br />
              <span className="text-gradient-fire">qualidade desde 2009</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
              A <strong className="text-white">MCP Construções</strong> nasceu da paixão por transformar projetos em realidade. Com uma equipe multidisciplinar e processos otimizados, entregamos obras que superam as expectativas de nossos clientes.
            </p>
            <p className="text-gray-400 mb-10 leading-relaxed font-medium">
              Do alicerce ao acabamento, cada detalhe importa. Nossa trajetória é marcada pela confiança conquistada através de resultados sólidos e transparentes.
            </p>

            <ul className="grid sm:grid-cols-2 gap-6">
              {[
                'Equipe técnica especializada',
                'Materiais de alta qualidade',
                'Cumprimento rigoroso de prazos',
                'Acompanhamento personalizado'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-bold">
                  <span className="w-5 h-5 rounded-full bg-flame/20 flex items-center justify-center text-flame text-[10px]">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service_type: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: sbError } = await supabase
        .from('contacts')
        .insert([formData]);

      if (sbError) throw sbError;

      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', service_type: '', description: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-deep relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <AnimatedSection>
            <span className="text-flame font-black uppercase tracking-[0.2em] text-sm">Contato</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter leading-none mb-8">
              Vamos conversar sobre <br />
              <span className="text-gradient-fire">seu projeto</span>
            </h2>

            <div className="space-y-10 mt-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded flex items-center justify-center text-2xl shrink-0">📍</div>
                <div>
                  <h4 className="font-black text-gray-400 uppercase tracking-widest text-xs mb-2">Endereço</h4>
                  <p className="text-xl font-bold">Av. Paulista, 1234 — São Paulo, SP</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded flex items-center justify-center text-2xl shrink-0">📞</div>
                <div>
                  <h4 className="font-black text-gray-400 uppercase tracking-widest text-xs mb-2">Telefone</h4>
                  <p className="text-xl font-bold">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded flex items-center justify-center text-2xl shrink-0">✉️</div>
                <div>
                  <h4 className="font-black text-gray-400 uppercase tracking-widest text-xs mb-2">E-mail</h4>
                  <p className="text-xl font-bold">contato@jcconstrucoes.com.br</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded flex items-center justify-center text-2xl shrink-0">⏰</div>
                <div>
                  <h4 className="font-black text-gray-400 uppercase tracking-widest text-xs mb-2">Horário</h4>
                  <p className="text-xl font-bold">Seg-Sex: 08h às 18h</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="glass p-8 md:p-12 rounded-3xl orange-glow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nome completo</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-flame outline-none transition-colors"
                    placeholder="João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Telefone</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-flame outline-none transition-colors"
                    placeholder="(11) 99999-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">E-mail</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-flame outline-none transition-colors"
                  placeholder="joao@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tipo de serviço</label>
                <select
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-flame outline-none transition-colors"
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                >
                  <option className="bg-deep" value="">Selecione...</option>
                  <option className="bg-deep" value="Residencial">Construção Residencial</option>
                  <option className="bg-deep" value="Reformas">Reformas</option>
                  <option className="bg-deep" value="Comercial">Construção Comercial</option>
                  <option className="bg-deep" value="Pintura">Pintura e Acabamento</option>
                  <option className="bg-deep" value="Outros">Outros Projetos</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Descreva seu projeto</label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-flame outline-none transition-colors"
                  placeholder="Fale um pouco sobre a obra que deseja realizar..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-lg text-sm font-bold text-center"
                  >
                    MENSAGEM ENVIADA COM SUCESSO! ENTRAREMOS EM CONTATO EM BREVE.
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm font-bold text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="btn-premium w-full py-5 rounded font-black text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 italic"
                type="submit"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ENVIANDO...
                  </>
                ) : 'Enviar Mensagem'}
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-12 bg-midnight border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <AnimatedLogo size="small" />
        </div>
        <p className="text-gray-500 text-sm font-medium">
          &copy; 2024 MCP Construções Engenharia e Obras. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export default function App() {
  return (
    <div className="noise-overlay selection:bg-flame selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
