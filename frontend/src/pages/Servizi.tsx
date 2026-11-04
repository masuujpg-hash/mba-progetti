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
    <div className="bg-white selection:bg-[#1b2a4a] selection:text-white">
      
      {/* ── SERVIZI HERO (SFONDO BLU ORIGINALE E TESTO BIANCO) ── */}
      <section className="relative min-h-[55vh] w-full flex items-center justify-center overflow-hidden bg-[#1b2a4a]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Servizi"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a4a] via-[#1b2a4a]/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#b8972a] text-[13px] font-medium uppercase tracking-[0.2em] mb-4 block">
              Le Competenze di MBA Progetti
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-[44px] font-semibold uppercase tracking-tight mb-4 leading-tight font-outfit">
              I Nostri Servizi.
            </h1>
            <p className="text-white/80 text-base font-normal leading-[1.7] max-w-2xl mx-auto font-outfit">
              Soluzioni integrate per appalti pubblici e privati: dalla redazione di offerte tecniche OEPV alla progettazione integrale, rilievi 3D e modellazione BIM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SWITCHER PULITO SENZA PULSANTI BLU SCURI ── */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[2px] inline-block mb-3 font-outfit">
            SELEZIONA SERVIZIO
          </span>
          <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[34px] font-semibold uppercase tracking-tight font-outfit">
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
                className={`p-6 rounded-[2px] text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-white text-[#1b2a4a] border-[#b8972a] shadow-md ring-1 ring-[#b8972a]/40' 
                    : 'bg-neutral-50/60 text-[#3d4a66] hover:bg-white hover:text-[#1b2a4a] border-[#1b2a4a]/10'
                }`}
              >
                <div>
                  <div className={`p-3 rounded-[2px] w-fit mb-3.5 ${
                    isActive ? 'bg-[#b8972a] text-white' : 'bg-[#1b2a4a]/5 text-[#1b2a4a]/70'
                  }`}>
                    <IconComp size={22} />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] block mb-1 text-[#b8972a] font-outfit">
                    {s.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold uppercase tracking-tight leading-snug font-outfit">
                    {s.title}
                  </h3>
                </div>
                <div className="mt-5 pt-3 border-t border-[#1b2a4a]/10 flex items-center justify-between font-outfit">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#7b869d]">
                    Seleziona
                  </span>
                  <ChevronRight size={14} className={isActive ? 'text-[#b8972a]' : 'text-[#7b869d]/50'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE DISPLAY PANEL */}
        <div className="bg-[#f9fbfc] border border-[#1b2a4a]/10 rounded-[2px] p-6 sm:p-8 md:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[2px] inline-block mb-3 font-outfit">
                {currentService.tag}
              </span>
              <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-semibold uppercase tracking-tight leading-tight mb-2 font-outfit">
                {currentService.title}
              </h2>
              <p className="text-[#7b869d] text-xs sm:text-sm font-medium uppercase tracking-[0.15em] mb-6 font-outfit">
                {currentService.subtitle}
              </p>

              <p className="text-[#3d4a66] text-base font-normal leading-[1.7] mb-8 font-outfit">
                {currentService.desc}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 border-y border-[#1b2a4a]/10 py-5 mb-8">
                {currentService.stats.map((st, i) => (
                  <div key={i} className="text-left">
                    <div className="text-[#1b2a4a] text-xl sm:text-2xl font-bold font-outfit tracking-tight tabular-nums">{st.value}</div>
                    <div className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.15em] mt-0.5 font-outfit">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-3 mb-8">
                {currentService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#b8972a] shrink-0 mt-0.5" />
                    <span className="text-[#3d4a66] text-[15px] font-medium leading-snug font-outfit">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div>
                <Link 
                  to={currentService.route} 
                  className="border border-[#1b2a4a]/30 hover:border-[#b8972a] text-[#1b2a4a] hover:text-[#b8972a] px-6 py-3 rounded-[2px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors inline-flex items-center gap-3 font-outfit group"
                >
                  <span>Scopri il Servizio</span>
                  <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
                </Link>
              </div>

            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-[2px] overflow-hidden border border-[#1b2a4a]/10 shadow-sm bg-neutral-100 group">
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[#b8972a] text-xs font-medium uppercase tracking-wider mb-1 font-outfit">MBA Progetti</span>
                  <h3 className="text-white text-lg sm:text-xl font-semibold uppercase tracking-tight font-outfit">{currentService.title}</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRE PILASTRI ── */}
      <section className="py-16 md:py-24 bg-[#F9FBFC] border-t border-[#1b2a4a]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[2px] inline-block mb-3 font-outfit">
              IL NOSTRO METODO
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[34px] font-semibold uppercase tracking-tight font-outfit">
              I TRE PILASTRI OPERATIVI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-8 sm:p-10 border border-[#dfe3ea] rounded-[2px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1b2a4a] text-white flex items-center justify-center rounded-[2px] mb-7">
                  <Search size={24} />
                </div>
                <span className="text-[#b8972a] font-mono font-medium text-xs block mb-2 tracking-[0.15em]">FASE 01</span>
                <h3 className="text-[#1b2a4a] text-[17px] font-semibold tracking-[0.05em] uppercase mb-4 font-outfit">ANALIZZIAMO</h3>
                <p className="text-[#3d4a66] text-base leading-[1.7] font-outfit">
                  Esame metodico del disciplinare e del progetto a base di gara per individuare criteri premianti e margini di miglioramento tecnico.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 border border-[#dfe3ea] rounded-[2px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1b2a4a] text-white flex items-center justify-center rounded-[2px] mb-7">
                  <Compass size={24} />
                </div>
                <span className="text-[#b8972a] font-mono font-medium text-xs block mb-2 tracking-[0.15em]">FASE 02</span>
                <h3 className="text-[#1b2a4a] text-[17px] font-semibold tracking-[0.05em] uppercase mb-4 font-outfit">PROGETTIAMO</h3>
                <p className="text-[#3d4a66] text-base leading-[1.7] font-outfit">
                  Sviluppo di soluzioni migliorative su misura, integrando aspetti architettonici, impiantistici, strutturali e di cantiere.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 border border-[#dfe3ea] rounded-[2px] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1b2a4a] text-white flex items-center justify-center rounded-[2px] mb-7">
                  <CheckSquare size={24} />
                </div>
                <span className="text-[#b8972a] font-mono font-medium text-xs block mb-2 tracking-[0.15em]">FASE 03</span>
                <h3 className="text-[#1b2a4a] text-[17px] font-semibold tracking-[0.05em] uppercase mb-4 font-outfit">VALORIZZIAMO</h3>
                <p className="text-[#3d4a66] text-base leading-[1.7] font-outfit">
                  Produzione di documentazione chiara ed immediata per mettere in risalto il valore della proposta davanti alla commissione.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER CONTATTI ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-[#1b2a4a]/10">
        <div className="mb-4">
          <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[2px] inline-block font-outfit">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-[#b8972a] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-[#1b2a4a] text-xl sm:text-2xl md:text-[28px] font-semibold uppercase tracking-tight font-outfit">
              HAI BISOGNO DI SUPPORTO PER UNA GARA O UN PROGETTO?
            </h3>
            <p className="text-[#3d4a66] text-base font-outfit mt-2 leading-[1.7]">
              Richiedi una consulenza tecnica o uno studio di fattibilità con il team di MBA Progetti.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-[#1b2a4a] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-[26px] py-[15px] min-w-[240px] hover:bg-[#b8972a] transition-colors inline-flex items-center justify-between rounded-[2px] shrink-0 font-outfit"
          >
            <span>CONTATTACI</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
