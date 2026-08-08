import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { 
  Phone, 
  Envelope, 
  MapPin, 
  LinkedinLogo,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle
} from '@phosphor-icons/react';

export default function Contatti() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      'service_od2a7vl', 
      'template_l3nwcxc', 
      form.current!, 
      '52uGw8ssiyzXY1hIA'
    )
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          form.current?.reset();
          setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO CON SFUMATURA ORIGINALE ── */}
      <section className="relative min-h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            className="w-full h-full object-cover grayscale opacity-25" 
            alt="MBA Progetti Contatti"
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
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Contattaci</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
                I Nostri Contatti.
             </h1>
             <p className="text-white/80 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                Hai bisogno di supporto per una gara d'appalto OEPV, una progettazione esecutiva o un rilievo 3D? Parla direttamente con il team di MBA Progetti.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── CONTACT GRID ELEGANTE ── */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-8">
               <div>
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Sede Principale</span>
                  <h2 className="text-navy text-2xl font-bold uppercase tracking-tight mb-4">MBA Progetti</h2>
                  
                  <div className="space-y-4 text-navy/80 text-xs sm:text-sm font-light leading-relaxed">
                     <div className="flex items-start gap-3">
                        <MapPin size={20} className="text-gold shrink-0 mt-0.5" />
                        <div>
                           <strong className="block font-bold text-navy">Indirizzo:</strong>
                           Via Sardarulo, 7 — 81016 San Potito Sannitico (CE)
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <Phone size={20} className="text-gold shrink-0 mt-0.5" />
                        <div>
                           <strong className="block font-bold text-navy">Telefono / Whatsapp:</strong>
                           <a href="tel:+393286285861" className="hover:text-gold transition-colors">+39 328 628 5861</a>
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <Envelope size={20} className="text-gold shrink-0 mt-0.5" />
                        <div>
                           <strong className="block font-bold text-navy">Email:</strong>
                           <a href="mailto:info@mbaprogetti.it" className="hover:text-gold transition-colors">info@mbaprogetti.it</a>
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <Clock size={20} className="text-gold shrink-0 mt-0.5" />
                        <div>
                           <strong className="block font-bold text-navy">Orari Studio:</strong>
                           Lunedì – Venerdì: 09:00 – 18:00
                        </div>
                     </div>

                     <div className="flex items-start gap-3 pt-2">
                        <LinkedinLogo size={20} className="text-gold shrink-0 mt-0.5" />
                        <div>
                           <strong className="block font-bold text-navy">Social & Network:</strong>
                           <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors underline">Seguici su LinkedIn</a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Mappa Google Placeholder */}
               <div className="aspect-video bg-bg-neutral rounded-sm border border-navy/10 overflow-hidden relative shadow-xs">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.123456789!2d14.3912345!3d41.3312345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133a8fb0bc000001%3A0x0!2sVia%20Sardarulo%2C%207%2C%2081016%20San%20Potito%20Sannitico%20CE!5e0!3m2!1sit!2sit!4v1620830000000!5m2!1sit!2sit" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                  ></iframe>
               </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-bg-neutral/60 border border-navy/10 p-6 sm:p-10 rounded-sm">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Richiesta Informazioni</span>
               <h2 className="text-navy text-2xl font-bold uppercase tracking-tight mb-6">
                  Inviaci un Messaggio
               </h2>
               
               <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <InputGroup name="user_name" label="Nome e Cognome" placeholder="Mario Rossi" required />
                     <InputGroup name="company" label="Impresa / Studio" placeholder="Impresa Costruzioni Srl" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <InputGroup name="user_email" label="Indirizzo Email" placeholder="mario@impresa.it" type="email" required />
                     <InputGroup name="phone" label="Recapito Telefonico" placeholder="+39 333 0000000" />
                  </div>
                  <InputGroup name="service" label="Servizio d'Interesse" placeholder="Es. Gare OEPV / Rilievi 3D / BIM" />
                  
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-bold uppercase tracking-wider text-navy/70">Messaggio / Dettagli Commessa</label>
                     <textarea 
                        name="message" 
                        rows={4}
                        placeholder="Descrivi brevemente l'opera, la procedura di gara o la tipologia di rilievo richiesta..."
                        className="w-full bg-white border border-navy/15 rounded-sm p-3 text-navy text-xs font-light focus:outline-none focus:border-gold transition-colors"
                        required
                     />
                  </div>

                  <button 
                     type="submit" 
                     disabled={status === 'sending'}
                     className="btn-ghost-dark w-full py-3.5 text-xs flex items-center justify-center gap-2"
                  >
                     {status === 'sending' ? (
                        <span>Invio in corso...</span>
                     ) : (
                        <>
                           Invia la Tua Richiesta <ArrowRight size={16} />
                        </>
                     )}
                  </button>

                  {status === 'success' && (
                     <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-sm border border-emerald-200 text-xs font-medium">
                        <CheckCircle size={18} /> Messaggio inviato con successo! Ti risponderemo a breve.
                     </div>
                  )}

                  {status === 'error' && (
                     <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-sm border border-red-200 text-xs font-medium">
                        <XCircle size={18} /> Errore durante l'invio. Riprova o contattaci telefonicamente.
                     </div>
                  )}
               </form>
            </div>

         </div>
      </section>

    </div>
  );
}

function InputGroup({ label, name, placeholder, type = "text", required = false }: any) {
   return (
      <div className="space-y-1.5">
         <label className="text-[10px] font-bold uppercase tracking-wider text-navy/70">{label}</label>
         <input 
            type={type} 
            name={name}
            placeholder={placeholder}
            required={required}
            className="w-full bg-white border border-navy/15 rounded-sm p-3 text-navy text-xs font-light focus:outline-none focus:border-gold transition-colors"
         />
      </div>
   );
}
