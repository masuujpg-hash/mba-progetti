import { motion } from 'framer-motion';
import Simulatore from '../components/Simulatore';

export default function SimulatorePage() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden min-h-screen">
      
      {/* ── HERO SIMULATORE ── */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-navy pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="Simulatore Economico"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.8em] mb-6 md:mb-8 block">Strumento Gratuito</span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter mb-6 md:mb-8">
               Simulatore <br /> Economico.
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
