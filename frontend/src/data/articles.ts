export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Normativa' | 'Tecnica' | 'BIM' | 'Case Study' | 'Generale';
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: "art-01",
    title: "Le novità del D.Lgs. 36/2023 per le gare OEPV",
    slug: "novita-dlgs-36-2023-gare-oepv",
    category: "Normativa",
    excerpt: "Una guida pratica alle principali modifiche normative del Codice dei Contratti Pubblici e ai loro effetti sulla redazione delle offerte tecniche.",
    content: "Il D.Lgs. 36/2023 ha introdotto importanti novità nella disciplina dei contratti pubblici, rafforzando il principio del risultato e della fiducia. Nella valutazione delle offerte economicamente più vantaggiose (OEPV), le stazioni appaltanti richiedono criteri premianti sempre più stringenti legati alla sostenibilità ambientale (CAM), all'organizzazione del cantiere e alla qualità delle soluzioni tecniche. In questo approfondimento analizziamo come strutturare un'offerta tecnica vincente in linea con le ultime linee guida ANAC e la giurisprudenza amministrativa.",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-06-15",
    author: "MBA Progetti"
  },
  {
    id: "art-02",
    title: "Calcolare il ribasso ottimale in una gara OEPV",
    slug: "calcolo-ribasso-ottimale-oepv",
    category: "Tecnica",
    excerpt: "Strategie matematiche e formule per massimizzare il punteggio complessivo senza rischiare il giudizio di anomalia dell'offerta.",
    content: "Nelle gare a offerta economicamente più vantaggiosa, l'equilibrio tra punteggio tecnico ed economico è determinante per la vittoria. Attraverso l'uso di simulatori di calcolo basati sulle quattro formule ministeriali più diffuse (bilineare, concava, lineare ed interpolazione), è possibile individuare il ribasso 'punto di svolta' che garantisce la massima resa senza intaccare la sostenibilità dell'opera.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    publishedAt: "2026-05-20",
    author: "Ing. Andrea Masucci"
  },
  {
    id: "art-03",
    title: "BIM e gare d'appalto: vantaggi concreti nelle offerte migliorie",
    slug: "bim-gare-d-appalto-vantaggi-offerte-migliorie",
    category: "BIM",
    excerpt: "Come la modellazione informativa BIM migliora la chiarezza dell'offerta tecnica e facilita la valutazione da parte della commissione giudicatrice.",
    content: "L'adozione della metodologia Building Information Modeling (BIM) nell'elaborazione delle migliorie tecniche consente di rilevare precocemente le interferenze (clash detection), simulare le fasi di cantiere (4D) e calcolare con estrema precisione i costi e le quantità dei materiali (5D). La presentazione di elaborati BIM-based costituisce un elemento distintivo di altissimo valore percepito per la commissione di gara.",
    coverImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-04-10",
    author: "MBA Progetti"
  }
];
