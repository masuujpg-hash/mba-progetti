import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { 
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
    <div className="bg-white selection:bg-navy selection:text-white pt-28 sm:pt-36 pb-20">
      
      {/* ── SEZIONE CONTATTI ELEGANTE ── */}
      <section className="px-6 max-w-7xl mx-auto">
        {/* Intestazione */}
        <div className="mb-10 sm:mb-14">
          <span className="text-navy/60 text-xs font-bold uppercase tracking-[0.25em] mb-3 block font-outfit">
            CONTATTI
          </span>
          <h2 className="text-navy text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight font-heading">
            RICHIEDI UNA CONSULENZA
          </h2>
        </div>

        {/* 2 Colonne: Form a sinistra, Recapiti a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Colonna Sinistra: Form minimale */}
          <div className="lg:col-span-7">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-navy text-sm font-medium mb-2 font-outfit">
                  Nome e impresa
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-white border border-navy/25 rounded-[1px] px-4 py-3 text-navy text-[15px] font-outfit focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
                />
              </div>

              <div>
                <label className="block text-navy text-sm font-medium mb-2 font-outfit">
                  E-mail
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-white border border-navy/25 rounded-[1px] px-4 py-3 text-navy text-[15px] font-outfit focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
                />
              </div>

              <div>
                <label className="block text-navy text-sm font-medium mb-2 font-outfit">
                  Gara o progetto
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white border border-navy/25 rounded-[1px] px-4 py-3 text-navy text-[15px] font-outfit focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors resize-y"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-8 py-3.5 rounded-[1px] text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-between min-w-[190px] shadow-2xs group"
                >
                  <span>{status === 'sending' ? 'INVIO...' : 'INVIA'}</span>
                  <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
                </button>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-4 rounded-[1px] border border-emerald-200 text-sm font-medium font-outfit">
                  <CheckCircle size={18} /> Messaggio inviato con successo! Ti risponderemo a breve.
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-4 rounded-[1px] border border-red-200 text-sm font-medium font-outfit">
                  <XCircle size={18} /> Errore durante l'invio. Riprova o contattaci telefonicamente.
                </div>
              )}
            </form>
          </div>

          {/* Colonna Destra: 4 Blocchi Contatti 2x2 */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 pt-2">
            
            {/* Blocco 1: Studio */}
            <div>
              <span className="text-navy/60 text-xs font-bold uppercase tracking-[0.2em] mb-2 block font-outfit">
                STUDIO
              </span>
              <p className="text-navy text-[15px] font-normal leading-relaxed font-outfit">
                Via Sardarulo 7<br />
                81016 San Potito Sannitico (CE)
              </p>
            </div>

            {/* Blocco 2: Telefono */}
            <div>
              <span className="text-navy/60 text-xs font-bold uppercase tracking-[0.2em] mb-2 block font-outfit">
                TELEFONO
              </span>
              <p className="text-navy text-[15px] font-normal leading-relaxed font-outfit">
                <a href="tel:+393286285861" className="hover:text-gold transition-colors">
                  328 6285861
                </a>
              </p>
            </div>

            {/* Blocco 3: E-mail */}
            <div>
              <span className="text-navy/60 text-xs font-bold uppercase tracking-[0.2em] mb-2 block font-outfit">
                E-MAIL
              </span>
              <p className="text-navy text-[15px] font-normal leading-relaxed font-outfit">
                <a href="mailto:arch.mariobiondi@gmail.com" className="hover:text-gold transition-colors block">
                  arch.mariobiondi@gmail.com
                </a>
                <a href="mailto:mario.biondi@archiworldpec.it" className="hover:text-gold transition-colors block">
                  <span className="font-semibold">PEC</span> mario.biondi@archiworldpec.it
                </a>
              </p>
            </div>

            {/* Blocco 4: Dati */}
            <div>
              <span className="text-navy/60 text-xs font-bold uppercase tracking-[0.2em] mb-2 block font-outfit">
                DATI
              </span>
              <p className="text-navy text-[15px] font-normal leading-relaxed font-outfit">
                P. IVA 04274770611
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
