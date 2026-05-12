import { Link } from 'react-router-dom';
import { motion, useSpring, useTransform, useInView, useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  MagnifyingGlass, 
  Ruler, 
  CheckCircle, 
  Calendar, 
  FileText, 
  Trophy, 
  Users, 
  Handshake, 
  ArrowRight,
  type Icon,
  Medal
} from '@phosphor-icons/react';
import { client, urlFor } from '../lib/sanity';

interface MetodoItem {
  icon: Icon;
  title: string;
  text: string;
}

interface StatItem {
  icon: Icon;
  value: string;
  label: string;
}


const metodo: MetodoItem[] = [
  { 
    icon: MagnifyingGlass,
    title: 'Analizziamo', 
    text: "Ogni disciplinare e progetto posto a base di gara vengono esaminati con metodo per individuare criteri premianti, vincoli tecnici e margini di miglioramento. L'analisi è la base su cui si costruisce un'offerta fondata, coerente e competitiva." 
  },
  { 
    icon: Ruler,
    title: 'Progettiamo', 
    text: "Elaboriamo soluzioni migliorative basate su coerenza tecnica e fattibilità operativa. Ogni proposta integra aspetti architettonici, impiantistici, strutturali e di cantiere, per assicurare qualità esecutiva e piena aderenza ai criteri di valutazione." 
  },
  { 
    icon: CheckCircle,
    title: 'Valorizziamo', 
    text: "Trasformiamo i contenuti tecnici in documentazione chiara e immediatamente valutabile. Ogni offerta è organizzata per mettere in evidenza il merito progettuale e agevolare il lavoro della commissione giudicatrice." 
  },
];

const stats: StatItem[] = [
  { icon: Calendar, value: '10', label: 'Anni di esperienza' },
  { icon: FileText, value: '+200', label: 'Gare redatte' },
  { icon: Trophy, value: '63%', label: 'Gare sul podio' },
  { icon: Medal, value: '38%', label: 'Gare aggiudicate' },
  { icon: Handshake, value: '+40', label: 'Imprese clienti' },
  { icon: Users, value: '+10', label: 'Collaboratori' },
];

const percheSceglierci = [
  {
    num: '01',
    title: 'Approccio dedicato, non seriale',
    text: 'Ogni gara viene studiata e sviluppata da zero. Analizziamo il disciplinare, interpretiamo i criteri di valutazione e costruiamo soluzioni migliorative specifiche per quella procedura. Nessuna offerta standard.'
  },
  {
    num: '02',
    title: 'Un team completo per ogni procedura',
    text: 'Architetti, specialisti BIM, esperti di contabilità dei lavori, restauratori e consulenti strutturali. Ogni competenza viene attivata in funzione delle esigenze specifiche della gara.'
  },
  {
    num: '03',
    title: 'Dieci anni di esperienza nel settore',
    text: "Dal 2015 operiamo nel mondo degli appalti pubblici. Un percorso costruito gara dopo gara, su tipologie diverse — edilizia scolastica, restauro, infrastrutture — in tutta Italia."
  }
];

const anim = { 
  initial: { opacity: 0, y: 30 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, margin: '-10%'},
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
};

function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.endsWith('%') ? '%' : '';

  const spring = useSpring(0, { duration: 2500, bounce: 0 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const [sanityProjects, setSanityProjects] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "project"] | order(id asc) [0...4]`).then(setSanityProjects);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-white selection:bg-navy selection:text-white overflow-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroParallax }} 
          className="absolute -top-[10%] left-0 w-full h-[120%] z-0"
        >
          <img 
            src="/media/header_1.jpg" 
            alt="MBA Progetti Hero" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-navy/40" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-[1400px]">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gold text-[10px] md:text-xs font-bold uppercase mb-12 block tracking-[0.6em]"
            >
              Architettura • Ingegneria • Appalti
            </motion.span>
            
            <div className="relative inline-block mb-10 overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[20vw] md:text-[16rem] font-bold text-white tracking-tighter leading-[0.8] uppercase"
              >
                MBA
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="text-xl md:text-2xl text-white/70 font-light mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide"
            >
              Precisione tecnica e visione strategica <br className="hidden md:block" />
              per <span className="text-white font-normal italic">offerte tecniche d'eccellenza</span>.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link 
                to="/portfolio" 
                className="group relative border border-gold bg-gold text-white px-12 py-5 text-[11px] font-bold tracking-[0.4em] uppercase overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10">I nostri lavori</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">
                  Portfolio
                </span>
              </Link>
              
              <Link 
                to="/contatti" 
                className="group border border-white/20 text-white px-12 py-5 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-navy hover:border-white transition-all duration-500"
              >
                Contattaci
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }} 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-50, 50] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="bg-navy py-32 md:py-48 px-6 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                {...anim} 
                transition={{ delay: i * 0.1, duration: 1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tighter">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHOD SECTION ── */}
      <section className="bg-white py-32 md:py-56 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <motion.div {...anim} className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <h2 className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-8">Il Nostro Metodo</h2>
              <h3 className="text-5xl md:text-7xl font-bold text-navy tracking-tighter uppercase leading-[0.9] mb-12">
                Approccio <br /> <span className="italic font-medium text-gold/80">Sistematico</span>.
              </h3>
              <p className="text-gray/70 text-lg font-light leading-relaxed max-w-sm">
                Un workflow collaudato che trasforma i requisiti tecnici in opportunità competitive.
              </p>
            </motion.div>

            <div className="lg:col-span-8 flex flex-col gap-px bg-lgray overflow-hidden">
              {metodo.map((item, i) => (
                <motion.div 
                  key={item.title} 
                  {...anim}
                  transition={{ duration: 1.2, delay: i * 0.2 }}
                  className="group bg-white p-12 md:p-20 hover:bg-navy transition-all duration-700"
                >
                  <div className="flex flex-col md:flex-row gap-10 md:items-start">
                    <div className="flex-shrink-0">
                      <item.icon size={48} weight="thin" className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-navy group-hover:text-white mb-6 tracking-tight uppercase transition-colors duration-500">
                        {item.title}
                      </h4>
                      <p className="text-gray/70 group-hover:text-white/60 text-lg leading-relaxed font-light transition-colors duration-500 max-w-2xl">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE BREAK (MASK EFFECT) ── */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.div 
          initial={{ clipPath: 'inset(10% 10% 10% 10%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img 
            src="/media/studio/main.webp" 
            alt="Studio Details" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=2070&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-navy/20" />
        </motion.div>
      </section>

      {/* ── PORTFOLIO SECTION ── */}
      <section className="py-32 md:py-56 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <motion.div {...anim}>
              <h2 className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-8">Portfolio</h2>
              <h3 className="text-5xl md:text-8xl font-bold text-navy tracking-tighter uppercase leading-[0.8]">Progetti Selezionati</h3>
            </motion.div>
            <motion.div {...anim}>
              <Link to="/portfolio" className="group flex items-center gap-6 text-navy text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-500">
                <span className="border-b border-navy/20 pb-1 group-hover:border-gold transition-colors">Vedi tutti</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {sanityProjects.map((project, i) => (
              <motion.div 
                key={project._id}
                {...anim}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/portfolio/${project.id}`}>
                  <div className="relative aspect-[4/3] mb-8 overflow-hidden bg-lgray">
                    <motion.div 
                      initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full"
                    >
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.2 }}
                        src={project.mainImage ? urlFor(project.mainImage).width(1200).url() : project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'; }}
                      />
                    </motion.div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">{project.category}</span>
                      <h4 className="text-3xl font-bold text-navy group-hover:text-gold transition-colors duration-500 tracking-tighter uppercase">{project.title}</h4>
                    </div>
                    <span className="text-[10px] text-gray/40 font-bold uppercase tracking-widest">{project.location}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US SECTION ── */}
      <section className="py-32 md:py-56 px-6 bg-lgray/30">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-start">
            <motion.div {...anim} className="lg:sticky lg:top-32">
              <h2 className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-10">Perché MBA</h2>
              <h3 className="text-5xl md:text-7xl font-bold text-navy mb-12 leading-[0.9] tracking-tighter uppercase">
                Valore <br /> <span className="italic font-medium text-gold/80">Aggiunto</span>.
              </h3>
              <p className="text-gray/70 text-xl font-light leading-relaxed max-w-lg mb-16">
                Affianchiamo le imprese con un approccio sartoriale, integrando eccellenza tecnica e visione normativa.
              </p>
              <div className="w-20 h-px bg-gold/30" />
            </motion.div>
            
            <div className="flex flex-col gap-16">
              {percheSceglierci.map((item, i) => (
                <motion.div 
                  key={item.num} 
                  {...anim}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-16 group"
                >
                  <span className="absolute left-0 top-0 text-gold font-bold text-xs tracking-widest">{item.num}</span>
                  <h4 className="text-2xl font-bold text-navy mb-6 tracking-tight uppercase">{item.title}</h4>
                  <p className="text-gray/60 text-lg leading-relaxed font-light">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-40 md:py-64 bg-navy relative">
        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <motion.div {...anim}>
            <h2 className="text-5xl md:text-[8rem] font-bold text-white mb-16 tracking-tighter leading-[0.8] uppercase">
              Progettiamo <br /> <span className="italic text-gold font-medium">Insieme</span>.
            </h2>
            <Link 
              to="/contatti" 
              className="group relative inline-flex items-center gap-8 bg-white text-navy px-16 py-8 text-[12px] font-bold uppercase tracking-[0.4em] overflow-hidden transition-all duration-500"
            >
              <span className="relative z-10">Inizia un progetto</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">
                Contattaci
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
