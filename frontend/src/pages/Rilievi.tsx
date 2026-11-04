import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scan,
  Plane,
  Satellite,
  Radio,
  Layers,
  Crosshair,
  ShieldAlert,
  Ruler,
  Maximize2,
  X,
  Database,
  Camera,
  Grid
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
             <span className="text-white/80 text-[11px] font-medium uppercase tracking-[0.2em] mb-4 block">Reality Capture &amp; Scan-to-BIM</span>
             <h1 className="text-white text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.05] uppercase tracking-[-0.03em] mb-4">
                Rilievi Digitali 3D &amp; Drone.
             </h1>
             <p className="text-white/86 text-[16px] font-normal max-w-[672px] mx-auto leading-[1.65]">
                Cartografia, rilievi laser scanner 3D ad alta definizione, aerofotogrammetria con drone (UAV), mappatura del degrado e modellazione Scan-to-BIM per l'architettura ed il cantiere.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── COLLABORAZIONE CON STUDIO ILARIO DI BUCCIO ── */}
      <section className="pt-12 sm:pt-16 pb-4 px-6 max-w-7xl mx-auto">
        <div className="bg-[#f8f9fb] border-l-4 border-[#b8972a] p-6 sm:p-8 rounded-[2px] shadow-2xs">
          <span className="text-[#b8972a] text-[11px] font-medium uppercase tracking-[0.2em] block mb-2">
            COLLABORAZIONE
          </span>
          <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] max-w-[62ch]">
            Per le attività di rilievo lo studio MBA collabora con lo <strong className="text-[#1b2a4a] font-bold">studio dell'ing. Ilario Di Buccio</strong>, specialista di rilievi e modellazione BIM. L'incarico resta coordinato dall'arch. Mario Biondi, interlocutore unico per la committenza.
          </p>
        </div>
      </section>

      {/* ── DOCUMENTARE CON PRECISIONE PER INTERVENIRE CON QUALITÀ ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
            RILIEVO DIGITALE
          </span>
          <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
            DOCUMENTARE CON PRECISIONE PER INTERVENIRE CON QUALITÀ
          </h2>
        </div>

        {/* 2-Column Grid: Text & Point Cloud Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Description */}
          <div className="lg:col-span-6 space-y-5 text-[#3d4a66] text-[16px] font-normal leading-[1.7] max-w-[62ch]">
            <p>
              Prima di progettare, restaurare o proporre migliorie in gara occorre sapere come è fatto davvero l’esistente. Acquisiamo <strong className="text-[#1b2a4a] font-bold">dati metrici ad alta precisione</strong> con <strong className="text-[#1b2a4a] font-bold">laser scanner 3D, droni fotogrammetrici e stazioni GNSS topografiche</strong>, per fabbricati esistenti, complessi storici e infrastrutture.
            </p>
            <p>
              Dalla nuvola di punti georeferenziata ricaviamo <strong className="text-[#1b2a4a] font-bold">elaborati 2D e 3D, ortofoto, mappature del degrado e modelli BIM</strong>: un unico dato di partenza, utilizzabile da progettisti, imprese e direzione lavori.
            </p>
          </div>

          {/* Right Column: Point Cloud Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[2px] overflow-hidden border border-[#dfe3ea] shadow-sm group">
              <img
                src="/media/rilievi_nuvola_punti.jpg"
                alt="Rilievo Laser Scanner Nuvola di Punti"
                className="w-full h-auto max-h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Strip con i 6 Servizi di Rilievo conformi al mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#dfe3ea] border-y border-[#dfe3ea] my-8 py-5 bg-white">
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-[#1b2a4a] mb-2 group-hover:text-[#b8972a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8V5h3M16 5h3v3M5 16v3h3M19 16v3h-3" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-medium text-[#1b2a4a] uppercase tracking-[0.06em] leading-tight">
              LASER SCANNER 3D
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-[#1b2a4a] mb-2 group-hover:text-[#b8972a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="8" x2="16" y2="16" />
              <line x1="16" y1="8" x2="8" y2="16" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="18" r="3" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-medium text-[#1b2a4a] uppercase tracking-[0.06em] leading-tight">
              DRONE E<br />FOTOGRAMMETRIA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-[#1b2a4a] mb-2 group-hover:text-[#b8972a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="6" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-medium text-[#1b2a4a] uppercase tracking-[0.06em] leading-tight">
              TOPOGRAFIA GNSS
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-[#1b2a4a] mb-2 group-hover:text-[#b8972a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="3" width="16" height="18" rx="1.5" />
              <path d="M12 3l2 6-4 4 4 4-2 4" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-medium text-[#1b2a4a] uppercase tracking-[0.06em] leading-tight">
              MAPPATURA DEL<br />DEGRADO
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-[#1b2a4a] mb-2 group-hover:text-[#b8972a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9z" />
              <path d="M12 17v-6m-3 3l3-3 3 3" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-medium text-[#1b2a4a] uppercase tracking-[0.06em] leading-tight">
              ISPEZIONI IN QUOTA
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 group">
            <svg className="w-[26px] h-[26px] text-[#1b2a4a] mb-2 group-hover:text-[#b8972a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 8 2 16 6 23 2 23 18 16 22 8 18 1 22 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold text-navy uppercase tracking-[0.14em] leading-tight font-outfit">
              CARTOGRAFIA E<br />ORTOFOTO
            </span>
          </div>
        </div>
      </section>

      {/* ── 10 ATTIVITÀ E SERVIZI SPECIALISTICI ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/40 border-t border-[#dfe3ea]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
                  COMPETENZE TECNICHE
               </span>
               <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
                  SERVIZI DI RILIEVO &amp; DIGITALIZZAZIONE
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {serviziSpecialistici.map((item) => {
                  const IconComp = item.icon;
                  return (
                     <div 
                        key={item.id}
                        className="bg-white p-7 rounded-[2px] border border-[#1b2a4a]/10 hover:border-[#b8972a] transition-colors flex flex-col justify-between shadow-xs"
                     >
                        <div>
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-[#b8972a] font-mono text-sm font-bold">{item.id}</span>
                              <span className="text-[11px] uppercase font-medium tracking-[0.2em] px-2.5 py-1 bg-bg-neutral text-[#1b2a4a] rounded-[2px]">
                                 {item.tag}
                              </span>
                           </div>
                           <div className="p-3 bg-[#1b2a4a]/5 text-[#b8972a] w-fit mb-5 rounded-[2px]">
                              <IconComp size={24} />
                           </div>
                           <h3 className="text-[#1b2a4a] text-[17px] font-semibold uppercase tracking-[0.06em] mb-2.5">{item.title}</h3>
                           <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
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
      <section className="py-16 md:py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
                  ELABORATI GRAFICI REALI
               </span>
               <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-3">
                  GALLERIA TAVOLE PORTFOLIO RILIEVI
               </h2>
               <p className="text-[#3d4a66] text-[16px] font-normal max-w-[62ch] mx-auto leading-[1.7]">
                  Esplora le tavole di portfolio estrapolate direttamente dai nostri elaborati di cantiere. Clicca per ingrandire.
               </p>
            </div>

            {/* FILTRI CATEGORIA */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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
                     className={`px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] rounded-[2px] transition-all cursor-pointer ${
                        activeCategory === f.id
                           ? 'bg-[#1b2a4a] text-white border border-[#1b2a4a] shadow-xs'
                           : 'bg-bg-neutral text-[#1b2a4a]/70 border border-[#1b2a4a]/10 hover:border-[#b8972a]'
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
                     className="group cursor-pointer bg-white border border-[#1b2a4a]/10 rounded-[2px] overflow-hidden hover:border-[#b8972a] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                  >
                     <div>
                        <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden border-b border-[#1b2a4a]/5">
                           <img 
                              src={tavola.img} 
                              alt={tavola.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           <div className="absolute inset-0 bg-[#1b2a4a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-[#b8972a] text-white text-xs font-medium uppercase tracking-[0.2em] px-3.5 py-2 rounded-[2px] inline-flex items-center gap-2 shadow-md">
                                 <Maximize2 size={14} /> Ingrandisci
                              </span>
                           </div>
                           <div className="absolute top-3 left-3 bg-[#1b2a4a] text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-[2px]">
                              {tavola.tavolaNum}
                           </div>
                        </div>

                        <div className="p-6">
                           <span className="text-[#b8972a] text-[11px] font-medium uppercase tracking-[0.2em] block mb-1">
                              {tavola.categoryLabel}
                           </span>
                           <h3 className="text-[#1b2a4a] text-base sm:text-[18px] font-medium uppercase tracking-tight mb-2 group-hover:text-[#b8972a] transition-colors leading-[1.35]">
                              {tavola.title}
                           </h3>
                           <p className="text-[#3d4a66] text-[14px] leading-[1.65] line-clamp-2">
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
                  className="bg-white rounded-[1px] max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gold/30 shadow-2xl relative flex flex-col md:flex-row"
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
                        <div className="inline-block bg-gold/10 border border-gold/30 text-navy font-mono font-bold text-xs px-3 py-1 rounded-[1px] mb-4">
                           {selectedImage.tavolaNum} • {selectedImage.categoryLabel}
                        </div>

                        <h3 className="text-navy text-lg sm:text-xl font-bold uppercase tracking-tight mb-3 leading-snug font-outfit">
                           {selectedImage.title}
                        </h3>

                        <p className="text-[#475569] text-sm sm:text-base font-normal leading-relaxed mb-6 font-outfit">
                           {selectedImage.desc}
                        </p>
                     </div>

                     <div className="mt-6 pt-4 border-t border-navy/10">
                        <Link 
                           to="/contatti" 
                           onClick={() => setSelectedImage(null)}
                           className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-6 py-3.5 rounded-[1px] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-between w-full shadow-2xs group font-outfit"
                        >
                           <span>Richiedi il Servizio</span>
                           <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
                        </Link>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* ── STRUMENTAZIONE ED ATTREZZATURE ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/50 border-t border-[#dfe3ea]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
                  ATTREZZATURE D'AVANGUARDIA
               </span>
               <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
                  HARDWARE &amp; SENSORI
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {strumentazione.map((device) => {
                  const IconComponent = device.icon;
                  return (
                     <div 
                        key={device.id}
                        className="bg-white border border-[#1b2a4a]/10 rounded-[2px] overflow-hidden p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-xs"
                     >
                        <div className="flex items-center justify-between">
                           <span className="text-[#b8972a] font-mono font-bold text-sm">{device.id}</span>
                           <IconComponent size={22} className="text-[#1b2a4a]/60" />
                        </div>
                        <div>
                           <h3 className="text-[#1b2a4a] text-[16px] font-semibold uppercase tracking-[0.06em] mb-1">{device.title}</h3>
                           <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] block mb-2">{device.subtitle}</span>
                           <p className="text-[#3d4a66] text-[14px] leading-[1.65]">{device.desc}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── WORKFLOW IN 4 FASI ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
                  PROCESSO OPERATIVO
               </span>
               <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
                  IL WORKFLOW DEL RILIEVO INTEGRATO
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {fasiWorkflow.map((item, index) => (
                  <div key={index} className="bg-bg-neutral/60 p-7 border-t-2 border-[#1b2a4a]/20 space-y-3 rounded-[2px]">
                     <span className="text-[#b8972a] font-mono text-3xl font-extrabold block">{item.step}</span>
                     <h3 className="text-[#1b2a4a] text-[16px] font-semibold uppercase tracking-[0.06em]">{item.title}</h3>
                     <p className="text-[#3d4a66] text-[14px] leading-[1.65]">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── BANNER CONTATTI ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-[#dfe3ea]">
        <div className="mb-4">
          <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block shadow-xs">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-[#b8972a] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs rounded-[2px]">
          <div>
            <h3 className="text-[#1b2a4a] text-xl sm:text-2xl md:text-[28px] font-bold uppercase tracking-[0.05em] leading-[1.15]">
              HAI BISOGNO DI UN RILIEVO 3D O AEROFOTOGRAMMETRIA?
            </h3>
            <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mt-2 max-w-[62ch]">
              Richiedi un preventivo o uno studio di fattibilità per l'acquisizione metrica del tuo immobile o cantiere.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-[#1b2a4a] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-[26px] py-[15px] hover:bg-[#b8972a] transition-colors inline-flex items-center justify-between gap-4 rounded-[2px] shadow-sm shrink-0 min-w-[240px]"
          >
            <span>CONTATTACI</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
