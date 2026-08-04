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

    // NOTE: Replace these with your actual EmailJS credentials
    // SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY
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
      
      {/* ── CONTACT HERO ── */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Contacts"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.5em] sm:tracking-[0.8em] mb-8 block">Connettiamoci</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter">
                CONTATTA <br /> <span className="text-stroke-white opacity-40">LO STUDIO.</span>
            </h1>
           </motion.div>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-16 md:space-y-24">
               <div>
                  <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-8 block">Sede Principale</span>
                  <div className="flex items-start gap-8">
                     <MapPin size={40} weight="thin" className="text-gold shrink-0" />
                     <div>
                        <h3 className="text-navy text-2xl font-bold uppercase tracking-tighter mb-4">San Potito Sannitico</h3>
                        <p className="text-text-main text-lg font-light leading-relaxed">
                           Via Sardarulo, 7 <br /> 81016 San Potito Sannitico (CE)
                        </p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-navy/5">
                  <ContactItem 
                    icon={Phone}
                    title="Telefono"
                    val="+39 328 628 5861"
                    link="tel:+393286285861"
                  />
                  <ContactItem 
                    icon={Envelope}
                    title="Email"
                    val="info@mbaprogetti.it"
                    link="mailto:info@mbaprogetti.it"
                  />
                  <ContactItem 
                    icon={Clock}
                    title="Orari"
                    val="Lun - Ven: 09:00 - 18:00"
                  />
                  <ContactItem 
                    icon={LinkedinLogo}
                    title="Social"
                    val="LinkedIn Profile"
                    link="#"
                  />
               </div>

               <div className="aspect-video sm:aspect-square bg-bg-neutral relative overflow-hidden grayscale">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.123456789!2d14.3912345!3d41.3312345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133a8fb0bc000001%3A0x0!2sVia%20Sardarulo%2C%207%2C%2081016%20San%20Potito%20Sannitico%20CE!5e0!3m2!1sit!2sit!4v1620830000000!5m2!1sit!2sit" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
               </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-bg-neutral p-6 sm:p-12 md:p-24 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 text-[10vw] font-bold text-navy/[0.03] uppercase select-none pointer-events-none">Message</div>
               
               <div className="relative z-10">
                  <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
                     Inviaci un <br /> Messaggio.
                  </h2>
                  
                  <form ref={form} onSubmit={sendEmail} className="space-y-8 md:space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        <InputGroup name="user_name" label="Nome Completo" placeholder="Mario Rossi" required />
                        <InputGroup name="company" label="Azienda" placeholder="Impresa srl" />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        <InputGroup name="user_email" label="Email" placeholder="mario@impresa.it" type="email" required />
                        <InputGroup name="phone" label="Telefono" placeholder="+39 000 0000000" />
                     </div>
                     <InputGroup name="service" label="Servizio d'Interesse" placeholder="Gare OEPV / BIM / Reality Capture" />
                     
                     <div className="flex flex-col gap-4">
                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-navy/40">Messaggio</label>
                        <textarea 
                           name="message"
                           rows={6}
                           placeholder="Descrivi brevemente il tuo progetto o la tua esigenza tecnica..."
                           className="w-full bg-transparent border-b border-navy/10 py-4 text-navy focus:outline-none focus:border-gold transition-colors resize-none font-light"
                           required
                        />
                     </div>

                     <div className="pt-6 md:pt-12">
                        <button 
                           type="submit"
                           disabled={status === 'sending'}
                           className={`btn-ghost-dark w-full md:w-auto px-16 py-6 group flex items-center justify-center gap-4 ${status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                           {status === 'idle' && <>Invia Richiesta <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>}
                           {status === 'sending' && <>Inviando...</>}
                           {status === 'success' && <><CheckCircle size={20} className="text-green-500" /> Inviato con Successo</>}
                           {status === 'error' && <><XCircle size={20} className="text-red-500" /> Errore. Riprova</>}
                        </button>
                     </div>
                  </form>
               </div>
            </div>

         </div>
      </section>

    </div>
  );
}

function ContactItem({ icon: Icon, title, val, link }: any) {
  const content = (
    <div className="group cursor-pointer">
       <div className="flex items-center gap-4 text-gold mb-2 group-hover:translate-x-2 transition-transform duration-500">
          <Icon size={20} weight="thin" />
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-navy/40 group-hover:text-gold">{title}</span>
       </div>
       <p className="text-navy font-bold uppercase tracking-widest text-sm ml-9">{val}</p>
    </div>
  );

  return link ? <a href={link}>{content}</a> : content;
}

function InputGroup({ label, placeholder, name, required, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-4">
       <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-navy/40">{label}</label>
       <input 
          name={name}
          required={required}
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-navy/10 py-4 text-navy focus:outline-none focus:border-gold transition-colors font-light text-sm"
       />
    </div>
  );
}
