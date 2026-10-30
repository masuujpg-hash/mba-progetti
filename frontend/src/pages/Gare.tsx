import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator,
  FileText,
  Compass,
  PencilRuler,
  Sparkle,
  PaperPlaneTilt,
  CaretLeft,
  CaretRight,
  ArrowsOut,
  X,
  CheckCircle,
  Phone,
  EnvelopeSimple,
  MapPin,
  MagnifyingGlass,
  ShieldCheck
} from '@phosphor-icons/react';

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
    <div ref={ref} className="py-5 sm:py-6 border-b border-navy/10 last:border-b-0 first:pt-0">
      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr] items-center gap-4">
        <span className="text-[#1B2A4A] text-4xl sm:text-5xl font-bold tracking-tight font-outfit">
          {prefix}{isInView ? count : 0}{suffix}
        </span>
        <span className="text-[#1B2A4A]/70 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] font-outfit">
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

  // Geometria SVG Donut
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 68;
  const strokeWidth = 36;
  const circumference = 2 * Math.PI * radius;

  // Calcolo segmenti cumulativi partendo da -90deg (12:00 in alto)
  let accumulatedPercent = 0;
  const segmentData = segments.map((seg) => {
    const startAngle = (accumulatedPercent / 100) * 360 - 90;
    const arcLength = (seg.value / 100) * circumference;
    const gap = 2; // pixel gap tra le fette
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
    <div ref={containerRef} className="flex flex-col items-center group w-full max-w-[270px]">
      {/* Container SVG con animazioni */}
      <div className="relative w-52 h-52 sm:w-56 sm:h-56 mb-2 flex items-center justify-center">
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
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
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
                    filter: isHovered ? 'drop-shadow(0 2px 8px rgba(27,42,74,0.25))' : 'none'
                  }}
                />

                {/* Etichetta % all'interno della fetta */}
                <motion.text
                  x={seg.labelX}
                  y={seg.labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={seg.textColor || (seg.value <= 10 ? '#1B2A4A' : '#FFFFFF')}
                  fontSize={seg.value <= 5 ? "9" : "10.5"}
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
          <div className="w-9 h-9 rounded-full border border-navy/20 flex items-center justify-center bg-white shadow-xs">
            {centerIcon}
          </div>
        </div>
      </div>

      {/* Titolo sotto il grafico */}
      <h3 className="font-outfit text-sm sm:text-[15px] font-normal text-navy mt-4 mb-3 text-center">
        {prefixTitle} <span className="text-[#F5C400] font-bold uppercase tracking-wider">{highlightTitle}</span>
      </h3>

      {/* Mini legenda a due colonne */}
      <div className="w-full max-w-[270px] grid grid-cols-2 gap-x-4 gap-y-2 text-left font-outfit text-[11px] font-semibold tracking-wider text-[#1B2A4A]/80">
        <div className="space-y-2">
          {legendCol1.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="uppercase whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {legendCol2.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
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
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    cig: '',
    scadenza: '',
    messaggio: '',
    privacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert("È necessario accettare l'informativa sulla privacy.");
      return;
    }
    setFormSubmitted(true);
  };

  // 7 Fasi di lavoro conformi al mockup
  const processSteps = [
    {
      id: '01',
      title: 'Scelta della gara',
      short: 'Scelta Gara',
      icon: MagnifyingGlass,
      desc: 'Identificazione delle procedure più coerenti con le potenzialità e la struttura dell’impresa. Analisi preliminare dei requisiti di qualificazione (SOA) e della fattibilità tecnica ed economica dell’intervento.'
    },
    {
      id: '02',
      title: 'Valutazione investimento',
      short: 'Investimento',
      icon: Calculator,
      desc: 'Analisi preliminare dei costi di partecipazione, stima del budget per le proposte migliorative e calcolo del ritorno atteso in termini di punteggio tecnico tabellare e discrezionale.'
    },
    {
      id: '03',
      title: 'Analisi disciplinare',
      short: 'Disciplinare',
      icon: FileText,
      desc: 'Studio approfondito di ogni criterio e sub-criterio di valutazione, della ponderazione dei punteggi e dei vincoli tecnici fissati dalla Stazione Appaltante nel bando.'
    },
    {
      id: '04',
      title: 'Sopralluogo tecnico',
      short: 'Sopralluogo',
      icon: Compass,
      desc: 'Verifica diretta dello stato dei luoghi, rilievo delle criticità operative, vincoli di cantierizzazione e individuazione mirata delle opportunità di miglioramento.'
    },
    {
      id: '05',
      title: 'Studio del progetto',
      short: 'Studio Progetto',
      icon: PencilRuler,
      desc: 'Analisi critica degli elaborati a base di gara (progetto esecutivo o di fattibilità), delle relazioni specialistiche e del quadro economico di spesa.'
    },
    {
      id: '06',
      title: 'Valutazione migliorie',
      short: 'Migliorie',
      icon: Sparkle,
      desc: 'Brainstorming ingegneristico e architettonico per la definizione condivisa con l’impresa delle proposte tecniche a più alto impatto premiante, nel pieno rispetto dei vincoli di capitolato.'
    },
    {
      id: '07',
      title: 'Redazione & consegna',
      short: 'Consegna',
      icon: PaperPlaneTilt,
      desc: 'Stesura della relazione tecnica con rigorosa gerarchia editoriale, produzione di tavole grafiche esplicative, rendering 3D fotorealistici e supporto al caricamento sui portali telematici.'
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
          <path d="M14 6l4 4-8 8H6v-4l8-8z" />
          <path d="M18 10l-2-2" />
          <line x1="3" y1="21" x2="7" y2="21" />
        </svg>
      )
    },
    {
      title: "STRUTTURE\nRICETTIVE",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8v13M3 16h18v5M21 12v9M6 13a2 2 0 012-2h3a2 2 0 012 2v3H6v-3z" />
        </svg>
      )
    },
    {
      title: "STRUTTURE\nPOLIVALENTI",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20V13a8 8 0 0116 0v7" />
          <path d="M8 20V15a4 4 0 018 0v5" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      )
    },
    {
      title: "EDIFICI STORICI E\nRESTAURO",
      icon: (
        <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7l9-4 9 4v2H3V7z" />
          <line x1="6" y1="9" x2="6" y2="19" />
          <line x1="12" y1="9" x2="12" y2="19" />
          <line x1="18" y1="9" x2="18" y2="19" />
          <line x1="4" y1="19" x2="20" y2="19" />
          <line x1="2" y1="21" x2="22" y2="21" />
        </svg>
      )
    }
  ];

  // Tavole di gara e galleria grafica
  const plates = [
    { 
      img: "/media/portfolio/tavole-02.webp", 
      thumb: "/media/portfolio/tavole-02.webp",
      title: "Tavola 1 — Analisi e Inquadramento Tecnico",
      subtitle: "Inquadramento territoriale, analisi vincolistica e concept delle migliorie"
    },
    { 
      img: "/media/portfolio/tavole-03.webp", 
      thumb: "/media/portfolio/tavole-03.webp",
      title: "Tavola 2 — Proposte Migliorative & Sostenibilità CAM",
      subtitle: "Dettaglio delle soluzioni a basso impatto ambientale e certificazioni di prodotto"
    },
    { 
      img: "/media/portfolio/tavole-04.webp", 
      thumb: "/media/portfolio/tavole-04.webp",
      title: "Tavola 3 — Layout Tecnologico & Schemi Impiantistici",
      subtitle: "Integrazione HVAC, pannelli fotovoltaici e soluzioni a elevata efficienza energetica"
    },
    { 
      img: "/media/portfolio/tavole-05.webp", 
      thumb: "/media/portfolio/tavole-05.webp",
      title: "Tavola 4 — Cantierizzazione, Sicurezza e Fasi Operative",
      subtitle: "Cronoprogramma cantieri, mitigazione delle polveri e gestione del rumore"
    },
    { 
      img: "/media/portfolio/tavole-06.webp", 
      thumb: "/media/portfolio/tavole-06.webp",
      title: "Tavola 5 — Nodi Costruttivi e Dettagli Esecutivi",
      subtitle: "Spaccati assonometrici, stratigrafie e pacchetti di isolamento termo-acustico"
    },
    { 
      img: "/media/portfolio/tavole_Tavola disegno 1.webp", 
      thumb: "/media/portfolio/tavole_Tavola disegno 1.webp",
      title: "Tavola 6 — Sintesi Progettuale e Computo Prestazionale",
      subtitle: "Quadro sinottico delle migliorie e confronto prestazionale con il progetto base"
    }
  ];

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
      
      {/* ── 1. HERO CON SFUMATURA ORIGINALE BIANCA VERSO IL BASSO ── */}
      <section className="relative h-[48vh] sm:h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/portfolio/03_carabinieri_viterbo.jpg" 
            className="w-full h-full object-cover object-top opacity-35" 
            alt="MBA Progetti Gare OEPV"
          />
          {/* Sfumatura: parte da navy semitrasparente in alto e degrada dolcemente a bianco puro */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-white" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-gold text-white text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-xs mb-3 shadow-xs">
              SERVIZI
            </div>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight font-heading drop-shadow-sm">
              GARE OEPV
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. OFFERTE TECNICHE MIGLIORATIVE & GRAFICI ANIMATI ── */}
      <section className="py-14 sm:py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-navy text-2xl sm:text-3xl md:text-[34px] font-bold uppercase tracking-tight font-outfit mb-8">
          OFFERTE TECNICHE MIGLIORATIVE
        </h2>

        {/* Riga superiore: Descrizione a sinistra + 3 Stats animate a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-14">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#1B2A4A]/80 text-sm sm:text-base font-normal leading-relaxed font-outfit">
              Lo studio MBA affianca le imprese nella redazione di <strong className="font-bold text-[#1B2A4A]">offerte tecniche migliorative</strong> per gare d’appalto pubbliche aggiudicate secondo il criterio dell’<strong className="font-bold text-[#1B2A4A]">offerta economicamente più vantaggiosa (OEV)</strong>. Analizziamo disciplinari e progetti posti a base di gara per individuare con precisione i <strong className="font-bold text-[#1B2A4A]">margini di miglioramento tecnico e operativo</strong>, sviluppando proposte fondate su <strong className="font-bold text-[#1B2A4A]">metodo, chiarezza e coerenza con i criteri di valutazione</strong>, capaci di tradursi in <strong className="font-bold text-[#1B2A4A]">risultati concreti</strong> nelle procedure di gara.
            </p>
            <div className="pt-2">
              <Link 
                to="/portfolio"
                className="inline-flex items-center gap-3 border border-[#1B2A4A]/60 text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 rounded-[1px] group cursor-pointer font-outfit"
              >
                <span>VEDI LE GARE SEGUITE</span>
                <CaretRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between pt-1 lg:pl-10 lg:border-l border-navy/10">
            <StatCounter value="+10" label="ANNI DI ESPERIENZA" />
            <StatCounter value="63%" label="GARE SUL PODIO" />
            <StatCounter value="38%" label="GARE AGGIUDICATE" />
          </div>
        </div>

        {/* ── 3 GRAFICI A CIAMBELLA ANIMATI ── */}
        <div className="pt-12 border-t border-navy/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 justify-items-center">
            
            {/* Grafico 1: Ubicazione */}
            <AnimatedDonutChart
              prefixTitle="gare per"
              highlightTitle="UBICAZIONE"
              centerIcon={<MapPin size={16} weight="regular" className="text-navy" />}
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
              centerIcon={<ShieldCheck size={16} weight="regular" className="text-navy" />}
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
              centerIcon={<span className="text-navy font-outfit font-semibold text-sm leading-none">€</span>}
              segments={[
                { label: "1 – 5 MLN", value: 40, color: "#1B2A4A", textColor: "#FFFFFF" },
                { label: "5 – 20 MLN", value: 30, color: "#3B5274", textColor: "#FFFFFF" },
                { label: "< 1 MLN", value: 20, color: "#788EA7", textColor: "#FFFFFF" },
                { label: "> 20 MLN", value: 10, color: "#BAC7D5", textColor: "#1B2A4A" }
              ]}
              legendCol1={[
                { label: "1 – 5 MLN", color: "#1B2A4A" },
                { label: "< 1 MLN", color: "#788EA7" }
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
      <section className="py-14 sm:py-20 bg-bg-neutral/40 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-3">
            <span className="inline-block bg-gold text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-xs">
              LAYOUT
            </span>
          </div>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight font-heading mb-4">
            OFFERTE CHE SI LEGGONO AL PRIMO SGUARDO
          </h2>
          <p className="text-navy/70 text-sm sm:text-base font-light max-w-3xl mb-12 leading-relaxed">
            I commissari di gara valutano decine di relazioni in tempi ridotti. Le nostre offerte tecniche trasformano concetti complessi in elaborati grafici ad alto impatto visivo e immediata comprensione.
          </p>

          {/* 3 Colonne con dettagli del metodo grafico */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-2">
              <div className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                GERARCHIA VISIVA
              </div>
              <p className="text-navy/80 text-xs sm:text-sm font-light leading-relaxed">
                Layout editoriale rigoroso: titoli chiari, schemi logici e box informativi che guidano immediatamente il valutatore sui punti di maggior punteggio.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                DATI ELETTRONICI & BIM
              </div>
              <p className="text-navy/80 text-xs sm:text-sm font-light leading-relaxed">
                Integrazione di modelli 3D, simulazioni energetiche, cronoprogrammi e schemi costruttivi che certificano il valore tecnico delle soluzioni proposte.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                SINTESI EFFICACE
              </div>
              <p className="text-navy/80 text-xs sm:text-sm font-light leading-relaxed">
                Nessun riempitivo verbale: testi asciutti, tecnici e precisi, supportati da rendering fotorealistici e tavole illustrative conformi al disciplinare.
              </p>
            </div>
          </div>

          {/* Viewer Tavola Ingegnerizzata */}
          <div className="relative bg-white border border-navy/15 rounded-xs shadow-sm overflow-hidden mb-4">
            <div 
              className="relative aspect-[16/10] sm:aspect-[16/9] bg-neutral-900 group touch-pan-y"
              onTouchStart={(e) => {
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
              }}
            >
              <img 
                src={plates[currentIndex].img} 
                alt={plates[currentIndex].title}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() => setIsFullscreenModalOpen(true)}
              />

              {/* Tasto Ingrandisci Schermo Intero */}
              <button
                onClick={() => setIsFullscreenModalOpen(true)}
                className="absolute top-4 right-4 bg-navy/80 hover:bg-navy text-gold p-2.5 rounded-xs backdrop-blur-xs transition-colors shadow-sm cursor-pointer"
                title="Ingrandisci a Schermo Intero"
              >
                <ArrowsOut size={18} />
              </button>

              {/* Frecce Navigazione Laterali */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-xs shadow-md transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                aria-label="Tavola Precedente"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-xs shadow-md transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                aria-label="Tavola Successiva"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </div>

            {/* Didascalia e contatore */}
            <div className="p-4 bg-white border-t border-navy/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-navy text-xs sm:text-sm font-bold uppercase tracking-wide">
                  {plates[currentIndex].title}
                </h4>
                <p className="text-navy/60 text-xs font-light">
                  {plates[currentIndex].subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gold px-2 py-0.5 bg-bg-neutral rounded-xs">
                  {currentIndex + 1} / {plates.length}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnail Carousel sottostante */}
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
              >
                <img 
                  src={plate.thumb} 
                  alt={plate.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Modale Zoom a Schermo Intero */}
          {isFullscreenModalOpen && (
            <div 
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 touch-pan-y"
              onTouchStart={(e) => {
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
              }}
            >
              <button 
                onClick={() => setIsFullscreenModalOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-gold p-2 transition-colors cursor-pointer z-10"
                title="Chiudi"
              >
                <X size={28} />
              </button>
              {/* Frecce laterali a schermo intero */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-navy p-3 rounded-full backdrop-blur-xs transition-all cursor-pointer z-10"
                aria-label="Tavola Precedente"
              >
                <CaretLeft size={24} weight="bold" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-navy p-3 rounded-full backdrop-blur-xs transition-all cursor-pointer z-10"
                aria-label="Tavola Successiva"
              >
                <CaretRight size={24} weight="bold" />
              </button>
              <img 
                src={plates[currentIndex].img} 
                alt={plates[currentIndex].title}
                className="max-w-full max-h-[92vh] object-contain rounded-xs select-none"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 4. DALLA SCELTA DELLA GARA ALLA CONSEGNA (7 FASI INTERATTIVE) ── */}
      <section className="py-14 sm:py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-3">
          <span className="inline-block bg-gold text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-xs">
            METODO
          </span>
        </div>
        <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight font-heading mb-4">
          DALLA SCELTA DELLA GARA ALLA CONSEGNA
        </h2>
        <p className="text-navy/70 text-sm sm:text-base font-light max-w-3xl mb-12 leading-relaxed">
          Un percorso strutturato in 7 fasi per affiancare l'impresa in ogni passaggio, dalla valutazione iniziale all'invio dell'offerta.
        </p>

        {/* Timeline a 7 step con icone circolari numerate */}
        <div className="bg-bg-neutral/50 p-6 sm:p-8 rounded-xs border border-navy/10 mb-6">
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-3 sm:gap-2 mb-8">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div 
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 transition-all duration-200 border-2 ${
                      isActive 
                        ? 'bg-navy border-gold text-gold shadow-md scale-105' 
                        : 'bg-white border-navy/20 text-navy/70 hover:border-gold hover:text-gold'
                    }`}
                  >
                    <StepIcon size={20} weight={isActive ? "bold" : "regular"} />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors line-clamp-1 ${
                    isActive ? 'text-navy' : 'text-navy/60 group-hover:text-gold'
                  }`}>
                    {step.short}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dettaglio Fase Selezionata con Icona Grande a Destra */}
          <div className="bg-white p-6 sm:p-8 border-l-4 border-gold shadow-xs rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                FASE {processSteps[activeStep].id} / 07
              </span>
              <h3 className="text-navy text-lg sm:text-xl font-bold uppercase tracking-tight font-heading">
                {processSteps[activeStep].title}
              </h3>
              <p className="text-navy/80 text-xs sm:text-sm font-light leading-relaxed">
                {processSteps[activeStep].desc}
              </p>
            </div>

            <div className="shrink-0 self-end md:self-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold">
                {(() => {
                  const CurrentIcon = processSteps[activeStep].icon;
                  return <CurrentIcon size={36} weight="duotone" />;
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TIPOLOGIE DI OPERE (ESATTAMENTE COME IL MOCKUP) ── */}
      <section className="py-16 sm:py-24 bg-white border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4">
            <span className="inline-block bg-gold text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-xs">
              AMBITI
            </span>
          </div>
          
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading mb-6">
            TIPOLOGIE DI OPERE
          </h2>
          
          <p className="text-navy/80 text-xs sm:text-sm font-light max-w-4xl mb-12 leading-relaxed">
            L'esperienza maturata consente allo studio di operare con competenza in ambiti diversi, dall'<strong className="font-bold text-navy">edilizia scolastica</strong> al <strong className="font-bold text-navy">restauro</strong>, dalle <strong className="font-bold text-navy">infrastrutture</strong> all'<strong className="font-bold text-navy">edilizia residenziale</strong> e alle <strong className="font-bold text-navy">strutture sportive</strong>, adottando in ogni caso un approccio tecnico fondato sull'analisi dei criteri di valutazione, del progetto a base di gara e delle esigenze operative dell'impresa.
          </p>

          {/* Griglia a 5 colonne x 2 righe con bordi interni ed esterni geometrici */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-navy/10 bg-white">
            {tipologieOpere.map((item, idx) => (
              <div 
                key={idx} 
                className="border-r border-b border-navy/10 p-6 sm:py-10 sm:px-4 flex flex-col items-center justify-center text-center group hover:bg-neutral-50/70 transition-colors min-h-[170px]"
              >
                <div className="h-10 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-relaxed whitespace-pre-line font-sans">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONTATTACI SUBITO ── */}
      <section id="contattaci-sezione" className="py-14 sm:py-20 px-6 max-w-7xl mx-auto">
        <div className="border-l-4 border-gold bg-bg-neutral/40 p-6 sm:p-10 rounded-xs shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Colonna Sinistra: Info di Contatto */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-gold text-xs font-bold uppercase tracking-widest block">
                CONTATTI & INFORMAZIONI
              </span>
              <h3 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tight font-heading">
                CONTATTACI SUBITO
              </h3>
              <p className="text-navy/70 text-xs sm:text-sm font-light leading-relaxed">
                Hai una gara in corso o in scadenza? Inviaci il bando e il disciplinare: effettueremo un'analisi preliminare di fattibilità e competitività tecnica senza impegno.
              </p>

              <div className="pt-2 space-y-3 text-xs sm:text-sm text-navy/80">
                <div className="flex items-center gap-3">
                  <EnvelopeSimple size={18} className="text-gold shrink-0" />
                  <a href="mailto:gare@mbaprogetti.it" className="hover:text-gold transition-colors font-medium">
                    gare@mbaprogetti.it
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gold shrink-0" />
                  <a href="tel:+390683917922" className="hover:text-gold transition-colors font-medium">
                    +39 06 8391 7922
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gold shrink-0" />
                  <span>Sede Operativa: Roma, Via Salaria</span>
                </div>
              </div>
            </div>

            {/* Colonna Destra: Modulo di Richiesta */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="bg-white p-8 border border-navy/10 rounded-xs text-center space-y-3 shadow-xs">
                  <CheckCircle size={44} className="text-gold mx-auto" />
                  <h4 className="text-navy text-base font-bold uppercase tracking-wide">
                    Richiesta Inviata con Successo
                  </h4>
                  <p className="text-navy/70 text-xs font-light">
                    Il nostro team tecnico esaminerà i dettagli della gara e ti risponderà entro 24 ore lavorative.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      required
                      placeholder="Nome e Cognome *" 
                      value={formData.nome}
                      onChange={e => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full bg-white border border-navy/15 px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold rounded-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Ragione Sociale / Impresa" 
                      value={formData.azienda}
                      onChange={e => setFormData({ ...formData, azienda: e.target.value })}
                      className="w-full bg-white border border-navy/15 px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold rounded-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="email" 
                      required
                      placeholder="Email aziendale *" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-navy/15 px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold rounded-xs"
                    />
                    <input 
                      type="tel" 
                      placeholder="Recapito Telefonico" 
                      value={formData.telefono}
                      onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-white border border-navy/15 px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold rounded-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="CIG o Oggetto della Gara" 
                      value={formData.cig}
                      onChange={e => setFormData({ ...formData, cig: e.target.value })}
                      className="w-full bg-white border border-navy/15 px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold rounded-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Data Scadenza Offerte" 
                      value={formData.scadenza}
                      onChange={e => setFormData({ ...formData, scadenza: e.target.value })}
                      className="w-full bg-white border border-navy/15 px-3 py-2 text-xs text-navy focus:outline-none focus:border-gold rounded-xs"
                    />
                  </div>

                  <textarea 
                    rows={3} 
                    placeholder="Note sulla procedura o richieste specifiche..." 
                    value={formData.messaggio}
                    onChange={e => setFormData({ ...formData, messaggio: e.target.value })}
                    className="w-full bg-white border border-navy/15 p-3 text-xs text-navy focus:outline-none focus:border-gold rounded-xs resize-none"
                  />

                  <div className="flex items-center gap-2 pt-1">
                    <input 
                      type="checkbox" 
                      id="privacy-check"
                      checked={formData.privacy}
                      onChange={e => setFormData({ ...formData, privacy: e.target.checked })}
                      className="accent-navy cursor-pointer"
                      required
                    />
                    <label htmlFor="privacy-check" className="text-[11px] text-navy/70 cursor-pointer">
                      Dichiaro di aver preso visione dell'informativa sulla privacy
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="bg-navy hover:bg-gold text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-xs shadow-xs cursor-pointer"
                  >
                    Invia Richiesta
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
