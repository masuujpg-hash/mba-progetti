import os
import shutil
import json
from PIL import Image

base_dir = r"C:\Users\Andrea Masucci\Desktop\mba studio\sito nuovo\Nuova cartella"
web_dir = os.path.join(base_dir, "PORTFOLIO_RILIEVI_WEB")

pages_dir = os.path.join(web_dir, "pagine_pdf")
extracted_dir = os.path.join(web_dir, "immagini_estratte")
org_dir = os.path.join(web_dir, "progetti_organizzati")

os.makedirs(org_dir, exist_ok=True)

categories = {
    "01_laser_scanner_bim": [
        "pag_03_img_01.jpeg", "pag_03_img_02.jpeg", "pag_10_img_01.jpeg",
        "pag_14_img_01.jpeg", "pag_17_img_01.jpeg", "pag_17_img_02.jpeg", "pag_17_img_06.jpeg"
    ],
    "02_aerofotogrammetria_drone": [
        "pag_02_img_01.jpeg", "pag_07_img_01.jpeg", "pag_07_img_02.jpeg",
        "pag_11_img_01.jpeg", "pag_11_img_02.jpeg", "pag_20_img_01.jpeg"
    ],
    "03_degrado_strutturale_hbim": [
        "pag_18_img_01.jpeg", "pag_18_img_02.jpeg", "pag_18_img_03.jpeg",
        "pag_22_img_01.jpeg", "pag_25_img_01.jpeg"
    ],
    "04_ispezioni_coperture_impianti": [
        "pag_34_img_01.jpeg", "pag_34_img_02.jpeg", "pag_34_img_03.jpeg", "pag_34_img_04.jpeg"
    ]
}

for cat, img_list in categories.items():
    cat_path = os.path.join(org_dir, cat)
    os.makedirs(cat_path, exist_ok=True)
    for img_name in img_list:
        src = os.path.join(extracted_dir, img_name)
        if os.path.exists(src):
            dst = os.path.join(cat_path, img_name)
            shutil.copy2(src, dst)

print("Organized category images copied.")

# Write PORTFOLIO_RILIEVI.md
md_content = """# MBA STUDIO - PORTFOLIO RILIEVI, AEROFOTOGRAMMETRIA E BIM

> **Impresa Specializzata in Cartografia, Aerofotogrammetria, Rilievi Laser Scanner 3D e Modellazione BIM / HBIM.**

---

## 📐 PANORAMA SERVIZI E COMPETENZE TECNICHE

MBA Studio offre soluzioni all'avanguardia per l'acquisizione metrica del territorio, il rilievo di fabbricati esistenti e complessi storici, e il passaggio digitale verso l'ambiente BIM.

### 🛠️ Elenco Attività Specialistiche
- **Rilievi Laser Scanner 3D**: Scansioni ad alta definizione con restituzione di nuvole di punti geo-riferite e sezioni grezze.
- **Aerofotogrammetria con Drone (UAV)**: Rilievi aerei di precisione per superfici estese, fabbricati, tetti e aree inaccessibili.
- **Modellazione BIM e HBIM**: Conversione da nuvola di punti a modello parametrico 3D (Autodesk Revit, ReCap Pro, TruSlicer) per edilizia moderna e beni culturali.
- **Rilievi Topografici e GPS**: Rilievi di precisione, tracciamenti di cantiere, reti topografiche, operazioni catastali e calcolo volumi (sterro/riporto).
- **Analisi del Degrado e Rilievi Strutturali**: Mappatura quadro fessurativo, lesioni, degrado cromatico, macchie e presenza di vegetazione su prospetti ed edifici storici.
- **Ispezioni Coperture ed Impianti Fotovoltaici**: Verifiche visive e termografiche con drone per rilievo danni, infiltrazioni e verifica pannelli solari.
- **Fotografia Immersiva e Gigapixel**: Tour virtuali 360°, panoramiche ad alta risoluzione e fotografia 3D per architettura e restauro.
- **Ortofoto Digitali e Cartografia**: Restituzione di ortofotomappe ad altissima risoluzione georeferenziate.

---

## 🏛️ CATEGORIE DI INTERVENTO ED ESEMPI PRATICI

### 1. Rilievi Laser Scanner 3D & Modellazione BIM / HBIM
- **Scansione Pareti in X-LAM e Strutture in Legno Lamellare**: Verifiche dimensionali e di piombo in fase di montaggio di pareti in legno X-LAM.
- **Complessi Monumentali e Palazzi Storici**: Acquisizione di milioni di punti 3D con scanner terrestri e droni integrati per la ricostruzione completa del bene storico.
- **Modellazione Parametrica Adattiva**: Creazione di famiglie e modelli parametrici per elementi complessi come volte a crociera, pilastri di porticati e modanature storiche in ambiente BIM (Autodesk Revit).

### 2. Aerofotogrammetria con Drone & Rilievi Topografici GPS
- **Georeferenziazione e GCP (Ground Control Points)**: Posizionamento di target di terra misurati con antenna GPS GNSS per garantire accuratezza centimetrica delle ortofoto e dei modelli 3D.
- **Modelli Digitali del Terreno (DTM/DEM)**: Elaborazione di quote di livello, profili longitudinali, sezioni trasversali e piattaforme software GIS (es. Cesium ION).

### 3. Analisi del Degrado Prospettico e Quadro Fessurativo
- **Mappatura Tecnica dei Vizi e Ammaloramenti**:
  - `Fes`: Fratturazione o fessurazione
  - `Mac`: Macchia / umidità
  - `Man`: Mancanza di materiale / distacco
  - `Veg`: Presenza di vegetazione infestante
  - `AC`: Alterazione cromatica
- Restituzione vettoriale sovrapposta all'ortofoto del prospetto per la redazione di computi metrici estimativi e piani di restauro.

### 4. Ispezioni Coperture e Strutture Inaccessibili
- Ispezione speditiva e dettagliata di tetti, manti di copertura in tegole/coppi, linee di colmo, gronde e pannelli fotovoltaici mediante droni ad alta risoluzione, evitando i rischi del lavoro in quota.

---

## 📊 PARAMETRI DI ACCURATEZZA E METRICHE DI QUALITÀ

I processi di registrazione delle scansioni e allineamento nuvole di punti rispettano i più severi standard di tolleranza metrica:

| Parametro | Valore di Riscontro | Stato / Validazione |
| :--- | :---: | :---: |
| **Errore di Gruppo** | `0.008 m` (8 mm) | ✅ Conforme |
| **Cloud-to-Cloud Alignment** | `0.008 m` (8 mm) | ✅ Conforme |
| **Sovrapposizione (Overlap)** | `56 %` | ✅ Conforme |
| **Robustezza Allineamento** | `80 %` | ✅ Conforme |

---

## 🖼️ GALLERIA FOTOGRAFICA DEL PORTFOLIO

Le immagini delle tavole di portfolio e degli elaborati sono disponibili nella cartella `pagine_pdf/` e `immagini_estratte/`.

### Selezione Tavole di Sintesi
- `pagine_pdf/pagina_01.png` - Copertina Portfolio Rilievi Laser Scanner e Drone
- `pagine_pdf/pagina_02.png` - Rilievo con Drone Fabbricato in Legno Lamellare
- `pagine_pdf/pagina_03.png` - Scansione Laser Scanner Pareti in X-LAM
- `pagine_pdf/pagina_07.png` - Rilievo Topografico GPS e Punti di Controllo Terreno
- `pagine_pdf/pagina_10.png` - Nuvola di Punti 3D Edificio Storico
- `pagine_pdf/pagina_14.png` - Piante, Sezioni e Prospetti CAD da Nuvola di Punti
- `pagine_pdf/pagina_17.png` - Modellazione Parametrica BIM (Volte e Porticati)
- `pagine_pdf/pagina_18.png` - Mappatura del Degrado Prospettico (Fessurazioni/Vegetazione)
- `pagine_pdf/pagina_22.png` - Grafici Stato di Fatto e Parametri di Allineamento Scansioni
- `pagine_pdf/pagina_25.png` - Rilievo fotografico in cantiere e ispezioni con Drone
- `pagine_pdf/pagina_35.png` - Elenco Servizi e Scheda Sintetica Attività

---

### 📞 CONTATTI E INFORMAZIONI
**MBA Studio** - *Arch. Mario Biondi*  
Progettazione, Rilievi e Gare d'Appalto OEPV
"""

md_path = os.path.join(web_dir, "PORTFOLIO_RILIEVI.md")
with open(md_path, "w", encoding="utf-8") as f:
    f.write(md_content)

print(f"Written PORTFOLIO_RILIEVI.md to {md_path}")

# Write JSON metadata
meta_data = {
    "title": "MBA Studio - Portfolio Rilievi, Aerofotogrammetria e BIM",
    "author": "Arch. Mario Biondi",
    "pages_count": 35,
    "extracted_images_count": 83,
    "services": [
        "Cartografia e Aerofotogrammetria",
        "Rilievi Laser Scanner 3D",
        "Aerofotogrammetria con Drone (UAV)",
        "Rilievi Topografici, GPS, Tracciamenti e Calcolo Volumi",
        "Banche Dati Metriche, Scansioni 3D e Sezioni Georiferite",
        "Rilievi Strutturali, Mappatura Degrado e Fessurazioni",
        "Panoramiche Immersive, Tour Virtuali e Gigapixel",
        "Ortofoto Digitali ad Alta Risoluzione",
        "Rilievi Danni su Coperture e Impianti Fotovoltaici",
        "Rilievi con Drone in Aree Inaccessibili"
    ],
    "quality_metrics": {
        "group_error": "0.008 m",
        "cloud_to_cloud_error": "0.008 m",
        "overlap_percentage": "56%",
        "robustness": "80%"
    },
    "paths": {
        "markdown": "PORTFOLIO_RILIEVI.md",
        "pdf_pages": "pagine_pdf/",
        "extracted_images": "immagini_estratte/",
        "organized_projects": "progetti_organizzati/",
        "ocr_json": "ocr_rilievi.json"
    }
}

json_meta_path = os.path.join(web_dir, "metadata_rilievi.json")
with open(json_meta_path, "w", encoding="utf-8") as f:
    json.dump(meta_data, f, ensure_ascii=False, indent=2)

print(f"Written metadata_rilievi.json to {json_meta_path}")

# Also copy PORTFOLIO_RILIEVI.md to workspace folder
ws_md_path = r"f:\IPIEMME SITO NUOVO\markdown psdf\PORTFOLIO_RILIEVI.md"
shutil.copy2(md_path, ws_md_path)
print(f"Copied PORTFOLIO_RILIEVI.md to workspace {ws_md_path}")
