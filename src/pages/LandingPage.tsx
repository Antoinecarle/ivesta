import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import FontSelector from '../components/FontSelector';

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
    primary: 'bg-[#000046] text-white hover:bg-[#FF810A]',
    secondary: 'bg-[#FF810A] text-white hover:bg-[#000046]',
    outline: 'border border-[#000046] text-[#000046] hover:bg-[#000046] hover:text-white',
    ghost: 'text-[#000046] hover:text-[#FF810A]',
  };

  return (
    <button
      className={cn(
        'px-8 py-4 transition-all duration-300 font-medium text-[11px] tracking-[2px] uppercase flex items-center justify-center gap-4 cursor-pointer',
        variants[variant],
        className
      )}
      style={{ borderRadius: '0px' }}
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
        <span className="text-[#FF810A] text-[11px] tracking-[2px] font-medium uppercase block mb-4">{label}</span>
      )}
      <h2
        className={cn('text-3xl md:text-4xl lg:text-[36px] font-normal leading-tight', light ? 'text-white' : 'text-[#000046]')}
        style={{ fontFamily: font || '"Cabinet Grotesk", sans-serif' }}
      >
        {title}
      </h2>
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
  const [displayFont, setDisplayFont] = useState('Cabinet Grotesk');
  const [bodyFont, setBodyFont] = useState('Satoshi');

  // Dynamic font families derived from state
  const headingFont = `"${displayFont}", sans-serif`;
  const bodyFontFamily = `"${bodyFont}", sans-serif`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci pour votre message. Nous vous recontacterons rapidement.');
    setFormData({ prenom: '', nom: '', email: '', tel: '', message: '' });
  };

  return (
    <div
      className="min-h-screen bg-[#F7F7F9] text-[#000046] selection:bg-[#FF810A] selection:text-white"
      style={{ fontFamily: bodyFontFamily }}
    >
      {/* ══════════════ 1. NAVBAR ══════════════ */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500 bg-white border-b border-gray-100',
          scrolled ? 'py-4 shadow-sm' : 'py-6'
        )}
      >
        <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-[#000046] w-10 h-10 flex items-center justify-center transition-colors group-hover:bg-[#FF810A]">
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
                  className="text-[11px] tracking-[2px] font-normal hover:text-[#FF810A] transition-colors flex items-center gap-1"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-3 h-3" />}
                </a>

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 bg-white border-t-2 border-[#FF810A] shadow-xl p-6 min-w-[220px] flex flex-col gap-4"
                      >
                        {link.dropdown.map((item) => (
                          <a key={item} href="#" className="text-[13px] hover:text-[#FF810A] transition-colors whitespace-nowrap">
                            {item}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <Button variant="primary" className="ml-4 px-6 py-3" onClick={() => navigate('/login')}>
              ESPACE CLIENT
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col p-10 pt-32 gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl font-medium tracking-widest text-[#000046]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="mt-4 w-full" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
              ESPACE CLIENT
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ══════════════ 2. HERO ══════════════ */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F7F7F9]">
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-[#FAEBDC] rotate-12 -z-0" />
          <div className="absolute bottom-[10%] left-[-2%] w-[300px] h-[300px] bg-[#000046] opacity-5 -z-0" />
          <div className="absolute top-[10%] left-[40%] w-20 h-20 bg-[#FF810A] rotate-45 opacity-20" />

          <div className="max-w-[1140px] mx-auto px-6 relative z-10 w-full">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#FF810A] text-[11px] tracking-[4px] font-bold uppercase block mb-6"
              >
                FAMILY OFFICE INDÉPENDANT
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-[72px] font-normal leading-[1.1] text-[#000046] mb-8"
                style={{ fontFamily: headingFont }}
              >
                Libre d'être <br />
                <span className="italic">de votre côté</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-[#231F20] mb-12 max-w-xl leading-relaxed"
              >
                Pour vous permettre de vivre pleinement vos succès, nous avons inventé notre propre modèle de family
                office&nbsp;: indépendant, direct et libre.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Button variant="primary" onClick={() => document.querySelector('#offre')?.scrollIntoView({ behavior: 'smooth' })}>
                  DÉCOUVRIR NOTRE OFFRE
                </Button>
                <Button variant="outline" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  NOUS CONTACTER
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDownCircle className="w-8 h-8 text-[#000046] opacity-30" />
          </div>
        </section>

        {/* ══════════════ 3. STATS BAR ══════════════ */}
        <section className="bg-[#000046] py-20 relative overflow-hidden">
          <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { val: '60+', label: 'Familles accompagnées' },
              { val: '3Md€', label: "d'actifs sous conseil" },
              { val: '50+', label: 'Collaborateurs' },
              { val: '2', label: 'Bureaux (Paris & Bruxelles)' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-[#FF810A] text-4xl md:text-5xl font-normal mb-2" style={{ fontFamily: headingFont }}>
                  {stat.val}
                </div>
                <div className="text-white text-[13px] tracking-wider uppercase opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ 4. MANIFESTE ══════════════ */}
        <section id="manifeste" className="py-24 bg-white">
          <div className="max-w-[1140px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="bg-[#FAEBDC] p-12 lg:p-16 relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#FF810A]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#FF810A]" />
                <blockquote
                  className="text-2xl md:text-3xl italic leading-relaxed text-[#000046]"
                  style={{ fontFamily: headingFont }}
                >
                  &laquo;&nbsp;Si nous servons aussi bien vos intérêts, c'est parce que nous avons les mêmes.&nbsp;&raquo;
                </blockquote>
              </div>
            </div>
            <div>
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
        <section className="py-24 bg-[#F7F7F9]">
          <div className="max-w-[1140px] mx-auto px-6">
            <SectionHeading title="Nos piliers d'excellence" font={headingFont} />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { n: '01', t: 'Indépendant', d: "Totalement indépendant des banques et des distributeurs pour une liberté de conseil absolue." },
                { n: '02', t: 'Transparent', d: "Une relation fondée sur la clarté des rémunérations et l'absence de frais cachés." },
                { n: '03', t: 'Responsable', d: "L'intégration systématique des enjeux ESG dans nos stratégies d'investissement." },
                { n: '04', t: 'Direct', d: "Un interlocuteur dédié, accessible et réactif pour une gestion fluide au quotidien." },
              ].map((v) => (
                <div key={v.n} className="bg-white p-8 border-t-4 border-[#FF810A] shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[#FF810A] font-bold text-lg block mb-4" style={{ fontFamily: headingFont }}>
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
        <section className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-16 text-[#000046] leading-tight"
              style={{ fontFamily: headingFont }}
            >
              Libre de penser, de dire non, d'avoir des principes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: '100%', label: 'Indépendant' },
                { val: '0', label: "Conflit d'intérêts" },
                { val: '360°', label: 'Vision patrimoniale' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-[#FF810A] text-5xl mb-2 font-light" style={{ fontFamily: headingFont }}>
                    {item.val}
                  </div>
                  <div className="text-[11px] tracking-[2px] uppercase font-bold text-[#000046]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ 7. NOTRE OFFRE ══════════════ */}
        <section id="offre" className="py-24 bg-[#F7F7F9]">
          <div className="max-w-[1140px] mx-auto px-6">
            <SectionHeading label="NOTRE EXPERTISE" title="Un accompagnement global" font={headingFont} />
            <div className="grid md:grid-cols-2 gap-0">
              {SERVICES.map((s, i) => (
                <div key={i} className={cn('relative h-[400px] p-12 flex flex-col justify-between group overflow-hidden', s.bg)}>
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
                    className="flex items-center gap-3 text-[#FF810A] text-[11px] tracking-[2px] font-bold uppercase group-hover:gap-5 transition-all"
                  >
                    EN SAVOIR PLUS <MoveRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ 8. ÉQUIPE ══════════════ */}
        <section id="equipe" className="py-24 bg-white overflow-hidden">
          <div className="max-w-[1140px] mx-auto px-6">
            <SectionHeading label="L'ÉQUIPE" title="Associés fondateurs" font={headingFont} />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {TEAM.map((m, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative mb-6">
                    <div
                      className={cn(
                        'aspect-[3/4] flex items-center justify-center text-4xl font-light',
                        i % 2 === 0 ? 'bg-[#FAEBDC]' : 'bg-[#E3F1EC]'
                      )}
                      style={{ fontFamily: headingFont }}
                    >
                      {m.initial}
                    </div>
                    {/* Crochet Decoration (signature ivesta) */}
                    <div
                      className={cn(
                        'absolute inset-0 border-white transition-all duration-500',
                        i % 2 === 0 ? 'border-r-[15px] group-hover:border-r-0' : 'border-l-[15px] group-hover:border-l-0'
                      )}
                    />
                    <div className="absolute bottom-4 right-4 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Linkedin className="w-5 h-5 text-[#FF810A]" />
                    </div>
                  </div>
                  <h4 className="text-xl font-normal text-[#000046] mb-1" style={{ fontFamily: headingFont }}>
                    {m.name}
                  </h4>
                  <p className="text-sm text-[#FF810A] uppercase tracking-wider">{m.role}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-100 pt-12 gap-8">
              <span className="text-2xl font-normal" style={{ fontFamily: headingFont }}>
                Plus de 50 collaborateurs
              </span>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Wealth Planning', 'Financial Markets', 'Private Markets', 'Operations', 'Compliance'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-[#F7F7F9] text-[10px] tracking-widest uppercase font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ 9. CONTACT ══════════════ */}
        <section id="contact" className="bg-[#000046] py-24 text-white">
          <div className="max-w-[1140px] mx-auto px-6 grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading title="Intéressés par notre offre ?" light font={headingFont} />

              <div className="space-y-12 mt-12">
                <div>
                  <h4 className="text-[#FF810A] text-[11px] tracking-[2px] uppercase font-bold mb-4">Paris</h4>
                  <p className="text-lg font-light opacity-80 leading-relaxed">
                    12 Place Vendôme
                    <br />
                    75001 Paris, France
                  </p>
                </div>
                <div>
                  <h4 className="text-[#FF810A] text-[11px] tracking-[2px] uppercase font-bold mb-4">Bruxelles</h4>
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
                    className="inline-flex items-center gap-4 text-white hover:text-[#FF810A] transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="text-[11px] tracking-[2px] uppercase">Suivre iVesta sur LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-10 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    placeholder="Prénom"
                    required
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF810A] outline-none transition-colors text-white placeholder:text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF810A] outline-none transition-colors text-white placeholder:text-white/40"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF810A] outline-none transition-colors text-white placeholder:text-white/40"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF810A] outline-none transition-colors text-white placeholder:text-white/40"
                />
                <textarea
                  placeholder="Votre message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#FF810A] outline-none transition-colors text-white placeholder:text-white/40 resize-none"
                />
                <Button variant="secondary" type="submit" className="w-full mt-6">
                  ENVOYER VOTRE DEMANDE
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════ 10. CARRIÈRE ══════════════ */}
        <section className="py-16 bg-[#FAEBDC]">
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

      {/* ══════════════ FONT SELECTOR ══════════════ */}
      <FontSelector
        displayFont={displayFont}
        bodyFont={bodyFont}
        onDisplayFontChange={setDisplayFont}
        onBodyFontChange={setBodyFont}
      />

      {/* ══════════════ 11. FOOTER ══════════════ */}
      <footer className="bg-[#000046] pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white w-8 h-8 flex items-center justify-center">
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

            <div>
              <h5 className="text-[#FF810A] text-[11px] tracking-[2px] uppercase font-bold mb-8">Navigation</h5>
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

            <div>
              <h5 className="text-[#FF810A] text-[11px] tracking-[2px] uppercase font-bold mb-8">Contact</h5>
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

            <div>
              <h5 className="text-[#FF810A] text-[11px] tracking-[2px] uppercase font-bold mb-8">Réseaux</h5>
              <a
                href="https://www.linkedin.com/company/ivesta-fo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-[#FF810A] transition-colors"
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
  );
}
