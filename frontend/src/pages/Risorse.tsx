import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calculator, BookOpen, X, CalendarBlank, User } from '@phosphor-icons/react';
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
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Resources"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.8em] mb-6 md:mb-8 block">Toolbox per le Imprese</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter">
                Risorse & <br /> <span className="text-stroke-white">Tools.</span>
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── INTRO / SELECTION ── */}
      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bg-neutral p-6 sm:p-12 group hover:bg-navy transition-all duration-700">
               <Calculator size={48} weight="thin" className="text-gold mb-6 md:mb-8 group-hover:scale-110 transition-transform" />
               <h3 className="text-navy group-hover:text-white text-3xl font-bold uppercase tracking-tighter mb-4">Calcolo Ribasso</h3>
               <p className="text-text-main group-hover:text-white/60 font-light mb-8">Simula il punteggio economico ottenibile in funzione del ribasso offerto.</p>
               <a href="#calculator" className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2">Vai allo strumento <ArrowRight /></a>
            </div>
            <div className="bg-bg-neutral p-6 sm:p-12 group hover:bg-navy transition-all duration-700">
               <BookOpen size={48} weight="thin" className="text-gold mb-6 md:mb-8 group-hover:scale-110 transition-transform" />
               <h3 className="text-navy group-hover:text-white text-3xl font-bold uppercase tracking-tighter mb-4">Approfondimenti</h3>
               <p className="text-text-main group-hover:text-white/60 font-light mb-8">Articoli e aggiornamenti su normativa, tecniche e strategie per le gare OEPV.</p>
               <a href="#articles" className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2">Leggi gli articoli <ArrowRight /></a>
            </div>
         </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-12 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:mb-24">
               <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Simulatore OEPV</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">
                  Calcolo del <br /> Ribasso Economico.
               </h2>
               <p className="text-text-main text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                  Nelle gare d'appalto OEPV, il punteggio economico viene calcolato applicando formule matematiche definite dal disciplinare. Questo strumento consente di simulare il punteggio economico ottenibile in funzione del ribasso offerto, per le quattro formule più utilizzate nelle gare pubbliche italiane.
               </p>
            </div>

            <Simulatore />
         </div>
      </section>

      {/* ── ARTICLES (DYNAMIC FROM ARTICLES DATA STORE) ── */}
      <section id="articles" className="py-12 md:py-32 bg-bg-neutral">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:mb-24 text-center">
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Approfondimenti Tecnici</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8">
                  Knowledge <br /> Sharing.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
              className="bg-white max-w-3xl w-full p-8 sm:p-12 relative my-auto shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 text-navy/40 hover:text-navy transition-colors p-2"
              >
                <X size={24} />
              </button>

              <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-3 block">
                {selectedArticle.category}
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter mb-6 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-6 text-navy/50 text-xs font-bold uppercase tracking-widest border-y border-navy/10 py-4 mb-8">
                <span className="flex items-center gap-2">
                  <CalendarBlank size={16} className="text-gold" /> {selectedArticle.publishedAt}
                </span>
                <span className="flex items-center gap-2">
                  <User size={16} className="text-gold" /> {selectedArticle.author}
                </span>
              </div>

              <div className="aspect-video mb-8 overflow-hidden bg-navy">
                <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-navy/90 font-light leading-relaxed text-base sm:text-lg mb-8 whitespace-pre-line">
                {selectedArticle.content}
              </p>

              <div className="pt-6 border-t border-navy/10 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="btn-dark px-8 py-3 text-xs uppercase tracking-widest"
                >
                  Chiudi Articolo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FINAL CTA ── */}
      <section className="py-12 md:py-32 bg-navy text-center relative overflow-hidden">
        <div className="relative z-10 px-6">
           <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
              Hai bisogno di una <br /> Analisi Specifica?
           </h2>
           <Link to="/contatti" className="btn-ghost-white px-8 py-4 sm:px-20 sm:py-8 inline-flex items-center justify-center text-sm sm:text-base">
              Parla con i Nostri Esperti
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
      className="bg-white group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden border border-navy/5"
    >
       <div className="aspect-video overflow-hidden bg-navy">
          <img 
            src={article.coverImage} 
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
            alt={article.title} 
          />
       </div>
       <div className="p-6 sm:p-10">
          <span className="text-gold text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">{article.category}</span>
          <h4 className="text-navy text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-gold transition-colors line-clamp-2">{article.title}</h4>
          <p className="text-text-main text-sm font-light leading-relaxed mb-8 line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-navy font-bold text-[11px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
             Leggi Articolo <ArrowRight size={14} className="text-gold" />
          </div>
       </div>
    </div>
  );
}
