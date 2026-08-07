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
  FileText,
  Box,
  Crosshair,
  ShieldAlert,
  Ruler,
  CheckCircle2,
  Maximize2,
  X,
  Database,
  Camera,
  Grid,
  Sparkles
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

  // ── 10 ATTIVITÀ E SERVIZI SPECIALISTICI PORTFOLIO ──
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
      desc: 'Organizzazione di dataset vettoriali 2D/3D e nuvole di punti pronti per l\'integrazione immediata nei flussi di lavoro aziendali.',
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
       desc: 'Sensore ad alta risoluzione con otturatore meccanico e modulo RTK. Immagini georeferenziate con precisione centimetrica per ortomosaici DTM/DEM e ispezioni.', 
       img: '/media/drone_rilievi.png',
       icon: Plane
    },
    { 
       id: '02', 
       title: 'Laser Scanner 3D Leica BLK360', 
       subtitle: 'Nuvola di Punti Millimetrica',
       desc: 'Acquisizione ad altissima velocità e densità di punti con immagini sferiche HDR. Rileva geometrie complesse ed edifici storici con scarto inferiore agli 8 mm.', 
       img: '/media/laser_rilievi.png',
       icon: Scan
    },
    { 
       id: '03', 
       title: 'GPS Topografico ProTRACK', 
       subtitle: 'Georeferenziazione Centimetrica',
       desc: 'Rilievi topografici di inquadramento e tracciamenti plani-altimetrici georeferenziati. Posizionamento dei punti di controllo a terra (GCP).', 
       img: '/media/vt08f_rilievi.webp',
       icon: Satellite
    },
    { 
       id: '04', 
       title: 'Georadar (GPR)', 
       subtitle: 'Indagini Sottosuolo Non Distruttive',
       desc: 'Indagini elettromagnetiche nel sottosuolo per mappare cavidotti, reti di sottoservizi, strutture interrate ed elementi non visibili in superficie.', 
       img: '/media/blk360_rilievi.webp',
       icon: Radio
    }
  ];

  // ── PARAMETRI DI ACCURATEZZA E METRICHE DI QUALITÀ PORTFOLIO ──
  const metricheQualita = [
    { label: 'Errore di Gruppo (Mean Group Error)', val: '0.008 m', tolerance: '8 mm', state: 'Conforme', desc: 'Registrazione globale del blocco di scansioni terrestri' },
    { label: 'Cloud-to-Cloud Alignment Error', val: '0.008 m', tolerance: '8 mm', state: 'Conforme', desc: 'Accuratezza di sovrapposizione tra nuvole di punti adiacenti' },
    { label: 'Sovrapposizione Scansioni (Overlap)', val: '56 %', tolerance: '> 50%', state: 'Conforme', desc: 'Densità di copertura comune per evitare coni d\'ombra' },
    { label: 'Robustezza Allineamento (Robustness)', val: '80 %', tolerance: '> 75%', state: 'Conforme', desc: 'Grado di vincolo geometrico e ridondanza delle scansioni' }
  ];

  // ── LEGENDA TECNICA CODICI DEGRADO ──
  const codiciDegrado = [
    { code: 'Fes', name: 'Fratturazione / Fessurazione', desc: 'Quadro fessurativo, cavillature, lesioni passanti o superficiali su murature e intonaci.', color: 'bg-red-500/10 text-red-600 border-red-200' },
    { code: 'Mac', name: 'Macchia / Umidità', desc: 'Presenza di risalita capillare, efflorescenze saline o chiazze da percolamento idrico.', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    { code: 'Man', name: 'Mancanza di Materiale / Distacco', desc: 'Erosione superficiale, distacco di intonaco, lacune o esfoliazione del supporto lapideo.', color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
    { code: 'Veg', name: 'Vegetazione Infestante', desc: 'Presenza di muschi, licheni o piante vascolari con radici dannose sulle strutture.', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
    { code: 'AC', name: 'Alterazione Cromatica / Croste Nere', desc: 'Variazione del colore originale per depositi di inquinanti atmosferici o biodeterioramento.', color: 'bg-blue-500/10 text-blue-600 border-blue-200' }
  ];

  // ── AMBITI APPLICATIVI ED ESEMPI PRATICI DI CANTIERE ──
  const caseStudiesCantiere = [
    {
      num: '01',
      title: 'Scansioni Laser 3D in Strutture in Legno Lamellare e Pareti X-LAM',
      category: 'Laser Scanner 3D & Legno',
      desc: 'Acquisizione delle pareti in legno X-LAM e delle orditure in legno lamellare durante la fase di montaggio in cantiere. Controllo immediato delle tolleranze dimensionali, delle perpendicolarità e dei punti di ancoraggio.',
      points: [
        'Verifica dello stato di fatto in tempo reale durante la posa in opera',
        'Generazione di sezioni verticali e orizzontali ad altissima risoluzione',
        'Integrazione diretta con i modelli di prefabbricazione in stabilimento'
      ]
    },
    {
      num: '02',
      title: 'Complessi Monumentali e Modellazione Parametrica HBIM',
      category: 'HBIM & Beni Storici',
      desc: 'Rilievo integrato con scanner terrestri e droni di complessi monumentali storici. Restituzione parametrica adattiva in ambiente Autodesk Revit di elementi architettonici complessi.',
      points: [
        'Modellazione custom di volte a crociera, pilastri sagomati e porticati storici',
        'Evoluzione dal punto di misura (Point Cloud) al modello BIM coordinato',
        'Schedatura degli elementi storici per la gestione del restauro conservativo'
      ]
    },
    {
      num: '03',
      title: 'Aerofotogrammetria UAV & Rete di Controllo GCP (GNSS)',
      category: 'Drone & Topografia GPS',
      desc: 'Voli aerofotogrammetrici a quota controllata integrati da capisaldi di terra misurati con antenna GPS topografica GNSS in RTK per la georeferenziazione metrica.',
      points: [
        'Generazione di Modelli Digitali del Terreno (DTM e DEM)',
        'Calcolo di profili longitudinali, sezioni e volumi di scavo/riporto',
        'Ortofotomappe georeferenziate ad altissima risoluzione (GSD centimetrico)'
      ]
    },
    {
      num: '04',
      title: 'Mappatura Vettoriale del Degrado su Ortofoto di Prospetto',
      category: 'Restauro & Quadro Fessurativo',
      desc: 'Sovrapposizione del rilievo vettoriale CAD sulle ortofoto dei prospetti per la mappatura sistematica dei cinematismi di dissesto e dell\'ammaloramento delle superfici.',
      points: [
        'Classificazione normata dei degradi (Fes, Mac, Man, Veg, AC)',
        'Computazione metrica automatizzata delle superfici oggetto di intervento',
        'Supporto analitico alla stesura dei capitolati di restauro architettonico'
      ]
    }
  ];

  // ── GALLERIA TAVOLE E PROGETTI REALI DEL PORTFOLIO ──
  const tavolePortfolio: TavolaPortfolio[] = [
    {
      id: 'tav-01',
      title: 'Copertina Portfolio Rilievi Laser Scanner e Drone',
      category: 'laser',
      categoryLabel: 'Panorama Servizi',
      subtitle: 'Tavola 01 - Impresa Specializzata Cartografia & BIM',
      desc: 'Fascicolo sintetico delle attività di cartografia, aerofotogrammetria con drone, rilievi laser scanner 3D e modellazione BIM/HBIM dello studio.',
      img: '/media/rilievi_portfolio/tavola_01_copertina.png',
      tavolaNum: 'Tavola 01',
      highlights: ['Cartografia Tecnica', 'Aerofotogrammetria Drone', 'Scan-to-BIM']
    },
    {
      id: 'tav-02',
      title: 'Rilievo con Drone Fabbricato in Legno Lamellare',
      category: 'drone',
      categoryLabel: 'Aerofotogrammetria',
      subtitle: 'Tavola 02 - Ortofoto Copertura e Strutture in Elevazione',
      desc: 'Rilievo aereo con drone per l\'acquisizione delle geometrie di copertura e delle strutture in elevazione di fabbricati ad orditura in legno lamellare.',
      img: '/media/rilievi_portfolio/tavola_02_drone_legno.png',
      tavolaNum: 'Tavola 02',
      highlights: ['Legno Lamellare', 'Ortofoto Copertura', 'Ispezione Aerea']
    },
    {
      id: 'tav-03',
      title: 'Scansione Laser Scanner Pareti in X-LAM',
      category: 'laser',
      categoryLabel: 'Laser Scanner 3D',
      subtitle: 'Tavola 03 - Montaggio Strutture Prefabbricate',
      desc: 'Scansione 3D ad alta densità in fase di montaggio di pareti in legno X-LAM per la verifica metrica dei fili fissi e delle piombi di cantiere.',
      img: '/media/rilievi_portfolio/tavola_03_laser_xlam.png',
      tavolaNum: 'Tavola 03',
      highlights: ['Pareti X-LAM', 'Verifica Verticalità', 'As-Built Cantiere']
    },
    {
      id: 'tav-07',
      title: 'Rilievo Topografico GPS & Punti GCP a Terra',
      category: 'drone',
      categoryLabel: 'Topografia GPS',
      subtitle: 'Tavola 07 - Georeferenziazione e Capisaldi GNSS',
      desc: 'Rete topografica di inquadramento con posizionamento di Ground Control Points (GCP) per il vincolo altimetrico e planimetrico dei dati aerei.',
      img: '/media/rilievi_portfolio/tavola_07_topografia_gcp.png',
      tavolaNum: 'Tavola 07',
      highlights: ['GCP Ground Control', 'Antenna GNSS RTK', 'Coordinate Geodetiche']
    },
    {
      id: 'tav-10',
      title: 'Nuvola di Punti 3D Edificio Storico Monumentale',
      category: 'laser',
      categoryLabel: 'Laser Scanner 3D',
      subtitle: 'Tavola 10 - Prospetti e Modellazione Spaziale',
      desc: 'Dataset di nuvola di punti RGB registrata ad altissima precisione per la ricostruzione metrica completa dei prospetti di un palazzo monumentale.',
      img: '/media/rilievi_portfolio/tavola_10_nuvola_punti.png',
      tavolaNum: 'Tavola 10',
      highlights: ['Milioni di Punti 3D', 'Beni Monumentali', 'Precisione Millimetrica']
    },
    {
      id: 'tav-14',
      title: 'Restituzione Grafica 2D: Piante, Sezioni e Prospetti CAD',
      category: 'laser',
      categoryLabel: 'Elaborati CAD 2D',
      subtitle: 'Tavola 14 - Disegni Vettoriali da Point Cloud',
      desc: 'Sezioni sottili estrapolate direttamente dalla nuvola di punti per la restituzione vettoriale bidimensionale dello stato di fatto ad ogni quota.',
      img: '/media/rilievi_portfolio/tavola_14_sezioni_cad.png',
      tavolaNum: 'Tavola 14',
      highlights: ['Piante ad ogni quota', 'Sezioni Longitudinali', 'Prospetti Quotati']
    },
    {
      id: 'tav-17',
      title: 'Modellazione Parametrica BIM (Volte a Crociera e Porticati)',
      category: 'laser',
      categoryLabel: 'Scan-to-BIM',
      subtitle: 'Tavola 17 - Famiglie Parametriche Adattive in Revit',
      desc: 'Generazione di famiglie parametriche avanzate per la ricostruzione BIM di volte complesse, capitelli e pilastri di porticati storici.',
      img: '/media/rilievi_portfolio/tavola_17_bim_volte.png',
      tavolaNum: 'Tavola 17',
      highlights: ['Autodesk Revit', 'Volte Parametriche', 'Famiglie Custom HBIM']
    },
    {
      id: 'tav-18',
      title: 'Mappatura del Degrado Prospettico su Ortofoto',
      category: 'degrado',
      categoryLabel: 'Restauro Architectonico',
      subtitle: 'Tavola 18 - Quadro Fessurativo e Legenda Ammaloramenti',
      desc: 'Restituzione grafica vettoriale sovrapposta all\'ortofoto ad alta risoluzione del prospetto con classificazione normata dei vizi (Fes, Mac, Man, Veg, AC).',
      img: '/media/rilievi_portfolio/tavola_18_mappatura_degrado.png',
      tavolaNum: 'Tavola 18',
      highlights: ['Codici Fes/Mac/Man', 'Vettorializzazione Ortofoto', 'Computi Restauro']
    },
    {
      id: 'tav-22',
      title: 'Grafici Stato di Fatto & Report Allineamento Scansioni',
      category: 'laser',
      categoryLabel: 'Controllo Qualità',
      subtitle: 'Tavola 22 - Certificate di Tolleranza e Scarti Cloud-to-Cloud',
      desc: 'Report metrologico di validazione del blocco di scansioni con parametri di scarto medio (8 mm), sovrapposizione (56%) e robustezza di registrazione.',
      img: '/media/rilievi_portfolio/tavola_22_grafici_allineamento.png',
      tavolaNum: 'Tavola 22',
      highlights: ['Report Scarti Cloud', 'Errore 0.008 m', 'Validazione Certificata']
    },
    {
      id: 'tav-25',
      title: 'Rilievo Fotografico in Cantiere & Ispezioni con Drone',
      category: 'ispezione',
      categoryLabel: 'Cantiere & Ispezioni',
      subtitle: 'Tavola 25 - Documentazione Fotografica & Verifiche',
      desc: 'Campagna fotografica di dettaglio in cantiere integrata con scatti isometrici da drone per l\'analisi visiva dei punti critici non accessibili.',
      img: '/media/rilievi_portfolio/tavola_25_ispezione_cantiere.png',
      tavolaNum: 'Tavola 25',
      highlights: ['Fotografia Cantiere', 'Punti Inaccessibili', 'Rilievo Speditivo']
    },
    {
      id: 'tav-34',
      title: 'Ispezione Coperture, Falde ed Impianti Fotovoltaici',
      category: 'ispezione',
      categoryLabel: 'Coperture & Solar',
      subtitle: 'Tavola 34 - Verifiche Termografiche e Manti di Copertura',
      desc: 'Ispezione speditiva e dettagliata di tetti in coppi, linee di colmo, grondaie e pannelli fotovoltaici per l\'individuazione di rotture e infiltrazioni.',
      img: '/media/rilievi_portfolio/tavola_34_ispezioni_coperture.png',
      tavolaNum: 'Tavola 34',
      highlights: ['Manti di Copertura', 'Pannelli Solari', 'Zero Rischio Quota']
    }
  ];

  const filteredTavole = activeCategory === 'all' 
    ? tavolePortfolio 
    : tavolePortfolio.filter(t => t.category === activeCategory);

  const outputConsegnabili = [
    {
      step: '01',
      title: 'Nuvola di Punti 3D (Point Cloud)',
      desc: 'Dataset georeferenziato ad altissima densità nei formati standard aperti (E57, LAS, PTS, RCP) per misurazioni dirette e modellazione.',
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
    { step: '01', title: 'Pianificazione & Rete GCP', desc: 'Sopralluogo preliminare e posizionamento dei capisaldi topografici georeferenziati con antenna GNSS.' },
    { step: '02', title: 'Acquisizione Multimodale', desc: 'Scansioni laser 3D a terra e voli fotogrammetrici con drone ad alta quota integrati sul campo.' },
    { step: '03', title: 'Processamento & Registration', desc: 'Unione delle scansioni millimetriche, pulizia nuvole di punti e validazione scarti metrologici (< 8 mm).' },
    { step: '04', title: 'Restituzione Vettoriale & BIM', desc: 'Estrazione degli elaborati grafici 2D, mappatura del degrado ed eventuale modellazione parametrica 3D.' }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/team_rilievi.jpg" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Rilievi Digitali e Laser Scanner"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-20">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.0 }}
           >
             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-8 group hover:border-gold transition-colors cursor-default">
               <Sparkles className="w-4 h-4 text-white group-hover:text-gold transition-colors" />
               <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Reality Capture & HBIM Specializzati</span>
             </div>

             <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] uppercase tracking-tighter mb-8">
                Rilievi Digitali, <br />
                <span className="text-white font-serif italic lowercase tracking-normal text-4xl sm:text-6xl md:text-7xl">aerofotogrammetria</span> & BIM.
             </h1>
             
             <p className="text-white/80 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
                Impresa specializzata in cartografia, rilievi laser scanner 3D ad alta definizione, aerofotogrammetria con drone (UAV), mappatura del degrado prospettico e modellazione Scan-to-BIM per l'architettura, i beni storici ed il cantiere.
             </p>

             {/* BADGES METRICI IN HERO - ALL TEXT WHITE */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/15 pt-8 text-left">
               <div>
                 <span className="text-white font-mono font-bold text-xl block">&lt; 8 mm</span>
                 <span className="text-white/60 text-xs font-light">Errore di allineamento</span>
               </div>
               <div>
                 <span className="text-white font-mono font-bold text-xl block">GNSS RTK</span>
                 <span className="text-white/60 text-xs font-light">Georeferenziazione GCP</span>
               </div>
               <div>
                 <span className="text-white font-mono font-bold text-xl block">Scan-to-BIM</span>
                 <span className="text-white/60 text-xs font-light">Autodesk Revit / IFC</span>
               </div>
               <div>
                 <span className="text-white font-mono font-bold text-xl block">56% Overlap</span>
                 <span className="text-white/60 text-xs font-light">Sovrapposizione minima</span>
               </div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* ── INTRODUZIONE & CITAZIONE ── */}
      <section className="pt-16 md:pt-24 px-6 max-w-7xl mx-auto">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="bg-bg-neutral border-l-4 border-gold p-8 rounded-r-sm text-left shadow-sm">
               <p className="text-navy text-xl md:text-2xl font-light italic leading-relaxed">
                  "Dal dato reale alla modellazione digitale: l'acquisizione metrica ad alta precisione è il presupposto imprescindibile per ogni intervento di qualità, restauro o progettazione esecutiva."
               </p>
               <span className="text-gold text-xs font-bold uppercase tracking-wider block mt-4">— Arch. Mario Biondi, MBA Studio</span>
            </div>
            
            <p className="text-text-main text-base md:text-lg font-light leading-relaxed text-center">
               MBA Studio integra le più avanzate tecnologie di **Reality Capture** (Laser Scanner 3D terricolo, droni UAV fotogrammetrici e stazioni GNSS GPS topografiche) per rilevare fabbricati esistenti, complessi storici vincolati, infrastrutture ed aree territoriali complesse, garantendo tolleranze metriche rigorose e restituzioni Scan-to-BIM certificate.
            </p>
            <div className="w-16 h-px bg-gold mx-auto pt-2" />
         </div>
      </section>

      {/* ── 10 ATTIVITÀ E SERVIZI SPECIALISTICI PORTFOLIO ── */}
      <section className="py-16 md:py-28 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Competenze Tecniche Avanzate</span>
               <h2 className="text-navy text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Panorama Servizi & Attività Specialistici.
               </h2>
               <p className="text-text-main text-sm md:text-base font-light max-w-2xl mx-auto mt-4">
                  Soluzioni su misura per lo studio di architettura, la pubblica amministrazione e l'impresa di costruzioni.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {serviziSpecialistici.map((item) => {
                  const IconComp = item.icon;
                  return (
                     <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-bg-neutral p-8 rounded-sm border border-navy/5 hover:border-gold/60 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
                     >
                        <div>
                           <div className="flex items-center justify-between mb-6">
                              <span className="text-gold font-mono text-xs font-bold">{item.id}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-white border border-navy/10 rounded-full text-navy group-hover:border-gold group-hover:text-gold transition-colors">
                                 {item.tag}
                              </span>
                           </div>
                           <div className="p-3.5 bg-white border border-gold/20 text-gold w-fit mb-5 rounded-sm group-hover:bg-gold group-hover:text-navy transition-colors">
                              <IconComp size={24} />
                           </div>
                           <h3 className="text-navy text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                           <p className="text-text-main text-xs md:text-sm font-light leading-relaxed mb-4">
                              {item.desc}
                           </p>
                        </div>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── METROLOGIA & TABELLA PARAMETRI DI ACCURATEZZA PORTFOLIO ── */}
      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Standard Metrologici Certificati</span>
               <h2 className="text-white text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Parametri di Accuratezza & Controllo Qualità.
               </h2>
               <p className="text-white/70 text-sm font-light max-w-2xl mx-auto mt-4">
                  I dati estratti dalle nostre campate di scansione rispettano i più elevati requisiti di tolleranza metrica del settore.
               </p>
            </div>

            {/* TABELLA GRID METRICHE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
               {metricheQualita.map((m, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-sm backdrop-blur-sm hover:border-gold/60 transition-all space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-gold font-mono font-bold text-2xl">{m.val}</span>
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                           <CheckCircle2 size={12} /> {m.state}
                        </div>
                     </div>
                     <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-tight mb-1">{m.label}</h4>
                        <span className="text-gold/80 text-xs font-mono block mb-2">Tolleranza: {m.tolerance}</span>
                        <p className="text-white/60 text-xs font-light leading-relaxed">{m.desc}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-sm max-w-3xl mx-auto text-center">
               <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                  📌 <strong className="text-gold">Validazione dei Dati:</strong> Il processo di registrazione nuvole di punti viene effettuato mediante algoritmo Cloud-to-Cloud con vincolo rigido sui capisaldi GCP (Ground Control Points) acquisiti tramite GNSS RTK, garantendo l'assenza di deformazioni sferiche o derive di coordinate.
               </p>
            </div>
         </div>
      </section>

      {/* ── AMBITI APPLICATIVI & CASE STUDIES DI CANTIERE ── */}
      <section className="py-16 md:py-28 bg-bg-neutral border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Esperienza sul Campo</span>
               <h2 className="text-navy text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Categorie di Intervento & Case Studies.
               </h2>
               <p className="text-text-main text-sm font-light max-w-2xl mx-auto mt-4">
                  Applicazioni concrete estratte dai nostri cantieri e rilievi eseguiti sul territorio nazionale.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
               {caseStudiesCantiere.map((cs) => (
                  <div key={cs.num} className="bg-white p-8 border border-navy/10 rounded-sm shadow-sm hover:border-gold transition-all flex flex-col justify-between">
                     <div>
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-gold font-mono font-bold text-xl">{cs.num}</span>
                           <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60 bg-bg-neutral px-3 py-1 rounded-sm border border-navy/5">
                              {cs.category}
                           </span>
                        </div>
                        <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4 leading-snug">{cs.title}</h3>
                        <p className="text-text-main text-xs md:text-sm font-light leading-relaxed mb-6">
                           {cs.desc}
                        </p>
                     </div>
                     <ul className="space-y-2.5 border-t border-navy/5 pt-6">
                        {cs.points.map((pt, i) => (
                           <li key={i} className="flex items-start gap-2.5 text-xs text-navy/80 font-medium">
                              <span className="text-gold font-bold">✓</span> {pt}
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>

            {/* LEGENDA CODICI MAPPARATURA DEGRADO */}
            <div className="bg-white p-8 border border-navy/10 rounded-sm shadow-sm max-w-5xl mx-auto">
               <div className="text-center mb-8">
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] block mb-2">Normativa & Classificazione</span>
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight">Codifica Tecnica Mappatura Degrado & Quadro Fessurativo</h3>
                  <p className="text-text-main text-xs font-light max-w-2xl mx-auto mt-2">
                     Codici identificativi utilizzati nei nostri elaborati grafici vettoriali sovrapposti all'ortofoto per il restauro conservativo:
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {codiciDegrado.map((cd) => (
                     <div key={cd.code} className={`p-4 rounded-sm border ${cd.color} space-y-1`}>
                        <div className="flex items-center gap-2">
                           <span className="font-mono font-bold text-sm uppercase px-2 py-0.5 bg-white/80 rounded border">{cd.code}</span>
                           <span className="font-bold text-xs uppercase text-navy">{cd.name}</span>
                        </div>
                        <p className="text-[11px] text-text-main font-light leading-relaxed pt-1">
                           {cd.desc}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ── SHOWCASE GALLERIA INTERATTIVA TAVOLE PORTFOLIO ── */}
      <section className="py-16 md:py-28 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Elaborati Grafici Reali</span>
               <h2 className="text-navy text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Galleria Tavole Portfolio Rilievi.
               </h2>
               <p className="text-text-main text-sm font-light max-w-2xl mx-auto mt-4">
                  Esplora le tavole di portfolio estrapolate direttamente dai nostri elaborati consegnati ai clienti. Clicca su qualsiasi tavola per ingrandire.
               </p>
            </div>

            {/* FILTRI CATEGORIA */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
               {[
                  { id: 'all', label: 'Tutte le Tavole' },
                  { id: 'laser', label: 'Laser Scanner & BIM' },
                  { id: 'drone', label: 'Aerofotogrammetria & GPS' },
                  { id: 'degrado', label: 'Mappatura Degrado' },
                  { id: 'ispezione', label: 'Ispezioni & Coperture' }
               ].map((f) => (
                  <button
                     key={f.id}
                     onClick={() => setActiveCategory(f.id)}
                     className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                        activeCategory === f.id
                           ? 'bg-navy text-white border border-navy shadow-sm'
                           : 'bg-bg-neutral text-navy/70 border border-navy/10 hover:border-gold hover:text-navy'
                     }`}
                  >
                     {f.label}
                  </button>
               ))}
            </div>

            {/* GRIGLIA TAVOLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredTavole.map((tavola) => (
                  <motion.div
                     key={tavola.id}
                     layout
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.3 }}
                     onClick={() => setSelectedImage(tavola)}
                     className="group cursor-pointer bg-bg-neutral border border-navy/10 rounded-sm overflow-hidden hover:border-gold transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                     <div>
                        <div className="relative aspect-[4/3] bg-white overflow-hidden border-b border-navy/5">
                           <img 
                              src={tavola.img} 
                              alt={tavola.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           />
                           <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-gold text-navy text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm inline-flex items-center gap-2 shadow-lg">
                                 <Maximize2 size={14} /> Ingrandisci Tavola
                              </span>
                           </div>
                           <div className="absolute top-3 left-3 bg-navy/90 text-gold font-mono font-bold text-[11px] px-2.5 py-1 rounded-sm">
                              {tavola.tavolaNum}
                           </div>
                        </div>

                        <div className="p-6">
                           <span className="text-gold text-[10px] font-bold uppercase tracking-wider block mb-1">
                              {tavola.categoryLabel}
                           </span>
                           <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors leading-snug">
                              {tavola.title}
                           </h3>
                           <p className="text-text-main text-xs font-light leading-relaxed line-clamp-2 mb-4">
                              {tavola.desc}
                           </p>
                        </div>
                     </div>

                     <div className="px-6 pb-6 pt-0">
                        <div className="flex flex-wrap gap-1.5 border-t border-navy/5 pt-4">
                           {tavola.highlights.map((h, i) => (
                              <span key={i} className="text-[10px] font-semibold bg-white border border-navy/10 text-navy/70 px-2 py-0.5 rounded-sm">
                                 #{h}
                              </span>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── MODAL LIGHTBOX INGANDIMENTO TAVOLA ── */}
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

                  <div className="w-full md:w-1/3 p-8 flex flex-col justify-between bg-white">
                     <div>
                        <div className="inline-block bg-gold/10 border border-gold/30 text-navy font-mono font-bold text-xs px-3 py-1 rounded-sm mb-4">
                           {selectedImage.tavolaNum} • {selectedImage.categoryLabel}
                        </div>

                        <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-3 leading-snug">
                           {selectedImage.title}
                        </h3>

                        <p className="text-text-main text-xs md:text-sm font-light leading-relaxed mb-6">
                           {selectedImage.desc}
                        </p>

                        <div className="space-y-3 border-t border-navy/10 pt-4">
                           <h4 className="text-navy text-xs font-bold uppercase tracking-wider">Caratteristiche dell'Elaborato:</h4>
                           <ul className="space-y-2">
                              {selectedImage.highlights.map((hl, idx) => (
                                 <li key={idx} className="flex items-center gap-2 text-xs text-navy/80">
                                    <CheckCircle2 size={14} className="text-gold" /> {hl}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     <div className="mt-8 pt-4 border-t border-navy/10">
                        <Link 
                           to="/contatti" 
                           onClick={() => setSelectedImage(null)}
                           className="btn-ghost-dark w-full py-3 text-xs flex items-center justify-center gap-2"
                        >
                           Richiedi Elaborati Simili <ChevronRight size={16} />
                        </Link>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* ── STRUMENTAZIONE ED ATTREZZATURE ── */}
      <section className="py-16 md:py-28 bg-bg-neutral border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Attrezzature d'Avanguardia</span>
               <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Hardware & Sensori per la Cattura del Reale.
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
                        className="group flex flex-col bg-white border border-navy/5 rounded-sm overflow-hidden hover:border-gold transition-all duration-500 shadow-sm hover:shadow-md"
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
                              <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-1 group-hover:text-gold transition-colors">{device.title}</h3>
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

      {/* ── OUTPUT & CONSEGNABILI ── */}
      <section className="py-16 md:py-28 bg-white border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Consegnabili Tecnologici</span>
               <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
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
                     <div key={index} className="bg-bg-neutral p-8 border border-navy/5 rounded-sm shadow-sm hover:shadow-md hover:border-gold/60 transition-all space-y-4 group">
                        <div className="flex items-center justify-between">
                           <span className="text-gold font-mono font-bold text-lg">{item.step}</span>
                           <div className="p-2 bg-white text-navy group-hover:bg-gold group-hover:text-navy transition-colors rounded-sm border border-navy/5">
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

      {/* ── WORKFLOW IN 4 FASI ── */}
      <section className="py-16 md:py-28 bg-bg-neutral">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Processo Operativo</span>
               <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Il Workflow del Rilievo Integrato.
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {fasiWorkflow.map((item, index) => (
                  <div key={index} className="border-t-2 border-navy/20 pt-6 hover:border-gold transition-colors space-y-3">
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
               className="w-full h-full object-cover grayscale brightness-[0.2]" 
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
               <h2 className="text-white text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Precisione Millimetrica per la Progettazione.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Scan size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Laser Scanner 3D</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Digitalizzazione rapida di volumi ed ambienti articolati con nuvole di punti ad altissima densità.
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Plane size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Aerofotogrammetria</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Rilievi ad alta quota per grandi estensioni territoriali, rilievi di tetti e modelli DTM/DEM.
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
            <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
               Digitalizza il Tuo <br /> Sito o Fabbricato.
            </h2>
            <p className="text-text-main text-sm md:text-base font-light mb-12">
               Richiedi un preventivo personalizzato per un rilievo integrato con laser scanner 3D, drone fotogrammetrico o GPS topografico.
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
