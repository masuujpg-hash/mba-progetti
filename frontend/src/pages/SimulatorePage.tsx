import { motion } from 'framer-motion';
import Simulatore from '../components/Simulatore';

export default function SimulatorePage() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden min-h-screen">
      
      {/* ── HERO SIMULATORE ── */}
      <section className="relative min-h-[50vh] md:h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="Simulatore Economico"
            className="w-full h-full object-cover grayscale opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 block font-outfit">
              STRUMENTO GRATUITO PER LE IMPRESE
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] leading-[1.2] mb-4 font-outfit">
               SIMULATORE OEPV
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── SIMULATORE COMPONENT ── */}
      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
        <Simulatore />
      </section>

    </div>
  );
}
