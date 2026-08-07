import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scan,
  Plane,
  Satellite,
  Radio,
  Layers,
  Building2,
  MapPin,
  ChevronRight,
  FileText,
  Box,
  Compass,
  Crosshair,
  ShieldAlert,
  Ruler
} from 'lucide-react';

export default function Rilievi() {
  const strumentazione = [
    { 
       id: '01', 
       title: 'Drone DJI Mavic 3 Enterprise', 
       subtitle: 'Rilievo Aerofotogrammetrico',
       desc: 'Rilievi aerofotogrammetrici ad alta risoluzione. Immagini georeferenziate di edifici, facciate e territori complessi con precisione centimetrica e restituzione di ortomosaici DTM/DEM.', 
       img: '/media/drone_rilievi.png',
       icon: Plane
    },
    { 
       id: '02', 
       title: 'Laser Scanner 3D Leica BLK360', 
       subtitle: 'Nuvola di Punti Millimetrica',
       desc: 'Acquisizione rapida di nuvole di punti ad altissima densità e precisione millimetrica dello stato di fatto. Ideale per edifici storici, beni vincolati, strutture complesse e spazi articolati.', 
       img: '/media/laser_rilievi.png',
       icon: Scan
    },
    { 
       id: '03', 
       title: 'GPS Topografico ProTRACK', 
       subtitle: 'Georeferenziazione Centimetrica',
       desc: 'Rilievi topografici di inquadramento e tracciamenti plani-altimetrici georeferenziati con estrema precisione. Rete di capisaldi e punti di controllo a terra (GCP).', 
       img: '/media/vt08f_rilievi.webp',
       icon: Satellite
    },
    { 
       id: '04', 
       title: 'Georadar (GPR)', 
       subtitle: 'Indagini Sottosuolo Non Distruttive',
       desc: 'Indagini elettromagnetiche nel sottosuolo per mappare cavidotti, reti di sottoservizi, strutture interrate ed elementi nascosti non rilevabili otticamente.', 
       img: '/media/blk360_rilievi.webp',
       icon: Radio
    }
  ];

  const ambitiRilievo = [
    { title: "Edifici storici e civili", desc: "Rilievo di facciate complesse, elementi decorativi e beni vincolati per il restauro ed l'HBIM.", icon: Building2 },
    { title: "Infrastrutture", desc: "Digitalizzazione 3D di ponti, viadotti, gallerie, percorsi viari ed opere d'arte ingegneristiche.", icon: Compass },
    { title: "Spazi pubblici e parchi", desc: "Topografia di inquadramento urbano, rilievi altimetrici di piazze e verde pubblico.", icon: MapPin },
    { title: "Strutture industriali", desc: "Rilievo di complessi produttivi, impianti tecnologici, condotte ed as-built di fabbricati.", icon: Layers },
    { title: "Aree non accessibili", desc: "Ispezione remota e aerofotogrammetria per zone impervie, coperture e strutture a rischio.", icon: ShieldAlert },
    { title: "Rilievi strutturali", desc: "Mappatura del quadro fessurativo, dei cinematismi di dissesto e dei quadri di degrado.", icon: Ruler }
  ];

  const outputConsegnabili = [
    {
      step: '01',
      title: 'Nuvola di Punti 3D (Point Cloud)',
      desc: 'Dataset georeferenziato ad altissima densità nei formati standard aperti (E57, LAS, PTS) per misurazioni dirette e verifica delle geometrie.',
      icon: Box
    },
    {
      step: '02',
      title: 'Tavole CAD 2D As-Built',
      desc: 'Restituzione vettoriale bidimensionale completa di piante ad ogni quota, sezioni longitudinali/trasversali, prospetti e dettagli quotati.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Modelli Parametrici Scan-to-BIM',
      desc: 'Modellazione informativa 3D in ambiente BIM (Revit/IFC) partendo dalla nuvola di punti per la progettazione e l\'HBIM storico.',
      icon: Layers
    },
    {
      step: '04',
      title: 'Ortomosaici & Modelli Terreno (DTM/DEM)',
      desc: 'Mappe fotogrammetriche ad alta risoluzione ortorettificate, curve di livello e modelli digitali del terreno georeferenziati.',
      icon: Crosshair
    }
  ];

  const fasiWorkflow = [
    { step: '01', title: 'Pianificazione & Rete GCP', desc: 'Sopralluogo preliminare e posizionamento dei capisaldi topografici georeferenziati.' },
    { step: '02', title: 'Acquisizione Multimodale', desc: 'Scansioni laser 3D a terra e voli fotogrammetrici con drone integrati sul campo.' },
    { step: '03', title: 'Processamento & Registration', desc: 'Unione delle scansioni millimetriche, pulizia nuvole di punti e controllo scarti.' },
    { step: '04', title: 'Restituzione Vettoriale & BIM', desc: 'Estrazione degli elaborati grafici 2D ed eventuale modellazione parametrica 3D.' }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/team_rilievi.jpg" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Rilievi Digitali"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-6 block">Reality Capture & Topografia di Precisione</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-6">
                Rilievi <br className="sm:hidden" /> Digitali.
             </h1>
             <p className="text-white/70 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Dal dato reale al modello digitale. Acquisizioni ad altissima precisione per l'architettura, le infrastrutture ed il cantiere.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── CITAZIONE & INTRODUZIONE ── */}
      <section className="pt-16 md:pt-32 px-6 max-w-7xl mx-auto">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="bg-bg-neutral border-l-4 border-gold p-8 rounded-r-sm text-left shadow-sm">
               <p className="text-navy text-xl md:text-2xl font-light italic leading-relaxed">
                  "Documentare con precisione è il primo passo per intervenire con qualità."
               </p>
            </div>
            
            <p className="text-text-main text-base md:text-lg font-light leading-relaxed text-center">
               Rileviamo edifici, infrastrutture e spazi con tecnologie di precisione, restituendo una documentazione completa e affidabile dello stato di fatto. I dati acquisiti costituiscono la base inscindibile per la progettazione esecutiva, il recupero architettonico, la modellazione BIM e il monitoraggio strutturale.
            </p>
            <div className="w-16 h-px bg-gold mx-auto pt-4" />
         </div>
      </section>

      {/* ── STRUMENTAZIONE ED ATTREZZATURE (SEZIONE 3.3 HTML) ── */}
      <section className="py-16 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Strumentazione d'Avanguardia</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Tecnologie per la Cattura del Reale.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {strumentazione.map((device, i) => {
                  const IconComponent = device.icon;
                  return (
                     <motion.div 
                        key={device.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="group flex flex-col bg-bg-neutral border border-navy/5 rounded-sm overflow-hidden hover:border-gold transition-all duration-500 shadow-sm hover:shadow-md"
                     >
                        <div className="aspect-square bg-white p-6 flex items-center justify-center overflow-hidden relative">
                           <img 
                              src={device.img} 
                              alt={device.title}
                              className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                           />
                           <div className="absolute top-4 right-4 p-2 bg-navy/5 text-gold rounded-sm group-hover:bg-gold group-hover:text-navy transition-colors">
                              <IconComponent size={20} />
                           </div>
                        </div>
                        <div className="p-6 text-left flex-1 flex flex-col justify-between border-t border-navy/5">
                           <div>
                              <span className="text-gold text-xs font-mono font-bold mb-2 block">{device.id}</span>
                              <h3 className="text-navy text-lg font-bold uppercase tracking-tight mb-1 group-hover:text-gold transition-colors">{device.title}</h3>
                              <span className="text-navy/50 text-[11px] font-semibold uppercase tracking-wider block mb-3">{device.subtitle}</span>
                              <p className="text-text-main text-xs font-light leading-relaxed">
                                 {device.desc}
                              </p>
                           </div>
                        </div>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── OUTPUT & ELABORATI CONSEGNATI ── */}
      <section className="py-16 md:py-32 bg-bg-neutral border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Consegnabili Tecnologici</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Cosa Restituiamo al Cliente.
               </h2>
               <p className="text-text-main text-sm font-light max-w-2xl mx-auto mt-4 leading-relaxed">
                  Dati vettoriali, nuvole di punti e modelli informativi pronti per l'integrazione immediata nei software di progettazione.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {outputConsegnabili.map((item, index) => {
                  const IconComp = item.icon;
                  return (
                     <div key={index} className="bg-white p-8 border border-navy/5 rounded-sm shadow-sm hover:shadow-md transition-all space-y-4 group">
                        <div className="flex items-center justify-between">
                           <span className="text-gold font-mono font-bold text-lg">{item.step}</span>
                           <div className="p-2 bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy transition-colors rounded-sm">
                              <IconComp size={20} />
                           </div>
                        </div>
                        <h3 className="text-navy text-base font-bold uppercase tracking-tight leading-snug">{item.title}</h3>
                        <p className="text-text-main text-xs font-light leading-relaxed">{item.desc}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── COSA RILEVIAMO (AMBITI DI APPLICAZIONE) ── */}
      <section className="py-16 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Ambiti applicativi</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Cosa Rileviamo.
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {ambitiRilievo.map((item, idx) => {
                  const IconC = item.icon;
                  return (
                     <div key={idx} className="bg-bg-neutral p-6 rounded-sm border border-navy/5 flex flex-col items-start hover:border-gold/50 transition-all group">
                        <div className="p-3 bg-white border border-gold/20 text-gold mb-4 rounded-sm group-hover:bg-gold group-hover:text-navy transition-colors">
                           <IconC size={24} />
                        </div>
                        <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                        <p className="text-text-main text-xs font-light leading-relaxed">{item.desc}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── WORKFLOW IN 4 FASI ── */}
      <section className="py-16 md:py-32 bg-bg-neutral border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Processo Operativo</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Il Workflow del Rilievo Integrato.
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {fasiWorkflow.map((item, index) => (
                  <div key={index} className="border-t-2 border-navy/10 pt-6 hover:border-gold transition-colors space-y-3">
                     <span className="text-gold font-mono text-3xl font-bold block">{item.step}</span>
                     <h3 className="text-navy text-base font-bold uppercase tracking-tight">{item.title}</h3>
                     <p className="text-text-main text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── VISIONE & FOCUS STANDARDS ── */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-navy text-white">
         <div className="absolute inset-0 z-0">
            <img 
               src="/media/portfolio/p03.webp" 
               className="w-full h-full object-cover grayscale brightness-[0.25]" 
               alt="Background Precisione"
            />
            <div className="absolute inset-0 bg-navy/70" />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-16"
            >
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro Standard</span>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Precisione Millimetrica per la Modellazione.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Scan size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Laser Scanner 3D</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Digitalizzazione rapida di volumi ed ambienti articolati con nuvole di punti ad alta densità.
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Plane size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Aerofotogrammetria</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Rilievi ad alta quota per grandi estensioni territoriali, rilievi di tetti e modelli DTM.
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Layers size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Scan-to-BIM</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Conversione diretta della nuvola di punti in modelli informativi as-built ed HBIM.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
               Digitalizza il Tuo <br /> Sito o Fabbricato.
            </h2>
            <p className="text-text-main text-sm md:text-base font-light mb-12">
               Richiedi un preventivo per un rilievo integrato con laser scanner 3D, drone o GPS topografico.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/contatti" className="btn-ghost-dark px-8 md:px-12 py-4 md:py-6 inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                  Richiedi un Rilievo <ChevronRight size={18} />
               </Link>
               <Link to="/servizi/bim" className="border border-navy/20 hover:border-navy text-navy font-bold uppercase tracking-wider text-xs px-8 md:px-12 py-4 md:py-6 rounded-sm transition-all w-full sm:w-auto text-center">
                  Scopri il Servizio BIM
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

