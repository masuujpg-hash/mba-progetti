import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  MagnifyingGlass, 
  ShieldCheck, 
  Users, 
  Heart, 
  Timer
} from '@phosphor-icons/react';

export default function Studio() {
  interface TeamMember {
    name: string;
    role: string;
    bio: string;
    badge: string;
  }

  const team: TeamMember[] = [
    {
      badge: "GS",
      name: "Gennaro Solaro",
      role: "Architetto",
      bio: "Architetto con consolidata esperienza nella progettazione e nella gestione delle fasi esecutive, Gennaro cura lo sviluppo tecnico del progetto e la sua traduzione operativa in cantiere. Coniuga esperienza di campo e sensibilità progettuale, assicurando coerenza tra le scelte architettoniche e la loro effettiva realizzazione. Segue le attività di direzione lavori e controllo esecutivo, rappresentando un riferimento tecnico all'interno del gruppo di lavoro."
    },
    {
      badge: "MC",
      name: "Massimiliano Celeste",
      role: "Architetto",
      bio: "Massimiliano è il riferimento tecnico dello studio per l'integrazione impiantistica e la progettazione dei sistemi tecnologici. Vanta una solida esperienza nella domotica e nell'illuminotecnica, con particolare attenzione all'applicazione dei Criteri Ambientali Minimi (CAM) nelle opere pubbliche. È responsabile dell'analisi delle soluzioni impiantistiche e della definizione delle strategie di automazione degli edifici, curando l'integrazione tra sistemi, efficienza energetica e coerenza progettuale."
    },
    {
      badge: "CS",
      name: "Cristian Sisto",
      role: "Architetto",
      bio: "Cristian traduce le scelte progettuali in immagini e contenuti grafici che valorizzano l'identità e la chiarezza dei progetti. All'interno dello studio si occupa della produzione dei render, dell'impaginazione e della redazione delle relazioni migliorative, curando ogni dettaglio visivo e comunicativo. La sua competenza unisce precisione tecnica e sensibilità grafica, rendendo i documenti leggibili, coerenti e di immediata comprensione."
    },
    {
      badge: "CS",
      name: "Carmine Sarno",
      role: "Architetto",
      bio: "Carmine collabora stabilmente con lo studio come partner tecnico per la progettazione e gestione BIM, la direzione lavori e la contabilità dei lavori pubblici. Cura il coordinamento digitale dei progetti e l'integrazione tra modelli, computi e documentazione tecnica, per garantire coerenza e controllo in tutte le fasi del processo."
    },
    {
      badge: "AM",
      name: "Alfonso Masulli",
      role: "Architetto",
      bio: "Alfonso cura la modellazione 3D, la visualizzazione architettonica e la produzione BIM. Si occupa della generazione di modelli digitali, render e documentazione grafica a supporto delle offerte tecniche, garantendo qualità visiva e precisione informativa in ogni proposta."
    },
    {
      badge: "IDB",
      name: "Ilario Di Buccio",
      role: "Ingegnere Edile",
      bio: "Ingegnere edile specializzato in rilievo integrato e progettazione strutturale, laureato presso la Federico II di Napoli e certificato BIM Specialist ACCREDIA. Porta competenze specialistiche in laser scanning 3D, fotogrammetria da drone e modellazione BIM. Collabora con lo studio curando le attività di rilievo e le fasi progettuali che richiedono competenze ingegneristiche strutturali."
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── 1. CINEMATIC HERO ── */}
      <section className="relative min-h-[44vh] md:h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Studio"
            className="w-full h-full object-cover object-center opacity-85 contrast-105"
          />
          {/* Sfumatura bianca verso il basso per fondersi perfettamente con la sezione successiva */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-white/20 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-white text-[clamp(32px,4.3vw,58px)] font-bold uppercase tracking-[0.045em] leading-[1.2] drop-shadow-md">
              LO STUDIO
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STORIA E METODO ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block shadow-sm">
                  CHI SIAMO
                </span>
              </div>
              <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
                STORIA E METODO
              </h2>
              <div className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] max-w-[62ch]">
                <p>
                  Lo studio dell'architetto Mario Biondi si occupa di progettazione e consulenza tecnica ed <strong className="font-bold text-[#1b2a4a]">è specializzato nelle gare d'appalto di lavori pubblici</strong>, in particolare nella redazione di <strong className="font-bold text-[#1b2a4a]">offerte migliorative</strong> secondo il criterio dell'offerta economicamente più vantaggiosa (OEV). Opera con una <strong className="font-bold text-[#1b2a4a]">rete stabile di professionisti e società specializzate</strong> che copre ogni aspetto dell'offerta tecnica: architettura, strutture, impianti ed energetica, grafica e modellazione BIM. Ogni offerta <strong className="font-bold text-[#1b2a4a]">è costruita insieme all'impresa</strong>, dall'analisi del disciplinare alla consegna della documentazione di gara.
                </p>
              </div>
            </div>

            {/* Right Column: Building Image */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[2px] border border-[#1b2a4a]/15 shadow-sm bg-neutral-100">
                <img 
                  src="/media/portfolio/15_ospedale_sarteano.jpg" 
                  alt="Progetto MBA Studio — Ospedale di Sarteano" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-10">
            <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-4 shadow-sm">
              LA RETE
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-5">
              UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO
            </h2>
            <div className="space-y-4 text-[#3d4a66] text-[16px] font-normal max-w-[62ch] leading-[1.7] mb-10">
              <p>
                Ogni gara richiede competenze diverse. Lo studio costruisce attorno alla singola procedura <strong className="font-bold text-[#1b2a4a]">un gruppo di lavoro</strong> con architetti, ingegneri strutturisti e impiantisti, restauratori, specialisti BIM e grafici, coinvolti secondo le richieste del disciplinare. Il gruppo lavora sotto il <strong className="font-bold text-[#1b2a4a]">coordinamento dello studio</strong>, dall'analisi degli atti alla consegna dell'offerta.
              </p>
              <p>
                Il confronto tra le diverse competenze permette di <strong className="font-bold text-[#1b2a4a]">individuare migliorie pertinenti</strong>, verificarne la fattibilità e tradurle in <strong className="font-bold text-[#1b2a4a]">una proposta chiara e coerente</strong>.
              </p>
            </div>
          </div>

          {/* Radial Hub Diagram */}
          <div className="py-4 flex justify-center">
            <NetworkDiagram />
          </div>
        </div>
      </section>

      {/* ── 4. I NOSTRI VALORI ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-4 shadow-sm">
              IL NOSTRO DNA
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-4">
              I NOSTRI VALORI
            </h2>
            <p className="text-[#3d4a66] text-[16px] font-normal max-w-[62ch] leading-[1.7]">
              Il nostro lavoro si fonda su principi che non cambiano al variare della procedura o del committente: <strong className="font-bold text-[#1b2a4a]">metodo rigoroso</strong>, <strong className="font-bold text-[#1b2a4a]">ricerca costante</strong>, <strong className="font-bold text-[#1b2a4a]">responsabilità</strong> nei confronti del cliente e del processo costruttivo. Sono i valori che guidano ogni scelta, dalla prima analisi del disciplinare alla consegna dell'offerta.
            </p>
          </div>

          {/* 6 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard 
              icon={Target}
              title="METODO"
              text="Un processo rigoroso guida ogni fase: dall'analisi del disciplinare alla consegna dell'offerta. Il controllo sistematico garantisce coerenza, precisione e affidabilità del risultato."
            />
            <ValueCard 
              icon={MagnifyingGlass}
              title="RICERCA"
              text="Ogni offerta richiede aggiornamento continuo su normativa, materiali, tecniche costruttive e procedure di gara. La qualità nasce dalla conoscenza."
            />
            <ValueCard 
              icon={ShieldCheck}
              title="RESPONSABILITÀ"
              text="Ci assumiamo la piena responsabilità del lavoro svolto: nei confronti del cliente, della stazione appaltante e della qualità del costruito."
            />
            <ValueCard 
              icon={Users}
              title="COLLABORAZIONE"
              text="Il dialogo costante tra i collaboratori dello studio, l'impresa e i consulenti esterni è parte integrante del processo e condizione del risultato."
            />
            <ValueCard 
              icon={Heart}
              title="PASSIONE"
              text="L'architettura e il progetto non sono solo un mestiere. Sono la motivazione che rende ogni lavoro diverso dal precedente e ogni soluzione più precisa."
            />
            <ValueCard 
              icon={Timer}
              title="AFFIDABILITÀ"
              text="Rispettiamo gli impegni, i tempi e le aspettative. La fiducia dei clienti è il risultato che consideriamo più importante."
            />
          </div>
        </div>
      </section>

      {/* ── 5. MARIO BIONDI (FONDATORE) ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/40 border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Photo / Portrait container */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-[#eef1f4] border border-[#1b2a4a]/15 rounded-[2px] overflow-hidden flex flex-col items-center justify-center text-center p-6 text-[#1b2a4a]/50 shadow-xs relative">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7b869d]">[FOTO]</span>
                <span className="text-[13px] font-light text-[#7b869d] mt-1">Ritratto di Mario Biondi</span>
              </div>
            </div>

            {/* Right: Founder Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-4 shadow-sm">
                  FONDATORE E TITOLARE
                </span>
                <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
                  MARIO BIONDI
                </h2>
                <span className="text-[#b8972a] text-[11px] font-medium uppercase tracking-[0.2em] block mt-1">
                  ARCHITETTO, TITOLARE
                </span>
              </div>

              <div className="space-y-4 text-[#3d4a66] text-[16px] font-normal leading-[1.7] max-w-[62ch]">
                <p>
                  Titolare dello studio, coordina l'attività professionale integrando progettazione architettonica e consulenza tecnica per appalti pubblici. È specializzato nella redazione di <strong className="font-bold text-[#1b2a4a]">offerte tecniche migliorative per gare OEV</strong> e nella definizione della strategia progettuale complessiva.
                </p>
                <p>
                  Supervisiona la produzione tecnica di ogni offerta, assicurando <strong className="font-bold text-[#1b2a4a]">coerenza metodologica e qualità documentale</strong> in tutte le fasi del lavoro. La sua competenza abbraccia la normativa CAM, la metodologia BIM e il quadro regolatorio del settore degli appalti pubblici (dal D.Lgs. 36/2023 alle Linee Guida ANAC), garantendo offerte tecniche sempre aggiornate, conformi e competitive.
                </p>
                <p>
                  Opera nel settore delle gare d'appalto dal 2016. Dal 2022 al 2025, <strong className="font-bold text-[#1b2a4a]">il 63% delle procedure affidate si è concluso nelle prime tre posizioni, con un tasso di aggiudicazione del 38%</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. UNA RETE DI PROFESSIONALITÀ ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-10">
            <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-4 shadow-sm">
              COMPETENZE MULTIDISCIPLINARI
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
              UNA RETE DI PROFESSIONALITÀ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white p-7 sm:p-8 border border-[#1b2a4a]/15 rounded-[2px] space-y-4 hover:border-[#b8972a] hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 bg-[#1b2a4a] text-white font-mono font-bold text-xs flex items-center justify-center rounded-[2px]">
                  {member.badge}
                </div>
                <div>
                  <h3 className="text-[#1b2a4a] text-[17px] font-semibold uppercase tracking-[0.06em]">{member.name}</h3>
                  <span className="text-[#b8972a] text-[11px] font-medium uppercase tracking-[0.2em] block mt-0.5">{member.role}</span>
                </div>
                <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7]">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ── VALUE CARD COMPONENT ──
function ValueCard({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="bg-white p-8 sm:p-10 border border-[#1b2a4a]/15 rounded-[2px] space-y-4 hover:border-[#b8972a]/50 hover:shadow-xs transition-all">
      <div className="text-[#b8972a]">
        <Icon size={36} weight="light" />
      </div>
      <h3 className="text-[#1b2a4a] text-[17px] font-semibold tracking-[0.06em] uppercase">{title}</h3>
      <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7]">{text}</p>
    </div>
  );
}

// ── ICONE SVG NETWORK DIAGRAM ──
const IconFluidoMeccanici = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
  </svg>
);

const IconStrutturali = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="3" width="10" height="18" />
    <line x1="7" y1="3" x2="17" y2="12" />
    <line x1="17" y1="3" x2="7" y2="12" />
    <line x1="7" y1="12" x2="17" y2="21" />
    <line x1="17" y1="12" x2="7" y2="21" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const IconInfrastrutturali = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V11a7 7 0 0 1 14 0v10" />
    <line x1="12" y1="16" x2="12" y2="17.5" />
    <line x1="12" y1="19.5" x2="12" y2="21" />
  </svg>
);

const IconBim = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <line x1="12" y1="12" x2="20" y2="7.5" />
    <line x1="12" y1="12" x2="4" y2="7.5" />
  </svg>
);

const IconRestauratori = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7l9-4 9 4v2H3V7z" />
    <line x1="6" y1="9" x2="6" y2="18" />
    <line x1="10" y1="9" x2="10" y2="18" />
    <line x1="14" y1="9" x2="14" y2="18" />
    <line x1="18" y1="9" x2="18" y2="18" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <line x1="2" y1="21" x2="22" y2="21" />
  </svg>
);

const IconLegali = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15l2 2 4-4" />
  </svg>
);

const IconImpianti = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
    <path d="M12.5 9l-2.5 4h3l-1.5 4" />
  </svg>
);

const IconGrafici = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="2" />
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <path d="M12 16V12M12 12L7.5 8.5M12 12l4.5-3.5" />
  </svg>
);

// ── RADIAL NETWORK DIAGRAM COMPONENT (CLAUDE ARTIFACT EXACT PROPORTIONS) ──
function NetworkDiagram() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nodes = [
    {
      angle: -90,
      icon: IconFluidoMeccanici,
      lines: ["CONSULENTI", "FLUIDO MECCANICI"],
      align: "top" as const,
      desc: "Progettazione termo-fluidodinamica, simulazioni energetiche avanzate e impianti speciali."
    },
    {
      angle: -45,
      icon: IconStrutturali,
      lines: ["CONSULENTI", "STRUTTURALI"],
      align: "right" as const,
      desc: "Calcolo strutturale, verifiche sismiche, consolidamento statico e adeguamento edifici."
    },
    {
      angle: 0,
      icon: IconInfrastrutturali,
      lines: ["CONSULENTI", "INFRASTRUTTURALI"],
      align: "right" as const,
      desc: "Opere stradali, ponti, gallerie, tracciati ferroviari e infrastrutture complesse."
    },
    {
      angle: 45,
      icon: IconBim,
      lines: ["CONSULENTI", "PROGETTAZIONE BIM"],
      align: "right" as const,
      desc: "Modellazione informativa 4D/5D, clash detection e capitolati informativi BIM."
    },
    {
      angle: 90,
      icon: IconRestauratori,
      lines: ["RESTAURATORI"],
      align: "bottom" as const,
      desc: "Restauro conservativo, beni monumentali vincolati e diagnostica dei materiali storici."
    },
    {
      angle: 135,
      icon: IconLegali,
      lines: ["CONSULENTI", "LEGALI"],
      align: "left" as const,
      desc: "Conformità Codice Appalti, analisi disciplinari e supporto contrattualistico di gara."
    },
    {
      angle: 180,
      icon: IconImpianti,
      lines: ["CONSULENTI", "IMPIANTI"],
      align: "left" as const,
      desc: "Progettazione elettrica, termotecnica, domotica, energie rinnovabili e CAM."
    },
    {
      angle: 225,
      icon: IconGrafici,
      lines: ["GRAFICI 2D E 3D"],
      align: "left" as const,
      desc: "Render fotorealistici, fotoinserimenti territoriali, video animati e infografiche di gara."
    },
  ];

  const width = 680;
  const height = 440;
  const cx = 340;
  const cy = 220;
  const centerRadius = 46;
  const goldRingRadius = 58;
  const orbitRadius = 132;
  const satelliteRadius = 24;

  return (
    <div className="relative w-full max-w-[920px] flex flex-col items-center justify-center select-none mx-auto">
      <div className="relative w-full aspect-[680/440] flex items-center justify-center">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
        >
          {/* Subtle connecting rays from gold ring to satellite node border */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            const x1 = cx + goldRingRadius * cos;
            const y1 = cy + goldRingRadius * sin;
            const x2 = cx + (orbitRadius - satelliteRadius) * cos;
            const y2 = cy + (orbitRadius - satelliteRadius) * sin;

            const isHovered = hoveredIndex === i;

            return (
              <g key={`ray-${i}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isHovered ? "#F5C400" : "#1B2A4A"}
                  strokeOpacity={isHovered ? 0.95 : 0.28}
                  strokeWidth={isHovered ? 2 : 1.2}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Central MBA Golden Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={goldRingRadius}
            fill="none"
            stroke="#F5C400"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* Central Hub MBA Solid Circle */}
          <g className="cursor-default">
            <circle 
              cx={cx} 
              cy={cy} 
              r={centerRadius} 
              fill="#1B2A4A" 
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontSize="24"
              fontWeight="800"
              letterSpacing="0.06em"
              style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
            >
              MBA
            </text>
          </g>

          {/* 8 Satellite Nodes */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = cx + orbitRadius * Math.cos(rad);
            const ny = cy + orbitRadius * Math.sin(rad);
            const isHovered = hoveredIndex === i;
            const NodeIcon = node.icon;

            // Text positions based on alignment
            let textX = nx;
            let textY = ny;
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';

            if (node.align === 'top') {
              textX = nx;
              textY = ny - satelliteRadius - 12;
              textAnchor = 'middle';
            } else if (node.align === 'bottom') {
              textX = nx;
              textY = ny + satelliteRadius + 16;
              textAnchor = 'middle';
            } else if (node.align === 'right') {
              textX = nx + satelliteRadius + 11;
              textY = ny;
              textAnchor = 'start';
            } else if (node.align === 'left') {
              textX = nx - satelliteRadius - 11;
              textY = ny;
              textAnchor = 'end';
            }

            return (
              <g 
                key={i} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Node Solid Circle */}
                <circle
                  cx={nx}
                  cy={ny}
                  r={satelliteRadius}
                  fill={isHovered ? "#F5C400" : "#1B2A4A"}
                  className="transition-colors duration-300"
                />

                {/* Node Centered Icon */}
                <foreignObject 
                  x={nx - 11} 
                  y={ny - 11} 
                  width="22" 
                  height="22"
                  className="pointer-events-none"
                >
                  <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${isHovered ? 'text-[#1B2A4A]' : 'text-white'}`}>
                    <NodeIcon />
                  </div>
                </foreignObject>

                {/* External Text Label */}
                {node.lines.length === 1 ? (
                  <text
                    x={textX}
                    y={textY + 3}
                    textAnchor={textAnchor}
                    fill={isHovered ? "#F5C400" : "#1B2A4A"}
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    className="uppercase select-none transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {node.lines[0]}
                  </text>
                ) : (
                  <text
                    x={textX}
                    y={node.align === 'top' ? textY - 6 : textY - 3}
                    textAnchor={textAnchor}
                    fill={isHovered ? "#F5C400" : "#1B2A4A"}
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    className="uppercase select-none transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    <tspan x={textX} dy="0">{node.lines[0]}</tspan>
                    <tspan x={textX} dy="11">{node.lines[1]}</tspan>
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
