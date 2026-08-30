export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  category: string;
  client: string;
  amount: string;
  services: string;
  credits: string;
  images: string[];
  rank?: string;
}

export const projects: Project[] = [
  {
    "id": "p01-realizzazione-nuovo-edificio-segreterie",
    "title": "Realizzazione nuovo edificio Segreterie Studenti e bar/punto ristoro – Campus Chieti",
    "description": "MBA PROGETTI ha supportato l’impresa nella redazione dell’offerta migliorativa per il nuovo edificio delle Segreterie Studenti e del bar/punto ristoro del Campus di Chieti. L’intervento ha richiesto un’integrazione attenta tra architettura, impianti e organizzazione del cantiere, con l’obiettivo di elevare la qualità complessiva dell’opera e rispondere alle esigenze dell’Ateneo. La proposta ha perfezionato le soluzioni architettoniche, migliorato il comfort interno e le prestazioni impiantistiche, e riorganizzato le fasi esecutive per ridurre interferenze e tempi di lavorazione.",
    "image": "/media/portfolio/p01.webp",
    "location": "Chieti, Italia",
    "category": "Edilizia Scolastica",
    "client": "Università degli Studi “G. d’Annunzio” – Chieti Pescara",
    "amount": "7 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: RTP Peia Associati (Capogruppo), VE.MA. Progetti srls, Tekser srl, Ing. V. Aceto",
    "images": [
      "/media/portfolio/p01.webp",
      "/media/portfolio/p01_1.webp",
      "/media/portfolio/p01_2.webp"
    ]
  },
  {
    "id": "p02-realizzazione-impianti-fotovoltaici-pozzilli",
    "title": "Realizzazione impianti fotovoltaici – Pozzilli (IS)",
    "description": "Per l’intervento di realizzazione dei nuovi impianti fotovoltaici nel comune di Pozzilli, MBA PROGETTI ha sviluppato un’offerta tecnica focalizzata sull’affidabilità operativa dell’ATI e sulla qualità delle soluzioni impiantistiche proposte. Il lavoro ha messo in evidenza un’organizzazione di cantiere solida, sistemi di controllo coerenti con le normative di sicurezza e ambiente e procedure gestionali in linea con gli standard ISO.",
    "image": "/media/portfolio/18_impianti_fotovoltaici_pozzilli.jpg",
    "location": "Pozzilli (IS), Italia",
    "category": "Infrastrutture",
    "client": "Consorzio per lo Sviluppo Industriale Isernia–Venafro",
    "amount": "1.0 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/18_impianti_fotovoltaici_pozzilli.jpg",
      "/media/portfolio/p02.webp",
      "/media/portfolio/p02_1.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p03-realizzazione-della-piscina-comunale",
    "title": "Realizzazione della Piscina Comunale – Centro Sportivo Varazi, Monteverde",
    "description": "La proposta ha riguardato il miglioramento complessivo della nuova piscina comunale a Bojano, lavorando sia sugli ambienti interni sia sulle aree esterne. L’obiettivo era rendere la struttura più funzionale, durevole e fruibile, con particolare attenzione agli aspetti tipici degli impianti natatori: umidità, cloro, sicurezza e manutenzione.",
    "image": "/media/portfolio/09_piscina_comunale_bojano.jpg",
    "location": "Bojano (CB), Italia",
    "category": "Sport",
    "client": "Comune di Bojano (CB)",
    "amount": "1.5 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/09_piscina_comunale_bojano.jpg",
      "/media/portfolio/p03.webp",
      "/media/portfolio/p03_1.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p04-riqualificazione-ex-complesso-ospedaliero",
    "title": "Riqualificazione Ex Complesso Ospedaliero di Sarteano – I e II lotto",
    "description": "MBA PROGETTI ha sviluppato l’offerta migliorativa per la riqualificazione dell’ex complesso ospedaliero di Sarteano, intervenendo sugli aspetti architettonici, impiantistici ed energetici. La proposta ha introdotto soluzioni capaci di aumentare efficienza energetica, comfort interno e qualità costruttiva, migliorando l’involucro edilizio e la gestione tecnologica.",
    "image": "/media/portfolio/15_ospedale_sarteano.jpg",
    "location": "Sarteano (SI), Italia",
    "category": "Sanità",
    "client": "Unione dei Comuni Valdichiana Senese – Area Tecnica",
    "amount": "2.2 MLN",
    "services": "Progetto migliorie tecniche, Redazione giustificativi",
    "credits": "",
    "images": [
      "/media/portfolio/15_ospedale_sarteano.jpg",
      "/media/portfolio/p04.webp",
      "/media/portfolio/p04_1.webp",
      "/media/portfolio/p04_2.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p05-risanamento-conservativo-ex-ples",
    "title": "Risanamento conservativo ex Ples – Collegio del Mondo Unito",
    "description": "MBA PROGETTI ha curato le migliorie tecniche per il risanamento dell’immobile “ex Ples” in Via Firenze, destinato a residenza per studenti del Collegio del Mondo Unito. L’intervento ha riguardato l'adeguamento sismico, l'efficientamento energetico e la tutela dei vincoli storico-architettonici.",
    "image": "/media/portfolio/07_via_firenze_collegio_mondo_unito_duino.jpg",
    "location": "Duino Aurisina (TS), Italia",
    "category": "Restauro",
    "client": "Regione Autonoma Friuli Venezia Giulia",
    "amount": "0.70 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: RTP Studio Associato Arch. B. Pessina - Ing. M. Lanza (Capogruppo), Studio Tecnico ASS. TEA, P.I. Gimmi Bodigoi, Geol. Andrea Mocchlutti",
    "images": [
      "/media/portfolio/07_via_firenze_collegio_mondo_unito_duino.jpg",
      "/media/portfolio/p05.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p06-interventi-per-la-realizzazione",
    "title": "Interventi per la realizzazione della Biblioteca di via della Lega Lombarda presso l’ex deposito ATAC",
    "description": "Per l’intervento di trasformazione dell’ex deposito ATAC in una nuova biblioteca di quartiere, MBA PROGETTI ha sviluppato la proposta migliorativa concentrandosi su funzionamento degli spazi, qualità ambientale e gestione del cantiere urbano.",
    "image": "/media/portfolio/p06.webp",
    "location": "Roma – Municipio II, Italia",
    "category": "Cultura",
    "client": "Roma Capitale – Municipio Roma II, Direzione Tecnica",
    "amount": "4.04 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: RTP Labics S.r.l. - Arch. Maria Claudia Clemente, Arch. Francesco Isidori, Arch. Maria Iva Sacchetti, con Arch. Giovanni Fabbri, Ing. Michele Amerio, Ing. Luca Felicietti, Arch. Paola Vacchiano.",
    "images": [
      "/media/portfolio/p06.webp"
    ]
  },
  {
    "id": "p07-costruzione-di-un-teatro",
    "title": "Costruzione di un Teatro di posa e relativi camerini e attrezzerie – Cinecittà",
    "description": "Per la realizzazione del nuovo Teatro di Posa di Cinecittà, MBA PROGETTI ha sviluppato una proposta migliorativa orientata a rafforzare le prestazioni strutturali, ottimizzare i consumi energetici e ridurre gli impatti di cantiere.",
    "image": "/media/portfolio/p07.webp",
    "location": "Roma - Cinecittà, Italia",
    "category": "Cultura",
    "client": "Cinecittà S.p.A. – Direzione Acquisti e Gare",
    "amount": "28.82 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: Dott. Domenico Pinuccio D'Arino, Arch. Dino D'Antimi, Arch. Francesco Karrer, Arch. Bruno Moauro, Prof. Ing. Francesco Sylos Labini, Ing. Carmine Sommella, Ing. Joseph De Santis, Ing. Alfredo Innocenti, Ing. Anna Tarsitano, Arch. Massimiliano Moauro",
    "images": [
      "/media/portfolio/p07.webp"
    ]
  },
  {
    "id": "p08-messa-in-sicurezza-del",
    "title": "Messa in sicurezza del territorio comunale a ridosso del centro abitato – Zona 3",
    "description": "Intervento di consolidamento e riduzione del rischio idrogeologico a tutela del centro abitato di Bellegra. La proposta tecnica ha sviluppato soluzioni di ingegneria naturalistica per la stabilizzazione dei versanti e il corretto drenaggio delle acque meteoriche.",
    "image": "/media/portfolio/p08.webp",
    "location": "Comune di Bellegra (RM), Italia",
    "category": "Dissesto Idrogeologico",
    "client": "Comune di Bellegra – Città Metropolitana di Roma Capitale",
    "amount": "0.60 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: Ingegneria Naturale srl",
    "images": [
      "/media/portfolio/p08.webp"
    ]
  },
  {
    "id": "p09-realizzazione-del-palazzo-della",
    "title": "Realizzazione del Palazzo della Salute della Valpolcevera",
    "description": "L’intervento prevede la costruzione del nuovo Palazzo della Salute della Valpolcevera. MBA PROGETTI ha sviluppato le proposte migliorative intervenendo sugli aspetti funzionali, sull’organizzazione del cantiere e sull’integrazione impiantistica via BIM.",
    "image": "/media/portfolio/p09.webp",
    "location": "Genova – Bolzaneto, Italia",
    "category": "Sanità",
    "client": "Azienda Sociosanitaria Ligure n. 3 – ASL3 Genova",
    "amount": "8.32 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: TECNICAER ENGINEERING srl, DODI MOSS srl",
    "images": [
      "/media/portfolio/p09.webp"
    ]
  },
  {
    "id": "p10-lavori-integrativi-di-completamento",
    "title": "Completamento aree esterne e viabilità nuova sede universitaria",
    "description": "MBA PROGETTI ha sviluppato le migliorie per il completamento delle aree esterne e della viabilità della nuova sede universitaria a Bergamo, concentrandosi sulla riduzione delle emissioni acustiche e polveri, fruibilità degli spazi ed ergonomia dei percorsi.",
    "image": "/media/portfolio/08_viabilita_universita_bergamo.jpg",
    "location": "Bergamo (BG), Italia",
    "category": "Infrastrutture",
    "client": "ASST Papa Giovanni XXIII – Direzione Tecnico e Patrimoniale",
    "amount": "0.85 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: Mythos Consorzio Stabile S.c.ar.l. (Capogruppo), Dott. Agronomo LUIGI BOVISIO",
    "images": [
      "/media/portfolio/08_viabilita_universita_bergamo.jpg",
      "/media/portfolio/p10.webp",
      "/media/portfolio/p10_1.webp"
    ],
    "rank": "2° Classificato"
  },
  {
    "id": "p11-demolizione-e-ricostruzione-edifici",
    "title": "Demolizione e ricostruzione edifici ERP in località Cardito",
    "description": "Per l’intervento di demolizione e ricostruzione degli edifici ERP in località Cardito a Vallerotonda, lo studio ha sviluppato una proposta migliorativa orientata a garantire completezza esecutiva, prestazioni superiori e piena conformità ai CAM.",
    "image": "/media/portfolio/16_edifici_erp_vallerotonda.jpg",
    "location": "Vallerotonda (FR), Italia",
    "category": "Residenziale",
    "client": "Comune di Vallerotonda (FR) – XIV Comunità Montana",
    "amount": "0.9 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: Arch. Vitaliano Magro",
    "images": [
      "/media/portfolio/16_edifici_erp_vallerotonda.jpg",
      "/media/portfolio/p11.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p12-adeguamento-sismico-ed-efficientamento",
    "title": "Adeguamento sismico ed efficientamento energetico dell’Istituto Comprensivo “San Giovanni Bosco”",
    "description": "Intervento di adeguamento sismico ed efficientamento energetico dell'Istituto Comprensivo 'San Giovanni Bosco'. La proposta ha definito miglioramenti per la sicurezza strutturale, l'isolamento termico dell'involucro e l'efficientamento degli impianti di illuminazione e climatizzazione.",
    "image": "/media/portfolio/p12.webp",
    "location": "San Salvatore Telesino (BN), Italia",
    "category": "Edilizia Scolastica",
    "client": "Comune di San Salvatore Telesino (BN)",
    "amount": "0.71 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: Ing. Maturo Rosario",
    "images": [
      "/media/portfolio/p12.webp",
      "/media/portfolio/p12_1.webp"
    ]
  },
  {
    "id": "p13-ristrutturazione-edilizia-dell-ex",
    "title": "Ristrutturazione edilizia dell’ex Caserma Palmanova per didattica e ricerca",
    "description": "La proposta migliorativa ha lavorato sulla riqualificazione architettonica e funzionale dell’ex Caserma Palmanova a Viterbo, intervenendo su involucro, spazi interni e dotazioni tecniche per le nuove attività didattiche e universitarie dell'Ateneo della Tuscia.",
    "image": "/media/portfolio/06_caserma_palmanova_viterbo.jpg",
    "location": "Viterbo (VT), Italia",
    "category": "Restauro",
    "client": "Università degli Studi della Tuscia",
    "amount": "3.1 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: Arch. Marina Fracasso, Arch. Stefania Ragonesi, Ing. Fabrizio Purchiaroni, Ing. Marco Renzelli, Ing. Marco Dari",
    "images": [
      "/media/portfolio/06_caserma_palmanova_viterbo.jpg",
      "/media/portfolio/p13.webp"
    ],
    "rank": "2° Classificato"
  },
  {
    "id": "p14-messa-in-sicurezza-e",
    "title": "Messa in sicurezza e regimazione acque strade comunali",
    "description": "Intervento di messa in sicurezza del territorio e regimazione delle acque meteoriche lungo le strade comunali di San Salvatore Telesino. La proposta migliorativa ha ottimizzato le sezioni di deflusso, la durabilità delle opere di canalizzazione e le fasi esecutive con minimizzazione dei disagi per la circolazione.",
    "image": "/media/portfolio/10_strade_comunali_san_salvatore_telesino_1.jpg",
    "location": "San Salvatore Telesino (BN), Italia",
    "category": "Infrastrutture",
    "client": "Comune di San Salvatore Telesino (BN)",
    "amount": "0.70 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/10_strade_comunali_san_salvatore_telesino_1.jpg",
      "/media/portfolio/10_strade_comunali_san_salvatore_telesino_2.jpg",
      "/media/portfolio/p14.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p15-costruzione-di-un-nuovo",
    "title": "Nuovo Asilo Nido in Via Statonia",
    "description": "Progetto per la costruzione del nuovo asilo nido in Via Statonia a Grosseto. L'offerta tecnica e progettuale ha elaborato soluzioni migliorative sia architettoniche che impiantistiche, garantendo massima sicurezza per l'infanzia, efficienza energetica NZEB e continuità didattica.",
    "image": "/media/portfolio/05_asilo_nido_statonia_grosseto.jpg",
    "location": "Grosseto (GR), Italia",
    "category": "Edilizia Scolastica",
    "client": "Comune di Grosseto (GR)",
    "amount": "1.2 MLN",
    "services": "Progetto migliorie tecniche e giustificativi, Progettazione architettonica definitiva ed esecutiva",
    "credits": "Collaboratori progettazione architettonica: Arch. Gennaro Solaro, Arch. Antonella del Basso",
    "images": [
      "/media/portfolio/05_asilo_nido_statonia_grosseto.jpg",
      "/media/portfolio/p15.webp",
      "/media/portfolio/p15_1.webp"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p16-ristrutturazione-edilizia-per-la",
    "title": "Demolizione e ricostruzione Liceo Scientifico “Checchia Rispoli”",
    "description": "Progetto di ristrutturazione edilizia per la demolizione e ricostruzione del Liceo Scientifico Checchia Rispoli a San Severo (FG). La proposta migliorativa ha ottimizzato le prestazioni sismiche, l'isolamento acustico e l'integrazione di tecnologie per il risparmio energetico.",
    "image": "/media/portfolio/p16.webp",
    "location": "San Severo (FG), Italia",
    "category": "Edilizia Scolastica",
    "client": "Provincia di Foggia",
    "amount": "5.59 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: Arch. Giovanni d'Orsi",
    "images": [
      "/media/portfolio/p16.webp"
    ]
  },
  {
    "id": "p17-scuola-marzabotto-sesto-san-giovanni",
    "title": "Scuola dell'Infanzia e Primaria “Marzabotto”",
    "description": "Intervento di demolizione e ricostruzione della Scuola Marzabotto a Sesto San Giovanni (MI). MBA PROGETTI ha sviluppato una proposta migliorativa completa con ottimizzazioni tecnologiche, materiali sostenibili CAM e redazione dei giustificativi di prezzo, garantendo la vittoria del bando di gara.",
    "image": "/media/portfolio/01_marzabotto_sesto_san_giovanni.jpg",
    "location": "Sesto San Giovanni (MI), Italia",
    "category": "Edilizia Scolastica",
    "client": "CUC Sesto San Giovanni / Buscate",
    "amount": "6.5 MLN",
    "services": "Progetto migliorie tecniche, Redazione giustificativi",
    "credits": "Progetto esecutivo: Arch. Claudia Sesso",
    "images": [
      "/media/portfolio/01_marzabotto_sesto_san_giovanni.jpg"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p18-parcheggio-stazione-tiburtina-roma",
    "title": "Parcheggio Multipiano 11 ed Opere Accessorie – Stazione Tiburtina",
    "description": "Progetto per la costruzione del parcheggio multipiano 11 presso lo snodo ferroviario di Roma Tiburtina. Le migliorie tecniche elaborate hanno affrontato la gestione della viabilità di cantiere in ambito ad alta densità urbana e l'ottimizzazione delle componenti strutturali ed impiantistiche.",
    "image": "/media/portfolio/02_parcheggio_stazione_tiburtina_roma.jpg",
    "location": "Roma (RM), Italia",
    "category": "Infrastrutture",
    "client": "Progetto Tiburtina S.r.l.",
    "amount": "12 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: RTP \"Il Nodo Stazione Tiburtina\" - Capogruppo Prof. Arch. Filippo Raimondo",
    "images": [
      "/media/portfolio/02_parcheggio_stazione_tiburtina_roma.jpg"
    ],
    "rank": "3° Classificato"
  },
  {
    "id": "p19-comando-provinciale-carabinieri-viterbo",
    "title": "Comando Provinciale dei Carabinieri di Viterbo",
    "description": "Realizzazione della nuova caserma e sede del Comando Provinciale dell'Arma dei Carabinieri a Viterbo. La proposta d'offerta ha integrato elevati standard di sicurezza passiva e attiva, efficienza energetica degli impianti tecnologici e finiture ad alta durabilità.",
    "image": "/media/portfolio/03_carabinieri_viterbo.jpg",
    "location": "Viterbo (VT), Italia",
    "category": "Amministrazioni Pubbliche",
    "client": "Ministero delle Infrastrutture e dei Trasporti",
    "amount": "2.8 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: RTP mandante ICONIA Ingegneria civile S.r.l.",
    "images": [
      "/media/portfolio/03_carabinieri_viterbo.jpg"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p20-immobile-confiscato-borgo-santa-rita",
    "title": "Immobile Confiscato alla Criminalità Organizzata – Borgo Santa Rita",
    "description": "Riqualificazione e recupero funzionale del complesso edilizio confiscato a Borgo Santa Rita, Pomezia. Il progetto di miglioria tecnica ha ridefinito la distribuzione interna, le prestazioni termiche ed acustiche dell'involucro e la sistemazione esterna a beneficio della collettività.",
    "image": "/media/portfolio/04_immobile_confiscato_pomezia_1.jpg",
    "location": "Pomezia (RM), Italia",
    "category": "Residenziale",
    "client": "Comune di Pomezia (RM)",
    "amount": "3.4 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo: Ing. Ceccarelli Simone",
    "images": [
      "/media/portfolio/04_immobile_confiscato_pomezia_1.jpg",
      "/media/portfolio/04_immobile_confiscato_pomezia_2.jpg"
    ],
    "rank": "2° Classificato"
  },
  {
    "id": "p21-stabilimento-new-las-vegas-beach-ardea",
    "title": "Stabilimento Balneare “New Las Vegas Beach”",
    "description": "Messa in sicurezza e riqualificazione dello stabilimento balneare 'New Las Vegas Beach' ad Ardea. La proposta migliorativa ha introdotto materiali eco-compatibili idonei al contesto salino, soluzioni solari termiche e una riorganizzazione funzionale delle aree accessibili.",
    "image": "/media/portfolio/11_stabilimento_las_vegas_beach_ardea.jpg",
    "location": "Ardea (RM), Italia",
    "category": "Strutture Ricettive",
    "client": "Comune di Ardea (RM)",
    "amount": "1.00 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "Progetto esecutivo e render: Ing. Emiliano Giorgi",
    "images": [
      "/media/portfolio/11_stabilimento_las_vegas_beach_ardea.jpg"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p22-demolizione-ricostruzione-scuola-primaria-argenta",
    "title": "Demolizione e Ricostruzione Scuola Primaria di Argenta",
    "description": "Progetto di demolizione e ricostruzione ex novo dell'edificio scolastico della Scuola Primaria ad Argenta (FE). La proposta si è classificata al 1° posto grazie a soluzioni d'eccellenza per la biosostenibilità, il comfort acustico nelle aule e le prestazioni energetiche NZEB.",
    "image": "/media/portfolio/12_scuola_primaria_argenta.jpg",
    "location": "Argenta (FE), Italia",
    "category": "Edilizia Scolastica",
    "client": "Unione dei Comuni Valli e Delizie",
    "amount": "4.00 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/12_scuola_primaria_argenta.jpg"
    ],
    "rank": "1° Classificato"
  },
  {
    "id": "p23-residenza-anziani-oderzo",
    "title": "Residenza per Anziani a Rao di Oderzo",
    "description": "Progetto per la nuova Residenza per Anziani nel comune di Oderzo (TV). L'offerta tecnica si è concentrata sull'adozione di standard domotici avanzati per il monitoraggio ed il comfort degli ospiti, l'efficientamento energetico e la sistemazione a verde dei percorsi senso-motori esterni.",
    "image": "/media/portfolio/13_residenza_anziani_oderzo.jpg",
    "location": "Rao di Oderzo (TV), Italia",
    "category": "Servizi Assistenziali",
    "client": "Provincia di Treviso",
    "amount": "3.70 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/13_residenza_anziani_oderzo.jpg"
    ],
    "rank": "2° Classificato"
  },
  {
    "id": "p24-residenze-studenti-sapienza-roma",
    "title": "Residenze e Servizi Studenti Universitari – Sapienza",
    "description": "Nuove residenze ed alloggi universitari per la Sapienza Università di Roma. La proposta migliorativa ha ottimizzato il comfort termo-acustico dei dormitori, l'integrazione di spazi comuni di studio e la logistica di cantiere con pianificazione dettagliata delle lavorazioni.",
    "image": "/media/portfolio/14_residenze_studenti_sapienza_roma.jpg",
    "location": "Roma (RM), Italia",
    "category": "Edilizia Scolastica",
    "client": "Università degli Studi di Roma “La Sapienza”",
    "amount": "12 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/14_residenze_studenti_sapienza_roma.jpg"
    ],
    "rank": "2° Classificato"
  },
  {
    "id": "p25-museo-emozionale-isernia",
    "title": "Museo Emozionale dalla Preistoria al Futuro",
    "description": "Realizzazione del percorso espositivo ed allestimento tecnologico per il Museo Emozionale di Isernia. La proposta tecnica ha introdotto soluzioni avanzate di illuminotecnica, scenografie multimediali e percorsi di accessibilità sensoriale per tutti i visitatori.",
    "image": "/media/portfolio/17_museo_emozionale_isernia.jpg",
    "location": "Isernia (IS), Italia",
    "category": "Cultura",
    "client": "Comune di Isernia (IS)",
    "amount": "1.4 MLN",
    "services": "Progetto migliorie tecniche",
    "credits": "",
    "images": [
      "/media/portfolio/17_museo_emozionale_isernia.jpg"
    ],
    "rank": "2° Classificato"
  }
];

