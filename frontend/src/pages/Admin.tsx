import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  UploadSimple, 
  FileArrowDown, 
  Trash, 
  CheckCircle, 
  SlidersHorizontal, 
  Folder, 
  Newspaper, 
  Image as ImageIcon,
  Sparkle,
  Code,
  Spinner,
  Lock,
  SignOut,
  Pencil,
  X,
  CloudCheck,
  ArrowUp,
  ArrowDown,
  HouseLine
} from '@phosphor-icons/react';
import { type Project } from '../data/projects';
import { type Article } from '../data/articles';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredArticles, 
  saveStoredArticles 
} from '../lib/contentStore';
import { writeClient, uploadWebPToSanity } from '../lib/sanity';

interface ConvertedWebP {
  originalName: string;
  originalSize: number;
  webpName: string;
  webpSize: number;
  webpDataUrl: string;
  blob: Blob;
  savings: number;
  width: number;
  height: number;
}

// Password lette dalla variabile d'ambiente (non più hardcoded nel codice)
const DEFAULT_ADMIN_PASSWORDS = (import.meta.env.VITE_ADMIN_PASSWORDS || '').split(',').map((p: string) => p.trim().toLowerCase()).filter(Boolean);

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('mba_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (DEFAULT_ADMIN_PASSWORDS.includes(passwordInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mba_admin_auth', 'true');
      setAuthError(null);
      setPasswordInput('');
    } else {
      setAuthError('Password errata. Riprova.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mba_admin_auth');
  };

  // Admin Portal State
  const [activeTab, setActiveTab] = useState<'portfolio' | 'articles' | 'compressor' | 'export'>('portfolio');

  // Portfolio State & Edit State
  const [projectList, setProjectList] = useState<Project[]>(getStoredProjects);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    location: '',
    category: 'Edilizia Scolastica',
    client: '',
    amount: '',
    services: 'Progetto migliorie tecniche',
    credits: '',
    rank: '1° Posto',
    images: [],
    image: '',
    order: undefined,
    featuredInHome: true,
    orderHome: undefined,
  });

  // Articles State & Edit State
  const [articleList, setArticleList] = useState<Article[]>(getStoredArticles);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    category: 'Normativa',
    excerpt: '',
    content: '',
    coverImage: '',
    publishedAt: new Date().toISOString().split('T')[0],
    author: 'MBA Progetti',
    order: undefined,
    featuredInHome: true,
    orderHome: undefined,
  });

  // Global Compressor & Sanity Sync Status
  const [webpQuality, setWebpQuality] = useState<number>(85);
  const [compressedImages, setCompressedImages] = useState<ConvertedWebP[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSanitySyncing, setIsSanitySyncing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // WebP Client-Side Converter Core
  const convertFileToWebP = (file: File, quality: number): Promise<ConvertedWebP> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Errore canvas context');
          
          ctx.drawImage(img, 0, 0);

          const webpQualityRatio = quality / 100;
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject('Errore creazione Blob WebP');
              const webpDataUrl = canvas.toDataURL('image/webp', webpQualityRatio);
              const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
              const webpName = `${baseName}.webp`;
              const savings = Math.round(((file.size - blob.size) / file.size) * 100);

              resolve({
                originalName: file.name,
                originalSize: file.size,
                webpName,
                webpSize: blob.size,
                webpDataUrl,
                blob,
                savings,
                width: img.width,
                height: img.height,
              });
            },
            'image/webp',
            webpQualityRatio
          );
        };
        img.onerror = (err) => reject(err);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFilesUpload = async (files: FileList | null, destination: 'standalone' | 'project' | 'article') => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    try {
      const results: ConvertedWebP[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const converted = await convertFileToWebP(file, webpQuality);
          results.push(converted);
        }
      }

      setCompressedImages((prev) => [...results, ...prev]);

      if (destination === 'project' && results.length > 0) {
        const mainUrl = results[0].webpDataUrl;
        const allUrls = results.map((r) => r.webpDataUrl);
        setNewProject((prev) => ({
          ...prev,
          image: prev.image || mainUrl,
          images: [...(prev.images || []), ...allUrls],
        }));
        showNotify(`Convertite ${results.length} immagini in WebP per il progetto!`);
      } else if (destination === 'article' && results.length > 0) {
        setNewArticle((prev) => ({
          ...prev,
          coverImage: results[0].webpDataUrl,
        }));
        showNotify(`Copertina convertita in WebP per l'articolo!`);
      } else {
        showNotify(`Convertite con successo ${results.length} immagini in formato WebP!`);
      }
    } catch (err) {
      console.error(err);
      showNotify('Errore durante la conversione in WebP');
    } finally {
      setIsProcessing(false);
    }
  };

  // Start editing an existing project
  const handleStartEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setNewProject({ ...project });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setNewProject({
      title: '',
      description: '',
      location: '',
      category: 'Edilizia Scolastica',
      client: '',
      amount: '',
      services: 'Progetto migliorie tecniche',
      credits: '',
      rank: '1° Posto',
      images: [],
      image: '',
      order: undefined,
      featuredInHome: true,
      orderHome: undefined,
    });
  };

  // Move Project Up or Down in the List
  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projectList.length) return;

    const updated = [...projectList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    // Re-index order 1..N
    const withOrders = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setProjectList(withOrders);
    saveStoredProjects(withOrders);
    showNotify(`✅ Progetto spostato in posizione #${targetIndex + 1}!`);
  };

  // Toggle Home presence for Project
  const handleToggleProjectHome = (id: string) => {
    const updated = projectList.map((p) => {
      if (p.id === id) {
        const current = p.featuredInHome !== false;
        return { ...p, featuredInHome: !current };
      }
      return p;
    });
    setProjectList(updated);
    saveStoredProjects(updated);
    showNotify('✅ Visibilità Home aggiornata!');
  };

  // Add or Update Project with Direct Sanity Sync
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return showNotify('Inserisci il titolo del progetto');

    setIsSanitySyncing(true);

    const projectIdToUse = editingProjectId || `p${String(projectList.length + 1).padStart(2, '0')}-${newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`;

    const currentOrder = editingProjectId 
      ? (projectList.find(p => p.id === editingProjectId)?.order ?? projectList.length)
      : projectList.length + 1;

    const projectData: Project = {
      id: projectIdToUse,
      title: newProject.title || '',
      description: newProject.description || '',
      image: newProject.image || (newProject.images && newProject.images[0]) || '/media/portfolio/p01.webp',
      location: newProject.location || 'Italia',
      category: newProject.category || 'Edilizia Scolastica',
      client: newProject.client || 'PA',
      amount: newProject.amount || '-',
      services: newProject.services || 'Progetto migliorie tecniche',
      credits: newProject.credits || '',
      images: newProject.images && newProject.images.length > 0 ? newProject.images : [newProject.image || '/media/portfolio/p01.webp'],
      rank: newProject.rank,
      order: typeof newProject.order === 'number' && !isNaN(newProject.order) ? newProject.order : currentOrder,
      featuredInHome: newProject.featuredInHome !== undefined ? newProject.featuredInHome : true,
      orderHome: typeof newProject.orderHome === 'number' && !isNaN(newProject.orderHome) ? newProject.orderHome : undefined,
    };

    let updatedList: Project[];
    if (editingProjectId) {
      updatedList = projectList.map((p) => (p.id === editingProjectId ? projectData : p));
    } else {
      updatedList = [projectData, ...projectList];
    }

    setProjectList(updatedList);
    saveStoredProjects(updatedList);

    // Direct Sanity Cloud Push
    try {
      const mainImageAsset = await uploadWebPToSanity(projectData.image, `${projectData.id}-main.webp`);
      const galleryAssets = [];
      for (let i = 0; i < projectData.images.length; i++) {
        const asset = await uploadWebPToSanity(projectData.images[i], `${projectData.id}-${i}.webp`);
        if (asset) galleryAssets.push(asset);
      }

      const sanityDoc = {
        _type: 'project',
        _id: projectData.id.replace(/[^a-zA-Z0-9_-]/g, '-'),
        id: projectData.id,
        title: projectData.title,
        slug: { _type: 'slug', current: projectData.id },
        description: projectData.description,
        location: projectData.location,
        category: projectData.category,
        client: projectData.client,
        amount: projectData.amount,
        services: projectData.services,
        credits: projectData.credits,
        rank: projectData.rank || '',
        order: projectData.order,
        featuredInHome: projectData.featuredInHome,
        orderHome: projectData.orderHome,
        mainImage: mainImageAsset,
        images: galleryAssets,
      };

      await writeClient.createOrReplace(sanityDoc);
      showNotify('✅ Salvato sia in locale che sincronizzato su Sanity CMS Cloud!');
    } catch (err) {
      console.error('Errore sincronizzazione Sanity:', err);
      showNotify('Salvato in locale! (Verificare connessione Sanity)');
    } finally {
      setIsSanitySyncing(false);
      handleCancelEditProject();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const updated = projectList.filter((item) => item.id !== id);
    setProjectList(updated);
    saveStoredProjects(updated);
    try {
      const sanityId = id.replace(/[^a-zA-Z0-9_-]/g, '-');
      await writeClient.delete(sanityId);
      showNotify('Progetto rimosso sia in locale che da Sanity CMS!');
    } catch (err) {
      showNotify('Progetto rimosso dalla memoria locale.');
    }
  };

  // Start editing an article
  const handleStartEditArticle = (article: Article) => {
    setEditingArticleId(article.id);
    setNewArticle({ ...article });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleCancelEditArticle = () => {
    setEditingArticleId(null);
    setNewArticle({
      title: '',
      category: 'Normativa',
      excerpt: '',
      content: '',
      coverImage: '',
      publishedAt: new Date().toISOString().split('T')[0],
      author: 'MBA Progetti',
      order: undefined,
      featuredInHome: true,
      orderHome: undefined,
    });
  };

  // Move Article Up or Down in the List
  const handleMoveArticle = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= articleList.length) return;

    const updated = [...articleList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const withOrders = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setArticleList(withOrders);
    saveStoredArticles(withOrders);
    showNotify(`✅ Articolo spostato in posizione #${targetIndex + 1}!`);
  };

  // Toggle Home presence for Article
  const handleToggleArticleHome = (id: string) => {
    const updated = articleList.map((a) => {
      if (a.id === id) {
        const current = a.featuredInHome !== false;
        return { ...a, featuredInHome: !current };
      }
      return a;
    });
    setArticleList(updated);
    saveStoredArticles(updated);
    showNotify('✅ Visibilità Home aggiornata!');
  };

  // Add or Update Article with Direct Sanity Sync
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title) return showNotify('Inserisci il titolo dell\'articolo');

    setIsSanitySyncing(true);

    const articleIdToUse = editingArticleId || `art-${Date.now()}`;

    const currentOrder = editingArticleId 
      ? (articleList.find(a => a.id === editingArticleId)?.order ?? articleList.length)
      : articleList.length + 1;

    const articleData: Article = {
      id: articleIdToUse,
      title: newArticle.title || '',
      slug: newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: (newArticle.category as any) || 'Normativa',
      excerpt: newArticle.excerpt || '',
      content: newArticle.content || '',
      coverImage: newArticle.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      publishedAt: newArticle.publishedAt || new Date().toISOString().split('T')[0],
      author: newArticle.author || 'MBA Progetti',
      order: typeof newArticle.order === 'number' && !isNaN(newArticle.order) ? newArticle.order : currentOrder,
      featuredInHome: newArticle.featuredInHome !== undefined ? newArticle.featuredInHome : true,
      orderHome: typeof newArticle.orderHome === 'number' && !isNaN(newArticle.orderHome) ? newArticle.orderHome : undefined,
    };

    let updatedArticles: Article[];
    if (editingArticleId) {
      updatedArticles = articleList.map((a) => (a.id === editingArticleId ? articleData : a));
    } else {
      updatedArticles = [articleData, ...articleList];
    }

    setArticleList(updatedArticles);
    saveStoredArticles(updatedArticles);

    // Direct Sanity Cloud Push for Article
    try {
      const coverAsset = await uploadWebPToSanity(articleData.coverImage, `${articleData.slug}-cover.webp`);
      const sanityArticleDoc = {
        _type: 'article',
        _id: articleData.id,
        title: articleData.title,
        slug: { _type: 'slug', current: articleData.slug },
        category: articleData.category,
        excerpt: articleData.excerpt,
        content: articleData.content,
        publishedAt: articleData.publishedAt,
        author: articleData.author,
        order: articleData.order,
        featuredInHome: articleData.featuredInHome,
        orderHome: articleData.orderHome,
        coverImage: coverAsset,
      };

      await writeClient.createOrReplace(sanityArticleDoc);
      showNotify('✅ Articolo salvato e sincronizzato su Sanity CMS Cloud!');
    } catch (err) {
      console.error('Errore Sanity Article Sync:', err);
      showNotify('Articolo salvato in memoria locale.');
    } finally {
      setIsSanitySyncing(false);
      handleCancelEditArticle();
    }
  };

  const handleDeleteArticle = async (id: string) => {
    const updated = articleList.filter((item) => item.id !== id);
    setArticleList(updated);
    saveStoredArticles(updated);
    try {
      await writeClient.delete(id);
      showNotify('Articolo rimosso anche da Sanity CMS!');
    } catch (err) {
      showNotify('Articolo rimosso dalla memoria locale.');
    }
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateProjectsTsCode = () => {
    return `export interface Project {\n  id: string;\n  title: string;\n  description: string;\n  image: string;\n  location: string;\n  category: string;\n  client: string;\n  amount: string;\n  services: string;\n  credits: string;\n  images: string[];\n  rank?: string;\n  order?: number;\n  featuredInHome?: boolean;\n  orderHome?: number;\n}\n\nexport const projects: Project[] = ${JSON.stringify(projectList, null, 2)};\n`;
  };

  const generateArticlesTsCode = () => {
    return `export interface Article {\n  id: string;\n  title: string;\n  slug: string;\n  category: 'Normativa' | 'Tecnica' | 'BIM' | 'Case Study' | 'Generale';\n  excerpt: string;\n  content: string;\n  coverImage: string;\n  publishedAt: string;\n  author: string;\n  order?: number;\n  featuredInHome?: boolean;\n  orderHome?: number;\n}\n\nexport const articles: Article[] = ${JSON.stringify(articleList, null, 2)};\n`;
  };

  // 🔒 SCREEN DI LOGIN SE NON AUTENTICATO
  if (!isAuthenticated) {
    return (
      <div className="bg-navy min-h-screen flex items-center justify-center p-6 selection:bg-gold selection:text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-md w-full p-8 sm:p-12 shadow-2xl border-t-8 border-gold"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy text-gold mx-auto flex items-center justify-center mb-4">
              <Lock size={32} weight="bold" />
            </div>
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">MBA Studio CMS</span>
            <h2 className="text-navy text-2xl font-bold uppercase tracking-tighter">Accesso Riservato</h2>
            <p className="text-navy/60 text-xs font-light mt-2">Inserisci la password di amministrazione per accedere al Backoffice</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Password Amministratore</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Inserisci password..."
                className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                autoFocus
                required
              />
            </div>

            {authError && (
              <p className="text-red-600 text-xs font-bold uppercase tracking-wider text-center">{authError}</p>
            )}

            <button type="submit" className="w-full btn-dark py-5 text-xs uppercase tracking-widest">
              Accedi al Pannello
            </button>


          </form>
        </motion.div>
      </div>
    );
  }

  // 🔓 PANNELLO ADMIN AUTENTICATO
  return (
    <div className="bg-bg-neutral min-h-screen selection:bg-navy selection:text-white pt-28 pb-24">
      {/* Toast Notification */}
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-8 z-50 bg-navy text-white px-6 py-4 rounded-none shadow-2xl border-l-4 border-gold flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
        >
          <CloudCheck size={20} className="text-gold" />
          {notification}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-navy/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em] block">
                MBA Studio Backoffice
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-emerald-300 flex items-center gap-1">
                <CloudCheck size={12} /> Sanity Cloud Active
              </span>
            </div>
            <h1 className="text-navy text-3xl sm:text-4xl font-bold uppercase tracking-tighter">
              Pannello di Controllo <span className="text-stroke-navy">CMS.</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Tab Selection Navigation */}
            <div className="flex flex-wrap gap-2 bg-white p-2 border border-navy/10">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'portfolio' ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                <Folder size={16} /> Portfolio ({projectList.length})
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'articles' ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                <Newspaper size={16} /> Blog ({articleList.length})
              </button>
              <button
                onClick={() => setActiveTab('compressor')}
                className={`px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'compressor' ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                <Sparkle size={16} className="text-gold" /> Compressore WebP
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'export' ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                <Code size={16} /> Esporta Dati
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 border border-red-600/20"
              title="Esci dal Backoffice"
            >
              <SignOut size={16} /> Esci
            </button>
          </div>
        </div>

        {/* Global WebP Quality Control Bar */}
        <div className="bg-white p-6 border border-navy/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={20} className="text-gold" />
            <div>
              <h4 className="text-navy text-xs font-bold uppercase tracking-widest">Qualità Conversione WebP</h4>
              <p className="text-navy/50 text-[11px]">Compressione automatica browser e sincronizzazione automatica Sanity Cloud</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={webpQuality} 
              onChange={(e) => setWebpQuality(Number(e.target.value))}
              className="w-full md:w-48 accent-gold cursor-pointer"
            />
            <span className="text-navy font-bold text-sm bg-navy/5 px-3 py-1 border border-navy/10 min-w-[50px] text-center">
              {webpQuality}%
            </span>
          </div>
        </div>

        {/* TAB 1: PORTFOLIO MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Section (Add & Edit) */}
            <div className="lg:col-span-7 bg-white p-8 border border-navy/10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-navy text-xl font-bold uppercase tracking-tighter flex items-center gap-3">
                  {editingProjectId ? <Pencil size={20} className="text-gold" /> : <Plus size={20} className="text-gold" />}
                  {editingProjectId ? `Modifica Progetto` : 'Carica Nuovo Progetto Portfolio'}
                </h3>

                {editingProjectId && (
                  <button
                    onClick={handleCancelEditProject}
                    className="text-navy/50 hover:text-navy text-xs font-bold uppercase tracking-widest flex items-center gap-1 bg-navy/5 px-3 py-1.5"
                  >
                    <X size={14} /> Annulla Modifica
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProject} className="space-y-6">
                <div>
                  <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Titolo Progetto *</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="es: Riqualificazione Nuovo Polo Scolastico"
                    className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Categoria</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="Edilizia Scolastica">Edilizia Scolastica</option>
                      <option value="Infrastrutture">Infrastrutture</option>
                      <option value="Sport">Sport</option>
                      <option value="Sanità">Sanità</option>
                      <option value="Restauro">Restauro</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Dissesto Idrogeologico">Dissesto Idrogeologico</option>
                      <option value="Residenziale">Residenziale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Posizione / Graduatoria</label>
                    <select
                      value={newProject.rank}
                      onChange={(e) => setNewProject({ ...newProject, rank: e.target.value })}
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="1° Posto">1° Posto (Vincitore)</option>
                      <option value="2° Posto">2° Posto</option>
                      <option value="3° Posto">3° Posto</option>
                      <option value="">Nessun piazzamento specifico</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Luogo</label>
                    <input
                      type="text"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      placeholder="es: Roma (RM), Italia"
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Importo Lavori</label>
                    <input
                      type="text"
                      value={newProject.amount}
                      onChange={(e) => setNewProject({ ...newProject, amount: e.target.value })}
                      placeholder="es: 4.5 MLN"
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Stazione Appaltante / Cliente</label>
                    <input
                      type="text"
                      value={newProject.client}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      placeholder="es: Comune di Roma"
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Servizi Svolti</label>
                    <input
                      type="text"
                      value={newProject.services}
                      onChange={(e) => setNewProject({ ...newProject, services: e.target.value })}
                      placeholder="Progetto migliorie tecniche"
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Crediti & Team</label>
                  <input
                    type="text"
                    value={newProject.credits}
                    onChange={(e) => setNewProject({ ...newProject, credits: e.target.value })}
                    placeholder="es: RTP Studio Associato Arch. Rossi"
                    className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Descrizione Operativa</label>
                  <textarea
                    rows={4}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Dettagli sulle soluzioni tecniche, varianti migliorative ed efficientamento..."
                    className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Integrated WebP Image Upload */}
                <div className="border-2 border-dashed border-gold/40 p-8 text-center bg-gold/5">
                  <ImageIcon size={36} className="text-gold mx-auto mb-3" />
                  <h4 className="text-navy text-xs font-bold uppercase tracking-widest mb-1">
                    {editingProjectId ? 'Aggiungi / Aggiorna Immagini (Auto-WebP)' : 'Carica Immagini Progetto (Auto-WebP)'}
                  </h4>
                  <p className="text-navy/50 text-xs mb-4">I file JPG o PNG caricati verranno convertiti istantaneamente in WebP ad alta efficienza</p>
                  
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFilesUpload(e.target.files, 'project')}
                    className="hidden"
                    id="project-img-input"
                  />
                  <label
                    htmlFor="project-img-input"
                    className="btn-gold px-6 py-3 cursor-pointer text-xs inline-flex items-center gap-2"
                  >
                    {isProcessing ? <Spinner size={16} className="animate-spin" /> : <UploadSimple size={16} />}
                    {isProcessing ? 'Conversione in corso...' : 'Seleziona Nuove Foto'}
                  </label>

                  {newProject.images && newProject.images.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      {newProject.images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 border border-navy/20 bg-white">
                          <img src={img} alt="Preview" className="w-full h-full object-cover" />
                          <span className="absolute top-0 right-0 bg-gold text-white text-[9px] px-1 font-bold">WEBP</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = (newProject.images || []).filter((_, i) => i !== idx);
                              setNewProject({ ...newProject, images: filtered, image: filtered[0] || '' });
                            }}
                            className="absolute bottom-0 right-0 bg-red-600 text-white p-1 text-[9px]"
                            title="Rimuovi Immagine"
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Controllo Ordine e Visibilità Home */}
                <div className="bg-[#14223d]/5 border border-navy/15 p-5 rounded-[1px] space-y-4">
                  <h4 className="text-navy text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#F5C400]" />
                    Controllo Ordine &amp; Visibilità Home
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        Posizione Generale (Portfolio)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newProject.order ?? ''}
                        onChange={(e) => setNewProject({ ...newProject, order: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                        placeholder="Es. 1, 2, 3..."
                        className="w-full bg-white border border-navy/20 p-3 text-xs focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div>
                      <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        Posizione nella Home
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newProject.orderHome ?? ''}
                        onChange={(e) => setNewProject({ ...newProject, orderHome: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                        placeholder="Es. 1, 2, 3..."
                        className="w-full bg-white border border-navy/20 p-3 text-xs focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-2 cursor-pointer p-3 bg-white border border-navy/20 h-[42px]">
                        <input
                          type="checkbox"
                          checked={newProject.featuredInHome !== false}
                          onChange={(e) => setNewProject({ ...newProject, featuredInHome: e.target.checked })}
                          className="w-4 h-4 text-[#F5C400] accent-[#F5C400]"
                        />
                        <span className="text-[11px] font-bold text-navy uppercase tracking-wider">Mostra in Home</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    disabled={isSanitySyncing}
                    className="w-full btn-dark py-5 text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSanitySyncing ? (
                      <Spinner size={18} className="animate-spin text-gold" />
                    ) : editingProjectId ? (
                      <CheckCircle size={18} className="text-gold" />
                    ) : (
                      <Plus size={18} />
                    )}
                    {isSanitySyncing
                      ? 'Sincronizzazione Sanity Cloud in corso...'
                      : editingProjectId
                      ? 'Salva Modifiche Progetto'
                      : 'Salva Progetto nel Portfolio'}
                  </button>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="px-6 bg-navy/10 hover:bg-navy/20 text-navy font-bold text-xs uppercase tracking-widest"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Section with Edit & Reorder Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-navy text-xl font-bold uppercase tracking-tighter">
                  Progetti Nel Portfolio ({projectList.length})
                </h3>
                <span className="text-[11px] text-navy/50 font-normal">
                  Usa le frecce per riordinare
                </span>
              </div>

              <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                {projectList.map((p, idx) => (
                  <div 
                    key={p.id} 
                    className={`bg-white p-3.5 border transition-all flex items-center justify-between gap-3 rounded-[1px] ${
                      editingProjectId === p.id ? 'border-[#F5C400] ring-2 ring-[#F5C400]/20' : 'border-navy/10 hover:border-navy/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Position Badges */}
                      <div className="flex flex-col items-center justify-center shrink-0 w-8 h-8 bg-navy text-white text-xs font-bold font-outfit rounded-[1px]">
                        #{idx + 1}
                      </div>
                      <img src={p.image} alt={p.title} className="w-12 h-12 object-cover bg-navy/10 border border-navy/10 shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-[#F5C400] text-[9px] font-bold uppercase tracking-widest">{p.category}</span>
                          {p.featuredInHome !== false ? (
                            <span className="bg-[#F5C400]/15 text-navy text-[9px] font-bold px-1.5 py-0.5 rounded-[1px] flex items-center gap-1">
                              <HouseLine size={10} weight="fill" className="text-[#F5C400]" />
                              Home {p.orderHome ? `#${p.orderHome}` : ''}
                            </span>
                          ) : (
                            <span className="bg-navy/5 text-navy/40 text-[9px] font-bold px-1.5 py-0.5 rounded-[1px]">
                              Nascosto da Home
                            </span>
                          )}
                        </div>
                        <h4 className="text-navy text-xs font-bold uppercase tracking-tight truncate">{p.title}</h4>
                        <p className="text-navy/50 text-[10px]">{p.location} • {p.amount}</p>
                      </div>
                    </div>

                    {/* Reorder and Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveProject(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy disabled:opacity-20 disabled:hover:bg-navy/5 disabled:hover:text-navy transition-colors rounded-[1px]"
                        title="Sposta in Alto"
                      >
                        <ArrowUp size={14} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveProject(idx, 'down')}
                        disabled={idx === projectList.length - 1}
                        className="p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy disabled:opacity-20 disabled:hover:bg-navy/5 disabled:hover:text-navy transition-colors rounded-[1px]"
                        title="Sposta in Basso"
                      >
                        <ArrowDown size={14} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleProjectHome(p.id)}
                        className={`p-1.5 transition-colors rounded-[1px] ${
                          p.featuredInHome !== false 
                            ? 'bg-[#F5C400]/20 text-navy hover:bg-[#F5C400] hover:text-navy' 
                            : 'bg-navy/5 text-navy/40 hover:bg-navy/10'
                        }`}
                        title={p.featuredInHome !== false ? "Visibile in Home (clicca per nascondere)" : "Nascosto da Home (clicca per mostrare)"}
                      >
                        <HouseLine size={14} weight={p.featuredInHome !== false ? "fill" : "regular"} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartEditProject(p)}
                        className="p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy transition-colors rounded-[1px]"
                        title="Modifica Progetto"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1.5 text-navy/30 hover:text-red-600 transition-colors rounded-[1px]"
                        title="Rimuovi Progetto"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG ARTICLES MANAGER */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Section (Add & Edit) */}
            <div className="lg:col-span-7 bg-white p-8 border border-navy/10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-navy text-xl font-bold uppercase tracking-tighter flex items-center gap-3">
                  {editingArticleId ? <Pencil size={20} className="text-gold" /> : <Plus size={20} className="text-gold" />}
                  {editingArticleId ? 'Modifica Articolo Blog' : 'Pubblica Nuovo Articolo Blog'}
                </h3>

                {editingArticleId && (
                  <button
                    onClick={handleCancelEditArticle}
                    className="text-navy/50 hover:text-navy text-xs font-bold uppercase tracking-widest flex items-center gap-1 bg-navy/5 px-3 py-1.5"
                  >
                    <X size={14} /> Annulla Modifica
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-6">
                <div>
                  <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Titolo Articolo *</label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="es: Guida alla compilazione delle offerte tecniche OEPV"
                    className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Categoria</label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="Normativa">Normativa</option>
                      <option value="Tecnica">Tecnica</option>
                      <option value="BIM">BIM</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Generale">Generale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Data Pubblicazione</label>
                    <input
                      type="date"
                      value={newArticle.publishedAt}
                      onChange={(e) => setNewArticle({ ...newArticle, publishedAt: e.target.value })}
                      className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Estratto / Riassunto Breve</label>
                  <textarea
                    rows={2}
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    placeholder="Sintesi per la scheda articolo nella pagina Risorse..."
                    className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Contenuto Completo dell'Articolo</label>
                  <textarea
                    rows={6}
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    placeholder="Testo dell'approfondimento..."
                    className="w-full bg-bg-neutral border border-navy/20 p-4 text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Article Cover WebP Upload */}
                <div className="border-2 border-dashed border-gold/40 p-8 text-center bg-gold/5">
                  <ImageIcon size={36} className="text-gold mx-auto mb-3" />
                  <h4 className="text-navy text-xs font-bold uppercase tracking-widest mb-1">
                    Copertina Articolo (Auto-WebP)
                  </h4>
                  <p className="text-navy/50 text-xs mb-4">L'immagine verrà convertita in WebP prima della pubblicazione</p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFilesUpload(e.target.files, 'article')}
                    className="hidden"
                    id="article-img-input"
                  />
                  <label
                    htmlFor="article-img-input"
                    className="btn-gold px-6 py-3 cursor-pointer text-xs inline-flex items-center gap-2"
                  >
                    {isProcessing ? <Spinner size={16} className="animate-spin" /> : <UploadSimple size={16} />}
                    {isProcessing ? 'Conversione in corso...' : 'Carica Immagine Copertina'}
                  </label>

                  {newArticle.coverImage && (
                    <div className="mt-6 flex justify-center">
                      <div className="relative w-40 h-24 border border-navy/20 bg-white">
                        <img src={newArticle.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <span className="absolute top-0 right-0 bg-gold text-white text-[9px] px-1 font-bold">WEBP READY</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controllo Ordine e Visibilità Home */}
                <div className="bg-[#14223d]/5 border border-navy/15 p-5 rounded-[1px] space-y-4">
                  <h4 className="text-navy text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#F5C400]" />
                    Controllo Ordine &amp; Visibilità Home
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        Posizione Generale (Blog)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newArticle.order ?? ''}
                        onChange={(e) => setNewArticle({ ...newArticle, order: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                        placeholder="Es. 1, 2, 3..."
                        className="w-full bg-white border border-navy/20 p-3 text-xs focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div>
                      <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        Posizione nella Home
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newArticle.orderHome ?? ''}
                        onChange={(e) => setNewArticle({ ...newArticle, orderHome: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                        placeholder="Es. 1, 2, 3..."
                        className="w-full bg-white border border-navy/20 p-3 text-xs focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-2 cursor-pointer p-3 bg-white border border-navy/20 h-[42px]">
                        <input
                          type="checkbox"
                          checked={newArticle.featuredInHome !== false}
                          onChange={(e) => setNewArticle({ ...newArticle, featuredInHome: e.target.checked })}
                          className="w-4 h-4 text-[#F5C400] accent-[#F5C400]"
                        />
                        <span className="text-[11px] font-bold text-navy uppercase tracking-wider">Mostra in Home</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    disabled={isSanitySyncing}
                    className="w-full btn-dark py-5 text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSanitySyncing ? (
                      <Spinner size={18} className="animate-spin text-gold" />
                    ) : editingArticleId ? (
                      <CheckCircle size={18} className="text-gold" />
                    ) : (
                      <Plus size={18} />
                    )}
                    {isSanitySyncing
                      ? 'Sincronizzazione Sanity Cloud in corso...'
                      : editingArticleId
                      ? 'Salva Modifiche Articolo'
                      : 'Pubblica Articolo'}
                  </button>

                  {editingArticleId && (
                    <button
                      type="button"
                      onClick={handleCancelEditArticle}
                      className="px-6 bg-navy/10 hover:bg-navy/20 text-navy font-bold text-xs uppercase tracking-widest"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Articles List */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-navy text-xl font-bold uppercase tracking-tighter">
                  Articoli Pubblicati ({articleList.length})
                </h3>
                <span className="text-[11px] text-navy/50 font-normal">
                  Usa le frecce per riordinare
                </span>
              </div>

              <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                {articleList.map((a, idx) => (
                  <div 
                    key={a.id} 
                    className={`bg-white p-3.5 border transition-all flex items-center justify-between gap-3 rounded-[1px] ${
                      editingArticleId === a.id ? 'border-[#F5C400] ring-2 ring-[#F5C400]/20' : 'border-navy/10 hover:border-navy/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Position Badges */}
                      <div className="flex flex-col items-center justify-center shrink-0 w-8 h-8 bg-navy text-white text-xs font-bold font-outfit rounded-[1px]">
                        #{idx + 1}
                      </div>
                      <img src={a.coverImage} alt={a.title} className="w-12 h-12 object-cover bg-navy/10 border border-navy/10 shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-[#F5C400] text-[9px] font-bold uppercase tracking-widest">{a.category} • {a.publishedAt}</span>
                          {a.featuredInHome !== false ? (
                            <span className="bg-[#F5C400]/15 text-navy text-[9px] font-bold px-1.5 py-0.5 rounded-[1px] flex items-center gap-1">
                              <HouseLine size={10} weight="fill" className="text-[#F5C400]" />
                              Home {a.orderHome ? `#${a.orderHome}` : ''}
                            </span>
                          ) : (
                            <span className="bg-navy/5 text-navy/40 text-[9px] font-bold px-1.5 py-0.5 rounded-[1px]">
                              Nascosto da Home
                            </span>
                          )}
                        </div>
                        <h4 className="text-navy text-xs font-bold uppercase tracking-tight truncate">{a.title}</h4>
                      </div>
                    </div>

                    {/* Reorder and Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveArticle(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy disabled:opacity-20 disabled:hover:bg-navy/5 disabled:hover:text-navy transition-colors rounded-[1px]"
                        title="Sposta in Alto"
                      >
                        <ArrowUp size={14} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveArticle(idx, 'down')}
                        disabled={idx === articleList.length - 1}
                        className="p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy disabled:opacity-20 disabled:hover:bg-navy/5 disabled:hover:text-navy transition-colors rounded-[1px]"
                        title="Sposta in Basso"
                      >
                        <ArrowDown size={14} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleArticleHome(a.id)}
                        className={`p-1.5 transition-colors rounded-[1px] ${
                          a.featuredInHome !== false 
                            ? 'bg-[#F5C400]/20 text-navy hover:bg-[#F5C400] hover:text-navy' 
                            : 'bg-navy/5 text-navy/40 hover:bg-navy/10'
                        }`}
                        title={a.featuredInHome !== false ? "Visibile in Home (clicca per nascondere)" : "Nascosto da Home (clicca per mostrare)"}
                      >
                        <HouseLine size={14} weight={a.featuredInHome !== false ? "fill" : "regular"} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartEditArticle(a)}
                        className="p-1.5 bg-navy/5 hover:bg-navy hover:text-white text-navy transition-colors rounded-[1px]"
                        title="Modifica Articolo"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(a.id)}
                        className="p-1.5 text-navy/30 hover:text-red-600 transition-colors rounded-[1px]"
                        title="Rimuovi Articolo"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STANDALONE WEBP COMPRESSOR */}
        {activeTab === 'compressor' && (
          <div className="bg-white p-8 border border-navy/10 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <Sparkle size={48} className="text-gold mx-auto mb-4" />
              <h3 className="text-navy text-2xl font-bold uppercase tracking-tighter mb-3">
                Compressore WebP da Browser
              </h3>
              <p className="text-navy/60 text-sm">
                Trascina o seleziona qualunque immagine in formato PNG, JPG o JPEG per convertirla istantaneamente in WebP ad alte prestazioni senza inviare dati a server esterni.
              </p>
            </div>

            <div className="border-2 border-dashed border-gold p-12 text-center bg-bg-neutral hover:bg-gold/5 transition-colors cursor-pointer"
                 onClick={() => fileInputRef.current?.click()}
            >
              {isProcessing ? <Spinner size={48} className="text-gold mx-auto mb-4 animate-spin" /> : <UploadSimple size={48} className="text-gold mx-auto mb-4" />}
              <h4 className="text-navy text-base font-bold uppercase tracking-widest mb-2">
                Trascina le tue immagini qui
              </h4>
              <p className="text-navy/50 text-xs mb-6">Qualità impostata al {webpQuality}% • Risparmio tipico da 60% a 90%</p>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFilesUpload(e.target.files, 'standalone')}
                className="hidden"
              />

              <button className="btn-gold px-8 py-4 text-xs inline-flex items-center gap-2">
                Seleziona File dal Computer
              </button>
            </div>

            {/* Compression Results Table */}
            {compressedImages.length > 0 && (
              <div className="pt-8 border-t border-navy/10">
                <h4 className="text-navy text-lg font-bold uppercase tracking-tighter mb-6">
                  Immagini Convertite ({compressedImages.length})
                </h4>

                <div className="space-y-4">
                  {compressedImages.map((img, idx) => (
                    <div key={idx} className="bg-bg-neutral p-4 border border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={img.webpDataUrl} alt={img.webpName} className="w-16 h-16 object-cover border border-navy/20 bg-white" />
                        <div>
                          <h5 className="text-navy text-xs font-bold uppercase">{img.webpName}</h5>
                          <p className="text-navy/50 text-[11px]">
                            Originale: {(img.originalSize / 1024).toFixed(1)} KB → <span className="text-navy font-bold">WebP: {(img.webpSize / 1024).toFixed(1)} KB</span>
                          </p>
                          <p className="text-navy/40 text-[10px]">Dimensioni: {img.width} x {img.height} px</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="bg-gold text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                          -{img.savings}% Risparmiati
                        </span>
                        <button
                          onClick={() => downloadBlob(img.blob, img.webpName)}
                          className="btn-dark px-4 py-2 text-[10px] flex items-center gap-2"
                        >
                          <FileArrowDown size={14} /> Scarica WebP
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXPORT CODE & DATA */}
        {activeTab === 'export' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-navy/10">
              <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-4 flex items-center gap-2">
                <Code size={20} className="text-gold" /> Esporta projects.ts
              </h3>
              <p className="text-navy/60 text-xs mb-6">Codice TypeScript generato in tempo reale per aggiornare i progetti del portfolio.</p>
              
              <textarea
                readOnly
                rows={12}
                value={generateProjectsTsCode()}
                className="w-full bg-bg-neutral font-mono text-[11px] p-4 border border-navy/20 focus:outline-none"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateProjectsTsCode());
                  showNotify('Codice projects.ts copiato negli appunti!');
                }}
                className="w-full btn-gold py-4 text-xs mt-4 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Copia Codice projects.ts
              </button>
            </div>

            <div className="bg-white p-8 border border-navy/10">
              <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-4 flex items-center gap-2">
                <Code size={20} className="text-gold" /> Esporta articles.ts
              </h3>
              <p className="text-navy/60 text-xs mb-6">Codice TypeScript generato in tempo reale per aggiornare gli articoli del blog.</p>
              
              <textarea
                readOnly
                rows={12}
                value={generateArticlesTsCode()}
                className="w-full bg-bg-neutral font-mono text-[11px] p-4 border border-navy/20 focus:outline-none"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateArticlesTsCode());
                  showNotify('Codice articles.ts copiato negli appunti!');
                }}
                className="w-full btn-gold py-4 text-xs mt-4 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Copia Codice articles.ts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
