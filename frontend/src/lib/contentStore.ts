import { projects as initialProjects, type Project } from '../data/projects';
import { articles as initialArticles, type Article } from '../data/articles';

const PROJECTS_STORAGE_KEY = 'mba_custom_projects';
const ARTICLES_STORAGE_KEY = 'mba_custom_articles';

/**
 * Normalizza una lista di progetti assegnando order progressivo se assente
 */
export function normalizeProjects(list: Project[]): Project[] {
  return list.map((p, index) => ({
    ...p,
    order: typeof p.order === 'number' ? p.order : index + 1,
  }));
}

/**
 * Normalizza una lista di articoli assegnando order progressivo se assente
 */
export function normalizeArticles(list: Article[]): Article[] {
  return list.map((a, index) => ({
    ...a,
    order: typeof a.order === 'number' ? a.order : index + 1,
  }));
}

/**
 * Recupera i progetti memorizzati (da localStorage se presente, altrimenti iniziali)
 * ordinati secondo il campo `order`
 */
export function getStoredProjects(): Project[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sortProjects(normalizeProjects(parsed));
        }
      }
    } catch (e) {
      console.warn('Errore lettura progetti da localStorage', e);
    }
  }
  return sortProjects(normalizeProjects(initialProjects));
}

/**
 * Salva i progetti nel localStorage per riflettersi immediatamente in tutto il sito
 */
export function saveStoredProjects(list: Project[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(list));
      // Notifica gli altri componenti nella stessa finestra
      window.dispatchEvent(new Event('mba_projects_updated'));
    } catch (e) {
      console.warn('Errore salvataggio progetti in localStorage', e);
    }
  }
}

/**
 * Ordina i progetti in base a `order`
 */
export function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const oA = a.order ?? 999;
    const oB = b.order ?? 999;
    return oA - oB;
  });
}

/**
 * Progetti specifici per il carosello della Home Page
 * Rispettano `featuredInHome` e `orderHome`, con fallback sui progetti a podio
 */
export function getHomeProjects(): Project[] {
  const all = getStoredProjects();
  
  // Progetti esplicitamente impostati per la Home
  const explicitlyFeatured = all.filter((p) => p.featuredInHome === true);

  const candidates = explicitlyFeatured.length > 0
    ? explicitlyFeatured
    : all.filter((p) => {
        // Se esplicitamente escluso da Home, non mostrare
        if (p.featuredInHome === false) return false;
        // Default: 1° o 2° posto
        if (!p.rank) return false;
        const r = p.rank.toLowerCase();
        return r.includes('1') || r.includes('2') || r.includes('primo') || r.includes('secondo');
      });

  return [...candidates].sort((a, b) => {
    const oA = typeof a.orderHome === 'number' ? a.orderHome : (a.order ?? 999);
    const oB = typeof b.orderHome === 'number' ? b.orderHome : (b.order ?? 999);
    return oA - oB;
  });
}

/**
 * Recupera gli articoli memorizzati ordinati per `order`
 */
export function getStoredArticles(): Article[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sortArticles(normalizeArticles(parsed));
        }
      }
    } catch (e) {
      console.warn('Errore lettura articoli da localStorage', e);
    }
  }
  return sortArticles(normalizeArticles(initialArticles));
}

/**
 * Salva gli articoli nel localStorage
 */
export function saveStoredArticles(list: Article[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event('mba_articles_updated'));
    } catch (e) {
      console.warn('Errore salvataggio articoli in localStorage', e);
    }
  }
}

/**
 * Ordina gli articoli in base a `order`
 */
export function sortArticles(list: Article[]): Article[] {
  return [...list].sort((a, b) => {
    const oA = a.order ?? 999;
    const oB = b.order ?? 999;
    return oA - oB;
  });
}

/**
 * Articoli specifici per il carosello della Home Page
 */
export function getHomeArticles(): Article[] {
  const all = getStoredArticles();
  const explicitlyFeatured = all.filter((a) => a.featuredInHome === true);

  const candidates = explicitlyFeatured.length > 0
    ? explicitlyFeatured
    : all.filter((a) => a.featuredInHome !== false);

  return [...candidates].sort((a, b) => {
    const oA = typeof a.orderHome === 'number' ? a.orderHome : (a.order ?? 999);
    const oB = typeof b.orderHome === 'number' ? b.orderHome : (b.order ?? 999);
    return oA - oB;
  });
}

