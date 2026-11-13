import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText,
  CaretLeft,
  CaretRight,
  MapPin,
  MagnifyingGlass,
  ShieldCheck,
  Stack,
  ChartLineUp,
  Lightbulb,
  PencilSimple,
  UploadSimple
} from '@phosphor-icons/react';
import GareContactForm from '../components/GareContactForm';

// ─── COMPONENTE STAT COUNTER ────────────────────────────────────────────────
function StatCounter({ value, label }: { value: string; label: string }) {
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

      const steps = 60;
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
    <div ref={ref} className="py-5 sm:py-6 border-b border-[#dfe3ea] last:border-b-0 first:pt-0">
      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr] items-center gap-4">
        <span className="text-[#1b2a4a] text-[clamp(32px,3.4vw,48px)] font-semibold tracking-[-0.03em] tabular-nums leading-none">
          {prefix}{isInView ? count : 0}{suffix}
        </span>
        <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── COMPONENTE GRAFICO A CIAMBELLA ANIMATO ──────────────────────────────────
interface DonutSegment {
  label: string;
  value: number; // percentage (0-100)
  color: string;
  textColor?: string;
}

interface LegendItem {
  label: string;
  color: string;
}

interface AnimatedDonutChartProps {
  prefixTitle: string;
  highlightTitle: string;
  centerIcon: ReactNode;
  segments: DonutSegment[];
  legendCol1: LegendItem[];
  legendCol2: LegendItem[];
}

function AnimatedDonutChart({
  prefixTitle,
  highlightTitle,
  centerIcon,
  segments,
  legendCol1,
  legendCol2
}: AnimatedDonutChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Geometria SVG Donut maggiorata
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 88;
  const strokeWidth = 46;
  const circumference = 2 * Math.PI * radius;

  // Calcolo segmenti cumulativi partendo da -90deg (12:00 in alto)
  let accumulatedPercent = 0;
  const segmentData = segments.map((seg) => {
    const startAngle = (accumulatedPercent / 100) * 360 - 90;
    const arcLength = (seg.value / 100) * circumference;
    const gap = 2.5; // pixel gap tra le fette
    const dashLength = Math.max(0, arcLength - gap);

    // Angolo medio per etichetta percentuale
    const midAngle = startAngle + (seg.value / 100) * 180;
    const rad = (midAngle * Math.PI) / 180;
    const textRadius = radius;
    const labelX = cx + textRadius * Math.cos(rad);
    const labelY = cy + textRadius * Math.sin(rad);

    accumulatedPercent += seg.value;

    return {
      ...seg,
      startAngle,
      dashLength,
      labelX,
      labelY
    };
  });

  return (
    <div ref={containerRef} className="flex flex-col items-center group w-full max-w-[340px]">
      {/* Container SVG maggiorato con animazioni */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[300px] lg:h-[300px] mb-3 flex items-center justify-center">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${size} ${size}`} 
          className="transform rotate-0 filter drop-shadow-xs overflow-visible"
        >
          {/* Cerchio di fondo bianco / neutro sottilissimo */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#F1F3F5"
            strokeWidth={strokeWidth}
          />

          {/* Segmenti della ciambella */}
          {segmentData.map((seg, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g 
                key={idx} 
                onMouseEnter={() => setHoveredIdx(idx)} 
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={`${seg.dashLength} ${circumference - seg.dashLength}`}
                  transform={`rotate(${seg.startAngle} ${cx} ${cy})`}
                  strokeLinecap="butt"
                  initial={{ strokeDashoffset: circumference, opacity: 0.2 }}
                  animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: circumference, opacity: 0.2 }}
                  transition={{
                    duration: 1.2,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 4px 12px rgba(27,42,74,0.25))' : 'none'
                  }}
                />

                {/* Etichetta % all'interno della fetta */}
                <motion.text
                  x={seg.labelX}
                  y={seg.labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={seg.textColor || (seg.value <= 10 ? '#1B2A4A' : '#FFFFFF')}
                  fontSize={seg.value <= 5 ? "10.5" : "12.5"}
                  fontWeight="700"
                  className="pointer-events-none select-none"
                  style={{ fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                >
                  {seg.value}%
                </motion.text>
              </g>
            );
          })}

          {/* Cerchio centrale bianco (foro della ciambella) */}
          <circle
            cx={cx}
            cy={cy}
            r={radius - strokeWidth / 2 - 1}
            fill="#FFFFFF"
          />
        </svg>

        {/* Icona circolare al centro della ciambella */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-navy/20 flex items-center justify-center bg-white shadow-xs">
            {centerIcon}
          </div>
        </div>
      </div>

      {/* Titolo sotto il grafico */}
      <h3 className="font-outfit text-base sm:text-[17px] font-normal text-navy mt-4 mb-3 text-center">
        {prefixTitle} <span className="text-[#F5C400] font-bold uppercase tracking-wider">{highlightTitle}</span>
      </h3>

      {/* Mini legenda a due colonne */}
      <div className="w-full max-w-[290px] grid grid-cols-2 gap-x-5 gap-y-2.5 text-left font-outfit text-xs font-semibold tracking-wider text-[#1B2A4A]/80">
        <div className="space-y-2">
          {legendCol1.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="uppercase whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {legendCol2.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="uppercase whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGINA PRINCIPALE GARE OEPV ─────────────────────────────────────────────
export default function Gare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlateHovered, setIsPlateHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const methodSectionRef = useRef<HTMLElement | null>(null);
  const isMethodInView = useInView(methodSectionRef, { once: true, amount: 0.25 });
  const hasUserInteractedRef = useRef(false);

  useEffect(() => {
    if (!isMethodInView || hasUserInteractedRef.current) return;

    let step = 0;
    setActiveStep(0);

    const timer = window.setInterval(() => {
      if (hasUserInteractedRef.current) {
        window.clearInterval(timer);
        return;
      }
      step += 1;
      if (step >= 8) {
        window.clearInterval(timer);
        return;
      }
      setActiveStep(step);
    }, 380);

    return () => window.clearInterval(timer);
  }, [isMethodInView]);

  const handleSelectStep = (idx: number) => {
    hasUserInteractedRef.current = true;
    setActiveStep(idx);
  };

  // 8 Fasi di lavoro conformi al mockup
  const processSteps = [
    {
      id: '01',
      tag: 'PRIMA DELLA GARA',
      title: 'Scelta della gara',
      heading: 'SCELTA DELLA GARA',
      icon: MagnifyingGlass,
      desc: "Selezione delle procedure più coerenti con struttura, qualificazioni e referenze dell'impresa."
    },
    {
      id: '02',
      tag: 'ANALISI',
      title: 'Analisi del disciplinare',
      heading: 'ANALISI DEL DISCIPLINARE',
      icon: FileText,
      desc: "Lettura di ogni criterio e sub-criterio, dei pesi e dei vincoli di formato dell'offerta."
    },
    {
      id: '03',
      tag: 'ANALISI',
      title: 'Sopralluogo',
      heading: 'SOPRALLUOGO',
      icon: MapPin,
      desc: "Verifica dello stato dei luoghi per cogliere criticità e opportunità non evidenti dagli elaborati."
    },
    {
      id: '04',
      tag: 'ANALISI',
      title: 'Studio del progetto',
      heading: 'STUDIO DEL PROGETTO',
      icon: Stack,
      desc: "Analisi critica del progetto a base di gara per individuarne carenze e margini di miglioramento."
    },
    {
      id: '05',
      tag: 'ANALISI',
      title: "Valutazione dell'investimento",
      heading: "VALUTAZIONE DELL'INVESTIMENTO",
      icon: ChartLineUp,
      desc: "Stima dei costi di esecuzione delle migliorie e simulazione dei punteggi tecnici ed economici, per definire il ribasso e decidere con dati alla mano."
    },
    {
      id: '06',
      tag: 'OFFERTA',
      title: 'Definizione delle migliorie',
      heading: 'DEFINIZIONE DELLE MIGLIORIE',
      icon: Lightbulb,
      desc: "Scelta condivisa con l'impresa delle proposte migliorative, valutandone i costi e la rispondenza ai criteri e sub-criteri di valutazione."
    },
    {
      id: '07',
      tag: 'OFFERTA',
      title: "Redazione dell'offerta",
      heading: "REDAZIONE DELL'OFFERTA",
      icon: PencilSimple,
      desc: "Stesura della relazione tecnica e produzione di schemi, tavole e render, per rendere l'offerta immediatamente comprensibile e valutabile dalla commissione."
    },
    {
      id: '08',
      tag: 'OFFERTA',
      title: 'Impaginazione e consegna',
      heading: 'IMPAGINAZIONE E CONSEGNA',
      icon: UploadSimple,
      desc: "Impaginazione nel rispetto dei limiti del disciplinare e consegna all'impresa almeno 48 ore prima della scadenza della procedura."
    }
  ];

  // 10 Ambiti di intervento / Tipologie di opere (5x2 grid)
  const tipologieOpere = [
    {
      title: "EDILIZIA\nSCOLASTICA",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3L3 10v11h18V10L12 3z" />
          <path d="M9 21v-7h6v7" />
        </svg>
      )
    },
    {
      title: "STRUTTURE\nSANITARIE E\nASSISTENZIALI",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    },
    {
      title: "PUBBLICA\nAMMINISTRAZIONE",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3L3 9h18L12 3z" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
          <line x1="3" y1="20" x2="21" y2="20" />
        </svg>
      )
    },
    {
      title: "IMPIANTI\nSPORTIVI",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <circle cx="12" cy="12" r="3" />
          <path d="M2 9h3v6H2M22 9h-3v6h3" />
        </svg>
      )
    },
    {
      title: "EDILIZIA\nRESIDENZIALE\nPUBBLICA",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l6-5 6 5v10H3V11z" />
          <path d="M15 9l5-4 1 0.8v15.2H15" />
        </svg>
      )
    },
    {
      title: "INFRASTRUTTURE\nE VIABILITÀ",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
          <path d="M6 12l2 9h2l-2-9M18 12l-2 9h-2l2-9" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
      )
    },
    {
      title: "MANUTENZIONE E\nRIQUALIFICAZIONE",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17l-4 4" />
          <path d="M7 17l2-2" />
          <path d="M9 15l6-9a2 2 0 012.8 0l1.4 1.4a2 2 0 010 2.8l-9 6" />
        </svg>
      )
    },
    {
      title: "STRUTTURE\nRICETTIVE",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17V8" />
          <path d="M2 14h20" />
          <path d="M22 17v-5" />
          <path d="M5 14v-3a1 1 0 011-1h4a1 1 0 011 1v3" />
        </svg>
      )
    },
    {
      title: "STRUTTURE\nPOLIVALENTI",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21V12a8 8 0 0116 0v9" />
          <path d="M9 21v-5a3 3 0 016 0v5" />
          <line x1="2" y1="21" x2="22" y2="21" />
        </svg>
      )
    },
    {
      title: "EDIFICI STORICI E\nRESTAURO",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M2 9h20" />
          <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
          <path d="M2 18h20M1 21h22" />
        </svg>
      )
    }
  ];

  // Tavole di gara e galleria grafica
  const plates = [
    { 
      img: "/media/portfolio/tavole-02.webp", 
      thumb: "/media/portfolio/tavole-02.webp",
      caption: "Confronto tra base di gara e offerta migliorativa, impianti sportivi"
    },
    { 
      img: "/media/portfolio/tavole-03.webp", 
      thumb: "/media/portfolio/tavole-03.webp",
      caption: "Scheda prestazionale di materiali e finiture"
    },
    { 
      img: "/media/portfolio/tavole-04.webp", 
      thumb: "/media/portfolio/tavole-04.webp",
      caption: "Colore e comfort negli ambienti scolastici"
    },
    { 
      img: "/media/portfolio/tavole-05.webp", 
      thumb: "/media/portfolio/tavole-05.webp",
      caption: "Arredo urbano e sistemazione degli spazi esterni"
    },
    { 
      img: "/media/portfolio/tavole-06.webp", 
      thumb: "/media/portfolio/tavole-06.webp",
      caption: "Proposte migliorative per le aree esterne"
    },
    { 
      img: "/media/portfolio/tavole_Tavola disegno 1.webp", 
      thumb: "/media/portfolio/tavole_Tavola disegno 1.webp",
      caption: "Soluzioni per coperture a verde pensile e finiture per esterni"
    }
  ];

  // Auto-slide per le tavole di gara (si mette in pausa al passaggio del mouse)
  useEffect(() => {
    if (isPlateHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === plates.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlateHovered, plates.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? plates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === plates.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Refs for Mobile
  const plateTouchStartX = useRef<number>(0);
  const plateTouchStartY = useRef<number>(0);

  return (
    <div className="bg-white text-navy selection:bg-navy selection:text-white">
      
      {/* ── 1. HERO ── */}
      <section className="relative h-[44vh] min-h-[320px] sm:h-[52vh] w-full flex items-center justify-center overflow-hidden bg-[#1B2A4A] font-outfit">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/portfolio/03_carabinieri_viterbo.jpg" 
            className="w-full h-full object-cover object-center" 
            alt="MBA Progetti Gare OEV"
          />
          <div className="absolute inset-0 bg-[#1B2A4A]/65" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/75 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white/95 text-xs sm:text-[13px] font-medium uppercase tracking-[0.25em] mb-2.5">
              CORE BUSINESS
            </div>
            <h1 className="text-white text-4xl sm:text-5xl md:text-[56px] font-bold uppercase tracking-[0.04em] leading-[1.05] drop-shadow-sm">
              GARE OEV
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. OFFERTE TECNICHE MIGLIORATIVE & GRAFICI ANIMATI ── */}
      <section className="py-14 sm:py-20 px-6 max-w-7xl mx-auto font-outfit">
        <div className="mb-4">
          <span className="bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase inline-block shadow-2xs">
            IL SETTORE
          </span>
        </div>
        <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase leading-[1.15] mb-5">
          OFFERTE TECNICHE MIGLIORATIVE
        </h2>

        {/* Riga superiore: Descrizione a sinistra + 3 Stats animate a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-14">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] max-w-[62ch]">
              Lo studio MBA affianca le imprese nella redazione di <strong className="font-semibold text-[#1B2A4A]">offerte tecniche migliorative</strong> per gare d’appalto pubbliche aggiudicate secondo il criterio dell’offerta economicamente più vantaggiosa (OEV). Analizziamo disciplinari e progetti posti a base di gara per individuare con precisione i margini di miglioramento tecnico e operativo, sviluppando proposte fondate su metodo, chiarezza e coerenza con i criteri di valutazione, capaci di tradursi in risultati concreti nelle procedure di gara.
            </p>
            <div className="pt-2">
              <Link 
                to="/portfolio"
                className="inline-flex items-center justify-between border border-[#1b2a4a]/25 hover:border-[#F5C400] text-[#1b2a4a] hover:text-[#F5C400] px-[26px] py-[15px] rounded-[2px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors min-w-[240px] group cursor-pointer"
              >
                <span>VEDI LE GARE SEGUITE</span>
                <CaretRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between pt-1 lg:pl-10">
            <StatCounter value="+10" label="ANNI DI ESPERIENZA" />
            <StatCounter value="63%" label="GARE SUL PODIO" />
            <StatCounter value="38%" label="GARE AGGIUDICATE" />
          </div>
        </div>

        {/* ── 3 GRAFICI A CIAMBELLA ANIMATI ── */}
        <div className="pt-12 sm:pt-16 border-t border-navy/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14 justify-items-center">
            
            {/* Grafico 1: Ubicazione */}
            <AnimatedDonutChart
              prefixTitle="gare per"
              highlightTitle="UBICAZIONE"
              centerIcon={<MapPin size={20} weight="regular" className="text-navy" />}
              segments={[
                { label: "CENTRO ITALIA", value: 50, color: "#1B2A4A", textColor: "#FFFFFF" },
                { label: "NORD ITALIA", value: 30, color: "#3B5274", textColor: "#FFFFFF" },
                { label: "SUD E ISOLE", value: 20, color: "#788EA7", textColor: "#FFFFFF" }
              ]}
              legendCol1={[
                { label: "CENTRO ITALIA", color: "#1B2A4A" },
                { label: "SUD E ISOLE", color: "#788EA7" }
              ]}
              legendCol2={[
                { label: "NORD ITALIA", color: "#3B5274" }
              ]}
            />

            {/* Grafico 2: Categorie SOA */}
            <AnimatedDonutChart
              prefixTitle="gare per categorie"
              highlightTitle="SOA"
              centerIcon={<ShieldCheck size={20} weight="regular" className="text-navy" />}
              segments={[
                { label: "OG1", value: 55, color: "#1B2A4A", textColor: "#FFFFFF" },
                { label: "OG2", value: 30, color: "#3B5274", textColor: "#FFFFFF" },
                { label: "OG3", value: 10, color: "#788EA7", textColor: "#FFFFFF" },
                { label: "ALTRE CATEGORIE", value: 5, color: "#BAC7D5", textColor: "#1B2A4A" }
              ]}
              legendCol1={[
                { label: "OG1", color: "#1B2A4A" },
                { label: "OG3", color: "#788EA7" }
              ]}
              legendCol2={[
                { label: "OG2", color: "#3B5274" },
                { label: "ALTRE CATEGORIE", color: "#BAC7D5" }
              ]}
            />

            {/* Grafico 3: Importo */}
            <AnimatedDonutChart
              prefixTitle="gare per"
              highlightTitle="IMPORTO"
              centerIcon={<span className="text-navy font-outfit font-semibold text-base sm:text-lg leading-none">€</span>}
              segments={[
                { label: "1 – 5 MLN", value: 40, color: "#1B2A4A", textColor: "#FFFFFF" },
                { label: "5 – 20 MLN", value: 30, color: "#3B5274", textColor: "#FFFFFF" },
                { label: "€ < 1 MLN", value: 20, color: "#788EA7", textColor: "#FFFFFF" },
                { label: "> 20 MLN", value: 10, color: "#BAC7D5", textColor: "#1B2A4A" }
              ]}
              legendCol1={[
                { label: "1 – 5 MLN", color: "#1B2A4A" },
                { label: "€ < 1 MLN", color: "#788EA7" }
              ]}
              legendCol2={[
                { label: "5 – 20 MLN", color: "#3B5274" },
                { label: "> 20 MLN", color: "#BAC7D5" }
              ]}
            />

          </div>
        </div>
      </section>

      {/* ── 3. OFFERTE CHE SI LEGGONO AL PRIMO SGUARDO ── */}
      <section className="py-14 sm:py-20 bg-bg-neutral/40 border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4">
            <span className="bg-[#F5C400] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block shadow-xs">
              ELABORATI
            </span>
          </div>
          <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-6">
            OFFERTE CHE SI LEGGONO AL PRIMO SGUARDO
          </h2>
          <p className="text-[#3d4a66] text-[16px] font-normal max-w-[62ch] mb-12 leading-[1.7]">
            La commissione esamina molte offerte in tempi stretti. Tavole, schemi e impaginati sono progettati perché il commissario <strong className="font-bold text-[#1b2a4a]">trovi subito ogni miglioria</strong> e capisca <strong className="font-bold text-[#1b2a4a]">a quale criterio risponde</strong>, senza doverla cercare nel testo.
          </p>

          {/* 3 Colonne: Chiarezza, Leggibilità, Impatto conformi al mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-[#dfe3ea] mb-12">
            <div className="space-y-2 md:pr-8">
              <div className="text-[#F5C400] text-[13px] font-medium uppercase tracking-[0.2em]">
                CHIAREZZA
              </div>
              <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                Ogni elaborato segue l'ordine dei criteri del disciplinare, con la stessa numerazione della relazione tecnica.
              </p>
            </div>

            <div className="space-y-2 md:px-8">
              <div className="text-[#F5C400] text-[13px] font-medium uppercase tracking-[0.2em]">
                LEGGIBILITÀ
              </div>
              <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                Gerarchia grafica, schemi e dati numerici al posto di descrizioni generiche: il contenuto si coglie anche in una lettura rapida.
              </p>
            </div>

            <div className="space-y-2 md:pl-8">
              <div className="text-[#F5C400] text-[13px] font-medium uppercase tracking-[0.2em]">
                IMPATTO
              </div>
              <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                Render e confronti tra progetto a base di gara e soluzione offerta rendono evidente il valore di ogni proposta.
              </p>
            </div>
          </div>

          {/* Viewer Tavola Ingegnerizzata a Grande Formato con Didascalia Overlay */}
          <div 
            className="relative w-full aspect-[16/10.5] sm:aspect-[16/10] bg-[#eef1f4] border border-navy/15 overflow-hidden shadow-sm mb-5 group touch-pan-y"
            onMouseEnter={() => setIsPlateHovered(true)}
            onMouseLeave={() => setIsPlateHovered(false)}
            onTouchStart={(e) => {
              setIsPlateHovered(true);
              plateTouchStartX.current = e.touches[0].clientX;
              plateTouchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              const deltaX = plateTouchStartX.current - e.changedTouches[0].clientX;
              const deltaY = plateTouchStartY.current - e.changedTouches[0].clientY;
              if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                if (deltaX > 0) {
                  handleNext();
                } else {
                  handlePrev();
                }
              }
              setTimeout(() => setIsPlateHovered(false), 2000);
            }}
          >
            <img 
              src={plates[currentIndex].img} 
              alt={plates[currentIndex].caption}
              className="w-full h-full object-contain select-none"
            />

            {/* Frecce Navigazione Laterali nello stile esatto del mockup */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white border border-navy/20 text-navy flex items-center justify-center shadow-md hover:bg-neutral-50 hover:border-navy transition-all cursor-pointer z-10"
              aria-label="Tavola Precedente"
            >
              <CaretLeft size={22} weight="regular" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white border border-navy/20 text-navy flex items-center justify-center shadow-md hover:bg-neutral-50 hover:border-navy transition-all cursor-pointer z-10"
              aria-label="Tavola Successiva"
            >
              <CaretRight size={22} weight="regular" />
            </button>

            {/* Didascalia Overlay in basso a sinistra conforme all'immagine */}
            <div className="absolute bottom-0 left-0 bg-[#2b3544]/90 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-normal tracking-wide max-w-full sm:max-w-3xl select-none backdrop-blur-xs">
              {plates[currentIndex].caption}
            </div>
          </div>

          {/* Miniature di navigazione rapida sottostanti */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {plates.map((plate, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-[16/10] bg-neutral-100 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIndex === idx 
                    ? 'border-gold shadow-xs scale-[1.02]' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Visualizza tavola ${idx + 1}`}
              >
                <img 
                  src={plate.thumb} 
                  alt={plate.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DALLA SCELTA DELLA GARA ALLA CONSEGNA (8 FASI INTERATTIVE) ── */}
      <section ref={methodSectionRef} className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto font-outfit">
        <div className="mb-4">
          <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] shadow-2xs">
            METODO
          </span>
        </div>
        <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] mb-4">
          DALLA SCELTA DELLA GARA ALLA CONSEGNA
        </h2>
        <p className="text-[#3d4a66] text-base md:text-[17px] font-normal max-w-[62ch] mb-10 leading-[1.65]">
          Un percorso strutturato per affiancare l'impresa in ogni passaggio, dalla valutazione iniziale all'invio dell'offerta.
        </p>

        {/* Timeline a 8 step con icone circolari disposte su 2 righe da 4 conformi al mockup */}
        <div className="bg-[#f4f6f9] p-4 sm:p-8 md:p-10 rounded-[2px] border border-[#dfe3ea]">
          <div className="grid grid-cols-4 gap-y-6 sm:gap-y-9 gap-x-2 sm:gap-x-6 lg:gap-x-8 mb-8 sm:mb-10">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.07 : 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className={`w-14 h-14 min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20 md:w-[88px] md:h-[88px] rounded-full flex items-center justify-center mb-2.5 sm:mb-3 transition-colors duration-300 ${
                      isActive 
                        ? 'p-[3px] sm:p-[4px] bg-white border-[3px] border-[#F5C400] shadow-md' 
                        : 'border-[1.5px] border-[#1B2A4A]/75 bg-white group-hover:border-[#1B2A4A]'
                    }`}
                  >
                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-[#1B2A4A] text-white' : 'text-[#1B2A4A]'
                    }`}>
                      <StepIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" weight="regular" />
                    </div>
                  </motion.div>
                  <span className={`text-[11px] min-[400px]:text-xs sm:text-sm leading-tight max-w-[140px] transition-colors duration-300 ${
                    isActive ? 'font-bold text-[#1B2A4A]' : 'font-normal text-[#1B2A4A]/85 group-hover:text-[#1B2A4A]'
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dettaglio Fase Selezionata con Bordo Oro a Sinistra conforme al mockup */}
          <div className="bg-white p-5 sm:p-8 md:p-10 border-l-4 border-[#F5C400] shadow-xs rounded-[2px]">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <span className="inline-block text-[#F5C400] text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] mb-2">
                {processSteps[activeStep].tag}
              </span>
              <h3 className="text-[#1B2A4A] text-xl sm:text-2xl md:text-[26px] font-bold uppercase tracking-[0.02em] leading-snug mb-3">
                {processSteps[activeStep].heading}
              </h3>
              <p className="text-[#3d4a66] text-[15px] sm:text-[17px] font-normal leading-[1.65] max-w-[64ch]">
                {processSteps[activeStep].desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. TIPOLOGIE DI OPERE (ESATTAMENTE COME IL MOCKUP) ── */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#dfe3ea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4">
            <span className="bg-[#F5C400] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block shadow-xs">
              AMBITI
            </span>
          </div>
          
          <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-6">
            TIPOLOGIE DI OPERE
          </h2>
          
          <p className="text-[#3d4a66] text-[16px] font-normal max-w-[62ch] mb-12 leading-[1.7]">
            L'esperienza maturata consente allo studio di operare con competenza in ambiti diversi, dall'<strong className="font-bold text-[#1b2a4a]">edilizia scolastica</strong> al <strong className="font-bold text-[#1b2a4a]">restauro</strong>, dalle <strong className="font-bold text-[#1b2a4a]">infrastrutture</strong> all'<strong className="font-bold text-[#1b2a4a]">edilizia residenziale</strong> e alle <strong className="font-bold text-[#1b2a4a]">strutture sportive</strong>, adottando in ogni caso un approccio tecnico fondato sull'analisi dei criteri di valutazione, del progetto a base di gara e delle esigenze operative dell'impresa.
          </p>

          {/* Griglia a 10 celle con bordi geometrici e testi potenziati */}
          <div className="grid grid-cols-2 lg:grid-cols-5 border-t border-l border-[#1b2a4a]/15 bg-white">
            {tipologieOpere.map((item, idx) => (
              <div 
                key={idx} 
                className="border-r border-b border-[#1b2a4a]/15 p-6 sm:py-12 sm:px-4 flex flex-col items-center justify-center text-center group hover:bg-neutral-50/80 transition-colors min-h-[170px] sm:min-h-[185px]"
              >
                <div className="h-10 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-[#1b2a4a] text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] leading-snug whitespace-pre-line">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONTATTACI SUBITO ── */}
      <section id="contattaci-sezione" className="py-14 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <GareContactForm />
      </section>

    </div>
  );
}
