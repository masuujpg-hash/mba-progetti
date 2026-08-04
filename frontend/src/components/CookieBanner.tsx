import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-[9999] p-6"
        >
          <div className="max-w-7xl mx-auto bg-white border-t-2 border-gold shadow-[0_-20px-60px_rgba(0,0,0,0.1)] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-grow">
              <h4 className="text-navy text-[12px] font-bold uppercase tracking-[0.4em] mb-3">Cookie Policy</h4>
              <p className="text-navy/60 text-sm font-light leading-relaxed max-w-2xl">
                Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Navigando, accetti il nostro utilizzo dei cookie per scopi tecnici e analitici. 
                <Link to="/privacy" className="text-gold font-bold ml-2 hover:underline">Leggi la Policy completa</Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-4">
              <button 
                onClick={acceptCookies}
                className="bg-navy text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-navy transition-all duration-500"
              >
                Accetta
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
