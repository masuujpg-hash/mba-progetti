import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { ArrowRight, MapPin, Tag, Cube } from '@phosphor-icons/react';

const anim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' as const },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
};

const maskAnim = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
};

export default function Portfolio() {
  const containerRef = useRef(null);
  const [sanityProjects, setSanityProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "project"] | order(id asc)`).then((data) => {
      setSanityProjects(data);
      setLoading(false);
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  if (loading) return <div className="h-screen bg-navy flex items-center justify-center text-white">Caricamento...</div>;

  return (
    <div ref={containerRef} className="bg-white selection:bg-navy selection:text-white">
      {/* ── HERO ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroParallax }} 
          className="absolute inset-0 z-0 h-[120%] -top-[10%]"
        >
          <img 
            src="/media/header_3.jpg" 
            alt="Portfolio MBA Progetti" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-navy/60" />
        </motion.div>
        
        <div className="relative z-10 max-w-[1400px] w-full px-6 text-center">
          <motion.div style={{ y: heroTextY }}>
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-gold-light text-[10px] md:text-xs font-bold uppercase mb-12 block tracking-[0.5em]"
            >
              Le Nostre Eccellenze
            </motion.span>
            
            <div className="relative inline-block mb-12">
              <motion.h1 
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-7xl md:text-[10rem] lg:text-[12rem] font-bold text-white tracking-tighter leading-[0.8] uppercase"
              >
                PROGETTI
              </motion.h1>
            </div>

            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-wider">
              Una selezione delle nostre opere più significative nel campo degli appalti pubblici e della progettazione integrata.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }} 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-64, 64] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="py-24 md:py-56 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 md:gap-x-16">
            {sanityProjects.map((project, index) => (
              <motion.div
                key={project._id}
                {...anim}
                transition={{ ...anim.transition, delay: (index % 3) * 0.1 }}
                className="group flex flex-col"
              >
                <Link to={`/portfolio/${project.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 mb-10">
                    <motion.div {...maskAnim} transition={{ delay: (index % 3) * 0.2, duration: 1.5 }} className="w-full h-full">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        src={project.mainImage ? urlFor(project.mainImage).width(800).url() : project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'; }}
                      />
                    </motion.div>
                    
                    {/* Rank Badge */}
                    {project.rank && (
                      <div className="absolute top-8 left-8 z-10">
                        <div className="bg-navy text-white text-[9px] font-bold px-5 py-3 tracking-[0.2em] uppercase backdrop-blur-md">
                          {project.rank} CLASSIFICATO
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                        <ArrowRight size={24} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gold tracking-[0.3em] uppercase">{project.category}</span>
                      <div className="flex items-center gap-2 text-gray/50 text-[10px] font-bold tracking-widest uppercase">
                        <MapPin size={12} />
                        {project.location}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-navy group-hover:text-gold transition-colors duration-500 leading-[1.1] tracking-tight uppercase">
                      {project.title}
                    </h3>

                    <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray/40 text-[9px] font-bold uppercase tracking-widest">
                          <Tag size={10} />
                          Importo
                        </div>
                        <span className="text-[11px] text-navy font-bold tracking-widest">{project.amount}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray/40 text-[9px] font-bold uppercase tracking-widest">
                          <Cube size={10} />
                          Servizi
                        </div>
                        <span className="text-[11px] text-navy font-bold tracking-widest line-clamp-1">{project.services}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 md:py-64 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-gold)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <motion.div {...anim}>
            <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-12 block">Collaboriamo insieme</span>
            <h2 className="text-6xl md:text-[9rem] font-bold text-white mb-20 tracking-tighter leading-[0.8] uppercase">
              Hai una gara da <br /> <span className="italic text-gold font-medium">vincere</span>?
            </h2>
            <Link 
              to="/contatti" 
              className="group relative inline-flex items-center gap-10 bg-gold text-white px-20 py-10 text-[12px] font-bold uppercase tracking-[0.5em] overflow-hidden transition-all duration-700"
            >
              <span className="relative z-10 flex items-center gap-6">
                Contatta lo Studio <ArrowRight size={20} />
              </span>
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-700 gap-6 font-bold">
                Contatta lo Studio <ArrowRight size={20} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

