import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="bg-white selection:bg-[#1b2a4a] selection:text-white pt-32">
      <section className="py-24 px-6 max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
            <span className="text-[#F5C400] text-[13px] font-medium uppercase tracking-[0.2em] mb-4 block font-outfit">Legal</span>
            <h1 className="text-[#1b2a4a] text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight mb-12 leading-tight font-outfit">
               Privacy & <br /> <span className="text-[#F5C400]">Cookie Policy.</span>
            </h1>

            <div className="space-y-10 text-[#3d4a66] font-normal leading-[1.7] font-outfit text-base">
               <div>
                  <h2 className="text-[#1b2a4a] text-xl sm:text-2xl font-semibold uppercase tracking-tight mb-4 font-outfit">Informativa sulla Privacy</h2>
                  <p className="max-w-[62ch]">
                     La presente Informativa sulla privacy descrive come MBA Progetti (di seguito "noi", "ci" o "nostro") raccoglie, utilizza e condivide le tue informazioni personali quando visiti il nostro sito web.
                  </p>
               </div>

               <div>
                  <h3 className="text-[#1b2a4a] text-lg font-semibold uppercase tracking-tight mb-3 font-outfit">1. Dati Raccolti</h3>
                  <p className="max-w-[62ch]">
                     Raccogliamo dati personali forniti volontariamente tramite i form di contatto, come nome, email e numero di telefono, al fine di rispondere alle tue richieste di consulenza o preventivo.
                  </p>
               </div>

               <div>
                  <h3 className="text-[#1b2a4a] text-lg font-semibold uppercase tracking-tight mb-3 font-outfit">2. Utilizzo dei Dati</h3>
                  <p className="max-w-[62ch]">
                     I dati raccolti vengono utilizzati esclusivamente per scopi professionali legati all'attività dello studio, per comunicazioni tecniche o commerciali richieste dall'utente e per adempiere ad obblighi di legge.
                  </p>
               </div>

               <div>
                  <h3 className="text-[#1b2a4a] text-lg font-semibold uppercase tracking-tight mb-3 font-outfit">3. Cookie Policy</h3>
                  <p className="max-w-[62ch]">
                     Il nostro sito utilizza cookie tecnici e analitici per migliorare l'esperienza di navigazione. I cookie sono piccoli file di testo salvati sul tuo dispositivo. Puoi gestire le tue preferenze sui cookie tramite il banner dedicato o le impostazioni del tuo browser.
                  </p>
               </div>

               <div>
                  <h3 className="text-[#1b2a4a] text-lg font-semibold uppercase tracking-tight mb-3 font-outfit">4. I Tuoi Diritti</h3>
                  <p className="max-w-[62ch]">
                     Hai il diritto di accedere, rettificare o cancellare i tuoi dati personali in nostro possesso. Per qualsiasi richiesta relativa alla privacy, puoi contattarci all'indirizzo email: <a href="mailto:arch.mariobiondi@gmail.com" className="text-[#F5C400] font-medium hover:underline">arch.mariobiondi@gmail.com</a>.
                  </p>
               </div>
               
               <div className="pt-10 border-t border-[#1b2a4a]/10 text-xs italic text-[#7b869d]">
                  Ultimo aggiornamento: Maggio 2026
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
}
