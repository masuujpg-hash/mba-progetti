import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  MagnifyingGlass, 
  ShieldCheck, 
  Users, 
  Heart, 
  Timer,
  Buildings,
  Cube,
  Lightning,
  Camera,
  Scales,
  Bank,
  Calculator
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
      bio: "Massimiliano è il riferimento tecnico dello studio per l'integrazione impiantistica e la progettazione dei sistemi tecnologici. Vanta una solida esperienza nella domotica e nell'illuminotecnica, con particolare attenzione all'applicazione dei Criteri Ambientali Minimi (CAM) nelle opere pubbliche. È responsabile dell'analisi delle soluzioni impiantistiche e della definizione delle strategie di automazione degli edifici, curando l'integrazione tra sistemi ed efficienza energetica."
    },
    {
      badge: "CS",
      name: "Cristian Sisto",
      role: "Architetto",
      bio: "Cristian traduce le scelte progettuali in immagini e contenuti grafici che valorizzano l'identità e la chiarezza dei progetti. All'interno dello studio si occupa della produzione dei render tridimensionali, dell'impaginazione e della redazione grafica delle relazioni migliorative, curando ogni dettaglio visivo per rendere i documenti tecnici immediatamente leggibili e di grande impatto per la commissione."
    },
    {
      badge: "CS",
      name: "Carmine Sarno",
      role: "Architetto",
      bio: "Carmine collabora stabilmente con MBA Progetti come partner tecnico per la progettazione e gestione BIM, la direzione lavori e la contabilità dei lavori pubblici. Cura il coordinamento digitale dei modelli informativi e l'integrazione tra computi metrici estimativi e documentazione tecnica, garantendo coerenza e controllo rigoroso in tutte le fasi di gara e di cantiere."
    },
    {
      badge: "AM",
      name: "Alfonso Masulli",
      role: "Architetto",
      bio: "Alfonso cura la modellazione 3D avanzata, la visualizzazione architettonica e la produzione BIM. Si occupa della generazione di modelli digitali parametrici, render fotorealistici e documentazione grafica a supporto delle offerte tecniche, garantendo qualità visiva e precisione informativa in ogni proposta migliorativa elaborata dallo studio."
    },
    {
      badge: "IDB",
      name: "Ilario Di Buccio",
      role: "Ingegnere Edile",
      bio: "Ingegnere edile specializzato in rilievo integrato e progettazione strutturale, laureato presso l'Università Federico II di Napoli e certificato BIM Specialist ACCREDIA. Porta competenze avanzate in laser scanning 3D, fotogrammetria da drone e modellazione BIM, curando le attività di rilievo e le verifiche di vulnerabilità e conformità strutturale."
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── 1. CINEMATIC HERO ── */}
      <section className="relative min-h-[50vh] md:h-[65vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Studio"
            className="w-full h-full object-cover object-center grayscale contrast-125 opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 block">
              CHI SIAMO
            </span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] leading-[1.2]">
              LO STUDIO
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STORIA E METODO ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block shadow-sm">
                CHI SIAMO
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                STORIA E METODO
              </h2>
              <div className="space-y-4 text-navy/75 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Dal 2019, lo studio MBA opera nel campo della progettazione e della consulenza tecnica con una specializzazione consolidata nelle gare d’appalto pubbliche e nella redazione di offerte migliorative secondo il criterio dell’offerta economicamente più vantaggiosa (OEPV).
                </p>
                <p>
                  Grazie a una struttura multidisciplinare e a collaborazioni consolidate con professionisti e società specialistiche nei settori architettonico, impiantistico e strutturale, lo studio è in grado di affrontare in modo integrato tutte le fasi del processo edilizio, dalla gara alla progettazione esecutiva.
                </p>
                <p>
                  L’obiettivo è coniugare rigore metodologico e sensibilità progettuale, seguendo un percorso strutturato, consolidato e condiviso, che consente di raggiungere precisione e qualità in ogni fase del lavoro.
                </p>
              </div>
            </div>

            {/* Right Column: Building Image */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-sm border border-navy/10 shadow-lg bg-neutral-100">
                <img 
                  src="/media/portfolio/15_ospedale_sarteano.jpg" 
                  alt="Progetto MBA Studio — Architettura e Territorio" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/40 border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
              IL METODO
            </span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-4">
              UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO
            </h2>
            <p className="text-navy/70 text-sm sm:text-base font-light max-w-4xl leading-relaxed mb-3">
              Architetti, ingegneri, specialisti BIM e restauratori integrano le proprie competenze in funzione delle specificità di ogni gara, sviluppando offerte tecniche complete, coerenti e orientate all'aggiudicazione.
            </p>
            <p className="text-navy/60 text-xs sm:text-sm font-light max-w-3xl leading-relaxed">
              Un modello organizzativo a stella che mette al centro il coordinamento MBA e attiva le migliori professionalità specialistiche.
            </p>
          </div>

          {/* Radial Hub Diagram */}
          <div className="py-6 flex justify-center">
            <NetworkDiagram />
          </div>
        </div>
      </section>

      {/* ── 4. I NOSTRI VALORI ── */}
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
              I NOSTRI VALORI
            </span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-4">
              I NOSTRI VALORI
            </h2>
            <p className="text-navy/70 text-sm sm:text-base font-light max-w-4xl leading-relaxed">
              Il nostro lavoro si fonda su principi che non cambiano al variare della procedura o del committente: metodo rigoroso, ricerca costante, responsabilità nei confronti del cliente e del processo costruttivo. Sono i valori che guidano ogni scelta, dalla prima analisi del disciplinare alla consegna dell'offerta.
            </p>
          </div>

          {/* 6 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard 
              icon={Compass}
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
      <section className="py-16 md:py-24 bg-bg-neutral/40 border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Photo / Portrait container */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-navy/5 border border-navy/10 rounded-sm overflow-hidden flex items-center justify-center relative shadow-sm">
                <img 
                  src="/media/team_rilievi.jpg" 
                  alt="Arch. Mario Biondi" 
                  className="w-full h-full object-cover object-top grayscale"
                />
                <div className="absolute inset-0 bg-navy/10" />
              </div>
            </div>

            {/* Right: Founder Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
                  FONDATORE E DIRETTORE
                </span>
                <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                  MARIO BIONDI
                </h2>
                <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] block mt-1">
                  ARCHITETTO, FONDATORE
                </span>
              </div>

              <div className="space-y-4 text-navy/75 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Fondatore dello studio MBA, coordina l’attività dello studio integrando progettazione architettonica e consulenza tecnica per appalti pubblici.
                </p>
                <p>
                  È specializzato nella redazione di offerte migliorative per gare aggiudicate con il criterio dell’offerta economicamente più vantaggiosa (OEPV). Supervisiona la strategia progettuale e la produzione tecnica, assicurando coerenza, metodo e qualità in ogni fase del lavoro.
                </p>
                <p>
                  Ha guidato lo studio nella redazione di oltre 200 offerte tecniche su tutto il territorio nazionale, raggiungendo un tasso di successo sul podio superiore al 60%.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. UNA RETE DI PROFESSIONALITÀ ── */}
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
              TEAM & NETWORK PROFESSIONALE
            </span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-4">
              UNA RETE DI PROFESSIONALITÀ
            </h2>
            <p className="text-navy/70 text-sm sm:text-base font-light max-w-3xl leading-relaxed">
              Un gruppo di collaboratori e consulenti altamente qualificati che integra ogni disciplina tecnica necessaria per la gara e per il cantiere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-bg-neutral/40 p-7 border border-navy/10 rounded-sm space-y-4 hover:border-gold/50 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-navy text-white font-mono font-bold text-xs flex items-center justify-center rounded-sm">
                  {member.badge}
                </div>
                <div>
                  <h3 className="text-navy text-base font-bold uppercase tracking-tight">{member.name}</h3>
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] block mt-0.5">{member.role}</span>
                </div>
                <p className="text-navy/70 text-xs font-light leading-relaxed">{member.bio}</p>
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
    <div className="bg-white p-7 border border-navy/10 rounded-sm space-y-3 hover:border-gold/50 hover:shadow-sm transition-all">
      <div className="text-gold">
        <Icon size={32} weight="light" />
      </div>
      <h3 className="text-navy text-sm font-bold uppercase tracking-wider">{title}</h3>
      <p className="text-navy/70 text-xs font-light leading-relaxed">{text}</p>
    </div>
  );
}

// ── RADIAL NETWORK DIAGRAM COMPONENT (ANIMATO) ──
function NetworkDiagram() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nodes = [
    { label: "Architettura", icon: Buildings, angle: -90, desc: "Progettazione architettonica integrata e coordinamento delle soluzioni tecniche migliorative." },
    { label: "Restauro", icon: Bank, angle: -45, desc: "Recupero, conservazione e valorizzazione di edifici storici e vincolati." },
    { label: "Ingegneria Strutturale", icon: Compass, angle: 0, desc: "Calcolo strutturale, verifiche sismiche e consolidamento statico degli edifici." },
    { label: "Impianti", icon: Lightning, angle: 45, desc: "Progettazione impiantistica HVAC, elettrica, domotica e conformità CAM." },
    { label: "BIM", icon: Cube, angle: 90, desc: "Modellazione informativa 4D/5D, gestione interferenze e digital twin dell'opera." },
    { label: "Rilievi Digitali", icon: Camera, angle: 135, desc: "Scansione 3D Laser Scanner e fotogrammetria con droni per nuvole di punti millimetriche." },
    { label: "Computi", icon: Calculator, angle: 180, desc: "Computi metrici estimativi, analisi prezzi e ottimizzazione economica dell'appalto." },
    { label: "Gare OEPV", icon: Scales, angle: 225, desc: "Strategia d'offerta, interpretazione del disciplinare e massimizzazione del punteggio tecnico." },
  ];

  const size = 520;
  const center = size / 2;
  const radius = 175;

  return (
    <div className="relative w-full max-w-[560px] flex flex-col items-center justify-center select-none">
      <div className="relative w-full aspect-square flex items-center justify-center">
        <svg 
          viewBox={`0 0 ${size} ${size}`} 
          className="w-full h-full overflow-visible"
        >
          {/* Animated Concentric Radar Pulses from Center */}
          <motion.circle 
            cx={center} 
            cy={center} 
            r="48" 
            fill="none" 
            stroke="#F5C400" 
            strokeWidth="1.5"
            animate={{ r: [48, 195], opacity: [0.65, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle 
            cx={center} 
            cy={center} 
            r="48" 
            fill="none" 
            stroke="#1B2A4A" 
            strokeWidth="1.2"
            animate={{ r: [48, 195], opacity: [0.45, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut", delay: 1.7 }}
          />

          {/* Connector Lines & Animated Energy Photons from Center */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = center + radius * Math.cos(rad);
            const y = center + radius * Math.sin(rad);
            const isHovered = hoveredIndex === i;

            return (
              <g key={`connector-${i}`}>
                {/* Connecting Ray */}
                <motion.line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke={isHovered ? "#F5C400" : "#1B2A4A"}
                  strokeOpacity={isHovered ? 0.95 : 0.25}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                />

                {/* Flowing Energy Particle */}
                <motion.circle
                  r={isHovered ? "4" : "2.5"}
                  fill="#F5C400"
                  animate={{
                    cx: [center, x],
                    cy: [center, y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              </g>
            );
          })}

          {/* Central Hub Node (MBA) with gentle breathing animation */}
          <motion.g
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-default"
          >
            <circle 
              cx={center} 
              cy={center} 
              r="48" 
              fill="#1B2A4A" 
              stroke="#F5C400" 
              strokeWidth="2.5" 
              className="shadow-lg filter drop-shadow(0 4px 12px rgba(27,42,74,0.25))"
            />
            <text
              x={center}
              y={center + 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontSize="18"
              fontWeight="700"
              letterSpacing="2"
              fontFamily="monospace"
            >
              MBA
            </text>
          </motion.g>

          {/* Surrounding Satellite Nodes with harmonic floating animation */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = center + radius * Math.cos(rad);
            const y = center + radius * Math.sin(rad);
            const isHovered = hoveredIndex === i;

            // Calculate text position based on angle
            let textX = x;
            let textY = y + 34;
            let anchor: 'middle' | 'start' | 'end' = 'middle';

            if (node.angle === 0) {
              textX = x + 28;
              textY = y + 4;
              anchor = 'start';
            } else if (node.angle === 180) {
              textX = x - 28;
              textY = y + 4;
              anchor = 'end';
            } else if (node.angle === -90) {
              textY = y - 28;
            } else if (node.angle === 90) {
              textY = y + 36;
            } else if (node.angle > 0 && node.angle < 90) {
              textX = x + 24;
              textY = y + 24;
              anchor = 'start';
            } else if (node.angle > 90 && node.angle < 180) {
              textX = x - 24;
              textY = y + 24;
              anchor = 'end';
            } else if (node.angle < 0 && node.angle > -90) {
              textX = x + 24;
              textY = y - 18;
              anchor = 'start';
            } else if (node.angle < -90) {
              textX = x - 24;
              textY = y - 18;
              anchor = 'end';
            }

            const NodeIcon = node.icon;

            return (
              <motion.g 
                key={i} 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, (i % 2 === 0 ? -3.5 : 3.5), 0, (i % 2 === 0 ? 3.5 : -3.5), 0],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 130, damping: 14, delay: 0.15 + i * 0.06 },
                  opacity: { duration: 0.5, delay: 0.15 + i * 0.06 },
                  y: { duration: 3.8 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Outer halo when hovered */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r="28"
                    fill="none"
                    stroke="#F5C400"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    className="animate-ping"
                  />
                )}
                
                <circle
                  cx={x}
                  cy={y}
                  r="22"
                  fill={isHovered ? "#F5C400" : "#1B2A4A"}
                  stroke={isHovered ? "#1B2A4A" : "#F5C400"}
                  strokeWidth={isHovered ? 2 : 1.5}
                  className="transition-colors duration-300 filter drop-shadow(0 2px 6px rgba(0,0,0,0.15))"
                />
                <foreignObject x={x - 12} y={y - 12} width="24" height="24">
                  <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${isHovered ? 'text-navy' : 'text-white'}`}>
                    <NodeIcon size={14} weight={isHovered ? "bold" : "regular"} />
                  </div>
                </foreignObject>
                <text
                  x={textX}
                  y={textY}
                  textAnchor={anchor}
                  fill={isHovered ? "#F5C400" : "#1B2A4A"}
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="0.8"
                  className="uppercase transition-colors duration-300"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Detail Highlight Bar */}
      <div className="mt-4 min-h-[44px] px-6 py-2.5 rounded-sm bg-white border border-navy/10 text-center shadow-sm max-w-md w-full transition-all duration-300">
        <p className="text-xs font-light text-navy/80 leading-relaxed">
          {hoveredIndex !== null ? (
            <span>
              <strong className="text-gold font-bold uppercase tracking-wider mr-1.5">
                {nodes[hoveredIndex].label}:
              </strong>
              {nodes[hoveredIndex].desc}
            </span>
          ) : (
            <span className="text-navy/50 italic text-[11px]">
              Passa il mouse su una disciplina per visualizzare il ruolo nel metodo integrato MBA.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
