import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  MagnifyingGlass, 
  ShieldCheck, 
  Users, 
  Heart, 
  Timer
} from '@phosphor-icons/react';
import { 
  Crosshair, 
  Construction, 
  TrainFrontTunnel, 
  Box, 
  Landmark, 
  FileCheck, 
  Zap, 
  DraftingCompass 
} from 'lucide-react';

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
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-left mb-10">
            <span className="bg-[#F5C400] text-white text-[11px] font-bold uppercase tracking-[0.14em] px-3.5 py-1 rounded-[1px] inline-block mb-5 shadow-sm">
              LA RETE
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-[34px] font-extrabold uppercase tracking-tight leading-tight mb-5">
              UN APPROCCIO MULTIDISCIPLINARE, UN UNICO OBIETTIVO
            </h2>
            <div className="space-y-4 text-[#1B2A4A]/80 text-sm sm:text-[15px] font-normal max-w-4xl leading-relaxed mb-10">
              <p>
                Ogni gara richiede competenze diverse. Lo studio costruisce attorno alla singola procedura <strong className="font-bold text-[#1B2A4A]">un gruppo di lavoro</strong> con architetti, ingegneri strutturisti e impiantisti, restauratori, specialisti BIM e grafici, coinvolti secondo le richieste del disciplinare. Il gruppo lavora sotto il <strong className="font-bold text-[#1B2A4A]">coordinamento dello studio</strong>, dall'analisi degli atti alla consegna dell'offerta.
              </p>
              <p>
                Il confronto tra le diverse competenze permette di <strong className="font-bold text-[#1B2A4A]">individuare migliorie pertinenti</strong>, verificarne la fattibilità e tradurle in <strong className="font-bold text-[#1B2A4A]">una proposta chiara e coerente</strong>.
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

// ── RADIAL NETWORK DIAGRAM COMPONENT (CLAUDE ARTIFACT EXACT PROPORTIONS) ──
function NetworkDiagram() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nodes = [
    {
      angle: -90,
      icon: Crosshair,
      lines: ["CONSULENTI", "FLUIDO MECCANICI"],
      align: "top" as const,
      desc: "Progettazione termo-fluidodinamica, simulazioni energetiche avanzate e impianti speciali."
    },
    {
      angle: -45,
      icon: Construction,
      lines: ["CONSULENTI", "STRUTTURALI"],
      align: "right" as const,
      desc: "Calcolo strutturale, verifiche sismiche, consolidamento statico e adeguamento edifici."
    },
    {
      angle: 0,
      icon: TrainFrontTunnel,
      lines: ["CONSULENTI", "INFRASTRUTTURALI"],
      align: "right" as const,
      desc: "Opere stradali, ponti, gallerie, tracciati ferroviari e infrastrutture complesse."
    },
    {
      angle: 45,
      icon: Box,
      lines: ["CONSULENTI", "PROGETTAZIONE BIM"],
      align: "right" as const,
      desc: "Modellazione informativa 4D/5D, clash detection e capitolati informativi BIM."
    },
    {
      angle: 90,
      icon: Landmark,
      lines: ["RESTAURATORI"],
      align: "bottom" as const,
      desc: "Restauro conservativo, beni monumentali vincolati e diagnostica dei materiali storici."
    },
    {
      angle: 135,
      icon: FileCheck,
      lines: ["CONSULENTI", "LEGALI"],
      align: "left" as const,
      desc: "Conformità Codice Appalti, analisi disciplinari e supporto contrattualistico di gara."
    },
    {
      angle: 180,
      icon: Zap,
      lines: ["CONSULENTI", "IMPIANTI"],
      align: "left" as const,
      desc: "Progettazione elettrica, termotecnica, domotica, energie rinnovabili e CAM."
    },
    {
      angle: 225,
      icon: DraftingCompass,
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
    <div className="relative w-full max-w-[640px] flex flex-col items-center justify-center select-none">
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
                    <NodeIcon size={18} strokeWidth={2} />
                  </div>
                </foreignObject>

                {/* External Text Label */}
                {node.lines.length === 1 ? (
                  <text
                    x={textX}
                    y={textY + 3}
                    textAnchor={textAnchor}
                    fill={isHovered ? "#F5C400" : "#1B2A4A"}
                    fontSize="9.5"
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
                    fontSize="9.5"
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

      {/* Interactive Tooltip Card at the bottom when a node is hovered */}
      <div className="h-10 mt-3 flex items-center justify-center w-full px-4">
        {hoveredIndex !== null ? (
          <p className="text-xs text-[#1B2A4A]/85 font-medium text-center transition-all">
            <strong className="text-[#F5C400] font-bold uppercase tracking-wider mr-1.5">
              {nodes[hoveredIndex].lines.join(" ")}:
            </strong>
            {nodes[hoveredIndex].desc}
          </p>
        ) : (
          <p className="text-[11px] text-[#1B2A4A]/40 uppercase tracking-wider text-center">
            Passa il mouse su una disciplina per visualizzare i dettagli
          </p>
        )}
      </div>
    </div>
  );
}
