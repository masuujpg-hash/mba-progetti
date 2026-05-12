import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Compass, MagnifyingGlass, ShieldCheck, Users, Heart, Clock, type Icon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
  initials: string;
}

interface ValoreItem {
  icon: Icon;
  title: string;
  text: string;
}

const team: TeamMember[] = [
  {
    name: 'Mario Biondi',
    role: 'Architetto, Fondatore',
    desc: "Fondatore e titolare dello studio MBA Progetti, coordina l'attività professionale integrando progettazione architettonica e consulenza tecnica per appalti pubblici. È specializzato nella redazione di offerte migliorative per gare OEPV e nella definizione della strategia progettuale complessiva.\n\nSupervisiona la produzione tecnica di ogni offerta, assicurando coerenza metodologica e qualità documentale in tutte le fasi del lavoro. La sua competenza abbraccia la normativa CAM, la metodologia BIM e il quadro regolatorio del settore degli appalti pubblici — dal D.Lgs. 36/2023 alle Linee Guida ANAC — garantendo offerte tecniche sempre aggiornate, conformi e competitive.\n\nOpera nel settore delle gare d'appalto dal 2016. Dal 2022 al 2025, il 63% delle procedure affidate si è concluso con un piazzamento nelle prime tre posizioni, con un tasso di aggiudicazione del 38%.",
    image: '/media/team/mario_biondi.webp',
    initials: 'MB'
  },
  {
    name: 'Gennaro Solaro',
    role: 'Architetto',
    desc: 'Architetto con consolidata esperienza nella progettazione e nella gestione delle fasi esecutive, Gennaro cura lo sviluppo tecnico del progetto e la sua traduzione operativa in cantiere. Coniuga esperienza di campo e sensibilità progettuale, assicurando coerenza tra le scelte architettoniche e la loro effettiva realizzazione.',
    image: '/media/team/gennaro_solaro.webp',
    initials: 'GS'
  },
  {
    name: 'Massimiliano Celeste',
    role: 'Architetto',
    desc: 'Massimiliano è il riferimento tecnico dello studio per l\'integrazione impiantistica e la progettazione dei sistemi tecnologici. Vanta una solida esperienza nella domotica e nell\'illuminotecnica, con particolare attenzione all\'applicazione dei Criteri Ambientali Minimi (CAM).',
    image: '/media/team/massimiliano_celeste.webp',
    initials: 'MC'
  },
  {
    name: 'Cristian Sisto',
    role: 'Architetto',
    desc: 'Cristian traduce le scelte progettuali in immagini e contenuti grafici che valorizzano l\'identità e la chiarezza dei progetti. Si occupa della produzione dei render, dell\'impaginazione e della redazione delle relazioni migliorative.',
    image: '/media/team/cristian_sisto.webp',
    initials: 'CS'
  },
  {
    name: 'Carmine Sarno',
    role: 'Architetto',
    desc: 'Carmine collabora stabilmente con MBA Progetti come partner tecnico per la progettazione e gestione BIM, la direzione lavori e la contabilità dei lavori pubblici.',
    image: '/media/team/carmine_sarno.webp',
    initials: 'CS'
  },
  {
    name: 'Alfonso Masulli',
    role: 'Architetto',
    desc: 'Alfonso cura la modellazione 3D, la visualizzazione architettonica e la produzione BIM. Si occupa della generazione di modelli digitali e render a supporto delle offerte tecniche.',
    image: '/media/team/alfonso_masulli.webp',
    initials: 'AM'
  },
  {
    name: 'Ilario Di Buccio',
    role: 'Ingegnere Edile',
    desc: 'Ingegnere edile specializzato in rilievo integrato e progettazione strutturale. Porta competenze avanzate in laser scanning 3D, fotogrammetria da drone e modellazione BIM.',
    image: '/media/team/ilario_dibuccio.webp',
    initials: 'IDB'
  }
];

const valori: ValoreItem[] = [
  { icon: Compass, title: 'Metodo', text: "Un processo rigoroso guida ogni fase: dall'analisi del disciplinare alla consegna dell'offerta. Il controllo sistematico garantisce coerenza, precisione e affidabilità del risultato." },
  { icon: MagnifyingGlass, title: 'Ricerca', text: "Ogni offerta richiede aggiornamento continuo su normativa, materiali, tecniche costruttive e procedure di gara. La qualità nasce dalla conoscenza." },
  { icon: ShieldCheck, title: 'Responsabilità', text: "Ci assumiamo la piena responsabilità del lavoro svolto: nei confronti del cliente, della stazione appaltante e della qualità del costruito." },
  { icon: Users, title: 'Collaborazione', text: "Il dialogo costante tra i collaboratori dello studio, l'impresa e i consulenti esterni è parte integrante del processo e condizione del risultato." },
  { icon: Heart, title: 'Passione', text: "L'architettura e il progetto non sono solo un mestiere. Sono la motivazione che rende ogni lavoro diverso dal precedente e ogni soluzione più precisa." },
  { icon: Clock, title: 'Affidabilità', text: "Rispettiamo gli impegni, i tempi e le aspettative. La fiducia dei clienti è il risultato che consideriamo più importante." },
];

const anim = { 
  initial: { opacity: 0, y: 30 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, margin: '-10%' as const },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
};

const maskAnim = {
  initial: { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 },
  whileInView: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
};

export default function Studio() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-white selection:bg-navy selection:text-white">
      {/* ── HERO — STUDIO (Full Screen Parallax) ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroParallax }} 
          className="absolute -top-[10%] left-0 w-full h-[120%] z-0"
        >
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Studio Interiors" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-navy/50" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div style={{ y: heroTextY }}>
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-gold text-[10px] md:text-xs font-bold uppercase mb-12 block tracking-[0.6em]"
            >
              Identità e Visione
            </motion.span>
            
            <div className="relative inline-block mb-10 overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-7xl md:text-9xl lg:text-[12rem] font-bold text-white tracking-tighter leading-[0.8] uppercase"
              >
                STUDIO
              </motion.h1>
            </div>
            <div className="w-20 h-px bg-gold/50 mx-auto mt-8" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-64, 64] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="py-32 md:py-56 px-6 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-start">
            <motion.div {...anim}>
              <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-10 block">La Nostra Storia</span>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-4 border-gold pl-12 mb-16"
              >
                <p className="text-gold text-2xl italic font-serif leading-relaxed">
                  "Ogni risultato nasce da metodo, competenza e dalla capacità di trasformare un'analisi precisa in una proposta vincente."
                </p>
              </motion.div>

              <div className="text-gray/70 text-xl font-light leading-relaxed mb-16 max-w-xl space-y-8">
                <p>
                  MBA Progetti è uno studio professionale fondato nel 2019 dall'architetto Mario Biondi, con sede a San Potito Sannitico (CE). Lo studio è specializzato nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche aggiudicate secondo il criterio dell'offerta economicamente più vantaggiosa (OEPV), nell'ambito del D.Lgs. 36/2023.
                </p>
                <p>
                  La struttura è multidisciplinare e si avvale di un team di collaboratori — architetti, specialisti BIM, esperti di contabilità dei lavori — integrato da una rete consolidata di consulenti nei settori strutturale, impiantistico, infrastrutturale e legale, attivata in funzione della tipologia e della complessità di ogni procedura.
                </p>
                <p>
                  Dal 2022 al 2025, il 63% delle procedure affidate si è concluso con un piazzamento nelle prime tre posizioni, con un tasso di aggiudicazione del 38%.
                </p>
              </div>
              <div className="flex gap-20 pt-8 border-t border-lgray">
                <div>
                  <div className="text-6xl font-bold text-navy tracking-tighter mb-2">2015</div>
                  <div className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Fondazione</div>
                </div>
                <div>
                  <div className="text-6xl font-bold text-navy tracking-tighter mb-2">+10</div>
                  <div className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Specialisti</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              {...maskAnim}
              className="relative aspect-[4/5] bg-lgray overflow-hidden group"
            >
              <img 
                src="/media/studio/main.webp" 
                alt="Studio Detail" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop'; }}
              />
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gold/10 z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION ── */}
      <section className="py-32 md:py-56 bg-lgray/30 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...anim} className="max-w-3xl mb-32">
            <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-8 block">Principi</span>
            <h3 className="text-5xl md:text-8xl font-bold text-navy tracking-tighter uppercase leading-[0.8]">
              I Nostri <span className="italic font-medium text-gold">Valori</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {valori.map((val, i) => (
              <motion.div 
                key={val.title} 
                {...anim} 
                transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                className="bg-white p-12 md:p-16 group hover:bg-navy transition-all duration-700"
              >
                <div className="mb-12">
                  <val.icon size={40} weight="thin" className="text-gold group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-2xl font-bold text-navy mb-6 group-hover:text-white transition-colors duration-500 uppercase tracking-tight">{val.title}</h4>
                <p className="text-gray/60 group-hover:text-white/60 text-lg leading-relaxed font-light transition-colors duration-500">{val.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section className="py-32 md:py-56 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...anim} className="mb-32">
            <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-8 block">Persone</span>
            <h3 className="text-5xl md:text-9xl font-bold text-navy tracking-tighter uppercase leading-[0.8]">Il Team</h3>
          </motion.div>

          {/* FONDATORE */}
          <div className="mb-64">
            {team.slice(0, 1).map((founder) => (
              <motion.div 
                key={founder.name} 
                {...anim}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 bg-lgray/10 overflow-hidden border border-lgray/30"
              >
                <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2s] relative">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5 }}
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'; }}
                  />
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
                </div>
                <div className="p-12 md:p-24 lg:p-32 flex flex-col justify-center bg-white">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-10 block">Fondatore e Titolare</span>
                  <h4 className="text-5xl md:text-8xl font-bold text-navy mb-6 tracking-tighter uppercase leading-none">{founder.name}</h4>
                  <p className="text-navy/40 text-xs font-bold uppercase tracking-[0.3em] mb-16">{founder.role}</p>
                  
                  <div className="space-y-10">
                    <div className="text-gray/70 text-lg leading-relaxed font-light space-y-6 whitespace-pre-line border-l border-gold/30 pl-12">
                      {founder.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-20">
             <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Collaboratori</span>
             <div className="h-px bg-lgray w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
            {team.slice(1).map((member, i) => (
              <motion.div 
                key={member.name} 
                {...anim} 
                transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-10 bg-lgray grayscale group-hover:grayscale-0 transition-all duration-[1s]">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'; }}
                  />
                </div>
                <h4 className="text-2xl font-bold text-navy mb-2 group-hover:text-gold transition-colors duration-500 tracking-tight uppercase">{member.name}</h4>
                <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-6">{member.role}</p>
                <p className="text-gray/50 text-base leading-relaxed font-light">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 md:py-64 bg-navy text-white text-center px-6 overflow-hidden relative">
        <motion.div 
          {...anim}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-[9rem] font-bold mb-16 leading-[0.8] tracking-tighter uppercase">
            Sinergia <br /> <span className="italic text-gold font-medium">Professionale</span>
          </h2>
          <Link to="/contatti" className="group relative inline-flex items-center gap-8 bg-white text-navy px-16 py-8 text-[11px] font-bold uppercase tracking-[0.4em] overflow-hidden transition-all duration-500">
             <span className="relative z-10">Collabora con noi</span>
             <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
             <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">
               Contatti
             </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
