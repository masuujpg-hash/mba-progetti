# Specifiche tipografiche, sito MBA Progetti

Documento di riferimento dei font, delle dimensioni, delle interlinee, delle spaziature fra lettere e delle spaziature di paragrafo e sezione, desunto dal codice dell'impaginazione attuale.

I valori indicati sono quelli **effettivamente applicati** a valle della cascata CSS. Il file sorgente contiene due blocchi `<style>`: il secondo (variante cromatico-tipografica attuale) riscrive parte del primo. Dove le due regole confliggono, qui è riportato il valore che prevale (si veda la nota conclusiva).

---

## 1. Famiglia tipografica

| Proprietà | Valore |
|---|---|
| Famiglia primaria | `Outfit` (Google Fonts) |
| Fallback | `system-ui, sans-serif` |
| Pesi caricati | 300, 400, 500, 600, 700 |
| Resa | `-webkit-font-smoothing: antialiased` |
| Numeri (statistiche, importi) | `font-variant-numeric: tabular-nums` (cifre a larghezza fissa) |

L'intero sito, titoli e corpo del testo, adotta un'unica famiglia (Outfit). La differenziazione gerarchica è affidata a peso, dimensione, maiuscolo e spaziatura, non al contrasto fra due caratteri diversi.

## 2. Colori del testo (token)

| Token | Valore | Uso |
|---|---|---|
| `--ink` | `#1b2a4a` | Testo primario, titoli, numeri |
| `--txt` | `#3d4a66` | Corpo del testo, paragrafi |
| `--mute` | `#7b869d` | Occhielli, etichette, didascalie |
| `--acc` | `#F5C400` | Accenti (oro), tag di sezione, esiti "vinta" |
| `--line` | `#dfe3ea` | Filetti e bordi |
| `--bg` | `#ffffff` | Sfondo |

Nel footer a fondo scuro (`.black`, sfondo `--ink`) il testo passa a `rgba(255,255,255,.82)`, le etichette a `rgba(255,255,255,.55)`.

---

## 3. Gerarchia dei titoli

| Elemento | Dimensione (font-size) | Peso | Interlinea | Spaziatura lettere | Maiuscolo |
|---|---|---|---|---|---|
| **Titolo hero** (`.herotxt h1`) | `clamp(32px, 4.3vw, 58px)` | 700 | 1,2 | 0,045em | sì |
| **Titolo di sezione** (`h2`) | `clamp(24px, 2.6vw, 32px)` | 700 | 1,12 | 0,05em | sì |
| **Titolo pagina interna** (`.inner h1`) | `clamp(34px, 4.5vw, 60px)` | 500 | 1,05 | −0,03em | sì |
| **Titolo blocco servizi/valore** (`.three b`, `.cards b`, `.svc b`) | `17px` | 600 | — | 0,06em | sì |
| **Titolo portfolio carosello** (`.track a b`) | `18px` | 500 | 1,35 | — | no |
| **Titolo card grande** (`.car b`) | `20px` | 500 | 1,3 | — | no |
| **Titolo news** (`.news b`) | `18px` | 500 | 1,35 | — | no |
| **Sigla MBA footer** (`.mba`) | `24px` | 600 | 1 | −0,02em | no |
| **Claim footer "start"** (`.start`) | `clamp(30px, 3vw, 40px)` | 600 | 1,08 | −0,02em | sì |
| **Riga "cantiere" footer** (`.cant`) | `26px` | 500 | 1,15 | 0,06em | sì + maiuscoletto |

La notazione `clamp(min, fluido, max)` definisce una dimensione che scala con la larghezza dello schermo (termine centrale in `vw`) restando entro il minimo e il massimo indicati.

## 4. Corpo del testo e paragrafi

| Elemento | Dimensione | Peso | Interlinea | Spaziatura lettere | Colore | Larghezza max |
|---|---|---|---|---|---|---|
| **Corpo standard** (`.body`) | `16px` | 400 | 1,7 | normale | `--txt` | `62ch` |
| **Sottotitolo hero** (`.herotxt p`) | `16px` | 400 | 1,65 | normale | bianco 86% | `672px` |
| **Testo footer** (`.fcol`) | `14px` | 400 (link 500) | 1,65 | normale | `--txt` | — |
| **Contatti footer** (`.contact`) | `14px` | 400 | 1,7 | normale | `--txt` | — |
| **Riga portfolio tabella** (`.row .ttl`) | `16px` | 500 | 1,4 | normale | `--ink` | — |

La larghezza massima del corpo testo è espressa in `ch` (larghezza del carattere "0"): `62ch` corrisponde a circa 62 caratteri per riga, misura di leggibilità ottimale.

Margini verticali dei paragrafi:

| Elemento | Margine |
|---|---|
| `.body` | `0` (la spaziatura è gestita dal `gap` del contenitore) |
| `.herotxt p` | `0 0 34px` (solo margine inferiore) |
| `.herotxt h1` | `0 0 24px` |

## 5. Etichette, occhielli, pulsanti e micro-testi

| Elemento | Dimensione | Peso | Spaziatura lettere | Maiuscolo | Colore |
|---|---|---|---|---|---|
| **Occhiello/etichetta** (`.lab`) | `11px` | 500 | 0,2em | sì | `--mute` |
| **Tag di sezione colorato** (`.sec .t`) | `13px` | 500 | 0,2em | sì | bianco su `--acc` |
| **Pulsante** (`.btn`) | `11px` | 500 | 0,2em | sì | `--ink` |
| **Voci di menu** (`.menu`) | `14px` | 500 | normale | no | `--ink` |
| **Sigla brand nav** (`.brand b`) | `22px` | 600 | −0,02em | no | `--ink` |
| **Mono/didascalia** (`.mono`) | `13px` | 400 | 0,01em | no | `--mute` |
| **Meta portfolio** (`.track a .meta`) | `12px` | 500 | 0,06em | sì | `--ink` |
| **Nota** (`.note`) | `12px` | 400 | normale | no | `--acc` |
| **Importi/esiti tabella** (`.row .imp`, `.row .out`) | `12px` | 400 (esito "vinta" 500) | normale | no | `--ink` / `--acc` |
| **Etichetta form** (`label`) | `13px` | 500 | normale | no | `--ink` |

## 6. Numeri e dati

| Elemento | Dimensione | Peso | Interlinea | Spaziatura lettere |
|---|---|---|---|---|
| **Statistica grande** (`.stat .v`) | `clamp(32px, 3.4vw, 48px)` | 600 | 1 | −0,03em |
| **Valore risultato** (`.res .v`) | `44px` | 500 | — | normale |
| **Valore cella** (`.cell .v`) | `22px` | 500 | — | normale |

Tutti i valori numerici usano cifre a larghezza fissa (`tabular-nums`) per l'allineamento in colonna.

---

## 7. Spaziature di paragrafo e di sezione

L'impaginazione non affida la spaziatura ai margini dei singoli paragrafi ma al `gap` dei contenitori flessibili e ai `padding` verticali delle sezioni. La scala di spaziatura ricorrente è, in pixel: 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 48, 64, 88.

### 7.1 Margini laterali e sezioni

| Contenitore | Spaziatura |
|---|---|
| Margine laterale pagina (`.wrap`) | `clamp(16px, 5vw, 80px)` |
| Sezione standard (`.sec`), spazio interno verticale | `padding-block: 48px 88px` (sopra 48, sotto 88) |
| Sezione standard (`.sec`), spazio fra blocchi | `gap: 32px` |
| Fascia statistiche (`.stats`) | `padding-block: 56px 40px`, `gap: 24px` |
| Barra di navigazione (`.nav`) | `padding-block: 22px` |
| Testo hero (`.herotxt`) | `padding: clamp(40px,5vh,64px) 24px clamp(110px,16vh,170px)` |
| Footer scuro (`.blackin`) | `padding: clamp(48px,6vw,80px) clamp(16px,5vw,80px)` |
| Barra inferiore footer (`footer`) | `padding-block: 24px 40px` |
| Pagina interna (`.inner`) | `padding-block: 64px`, `gap: 32px` |

### 7.2 Spaziature interne ai blocchi (gap)

| Blocco | Gap |
|---|---|
| Blocco servizi/valore (`.three`) | `36px` fra colonne, `14px` interno; padding card `34px 30px 36px` |
| Card (`.cards`) | `32px 24px` (righe/colonne), `14px` interno |
| News (`.news`) | `32px 24px`, `10px` interno |
| Due colonne (`.two`) | `48px` |
| Feature (`.feat`) | `32px` |
| Portfolio carosello (`.track`, `.car`) | `24px` fra elementi |
| Colonne footer (`.foot`) | `clamp(32px, 4vw, 64px)` |
| Social footer (`.socials`) | `20px`, con `padding-top: 20px` |

### 7.3 Pulsanti

| Proprietà | Valore |
|---|---|
| Padding interno (`.btn`) | `15px 26px` |
| Larghezza minima | `240px` (ridotta a `0` per pulsanti di navigazione e menu) |
| Raggio bordo | `2px` |
| Distanza testo/freccia | `gap: 14px` |

---

## 8. Comportamento responsivo

Il punto di rottura principale è a **820px** di larghezza (tablet/mobile). Oltre questa soglia:

| Elemento | Variazione sotto 820px |
|---|---|
| Sezioni (`.sec`) | `gap: 20px`, `padding-block: 24px 56px` (compressione verticale) |
| Griglie a 3 colonne (`.three`, `.cards`, `.news`) | passano a 1 colonna |
| Statistiche (`.stats`) | da 6 a 2 colonne, `gap: 28px 16px` |
| Menu (`.menu`) | collassa in menu a tendina (burger) |

Le dimensioni tipografiche espresse in `clamp()` scalano con continuità e non necessitano di regole dedicate al breakpoint.

---

## Nota tecnica sulla struttura del CSS

Il foglio di stile è articolato in due blocchi `<style>` consecutivi. Il secondo, etichettato come variante cromatico-tipografica attuale, sovrascrive per cascata numerose proprietà del primo (fra le altre: peso e spaziatura dei titoli, maiuscolo diffuso, dimensione e padding dei pulsanti, dimensione dei titoli di blocco, colore del footer). Di conseguenza molti valori dichiarati nel primo blocco risultano inattivi.

Ai fini della manutenzione, i valori di questo documento sono già quelli risultanti dalla cascata. Se si intende intervenire sul codice, è opportuno consolidare i due blocchi in un unico foglio con i soli valori effettivi, per evitare che modifiche apportate al primo blocco restino senza effetto perché silenziosamente riscritte dal secondo.
