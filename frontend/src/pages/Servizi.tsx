import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Building2, 
  Scan, 
  Layers, 
  ArrowRight, 
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
      <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Seleziona Servizio</span>
          <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
            Le 4 Macro-Aree
          </h2>
        </div>

        {/* Tab Selection Navigation (Sfondo neutro/chiaro anziché blu scuro) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {services.map((s) => {
            const IconComp = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`p-5 rounded-sm text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-white text-navy border-gold shadow-md ring-1 ring-gold/40' 
                    : 'bg-bg-neutral/60 text-navy/70 hover:bg-white hover:text-navy border-navy/10'
                }`}
              >
                <div>
                  <div className={`p-2.5 rounded-sm w-fit mb-3 ${
                    isActive ? 'bg-gold text-white' : 'bg-navy/5 text-navy/70'
                  }`}>
                    <IconComp size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-gold">
                    {s.tag}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight leading-snug">
                    {s.title}
                  </h3>
                </div>
                <div className="mt-4 pt-2 border-t border-navy/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy/60">
                    Seleziona
                  </span>
                  <ChevronRight size={14} className={isActive ? 'text-gold' : 'text-navy/30'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE DISPLAY PANEL */}
        <div className="bg-bg-neutral/40 border border-navy/10 rounded-sm p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.25em] block mb-2">
                {currentService.tag}
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-2">
                {currentService.title}
              </h2>
              <p className="text-navy/60 text-xs font-bold uppercase tracking-wider mb-6">
                {currentService.subtitle}
              </p>

              <p className="text-navy/80 text-sm font-light leading-relaxed mb-6">
                {currentService.desc}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 border-y border-navy/10 py-4 mb-6">
                {currentService.stats.map((st, i) => (
                  <div key={i} className="text-left">
                    <div className="text-navy text-lg sm:text-xl font-bold font-mono tracking-tight">{st.value}</div>
                    <div className="text-gold text-[10px] font-bold uppercase tracking-wider mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5 mb-8">
                {currentService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-navy/80 text-xs sm:text-sm font-light leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button (Bottone pulito senza sfondo blu scuro) */}
              <div>
                <Link to={currentService.route} className="btn-ghost-dark group">
                  Scopri il Servizio <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
              </div>

            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-sm overflow-hidden border border-navy/10 shadow-sm bg-neutral-100">
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-wider mb-1">MBA Progetti</span>
                  <h3 className="text-white text-lg font-bold uppercase tracking-tight">{currentService.title}</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRE PILASTRI ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/50 border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Il Nostro Metodo</span>
            <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
              I Tre Pilastri Operativi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-navy/10 rounded-sm space-y-3">
              <Search size={22} className="text-gold" />
              <span className="text-gold font-mono font-bold text-xs block">01</span>
              <h3 className="text-navy text-base font-bold uppercase tracking-tight">ANALIZZIAMO.</h3>
              <p className="text-navy/70 text-xs leading-relaxed font-light">
                Esame metodico del disciplinare e del progetto a base di gara per individuare criteri premianti e margini di miglioramento tecnico.
              </p>
            </div>

            <div className="bg-white p-6 border border-navy/10 rounded-sm space-y-3">
              <Compass size={22} className="text-gold" />
              <span className="text-gold font-mono font-bold text-xs block">02</span>
              <h3 className="text-navy text-base font-bold uppercase tracking-tight">PROGETTIAMO.</h3>
              <p className="text-navy/70 text-xs leading-relaxed font-light">
                Sviluppo di soluzioni migliorative su misura, integrando aspetti architettonici, impiantistici, strutturali e di cantiere.
              </p>
            </div>

            <div className="bg-white p-6 border border-navy/10 rounded-sm space-y-3">
              <CheckSquare size={22} className="text-gold" />
              <span className="text-gold font-mono font-bold text-xs block">03</span>
              <h3 className="text-navy text-base font-bold uppercase tracking-tight">VALORIZZIAMO.</h3>
              <p className="text-navy/70 text-xs leading-relaxed font-light">
                Produzione di documentazione chiara ed immediata per mettere in risalto il valore della proposta davanti alla commissione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (SENZA BLOCCO BLU) ── */}
      <section className="py-12 md:py-20 bg-white text-navy text-center border-t border-navy/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
            Hai Bisogno di Supporto per una Gara o un Progetto?
          </h2>
          <p className="text-navy/70 text-sm font-light mb-8">
            Richiedi una consulenza tecnica o uno studio di fattibilità con il team di MBA Progetti.
          </p>
          <Link to="/contatti" className="btn-ghost-dark group">
            Richiedi una Consulenza <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </Link>
        </div>
      </section>

    </div>
  );
}
