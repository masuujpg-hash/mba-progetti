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
  Compass,
  Search,
  CheckSquare
} from 'lucide-react';

export default function Servizi() {
  const [activeTab, setActiveTab] = useState('gare');

  const services = [
    {
      id: "gare",
      title: "Gare d'Appalto OEPV",
      subtitle: "Redazione di offerte tecniche migliorative per procedure OEPV. Dall'analisi del disciplinare alla consegna dell'offerta.",
      icon: Target,
      tag: "Core Business",
      route: "/servizi/gare",
      desc: "Dal 2019, MBA Progetti affianca le imprese nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche aggiudicate secondo il criterio dell'offerta economicamente più vantaggiosa (OEPV). Analizziamo i documenti di gara per individuare con precisione i margini di miglioramento tecnico, sviluppando proposte fondate su metodo, chiarezza e coerenza con i criteri di valutazione.",
      extraDesc: "Ogni procedura è affrontata come un progetto: con un'analisi iniziale, una strategia condivisa con l'impresa e una produzione documentale orientata alla massimizzazione del punteggio tecnico. Lo studio supporta le imprese anche nelle procedure per appalti integrati, garantendo continuità tecnica dall'offerta migliorativa alla progettazione esecutiva.",
      image: "/media/header_2.jpg",
      stats: [
        { label: "Gare Redatte", value: "+200" },
        { label: "Gare sul Podio", value: "63%" },
        { label: "Gare Aggiudicate", value: "38%" }
      ],
      features: [
        "Analisi metodologica del disciplinare e dei criteri di valutazione",
        "Sviluppo di proposte migliorative tecniche, ambientali (CAM) ed organizzative",
        "Redazione di relazioni tecniche orientate alla massimizzazione del punteggio",
        "Supporto tecnico per appalti integrati dall'offerta alla progettazione esecutiva"
      ],
      steps: [
        "1. Scelta della gara",
        "2. Valutazione investimento",
        "3. Analisi disciplinare",
        "4. Sopralluogo",
        "5. Studio progetto",
        "6. Valutazione migliorie",
        "7. Redazione offerta",
        "8. Editing e consegna"
      ],
      ambiti: [
        "Edilizia scolastica", "Strutture assistenziali", "Strutture e PA", 
        "Strutture sportive", "Edilizia residenziale", "Infrastrutture", 
        "Manutenzione", "Strutture ricettive", "Strutture polivalenti", "Edifici storici"
      ]
    },
    {
      id: "progettazione",
      title: "Progettazione Integrale & CAM",
      subtitle: "Progettazione architettonica, esecutiva e post-aggiudicazione. Dalla gara alla realizzazione.",
      icon: Building2,
      tag: "Architettura & Ingegneria",
      route: "/servizi/progettazione",
      desc: "MBA Progetti affianca imprese e committenti in tutte le fasi del processo edilizio, dalla redazione del progetto definitivo alla direzione lavori, con un approccio tecnico fondato sulla qualità costruttiva, la sostenibilità ambientale e il rispetto dei Criteri Ambientali Minimi (CAM).",
      extraDesc: "La coordinazione simultanea di architettura, struttura ed impianti garantisce l'efficienza esecutiva, il controllo dei costi e la perfetta aderenza tra le proposte di gara e il cantiere.",
      image: "/media/header_3.jpg",
      stats: [
        { label: "Normativa", value: "CAM & D.Lgs 36/23" },
        { label: "Approccio", value: "Multidisciplinare" },
        { label: "Controllo", value: "Costi & Tempi" }
      ],
      features: [
        "Edilizia e architettura: Edifici, spazi e interventi di recupero funzionali e attenti alla qualità costruttiva.",
        "Infrastrutture e spazi pubblici: Opere sostenibili e durevoli, coerenti con i CAM e l'accessibilità.",
        "Progetti post-aggiudicazione: Trasformazione delle offerte migliorative in progetti esecutivi di cantiere.",
        "Direzione lavori: Controllo metodico del cantiere per garantire il rispetto di tempi, costi e qualità esecutiva.",
        "Interior design: Progettazione degli interni come naturale estensione del progetto architettonico."
      ],
      deliverables: ["Progetto Esecutivo Integrato", "Computo Metrico Estimativo", "Capitolato Speciale d'Appalto"]
    },
    {
      id: "rilievi",
      title: "Rilievi Digitali 3D & Drone",
      subtitle: "Rilievo integrato con laser scanner 3D, drone e GPS. Documentazione as-built per progettazione e recupero.",
      icon: Scan,
      tag: "Precisione Millimetrica",
      route: "/servizi/rilievi",
      quote: "Documentare con precisione è il primo passo per intervenire con qualità.",
      desc: "Rileviamo edifici, infrastrutture e spazi con tecnologie di precisione, restituendo una documentazione completa e affidabile dello stato di fatto. I dati acquisiti costituiscono la base per progettazione, recupero, modellazione BIM e monitoraggio strutturale.",
      image: "/media/team_rilievi.jpg",
      stats: [
        { label: "Laser Scanner 3D", value: "Leica BLK360" },
        { label: "Drone Aerofotogrammetria", value: "DJI Mavic 3E" },
        { label: "Topografia Georeferenziata", value: "GPS ProTRACK" }
      ],
      features: [
        "Laser Scanner 3D Leica BLK360: Nuvole di punti millimetriche per edifici storici e complessi.",
        "Drone DJI Mavic 3 Enterprise: Rilievi aerofotogrammetrici georeferenziati per coperture e facciate.",
        "GPS ProTRACK: Rilievi topografici e tracciamenti planimetrici e altimetrici ad alta precisione.",
        "Georadar (GPR): Indagini nel sottosuolo per mappare cavidotti e strutture interrate."
      ],
      ambiti: [
        "Edifici storici e civili", "Infrastrutture", "Spazi pubblici", 
        "Strutture industriali", "Aree non accessibili", "Rilievi strutturali"
      ]
    },
    {
      id: "bim",
      title: "Modellazione BIM & Scan to BIM",
      subtitle: "Modellazione informativa, coordinamento disciplinare e Scan to BIM. Qualità e precisione in ogni fase.",
      icon: Layers,
      tag: "Digital Twin",
      route: "/servizi/bim",
      quote: "La qualità di un progetto si misura anche nella precisione delle informazioni che lo descrivono.",
      desc: "Il Building Information Modeling è il processo con cui gestiamo, coordiniamo e condividiamo le informazioni di un progetto in modo integrato e trasparente. MBA Progetti applica la metodologia BIM nelle fasi di progettazione, rilievo e redazione delle offerte tecniche, garantendo coerenza e controllo lungo tutto il processo.",
      image: "/media/portfolio/p08.png",
      stats: [
        { label: "Integrazione", value: "Scan to BIM" },
        { label: "Coordinamento", value: "Multi-disciplinare" },
        { label: "Finalità", value: "As-Built BIM" }
      ],
      features: [
        "Modellazione e coordinamento: Modelli informatici architettonici, strutturali ed impiantistici integrati senza interferenze.",
        "BIM per le gare d'appalto: Elaborati grafici precisi e documentazione conforme ai livelli informativi richiesti dai disciplinari OEPV.",
        "Scan to BIM: Generazione di modelli parametrici BIM (e HBIM per edifici storici) partendo da nuvole di punti.",
        "As-Built BIM: Aggiornamento del modello digitale al termine dei lavori per la gestione e manutenzione futura dell'edificio."
      ],
      deliverables: ["Modello Informativo 3D (IFC/RVT)", "Report Coordinamento Disciplinare", "Scan to BIM / HBIM"]
    }
  ];

  const currentService = services.find(s => s.id === activeTab) || services[0];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── SERVIZI HERO (SFONDO BLU & TESTO TUTTO BIANCO) ── */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Servizi"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          {/* Sfumatura blu originale */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-4 block opacity-90">
              Le Competenze di MBA Progetti
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter mb-6 leading-tight">
              I Nostri Servizi.
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Le competenze di MBA Progetti si articolano in quattro ambiti che si integrano e si completano. Al centro c'è la redazione di offerte tecniche migliorative per gare d'appalto pubbliche, affiancata da progettazione, rilievi 3D e BIM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTERACTIVE SUITE SWITCHER ── */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-3 block">Esplora le Competenze</span>
          <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
            I 4 Pilastri dello Studio
          </h2>
        </div>

        {/* Tab Selection Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {services.map((s) => {
            const IconComp = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`p-5 md:p-6 rounded-sm text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-navy text-white border-navy shadow-md' 
                    : 'bg-bg-neutral/60 text-navy hover:bg-navy/5 border-navy/10'
                }`}
              >
                <div>
                  <div className={`p-3 rounded-sm w-fit mb-4 ${
                    isActive ? 'bg-gold text-navy' : 'bg-navy/10 text-navy'
                  }`}>
                    <IconComp size={22} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    isActive ? 'text-gold' : 'text-gold'
                  }`}>
                    {s.tag}
                  </span>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-tight leading-snug">
                    {s.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-navy/50'}`}>
                    Dettagli
                  </span>
                  <ChevronRight size={14} className={isActive ? 'text-gold' : 'text-navy/40'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE DISPLAY PANEL */}
        <div className="bg-bg-neutral/40 border border-navy/10 rounded-sm p-6 sm:p-10 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-block bg-gold/15 border border-gold/30 text-navy text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-sm mb-4">
                {currentService.tag}
              </div>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-tight mb-3">
                {currentService.title}
              </h2>
              <p className="text-gold text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                {currentService.subtitle}
              </p>

              {currentService.quote && (
                <div className="bg-white border-l-4 border-gold p-4 mb-6 text-navy/80 italic text-sm font-serif">
                  "{currentService.quote}"
                </div>
              )}

              <p className="text-navy/80 text-sm md:text-base font-light leading-relaxed mb-4">
                {currentService.desc}
              </p>

              {currentService.extraDesc && (
                <p className="text-navy/70 text-xs md:text-sm font-light leading-relaxed mb-8">
                  {currentService.extraDesc}
                </p>
              )}

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 border-y border-navy/10 py-6 mb-8">
                {currentService.stats.map((st, i) => (
                  <div key={i} className="text-left">
                    <div className="text-navy text-xl sm:text-2xl font-bold font-mono tracking-tight">{st.value}</div>
                    <div className="text-navy/50 text-[10px] font-bold uppercase tracking-wider mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-3 mb-8">
                <h4 className="text-navy text-xs font-bold uppercase tracking-wider mb-2">Caratteristiche & Metodologia:</h4>
                {currentService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-navy/80 text-xs sm:text-sm font-light leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Process Steps (for Gare) */}
              {currentService.steps && (
                <div className="mb-8 bg-white p-5 border border-navy/10 rounded-sm">
                  <h4 className="text-navy text-xs font-bold uppercase tracking-wider mb-3">Processo in 8 Step (Come Lavoriamo):</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {currentService.steps.map((st, i) => (
                      <div key={i} className="text-[11px] font-medium text-navy/80 bg-bg-neutral p-2 rounded-sm border border-navy/5">
                        {st}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ambiti di intervento (if present) */}
              {currentService.ambiti && (
                <div className="mb-8">
                  <h4 className="text-navy text-xs font-bold uppercase tracking-wider mb-3">Ambiti di Intervento:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentService.ambiti.map((amb, i) => (
                      <span key={i} className="bg-white text-navy text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-navy/10 rounded-sm">
                        {amb}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <Link to={currentService.route} className="btn-ghost-dark group">
                  Approfondisci {currentService.title} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
              </div>

            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-navy/10 shadow-md bg-navy">
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-wider mb-1">MBA Progetti</span>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">{currentService.title}</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── METODO MULTIDISCIPLINARE INTEGRATO ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/60 border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-3 block">Metodo & Competenze</span>
            <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter">
              Tre Pilastri Operativi
            </h2>
            <p className="text-navy/70 text-sm font-light leading-relaxed mt-3">
              I tre pilastri del metodo lavorativo adottato dallo studio MBA Progetti in ogni commessa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-navy/10 rounded-sm space-y-4 shadow-sm">
              <div className="p-3 bg-navy text-gold w-fit rounded-sm">
                <Search size={24} />
              </div>
              <span className="text-gold font-mono font-bold text-sm block">01</span>
              <h3 className="text-navy text-lg font-bold uppercase tracking-tight">ANALIZZIAMO.</h3>
              <p className="text-navy/70 text-xs leading-relaxed font-light">
                Ogni disciplinare e progetto posto a base di gara vengono esaminati con metodo per individuare criteri premianti, vincoli tecnici e margini di miglioramento. L'analisi è la base su cui si costruisce un'offerta fondata, coerente e competitiva.
              </p>
            </div>

            <div className="bg-white p-8 border border-navy/10 rounded-sm space-y-4 shadow-sm">
              <div className="p-3 bg-navy text-gold w-fit rounded-sm">
                <Compass size={24} />
              </div>
              <span className="text-gold font-mono font-bold text-sm block">02</span>
              <h3 className="text-navy text-lg font-bold uppercase tracking-tight">PROGETTIAMO.</h3>
              <p className="text-navy/70 text-xs leading-relaxed font-light">
                Elaboriamo soluzioni migliorative basate su coerenza tecnica e fattibilità operativa. Ogni proposta integra aspetti architettonici, impiantistici, strutturali e di cantiere, per assicurare qualità esecutiva e piena aderenza ai criteri di valutazione.
              </p>
            </div>

            <div className="bg-white p-8 border border-navy/10 rounded-sm space-y-4 shadow-sm">
              <div className="p-3 bg-navy text-gold w-fit rounded-sm">
                <CheckSquare size={24} />
              </div>
              <span className="text-gold font-mono font-bold text-sm block">03</span>
              <h3 className="text-navy text-lg font-bold uppercase tracking-tight">VALORIZZIAMO.</h3>
              <p className="text-navy/70 text-xs leading-relaxed font-light">
                Trasformiamo i contenuti tecnici in documentazione chiara e immediatamente valutabile. Ogni offerta è organizzata per mettere in evidenza il merito progettuale e agevolare il lavoro della commissione giudicatrice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-24 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Contattaci</span>
          <h2 className="text-white text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-tight mb-6">
            Hai Bisogno di Supporto per una Gara o un Progetto?
          </h2>
          <p className="text-white/80 text-sm md:text-base font-light mb-10">
            Richiedi una consulenza tecnica o uno studio di fattibilità direttamente con il team di MBA Progetti.
          </p>
          <Link to="/contatti" className="btn-ghost-white group">
            Richiedi una Consulenza <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </Link>
        </div>
      </section>

    </div>
  );
}
