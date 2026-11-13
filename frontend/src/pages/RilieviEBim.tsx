import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CaretRight, Crosshair, Cube } from '@phosphor-icons/react';

export default function RilieviEBim() {
  const sections = [
    {
      id: 'rilievi',
      tag: 'PRECISIONE MILLIMETRICA',
      title: 'RILIEVI',
      icon: Crosshair,
      img: '/media/bim_modello_conoscenza.jpg',
      alt: 'Rilievi Laser Scanner 3D e Nuvola di Punti',
      desc: 'Laser scanner 3D, droni fotogrammetrici e topografia GNSS per documentare edifici, complessi storici e infrastrutture.',
      to: '/servizi/rilievi',
    },
    {
      id: 'bim',
      tag: 'MODELLAZIONE INFORMATIVA',
      title: 'SERVIZI BIM',
      icon: Cube,
      img: '/media/rilievi_portfolio/tavola_14_sezioni_cad.png',
      alt: 'Servizi BIM e Modellazione Parametrica',
      desc: 'Scan to BIM, modelli parametrici multi-disciplinari, computi e coordinamento informativo per progettazione e cantiere.',
      to: '/servizi/bim',
    },
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white font-outfit">

      {/* ── 1. HERO ── */}
      <section className="relative h-[44vh] min-h-[320px] sm:h-[52vh] w-full flex items-center justify-center overflow-hidden bg-[#1B2A4A]">
        <div className="absolute inset-0 z-0">
          <img
            src="/media/bim_modello_conoscenza.jpg"
            className="w-full h-full object-cover object-center"
            alt="MBA Progetti Rilievi e BIM"
          />
          <div className="absolute inset-0 bg-[#1B2A4A]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2A4A]/80 via-[#1B2A4A]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white/95 text-xs sm:text-[13px] font-medium uppercase tracking-[0.25em] mb-2.5">
              DAL RILIEVO AL MODELLO
            </div>
            <h1 className="text-white text-4xl sm:text-5xl md:text-[56px] font-bold uppercase tracking-[0.04em] leading-[1.05] drop-shadow-sm">
              RILIEVI E BIM
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SCEGLI LA SEZIONE ── */}
      <section className="py-14 sm:py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase inline-block shadow-2xs">
            SCEGLI LA SEZIONE
          </span>
        </div>
        <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase leading-[1.15] mb-5">
          DAL DATO RILEVATO AL MODELLO INFORMATIVO
        </h2>
        <p className="text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] max-w-[62ch] mb-12">
          Due sezioni complementari: il <strong className="font-semibold text-[#1B2A4A]">rilievo</strong> documenta con precisione lo stato di fatto, i <strong className="font-semibold text-[#1B2A4A]">servizi BIM</strong> lo trasformano in un modello parametrico utilizzabile in progetto e in cantiere.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.id}
                to={sec.to}
                className="group bg-white border border-[#dfe3ea] rounded-[2px] overflow-hidden shadow-xs hover:shadow-md hover:border-[#1B2A4A]/30 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#eef1f4] border-b border-[#dfe3ea]">
                  <img
                    src={sec.img}
                    alt={sec.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[#F5C400] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                      {sec.tag}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={24} weight="regular" className="text-[#1B2A4A] shrink-0" />
                      <h3 className="text-[#1B2A4A] text-xl sm:text-2xl font-bold uppercase tracking-[0.03em]">
                        {sec.title}
                      </h3>
                    </div>
                    <p className="text-[#3d4a66] text-[15px] sm:text-base font-normal leading-[1.65] mb-6">
                      {sec.desc}
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-between pt-4 border-t border-[#dfe3ea]/70 text-[#1B2A4A] group-hover:text-[#F5C400] text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
                    <span>SCOPRI LA SEZIONE</span>
                    <CaretRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
