import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { getStoredProjects } from '../lib/contentStore';
import type { Project } from '../data/projects';
import GareContactForm from '../components/GareContactForm';

// ─── COMPONENTE TABELLA SPECIFICHE TECNICHE ─────────────────────────────────
function ProjectSpecsTable({ project }: { project: Project }) {
  return (
    <div className="border-t border-[#dfe3ea]">
      {/* 1. LUOGO */}
      {project.location && (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
          <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
            LUOGO
          </span>
          <span className="text-[#1b2a4a] text-[14.5px] sm:text-[15.5px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
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
          <span className="text-[#1b2a4a] text-[14.5px] sm:text-[15.5px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
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
          <span className="text-[#1b2a4a] text-[14.5px] sm:text-[15.5px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right tabular-nums font-outfit">
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
          <span className="text-[#1b2a4a] text-[14.5px] sm:text-[15.5px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
            {project.services}
          </span>
        </div>
      )}

      {/* 5. POSIZIONE */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
        <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
          POSIZIONE
        </span>
        <span className="text-[#1b2a4a] text-[14.5px] sm:text-[15.5px] font-normal leading-snug sm:leading-relaxed text-left sm:text-right font-outfit">
          {project.rank || '—'}
        </span>
      </div>

      {/* 6. CREDITS */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 sm:py-4 border-b border-[#dfe3ea] gap-1 sm:gap-4 text-left">
        <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
          CREDITS
        </span>
        <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal leading-relaxed text-left sm:text-right max-w-[380px] font-outfit">
          {project.credits || '—'}
        </span>
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
    <div className="bg-white min-h-screen selection:bg-navy selection:text-white overflow-x-hidden pt-24 sm:pt-28 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ── 1. INTESTAZIONE: TITOLO & SOTTOTITOLO LUOGO ── */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-[#1b2a4a] text-2xl sm:text-3xl lg:text-[34px] font-bold uppercase tracking-[0.03em] leading-[1.16] mb-2 font-outfit">
            {project.title}
          </h1>
          {project.location && (
            <p className="text-[#7b869d] text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.2em] font-outfit">
              {project.location}
            </p>
          )}
        </div>

        {/* ── 2. SEZIONE CENTRALE: TABELLA DATI TECNICI (SX) & FOTO (DX) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start mb-8 lg:mb-10">
          
          {/* Tabella Dati Tecnici (Left su Desktop, sotto la foto su Mobile) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ProjectSpecsTable project={project} />
          </div>

          {/* Foto del Progetto (Right su Desktop, sopra la tabella su Mobile) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-[1px] bg-[#1b2a4a]/5 shadow-xs">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* ── 3. DESCRIZIONE COMPLETA PROGETTO (A TUTTA LARGHEZZA SOTTO) ── */}
        {project.description && (
          <div className="mb-10 lg:mb-12 max-w-4xl">
            <p className="text-[#3d4a66] text-[15px] sm:text-[16px] font-normal leading-[1.7] font-outfit">
              {project.description}
            </p>
          </div>
        )}

        {/* ── 4. BARRA DI NAVIGAZIONE INFERIORE: [ TORNA AL PORTFOLIO ] a SX, [ < ] [ > ] a DX ── */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-6 border-t border-[#dfe3ea]">
          <Link
            to="/portfolio"
            className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[44px] px-6 text-[11px] font-medium tracking-[0.2em] uppercase rounded-[2px] inline-flex items-center justify-center transition-all shadow-2xs cursor-pointer font-outfit"
          >
            TORNA AL PORTFOLIO
          </Link>

          <div className="flex items-center justify-end gap-2.5">
            <Link
              to={`/portfolio/${prevProject?.id || ''}`}
              className="w-12 h-[44px] border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white rounded-[2px] flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
              aria-label="Progetto Precedente"
            >
              <CaretLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to={`/portfolio/${nextProject?.id || ''}`}
              className="w-12 h-[44px] border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white rounded-[2px] flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
              aria-label="Progetto Successivo"
            >
              <CaretRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── 5. MODULO CONTATTO PREVENTIVO GARA A FONDO PAGINA ── */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-[#dfe3ea] max-w-4xl mx-auto">
          <GareContactForm defaultGaraName={project.title} />
        </div>

      </div>
    </div>
  );
}
