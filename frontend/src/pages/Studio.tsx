import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Target, 
  MagnifyingGlass, 
  ShieldCheck, 
  Users, 
  Heart, 
  Timer
} from '@phosphor-icons/react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  badge: string;
}

export default function Studio() {
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
      <section className="relative h-[44vh] min-h-[320px] sm:h-[52vh] w-full flex items-center justify-center overflow-hidden bg-[#1B2A4A] font-outfit">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Studio"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1B2A4A]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2A4A]/80 via-[#1B2A4A]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white/95 text-xs sm:text-[13px] font-medium uppercase tracking-[0.25em] mb-2.5">
              COMPETENZA E VISIONE
            </div>
            <h1 className="text-white text-4xl sm:text-5xl md:text-[56px] font-bold uppercase tracking-[0.04em] leading-[1.05] drop-shadow-sm">
              LO STUDIO
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STORIA E METODO ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-5"
            >
              <div>
                <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] shadow-2xs font-outfit">
                  CHI SIAMO
                </span>
              </div>
              <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] font-outfit">
                STORIA E METODO
              </h2>
              <div className="text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] max-w-[62ch] font-outfit">
                <p>
                  Lo studio dell'architetto Mario Biondi si occupa di progettazione e consulenza tecnica ed <strong className="font-bold text-[#1b2a4a]">è specializzato nelle gare d'appalto di lavori pubblici</strong>, in particolare nella redazione di <strong className="font-bold text-[#1b2a4a]">offerte migliorative</strong> secondo il criterio dell'offerta economicamente più vantaggiosa (OEV). Opera con una <strong className="font-bold text-[#1b2a4a]">rete stabile di professionisti e società specializzate</strong> che copre ogni aspetto dell'offerta tecnica: architettura, strutture, impianti ed energetica, grafica e modellazione BIM. Ogni offerta <strong className="font-bold text-[#1b2a4a]">è costruita insieme all'impresa</strong>, dall'analisi del disciplinare alla consegna della documentazione di gara.
                </p>
              </div>
            </motion.div>

            {/* Right Column: 3 Studio Photos Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="col-span-2 overflow-hidden rounded-[2px] border border-[#1b2a4a]/15 shadow-sm bg-neutral-100 aspect-[16/10]">
                  <img 
                    src="/media/studio-a.jpg" 
                    alt="MBA Studio — Sede e spazi di lavoro" 
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-[2px] border border-[#1b2a4a]/15 shadow-sm bg-neutral-100 aspect-[4/3]">
                  <img 
                    src="/media/studio-b.jpg" 
                    alt="MBA Studio — Team e progettazione" 
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-[2px] border border-[#1b2a4a]/15 shadow-sm bg-neutral-100 aspect-[4/3]">
                  <img 
                    src="/media/studio-c.jpg" 
                    alt="MBA Studio — Dettaglio operativo" 
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO (LA RETE) ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-10"
          >
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] mb-4 shadow-2xs font-outfit">
              LA RETE
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] mb-5 font-outfit">
              UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO
            </h2>
            <div className="space-y-4 text-[#3d4a66] text-base md:text-[17px] font-normal max-w-[62ch] leading-[1.65] mb-10 font-outfit">
              <p>
                Ogni gara richiede competenze diverse. Lo studio costruisce attorno alla singola procedura <strong className="font-bold text-[#1b2a4a]">un gruppo di lavoro</strong> con architetti, ingegneri strutturisti e impiantisti, restauratori, specialisti BIM e grafici, coinvolti secondo le richieste del disciplinare. Il gruppo lavora sotto il <strong className="font-bold text-[#1b2a4a]">coordinamento dello studio</strong>, dall'analisi degli atti alla consegna dell'offerta.
              </p>
              <p>
                Il confronto tra le diverse competenze permette di <strong className="font-bold text-[#1b2a4a]">individuare migliorie pertinenti</strong>, verificarne la fattibilità e tradurle in <strong className="font-bold text-[#1b2a4a]">una proposta chiara e coerente</strong>.
              </p>
            </div>
          </motion.div>

          {/* Radial Hub Diagram - Ingrandito ed Animato con Framer Motion */}
          <div className="py-6 sm:py-10 flex justify-center w-full">
            <NetworkDiagram />
          </div>
        </div>
      </section>

      {/* ── 4. I NOSTRI VALORI ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-12"
          >
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] mb-4 shadow-2xs font-outfit">
              IL NOSTRO DNA
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] mb-4 font-outfit">
              I NOSTRI VALORI
            </h2>
            <p className="text-[#3d4a66] text-base md:text-[17px] font-normal max-w-[62ch] leading-[1.65] font-outfit">
              Il nostro lavoro si fonda su principi che non cambiano al variare della procedura o del committente: <strong className="font-bold text-[#1b2a4a]">metodo rigoroso</strong>, <strong className="font-bold text-[#1b2a4a]">ricerca costante</strong>, <strong className="font-bold text-[#1b2a4a]">responsabilità</strong> nei confronti del cliente e del processo costruttivo. Sono i valori che guidano ogni scelta, dalla prima analisi del disciplinare alla consegna dell'offerta.
            </p>
          </motion.div>

          {/* 6 Value Cards con stagger animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard 
              index={0}
              icon={Target}
              title="METODO"
              text="Un processo rigoroso guida ogni fase: dall'analisi del disciplinare alla consegna dell'offerta. Il controllo sistematico garantisce coerenza, precisione e affidabilità del risultato."
            />
            <ValueCard 
              index={1}
              icon={MagnifyingGlass}
              title="RICERCA"
              text="Ogni offerta richiede aggiornamento continuo su normativa, materiali, tecniche costruttive e procedure di gara. La qualità nasce dalla conoscenza."
            />
            <ValueCard 
              index={2}
              icon={ShieldCheck}
              title="RESPONSABILITÀ"
              text="Ci assumiamo la piena responsabilità del lavoro svolto: nei confronti del cliente, della stazione appaltante e della qualità del costruito."
            />
            <ValueCard 
              index={3}
              icon={Users}
              title="COLLABORAZIONE"
              text="Il dialogo costante tra i collaboratori dello studio, l'impresa e i consulenti esterni è parte integrante del processo e condizione del risultato."
            />
            <ValueCard 
              index={4}
              icon={Heart}
              title="PASSIONE"
              text="L'architettura e il progetto non sono solo un mestiere. Sono la motivazione che rende ogni lavoro diverso dal precedente e ogni soluzione più precisa."
            />
            <ValueCard 
              index={5}
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="aspect-[4/5] bg-[#eef1f4] border border-[#1b2a4a]/15 rounded-[1px] overflow-hidden flex flex-col items-center justify-center text-center p-6 text-[#1b2a4a]/50 shadow-xs relative">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7b869d] font-outfit">[FOTO]</span>
                <span className="text-[13px] font-light text-[#7b869d] mt-1 font-outfit">Ritratto di Mario Biondi</span>
              </div>
            </motion.div>

            {/* Right: Founder Details */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] mb-4 shadow-2xs font-outfit">
                  FONDATORE E TITOLARE
                </span>
                <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] font-outfit">
                  MARIO BIONDI
                </h2>
                <span className="text-[#F5C400] text-[11px] font-medium uppercase tracking-[0.2em] block mt-1 font-outfit">
                  ARCHITETTO, TITOLARE
                </span>
              </div>

              <div className="space-y-4 text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] max-w-[62ch] font-outfit">
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
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 6. UNA RETE DI PROFESSIONALITÀ ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-10"
          >
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] mb-4 shadow-2xs font-outfit">
              COMPETENZE MULTIDISCIPLINARI
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] font-outfit">
              UNA RETE DI PROFESSIONALITÀ
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-7 sm:p-8 border border-[#1b2a4a]/15 rounded-[1px] space-y-4 hover:border-[#F5C400] hover:shadow-xs transition-all group"
              >
                <div className="w-10 h-10 bg-[#1b2a4a] group-hover:bg-[#F5C400] group-hover:text-[#1b2a4a] text-white font-mono font-bold text-xs flex items-center justify-center rounded-[1px] transition-colors shadow-2xs">
                  {member.badge}
                </div>
                <div>
                  <h3 className="text-[#1b2a4a] text-[17px] font-bold uppercase tracking-[0.05em] font-outfit group-hover:text-[#F5C400] transition-colors">{member.name}</h3>
                  <span className="text-[#F5C400] text-[11px] font-medium uppercase tracking-[0.2em] block mt-0.5 font-outfit">{member.role}</span>
                </div>
                <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed font-outfit">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ── VALUE CARD COMPONENT CON ENTRATA ANIMATA ──
function ValueCard({ icon: Icon, title, text, index }: { icon: any; title: string; text: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white p-8 sm:p-10 border border-[#1b2a4a]/15 rounded-[1px] space-y-4 hover:border-[#F5C400] hover:shadow-xs transition-all group"
    >
      <div className="text-[#F5C400] transition-transform duration-300 group-hover:scale-110">
        <Icon size={36} weight="light" />
      </div>
      <h3 className="text-[#1b2a4a] text-[17px] font-bold tracking-[0.05em] uppercase font-outfit group-hover:text-[#F5C400] transition-colors">{title}</h3>
      <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed font-outfit">{text}</p>
    </motion.div>
  );
}

// ── ICONE SVG NETWORK DIAGRAM ──
const IconFluidoMeccanici = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
  </svg>
);

const IconStrutturali = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="3" width="10" height="18" />
    <line x1="7" y1="3" x2="17" y2="12" />
    <line x1="17" y1="3" x2="7" y2="12" />
    <line x1="7" y1="12" x2="17" y2="21" />
    <line x1="17" y1="12" x2="7" y2="21" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const IconInfrastrutturali = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V11a7 7 0 0 1 14 0v10" />
    <line x1="12" y1="16" x2="12" y2="17.5" />
    <line x1="12" y1="19.5" x2="12" y2="21" />
  </svg>
);

const IconBim = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <line x1="12" y1="12" x2="20" y2="7.5" />
    <line x1="12" y1="12" x2="4" y2="7.5" />
  </svg>
);

const IconRestauratori = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15l2 2 4-4" />
  </svg>
);

const IconImpianti = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
    <path d="M12.5 9l-2.5 4h3l-1.5 4" />
  </svg>
);

const IconGrafici = () => (
  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="2" />
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <path d="M12 16V12M12 12L7.5 8.5M12 12l4.5-3.5" />
  </svg>
);

// ── RADIAL NETWORK DIAGRAM COMPONENT (INGRANDITO ED ANIMATO ALLA COMPARSA) ──
function NetworkDiagram() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

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

  // Geometria ampliata e più grande (+40%)
  const width = 860;
  const height = 580;
  const cx = 430;
  const cy = 290;
  const centerRadius = 58;
  const goldRingRadius = 74;
  const orbitRadius = 180;
  const satelliteRadius = 30;

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[1020px] flex flex-col items-center justify-center select-none mx-auto px-0 sm:px-2"
    >
      {/* Diagramma radiale orbitale (Desktop & Mobile) */}
      <div className="flex relative w-full aspect-[860/580] items-center justify-center overflow-visible">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
        >
          {/* Raggi di collegamento animati dal centro verso i nodi satellite */}
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
              <motion.line
                key={`ray-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHovered ? "#F5C400" : "#1B2A4A"}
                strokeOpacity={isHovered ? 0.95 : 0.28}
                strokeWidth={isHovered ? 2.2 : 1.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Anello Aureo MBA Pulsante ed Animato */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={goldRingRadius}
            fill="none"
            stroke="#F5C400"
            strokeWidth="1.5"
            strokeOpacity="0.85"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hub Centrale MBA con animazione ad espansione */}
          <motion.g 
            className="cursor-default"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle 
              cx={cx} 
              cy={cy} 
              r={centerRadius} 
              fill="#1B2A4A" 
              className="drop-shadow-md"
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontSize="30"
              fontWeight="800"
              letterSpacing="0.06em"
              style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
            >
              MBA
            </text>
          </motion.g>

          {/* 8 Nodi Satellite con Entrata Sequenziale Staggered */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = cx + orbitRadius * Math.cos(rad);
            const ny = cy + orbitRadius * Math.sin(rad);
            const isHovered = hoveredIndex === i;
            const NodeIcon = node.icon;

            // Coordinate del testo etichetta
            let textX = nx;
            let textY = ny;
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';

            if (node.align === 'top') {
              textX = nx;
              textY = ny - satelliteRadius - 14;
              textAnchor = 'middle';
            } else if (node.align === 'bottom') {
              textX = nx;
              textY = ny + satelliteRadius + 18;
              textAnchor = 'middle';
            } else if (node.align === 'right') {
              textX = nx + satelliteRadius + 14;
              textY = ny;
              textAnchor = 'start';
            } else if (node.align === 'left') {
              textX = nx - satelliteRadius - 14;
              textY = ny;
              textAnchor = 'end';
            }

            return (
              <motion.g 
                key={i} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + i * 0.07, 
                  type: "spring", 
                  stiffness: 220, 
                  damping: 18 
                }}
                style={{ transformOrigin: `${nx}px ${ny}px` }}
              >
                {/* Cerchio del Nodo Satellite */}
                <circle
                  cx={nx}
                  cy={ny}
                  r={satelliteRadius}
                  fill={isHovered ? "#F5C400" : "#1B2A4A"}
                  className="transition-colors duration-300 drop-shadow-sm"
                />

                {/* Icona Centrata */}
                <foreignObject 
                  x={nx - 14} 
                  y={ny - 14} 
                  width="28" 
                  height="28"
                  className="pointer-events-none"
                >
                  <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${isHovered ? 'text-[#1B2A4A]' : 'text-white'}`}>
                    <NodeIcon />
                  </div>
                </foreignObject>

                {/* Etichetta Esterna */}
                {node.lines.length === 1 ? (
                  <motion.text
                    x={textX}
                    y={textY + 4}
                    textAnchor={textAnchor}
                    fill={isHovered ? "#F5C400" : "#1B2A4A"}
                    fontSize="11.5"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    className="uppercase select-none transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                  >
                    {node.lines[0]}
                  </motion.text>
                ) : (
                  <motion.text
                    x={textX}
                    y={node.align === 'top' ? textY - 8 : textY - 4}
                    textAnchor={textAnchor}
                    fill={isHovered ? "#F5C400" : "#1B2A4A"}
                    fontSize="11.5"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    className="uppercase select-none transition-colors duration-300"
                    style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                  >
                    <tspan x={textX} dy="0">{node.lines[0]}</tspan>
                    <tspan x={textX} dy="13">{node.lines[1]}</tspan>
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
