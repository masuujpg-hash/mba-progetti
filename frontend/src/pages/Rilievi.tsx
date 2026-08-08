import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scan,
  Plane,
  Satellite,
  Radio,
  Layers,
  ChevronRight,
  Crosshair,
  ShieldAlert,
  Ruler,
  Maximize2,
  X,
  Database,
  Camera,
  Grid,
  ArrowRight
} from 'lucide-react';

interface TavolaPortfolio {
  id: string;
  title: string;
  category: 'laser' | 'drone' | 'degrado' | 'ispezione';
  categoryLabel: string;
  subtitle: string;
  desc: string;
  img: string;
  tavolaNum: string;
  highlights: string[];
}

export default function Rilievi() {
  const [selectedImage, setSelectedImage] = useState<TavolaPortfolio | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // ── 10 ATTIVITÀ E SERVIZI SPECIALISTICI ──
  const serviziSpecialistici = [
    {
      id: '01',
      title: 'Rilievi Laser Scanner 3D',
      desc: 'Scansioni ad alta definizione con restituzione di nuvole di punti georiferite e sezioni grezze a precisione millimetrica.',
      icon: Scan,
      tag: 'Cattura 3D'
    },
    {
      id: '02',
      title: 'Aerofotogrammetria con Drone (UAV)',
      desc: 'Rilievi aerei di precisione per superfici estese, fabbricati, tetti e aree inaccessibili con droni ad alta risoluzione.',
      icon: Plane,
      tag: 'Rilievo Aereo'
    },
    {
      id: '03',
      title: 'Modellazione BIM & HBIM',
      desc: 'Conversione diretta da nuvola di punti a modello parametrico 3D (Autodesk Revit, ReCap Pro) per edilizia e beni storici vincolati.',
      icon: Layers,
      tag: 'Scan-to-BIM'
    },
    {
      id: '04',
      title: 'Rilievi Topografici & GPS',
      desc: 'Rilievi di inquadramento, tracciamenti di cantiere, reti topografiche, operazioni catastali e calcolo volumi di sterro/riporto.',
      icon: Satellite,
      tag: 'Topografia GNSS'
    },
    {
      id: '05',
      title: 'Analisi Degrado & Quadro Fessurativo',
      desc: 'Mappatura tecnica di lesioni, degrado cromatico, macchie di umidità e vegetazione su prospetti ed edifici storici.',
      icon: Ruler,
      tag: 'Restauro & Ammaloramenti'
    },
    {
      id: '06',
      title: 'Ispezioni Coperture & Impianti Fotovoltaici',
      desc: 'Verifiche visive e termografiche con drone per rilievo danni, infiltrazioni d\'acqua e verifica pannelli solari in sicurezza.',
      icon: ShieldAlert,
      tag: 'Ispezioni in Quota'
    },
    {
      id: '07',
      title: 'Fotografia Immersiva & Gigapixel',
      desc: 'Tour virtuali 360°, panoramiche gigapixel ad altissima risoluzione e fotografia 3D per documentazione e restauro.',
      icon: Camera,
      tag: 'Virtual Tour 360°'
    },
    {
      id: '08',
      title: 'Ortofoto Digitali & Cartografia',
      desc: 'Restituzione di ortofotomappe ad altissima risoluzione scalate e georeferenziate per la redazione di elaborati grafici.',
      icon: Grid,
      tag: 'Cartografia 2D'
    },
    {
      id: '09',
      title: 'Rilievi Aree Inaccessibili',
      desc: 'Acquisizione remota e aerofotogrammetria per zone impervie, pareti rocciose, piloni e strutture a rischio.',
      icon: Crosshair,
      tag: 'Sicurezza Cantiere'
    },
    {
      id: '10',
      title: 'Banche Dati Metriche & As-Built',
      desc: 'Organizzazione di dataset vettoriali 2D/3D e nuvole di punti pronti per l\'integrazione immediata nei flussi aziendali.',
      icon: Database,
      tag: 'Dataset Georeferenziati'
    }
  ];

  // ── STRUMENTAZIONE ──
  const strumentazione = [
    { 
       id: '01', 
       title: 'Drone DJI Mavic 3 Enterprise', 
       subtitle: 'Rilievo Aerofotogrammetrico',
       desc: 'Sensore ad alta risoluzione con otturatore meccanico e modulo RTK per ortomosaici DTM/DEM ed ispezioni.', 
       img: '/media/drone_rilievi.png',
       icon: Plane
    },
    { 
       id: '02', 
       title: 'Laser Scanner 3D Leica BLK360', 
       subtitle: 'Nuvola di Punti Millimetrica',
       desc: 'Acquisizione ad altissima velocità e densità di punti con immagini sferiche HDR per geometrie complesse ed edifici storici.', 
       img: '/media/laser_rilievi.png',
       icon: Scan
    },
    { 
       id: '03', 
       title: 'GPS Topografico ProTRACK', 
       subtitle: 'Georeferenziazione Centimetrica',
       desc: 'Rilievi topografici di inquadramento e tracciamenti plani-altimetrici georeferenziati con punti GCP.', 
       img: '/media/vt08f_rilievi.webp',
       icon: Satellite
    },
    { 
       id: '04', 
       title: 'Georadar (GPR)', 
       subtitle: 'Indagini Sottosuolo Non Distruttive',
       desc: 'Indagini elettromagnetiche nel sottosuolo per mappare cavidotti, reti di sottoservizi e strutture interrate.', 
       img: '/media/blk360_rilievi.webp',
       icon: Radio
    }
  ];

  // ── TAVOLE DI PORTFOLIO REAL ──
  const tavolePortfolio: TavolaPortfolio[] = [
    {
      id: 'tav-01',
      title: 'Rilievo Laser Scanner 3D & Sezione Prospettica',
      category: 'laser',
      categoryLabel: 'Laser Scanner 3D',
      subtitle: 'Complesso Storico Monumentale',
      desc: 'Restituzione vettoriale 2D/3D con nuvola di punti integrata e sezioni longitudinali ad alta definizione.',
      img: '/media/rilievi_portfolio/tavola_01_copertina.png',
      tavolaNum: 'Tavola 01',
      highlights: ['Nuvola Punti Millimetrica', 'Ortomosaico Prospetti', 'Vettorializzazione CAD']
    },
    {
      id: 'tav-02',
      title: 'Aerofotogrammetria con Drone & Ortofotomappa',
      category: 'drone',
      categoryLabel: 'Aerofotogrammetria Drone',
      subtitle: 'Rilievo Copertura & Strutture in Legno',
      desc: 'Ortofoto ad altissima risoluzione georeferenziata con punti di controllo GCP per l\'analisi dello stato di fatto.',
      img: '/media/rilievi_portfolio/tavola_02_drone_legno.png',
      tavolaNum: 'Tavola 02',
      highlights: ['Modello DTM/DEM', 'Precisione Centimetrica', 'Ispezione Coperture']
    },
    {
      id: 'tav-03',
      title: 'Modellazione Scan-to-BIM & Strutture XLAM',
      category: 'laser',
      categoryLabel: 'Scan-to-BIM',
      subtitle: 'Edilizia Residenziale & Strutture',
      desc: 'Conversione parametrica della nuvola di punti in modello BIM 3D Autodesk Revit coordinato per la progettazione.',
      img: '/media/rilievi_portfolio/tavola_03_laser_xlam.png',
      tavolaNum: 'Tavola 03',
      highlights: ['Modello Autodesk Revit', 'Export IFC 4.0', 'Coordinamento Disciplinare']
    },
    {
      id: 'tav-07',
      title: 'Rilievo Topografico & Rete di Inquadramento GCP',
      category: 'drone',
      categoryLabel: 'Topografia GNSS',
      subtitle: 'Georeferenziazione Punti di Controllo',
      desc: 'Tracciamento ed elaborazione della rete di inquadramento topografico georeferenziata con antenna GPS RTK.',
      img: '/media/rilievi_portfolio/tavola_07_topografia_gcp.png',
      tavolaNum: 'Tavola 07',
      highlights: ['Rete Capisaldi GNSS', 'Coordinate ETRF89', 'Quadrettatura Rilievo']
    },
    {
      id: 'tav-10',
      title: 'Nuvola di Punti Densificata RGB & Sezione Grezza',
      category: 'laser',
      categoryLabel: 'Laser Scanner 3D',
      subtitle: 'Beni Culturali & Fabbricati Storici',
      desc: 'Filtro e registrazione Cloud-to-Cloud con calibrazione cromatico-fotografica per la restituzione di interni complessi.',
      img: '/media/rilievi_portfolio/tavola_10_nuvola_punti.png',
      tavolaNum: 'Tavola 10',
      highlights: ['Registrazione Millimetrica', 'Colore RGB Vero', 'Sezioni Longitudinali']
    },
    {
      id: 'tav-14',
      title: 'Sezioni Vettoriali CAD As-Built & Prospetti',
      category: 'laser',
      categoryLabel: 'Disegno CAD 2D',
      subtitle: 'Restituzione Vettoriale Esecutiva',
      desc: 'Elaborati grafici bidimensionali dettagliati con indicazione di quote, spessori murari e componenti strutturali.',
      img: '/media/rilievi_portfolio/tavola_14_sezioni_cad.png',
      tavolaNum: 'Tavola 14',
      highlights: ['Tavole As-Built CAD', 'Quotatura Esecutiva', 'Dettagli Costruttivi']
    },
    {
      id: 'tav-17',
      title: 'Modellazione HBIM Volte & Elementi Storici',
      category: 'laser',
      categoryLabel: 'HBIM Storico',
      subtitle: 'Recupero & Restauro Conservativo',
      desc: 'Modellazione parametrica di elementi voltati, archi e componenti decorativi storici per interventi di restauro.',
      img: '/media/rilievi_portfolio/tavola_17_bim_volte.png',
      tavolaNum: 'Tavola 17',
      highlights: ['Famiglie Adattive Custom', 'Analisi Geometria Archi', 'Schede Restauro']
    },
    {
      id: 'tav-18',
      title: 'Mappatura Degrado Prospettico & Quadro Fessurativo',
      category: 'degrado',
      categoryLabel: 'Mappatura Degrado',
      subtitle: 'Analisi Ammaloramenti Prospetto',
      desc: 'Classificazione e sovrapposizione vettoriale delle patologie di degrado (umidità, fessurazioni, distacchi).',
      img: '/media/rilievi_portfolio/tavola_18_mappatura_degrado.png',
      tavolaNum: 'Tavola 18',
      highlights: ['Classificazione Tecnica', 'Mappa Fessurativa', 'Analisi Intervento']
    },
    {
      id: 'tav-34',
      title: 'Ispezione Coperture & Impianti Fotovoltaici',
      category: 'ispezione',
      categoryLabel: 'Ispezione UAV',
      subtitle: 'Verifica Stato Conservativo',
      desc: 'Rilievo e diagnosi da drone delle coperture, verifica infiltrazioni e stato di conservazione dei moduli solari.',
      img: '/media/rilievi_portfolio/tavola_34_ispezioni_coperture.png',
      tavolaNum: 'Tavola 34',
      highlights: ['Sicurezza in Quota', 'Report Diagnostico', 'Verifica Moduli Solari']
    }
  ];

  const filteredTavole = activeCategory === 'all'
    ? tavolePortfolio
    : tavolePortfolio.filter(t => t.category === activeCategory);

  const fasiWorkflow = [
    { step: '01', title: 'Pianificazione & Rete GCP', desc: 'Sopralluogo e posizionamento dei capisaldi topografici georeferenziati con antenna GNSS.' },
    { step: '02', title: 'Acquisizione Multimodale', desc: 'Scansioni laser 3D a terra e voli fotogrammetrici con drone ad alta quota.' },
    { step: '03', title: 'Processamento & Registrazione', desc: 'Unione delle scansioni millimetriche, pulizia nuvole di punti e validazione dei dati.' },
    { step: '04', title: 'Restituzione Vettoriale & BIM', desc: 'Estrazione degli elaborati grafici 2D, mappatura del degrado ed eventuale modellazione 3D.' }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO CON SFUMATURA ORIGINALE E TESTO BIANCO ── */}
      <section className="relative min-h-[65vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/team_rilievi.jpg" 
            className="w-full h-full object-cover grayscale opacity-25" 
            alt="Rilievi Digitali e Laser Scanner"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Reality Capture & Scan-to-BIM</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-4">
                Rilievi Digitali 3D & Drone.
             </h1>
             <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Cartografia, rilievi laser scanner 3D ad alta definizione, aerofotogrammetria con drone (UAV), mappatura del degrado e modellazione Scan-to-BIM per l'architettura ed il cantiere.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── CITAZIONE & INTRODUZIONE ── */}
      <section className="py-12 md:py-16 px-6 max-w-5xl mx-auto text-center">
         <div className="bg-bg-neutral border-l-4 border-gold p-6 sm:p-8 rounded-r-sm text-left shadow-xs mb-8">
            <p className="text-navy text-lg sm:text-xl font-light italic leading-relaxed">
               "Documentare con precisione è il primo passo per intervenire con qualità."
            </p>
            <span className="text-gold text-xs font-bold uppercase tracking-wider block mt-3">— Arch. Mario Biondi, MBA Studio</span>
         </div>
         <p className="text-navy/80 text-sm md:text-base font-light leading-relaxed">
            Acquisiamo dati metrici ad alta precisione con Laser Scanner 3D terricolo, droni fotogrammetrici e stazioni GPS topografiche per rilevare fabbricati esistenti, complessi storici ed infrastrutture.
         </p>
      </section>

      {/* ── 10 ATTIVITÀ E SERVIZI SPECIALISTICI ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/40 border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Competenze Tecniche</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Servizi di Rilievo & Digitalizzazione
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {serviziSpecialistici.map((item) => {
                  const IconComp = item.icon;
                  return (
                     <div 
                        key={item.id}
                        className="bg-white p-6 rounded-sm border border-navy/10 hover:border-gold transition-colors flex flex-col justify-between shadow-xs"
                     >
                        <div>
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-gold font-mono text-xs font-bold">{item.id}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-bg-neutral text-navy rounded-sm">
                                 {item.tag}
                              </span>
                           </div>
                           <div className="p-3 bg-navy/5 text-gold w-fit mb-4 rounded-sm">
                              <IconComp size={22} />
                           </div>
                           <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                           <p className="text-navy/70 text-xs font-light leading-relaxed">
                              {item.desc}
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── GALLERIA TAVOLE PORTFOLIO LIGHTBOX ── */}
      <section className="py-12 md:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Elaborati Grafici Reali</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Galleria Tavole Portfolio Rilievi
               </h2>
               <p className="text-navy/70 text-xs sm:text-sm font-light max-w-xl mx-auto mt-2">
                  Esplora le tavole di portfolio estrapolate direttamente dai nostri elaborati di cantiere. Clicca per ingrandire.
               </p>
            </div>

            {/* FILTRI CATEGORIA */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
               {[
                  { id: 'all', label: 'Tutte' },
                  { id: 'laser', label: 'Laser Scanner & BIM' },
                  { id: 'drone', label: 'Aerofotogrammetria & GPS' },
                  { id: 'degrado', label: 'Mappatura Degrado' },
                  { id: 'ispezione', label: 'Ispezioni & Coperture' }
               ].map((f) => (
                  <button
                     key={f.id}
                     onClick={() => setActiveCategory(f.id)}
                     className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                        activeCategory === f.id
                           ? 'bg-navy text-white border border-navy shadow-xs'
                           : 'bg-bg-neutral text-navy/70 border border-navy/10 hover:border-gold'
                     }`}
                  >
                     {f.label}
                  </button>
               ))}
            </div>

            {/* GRIGLIA TAVOLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredTavole.map((tavola) => (
                  <div
                     key={tavola.id}
                     onClick={() => setSelectedImage(tavola)}
                     className="group cursor-pointer bg-white border border-navy/10 rounded-sm overflow-hidden hover:border-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                  >
                     <div>
                        <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden border-b border-navy/5">
                           <img 
                              src={tavola.img} 
                              alt={tavola.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm inline-flex items-center gap-2 shadow-md">
                                 <Maximize2 size={14} /> Ingrandisci
                              </span>
                           </div>
                           <div className="absolute top-3 left-3 bg-navy text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded-sm">
                              {tavola.tavolaNum}
                           </div>
                        </div>

                        <div className="p-5">
                           <span className="text-gold text-[10px] font-bold uppercase tracking-wider block mb-1">
                              {tavola.categoryLabel}
                           </span>
                           <h3 className="text-navy text-sm font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors leading-snug">
                              {tavola.title}
                           </h3>
                           <p className="text-navy/70 text-xs font-light leading-relaxed line-clamp-2">
                              {tavola.desc}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── MODAL LIGHTBOX INGANDIMENTO TAVOLA (RICHIEDI IL SERVIZIO) ── */}
      <AnimatePresence>
         {selectedImage && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedImage(null)}
               className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-sm max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gold/30 shadow-2xl relative flex flex-col md:flex-row"
               >
                  <button 
                     onClick={() => setSelectedImage(null)}
                     className="absolute top-4 right-4 z-10 p-2 bg-navy text-white rounded-full hover:bg-gold hover:text-navy transition-colors"
                  >
                     <X size={20} />
                  </button>

                  <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4">
                     <img 
                        src={selectedImage.img} 
                        alt={selectedImage.title}
                        className="max-h-[75vh] w-auto object-contain"
                     />
                  </div>

                  <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-between bg-white">
                     <div>
                        <div className="inline-block bg-gold/10 border border-gold/30 text-navy font-mono font-bold text-xs px-3 py-1 rounded-sm mb-4">
                           {selectedImage.tavolaNum} • {selectedImage.categoryLabel}
                        </div>

                        <h3 className="text-navy text-lg font-bold uppercase tracking-tight mb-3 leading-snug">
                           {selectedImage.title}
                        </h3>

                        <p className="text-navy/70 text-xs sm:text-sm font-light leading-relaxed mb-6">
                           {selectedImage.desc}
                        </p>
                     </div>

                     <div className="mt-6 pt-4 border-t border-navy/10">
                        {/* TESTO PULSANTE SOSTITUITO CON RICHIEDI IL SERVIZIO */}
                        <Link 
                           to="/contatti" 
                           onClick={() => setSelectedImage(null)}
                           className="btn-ghost-dark w-full py-3 text-xs flex items-center justify-center gap-2"
                        >
                           Richiedi il Servizio <ChevronRight size={16} />
                        </Link>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* ── STRUMENTAZIONE ED ATTREZZATURE ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/50 border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Attrezzature d'Avanguardia</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Hardware & Sensori
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {strumentazione.map((device) => {
                  const IconComponent = device.icon;
                  return (
                     <div 
                        key={device.id}
                        className="bg-white border border-navy/10 rounded-sm overflow-hidden p-6 flex flex-col justify-between space-y-4 shadow-xs"
                     >
                        <div className="flex items-center justify-between">
                           <span className="text-gold font-mono font-bold text-xs">{device.id}</span>
                           <IconComponent size={20} className="text-navy/60" />
                        </div>
                        <div>
                           <h3 className="text-navy text-sm font-bold uppercase tracking-tight mb-1">{device.title}</h3>
                           <span className="text-navy/50 text-[10px] font-semibold uppercase tracking-wider block mb-2">{device.subtitle}</span>
                           <p className="text-navy/70 text-xs font-light leading-relaxed">{device.desc}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── WORKFLOW IN 4 FASI ── */}
      <section className="py-12 md:py-20 bg-white border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Processo Operativo</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Il Workflow del Rilievo Integrato
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {fasiWorkflow.map((item, index) => (
                  <div key={index} className="bg-bg-neutral/60 p-6 border-t-2 border-navy/20 space-y-2">
                     <span className="text-gold font-mono text-2xl font-bold block">{item.step}</span>
                     <h3 className="text-navy text-sm font-bold uppercase tracking-tight">{item.title}</h3>
                     <p className="text-navy/70 text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── FINAL CTA (SENZA BLOCCO BLU) ── */}
      <section className="py-12 md:py-20 bg-bg-neutral text-navy text-center border-t border-navy/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
             Hai Bisogno di un Rilievo 3D o Aerofotogrammetria?
          </h2>
          <p className="text-navy/70 text-sm font-light mb-8">
             Richiedi un preventivo o uno studio di fattibilità per l'acquisizione metrica del tuo immobile o cantiere.
          </p>
          <Link to="/contatti" className="btn-ghost-dark group">
             Richiedi il Servizio <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </Link>
        </div>
      </section>

    </div>
  );
}
