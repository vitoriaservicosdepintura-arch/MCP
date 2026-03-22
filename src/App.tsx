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

        </div>
      </div>

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
   MOBILE BOTTOM NAV
   ═══════════════════════════════════════════ */

function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'contact', 'portfolio', 'about'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = section;
        }
      }
      if (current) setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      id: 'hero', label: 'INÍCIO', icon:
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    },
    {
      id: 'services', label: 'SERVIÇOS', icon:
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    },
    {
      id: 'contact', label: 'ORÇAMENTO', special: true, icon:
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c-2.28 0-3-1.5-3-3s3-5 3-5f-1 1-1 2.5S11.5 9 13 9c2.28 0 3 1.5 3 3a4.5 4.5 0 0 1-4.5 4.5c-3 0-4.5-1.5-4.5-3z" />
          <path d="M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        </svg>
    },
    {
      id: 'portfolio', label: 'PORTFÓLIO', icon:
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
    },
    {
      id: 'about', label: 'SOBRE', icon:
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-[90]">
      <div className="bg-[#121626]/95 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl flex items-center justify-between px-2 py-2 relative h-[72px]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          if (item.special) {
            return (
              <div key={item.id} className="relative flex flex-col items-center justify-center w-1/5 h-full">
                <motion.a
                  href={`#${item.id}`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab(item.id)}
                  className="absolute -top-6 w-[72px] h-[72px] rounded-full bg-deep border-[6px] border-[#0a0a0c] flex flex-col items-center justify-center shadow-lg flame-float-btn"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gold via-flame to-ember flex flex-col items-center justify-center glow-active">
                    <div className="text-white mb-0.5">{item.icon}</div>
                  </div>
                </motion.a>
                <span className="absolute bottom-1 text-[9px] font-black text-flame tracking-widest mt-6">
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <div key={item.id} className="w-1/5 h-full relative">
              <motion.a
                href={`#${item.id}`}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(item.id)}
                className="w-full h-full flex flex-col items-center justify-center gap-1.5"
              >
                <div className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-[8px] font-black tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </motion.a>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-flame rounded-full blur-[2px]"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export default function App() {
  return (
    <div className="noise-overlay selection:bg-flame selection:text-white pb-[100px] lg:pb-0">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  );
}
