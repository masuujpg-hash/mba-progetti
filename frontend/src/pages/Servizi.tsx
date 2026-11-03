import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Building2, 
  Scan, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Compass,
  CheckSquare
} from 'lucide-react';

export default function Servizi() {
  const [activeTab, setActiveTab] = useState('gare');

  const services = [
    {
      id: "gare",
      title: "Gare d'Appalto OEPV",
      subtitle: "Offerte Tecniche Migliorative (D.Lgs. 36/2023)",
      icon: Target,
      tag: "Core Business",
      route: "/servizi/gare",
      desc: "Analizziamo i documenti di gara per individuare con precisione i margini di miglioramento tecnico, sviluppando offerte vincenti fondate su metodo, chiarezza e coerenza con i criteri premianti.",
      image: "/media/header_2.jpg",
      stats: [
        { label: "Gare Redatte", value: "+200" },
        { label: "Sul Podio", value: "63%" },
        { label: "Aggiudicate", value: "38%" }
      ],
      features: [
        "Analisi strategica del disciplinare di gara",
        "Elaborazione proposte migliorative tecniche e CAM",
        "Redazione relazioni metodologiche ad alta leggibilità",
        "Supporto integrato dalla gara al progetto esecutivo"
      ]
    },
    {
      id: "progettazione",
      title: "Progettazione Integrale & CAM",
      subtitle: "Architettura, Ingegneria & Direzione Lavori",
      icon: Building2,
      tag: "Progettazione & Cantiere",
      route: "/servizi/progettazione",
      desc: "Affianchiamo imprese e committenti in tutte le fasi del processo edilizio, dalla progettazione alla direzione lavori, garantendo qualità costruttiva e pieno rispetto dei CAM.",
      image: "/media/header_3.jpg",
      stats: [
        { label: "Normativa", value: "CAM" },
        { label: "Coordinamento", value: "Integrato" },
        { label: "Controllo", value: "Qualità" }
      ],
      features: [
        "Progettazione architettonica, strutturale ed impiantistica",
        "Integrazione dei Criteri Ambientali Minimi (CAM)",
        "Trasformazione delle migliorie di gara in progetti esecutivi",
        "Direzione lavori e contabilità di cantiere"
      ]
    },
    {
      id: "rilievi",
      title: "Rilievi Digitali 3D & Drone",
      subtitle: "Laser Scanner 3D, Drone UAV & GPS Topografico",
      icon: Scan,
      tag: "Precisione Millimetrica",
      route: "/servizi/rilievi",
      desc: "Acquisiamo dati metrici ad alta precisione con laser scanner 3D e droni, fornendo la base ideale per progettazione, recupero e modellazione BIM dello stato di fatto.",
      image: "/media/team_rilievi.jpg",
      stats: [
        { label: "Laser Scanner", value: "Leica BLK360" },
        { label: "Drone UAV", value: "DJI Mavic 3E" },
        { label: "Topografia", value: "GPS ProTRACK" }
      ],
      features: [
        "Nuvole di punti 3D millimetriche per fabbricati e monumenti",
        "Aerofotogrammetria con drone per grandi superfici e coperture",
        "Rilievi topografici e tracciamenti georeferenziati",
        "Restituzione tavole CAD 2D As-Built ed ortofoto"
      ]
    },
    {
      id: "bim",
      title: "Modellazione BIM & Scan to BIM",
      subtitle: "Digital Twin, Coordinamento Disciplinare & As-Built",
      icon: Layers,
      tag: "Digital Twin",
      route: "/servizi/bim",
      desc: "Gestiamo e coordiniamo le informazioni di progetto in ambiente BIM parametrico, riducendo le interferenze in cantiere e garantendo controllo in tutte le fasi.",
      image: "/media/portfolio/p08.png",
      stats: [
        { label: "Metodologia", value: "Scan to BIM" },
        { label: "Standard", value: "IFC / Revit" },
        { label: "Output", value: "As-Built BIM" }
      ],
      features: [
        "Modellazione e coordinamento multidisciplinare 3D",
        "Generazione di modelli Scan to BIM e HBIM da nuvole di punti",
        "Elaborati grafici BIM a supporto delle gare d'appalto OEPV",
        "Redazione modelli As-Built BIM per la gestione dell'immobile"
      ]
    }
  ];

  const currentService = services.find(s => s.id === activeTab) || services[0];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── SERVIZI HERO (SFONDO BLU ORIGINALE E TESTO BIANCO) ── */}
      <section className="relative min-h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Servizi"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          {/* Sfumatura blu originale */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">
              Le Competenze di MBA Progetti
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 leading-tight">
              I Nostri Servizi.
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Soluzioni integrate per appalti pubblici e privati: dalla redazione di offerte tecniche OEPV alla progettazione integrale, rilievi 3D e modellazione BIM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SWITCHER PULITO SENZA PULSANTI BLU SCURI ── */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            SELEZIONA SERVIZIO
          </span>
          <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-outfit">
            LE 4 MACRO-AREE
          </h2>
        </div>

        {/* Tab Selection Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {services.map((s) => {
            const IconComp = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`p-6 rounded-[1px] text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-white text-navy border-gold shadow-md ring-1 ring-gold/40' 
                    : 'bg-bg-neutral/60 text-navy/70 hover:bg-white hover:text-navy border-navy/10'
                }`}
              >
                <div>
                  <div className={`p-3 rounded-[1px] w-fit mb-3.5 ${
                    isActive ? 'bg-gold text-white' : 'bg-navy/5 text-navy/70'
                  }`}>
                    <IconComp size={22} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider block mb-1 text-gold font-outfit">
                    {s.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight leading-snug font-outfit">
                    {s.title}
                  </h3>
                </div>
                <div className="mt-5 pt-3 border-t border-navy/10 flex items-center justify-between font-outfit">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60">
                    Seleziona
                  </span>
                  <ChevronRight size={14} className={isActive ? 'text-gold' : 'text-navy/30'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE DISPLAY PANEL */}
        <div className="bg-[#f9fbfc] border border-navy/10 rounded-[1px] p-6 sm:p-8 md:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <span className="bg-[#F5C400] text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
                {currentService.tag}
              </span>
              <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-2 font-outfit">
                {currentService.title}
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 font-outfit">
                {currentService.subtitle}
              </p>

              <p className="text-[#475569] text-base md:text-[17px] font-normal leading-[1.65] mb-8 font-outfit">
                {currentService.desc}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 border-y border-navy/10 py-5 mb-8">
                {currentService.stats.map((st, i) => (
                  <div key={i} className="text-left">
                    <div className="text-navy text-xl sm:text-2xl font-extrabold font-outfit tracking-tight">{st.value}</div>
                    <div className="text-gold text-xs font-bold uppercase tracking-wider mt-0.5 font-outfit">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-3 mb-8">
                {currentService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-[#1B2A4A] text-sm sm:text-[15px] font-medium leading-snug font-outfit">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div>
                <Link 
                  to={currentService.route} 
                  className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-7 py-3.5 rounded-[1px] text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-3 shadow-2xs group font-outfit"
                >
                  <span>Scopri il Servizio</span>
                  <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
                </Link>
              </div>

            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-[1px] overflow-hidden border border-navy/10 shadow-sm bg-neutral-100 group">
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#F5C400] text-xs font-bold uppercase tracking-wider mb-1 font-outfit">MBA Progetti</span>
                  <h3 className="text-white text-lg sm:text-xl font-bold uppercase tracking-tight font-outfit">{currentService.title}</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRE PILASTRI ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/50 border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
              IL NOSTRO METODO
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-outfit">
              I TRE PILASTRI OPERATIVI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-8 sm:p-10 border border-[#e2e8f0] rounded-[1px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-7">
                  <Search size={24} />
                </div>
                <span className="text-gold font-mono font-bold text-xs block mb-2">FASE 01</span>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-4 font-outfit">ANALIZZIAMO</h3>
                <p className="text-[#475569] text-[15px] leading-relaxed font-outfit">
                  Esame metodico del disciplinare e del progetto a base di gara per individuare criteri premianti e margini di miglioramento tecnico.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 border border-[#e2e8f0] rounded-[1px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-7">
                  <Compass size={24} />
                </div>
                <span className="text-gold font-mono font-bold text-xs block mb-2">FASE 02</span>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-4 font-outfit">PROGETTIAMO</h3>
                <p className="text-[#475569] text-[15px] leading-relaxed font-outfit">
                  Sviluppo di soluzioni migliorative su misura, integrando aspetti architettonici, impiantistici, strutturali e di cantiere.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 border border-[#e2e8f0] rounded-[1px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-7">
                  <CheckSquare size={24} />
                </div>
                <span className="text-gold font-mono font-bold text-xs block mb-2">FASE 03</span>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-4 font-outfit">VALORIZZIAMO</h3>
                <p className="text-[#475569] text-[15px] leading-relaxed font-outfit">
                  Produzione di documentazione chiara ed immediata per mettere in risalto il valore della proposta davanti alla commissione.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER CONTATTI ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-gold p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-navy text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-heading">
              HAI BISOGNO DI SUPPORTO PER UNA GARA O UN PROGETTO?
            </h3>
            <p className="text-navy/75 text-sm sm:text-base font-outfit mt-2">
              Richiedi una consulenza tecnica o uno studio di fattibilità con il team di MBA Progetti.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-navy text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-gold transition-colors inline-flex items-center justify-center gap-4 rounded-[1px] shadow-sm shrink-0 font-outfit"
          >
            <span>CONTATTACI</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
