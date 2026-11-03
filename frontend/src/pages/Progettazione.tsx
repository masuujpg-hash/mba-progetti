import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HouseLine,
  Lightning,
  Wheelchair,
  ArrowsClockwise,
  Leaf,
  CaretRight,
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
          <span className="text-[10px] sm:text-[11.5px] font-bold text-[#F5C400] uppercase tracking-[0.16em] mt-2.5 text-center px-2 font-outfit">
            APPALTO INTEGRATO: PROGETTAZIONE DAL PFTE ALL'ESECUTIVO
          </span>
        </div>
      </div>

      {/* Bottom Subtitle */}
      <p className="text-center text-xs sm:text-[13px] font-bold text-navy uppercase tracking-[0.2em] mt-8 pt-2 font-outfit">
        UN SOLO GRUPPO DI LAVORO DALLA GARA AL CANTIERE
      </p>
    </div>
  );
}

// ─── GRAFICO ANIMATO 3: TRIANGOLO DI FERRO DEL PROJECT MANAGEMENT ────────────
function AnimatedIronTriangle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [hoveredNode, setHoveredNode] = useState<'committente' | 'uffici' | 'impresa' | 'center' | null>(null);

  // Geometria conforme al mockup:
  // Vertici: Committente (in alto), Uffici Tecnici (in basso a sinistra), Impresa (in basso a destra)
  const topX = 140, topY = 48;
  const leftX = 52, leftY = 196;
  const rightX = 228, rightY = 196;
  const centerX = 140, centerY = 148;

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-4">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        <svg viewBox="0 0 280 250" className="w-full h-full overflow-visible">
          {/* Triangolo esterno tratteggiato che unisce i tre vertici */}
          <motion.polygon
            points={`${topX},${topY} ${rightX},${rightY} ${leftX},${leftY}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* Linee continue dorate dal centro ai 3 nodi */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={topX}
            y2={topY}
            stroke="#C5A038"
            strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={leftX}
            y2={leftY}
            stroke="#C5A038"
            strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={rightX}
            y2={rightY}
            stroke="#C5A038"
            strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Vertice 1: COMMITTENTE (In Alto) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode('committente')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={topX}
              cy={topY}
              r={12}
              fill="#FFFFFF"
              stroke="#1B2A4A"
              strokeWidth="2"
              className="transition-transform duration-200"
            />
            <text
              x={topX}
              y={topY - 20}
              textAnchor="middle"
              className="text-[10px] font-bold fill-navy uppercase tracking-[0.16em] font-outfit"
            >
              COMMITTENTE
            </text>
          </g>

          {/* Vertice 2: UFFICI TECNICI (In Basso a Sinistra) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode('uffici')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={leftX}
              cy={leftY}
              r={12}
              fill="#FFFFFF"
              stroke="#1B2A4A"
              strokeWidth="2"
              className="transition-transform duration-200"
            />
            <text
              x={leftX}
              y={leftY + 28}
              textAnchor="middle"
              className="text-[10px] font-bold fill-navy uppercase tracking-[0.16em] font-outfit"
            >
              UFFICI TECNICI
            </text>
          </g>

          {/* Vertice 3: IMPRESA (In Basso a Destra) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode('impresa')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={rightX}
              cy={rightY}
              r={12}
              fill="#FFFFFF"
              stroke="#1B2A4A"
              strokeWidth="2"
              className="transition-transform duration-200"
            />
            <text
              x={rightX}
              y={rightY + 28}
              textAnchor="middle"
              className="text-[10px] font-bold fill-navy uppercase tracking-[0.16em] font-outfit"
            >
              IMPRESA
            </text>
          </g>

          {/* Hub Centrale: DIREZIONE LAVORI (Cerchio Navy con Testo Bianco) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode('center')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={centerX}
              cy={centerY}
              r={36}
              fill="#1B2A4A"
              stroke="#1B2A4A"
              className={`transition-all duration-200 ${
                hoveredNode === 'center' ? 'filter drop-shadow-md' : ''
              }`}
            />
            <text
              x={centerX}
              y={centerY - 4}
              textAnchor="middle"
              className="text-[9px] font-bold fill-white uppercase tracking-[0.12em] font-outfit pointer-events-none"
            >
              DIREZIONE
            </text>
            <text
              x={centerX}
              y={centerY + 9}
              textAnchor="middle"
              className="text-[9px] font-bold fill-white uppercase tracking-[0.12em] font-outfit pointer-events-none"
            >
              LAVORI
            </text>
          </g>
        </svg>
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
        <div className="mb-6">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            EDILIZIA E ARCHITETTURA
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            EDIFICI PENSATI PER ESSERE COSTRUITI
          </h2>
        </div>

        {/* 2-Column Grid: Text & Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Description Column (Testo esatto dal mockup) */}
          <div className="lg:col-span-6 space-y-5 text-navy/85 text-[15px] sm:text-[17px] leading-relaxed font-normal font-outfit">
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
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <HouseLine size={26} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              QUALITÀ<br />ARCHITETTONICA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M9 15l2 2 4-4" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              CAM
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <Lightning size={26} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              EFFICIENZA ENERGETICA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <Wheelchair size={26} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              ACCESSIBILITÀ
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <ArrowsClockwise size={26} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              CICLO DI VITA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <Leaf size={26} weight="regular" className="text-navy mb-2 group-hover:text-gold transition-colors" />
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
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
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            INFRASTRUTTURE E SPAZI PUBBLICI
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            OPERE PUBBLICHE CHE DURANO NEL TEMPO
          </h2>
        </div>

        {/* 2-Column Grid: Image a Sinistra (p10_1.webp Parco), Testo a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Park Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group">
              <img
                src="/media/portfolio/p10_1.webp"
                alt="Progettazione Spazi Pubblici e Percorsi Parco"
                className="w-full h-auto max-h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Text esatto da mockup */}
          <div className="lg:col-span-6 space-y-5 text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed font-outfit">
            <p>
              Progettiamo strade, aree urbane, percorsi pedonali, parcheggi e illuminazione pubblica considerando <strong className="text-navy font-bold">come le persone attraversano e vivono questi spazi</strong>. Continuità dei percorsi, accessibilità, sicurezza e qualità della luce guidano il disegno insieme alle esigenze di mobilità e gestione dell’area.
            </p>
            <p>
              Applichiamo i <strong className="text-navy font-bold">Criteri Ambientali Minimi</strong> pertinenti e valutiamo materiali, consumi energetici e manutenzione lungo il <strong className="text-navy font-bold">ciclo di vita dell’opera</strong>. Le scelte tecniche contribuiscono così a realizzare spazi pubblici <strong className="text-navy font-bold">più fruibili, durevoli e meno onerosi da gestire</strong>.
            </p>
          </div>
        </div>

        {/* Horizontal Strip con le 6 Categorie conformi al mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-navy/10 border-y border-navy/15 my-8 py-5 bg-white">
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22L8 2M20 22L16 2" />
              <line x1="12" y1="4" x2="12" y2="7" />
              <line x1="12" y1="11" x2="12" y2="14" />
              <line x1="12" y1="18" x2="12" y2="21" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              STRADE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="10" width="7" height="12" />
              <rect x="14" y="4" width="7" height="18" />
              <path d="M6 13h1M6 16h1M6 19h1M17 7h1M17 10h1M17 13h1M17 16h1M17 19h1" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              AREE URBANE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="4" r="2" />
              <path d="M12 6v6m0 0l-3 4m3-4l3 4m-3-6l-3-2m3 2l3-2" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              PERCORSI PEDONALI
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="1.5" />
              <path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              PARCHEGGI
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 22V7a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1" />
              <line x1="14" y1="10" x2="16" y2="10" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              ILLUMINAZIONE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="5" />
              <line x1="12" y1="13" x2="12" y2="21" />
              <line x1="9" y1="21" x2="15" y2="21" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              VERDE PUBBLICO
            </span>
          </div>
        </div>
      </section>

      {/* ── 4. SEZIONE 3: DALLA GARA AL PROGETTO ESECUTIVO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        {/* Header Sezione */}
        <div className="mb-10">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            POST AGGIUDICAZIONE
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading mb-6">
            DALLA GARA AL PROGETTO ESECUTIVO
          </h2>
          <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-4xl font-outfit">
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
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            INTERIOR DESIGN
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            SPAZI INTERNI PROGETTATI INTORNO A CHI LI VIVE
          </h2>
        </div>

        {/* 2-Column Grid: Testo a Sinistra, Visual a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Description */}
          <div className="lg:col-span-6 space-y-5 text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed font-outfit">
            <p>
              Progettiamo la ristrutturazione di <strong className="text-navy font-bold">abitazioni, attività commerciali e spazi per enti pubblici</strong>. Partiamo dall’uso degli ambienti e dalle esigenze di chi li abita, vi lavora o li frequenta; definiamo quindi distribuzione, materiali, arredi e illuminazione in un <strong className="text-navy font-bold">progetto coordinato</strong>, attento anche agli impianti e ai dettagli esecutivi.
            </p>
            <p>
              Ogni scelta considera accessibilità, <strong className="text-navy font-bold">benessere indoor</strong>, durabilità e sostenibilità ambientale. Ne derivano ambienti riconoscibili e funzionali, <strong className="text-navy font-bold">coerenti con il budget</strong> e con le esigenze di gestione nel tempo.
            </p>
          </div>

          {/* Right Column: Interior / Building Visual Card (17_museo_emozionale_isernia.jpg) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group">
              <img
                src="/media/portfolio/17_museo_emozionale_isernia.jpg"
                alt="Auditorium Spazi ed Edifici Interni"
                className="w-full h-auto max-h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Strip con le 6 Categorie conformi al mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-navy/10 border-y border-navy/15 my-8 py-5 bg-white">
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="9" y1="12" x2="21" y2="12" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              DISTRIBUZIONE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="0.5" />
              <rect x="14" y="3" width="7" height="7" rx="0.5" />
              <rect x="3" y="14" width="7" height="7" rx="0.5" />
              <rect x="14" y="14" width="7" height="7" rx="0.5" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              MATERIALI
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" />
              <rect x="2" y="11" width="20" height="7" rx="1.5" />
              <line x1="5" y1="18" x2="5" y2="21" />
              <line x1="19" y1="18" x2="19" y2="21" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              ARREDI
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l2-6h8l2 6H6z" />
              <line x1="12" y1="9" x2="12" y2="21" />
              <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              ILLUMINAZIONE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="14" y2="10" strokeWidth="1.8" />
              <line x1="11" y1="7" x2="17" y2="13" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              FINITURE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-navy mb-2 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 3v4M17 3v4" />
              <rect x="5" y="7" width="14" height="8" rx="2" />
              <path d="M12 15v6" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              IMPIANTI
            </span>
          </div>
        </div>
      </section>

      {/* ── 6. SEZIONE 5: IL PROGETTO REALIZZATO COME PREVISTO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        {/* Header Sezione */}
        <div className="mb-8">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            DIREZIONE LAVORI
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            IL PROGETTO REALIZZATO COME PREVISTO
          </h2>
        </div>

        {/* 2-Column Grid: Diagramma Committente/Uffici/Impresa a Sinistra, Testo e Metriche a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          {/* Left Column: Animated Direzione Lavori Diagram */}
          <div className="lg:col-span-6 flex justify-center">
            <AnimatedIronTriangle />
          </div>

          {/* Right Column: Description & Metric Columns conformi al mockup */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed font-outfit">
              <p>
                La direzione lavori è svolta con la <strong className="text-navy font-bold">conoscenza diretta dei processi costruttivi</strong>, per rispettare tempi, costi e qualità esecutiva.
              </p>
              <p>
                Il confronto costante tra committente, impresa e uffici tecnici fa sì che ogni scelta di progetto venga <strong className="text-navy font-bold">realizzata in cantiere come previsto</strong>.
              </p>
            </div>

            {/* 3 Metric Columns: TEMPI, COSTI, QUALITÀ */}
            <div className="border-t border-navy/10 pt-6 mt-8">
              <div className="grid grid-cols-3 divide-x divide-navy/10">
                <div className="pr-4">
                  <span className="text-gold text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] block mb-1 font-outfit">
                    TEMPI
                  </span>
                  <p className="text-[11.5px] sm:text-xs text-navy/75 leading-snug font-normal font-outfit">
                    cronoprogramma verificato
                  </p>
                </div>
                <div className="px-4">
                  <span className="text-gold text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] block mb-1 font-outfit">
                    COSTI
                  </span>
                  <p className="text-[11.5px] sm:text-xs text-navy/75 leading-snug font-normal font-outfit">
                    contabilità e varianti
                  </p>
                </div>
                <div className="pl-4">
                  <span className="text-gold text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] block mb-1 font-outfit">
                    QUALITÀ
                  </span>
                  <p className="text-[11.5px] sm:text-xs text-navy/75 leading-snug font-normal font-outfit">
                    controllo delle lavorazioni
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SEZIONE 6: CTA BANNER (HAI UN PROGETTO DA SVILUPPARE?) ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            CONTATTI
          </span>
        </div>
        <div className="border-l-4 border-gold bg-[#f8f9fb] p-6 sm:p-10 rounded-[1px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5">
            <h3 className="text-navy text-xl sm:text-2xl md:text-[26px] font-extrabold uppercase tracking-tight font-heading">
              HAI UN PROGETTO DA SVILUPPARE?
            </h3>
            <p className="text-navy/75 text-sm sm:text-[15px] font-normal font-outfit">
              Raccontaci l'intervento: ti rispondiamo entro 24 ore.
            </p>
          </div>

          <Link
            to="/contatti"
            className="flex-shrink-0 bg-[#1B2A4A] hover:bg-navy/90 text-white text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] px-8 py-3.5 rounded-[1px] transition-all flex items-center gap-3 group shadow-xs font-outfit"
          >
            <span>CONTATTACI</span>
            <CaretRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
