import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white pt-32">
      <section className="py-24 px-6 max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
         >
            <span className="text-gold text-xs font-bold uppercase tracking-[0.8em] mb-8 block">Legal</span>
            <h1 className="text-navy text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16 leading-none">
               Privacy & <br /> <span className="text-gold">Cookie Policy.</span>
            </h1>

            <div className="prose prose-navy max-w-none space-y-12 text-text-main font-light leading-relaxed">
               <div>
                  <h2 className="text-navy text-2xl font-bold uppercase tracking-tight mb-6">Informativa sulla Privacy</h2>
                  <p>
                     La presente Informativa sulla privacy descrive come MBA Progetti (di seguito "noi", "ci" o "nostro") raccoglie, utilizza e condivide le tue informazioni personali quando visiti il nostro sito web.
                  </p>
               </div>

               <div>
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4">1. Dati Raccolti</h3>
                  <p>
                     Raccogliamo dati personali forniti volontariamente tramite i form di contatto, come nome, email e numero di telefono, al fine di rispondere alle tue richieste di consulenza o preventivo.
                  </p>
               </div>

               <div>
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4">2. Utilizzo dei Dati</h3>
                  <p>
                     I dati raccolti vengono utilizzati esclusivamente per scopi professionali legati all'attività dello studio, per comunicazioni tecniche o commerciali richieste dall'utente e per adempiere ad obblighi di legge.
                  </p>
               </div>

               <div>
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4">3. Cookie Policy</h3>
                  <p>
                     Il nostro sito utilizza cookie tecnici e analitici per migliorare l'esperienza di navigazione. I cookie sono piccoli file di testo salvati sul tuo dispositivo. Puoi gestire le tue preferenze sui cookie tramite il banner dedicato o le impostazioni del tuo browser.
                  </p>
               </div>

               <div>
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4">4. I Tuoi Diritti</h3>
                  <p>
                     Hai il diritto di accedere, rettificare o cancellare i tuoi dati personali in nostro possesso. Per qualsiasi richiesta relativa alla privacy, puoi contattarci all'indirizzo email: <span className="text-gold font-bold">info@mbaprogetti.it</span>.
                  </p>
               </div>
               
               <div className="pt-12 border-t border-navy/5 text-xs italic opacity-60">
                  Ultimo aggiornamento: Maggio 2026
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
}
