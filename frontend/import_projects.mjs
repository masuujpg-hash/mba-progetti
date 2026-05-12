import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// --- CONFIGURAZIONE ---
const client = createClient({
  projectId: 'ws52ogy0',
  dataset: 'production',
  token: 'skyDqFNAzFFEOPCXLceK4RNTH2FIh8YHXe3b336tpu2tHXwGVr1hsvOQlzuR5RvZnSYgyJvSN3k73G7rCzdv9e6eIR6lEogf2kKOnlsuGOQqd7lHdWrq8T12dXG8coE9EGYluomWXl02DZSSSGDznZLpbMoSjgOqULCRL2CgiaD6SnfConQT',
  useCdn: false,
  apiVersion: '2024-03-12',
});

// Dati estratti dal tuo projects.ts
const projects = [
  {
    id: "01",
    title: "Nuovo edificio Segreterie Studenti e bar/punto ristoro – Campus Chieti",
    description: "Supporto all’impresa nella redazione dell’offerta migliorativa per il nuovo edificio delle Segreterie Studenti e del bar del Campus di Chieti. Integrazione attenta tra architettura, impianti e organizzazione del cantiere.",
    image: "/media/portfolio/p01.jpg",
    location: "Chieti, Italia",
    category: "Edilizia Scolastica",
    client: "Università degli Studi “G. d’Annunzio” – Chieti Pescara",
    amount: "7 MLN",
    services: "Progetto migliorie tecniche",
    credits: "RTP Peia Associati (Capogruppo), VE.MA. Progetti srls, Tekser srl, Ing. V. Aceto",
    images: ["/media/portfolio/p01.jpg", "/media/portfolio/p01_v.webp"],
    rank: "1°"
  },
  {
    id: "02",
    title: "Impianti fotovoltaici – Pozzilli (IS)",
    description: "Sviluppo di un’offerta tecnica focalizzata sull’affidabilità operativa dell’ATI e sulla qualità delle soluzioni impiantistiche. Primo posto in graduatoria grazie alla chiarezza documentale.",
    image: "/media/portfolio/p02.webp",
    location: "Pozzilli (IS), Italia",
    category: "Infrastrutture",
    client: "Consorzio per lo Sviluppo Industriale Isernia–Venafro",
    amount: "-",
    services: "Progetto Migliorie Tecniche",
    credits: "",
    images: ["/media/portfolio/p02.webp", "/media/portfolio/p02_1.webp", "/media/portfolio/p02_v.webp"],
    rank: "1°"
  },
  {
    id: "03",
    title: "Piscina Comunale – Centro Sportivo Varazi, Monteverde",
    description: "Miglioramento complessivo della nuova piscina comunale, con attenzione a durabilità, sicurezza e manutenzione. Riqualificazione delle aree di accesso esterne.",
    image: "/media/portfolio/p03.webp",
    location: "Bojano (CB), Italia",
    category: "Sport",
    client: "Comune di Bojano",
    amount: "1.5 MLN",
    services: "Progetto Migliorie Tecniche",
    credits: "",
    images: ["/media/portfolio/p03.webp", "/media/portfolio/p03_1.webp", "/media/portfolio/p03_v.webp"]
  },
  {
    id: "04",
    title: "Ex Complesso Ospedaliero di Sarteano – I e II lotto",
    description: "Offerta migliorativa per la riqualificazione del complesso, con interventi su efficienza energetica, comfort interno e qualità costruttiva (isolamenti CAM, sistemi DALI).",
    image: "/media/portfolio/p04.webp",
    location: "Sarteano (SI), Italia",
    category: "Sanità",
    client: "Unione dei Comuni Valdichiana Senese",
    amount: "2.20 MLN",
    services: "Progetto migliorie tecniche",
    credits: "",
    images: ["/media/portfolio/p04.webp", "/media/portfolio/p04_v.webp"]
  },
  {
    id: "05",
    title: "Risanamento conservativo ex Ples – Collegio del Mondo Unito",
    description: "Migliorie tecniche per il risanamento dell’immobile storico destinato a residenza per studenti. Equilibrio tra tutela del patrimonio e funzionalità d’uso.",
    image: "/media/portfolio/p05.webp",
    location: "Duino Aurisina (TS), Italia",
    category: "Restauro",
    client: "Regione Autonoma Friuli Venezia Giulia",
    amount: "0.70 MLN",
    services: "Progetto migliorie tecniche",
    credits: "RTP Studio Associato Arch. B. Pessina – Ing. M. Lanza (Capogruppo)",
    images: ["/media/portfolio/p05.webp", "/media/portfolio/p05_v.webp"]
  },
  {
    id: "06",
    title: "Biblioteca di via della Lega Lombarda – Ex deposito ATAC",
    description: "Trasformazione di un ex deposito ATAC in biblioteca di quartiere. Ottimizzazione degli interni, qualità ambientale e gestione del cantiere urbano.",
    image: "/media/portfolio/p06.webp",
    location: "Roma – Municipio II, Italia",
    category: "Cultura",
    client: "Roma Capitale – Municipio Roma II",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "RTP Labics S.r.l.",
    images: ["/media/portfolio/p06.webp", "/media/portfolio/p06_v.webp"]
  },
  {
    id: "07",
    title: "Teatro di posa e camerini – Cinecittà (Ambiti C4A e C4B)",
    description: "Proposta migliorativa per il nuovo Teatro di Posa, orientata a prestazioni strutturali, efficienza energetica e riduzione degli impatti in un contesto operativo delicato.",
    image: "/media/portfolio/p07.webp",
    location: "Roma - Cinecittà, Italia",
    category: "Cultura",
    client: "Cinecittà S.p.A.",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "Dott. Domenico Pinuccio D’Arino, Arch. Dino D’Antimi, et al.",
    images: ["/media/portfolio/p07.webp", "/media/portfolio/p07_v.webp"]
  },
  {
    id: "08",
    title: "Messa in sicurezza territorio comunale – Zona 3",
    description: "Intervento di messa in sicurezza del territorio comunale a ridosso del centro abitato. Focus sulla prevenzione e mitigazione del rischio idrogeologico.",
    image: "/media/portfolio/p08.png",
    location: "Comune di Bellegra (RM), Italia",
    category: "Dissesto Idrogeologico",
    client: "Comune di Bellegra",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "Progetto esecutivo: Ingegneria Naturale srl",
    images: ["/media/portfolio/p08.png", "/media/portfolio/p08_v.png"]
  },
  {
    id: "09",
    title: "Palazzo della Salute della Valpolcevera",
    description: "Costruzione del nuovo Palazzo della Salute. Migliorie su aspetti funzionali, organizzazione del cantiere e integrazione BIM per architettura e impianti.",
    image: "/media/portfolio/p09.webp",
    location: "Genova – località Bolzaneto",
    category: "Sanità",
    client: "ASL3 Genova",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "TECNICAER ENGINEERING srl, DODI MOSS srl",
    images: ["/media/portfolio/p09.webp", "/media/portfolio/p09_v.webp"]
  },
  {
    id: "10",
    title: "Aree esterne e viabilità nuova sede universitaria",
    description: "Completamento delle aree esterne e viabilità. Migliorie per la riduzione delle emissioni acustiche e polveri, conformità CAM e ottimizzazione dei percorsi.",
    image: "/media/portfolio/p10.webp",
    location: "Bergamo, Italia",
    category: "Infrastrutture",
    client: "ASST Papa Giovanni XXIII",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "Mythos Consor stabile S.c.ar.l.",
    images: ["/media/portfolio/p10.webp", "/media/portfolio/p10_1.webp", "/media/portfolio/p10_v.webp"]
  },
  {
    id: "11",
    title: "Demolizione e ricostruzione edifici ERP – Loc. Cardito",
    description: "Proposta orientata a completezza esecutiva, prestazioni superiori e conformità CAM. Integrazione di materiali certificati e dotazioni impiantistiche moderne.",
    image: "/media/portfolio/p11.webp",
    location: "Comune di Vallerotonda (FR), Italia",
    category: "Residenziale",
    client: "Comune di Vallerotonda (FR)",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "Progetto esecutivo: Arch. Vitaliano Magro",
    images: ["/media/portfolio/p11.webp", "/media/portfolio/p11_v.webp"]
  },
  {
    id: "12",
    title: "Istituto Comprensivo “San Giovanni Bosco” – Adeguamento sismico",
    description: "Adeguamento sismico ed efficientamento energetico dell’istituto scolastico. Soluzioni tecniche per la sicurezza strutturale e il risparmio energetico.",
    image: "/media/portfolio/p12.jpg",
    location: "Comune di San Salvatore Telesino (BN), Italia",
    category: "Edilizia Scolastica",
    client: "Comune di San Salvatore Telesino (BN)",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "Progetto esecutivo: Ing. Maturo Rosario",
    images: ["/media/portfolio/p12.jpg", "/media/portfolio/p12_v.webp"]
  },
  {
    id: "13",
    title: "Ex Caserma Palmanova – Ristrutturazione per didattica e ricerca",
    description: "Riqualificazione architettonica e funzionale per l’Università della Tuscia. Ottimizzazione delle prestazioni energetiche e della fruibilità degli ambienti.",
    image: "/media/portfolio/p13.webp",
    location: "Viterbo, Italia",
    category: "Ricerca",
    client: "Università degli Studi della Tuscia",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "",
    images: ["/media/portfolio/p13.webp", "/media/portfolio/p13_v.webp"],
    rank: "2°"
  },
  {
    id: "14",
    title: "Messa in sicurezza e regimazione acque strade comunali",
    description: "Intervento sulle infrastrutture stradali comunali per la gestione delle acque e la messa in sicurezza dei tratti critici.",
    image: "/media/portfolio/p14.webp",
    location: "Comune di San Salvatore Telesino (BN), Italia",
    category: "Infrastrutture",
    client: "Comune di San Salvatore Telesino (BN)",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "",
    images: ["/media/portfolio/p14.webp", "/media/portfolio/p14_v.webp"]
  },
  {
    id: "15",
    title: "Nuovo asilo nido in via Statonia",
    description: "Costruzione di un nuovo edificio pubblico adibito ad uso asilo nido. Progetto di migliorie tecniche per la qualità e la sicurezza degli spazi educativi.",
    image: "/media/portfolio/p15.webp",
    location: "Comune di Grosseto (GR), Italia",
    category: "Edilizia Scolastica",
    client: "Comune di Grosseto",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "",
    images: ["/media/portfolio/p15.webp", "/media/portfolio/p15_1.webp", "/media/portfolio/p15_v.webp"],
    rank: "1°"
  },
  {
    id: "16",
    title: "Liceo Scientifico “Checchia Rispoli” – Demolizione e ricostruzione",
    description: "Ristrutturazione edilizia per la demolizione e ricostruzione dell’istituto scolastico. Focus sulla modernità funzionale e sulla sicurezza sismica.",
    image: "/media/portfolio/p16.webp",
    location: "Comune di San Severo (FG)",
    category: "Edilizia Scolastica",
    client: "Provincia di Foggia",
    amount: "-",
    services: "Progetto migliorie tecniche",
    credits: "Progetto esecutivo: arch. Giovanni d'Orsi",
    images: ["/media/portfolio/p16.webp", "/media/portfolio/p16_v.webp"]
  }
];

async function uploadImage(imagePath) {
  const filePath = path.join(process.cwd(), 'public', imagePath);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File non trovato: ${filePath}`);
    return null;
  }
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath));
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.error(`❌ Errore caricamento immagine ${imagePath}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log('🚀 Inizio migrazione...');
  for (const p of projects) {
    console.log(`\n📦 Elaborazione: ${p.title}`);
    
    try {
      // 1. Carica immagine principale
      const mainImage = await uploadImage(p.image);
      
      // 2. Carica galleria
      const gallery = [];
      if (p.images) {
        for (const img of p.images) {
          const uploaded = await uploadImage(img);
          if (uploaded) gallery.push(uploaded);
        }
      }

      // 3. Crea documento su Sanity
      const doc = {
        _type: 'project',
        id: p.id,
        title: p.title,
        slug: { _type: 'slug', current: p.title.toLowerCase().replace(/\s+/g, '-').slice(0, 96) },
        description: p.description,
        location: p.location,
        category: p.category,
        client: p.client,
        amount: p.amount,
        services: p.services,
        credits: p.credits,
        rank: p.rank,
        mainImage,
        images: gallery,
      };

      await client.create(doc);
      console.log(`✅ Successo: ${p.title}`);
    } catch (err) {
      console.error(`❌ Errore critico per ${p.title}:`, err.message);
    }
  }
  console.log('\n✨ Migrazione completata!');
}

migrate();
