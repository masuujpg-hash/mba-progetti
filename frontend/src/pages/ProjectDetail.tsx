import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, MapPin, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { getStoredProjects } from '../lib/contentStore';
import type { Project } from '../data/projects';
import GareContactForm from '../components/GareContactForm';

// ─── COMPONENTE TABELLA SPECIFICHE TECNICHE & NAVIGAZIONE ───────────────────
function ProjectSpecs({ 
  project, 
  prevProject, 
  nextProject 
}: { 
  project: Project; 
  prevProject?: Project; 
  nextProject?: Project; 
}) {
  return (
    <div className="border-t border-[#dfe3ea]">
      {/* 1. LUOGO */}
      {project.location && (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
            LUOGO
          </span>
          <span className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
            {project.location}
          </span>
        </div>
      )}

      {/* 2. STAZIONE APPALTANTE */}
      {project.client && (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
            STAZIONE APPALTANTE
          </span>
          <span className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
            {project.client}
          </span>
        </div>
      )}

      {/* 3. IMPORTO */}
      {project.amount && (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
            IMPORTO
          </span>
          <span className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right tabular-nums font-outfit">
            {project.amount.startsWith('€') ? project.amount : `€ ${project.amount}`}
          </span>
        </div>
      )}

      {/* 4. SERVIZI SVOLTI */}
      {project.services && (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
            SERVIZI SVOLTI
          </span>
          <span className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
            {project.services}
          </span>
        </div>
      )}

      {/* 5. POSIZIONE */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
        <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
          POSIZIONE
        </span>
        <span className="text-[#1b2a4a] text-[15px] sm:text-[16px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
          {project.rank || '—'}
        </span>
      </div>

      {/* 6. CREDITS */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
        <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
          CREDITS
        </span>
        <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal leading-relaxed text-left sm:text-right max-w-[420px] font-outfit">
          {project.credits || '—'}
        </span>
      </div>

      {/* Navigation Controls: < >, Torna al Portfolio */}
      <div className="pt-8 mt-4 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Link
            to={`/portfolio/${prevProject?.id || ''}`}
            className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] rounded-[2px] flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
            aria-label="Progetto Precedente"
          >
            <CaretLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            to={`/portfolio/${nextProject?.id || ''}`}
            className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] rounded-[2px] flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
            aria-label="Progetto Successivo"
          >
            <CaretRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <Link
          to="/portfolio"
          className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] px-6 text-[11px] font-medium tracking-[0.2em] uppercase rounded-[2px] flex items-center justify-center transition-all shadow-2xs cursor-pointer font-outfit"
        >
          TORNA AL PORTFOLIO
        </Link>
      </div>
    </div>
  );
}

// ─── PAGINA PRINCIPALE DETTAGLIO PROGETTO ───────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams();
  const projectList = getStoredProjects();
  
  const projectIndex = projectList.findIndex(p => p.id === id);
  const project = projectList[projectIndex];

  const prevProject = projectIndex > 0 ? projectList[projectIndex - 1] : projectList[projectList.length - 1];
  const nextProject = projectIndex < projectList.length - 1 ? projectList[projectIndex + 1] : projectList[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return (
     <div className="h-screen bg-white flex flex-col items-center justify-center gap-8">
        <p className="text-[#1b2a4a] uppercase tracking-widest font-bold">Progetto non trovato</p>
        <Link to="/portfolio" className="btn-ghost-dark px-8 py-4 text-xs">Torna al Portfolio</Link>
     </div>
  );

  return (
    <div className="bg-white min-h-screen selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── MOBILE LAYOUT (< lg): CONFORME AL MOCKUP MOBILE ── */}
      <div className="lg:hidden px-5 pt-24 sm:pt-28 pb-16 max-w-2xl mx-auto">
        {/* Linea orizzontale sottile sotto la navbar */}
        <div className="border-t border-[#1b2a4a]/15 mb-5 sm:mb-6" />

        {/* Titolo Progetto in maiuscolo e grassetto */}
        <h1 className="text-[#1b2a4a] text-2xl sm:text-[28px] font-bold uppercase tracking-[0.03em] leading-[1.18] mb-2 font-outfit">
          {project.title}
        </h1>

        {/* Luogo / Sottotitolo distanziato */}
        {project.location && (
          <p className="text-[#7b869d] text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.2em] mb-6 font-outfit">
            {project.location}
          </p>
        )}

        {/* Immagine Principale */}
        <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[1px] mb-8 bg-[#1b2a4a]/5 shadow-xs">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tabella Dati Tecnici & Navigazione */}
        <ProjectSpecs 
          project={project} 
          prevProject={prevProject} 
          nextProject={nextProject} 
        />

        {/* Modulo Contatto / Preventivo Gara Mobile */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-[#dfe3ea]">
          <GareContactForm defaultGaraName={project.title} />
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (>= lg): SPLIT SCREEN ELEGANTE ── */}
      <section className="hidden lg:block relative w-full">
        <div className="flex flex-row items-start">
          
          {/* LEFT COLUMN: FOTO A TUTTO SCHERMO STICKY */}
          <div className="w-1/2 h-screen sticky top-0 overflow-hidden bg-[#1b2a4a]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full relative"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2a4a]/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge Luogo Overlay */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-[#1b2a4a]/80 backdrop-blur-md px-5 py-3 text-white text-[11px] font-medium uppercase tracking-[0.2em] rounded-[2px]">
                <MapPin size={14} className="text-[#F5C400]" />
                {project.location}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: DETTAGLI & TABELLA SPECIFICHE */}
          <div className="w-1/2 px-12 lg:px-20 pt-24 lg:pt-28 pb-20 flex flex-col justify-start">
            
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-[#7b869d] hover:text-[#F5C400] transition-colors text-[11px] font-medium uppercase tracking-[0.2em] font-outfit"
              >
                <ArrowLeft size={14} weight="bold" /> Torna al Portfolio
              </Link>
            </div>

            {/* Categoria & Titolo */}
            <span className="text-[#F5C400] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block font-outfit">
              {project.category}
            </span>
            <h1 className="text-[#1b2a4a] text-3xl md:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-4 font-outfit">
              {project.title}
            </h1>

            {/* Descrizione */}
            {project.description && (
              <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mb-8 max-w-[62ch] font-outfit">
                {project.description}
              </p>
            )}

            {/* Tabella Dati Tecnici & Navigazione */}
            <ProjectSpecs 
              project={project} 
              prevProject={prevProject} 
              nextProject={nextProject} 
            />

          </div>

        </div>
      </section>

      {/* ── SEZIONE CONTATTO / PREVENTIVO GARA (DESKTOP) ── */}
      <section className="hidden lg:block py-16 px-6 max-w-4xl mx-auto border-t border-[#dfe3ea]">
        <GareContactForm defaultGaraName={project.title} />
      </section>

    </div>
  );
}
