import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BIM() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO CON SFUMATURA ORIGINALE ── */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            className="w-full h-full object-cover grayscale opacity-25" 
            alt="BIM Strategy"
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
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Building Information Modeling</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-4">
                BIM Strategy.
             </h1>
             <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Gestione, coordinamento e condivisione delle informazioni di progetto per un controllo totale del ciclo edilizio.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── IL MODELLO COME BASE DI CONOSCENZA DELL'EDIFICIO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
            DIGITALIZZAZIONE DEL COSTRUITO
          </span>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            IL MODELLO COME BASE DI CONOSCENZA DELL’EDIFICIO
          </h2>
        </div>

        {/* 2-Column Grid: Text a Sinistra, Visual Villa BIM a Destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          {/* Left Column: Description */}
          <div className="lg:col-span-6 space-y-5 text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed font-outfit">
            <p>
              Convertiamo il rilievo di <strong className="text-navy font-bold">edifici e complessi esistenti</strong> in <strong className="text-navy font-bold">modelli informativi</strong> e applichiamo il BIM alla progettazione di nuove opere. Operiamo grazie a <strong className="text-navy font-bold">consolidati rapporti di collaborazione</strong> con professionisti specializzati in rilievo e modellazione BIM, che affiancano lo studio in ogni fase e consentono di raccogliere geometrie, materiali e dati in un’unica fonte, coordinata e verificabile.
            </p>
            <p>
              Dal progetto alla manutenzione, <strong className="text-navy font-bold">le informazioni restano accessibili</strong> a progettisti, imprese e gestori, senza dover rilevare o ridisegnare due volte lo stesso edificio. Il coordinamento dell’incarico resta in capo all’arch. Mario Biondi, <strong className="text-navy font-bold">interlocutore unico</strong> per la committenza.
            </p>
          </div>

          {/* Right Column: Visual Villa Point Cloud / Wireframe */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group">
              <img
                src="/media/bim_modello_conoscenza.jpg"
                alt="BIM Modello Come Base di Conoscenza dell'Edificio"
                className="w-full h-auto max-h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SCAN TO BIM: DALLA NUVOLA DI PUNTI AL MODELLO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            SCAN TO BIM
          </span>
        </div>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-[1px] bg-navy flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" />
              <path d="M12 12l8-4.5" />
              <path d="M12 12v10" />
              <path d="M12 12L4 7.5" />
            </svg>
          </div>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            DALLA NUVOLA DI PUNTI AL MODELLO
          </h2>
        </div>

        <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-4xl mb-10 font-outfit">
          La nuvola di punti georeferenziata, acquisita con laser scanner e drone, viene convertita in un <strong className="text-navy font-bold">modello parametrico 3D</strong> sviluppato con <strong className="text-navy font-bold">Autodesk Revit</strong> e <strong className="text-navy font-bold">ReCap Pro</strong> (o equivalente). Geometrie, spessori murari e componenti strutturali sono <strong className="text-navy font-bold">verificati sul costruito</strong>.
        </p>

        {/* Visual a piena larghezza: Split Nuvola di Punti / Modello Lineare BIM */}
        <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group bg-white">
          <img
            src="/media/bim_scan_to_model_split.jpg"
            alt="Confronto Nuvola di Punti Laser Scanner e Modello Parametrico BIM"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </section>

      {/* ── HBIM: IL PATRIMONIO STORICO IN UN MODELLO ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            HBIM
          </span>
        </div>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-[1px] bg-navy flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 21V10a8 8 0 0 1 16 0v11" />
              <path d="M8 21V11a4 4 0 0 1 8 0v10" />
              <line x1="2" y1="21" x2="22" y2="21" />
            </svg>
          </div>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            IL PATRIMONIO STORICO IN UN MODELLO
          </h2>
        </div>

        <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-4xl mb-10 font-outfit">
          Per i <strong className="text-navy font-bold">beni storici vincolati</strong> la modellazione restituisce volte, archi, murature irregolari ed elementi decorativi con il livello di dettaglio richiesto dal <strong className="text-navy font-bold">restauro</strong>, e li collega alla mappatura del degrado e del quadro fessurativo.
        </p>

        {/* Visual a piena larghezza: Split Nuvola di Punti / Disegno HBIM */}
        <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group bg-white">
          <img
            src="/media/bim_hbim_storico_split.jpg"
            alt="HBIM Modellazione Patrimonio Storico e Beni Vincolati"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </section>

      {/* ── BIM PER LA PROGETTAZIONE: UN UNICO MODELLO PER TUTTE LE DISCIPLINE ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            BIM PER LA PROGETTAZIONE
          </span>
        </div>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-[1px] bg-navy flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="12" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="18" cy="12" r="2" />
              <circle cx="18" cy="18" r="2" />
              <path d="M8 11.2l8-4.4" />
              <path d="M8 12h8" />
              <path d="M8 12.8l8 4.4" />
            </svg>
          </div>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            UN UNICO MODELLO PER TUTTE LE DISCIPLINE
          </h2>
        </div>

        <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-4xl mb-10 font-outfit">
          Nelle nuove opere <strong className="text-navy font-bold">architettura, strutture e impianti</strong> confluiscono in un modello coordinato, che consente di verificare le interferenze prima del cantiere e di <strong className="text-navy font-bold">validare le informazioni</strong> condivise tra i progettisti.
        </p>

        {/* Visual a piena larghezza: Split Nuvola di Punti / Modello Multidisciplinare */}
        <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group bg-white">
          <img
            src="/media/bim_multidisciplinare_split.jpg"
            alt="BIM Multidisciplinare Architettura Strutture Impianti"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </section>

      {/* ── MODELLI AS BUILT E DATI: INFORMAZIONI PRONTE PER ESSERE USATE ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            MODELLI AS BUILT E DATI
          </span>
        </div>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-[1px] bg-navy flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="7" ry="2.5" />
              <path d="M5 5v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
              <path d="M5 10v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" />
              <path d="M5 15v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
            </svg>
          </div>
          <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading">
            INFORMAZIONI PRONTE PER ESSERE USATE
          </h2>
        </div>

        <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-4xl mb-10 font-outfit">
          Il modello <strong className="text-navy font-bold">as built</strong> fotografa l'opera come realizzata e organizza <strong className="text-navy font-bold">dataset 2D e 3D interoperabili</strong>, pronti per l'integrazione nei flussi di lavoro di committenti e gestori: manutenzione, ristrutturazioni, nuove progettazioni.
        </p>

        {/* Visual a piena larghezza: Nuvola di Punti As Built Urban */}
        <div className="relative rounded-[1px] overflow-hidden border border-navy/10 shadow-sm group bg-white">
          <img
            src="/media/bim_as_built_data.jpg"
            alt="Modelli As Built e Dataset Interoperabili"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>
      </section>

      {/* ── GARE OEV: IL BIM AL SERVIZIO DELL'OFFERTA ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            GARE OEV
          </span>
        </div>

        <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-heading mb-6">
          IL BIM AL SERVIZIO DELL’OFFERTA
        </h2>

        <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-4xl mb-8 font-outfit">
          Rilievo e modello sono strumenti che lo studio mette a disposizione delle offerte tecniche migliorative: verificano lo <strong className="text-navy font-bold">stato di fatto</strong> e rendono misurabili le proposte presentate alla commissione.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            to="/servizi/gare"
            className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-6 py-3.5 rounded-[1px] text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-between min-w-[190px] shadow-2xs group"
          >
            <span>GARE OEV</span>
            <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
          </Link>
          <Link
            to="/servizi/rilievi"
            className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-6 py-3.5 rounded-[1px] text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-between min-w-[190px] shadow-2xs group"
          >
            <span>RILIEVI</span>
            <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
          </Link>
        </div>

        {/* ── BANNER CONTATTI ── */}
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-gold p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-navy text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-heading">
              HAI BISOGNO DI UN MODELLO BIM?
            </h3>
            <p className="text-navy/75 text-sm sm:text-base font-outfit mt-2">
              Indicaci l'edificio e l'uso previsto: definiamo insieme il livello di dettaglio.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-navy text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-gold transition-colors inline-flex items-center justify-center gap-4 rounded-[1px] shadow-sm shrink-0"
          >
            <span>CONTATTACI</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
