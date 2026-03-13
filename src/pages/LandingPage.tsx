import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Linkedin,
  PieChart,
  BarChart3,
  FileText,
  Home,
  ArrowDownCircle,
  MoveRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
gsap.registerPlugin(ScrollTrigger);
import { twMerge } from 'tailwind-merge';
import IntroAnimation from '../components/animations/IntroAnimation';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── Reusable Components ─── */

function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
}) {
  const variants = {
    primary: 'bg-[#000046] text-white hover:bg-[#FF8217]',
    secondary: 'bg-[#FF8217] text-white hover:bg-[#000046]',
    outline: 'border border-[#000046] text-[#000046] hover:bg-[#000046] hover:text-white',
    ghost: 'text-[#000046] hover:text-[#FF8217]',
  };

  return (
    <button
      className={cn(
        'px-8 py-4 rounded-xl transition-all duration-300 font-medium text-[11px] tracking-[2px] uppercase flex items-center justify-center gap-4 cursor-pointer',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function SectionHeading({ label, title, light = false, font }: { label?: string; title: string; light?: boolean; font?: string }) {
  return (
    <div className="mb-12">
      {label && (
        <span className="text-[#FF8217] text-[11px] tracking-[2px] font-medium uppercase block mb-4">{label}</span>
      )}
      <h2
        className={cn('text-3xl md:text-4xl lg:text-[36px] font-normal leading-tight', light ? 'text-white' : 'text-[#000046]')}
        style={{ fontFamily: font || "'Moret', 'Georgia', serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ─── Floating Banner ─── */

function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('ivesta-announcement-dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  useGSAP(() => {
    if (isVisible && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { y: -100, opacity: 0, x: '-50%' },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.5 }
      );
    }
  }, [isVisible]);

  const handleDismiss = () => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: -100, opacity: 0, duration: 0.5, ease: 'power4.in',
        onComplete: () => {
          setIsVisible(false);
          sessionStorage.setItem('ivesta-announcement-dismissed', 'true');
        },
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed top-3 left-1/2 z-[100] flex items-center gap-4 px-5 py-2.5 bg-[#000046]/95 backdrop-blur-md border border-white/10 shadow-xl rounded-full min-w-max"
      style={{ transform: 'translateX(-50%)', opacity: 0 }}
    >
      <div className="flex items-center justify-center text-[#FF8217]">
        <Sparkles size={16} strokeWidth={2.5} />
      </div>
      <div className="flex items-center gap-6">
        <p className="text-[14px] font-medium text-white tracking-tight">
          iVesta ouvre ses portes à Bruxelles
        </p>
        <a
          href="#contact"
          className="group flex items-center gap-1.5 text-[11px] uppercase tracking-[2px] font-bold text-[#FF8217] transition-colors duration-300 hover:text-white"
        >
          En savoir plus
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
      <div className="w-[1px] h-4 bg-white/20 ml-2" />
      <button
        onClick={handleDismiss}
        className="p-1 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Fermer l'annonce"
      >
        <X size={14} />
      </button>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF8217]/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

/* ─── Data ─── */

const NAV_LINKS = [
  {
    name: 'QUI SOMMES-NOUS',
    href: '#manifeste',
    dropdown: ['Manifeste', 'Nos valeurs', 'Notre engagement'],
  },
  { name: 'NOTRE OFFRE', href: '#offre' },
  { name: 'NOTRE ÉQUIPE', href: '#equipe' },
  { name: 'CONTACT & PRESSE', href: '#contact' },
];

const SERVICES = [
  {
    title: 'Planification Patrimoniale',
    description: "Conception et exécution de stratégies adaptées à vos besoins patrimoniaux. Investissements financiers, projets immobiliers, protection familiale.",
    bg: 'bg-[#FAEBDC]',
    icon: <BarChart3 className="w-8 h-8 text-[#000046]" />,
    textColor: 'text-[#000046]',
  },
  {
    title: "Allocation d'Actifs",
    description: "Déploiement et diversification des stratégies d'investissement. Couverture de toutes classes d'actifs, portefeuilles résilients.",
    bg: 'bg-[#FFB9AD]',
    icon: <PieChart className="w-8 h-8 text-[#000046]" />,
    textColor: 'text-[#000046]',
  },
  {
    title: 'Accompagnement Administratif',
    description: 'Coordination de vos partenaires via un point de contact unique. Suivi et reporting consolidés.',
    bg: 'bg-[#E3F1EC]',
    icon: <FileText className="w-8 h-8 text-[#000046]" />,
    textColor: 'text-[#000046]',
  },
  {
    title: 'Conciergerie',
    description: 'Gestion des affaires familiales, administration des biens immobiliers. Service haut de gamme sur mesure.',
    bg: 'bg-[#000046]',
    icon: <Home className="w-8 h-8 text-white" />,
    textColor: 'text-white',
  },
];

const TEAM = [
  { name: 'Ariane Darmon', role: 'Co-fondatrice, Wealth Planning', initial: 'AD' },
  { name: 'Christine Vu Thien', role: 'Co-fondatrice, Operations & Risk', initial: 'CV' },
  { name: 'Pierre-Marie de Forville', role: 'Co-fondateur, Private Markets', initial: 'PF' },
  { name: 'Rémi Douchet', role: 'Co-fondateur, Financial Markets', initial: 'RD' },
];

/* ─── Main Component ─── */

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', tel: '', message: '' });
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const manifesteRef = useRef<HTMLElement>(null);
  const valeursRef = useRef<HTMLElement>(null);
  const engagementRef = useRef<HTMLElement>(null);
  const offreRef = useRef<HTMLElement>(null);
  const equipeRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const carriereRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const headingFont = `'Moret', 'Georgia', serif`;
  const bodyFontFamily = `'Sailec', 'Inter', sans-serif`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMenuOpen) {
      gsap.fromTo(mobileMenuRef.current, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' });
    }
  }, [isMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    if (!mobileMenuRef.current) { setIsMenuOpen(false); return; }
    gsap.to(mobileMenuRef.current, {
      x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => setIsMenuOpen(false),
    });
  }, []);

  // GSAP dropdown animations
  useEffect(() => {
    dropdownRefs.current.forEach((el, name) => {
      if (activeDropdown === name) {
        gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
      }
    });
  }, [activeDropdown]);

  // Hero entrance + scroll-triggered section reveals
  useGSAP(() => {
    if (!introComplete) return;

    // Hero entrance timeline
    if (heroRef.current) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo(heroRef.current.querySelector('.hero-label'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(heroRef.current.querySelector('.hero-title'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(heroRef.current.querySelector('.hero-desc'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(heroRef.current.querySelector('.hero-buttons'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo(heroRef.current.querySelectorAll('.hero-shape'), { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 1, stagger: 0.15, ease: 'elastic.out(1, 0.5)' }, '-=1');
    }

    // Scroll-triggered reveals for all below-fold sections
    const revealSections = [
      { ref: statsRef, selector: '.stat-item', stagger: true },
      { ref: manifesteRef, selectors: ['.manifeste-quote', '.manifeste-text'] },
      { ref: valeursRef, selector: '.valeur-card', stagger: true },
      { ref: engagementRef, selectors: ['.engagement-title'], selector: '.engagement-stat', stagger: true },
      { ref: offreRef, selector: '.offre-card', stagger: true },
      { ref: equipeRef, selector: '.team-member', stagger: true },
      { ref: contactRef, selectors: ['.contact-info', '.contact-form'] },
      { ref: carriereRef, children: true },
      { ref: footerRef, selector: '.footer-col', stagger: true },
    ];

    revealSections.forEach(({ ref, selector, selectors, stagger, children }) => {
      if (!ref.current) return;
      const trigger = { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' as const };

      if (selectors) {
        const tl = gsap.timeline({ scrollTrigger: trigger });
        selectors.forEach((sel, i) => {
          const el = ref.current!.querySelector(sel);
          if (el) tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, i * 0.2);
        });
        // Also handle stagger selector if both are provided (engagement)
        if (selector) {
          const els = ref.current!.querySelectorAll(selector);
          if (els.length) tl.fromTo(els, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)' }, '-=0.3');
        }
      } else if (selector && stagger) {
        gsap.fromTo(
          ref.current!.querySelectorAll(selector),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', scrollTrigger: trigger }
        );
      } else if (children) {
        gsap.fromTo(
          ref.current!.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: trigger }
        );
      }
    });
  }, { scope: containerRef, dependencies: [introComplete] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci pour votre message. Nous vous recontacterons rapidement.');
    setFormData({ prenom: '', nom: '', email: '', tel: '', message: '' });
  };

  return (
    <>
      {showIntro && (
        <IntroAnimation
          onRevealStart={() => setIntroComplete(true)}
          onComplete={() => {
            setShowIntro(false);
          }}
        />
      )}
      <div
        ref={containerRef}
        className="min-h-screen bg-[#F7F7F9] text-[#000046] selection:bg-[#FF8217] selection:text-white"
        style={{ fontFamily: bodyFontFamily }}
      >
      {/* ══════════════ FLOATING BANNER ══════════════ */}
      <AnnouncementBanner />

      {/* ══════════════ 1. NAVBAR ══════════════ */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500 bg-white border-b border-gray-100',
          scrolled ? 'py-4 shadow-sm' : 'py-6'
        )}
      >
        <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-[#000046] w-10 h-10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#FF8217]">
              <span className="text-white font-bold text-xl" style={{ fontFamily: headingFont }}>
                iV
              </span>
            </div>
            <span className="text-2xl font-normal tracking-tight text-[#000046]" style={{ fontFamily: headingFont }}>
              iVesta
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative group py-2"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="text-[11px] tracking-[2px] font-normal hover:text-[#FF8217] transition-colors flex items-center gap-1"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-3 h-3" />}
                </a>

                {link.dropdown && activeDropdown === link.name && (
                  <div
                    ref={(el) => { if (el) dropdownRefs.current.set(link.name, el); }}
                    className="absolute top-full left-0 bg-white border-t-2 border-[#FF8217] shadow-xl rounded-xl p-6 min-w-[220px] flex flex-col gap-4"
                    style={{ opacity: 0 }}
                  >
                    {link.dropdown.map((item) => (
                      <a key={item} href="#" className="text-[13px] hover:text-[#FF8217] transition-colors whitespace-nowrap">
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="primary" className="ml-4 px-6 py-3" onClick={() => navigate('/login')}>
              ESPACE CLIENT
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden" onClick={() => isMenuOpen ? closeMobileMenu() : setIsMenuOpen(true)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col p-10 pt-32 gap-8"
          style={{ transform: 'translateX(100%)', opacity: 0 }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium tracking-widest text-[#000046]"
              onClick={closeMobileMenu}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="mt-4 w-full" onClick={() => { closeMobileMenu(); navigate('/login'); }}>
            ESPACE CLIENT
          </Button>
        </div>
      )}

      <main>
        {/* ══════════════ 2. HERO ══════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F7F7F9]">
          <div className="hero-shape absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-[#FAEBDC] rounded-[3rem] rotate-12 -z-0" />
          <div className="hero-shape absolute bottom-[10%] left-[-2%] w-[300px] h-[300px] bg-[#000046] rounded-[3rem] opacity-5 -z-0" />
          <div className="hero-shape absolute top-[10%] left-[40%] w-20 h-20 bg-[#FF8217] rounded-2xl rotate-45 opacity-20" />

          <div className="max-w-[1140px] mx-auto px-6 relative z-10 w-full">
            <div className="max-w-3xl">
              <span
                className="hero-label text-[#FF8217] text-[11px] tracking-[4px] font-bold uppercase block mb-6"
                style={{ opacity: 0 }}
              >
                FAMILY OFFICE INDÉPENDANT
              </span>
              <h1
                className="hero-title text-5xl md:text-7xl lg:text-[72px] font-normal leading-[1.1] text-[#000046] mb-8"
                style={{ fontFamily: headingFont, opacity: 0 }}
              >
                Libre d'être <br />
                <span className="italic">de votre côté</span>
              </h1>
              <p
                className="hero-desc text-lg md:text-xl text-[#231F20] mb-12 max-w-xl leading-relaxed"
                style={{ opacity: 0 }}
              >
                Pour vous permettre de vivre pleinement vos succès, nous avons inventé notre propre modèle de family
                office&nbsp;: indépendant, direct et libre.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-6" style={{ opacity: 0 }}>
                <Button variant="primary" onClick={() => document.querySelector('#offre')?.scrollIntoView({ behavior: 'smooth' })}>
                  DÉCOUVRIR NOTRE OFFRE
                </Button>
                <Button variant="outline" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  NOUS CONTACTER
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDownCircle className="w-8 h-8 text-[#000046] opacity-30" />
          </div>
        </section>

        {/* ══════════════ 3. STATS BAR ══════════════ */}
        <section ref={statsRef} className="bg-[#000046] py-20 relative overflow-hidden rounded-[2rem] mx-4 lg:mx-8 my-4">
          <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { val: '60+', label: 'Familles accompagnées' },
              { val: '3Md€', label: "d'actifs sous conseil" },
              { val: '50+', label: 'Collaborateurs' },
              { val: '2', label: 'Bureaux (Paris & Bruxelles)' },
            ].map((stat, i) => (
              <div key={i} className="stat-item text-center lg:text-left" style={{ opacity: 0 }}>
                <div className="text-[#FF8217] text-4xl md:text-5xl font-normal mb-2" style={{ fontFamily: headingFont }}>
                  {stat.val}
                </div>
                <div className="text-white text-[13px] tracking-wider uppercase opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ 4. MANIFESTE ══════════════ */}
        <section ref={manifesteRef} id="manifeste" className="py-24 bg-white">
          <div className="max-w-[1140px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="manifeste-quote relative" style={{ opacity: 0 }}>
              <div className="bg-[#FAEBDC] p-12 lg:p-16 rounded-2xl relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#FF8217] rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#FF8217] rounded-bl-xl" />
                <blockquote
                  className="text-2xl md:text-3xl italic leading-relaxed text-[#000046]"
                  style={{ fontFamily: headingFont }}
                >
                  &laquo;&nbsp;Si nous servons aussi bien vos intérêts, c'est parce que nous avons les mêmes.&nbsp;&raquo;
                </blockquote>
              </div>
            </div>
            <div className="manifeste-text" style={{ opacity: 0 }}>
              <SectionHeading label="NOTRE MANIFESTE" title="Votre sparring partner" font={headingFont} />
              <div className="space-y-6 text-[#231F20] leading-relaxed">
                <p>
                  Chaque jour, vous prenez des décisions. Vous anticipez les tendances, saisissez les opportunités, et prenez
                  des risques <strong>pour créer les solutions de demain.</strong>
                </p>
                <p>
                  Pour vous permettre de <strong>vivre pleinement vos succès, d'avancer sereinement,</strong> nous vous
                  donnons toutes les cartes en main pour faire les meilleurs choix possibles.
                </p>
                <p>
                  En centralisant vos décisions d'investissement, nous mettons de la clarté dans la gestion de votre
                  patrimoine. <strong>En guidant vos choix avec intégrité,</strong> nous créons les conditions pour donner vie
                  à vos ambitions.
                </p>
                <p>
                  Et pour cela, nous avons inventé notre propre modèle de family office&nbsp;: totalement indépendant,
                  transparent, responsable, direct, et surtout, <strong>libre.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ 5. VALEURS ══════════════ */}
        <section ref={valeursRef} className="py-24 bg-[#F7F7F9]">
          <div className="max-w-[1140px] mx-auto px-6">
            <SectionHeading title="Nos piliers d'excellence" font={headingFont} />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { n: '01', t: 'Indépendant', d: "Totalement indépendant des banques et des distributeurs pour une liberté de conseil absolue." },
                { n: '02', t: 'Transparent', d: "Une relation fondée sur la clarté des rémunérations et l'absence de frais cachés." },
                { n: '03', t: 'Responsable', d: "L'intégration systématique des enjeux ESG dans nos stratégies d'investissement." },
                { n: '04', t: 'Direct', d: "Un interlocuteur dédié, accessible et réactif pour une gestion fluide au quotidien." },
              ].map((v) => (
                <div key={v.n} className="valeur-card bg-white p-8 rounded-2xl border-t-4 border-[#FF8217] shadow-sm hover:shadow-md transition-shadow" style={{ opacity: 0 }}>
                  <span className="text-[#FF8217] font-bold text-lg block mb-4" style={{ fontFamily: headingFont }}>
                    {v.n}
                  </span>
                  <h4 className="text-xl font-medium mb-4 text-[#000046]">{v.t}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ 6. ENGAGEMENT ══════════════ */}
        <section ref={engagementRef} className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="engagement-title text-3xl md:text-4xl lg:text-5xl mb-16 text-[#000046] leading-tight"
              style={{ fontFamily: headingFont, opacity: 0 }}
            >
              Libre de penser, de dire non, d'avoir des principes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: '100%', label: 'Indépendant' },
                { val: '0', label: "Conflit d'intérêts" },
                { val: '360°', label: 'Vision patrimoniale' },
              ].map((item, i) => (
                <div key={i} className="engagement-stat flex flex-col items-center" style={{ opacity: 0 }}>
                  <div className="text-[#FF8217] text-5xl mb-2 font-light" style={{ fontFamily: headingFont }}>
                    {item.val}
                  </div>
                  <div className="text-[11px] tracking-[2px] uppercase font-bold text-[#000046]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ 7. NOTRE OFFRE ══════════════ */}
        <section ref={offreRef} id="offre" className="py-24 bg-[#F7F7F9]">
          <div className="max-w-[1140px] mx-auto px-6">
            <SectionHeading label="NOTRE EXPERTISE" title="Un accompagnement global" font={headingFont} />
            <div className="grid md:grid-cols-2 gap-4">
              {SERVICES.map((s, i) => (
                <div key={i} className={cn('offre-card relative h-[400px] p-12 rounded-2xl flex flex-col justify-between group overflow-hidden', s.bg)} style={{ opacity: 0 }}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div>
                    <div className="mb-8">{s.icon}</div>
                    <h3
                      className={cn('text-2xl md:text-3xl font-normal mb-6 leading-snug', s.textColor)}
                      style={{ fontFamily: headingFont }}
                    >
                      {s.title}
                    </h3>
                    <p className={cn('text-lg opacity-80 max-w-sm', s.textColor)}>{s.description}</p>
                  </div>
                  <a
                    href="#contact"
                    className="flex items-center gap-3 text-[#FF8217] text-[11px] tracking-[2px] font-bold uppercase group-hover:gap-5 transition-all"
                  >
                    EN SAVOIR PLUS <MoveRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ 8. ÉQUIPE ══════════════ */}
        <section ref={equipeRef} id="equipe" className="py-24 bg-white overflow-hidden">
          <div className="max-w-[1140px] mx-auto px-6">
            <SectionHeading label="L'ÉQUIPE" title="Associés fondateurs" font={headingFont} />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {TEAM.map((m, i) => (
                <div key={i} className="team-member group cursor-pointer" style={{ opacity: 0 }}>
                  <div className="relative mb-6">
                    <div
                      className={cn(
                        'aspect-[3/4] rounded-2xl flex items-center justify-center text-4xl font-light',
                        i % 2 === 0 ? 'bg-[#FAEBDC]' : 'bg-[#E3F1EC]'
                      )}
                      style={{ fontFamily: headingFont }}
                    >
                      {m.initial}
                    </div>
                    <div
                      className={cn(
                        'absolute inset-0 rounded-2xl border-white transition-all duration-500',
                        i % 2 === 0 ? 'border-r-[15px] group-hover:border-r-0' : 'border-l-[15px] group-hover:border-l-0'
                      )}
                    />
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Linkedin className="w-5 h-5 text-[#FF8217]" />
                    </div>
                  </div>
                  <h4 className="text-xl font-normal text-[#000046] mb-1" style={{ fontFamily: headingFont }}>
                    {m.name}
                  </h4>
                  <p className="text-sm text-[#FF8217] uppercase tracking-wider">{m.role}</p>
                </div>
              ))}
            </div>

            <div className="team-bottom flex flex-col md:flex-row items-center justify-between border-t border-gray-100 pt-12 gap-8">
              <span className="text-2xl font-normal" style={{ fontFamily: headingFont }}>
                Plus de 50 collaborateurs
              </span>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Wealth Planning', 'Financial Markets', 'Private Markets', 'Operations', 'Compliance'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-[#F7F7F9] rounded-full text-[10px] tracking-widest uppercase font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ 9. CONTACT ══════════════ */}
        <section ref={contactRef} id="contact" className="bg-[#000046] py-24 text-white">
          <div className="max-w-[1140px] mx-auto px-6 grid lg:grid-cols-2 gap-20">
            <div className="contact-info" style={{ opacity: 0 }}>
              <SectionHeading title="Intéressés par notre offre ?" light font={headingFont} />

              <div className="space-y-12 mt-12">
                <div>
                  <h4 className="text-[#FF8217] text-[11px] tracking-[2px] uppercase font-bold mb-4">Paris</h4>
                  <p className="text-lg font-light opacity-80 leading-relaxed">
                    12 Place Vendôme
                    <br />
                    75001 Paris, France
                  </p>
                </div>
                <div>
                  <h4 className="text-[#FF8217] text-[11px] tracking-[2px] uppercase font-bold mb-4">Bruxelles</h4>
                  <p className="text-lg font-light opacity-80 leading-relaxed">
                    Avenue Louise 54
                    <br />
                    1050 Bruxelles, Belgique
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    href="https://www.linkedin.com/company/ivesta-fo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 text-white hover:text-[#FF8217] transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="text-[11px] tracking-[2px] uppercase">Suivre iVesta sur LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form bg-white/5 p-10 rounded-2xl backdrop-blur-sm" style={{ opacity: 0 }}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    placeholder="Prénom"
                    required
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF8217] outline-none transition-colors text-white placeholder:text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF8217] outline-none transition-colors text-white placeholder:text-white/40"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF8217] outline-none transition-colors text-white placeholder:text-white/40"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF8217] outline-none transition-colors text-white placeholder:text-white/40"
                />
                <textarea
                  placeholder="Votre message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF8217] outline-none transition-colors text-white placeholder:text-white/40 resize-none"
                />
                <Button variant="secondary" type="submit" className="w-full mt-6">
                  ENVOYER VOTRE DEMANDE
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════ 10. CARRIÈRE ══════════════ */}
        <section ref={carriereRef} className="py-16 bg-[#FAEBDC] rounded-[2rem] mx-4 lg:mx-8 my-4">
          <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-3xl font-normal text-[#000046]" style={{ fontFamily: headingFont }}>
              Rejoignez notre aventure entrepreneuriale
            </h3>
            <Button variant="outline" className="border-[#000046] text-[#000046] hover:bg-[#000046]">
              REJOIGNEZ-NOUS
            </Button>
          </div>
        </section>
      </main>

      {/* ══════════════ 11. FOOTER ══════════════ */}
      <footer ref={footerRef} className="bg-[#000046] pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-16 mb-20">
            <div className="footer-col col-span-1" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-[#000046] font-bold text-sm">iV</span>
                </div>
                <span className="text-xl text-white font-normal" style={{ fontFamily: headingFont }}>
                  iVesta
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Le partenaire stratégique des entrepreneurs et des familles pour la gestion globale de leur patrimoine.
              </p>
            </div>

            <div className="footer-col" style={{ opacity: 0 }}>
              <h5 className="text-[#FF8217] text-[11px] tracking-[2px] uppercase font-bold mb-8">Navigation</h5>
              <ul className="space-y-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} className="text-white/80 hover:text-white text-sm transition-colors">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col" style={{ opacity: 0 }}>
              <h5 className="text-[#FF8217] text-[11px] tracking-[2px] uppercase font-bold mb-8">Contact</h5>
              <ul className="space-y-6">
                <li className="text-white/80 text-sm">
                  <span className="block font-bold mb-1">Paris</span>
                  12 Place Vendôme, 75001
                </li>
                <li className="text-white/80 text-sm">
                  <span className="block font-bold mb-1">Bruxelles</span>
                  Avenue Louise 54, 1050
                </li>
              </ul>
            </div>

            <div className="footer-col" style={{ opacity: 0 }}>
              <h5 className="text-[#FF8217] text-[11px] tracking-[2px] uppercase font-bold mb-8">Réseaux</h5>
              <a
                href="https://www.linkedin.com/company/ivesta-fo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-[#FF8217] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
            <p className="text-white/40 text-[11px] tracking-wider uppercase">
              &copy; {new Date().getFullYear()} iVesta. Tous droits réservés.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/40 hover:text-white text-[11px] tracking-wider uppercase transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-white/40 hover:text-white text-[11px] tracking-wider uppercase transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-white/40 hover:text-white text-[11px] tracking-wider uppercase transition-colors">
                Gestion des cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
