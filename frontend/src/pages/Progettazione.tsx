import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HouseLine,
  FileText,
  Lightning,
  Wheelchair,
  ArrowsClockwise,
  Leaf,
  Tree,
  Compass,
  Buildings,
  Drop,
  ShieldCheck,
  Wrench,
  CheckCircle,
  ArrowRight,
  SpeakerHigh,
  SunDim,
  SlidersHorizontal,
  Armchair,
  Article,
  Desktop,
  Bank
} from '@phosphor-icons/react';

// ─── GRAFICO ANIMATO 1: DIAGRAMMA DI VENN IDENTICO AL MOCKUP ─────────────────
function AnimatedVennDiagram() {
  const [hovered, setHovered] = useState<'arch' | 'struct' | 'sys' | 'core' | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Geometria precisa 3 cerchi simmetrici
  // R = raggio cerchi, D = distanza dal centro (140, 130)
  const cx = 140;
  const cy = 130;
  const R = 64;
  const d = 34; // offset radiale

  // Cerchio 1 (Top): Architettura
  const c1 = { x: cx, y: cy - d };
  // Cerchio 2 (Bottom-Left): Strutture (angolo 210° -> -30° sotto asse X negativo)
  const c2 = { x: cx - d * 0.866, y: cy + d * 0.5 };
  // Cerchio 3 (Bottom-Right): Impianti (angolo 330° -> -30° sotto asse X positivo)
  const c3 = { x: cx + d * 0.866, y: cy + d * 0.5 };

  return (
    <div ref={ref} className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 sm:gap-10">
      {/* SVG dei 3 Cerchi con Intersezione Aurea Esatta */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 280 260" className="w-full h-full overflow-visible">
          <defs>
            {/* Maschera di ritaglio per l'intersezione aurea dei 3 cerchi */}
            <clipPath id="clipC1">
              <circle cx={c1.x} cy={c1.y} r={R} />
            </clipPath>
            <clipPath id="clipC2">
              <circle cx={c2.x} cy={c2.y} r={R} />
            </clipPath>
            <clipPath id="clipC3">
              <circle cx={c3.x} cy={c3.y} r={R} />
            </clipPath>
          </defs>

          {/* Sfondo Intersezione Centrale Riempita in ORO (Progetto Coordinato) */}
          <g clipPath="url(#clipC1)">
            <g clipPath="url(#clipC2)">
              <motion.circle
                cx={c3.x}
                cy={c3.y}
                r={R}
                fill="#F5C400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? {
                  opacity: hovered === 'core' ? 1 : 0.92,
                  scale: hovered === 'core' ? 1.05 : 1
                } : {}}
                transition={{ duration: 0.5 }}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHovered('core')}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          </g>

          {/* Cerchio 1: Architettura (Top - Navy Scuro) */}
          <motion.circle
            cx={c1.x}
            cy={c1.y}
            r={R}
            fill={hovered === 'arch' ? 'rgba(27, 42, 74, 0.06)' : 'transparent'}
            stroke="#1B2A4A"
            strokeWidth={hovered === 'arch' ? 3.5 : 2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHovered('arch')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Cerchio 2: Strutture (Bottom-Left - Navy Medio/Blu Avio) */}
          <motion.circle
            cx={c2.x}
            cy={c2.y}
            r={R}
            fill={hovered === 'struct' ? 'rgba(59, 89, 133, 0.06)' : 'transparent'}
            stroke="#3B5985"
            strokeWidth={hovered === 'struct' ? 3.5 : 2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHovered('struct')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Cerchio 3: Impianti (Bottom-Right - Celeste/Acciaio Chiaro) */}
          <motion.circle
            cx={c3.x}
            cy={c3.y}
            r={R}
            fill={hovered === 'sys' ? 'rgba(126, 157, 191, 0.08)' : 'transparent'}
            stroke="#7E9DBF"
            strokeWidth={hovered === 'sys' ? 3.5 : 2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHovered('sys')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Pulsazione soffusa al centro oro quando in hover */}
          {hovered === 'core' && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={18}
              fill="none"
              stroke="#F5C400"
              strokeWidth="1.5"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
            />
          )}
        </svg>
      </div>

      {/* Legenda Esatta del Mockup (A destra del diagramma) */}
      <div className="flex flex-col justify-center space-y-4 text-left">
        {/* Voce 1: ARCHITETTURA */}
        <div
          onMouseEnter={() => setHovered('arch')}
          onMouseLeave={() => setHovered(null)}
          className={`flex items-start gap-3 cursor-pointer transition-opacity ${
            hovered && hovered !== 'arch' ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1B2A4A] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold text-navy uppercase tracking-wider leading-tight">
              ARCHITETTURA
            </h4>
            <p className="text-[11px] text-navy/70 lowercase font-normal leading-tight mt-0.5">
              spazi, funzioni e contesto
            </p>
          </div>
        </div>

        {/* Voce 2: STRUTTURE */}
        <div
          onMouseEnter={() => setHovered('struct')}
          onMouseLeave={() => setHovered(null)}
          className={`flex items-start gap-3 cursor-pointer transition-opacity ${
            hovered && hovered !== 'struct' ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#3B5985] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold text-navy uppercase tracking-wider leading-tight">
              STRUTTURE
            </h4>
            <p className="text-[11px] text-navy/70 lowercase font-normal leading-tight mt-0.5">
              sicurezza e durabilità
            </p>
          </div>
        </div>

        {/* Voce 3: IMPIANTI */}
        <div
          onMouseEnter={() => setHovered('sys')}
          onMouseLeave={() => setHovered(null)}
          className={`flex items-start gap-3 cursor-pointer transition-opacity ${
            hovered && hovered !== 'sys' ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#7E9DBF] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold text-navy uppercase tracking-wider leading-tight">
              IMPIANTI
            </h4>
            <p className="text-[11px] text-navy/70 lowercase font-normal leading-tight mt-0.5">
              comfort ed energia
            </p>
          </div>
        </div>

        {/* Voce 4: PROGETTO COORDINATO (Oro) */}
        <div
          onMouseEnter={() => setHovered('core')}
          onMouseLeave={() => setHovered(null)}
          className={`flex items-start gap-3 cursor-pointer transition-opacity ${
            hovered && hovered !== 'core' ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#F5C400] mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold text-[#F5C400] uppercase tracking-wider leading-tight">
              PROGETTO COORDINATO
            </h4>
            <p className="text-[11px] text-navy/70 lowercase font-normal leading-tight mt-0.5">
              un unico progetto, senza interferenze
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GRAFICO ANIMATO 2: PROCESSO A STEP DALLA GARA AL CANTIERE (IDENTICO AL MOCKUP) ───
function AnimatedProcessStepper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      title: 'GARA',
      desc: 'Offerta tecnica migliorativa',
      icon: Article
    },
    {
      title: 'PFTE',
      desc: 'Progetto di fattibilità tecnico economica',
      icon: HouseLine
    },
    {
      title: 'ESECUTIVO',
      desc: 'Progetto esecutivo',
      icon: Desktop
    },
    {
      title: 'CANTIERE',
      desc: 'Realizzazione dell’opera',
      icon: Bank
    }
  ];

  return (
    <div
      ref={containerRef}
      className="bg-[#F8F9FA] rounded-md p-6 sm:p-10 md:p-12 border border-navy/5 shadow-2xs"
    >
      {/* Stepper Row with Connecting Gold Line */}
      <div className="relative mb-6">
        {/* Continuous Connecting Gold Line passing through circle centers */}
        <div className="absolute top-7 sm:top-8 left-[12.5%] right-[12.5%] h-[2px] bg-[#F5C400] z-0">
          {/* Animated Light Pulse traveling across the line */}
          <motion.div
            className="absolute -top-[3px] w-4 h-2 rounded-full bg-white shadow-[0_0_8px_#F5C400]"
            animate={{
              left: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        {/* 4 Nodes Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={step.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Navy Circle with White Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: 'backOut' }}
                  whileHover={{ scale: 1.1 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isHovered ? 'ring-4 ring-gold/40 shadow-md' : ''
                  }`}
                >
                  <Icon size={26} weight="regular" className="text-white" />
                </motion.div>

                {/* Node Title */}
                <h4 className="text-xs sm:text-[13px] font-bold text-navy uppercase tracking-wider mt-3 sm:mt-4 transition-colors group-hover:text-gold">
                  {step.title}
                </h4>

                {/* Node Subtitle */}
                <p className="text-[11px] sm:text-xs text-navy/70 mt-1 leading-snug font-normal max-w-[170px] mx-auto">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bracket spanning PFTE & ESECUTIVO (Cols 2 and 3) */}
      <div className="grid grid-cols-4 mt-6">
        <div className="col-start-2 col-span-2 flex flex-col items-center">
          {/* Gold Bracket Line with upward ticks */}
          <div className="w-[82%] sm:w-[75%] h-2.5 border-b border-l border-r border-[#F5C400]" />
          <span className="text-[10px] sm:text-[11px] font-bold text-[#F5C400] uppercase tracking-wider mt-2.5 text-center px-2">
            APPALTO INTEGRATO: PROGETTAZIONE DAL PFTE ALL'ESECUTIVO
          </span>
        </div>
      </div>

      {/* Thin Divider Line */}
      <div className="w-full h-px bg-navy/10 mt-8 mb-6" />

      {/* Bottom Subtitle */}
      <p className="text-center text-xs sm:text-[12px] font-bold text-navy uppercase tracking-[0.2em]">
        UN SOLO GRUPPO DI LAVORO DALLA GARA AL CANTIERE
      </p>
    </div>
  );
}

// ─── GRAFICO ANIMATO 3: TRIANGOLO DI FERRO DEL PROJECT MANAGEMENT ────────────
function AnimatedIronTriangle() {
  const [activeVertex, setActiveVertex] = useState<'tempi' | 'costi' | 'qualita' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const vertexDetails = {
    tempi: {
      title: 'Tempi & Cronoprogramma',
      badge: '100% Rispetto Milestone',
      desc: 'Cronoprogrammi esecutivi Gantt a maglie strette, SAL puntuali e monitoraggio quotidiano delle lavorazioni critiche.'
    },
    costi: {
      title: 'Costi & Budget Cantierabile',
      badge: 'Zero Extra Costi',
      desc: 'Computi metrici estimativi dettagliati, contabilità dei lavori trasparente e prevenzione totale delle riserve.'
    },
    qualita: {
      title: 'Qualità Esecutiva & CAM',
      badge: 'Conformità Assoluta',
      desc: 'Verifica della posa in opera, collaudi in corso d\'opera e certificazione dei materiali conformi ai requisiti di progetto.'
    }
  };

  return (
    <div ref={containerRef} className="bg-white/80 p-6 rounded-lg border border-navy/10 shadow-xs flex flex-col items-center justify-center">
      {/* Triangle SVG Container */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Animated Compass / Radar Ring Background */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 border border-navy/10 rounded-full pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-10 border border-gold/40 rounded-full pointer-events-none"
        />

        <svg viewBox="0 0 280 260" className="w-full h-full overflow-visible drop-shadow-sm">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B2A4A" />
              <stop offset="50%" stopColor="#F5C400" />
              <stop offset="100%" stopColor="#1B2A4A" />
            </linearGradient>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B2A4A" />
              <stop offset="100%" stopColor="#1B2A4A" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {/* Triangle Path */}
          {/* Top: (140, 45) | Bottom Left: (50, 205) | Bottom Right: (230, 205) | Center: (140, 152) */}
          <motion.polygon
            points="140,45 230,205 50,205"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            fill="rgba(27, 42, 74, 0.03)"
            stroke="#1B2A4A"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Internal Connectors to Center */}
          <motion.line
            x1="140"
            y1="45"
            x2="140"
            y2="152"
            stroke={activeVertex === 'tempi' ? '#F5C400' : '#1B2A4A'}
            strokeWidth={activeVertex === 'tempi' ? 2.5 : 1.2}
            className="transition-colors"
          />
          <motion.line
            x1="50"
            y1="205"
            x2="140"
            y2="152"
            stroke={activeVertex === 'costi' ? '#F5C400' : '#1B2A4A'}
            strokeWidth={activeVertex === 'costi' ? 2.5 : 1.2}
            className="transition-colors"
          />
          <motion.line
            x1="230"
            y1="205"
            x2="140"
            y2="152"
            stroke={activeVertex === 'qualita' ? '#F5C400' : '#1B2A4A'}
            strokeWidth={activeVertex === 'qualita' ? 2.5 : 1.2}
            className="transition-colors"
          />

          {/* Traveling Pulse Along Triangle Edge */}
          <motion.circle
            r="3.5"
            fill="#F5C400"
            animate={{
              cx: [140, 230, 50, 140],
              cy: [45, 205, 205, 45]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          {/* Vertex 1: TEMPI (Top) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveVertex('tempi')}
            onMouseLeave={() => setActiveVertex(null)}
          >
            <circle
              cx="140"
              cy="45"
              r={activeVertex === 'tempi' ? 14 : 10}
              fill={activeVertex === 'tempi' ? '#F5C400' : '#FFFFFF'}
              stroke={activeVertex === 'tempi' ? '#1B2A4A' : '#F5C400'}
              strokeWidth="2.5"
              className="transition-all duration-200"
            />
            <text x="140" y="24" textAnchor="middle" className="text-[11px] font-bold fill-navy uppercase tracking-wider">
              TEMPI
            </text>
          </g>

          {/* Vertex 2: COSTI (Bottom Left) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveVertex('costi')}
            onMouseLeave={() => setActiveVertex(null)}
          >
            <circle
              cx="50"
              cy="205"
              r={activeVertex === 'costi' ? 14 : 10}
              fill={activeVertex === 'costi' ? '#F5C400' : '#FFFFFF'}
              stroke={activeVertex === 'costi' ? '#1B2A4A' : '#F5C400'}
              strokeWidth="2.5"
              className="transition-all duration-200"
            />
            <text x="45" y="230" textAnchor="middle" className="text-[11px] font-bold fill-navy uppercase tracking-wider">
              COSTI
            </text>
          </g>

          {/* Vertex 3: QUALITÀ (Bottom Right) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveVertex('qualita')}
            onMouseLeave={() => setActiveVertex(null)}
          >
            <circle
              cx="230"
              cy="205"
              r={activeVertex === 'qualita' ? 14 : 10}
              fill={activeVertex === 'qualita' ? '#F5C400' : '#FFFFFF'}
              stroke={activeVertex === 'qualita' ? '#1B2A4A' : '#F5C400'}
              strokeWidth="2.5"
              className="transition-all duration-200"
            />
            <text x="235" y="230" textAnchor="middle" className="text-[11px] font-bold fill-navy uppercase tracking-wider">
              QUALITÀ
            </text>
          </g>

          {/* Central Hub: DIREZIONE LAVORI */}
          <motion.circle
            cx="140"
            cy="152"
            r="28"
            fill="url(#centerGlow)"
            stroke="#F5C400"
            strokeWidth="2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <text x="140" y="148" textAnchor="middle" className="text-[7.5px] font-bold fill-white uppercase tracking-tight pointer-events-none">
            DIREZIONE
          </text>
          <text x="140" y="159" textAnchor="middle" className="text-[7.5px] font-bold fill-gold uppercase tracking-tight pointer-events-none">
            LAVORI
          </text>
        </svg>
      </div>

      {/* Dynamic Detail Card Below SVG */}
      <div className="w-full mt-3 min-h-[68px]">
        {activeVertex ? (
          <div className="p-2.5 rounded bg-navy/5 border border-gold/40 text-left transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-navy uppercase">{vertexDetails[activeVertex].title}</span>
              <span className="text-[10px] text-gold font-bold">{vertexDetails[activeVertex].badge}</span>
            </div>
            <p className="text-[11px] text-navy/70 leading-snug">{vertexDetails[activeVertex].desc}</p>
          </div>
        ) : (
          <div className="p-2.5 rounded bg-transparent border border-dashed border-navy/15 text-center text-navy/50 text-[11px]">
            Passa il cursore sui vertici (Tempi, Costi, Qualità) per esplorare i controlli MBA.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGINA PRINCIPALE PROGETTAZIONE ──────────────────────────────────────────
export default function Progettazione() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white">

      {/* ── 1. HERO CON SFUMATURA IDENTICA AL MOCKUP ── */}
      <section className="relative min-h-[58vh] sm:min-h-[65vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img
            src="/media/header_3.jpg"
            className="w-full h-full object-cover grayscale opacity-35"
            alt="Progettazione MBA Progetti"
          />
          {/* Overlay sfumato che transiziona morbidamente verso il bianco */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/50 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-[0.45em] mb-4 block drop-shadow-sm">
              INGEGNERIA & ARCHITETTURA
            </span>
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight mb-4 drop-shadow-md">
              PROGETTAZIONE
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              Dal concept architettonico all'esecutivo cantierabile. Sviluppiamo opere complesse, sostenibili e conformi ai requisiti CAM ed OEPV.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SEZIONE 1: EDIFICI PENSATI PER ESSERE COSTRUITI ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto">
        {/* Header Sezione */}
        <div className="mb-8">
          <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3 py-1 inline-block mb-3 rounded-xs">
            EDILIZIA E ARCHITETTURA
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            EDIFICI PENSATI PER ESSERE COSTRUITI
          </h2>
        </div>

        {/* 2-Column Grid: Text & Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Description Column (Testo esatto dal mockup) */}
          <div className="lg:col-span-6 space-y-5 text-navy/80 text-[13px] sm:text-[14px] leading-relaxed font-normal">
            <p>
              Affianchiamo <strong className="text-navy font-bold">committenti pubblici e privati</strong> nella progettazione di edifici, spazi e interventi di recupero. Le esigenze d’uso, le risorse disponibili e le caratteristiche del luogo guidano scelte architettoniche e costruttive orientate alla <strong className="text-navy font-bold">sostenibilità ambientale</strong>, all’<strong className="text-navy font-bold">efficienza energetica</strong> e alla qualità degli spazi.
            </p>
            <p>
              I <strong className="text-navy font-bold">Criteri Ambientali Minimi (CAM)</strong> orientano la scelta dei materiali e delle soluzioni costruttive, insieme alla valutazione dei consumi energetici, della durabilità e delle esigenze di manutenzione. Ne derivano <strong className="text-navy font-bold">progetti realizzabili</strong>, <strong className="text-navy font-bold">coerenti con il budget</strong> e pensati per contenere i costi di gestione nel tempo.
            </p>
          </div>

          {/* Right Column: Animated Venn Diagram */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <AnimatedVennDiagram />
          </div>
        </div>

        {/* Horizontal Strip con i 6 Punti Chiave identici al Mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-navy/10 border-y border-navy/15 my-10 py-5 bg-white">
          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 group">
            <HouseLine size={24} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-bold text-navy uppercase tracking-wider leading-tight">
              QUALITÀ<br />ARCHITETTONICA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 group">
            <FileText size={24} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-bold text-navy uppercase tracking-wider leading-tight">
              CAM
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 group">
            <Lightning size={24} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-bold text-navy uppercase tracking-wider leading-tight">
              EFFICIENZA ENERGETICA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 group">
            <Wheelchair size={24} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-bold text-navy uppercase tracking-wider leading-tight">
              ACCESSIBILITÀ
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 group">
            <ArrowsClockwise size={24} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-bold text-navy uppercase tracking-wider leading-tight">
              CICLO DI VITA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-3 group">
            <Leaf size={24} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[10px] sm:text-[11px] font-bold text-navy uppercase tracking-wider leading-tight">
              SOSTENIBILITÀ
            </span>
          </div>
        </div>

        {/* Immagine Facciata a piena larghezza (Fedele al Mockup: p04_1.webp) */}
        <div className="relative rounded-lg overflow-hidden border border-navy/10 shadow-sm group bg-[#F7F5F0]">
          <img
            src="/media/portfolio/p04_1.webp"
            alt="Edilizia Pensata per Essere Costruita - Prospetto Esecutivo"
            className="w-full h-auto max-h-[460px] object-contain sm:object-cover mx-auto group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </section>

      {/* ── 3. SEZIONE 2: OPERE PUBBLICHE CHE DURANO NEL TEMPO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        {/* Header Sezione */}
        <div className="mb-8">
          <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3 py-1 inline-block mb-3 rounded-xs">
            OPERE PUBBLICHE E INFRASTRUTTURE
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            OPERE PUBBLICHE CHE DURANO NEL TEMPO
          </h2>
        </div>

        {/* 2-Column Grid: Image a Sinistra (p10_1.webp Parco), Testo a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Column: Park Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-navy/10 shadow-sm group h-64 sm:h-80 md:h-[360px]">
              <img
                src="/media/portfolio/p10_1.webp"
                alt="Riqualificazione Parchi e Spazi Pubblici"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="lg:col-span-6 space-y-4 text-navy/80 text-sm sm:text-base font-light leading-relaxed">
            <p>
              Progettiamo infrastrutture viarie, piazze, parchi urbani e spazi di aggregazione pubblica con criteri di <strong className="text-navy font-semibold">durabilità, accessibilità universale</strong> e minimo impatto ambientale.
            </p>
            <p>
              Ogni intervento è pensato per integrarsi armoniosamente nel contesto urbano e paesaggistico, riducendo i costi di manutenzione futura attraverso l'impiego di materiali certificati e tecniche costruttive all'avanguardia.
            </p>
            <p className="text-navy/70 text-xs sm:text-sm border-l-2 border-gold pl-4 py-1">
              Dallo studio dell'invarianza idraulica alla valorizzazione della biodiversità autoctona, rispondiamo alle esigenze delle amministrazioni pubbliche con progetti cantierabili e duraturi.
            </p>
          </div>
        </div>

        {/* Horizontal Strip con 6 Servizi / Caratteristiche con Icone */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-navy/10 border-y border-navy/15 py-3 bg-bg-neutral/20 rounded-sm">
          <div className="flex flex-col items-center text-center p-3">
            <Tree size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Parchi Urbani</span>
            <span className="text-[10px] text-navy/60 font-light">Verde attrezzato</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <Compass size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Mobilità Dolce</span>
            <span className="text-[10px] text-navy/60 font-light">Piste ciclabili & percorsi</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <Buildings size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Rigenerazione</span>
            <span className="text-[10px] text-navy/60 font-light">Piazze & centri storici</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <Wrench size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Sottoservizi</span>
            <span className="text-[10px] text-navy/60 font-light">Reti & infrastrutture</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <Drop size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Drenaggio CAM</span>
            <span className="text-[10px] text-navy/60 font-light">Invarianza idraulica</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <ShieldCheck size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Accessibilità</span>
            <span className="text-[10px] text-navy/60 font-light">Abbattimento barriere</span>
          </div>
        </div>
      </section>

      {/* ── 4. SEZIONE 3: DALLA GARA AL PROGETTO ESECUTIVO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        {/* Header Sezione */}
        <div className="mb-8">
          <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3 py-1 inline-block mb-3 rounded-[2px]">
            POST AGGIUDICAZIONE
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            DALLA GARA AL PROGETTO ESECUTIVO
          </h2>
          <p className="text-navy/80 text-[13px] sm:text-[14px] leading-relaxed max-w-4xl mt-3 font-normal">
            Dopo l’aggiudicazione le migliorie offerte in gara devono diventare progetto. Lo studio sviluppa l’esecutivo in coerenza con l’offerta tecnica e con i requisiti di sostenibilità del capitolato: <strong className="text-navy font-bold">chi ha scritto le migliorie è anche chi le traduce in elaborati</strong>, senza perdite di informazione tra gara e cantiere.
          </p>
        </div>

        {/* Stepper Interattivo Animato */}
        <AnimatedProcessStepper />
      </section>

      {/* ── 5. SEZIONE 4: SPAZI INTERNI PROGETTATI INTORNO A CHI LI VIVE ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        {/* Header Sezione */}
        <div className="mb-8">
          <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3 py-1 inline-block mb-3 rounded-xs">
            INTERIOR DESIGN & FIT-OUT
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            SPAZI INTERNI PROGETTATI INTORNO A CHI LI VIVE
          </h2>
        </div>

        {/* 2-Column Grid: Testo a Sinistra, Visual a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Column: Description */}
          <div className="lg:col-span-6 space-y-4 text-navy/80 text-sm sm:text-base font-light leading-relaxed">
            <p>
              Dallo studio dei flussi alla scelta dei materiali, illuminotecnica e arredi su misura. Creiamo ambienti di lavoro, residenziali e collettivi dove <strong className="text-navy font-semibold">estetica, acustica e benessere termoigrometrico</strong> si fondono in un'esperienza coerente e funzionale.
            </p>
            <p>
              Curiamo ogni dettaglio costruttivo per garantire un'esecuzione rapida e senza imprevisti in cantiere, con particolare attenzione all'efficienza energetica, all'isolamento acustico e all'impiego di materiali conformi ai requisiti CAM.
            </p>
            <div className="p-4 bg-bg-neutral/60 rounded border-l-2 border-gold space-y-1">
              <span className="text-xs font-bold text-navy uppercase block">Space Planning & Layout Esecutivo</span>
              <p className="text-xs text-navy/70 leading-relaxed">
                Modellazione tridimensionale degli interni con integrazione di canalizzazioni impiantistiche a scomparsa e dettagli di falegnameria su misura.
              </p>
            </div>
          </div>

          {/* Right Column: Interior Visual Card (p01_1.webp) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-navy/10 shadow-sm group h-64 sm:h-80 md:h-[360px] bg-bg-neutral/40 flex items-center justify-center">
              <img
                src="/media/portfolio/p01_1.webp"
                alt="Spazi Interni e Interior Design Architettonico"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Strip con 6 Servizi di Interior Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-navy/10 border-y border-navy/15 py-3 bg-bg-neutral/20 rounded-sm">
          <div className="flex flex-col items-center text-center p-3">
            <SlidersHorizontal size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Space Planning</span>
            <span className="text-[10px] text-navy/60 font-light">Flussi ed ergonomia</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <SpeakerHigh size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Comfort Acustico</span>
            <span className="text-[10px] text-navy/60 font-light">Fonoassorbenza attiva</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <SunDim size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Light Design</span>
            <span className="text-[10px] text-navy/60 font-light">Luce naturale & LED</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <ShieldCheck size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Materiali CAM</span>
            <span className="text-[10px] text-navy/60 font-light">Certificati VOC-free</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <Armchair size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Arredo Custom</span>
            <span className="text-[10px] text-navy/60 font-light">Dettagli su misura</span>
          </div>
          <div className="flex flex-col items-center text-center p-3">
            <CheckCircle size={24} className="text-gold mb-1.5" />
            <span className="text-xs font-bold text-navy uppercase tracking-tight">Direzione Fit-Out</span>
            <span className="text-[10px] text-navy/60 font-light">Posa a regola d'arte</span>
          </div>
        </div>
      </section>

      {/* ── 6. SEZIONE 5: IL PROGETTO REALIZZATO COME PREVISTO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        {/* Header Sezione */}
        <div className="mb-8">
          <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3 py-1 inline-block mb-3 rounded-xs">
            DIREZIONE LAVORI & CONTROLLO
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            IL PROGETTO REALIZZATO COME PREVISTO
          </h2>
        </div>

        {/* 2-Column Grid: Triangolo di Ferro a Sinistra, Testo a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Column: Animated Iron Triangle */}
          <div className="lg:col-span-6">
            <AnimatedIronTriangle />
          </div>

          {/* Right Column: Description & Metric Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-navy/80 text-sm sm:text-base font-light leading-relaxed">
              <p>
                La nostra direzione lavori assicura che ciò che è stato disegnato, computato e approvato <strong className="text-navy font-semibold">coincida esattamente con l'opera finita</strong>.
              </p>
              <p>
                Presenza costante sul campo, rigore tecnico nei collaudi e contabilità trasparente tutelano committente ed impresa da contenziosi, ritardi di cronoprogramma ed aggravi economici imprevisti.
              </p>
            </div>

            {/* 3 Stat Highlight Blocks */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-bg-neutral/60 rounded border-t-2 border-gold text-center">
                <span className="text-navy font-bold text-xl sm:text-2xl block font-heading">100%</span>
                <span className="text-[10px] text-navy/70 uppercase tracking-tight block mt-0.5">Cronoprogramma</span>
              </div>
              <div className="p-3.5 bg-bg-neutral/60 rounded border-t-2 border-gold text-center">
                <span className="text-navy font-bold text-xl sm:text-2xl block font-heading">0%</span>
                <span className="text-[10px] text-navy/70 uppercase tracking-tight block mt-0.5">Scostamento Budget</span>
              </div>
              <div className="p-3.5 bg-bg-neutral/60 rounded border-t-2 border-gold text-center">
                <span className="text-navy font-bold text-xl sm:text-2xl block font-heading">LOD 400</span>
                <span className="text-[10px] text-navy/70 uppercase tracking-tight block mt-0.5">Controllo Cantiere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SEZIONE 6: CTA BANNER (HAI UN PROGETTO DA SVILUPPARE?) ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="border-l-4 border-gold bg-bg-neutral/50 p-6 sm:p-10 rounded-r-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] block">
              CONTATTI & CONSULENZA
            </span>
            <h3 className="text-navy text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight">
              HAI UN PROGETTO DA SVILUPPARE?
            </h3>
            <p className="text-navy/70 text-xs sm:text-sm font-light max-w-xl">
              Richiedi una consulenza preliminare per scoprire come possiamo ingegnerizzare la tua opera garantendo tempi, costi e qualità esecutiva.
            </p>
          </div>

          <Link
            to="/contatti"
            className="flex-shrink-0 bg-navy hover:bg-navy/90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded transition-all flex items-center gap-2 group shadow-sm hover:shadow"
          >
            <span>PARLA CON NOI</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
