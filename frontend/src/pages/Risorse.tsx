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
      <section className="relative h-[44vh] min-h-[320px] sm:h-[52vh] w-full flex items-center justify-center overflow-hidden bg-[#1B2A4A] font-outfit">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover object-center" 
            alt="Risorse e News MBA Progetti"
          />
          <div className="absolute inset-0 bg-[#1B2A4A]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2A4A]/80 via-[#1B2A4A]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 18 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-white/95 text-xs sm:text-[13px] font-medium uppercase tracking-[0.25em] mb-2.5 block">
               TOOLBOX PER LE IMPRESE
             </span>
             <h1 className="text-white text-4xl sm:text-5xl md:text-[56px] font-bold uppercase tracking-[0.04em] leading-[1.05] drop-shadow-sm">
                RISORSE &amp; NEWS
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── INTRO / SELECTION ── */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bg-neutral p-8 sm:p-12 rounded-[2px] border border-[#1b2a4a]/10 group hover:border-[#F5C400] transition-all duration-300 shadow-xs">
               <Calculator size={44} weight="regular" className="text-[#F5C400] mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-[#1b2a4a] text-2xl sm:text-3xl font-bold uppercase tracking-[0.05em] mb-3">Calcolo Ribasso</h3>
               <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mb-8 max-w-[62ch]">Simula il punteggio economico ottenibile in funzione del ribasso offerto.</p>
               <a href="#calculator" className="border border-[#1b2a4a]/25 hover:border-[#F5C400] text-[#1b2a4a] hover:text-[#F5C400] px-[26px] py-[15px] rounded-[2px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors inline-flex items-center justify-between min-w-[240px] shadow-2xs">
                 <span>Vai allo strumento</span>
                 <span>&gt;</span>
               </a>
            </div>
            <div className="bg-bg-neutral p-8 sm:p-12 rounded-[2px] border border-[#1b2a4a]/10 group hover:border-[#F5C400] transition-all duration-300 shadow-xs">
               <BookOpen size={44} weight="regular" className="text-[#F5C400] mb-6 group-hover:scale-110 transition-transform" />
               <h3 className="text-[#1b2a4a] text-2xl sm:text-3xl font-bold uppercase tracking-[0.05em] mb-3">Approfondimenti</h3>
               <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mb-8 max-w-[62ch]">Articoli e aggiornamenti su normativa, tecniche e strategie per le gare OEPV.</p>
               <a href="#articles" className="border border-[#1b2a4a]/25 hover:border-[#F5C400] text-[#1b2a4a] hover:text-[#F5C400] px-[26px] py-[15px] rounded-[2px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors inline-flex items-center justify-between min-w-[240px] shadow-2xs">
                 <span>Leggi gli articoli</span>
                 <span>&gt;</span>
               </a>
            </div>
         </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-16 md:py-24 bg-white border-t border-[#dfe3ea]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:mb-16">
               <span className="bg-[#F5C400] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
                  SIMULATORE OEPV
               </span>
               <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-4">
                  CALCOLO DEL RIBASSO ECONOMICO
               </h2>
               <p className="text-[#3d4a66] text-[16px] font-normal max-w-[62ch] leading-[1.7]">
                  Nelle gare d'appalto OEPV, il punteggio economico viene calcolato applicando formule matematiche definite dal disciplinare. Questo strumento consente di simulare il punteggio economico ottenibile in funzione del ribasso offerto, per le quattro formule più utilizzate nelle gare pubbliche italiane.
               </p>
            </div>

            <Simulatore />
         </div>
      </section>

      {/* ── ARTICLES (DYNAMIC FROM ARTICLES DATA STORE) ── */}
      <section id="articles" className="py-16 md:py-24 bg-bg-neutral/40 border-t border-[#dfe3ea]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:mb-16 text-center">
               <span className="bg-[#F5C400] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block mb-3 shadow-xs">
                  APPROFONDIMENTI TECNICI
               </span>
               <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-3">
                  AGGIORNAMENTI DALLO STUDIO
               </h2>
               <p className="text-[#3d4a66] text-[16px] font-normal max-w-[62ch] mx-auto leading-[1.7]">
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

              <div className="flex items-center gap-6 text-[#7b869d] text-xs font-medium uppercase tracking-[0.15em] border-y border-[#1b2a4a]/10 py-4 mb-8 font-outfit">
                <span className="flex items-center gap-2">
                  <CalendarBlank size={16} className="text-[#F5C400]" /> {selectedArticle.publishedAt}
                </span>
                <span className="flex items-center gap-2">
                  <User size={16} className="text-[#F5C400]" /> {selectedArticle.author || 'Redazione MBA'}
                </span>
              </div>

              <div className="aspect-video mb-8 overflow-hidden bg-neutral-100 rounded-[2px]">
                <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-[#3d4a66] font-normal leading-[1.7] text-base mb-8 whitespace-pre-line font-outfit">
                {selectedArticle.content}
              </p>

              <div className="pt-6 border-t border-[#1b2a4a]/10 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="border border-[#1b2a4a]/30 hover:border-[#F5C400] text-[#1b2a4a] hover:text-[#F5C400] px-6 py-3 rounded-[2px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors font-outfit"
                >
                  Chiudi Articolo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BANNER CONTATTI ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-[#1b2a4a]/10">
        <div className="mb-4">
          <span className="bg-[#F5C400] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[2px] inline-block font-outfit">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-[#F5C400] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-[#1b2a4a] text-xl sm:text-2xl md:text-[28px] font-semibold uppercase tracking-tight font-outfit">
              HAI BISOGNO DI UN'ANALISI SPECIFICA PER UNA GARA?
            </h3>
            <p className="text-[#3d4a66] text-base font-outfit mt-2 leading-[1.7]">
              Parla con il team di MBA Progetti: valutiamo insieme bando e disciplinare.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-[#1b2a4a] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-[26px] py-[15px] min-w-[240px] hover:bg-[#F5C400] transition-colors inline-flex items-center justify-between rounded-[2px] shrink-0 font-outfit"
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
      className="bg-white group cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden border border-[#1b2a4a]/10 rounded-[2px]"
    >
       <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
          <img 
            src={article.coverImage} 
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
            alt={article.title} 
          />
       </div>
       <div className="p-6 sm:p-7">
          <span className="text-[#F5C400] text-[12px] font-medium uppercase tracking-[0.15em] mb-2 block font-outfit">{article.category}</span>
          <h4 className="text-[#1b2a4a] text-[18px] font-semibold uppercase tracking-tight mb-3 group-hover:text-[#F5C400] transition-colors line-clamp-2 font-outfit">{article.title}</h4>
          <p className="text-[#3d4a66] text-[15px] font-normal leading-[1.65] mb-6 line-clamp-3 font-outfit">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-[#1b2a4a] font-medium text-[11px] uppercase tracking-[0.2em] group-hover:text-[#F5C400] transition-colors font-outfit">
             <span>Leggi Articolo</span>
             <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
          </div>
       </div>
    </div>
  );
}
