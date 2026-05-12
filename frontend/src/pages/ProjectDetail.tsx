import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { ArrowLeft, MapPin, User, Tag, Briefcase, IdentificationCard, CurrencyEur, ArrowRight } from '@phosphor-icons/react';

const anim = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const maskAnim = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  whileInView: { clipPath: 'inset(0 0% 0 0)' },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Carichiamo il progetto corrente e quello successivo per la navigazione
    const fetchProject = async () => {
      const current = await client.fetch(`*[_type == "project" && id == $id][0]`, { id });
      
      if (current) {
        setProject(current);
        // Prendi il progetto con ID successivo (o il primo se siamo alla fine)
        const all = await client.fetch(`*[_type == "project"] | order(id asc)`);
        const currentIndex = all.findIndex((p: any) => p.id === id);
        const next = all[(currentIndex + 1) % all.length];
        setNextProject(next);
      }
      setLoading(false);
    };

    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Caricamento...</div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy">Progetto non trovato</h1>
          <p className="text-gray mt-4">Il progetto che stai cercando non esiste o è stato rimosso.</p>
          <Link to="/portfolio" className="mt-8 inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest hover:underline">
            <ArrowLeft size={20} /> Torna al Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-lgray">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/portfolio" className="flex items-center gap-3 text-navy hover:text-gold transition-colors font-bold uppercase tracking-[0.2em] text-[10px]">
            <ArrowLeft size={18} weight="bold" />
            Torna al Portfolio
          </Link>
          <div className="hidden md:block text-gray text-[10px] font-bold uppercase tracking-[0.2em] truncate max-w-[400px]">
            {project.title}
          </div>
        </div>
      </div>

      <main className="pb-0">
        {/* 2. PROJECT HERO */}
        <section className="relative h-[70dvh] w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={project.mainImage ? urlFor(project.mainImage).width(1920).url() : project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/10" />
        </section>

        {/* 3. CONTENT & DETAILS */}
        <section className="max-w-[1400px] mx-auto px-6 mt-20 md:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* LEFT: INFO */}
            <div className="lg:col-span-8">
              <motion.div {...anim} initial="initial" animate="animate">
                <div className="flex items-center gap-3 text-gold mb-8">
                  <MapPin size={24} weight="light" />
                  <span className="text-sm font-bold uppercase tracking-[0.3em]">{project.location}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] mb-12">
                  {project.title}
                </h1>
                <div className="w-24 h-1 bg-gold mb-16" />
                
                <div className="prose prose-zinc prose-lg max-w-none">
                  <p className="text-gray text-xl leading-relaxed whitespace-pre-wrap font-sans">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="lg:col-span-4 lg:border-l lg:border-lgray lg:pl-16">
              <motion.div 
                {...anim}
                initial="initial" animate="animate"
                transition={{ ...anim.transition, delay: 0.2 }}
                className="space-y-12"
              >
                <div>
                  <h4 className="text-[10px] font-bold text-gray/40 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
                    <Tag size={16} /> Scheda Tecnica
                  </h4>
                  
                  <div className="space-y-10">
                    <DetailItem 
                      icon={<User size={20} weight="light" />}
                      label="Committente"
                      value={project.client}
                    />
                    <DetailItem 
                      icon={<CurrencyEur size={20} weight="light" />}
                      label="Importo Lavori"
                      value={project.amount}
                    />
                    <DetailItem 
                      icon={<Briefcase size={20} weight="light" />}
                      label="Servizi Svolti"
                      value={project.services}
                    />
                    {project.credits && (
                      <DetailItem 
                        icon={<IdentificationCard size={20} weight="light" />}
                        label="Credits / Team"
                        value={project.credits}
                      />
                    )}
                  </div>
                </div>

                <div className="pt-12 border-t border-lgray">
                  <Link 
                    to="/contatti" 
                    className="w-full inline-flex items-center justify-center gap-4 bg-navy text-white py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold transition-all duration-500 shadow-xl"
                  >
                    Richiedi Informazioni <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. GALLERY */}
        {project.images && project.images.length > 0 && (
          <section className="mt-32 md:mt-48 bg-surface py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-6 mb-16">
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] block mb-4">Dettagli Visivi</span>
              <h2 className="text-3xl md:text-5xl font-bold text-navy">Galleria di Progetto</h2>
            </div>
            
            <div className="flex overflow-x-auto gap-6 px-6 pb-12 no-scrollbar scroll-smooth snap-x">
              {project.images.map((img: any, idx: number) => (
                <motion.div 
                  key={idx}
                  {...maskAnim}
                  transition={{ ...maskAnim.transition, delay: idx * 0.1 }}
                  className="flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[50vw] aspect-[16/10] bg-lgray snap-center overflow-hidden shadow-2xl group"
                >
                  <img 
                    src={urlFor(img).width(1200).url()} 
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 5. NEXT PROJECT NAVIGATOR */}
        {nextProject && (
          <section className="border-t border-lgray">
            <Link to={`/portfolio/${nextProject.id}`} className="group block relative overflow-hidden bg-white">
              <div className="flex flex-col lg:flex-row min-h-[500px]">
                <div className="w-full lg:w-1/2 relative overflow-hidden h-[300px] lg:h-auto">
                  <motion.img 
                    src={nextProject.mainImage ? urlFor(nextProject.mainImage).width(1200).url() : nextProject.image} 
                    alt={nextProject.title}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <div className="w-full lg:w-1/2 p-10 md:p-20 lg:p-32 flex flex-col justify-center bg-white group-hover:bg-surface transition-colors duration-700">
                  <div className="overflow-hidden mb-6">
                    <span className="block text-[10px] font-bold text-gold uppercase tracking-[0.4em]">
                      Progetto Successivo
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.1] group-hover:text-gold transition-colors duration-500">
                      {nextProject.title}
                    </h2>
                  </div>
                  <div className="mt-16 flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-navy">
                    Vedi Progetto 
                    <div className="h-[1px] w-24 bg-gold origin-left group-hover:scale-x-150 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="text-gold mt-1 bg-surface p-2 rounded-sm">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray/40 uppercase tracking-[0.3em] mb-1">{label}</p>
        <p className="text-navy font-sans font-bold leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
