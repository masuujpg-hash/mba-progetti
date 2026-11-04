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
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-3 block">
            CONTATTI
          </span>
          <h2 className="text-[#1b2a4a] text-3xl sm:text-4xl md:text-[44px] font-bold uppercase tracking-[0.05em] leading-[1.12]">
            RICHIEDI UNA CONSULENZA
          </h2>
        </div>

        {/* 2 Colonne: Form a sinistra, Recapiti a destra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Colonna Sinistra: Form minimale */}
          <div className="lg:col-span-7">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-[#1b2a4a] text-[13px] font-medium mb-2">
                  Nome e impresa
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-white border border-[#1b2a4a]/25 rounded-[2px] px-4 py-3 text-[#1b2a4a] text-[15px] focus:outline-none focus:border-[#1b2a4a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#1b2a4a] text-[13px] font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-white border border-[#1b2a4a]/25 rounded-[2px] px-4 py-3 text-[#1b2a4a] text-[15px] focus:outline-none focus:border-[#1b2a4a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#1b2a4a] text-[13px] font-medium mb-2">
                  Gara o progetto
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white border border-[#1b2a4a]/25 rounded-[2px] px-4 py-3 text-[#1b2a4a] text-[15px] focus:outline-none focus:border-[#1b2a4a] transition-colors resize-y"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="border border-[#1b2a4a]/25 hover:border-[#b8972a] text-[#1b2a4a] hover:text-[#b8972a] px-[26px] py-[15px] rounded-[2px] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors flex items-center justify-between min-w-[240px] shadow-2xs group cursor-pointer"
                >
                  <span>{status === 'sending' ? 'INVIO...' : 'INVIA'}</span>
                  <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
                </button>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-4 rounded-[2px] border border-emerald-200 text-[14px] font-medium">
                  <CheckCircle size={18} /> Messaggio inviato con successo! Ti risponderemo a breve.
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-4 rounded-[2px] border border-red-200 text-[14px] font-medium">
                  <XCircle size={18} /> Errore durante l'invio. Riprova o contattaci telefonicamente.
                </div>
              )}
            </form>
          </div>

          {/* Colonna Destra: 4 Blocchi Contatti 2x2 */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 pt-2">
            
            {/* Blocco 1: Studio */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block">
                STUDIO
              </span>
              <p className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                Via Sardarulo 7<br />
                81016 San Potito Sannitico (CE)
              </p>
            </div>

            {/* Blocco 2: Telefono */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block">
                TELEFONO
              </span>
              <p className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                <a href="tel:+393286285861" className="hover:text-[#b8972a] transition-colors">
                  328 6285861
                </a>
              </p>
            </div>

            {/* Blocco 3: E-mail */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block">
                E-MAIL
              </span>
              <p className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                <a href="mailto:arch.mariobiondi@gmail.com" className="hover:text-[#b8972a] transition-colors block">
                  arch.mariobiondi@gmail.com
                </a>
                <a href="mailto:mario.biondi@archiworldpec.it" className="hover:text-[#b8972a] transition-colors block">
                  <span className="font-semibold">PEC</span> mario.biondi@archiworldpec.it
                </a>
              </p>
            </div>

            {/* Blocco 4: Dati */}
            <div>
              <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block">
                DATI
              </span>
              <p className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-[1.7]">
                P. IVA 04274770611
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
