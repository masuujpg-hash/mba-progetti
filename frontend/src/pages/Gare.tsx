import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Phone,
  EnvelopeSimple,
  MapPin,
  MagnifyingGlass,
  ShieldCheck,
  Stack,
  ChartLineUp,
  Lightbulb,
  PencilSimple,
  UploadSimple
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
          <p className="text-navy/85 text-base sm:text-lg font-normal max-w-3xl mb-12 leading-relaxed">
            I commissari di gara valutano decine di relazioni in tempi ridotti. Le nostre offerte tecniche trasformano concetti complessi in elaborati grafici ad alto impatto visivo e immediata comprensione.
          </p>

          {/* 3 Colonne con dettagli del metodo grafico */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-2">
              <div className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                GERARCHIA VISIVA
              </div>
              <p className="text-navy/80 text-sm sm:text-[15px] font-light leading-relaxed">
                Layout editoriale rigoroso: titoli chiari, schemi logici e box informativi che guidano immediatamente il valutatore sui punti di maggior punteggio.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                DATI ELETTRONICI & BIM
              </div>
              <p className="text-navy/80 text-sm sm:text-[15px] font-light leading-relaxed">
                Integrazione di modelli 3D, simulazioni energetiche, cronoprogrammi e schemi costruttivi che certificano il valore tecnico delle soluzioni proposte.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/30 pb-1">
                SINTESI EFFICACE
              </div>
              <p className="text-navy/80 text-sm sm:text-[15px] font-light leading-relaxed">
                Nessun riempitivo verbale: testi asciutti, tecnici e precisi, supportati da rendering fotorealistici e tavole illustrative conformi al disciplinare.
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
      <section className="py-14 sm:py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-3">
          <span className="inline-block bg-gold text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-xs">
            METODO
          </span>
        </div>
        <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight font-heading mb-4">
          DALLA SCELTA DELLA GARA ALLA CONSEGNA
        </h2>
        <p className="text-navy/85 text-base sm:text-lg font-normal max-w-3xl mb-12 leading-relaxed">
          Un percorso strutturato per affiancare l'impresa in ogni passaggio, dalla valutazione iniziale all'invio dell'offerta.
        </p>

        {/* Timeline a 8 step con icone circolari disposte su 2 righe da 4 conformi al mockup */}
        <div className="bg-[#f8f9fb] p-6 sm:p-10 rounded-xs border border-navy/10 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-7 gap-x-3 sm:gap-x-6 mb-8">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2.5 transition-all duration-200 ${
                      isActive 
                        ? 'p-[3px] border-2 border-gold shadow-xs' 
                        : 'border border-navy/20 bg-white group-hover:border-navy/40'
                    }`}
                  >
                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-navy text-white' : 'text-navy/80 group-hover:text-navy'
                    }`}>
                      <StepIcon size={22} weight={isActive ? "bold" : "regular"} />
                    </div>
                  </div>
                  <span className={`text-xs sm:text-[13px] tracking-tight transition-colors line-clamp-2 max-w-[125px] leading-snug ${
                    isActive ? 'font-bold text-navy' : 'font-normal text-navy/75 group-hover:text-navy'
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dettaglio Fase Selezionata con Bordo Oro a Sinistra conforme al mockup */}
          <div className="bg-white p-6 sm:p-8 border-l-[3px] border-gold shadow-xs rounded-xs">
            <span className="inline-block text-gold text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1.5">
              {processSteps[activeStep].tag}
            </span>
            <h3 className="text-navy text-lg sm:text-xl font-bold uppercase tracking-tight font-heading mb-2.5">
              {processSteps[activeStep].heading}
            </h3>
            <p className="text-navy/80 text-xs sm:text-sm md:text-[15px] font-light leading-relaxed max-w-3xl">
              {processSteps[activeStep].desc}
            </p>
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
          
          <p className="text-navy/85 text-base sm:text-lg md:text-[18px] font-normal max-w-4xl mb-12 leading-relaxed">
            L'esperienza maturata consente allo studio di operare con competenza in ambiti diversi, dall'<strong className="font-bold text-navy">edilizia scolastica</strong> al <strong className="font-bold text-navy">restauro</strong>, dalle <strong className="font-bold text-navy">infrastrutture</strong> all'<strong className="font-bold text-navy">edilizia residenziale</strong> e alle <strong className="font-bold text-navy">strutture sportive</strong>, adottando in ogni caso un approccio tecnico fondato sull'analisi dei criteri di valutazione, del progetto a base di gara e delle esigenze operative dell'impresa.
          </p>

          {/* Griglia a 10 celle con bordi geometrici e testi potenziati */}
          <div className="grid grid-cols-2 lg:grid-cols-5 border-t border-l border-navy/15 bg-white">
            {tipologieOpere.map((item, idx) => (
              <div 
                key={idx} 
                className="border-r border-b border-navy/15 p-6 sm:py-10 sm:px-5 flex flex-col items-center justify-center text-center group hover:bg-neutral-50/80 transition-colors min-h-[175px]"
              >
                <div className="h-10 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-navy text-xs sm:text-[13px] md:text-sm font-bold uppercase tracking-[0.14em] leading-snug whitespace-pre-line font-outfit">
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
