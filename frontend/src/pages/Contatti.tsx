import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { 
  CheckCircle,
  XCircle,
  CaretRight
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
    <div className="bg-white selection:bg-navy selection:text-white pt-28 sm:pt-36 pb-20 md:pb-28">
      
      {/* ── SEZIONE CONTATTI ── */}
      <section className="px-6 max-w-7xl mx-auto">
        {/* Intestazione */}
        <div className="mb-10 sm:mb-12">
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-3 block font-outfit">
            CONTATTI
          </span>
          <h1 className="text-[#1b2a4a] text-3xl sm:text-4xl md:text-[46px] font-bold uppercase tracking-[0.04em] leading-[1.1] font-outfit">
            RICHIEDI UNA CONSULENZA
          </h1>
        </div>

        {/* 2 Colonne: Form a sinistra, Recapiti a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Colonna Sinistra: Form minimale */}
          <div className="lg:col-span-7 xl:col-span-6 max-w-[500px] w-full">
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label className="block text-[#1b2a4a] text-[13px] font-medium mb-1.5 font-outfit">
                  Nome e impresa
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-white border border-[#1b2a4a]/30 rounded-[1px] px-3.5 py-2.5 text-[#1b2a4a] text-[14px] focus:outline-none focus:border-[#1b2a4a] transition-colors font-outfit"
                />
              </div>

              <div>
                <label className="block text-[#1b2a4a] text-[13px] font-medium mb-1.5 font-outfit">
                  E-mail
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-white border border-[#1b2a4a]/30 rounded-[1px] px-3.5 py-2.5 text-[#1b2a4a] text-[14px] focus:outline-none focus:border-[#1b2a4a] transition-colors font-outfit"
                />
              </div>

              <div>
                <label className="block text-[#1b2a4a] text-[13px] font-medium mb-1.5 font-outfit">
                  Gara o progetto
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white border border-[#1b2a4a]/30 rounded-[1px] p-3.5 text-[#1b2a4a] text-[14px] focus:outline-none focus:border-[#1b2a4a] transition-colors resize-y font-outfit"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-[160px] sm:w-[170px] h-[46px] border border-[#1b2a4a]/30 hover:border-[#F5C400] text-[#1b2a4a] hover:text-[#F5C400] px-5 py-3 rounded-[1px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors flex items-center justify-between shadow-2xs group cursor-pointer font-outfit bg-white"
                >
                  <span>{status === 'sending' ? 'INVIO...' : 'INVIA'}</span>
                  <CaretRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-4 rounded-[1px] border border-emerald-200 text-[14px] font-medium font-outfit">
                  <CheckCircle size={18} /> Messaggio inviato con successo! Ti risponderemo a breve.
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-4 rounded-[1px] border border-red-200 text-[14px] font-medium font-outfit">
                  <XCircle size={18} /> Errore durante l'invio. Riprova o contattaci telefonicamente.
                </div>
              )}
            </form>
          </div>

          {/* Colonna Destra: 4 Blocchi Contatti 2x2 */}
          <div className="lg:col-span-5 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10 lg:gap-y-16 pt-1 max-w-[520px]">
            
            {/* Blocco 1: Studio */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block font-outfit">
                STUDIO
              </span>
              <p className="text-[#1b2a4a] text-[14px] font-normal leading-[1.65] font-outfit">
                Via Sardarulo 7<br />
                81016 San Potito Sannitico (CE)
              </p>
            </div>

            {/* Blocco 2: Telefono */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block font-outfit">
                TELEFONO
              </span>
              <p className="text-[#1b2a4a] text-[14px] font-normal leading-[1.65] font-outfit">
                <a href="tel:+393286285861" className="hover:text-[#F5C400] transition-colors">
                  328 6285861
                </a>
              </p>
            </div>

            {/* Blocco 3: E-mail */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block font-outfit">
                E-MAIL
              </span>
              <p className="text-[#1b2a4a] text-[14px] font-normal leading-[1.65] font-outfit">
                <a href="mailto:arch.mariobiondi@gmail.com" className="hover:text-[#F5C400] transition-colors block">
                  arch.mariobiondi@gmail.com
                </a>
                <a href="mailto:mario.biondi@archiworldpec.it" className="hover:text-[#F5C400] transition-colors block">
                  PEC mario.biondi@archiworldpec.it
                </a>
              </p>
            </div>

            {/* Blocco 4: Dati */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block font-outfit">
                DATI
              </span>
              <p className="text-[#1b2a4a] text-[14px] font-normal leading-[1.65] font-outfit">
                P. IVA 04274770611
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
