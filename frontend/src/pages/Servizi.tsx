import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Building2, 
  Scan, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Cpu,
  Compass
} from 'lucide-react';

export default function Servizi() {
  const [activeTab, setActiveTab] = useState('gare');

  const services = [
    {
      id: "gare",
      title: "Gare d'Appalto OEPV",
      subtitle: "Offerte Tecniche Migliorative & Procedura D.Lgs. 36/2023",
      icon: Target,
      tag: "Core Business • Punteggio Massimo",
      route: "/servizi/gare",
      desc: "Redazione di offerte tecniche migliorative e relazioni metodologiche ad alto valore premiale per gare d'appalto pubbliche secondo il criterio dell'Offerta Economicamente Più Vantaggiosa (OEPV).",
      image: "/media/header_2.jpg",
      stats: [
        { label: "Procedure a Podio", value: "63%" },
        { label: "Gare Redatte", value: "+200" },
        { label: "Conformità Normativa", value: "D.Lgs 36/23" }
      ],
      features: [
        "Analisi strategica del disciplinare e dei criteri di valutazione",
        "Redazione di relazioni metodologiche ed elaborati grafici ad alta risoluzione",
        "Proposte migliorative tecniche, ambientali (CAM) ed organizzative",
        "Supporto tecnico per appalti integrati dalla gara all'esecutivo"
      ],
      deliverables: ["Offerta Tecnica Migliorativa", "Relazione Metodologica", "Tavole di Inquadramento Grafico"]
    },
    {
      id: "progettazione",
      title: "Progettazione Integrale & CAM",
      subtitle: "Edilizia Civile, Infrastrutture & Restauro Architectonico",
      icon: Building2,
      tag: "Architettura & Ingegneria",
      route: "/servizi/progettazione",
      desc: "Sviluppo simultaneo e coordinato di architettura, strutture ed impianti per edilizia pubblica e privata, infrastrutture, spazi urbani e restauro conservativo con conformità CAM.",
      image: "/media/header_3.jpg",
      stats: [
        { label: "Ambito Intervento", value: "Civile & Pubblico" },
        { label: "Criteri Ambientali", value: "Conforme CAM" },
        { label: "Coordinamento", value: "Multidisciplinare" }
      ],
      features: [
        "Progettazione di fattibilità tecnico-economica ed esecutiva",
        "Integrazione dei Criteri Ambientali Minimi (CAM) ed efficienza energetica",
        "Trasformazione delle proposte di gara in progetti esecutivi di cantiere",
        "Direzione Lavori e contabilità delle opere pubbliche"
      ],
      deliverables: ["Progetto Esecutivo Integrato", "Computo Metrico Estimativo", "Capitolato Speciale d'Appalto"]
    },
    {
      id: "rilievi",
      title: "Rilievi Digitali 3D & Drone",
      subtitle: "Reality Capture, Laser Scanner & Aerofotogrammetria UAV",
      icon: Scan,
      tag: "Precisione Millimetrica",
      route: "/servizi/rilievi",
      desc: "Acquisizione metrica ad alta precisione del territorio e del costruito mediante laser scanner 3D terricolo, aerofotogrammetria con drone (UAV) e stazioni GPS topografiche GNSS RTK.",
      image: "/media/team_rilievi.jpg",
      stats: [
        { label: "Tolleranza Metrica", value: "< 8 mm" },
        { label: "Rete Topografica", value: "GNSS RTK" },
        { label: "Accuratezza Cloud", value: "Millimetrica" }
      ],
      features: [
        "Rilievi Laser Scanner 3D ad alta densità per fabbricati e complessi storici",
        "Aerofotogrammetria UAV per coperture, grandi superfici e aree impervie",
        "Mappatura vettoriale del degrado prospettico e del quadro fessurativo",
        "Restituzione di ortofoto digitali georeferenziate e modelli DTM/DEM"
      ],
      deliverables: ["Nuvola di Punti 3D (E57/PTS)", "Tavole CAD 2D As-Built", "Ortofotomappe Georeferenziate"]
    },
    {
      id: "bim",
      title: "Modellazione BIM & HBIM",
      subtitle: "Scan-to-BIM, Coordinamento Disciplinare & As-Built",
      icon: Layers,
      tag: "Digital Twin & Revit",
      route: "/servizi/bim",
      desc: "Gestione, coordinamento e condivisione delle informazioni di progetto attraverso la modellazione parametrica 3D in ambiente BIM (Autodesk Revit / IFC) per nuove opere e beni culturali (HBIM).",
      image: "/media/portfolio/p08.png",
      stats: [
        { label: "Standard BIM", value: "IFC / ISO 19650" },
        { label: "Modellazione", value: "Scan-to-BIM" },
        { label: "Ambiente", value: "Autodesk Revit" }
      ],
      features: [
        "Conversione diretta dalla nuvola di punti a modello parametrico Scan-to-BIM",
        "Coordinamento interdisciplinare (Architettonico, Strutturale, Impiantistico)",
        "Modellazione HBIM con famiglie adattive custom per complessi monumentali",
        "Modelli As-Built BIM per l'Asset Management e la gestione manutentiva"
      ],
      deliverables: ["Modello Informativo 3D (IFC/RVT)", "Report Clash Detection", "Abachi & Computi Parametrici"]
    }
  ];

  const attServizioAttivo = services.find(s => s.id === activeTab) || services[0];

  const workflowSteps = [
    {
      step: '01',
      title: 'Acquisizione Reale (Rilievo 3D)',
      desc: 'Cattura metrica dello stato di fatto con Laser Scanner 3D e Drone UAV.',
      icon: Scan
    },
    {
      step: '02',
      title: 'Digitalizzazione (Scan-to-BIM)',
      desc: 'Conversione dei dati reali in modelli parametrici informativi coordinati.',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Strategia Premiale (Gara OEPV)',
      desc: 'Sviluppo dell\'offerta tecnica migliorativa orientata al punteggio massimo.',
      icon: Target
    },
    {
      step: '04',
      title: 'Esecuzione & Cantiere (Progetto)',
      desc: 'Trasposizione esecutiva in cantiere con Direzione Lavori e controllo qualità.',
      icon: Compass
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── SERVIZI HERO (SFONDO BLU & TESTO TUTTO BIANCO) ── */}
      <section className="relative min-h-[65vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Services background"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-8 group hover:border-gold transition-colors cursor-default">
              <Sparkles className="w-4 h-4 text-white group-hover:text-gold transition-colors" />
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Competenze Multidisciplinari Integrate</span>
            </div>

            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-8">
              I Nostri <br /> <span className="text-white font-serif italic lowercase tracking-normal text-4xl sm:text-6xl">servizi</span> specialistici.
            </h1>

            <p className="text-white/80 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
               Dall'offerta tecnica per le gare d'appalto alla progettazione integrale, dai rilievi laser scanner 3D al coordinamento BIM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRODUZIONE STRATEGICA ── */}
      <section className="pt-16 md:pt-24 px-6 max-w-7xl mx-auto text-center">
         <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-bg-neutral border-l-4 border-gold p-8 rounded-r-sm text-left shadow-sm">
               <p className="text-navy text-lg md:text-xl font-light italic leading-relaxed">
                  "L'integrazione tra la profonda conoscenza dei criteri di gara OEPV, la progettazione esecutiva e le più moderne tecnologie di rilievo 3D e BIM costituisce la nostra identità e la garanzia per i nostri clienti."
               </p>
               <span className="text-gold text-xs font-bold uppercase tracking-wider block mt-4">— MBA Studio Tecnico Professionale</span>
            </div>

            <p className="text-text-main text-base md:text-lg font-light leading-relaxed">
               I nostri servizi sono progettati per operare in sinergia. Che si tratti di massimizzare il punteggio tecnico in una procedura d'appalto, sviluppare un progetto esecutivo conforme ai CAM o digitalizzare uno stato di fatto complesso, forniamo un supporto metodologico rigoroso e multidisciplinare.
            </p>
            <div className="w-16 h-px bg-gold mx-auto pt-2" />
         </div>
      </section>

      {/* ── INTERACTIVE SERVICE SELECTOR SUITE ── */}
      <section className="py-16 md:py-28 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Esplora la Suite Servizi</span>
               <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Soluzioni su Misura per Imprese e PA.
               </h2>
            </div>

            {/* TAB SELECTORS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
               {services.map((s) => {
                  const IconComp = s.icon;
                  const isActive = activeTab === s.id;
                  return (
                     <button
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`p-5 text-left border rounded-sm transition-all duration-300 flex flex-col justify-between group ${
                           isActive 
                              ? 'bg-navy border-navy text-white shadow-md' 
                              : 'bg-bg-neutral border-navy/10 text-navy hover:border-gold hover:bg-white'
                        }`}
                     >
                        <div className="flex items-center justify-between mb-4">
                           <div className={`p-2.5 rounded-sm transition-colors ${
                              isActive ? 'bg-gold text-navy' : 'bg-white border border-gold/20 text-gold group-hover:bg-gold group-hover:text-navy'
                           }`}>
                              <IconComp size={20} />
                           </div>
                           <span className={`font-mono text-xs font-bold ${isActive ? 'text-gold' : 'text-navy/40'}`}>
                              0{services.indexOf(s) + 1}
                           </span>
                        </div>
                        <div>
                           <h3 className={`text-sm font-bold uppercase tracking-tight ${isActive ? 'text-white' : 'text-navy'}`}>
                              {s.title}
                           </h3>
                           <span className={`text-[10px] block mt-1 font-mono ${isActive ? 'text-white/70' : 'text-navy/50'}`}>
                              {s.tag}
                           </span>
                        </div>
                     </button>
                  );
               })}
            </div>

            {/* ACTIVE TAB DISPLAY PANEL */}
            <AnimatePresence mode="wait">
               <motion.div
                  key={attServizioAttivo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-bg-neutral border border-navy/10 rounded-sm overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12"
               >
                  <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
                     <div>
                        <div className="inline-flex items-center gap-2 bg-white border border-navy/10 px-3 py-1 rounded-full mb-6">
                           <ShieldCheck size={14} className="text-gold" />
                           <span className="text-navy text-[11px] font-bold uppercase tracking-wider">{attServizioAttivo.tag}</span>
                        </div>

                        <h3 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-2">
                           {attServizioAttivo.title}
                        </h3>
                        <p className="text-gold font-semibold text-xs uppercase tracking-wider mb-4">
                           {attServizioAttivo.subtitle}
                        </p>
                        
                        <p className="text-text-main text-sm md:text-base font-light leading-relaxed mb-8">
                           {attServizioAttivo.desc}
                        </p>

                        {/* STATS HIGHLIGHT */}
                        <div className="grid grid-cols-3 gap-4 border-y border-navy/10 py-6 mb-8 bg-white/60 p-4 rounded-sm">
                           {attServizioAttivo.stats.map((st, i) => (
                              <div key={i}>
                                 <span className="text-gold font-mono font-bold text-lg block">{st.value}</span>
                                 <span className="text-navy/60 text-[10px] font-medium uppercase block">{st.label}</span>
                              </div>
                           ))}
                        </div>

                        {/* FEATURES LIST */}
                        <div className="space-y-3 mb-8">
                           <h4 className="text-navy text-xs font-bold uppercase tracking-wider">Attività Chiave e Vantaggi:</h4>
                           {attServizioAttivo.features.map((f, i) => (
                              <div key={i} className="flex items-start gap-3 text-xs text-navy/80">
                                 <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                                 <span>{f}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-4 border-t border-navy/10 flex flex-col sm:flex-row items-center gap-4">
                        <Link to={attServizioAttivo.route} className="btn-ghost-dark w-full sm:w-auto inline-flex items-center gap-3">
                           Approfondisci {attServizioAttivo.title} <ArrowRight size={16} />
                        </Link>
                        <Link to="/contatti" className="btn-ghost-gold w-full sm:w-auto text-center">
                           Richiedi Preventivo
                        </Link>
                     </div>
                  </div>

                  <div className="lg:col-span-5 relative min-h-[350px] bg-navy overflow-hidden">
                     <img 
                        src={attServizioAttivo.image} 
                        alt={attServizioAttivo.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-85"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                     
                     <div className="absolute bottom-6 left-6 right-6 p-6 bg-navy/90 backdrop-blur-sm border border-white/10 rounded-sm text-white space-y-3">
                        <span className="text-gold text-[10px] font-bold uppercase tracking-widest block">Output & Elaborati Consegnati</span>
                        <div className="space-y-1.5">
                           {attServizioAttivo.deliverables.map((d, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                                 <FileText size={14} className="text-gold" /> {d}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>
      </section>

      {/* ── WORKFLOW MULTIDISCIPLINARE INTEGRATO ── */}
      <section className="py-16 md:py-28 bg-navy text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Sinergia dei Servizi</span>
               <h2 className="text-white text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Il Nostro Processo Multidisciplinare.
               </h2>
               <p className="text-white/70 text-sm font-light max-w-2xl mx-auto mt-4">
                  Come colleghiamo il rilievo sul campo alla modellazione informatica ed alla vittoria nelle gare d'appalto.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {workflowSteps.map((ws) => {
                  const IconC = ws.icon;
                  return (
                     <div key={ws.step} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-gold/60 transition-all space-y-4 group">
                        <div className="flex items-center justify-between">
                           <span className="text-gold font-mono font-bold text-2xl">{ws.step}</span>
                           <div className="p-3 bg-white/10 text-gold rounded-sm group-hover:bg-gold group-hover:text-navy transition-colors">
                              <IconC size={22} />
                           </div>
                        </div>
                        <h3 className="text-white text-base font-bold uppercase tracking-tight">{ws.title}</h3>
                        <p className="text-white/60 text-xs font-light leading-relaxed">{ws.desc}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── LISTA SERVIZI CON CARTE DETTAGLIATE ── */}
      <section className="py-16 md:py-28 bg-bg-neutral">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Dettaglio Servizi</span>
               <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Schede di Approfondimento.
               </h2>
            </div>

            <div className="space-y-12">
               {services.map((s, index) => {
                  const IconComponent = s.icon;
                  return (
                     <div key={s.id} className="bg-white border border-navy/10 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-between">
                           <div>
                              <div className="flex items-center justify-between mb-6">
                                 <span className="text-gold font-mono font-bold text-sm">SERVIZIO 0{index + 1}</span>
                                 <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-bg-neutral rounded-full text-navy border border-navy/5">
                                    {s.tag}
                                 </span>
                              </div>
                              <h3 className="text-navy text-2xl font-bold uppercase tracking-tight mb-2">{s.title}</h3>
                              <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-4">{s.subtitle}</p>
                              <p className="text-text-main text-sm font-light leading-relaxed mb-6">{s.desc}</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 border-t border-navy/5 pt-6">
                                 {s.features.map((f, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs text-navy/80">
                                       <ChevronRight size={14} className="text-gold shrink-0 mt-0.5" />
                                       <span>{f}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-navy/10 pt-6">
                              <Link to={s.route} className="btn-ghost-dark w-full sm:w-auto inline-flex items-center gap-2">
                                 Scopri di Più <ArrowRight size={16} />
                              </Link>
                           </div>
                        </div>

                        <div className="lg:col-span-4 bg-navy relative min-h-[250px] overflow-hidden">
                           <img 
                              src={s.image} 
                              alt={s.title}
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80"
                           />
                           <div className="absolute inset-0 bg-navy/30" />
                           <div className="absolute top-6 right-6 p-3 bg-navy text-gold rounded-sm border border-gold/30">
                              <IconComponent size={24} />
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6 border-t border-navy/5">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
               Richiedi una Consulenza <br /> o un Preventivo.
            </h2>
            <p className="text-text-main text-sm md:text-base font-light mb-12">
               Il nostro team è a disposizione per analizzare i disciplinari di gara, pianificare campagne di rilievo 3D o sviluppare modelli BIM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/contatti" className="btn-ghost-dark px-10 py-5 w-full sm:w-auto justify-center inline-flex items-center gap-3">
                  Contatta lo Studio <ArrowRight size={18} />
               </Link>
               <Link to="/portfolio" className="btn-ghost-gold px-10 py-5 w-full sm:w-auto justify-center text-center">
                  Vedi i Nostri Progetti
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
