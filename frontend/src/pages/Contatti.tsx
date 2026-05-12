import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Envelope, MapPin, PaperPlaneTilt, ArrowRight } from '@phosphor-icons/react';

const anim = { 
  initial: { opacity: 0, y: 30 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

export default function Contatti() {
  const [form, setForm] = useState({ 
    nome: '', 
    azienda: '',
    email: '', 
    telefono: '',
    oggetto: '', 
    messaggio: '',
    privacy: false 
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <section className="relative h-[40dvh] min-h-[400px] w-full flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/media/hero/slide4.webp" 
            alt="Contatti MBA Progetti" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'; }}
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">Contatti</h1>
            <div className="w-24 h-1 bg-gold mb-6" />
            <p className="text-white/60 text-lg md:text-xl font-sans max-w-[600px] leading-relaxed">
              Hai un progetto o una sfida tecnica da sottoporci? Il nostro team è pronto ad affiancarti con competenza e innovazione.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* LEFT: INFO */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div {...anim}>
              <h2 className="text-2xl font-bold text-navy mb-10 uppercase tracking-widest">Informazioni</h2>
              
              <div className="space-y-12">
                {[
                  { icon: Phone, label: "Chiama Ora", val: "+39 328 628 5861", link: "tel:+393286285861" },
                  { icon: Envelope, label: "Mail", val: "info@mbaprogetti.it", link: "mailto:info@mbaprogetti.it" },
                  { icon: MapPin, label: "Sede Operativa", val: "Via Sardarulo, 7 — 81016 San Potito Sannitico (CE)", link: "#" }
                ].map((item, i) => (
                  <div key={i} className="group flex items-start gap-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface border border-lgray group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-500">
                      <item.icon size={24} weight="light" className="text-gold group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray/40 uppercase tracking-[0.3em] mb-2">{item.label}</p>
                      <a href={item.link} className="text-lg font-sans font-bold text-navy hover:text-gold transition-colors duration-300">
                        {item.val}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...anim} transition={{ delay: 0.2 }} className="p-10 bg-surface border-l-4 border-gold">
              <h3 className="text-lg font-medium text-navy mb-4">"Affianchiamo imprese e professionisti con soluzioni tecniche avanzate."</h3>
              <p className="text-gray/70 text-sm leading-relaxed">
                Dal rilievo fotogrammetrico alla progettazione BIM, MBA Progetti trasforma la complessità in efficienza. Contattaci per scoprire come possiamo valorizzare la tua prossima gara o il tuo prossimo cantiere.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: FORM */}
          <motion.div {...anim} transition={{ delay: 0.1 }} className="lg:col-span-7 bg-surface p-8 md:p-16 border border-lgray">
            <h2 className="text-2xl font-bold text-navy mb-12 uppercase tracking-widest text-center lg:text-left">Invia un Messaggio</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-[0.2em]">Nome e Cognome *</label>
                  <input
                    type="text"
                    required
                    value={form.nome}
                    onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                    className="w-full bg-white border-b border-gray/20 px-0 py-3 text-navy focus:border-gold focus:outline-none transition-colors font-sans"
                    placeholder="Esempio: Andrea Masucci"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-[0.2em]">Azienda</label>
                  <input
                    type="text"
                    value={form.azienda}
                    onChange={e => setForm(p => ({ ...p, azienda: e.target.value }))}
                    className="w-full bg-white border-b border-gray/20 px-0 py-3 text-navy focus:border-gold focus:outline-none transition-colors font-sans"
                    placeholder="Nome Azienda o Impresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-[0.2em]">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-white border-b border-gray/20 px-0 py-3 text-navy focus:border-gold focus:outline-none transition-colors font-sans"
                    placeholder="email@esempio.it"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-[0.2em]">Telefono</label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={e => setForm(p => ({ ...p, telefono: e.target.value }))}
                    className="w-full bg-white border-b border-gray/20 px-0 py-3 text-navy focus:border-gold focus:outline-none transition-colors font-sans"
                    placeholder="+39 000 000 0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-navy uppercase tracking-[0.2em]">Oggetto</label>
                <input
                  type="text"
                  required
                  value={form.oggetto}
                  onChange={e => setForm(p => ({ ...p, oggetto: e.target.value }))}
                  className="w-full bg-white border-b border-gray/20 px-0 py-3 text-navy focus:border-gold focus:outline-none transition-colors font-sans"
                  placeholder="Di cosa hai bisogno?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-navy uppercase tracking-[0.2em]">Messaggio</label>
                <textarea
                  required
                  rows={4}
                  value={form.messaggio}
                  onChange={e => setForm(p => ({ ...p, messaggio: e.target.value }))}
                  className="w-full bg-white border-b border-gray/20 px-0 py-3 text-navy focus:border-gold focus:outline-none transition-colors font-sans resize-none"
                  placeholder="Scrivi qui la tua richiesta..."
                />
              </div>

              <div className="flex items-start gap-4 py-4">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  checked={form.privacy}
                  onChange={e => setForm(p => ({ ...p, privacy: e.target.checked }))}
                  className="mt-1.5 accent-gold w-4 h-4"
                />
                <label htmlFor="privacy" className="text-[11px] text-gray leading-relaxed cursor-pointer">
                  Acconsento al trattamento dei dati personali secondo la normativa vigente (GDPR). I dati non saranno ceduti a terzi. *
                </label>
              </div>

              <button
                type="submit"
                disabled={sent}
                className="group relative w-full lg:w-auto inline-flex items-center justify-center gap-4 bg-navy text-white px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gold transition-all duration-500 overflow-hidden shadow-lg"
              >
                <span className="relative z-10">
                  {sent ? 'Messaggio Inviato ✓' : <><PaperPlaneTilt size={20} weight="light" className="inline-block mr-2" /> Invia Richiesta</>}
                </span>
                {!sent && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 3. MAP PLACEHOLDER / DECORATIVE SECTION */}
      <section className="h-[400px] bg-lgray relative overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000">
           {/* In a real project, here would be a Leaflet/Google map. For now, a stylish placeholder */}
           <div className="w-full h-full flex items-center justify-center bg-navy/5">
              <div className="text-center">
                <MapPin size={48} weight="thin" className="text-gold mx-auto mb-4" />
                <p className="text-navy font-medium text-xl">Ci trovi nel cuore del Matese.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
