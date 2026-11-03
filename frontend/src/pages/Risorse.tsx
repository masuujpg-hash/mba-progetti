import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, BookOpen, X, CalendarBlank, User } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Simulatore from '../components/Simulatore';
import { type Article } from '../data/articles';
import { getStoredArticles } from '../lib/contentStore';

export default function Risorse() {
  const [articleList, setArticleList] = useState<Article[]>(getStoredArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setArticleList(getStoredArticles());
    };
    window.addEventListener('mba_articles_updated', handleUpdate);
    return () => window.removeEventListener('mba_articles_updated', handleUpdate);
  }, []);

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] md:h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-25" 
            alt="Resources"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 block font-outfit">
               TOOLBOX PER LE IMPRESE
             </span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] leading-[1.2] mb-4 font-outfit">
                RISORSE &amp; NEWS
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── INTRO / SELECTION ── */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bg-neutral p-8 sm:p-12 rounded-[1px] border border-navy/10 group hover:border-gold transition-all duration-300 shadow-xs">
               <Calculator size={44} weight="regular" className="text-gold mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-navy text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3 font-outfit">Calcolo Ribasso</h3>
               <p className="text-[#475569] text-base md:text-[17px] font-normal leading-relaxed mb-8 font-outfit">Simula il punteggio economico ottenibile in funzione del ribasso offerto.</p>
               <a href="#calculator" className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-6 py-3 rounded-[1px] text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2 shadow-2xs font-outfit">
                 <span>Vai allo strumento</span>
                 <span>&gt;</span>
               </a>
            </div>
            <div className="bg-bg-neutral p-8 sm:p-12 rounded-[1px] border border-navy/10 group hover:border-gold transition-all duration-300 shadow-xs">
               <BookOpen size={44} weight="regular" className="text-gold mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-navy text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3 font-outfit">Approfondimenti</h3>
               <p className="text-[#475569] text-base md:text-[17px] font-normal leading-relaxed mb-8 font-outfit">Articoli e aggiornamenti su normativa, tecniche e strategie per le gare OEPV.</p>
               <a href="#articles" className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-6 py-3 rounded-[1px] text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2 shadow-2xs font-outfit">
                 <span>Leggi gli articoli</span>
                 <span>&gt;</span>
               </a>
            </div>
         </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-16 md:py-24 bg-white border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:mb-16">
               <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
                  SIMULATORE OEPV
               </span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-outfit mb-4">
                  CALCOLO DEL RIBASSO ECONOMICO
               </h2>
               <p className="text-[#475569] text-base md:text-[17px] font-normal max-w-3xl leading-[1.65] font-outfit">
                  Nelle gare d'appalto OEPV, il punteggio economico viene calcolato applicando formule matematiche definite dal disciplinare. Questo strumento consente di simulare il punteggio economico ottenibile in funzione del ribasso offerto, per le quattro formule più utilizzate nelle gare pubbliche italiane.
               </p>
            </div>

            <Simulatore />
         </div>
      </section>

      {/* ── ARTICLES (DYNAMIC FROM ARTICLES DATA STORE) ── */}
      <section id="articles" className="py-16 md:py-24 bg-bg-neutral/40 border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:mb-16 text-center">
               <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
                  APPROFONDIMENTI TECNICI
               </span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-outfit mb-3">
                  AGGIORNAMENTI DALLO STUDIO
               </h2>
               <p className="text-navy/85 text-[15px] sm:text-[17px] font-normal max-w-2xl mx-auto leading-relaxed font-outfit">
                  Gare aggiudicate, novità normative sul codice dei contratti e strumenti tecnici per le imprese.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {articleList.map((article) => (
                  <ArticleCard 
                     key={article.id}
                     article={article}
                     onClick={() => setSelectedArticle(article)}
                  />
               ))}
            </div>
         </div>
      </section>

      {/* ── ARTICLE FULL MODAL ── */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white max-w-3xl w-full p-8 sm:p-12 relative my-auto shadow-2xl max-h-[90vh] overflow-y-auto rounded-[1px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 text-navy/40 hover:text-navy transition-colors p-2"
              >
                <X size={24} />
              </button>

              <span className="bg-[#F5C400] text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
                {selectedArticle.category}
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-5 leading-tight font-outfit">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-6 text-navy/60 text-xs font-bold uppercase tracking-widest border-y border-navy/10 py-4 mb-8 font-outfit">
                <span className="flex items-center gap-2">
                  <CalendarBlank size={16} className="text-gold" /> {selectedArticle.publishedAt}
                </span>
                <span className="flex items-center gap-2">
                  <User size={16} className="text-gold" /> {selectedArticle.author || 'Redazione MBA'}
                </span>
              </div>

              <div className="aspect-video mb-8 overflow-hidden bg-neutral-100 rounded-[1px]">
                <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-[#475569] font-normal leading-relaxed text-base md:text-[17px] mb-8 whitespace-pre-line font-outfit">
                {selectedArticle.content}
              </p>

              <div className="pt-6 border-t border-navy/10 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-8 py-3 rounded-[1px] text-xs font-bold uppercase tracking-widest transition-colors font-outfit"
                >
                  Chiudi Articolo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              HAI BISOGNO DI UN'ANALISI SPECIFICA PER UNA GARA?
            </h3>
            <p className="text-navy/75 text-sm sm:text-base font-outfit mt-2">
              Parla con il team di MBA Progetti: valutiamo insieme bando e disciplinare.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-navy text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-gold transition-colors inline-flex items-center justify-center gap-4 rounded-[1px] shadow-sm shrink-0 font-outfit"
          >
            <span>PARLA CON GLI ESPERTI</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white group cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden border border-navy/10 rounded-[1px]"
    >
       <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
          <img 
            src={article.coverImage} 
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
            alt={article.title} 
          />
       </div>
       <div className="p-6 sm:p-7">
          <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2 block font-outfit">{article.category}</span>
          <h4 className="text-navy text-lg sm:text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-gold transition-colors line-clamp-2 font-outfit">{article.title}</h4>
          <p className="text-[#475569] text-sm sm:text-[15px] font-normal leading-relaxed mb-6 line-clamp-3 font-outfit">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-widest group-hover:text-gold transition-colors font-outfit">
             <span>Leggi Articolo</span>
             <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
          </div>
       </div>
    </div>
  );
}
