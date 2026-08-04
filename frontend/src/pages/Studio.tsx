import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Target, 
  MagnifyingGlass, 
  ShieldCheck, 
  Users, 
  Heart, 
  Timer,
  LinkedinLogo
} from '@phosphor-icons/react';

export default function Studio() {
  const containerRef = useRef<HTMLDivElement>(null);


  interface TeamMember {
    name: string;
    role: string;
    bio: string;
    initials: string;
    linkedin?: string;
  }

  const team: TeamMember[] = [
    {
      name: "Gennaro Solaro",
      role: "Architetto",
      bio: "Architetto con consolidata esperienza nella progettazione e nella gestione delle phases esecutive, Gennaro cura lo sviluppo tecnico del progetto e la sua traduzione operativa in cantiere. Coniuga esperienza di campo e sensibilità progettuale, assicurando coerenza tra le scelte architettoniche e la loro effettiva realizzazione. Segue le attività di direzione lavori e controllo esecutivo, rappresentando un riferimento tecnico all'interno del gruppo di lavoro.",
      initials: "GS",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Massimiliano Celeste",
      role: "Architetto",
      bio: "Massimiliano è il riferimento tecnico dello studio per l'integrazione impiantistica e la progettazione dei sistemi tecnologici. Vanta una solida esperienza nella domotica e nell'illuminotecnica, con particolare attenzione all'applicazione dei Criteri Ambientali Minimi (CAM) nelle opere pubbliche. È responsabile dell'analisi delle soluzioni impiantistiche e della definizione delle strategie di automazione degli edifici, curando l'integrazione tra sistemi, efficienza energetica e coerenza progettuale.",
      initials: "MC",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Cristian Sisto",
      role: "Architetto",
      bio: "Cristian traduce le scelte progettuali in immagini e contenuti grafici che valorizzano l'identità e la chiarezza dei progetti. All'interno dello studio si occupa della produzione dei render, dell'impaginazione e della redazione delle relazioni migliorative, curando ogni dettaglio visivo e comunicativo. La sua competenza unisce precisione tecnica e sensibilità grafica, rendendo i documenti leggibili, coerenti e di immediata comprensione.",
      initials: "CS",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Carmine Sarno",
      role: "Architetto",
      bio: "Carmine collabora stabilmente con MBA Progetti come partner tecnico per la progettazione e gestione BIM, la direzione lavori e la contabilità dei lavori pubblici. Cura il coordinamento digitale dei progetti e l'integrazione tra modelli, computi e documentazione tecnica, per garantire coerenza e controllo in tutte le fasi del processo.",
      initials: "CS",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Alfonso Masulli",
      role: "Architetto",
      bio: "Alfonso cura la modellazione 3D, la visualizzazione architettonica e la produzione BIM. Si occupa della generazione di modelli digitali, render e documentazione grafica a supporto delle offerte tecniche, garantendo qualità visiva e precisione informativa in ogni proposta.",
      initials: "AM",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Ilario Di Buccio",
      role: "Ingegnere Edile",
      bio: "Ingegnere edile specializzato in rilievo integrato e progettazione strutturale, laureato presso il Federico II di Napoli e certificato BIM Specialist ACCREDIA. Porta competenze avanzate in laser scanning 3D, fotogrammetria da drone e modellazione BIM. Collabora con MBA Progetti curando le attività di rilievo e le fasi progettuali che richiedono competenze ingegneristiche strutturali.",
      initials: "IDB",
      linkedin: "https://www.linkedin.com/"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── STUDIO HERO ── */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bg-neutral">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_1.jpg" 
            alt="Studio Interior"
            className="w-full h-full object-cover grayscale opacity-18"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.8em] mb-8 block">Competenza & Visione</span>
            <h1 className="text-navy text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter mb-8">
              Lo <br /> Studio.
            </h1>
          </motion.div>
        </div>

      </section>

      {/* ── LA NOSTRA STORIA ── */}
      <section className="py-12 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-4 sticky top-40">
            <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-8 block">La Nostra Identità</span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-12">
               Storia & <br /> Metodo.
            </h2>
            <div className="w-12 h-px bg-gold" />
          </div>
          
          <div className="lg:col-span-8 space-y-16">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-navy text-2xl md:text-3xl lg:text-5xl font-light leading-[1.2] tracking-tight italic"
            >
              "Ogni risultato nasce da metodo, competenza e dalla capacità di trasformare un'analisi precisa in una proposta vincente."
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6 text-text-main text-base md:text-lg leading-relaxed font-light">
                <p>
                  MBA Progetti è lo studio professionale fondato dall'architetto Mario Biondi, con sede a San Potito Sannitico (CE). Dal 2017 lo studio è specializzato nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche aggiudicate secondo il criterio dell'offerta economicamente più vantaggiosa (OEPV), nell'ambito del D.Lgs. 36/2023.
                </p>
              </div>
              <div className="space-y-6 text-text-main text-base md:text-lg leading-relaxed font-light">
                <p>
                  Lo studio progetta attraverso una rete consolidata di professionisti, selezionati e coordinati in funzione delle esigenze di ogni procedura. Un modello multidisciplinare che mette a sistema le competenze di progettazione architettonica, modellazione BIM e contabilità dei lavori con specialisti dei settori strutturale, impiantistico e infrastrutturale.
                </p>
                <p className="font-bold text-navy border-l-4 border-gold pl-6 py-2 mt-8">
                  Opera nel settore delle gare d'appalto dal 2016. Dal 2022 al 2025, il 63% delle procedure affidate si è concluso con un piazzamento nelle prime tre posizioni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="py-24 bg-bg-neutral border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            <StatItem value="63%" label="Gare sul Podio" />
            <StatItem value="+200" label="Gare Redatte" />
            <StatItem value="38%" label="Aggiudicazioni" />
            <StatItem value="+10" label="Specialisti" />
         </div>
      </section>

      {/* ── VALORI ── */}
      <section className="py-12 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-10 md:mb-20">
           <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro DNA</span>
           <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">I Nostri Valori.</h2>
           <p className="text-text-main mt-6 max-w-3xl font-light text-lg leading-relaxed">
             Il nostro lavoro si fonda su principi che non cambiano al variare della procedura o del committente: metodo rigoroso, ricerca costante, responsabilità nei confronti del cliente e del processo costruttivo. Sono i valori che guidano ogni scelta, dalla prima analisi del disciplinare alla consegna dell'offerta.
           </p>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            variants={valuesContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ValueCard icon={Target} title="Metodo" text="Un processo rigoroso guida ogni fase: dall'analisi del disciplinare alla consegna dell'offerta. Il controllo sistematico garantisce coerenza, precisione e affidabilità del risultato." />
            <ValueCard icon={MagnifyingGlass} title="Ricerca" text="Ogni offerta richiede aggiornamento continuo su normativa, materiali, tecniche costruttive e procedure di gara. La qualità nasce dalla conoscenza." />
            <ValueCard icon={ShieldCheck} title="Responsabilità" text="Ci assumiamo la piena responsabilità del lavoro svolto: nei confronti del cliente, della stazione appaltante e della qualità del costruito." />
            <ValueCard icon={Users} title="Collaborazione" text="Il dialogo costante tra i collaboratori dello studio, l'impresa e i consulenti esterni è parte integrante del processo e condizione del risultato." />
            <ValueCard icon={Heart} title="Passione" text="L'architettura e il progetto non sono solo un mestiere. Sono la motivazione che rende ogni lavoro diverso dal precedente e ogni soluzione più precisa." />
            <ValueCard icon={Timer} title="Affidabilità" text="Rispettiamo gli impegni, i tempi e le aspettative. La fiducia dei clienti è il risultato che consideriamo più importante." />
          </motion.div>
        </div>
      </section>

      {/* ── FONDATORE ── */}
      <section className="py-12 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden grayscale"
            >
              <img 
                src="/media/team_rilievi.jpg" 
                alt="MBA Progetti Team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/10" />
            </motion.div>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Fondatore e Titolare</span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-4">Mario Biondi</h2>
              <span className="text-gold font-bold text-sm tracking-widest uppercase">Architetto, Fondatore</span>
            </div>
            <div className="space-y-6 text-text-main text-base md:text-lg font-light leading-relaxed">
              <p>
                Titolare dello studio MBA Progetti, coordina l'attività professionale integrando progettazione architettonica e consulenza tecnica per appalti pubblici. È specializzato nella redazione di offerte tecniche migliorative per gare OEPV e nella definizione della strategia progettuale complessiva.
              </p>
              <p>
                Supervisiona la produzione tecnica di ogni offerta, assicurando coerenza metodologica e qualità documentale in tutte le fasi del lavoro. La sua competenza abbraccia la normativa CAM, la metodologia BIM e il quadro regolatorio del settore degli appalti pubblici — dal D.Lgs. 36/2023 alle Linee Guida ANAC — garantendo offerte tecniche sempre aggiornate, conformi e competitive.
              </p>
              <p>
                Opera nel settore delle gare d'appalto dal 2016. Dal 2022 al 2025, il 63% delle procedure affidate si è concluso con un piazzamento nelle prime tre posizioni, con un tasso di aggiudicazione del 38%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLABORATORI ── */}
      <section className="py-12 md:py-32 bg-bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 md:mb-24">
             <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Competenze Multidisciplinari</span>
             <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
              Una Rete di <br /> Professionalità.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group space-y-8"
              >
                <div className="relative aspect-square overflow-hidden bg-navy/5 flex items-center justify-center text-6xl font-bold text-navy/10 border border-navy/5 group-hover:border-gold/30 transition-all duration-700">
                  {member.initials}
                </div>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-navy text-2xl font-bold uppercase tracking-tighter">{member.name}</h3>
                      <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em]">{member.role}</span>
                    </div>
                    <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-navy/40 hover:text-[#B8972A] transition-colors" aria-label={`Profilo LinkedIn di ${member.name}`}>
                      <LinkedinLogo size={24} weight="light" />
                    </a>
                  </div>
                  <p className="text-text-main text-sm font-light leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const valuesContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const valueItemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 14
    }
  }
};

function ValueCard({ icon: Icon, title, text }: any) {
  return (
    <motion.div 
      variants={valueItemVariants}
      className="p-8 md:p-10 border border-navy/10 bg-white group hover:shadow-xl hover:border-gold/30 transition-all duration-500 -translate-y-0 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="text-gold mb-8">
        <Icon size={40} weight="light" />
      </div>
      <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-4 transition-colors duration-500">{title}</h3>
      <p className="text-text-main font-light leading-relaxed text-sm">
        {text}
      </p>
    </motion.div>
  );
}

function StatItem({ value, label }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.endsWith('%') ? '%' : '';

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      if (start === end) return;

      const steps = 60; // 60 frames
      const increment = end / steps;
      let stepCount = 0;

      const timer = setInterval(() => {
        stepCount++;
        if (stepCount >= steps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * stepCount));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center">
       <div className="text-navy text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-3">
         {prefix}{isInView ? count : 0}{suffix}
       </div>
       <div className="text-gold text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[140px] mx-auto">{label}</div>
    </div>
  );
}
