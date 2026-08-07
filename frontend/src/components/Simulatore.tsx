import { useState, useMemo } from "react";
import type { ReactNode } from "react";

const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const numIT = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0 });

const mathFont = { fontFamily: "'Times New Roman', 'STIX Two Math', Georgia, serif", fontStyle: "italic" };

function V({ base, sub }: { base: string, sub?: string }) {
  return (
    <span style={mathFont as any}>
      {base}
      {sub && <sub style={{ fontSize: "0.68em", fontStyle: "italic" }}>{sub}</sub>}
    </span>
  );
}
function Frac({ num, den }: { num: ReactNode, den: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", verticalAlign: "middle", textAlign: "center", margin: "0 3px" }}>
      <span className="border-b-[1.5px] border-navy px-[6px] leading-snug">{num}</span>
      <span className="px-[6px] leading-snug">{den}</span>
    </span>
  );
}
function Op({ children }: { children: ReactNode }) {
  return <span style={{ fontStyle: "normal", margin: "0 5px", fontFamily: "'Times New Roman', Georgia, serif" }}>{children}</span>;
}

const DETTAGLI: Record<number, any> = {
  1: {
    tag: "Proporzionale al ribasso",
    mini: <span><V base="P" sub="i" /><Op>=</Op><Frac num={<V base="R" sub="i" />} den={<V base="R" sub="max" />} /><Op>·</Op><V base="P" sub="max" /></span>,
    righe: [
      <span key="1"><V base="P" sub="i" /><Op>=</Op><Frac num={<V base="R" sub="i" />} den={<V base="R" sub="max" />} /><Op>·</Op><V base="P" sub="max" /></span>,
    ],
    legenda: [
      ["Pᵢ", "punteggio attribuito al concorrente i-esimo"],
      ["Rᵢ", "ribasso offerto dal concorrente i-esimo"],
      ["Rmax", "ribasso più elevato tra le offerte ammesse"],
      ["Pmax", "punteggio massimo dell'offerta economica"],
    ],
  },
  2: {
    tag: "Proporzionale inversa al prezzo",
    mini: <span><V base="P" sub="i" /><Op>=</Op><Frac num={<V base="P" sub="min" />} den={<V base="P" sub="o" />} /><Op>·</Op><V base="P" sub="max" /></span>,
    righe: [
      <span key="1"><V base="P" sub="i" /><Op>=</Op><Frac num={<V base="P" sub="min" />} den={<V base="P" sub="o" />} /><Op>·</Op><V base="P" sub="max" /></span>,
    ],
    legenda: [
      ["Pᵢ", "punteggio attribuito al concorrente i-esimo"],
      ["Pmin", "prezzo più basso tra le offerte ammesse"],
      ["Pₒ", "prezzo offerto dal concorrente i-esimo"],
      ["Pmax", "punteggio massimo dell'offerta economica"],
    ],
  },
  3: {
    tag: "Non lineare (esponenziale)",
    mini: (
      <span>
        <V base="P" sub="i" /><Op>=</Op>
        <span style={{ fontStyle: "normal" }}>(</span><Frac num={<V base="R" sub="i" />} den={<V base="R" sub="max" />} /><span style={{ fontStyle: "normal" }}>)</span>
        <sup style={{ ...mathFont, fontSize: "0.72em" } as any}>α</sup><Op>·</Op><V base="P" sub="max" />
      </span>
    ),
    righe: [
      <span key="1">
        <V base="P" sub="i" /><Op>=</Op>
        <span style={{ fontStyle: "normal", fontSize: "1.3em", verticalAlign: "middle" }}>(</span>
        <Frac num={<V base="R" sub="i" />} den={<V base="R" sub="max" />} />
        <span style={{ fontStyle: "normal", fontSize: "1.3em", verticalAlign: "middle" }}>)</span>
        <sup style={{ ...mathFont, fontSize: "0.72em" } as any}>α</sup>
        <Op>·</Op><V base="P" sub="max" />
      </span>,
    ],
    legenda: [
      ["Pᵢ", "punteggio attribuito al concorrente i-esimo"],
      ["Rᵢ", "ribasso offerto dal concorrente i-esimo"],
      ["Rmax", "ribasso più elevato tra le offerte ammesse"],
      ["α", "esponente fissato dal disciplinare (di norma < 1)"],
      ["Pmax", "punteggio massimo dell'offerta economica"],
    ],
  },
  4: {
    tag: "Bilineare",
    mini: <span><V base="P" sub="i" /><Op>=</Op><V base="C" sub="i" /><Op>·</Op><V base="P" sub="max" /></span>,
    righe: [
      <span key="1">
        <V base="C" sub="i" />
        <span style={{ fontStyle: "normal", margin: "0 6px" }}>(per <V base="A" sub="i" /> ≤ <V base="A" sub="soglia" />)</span>
        <Op>=</Op><V base="X" /><Op>·</Op>
        <Frac num={<V base="A" sub="i" />} den={<V base="A" sub="soglia" />} />
      </span>,
      <span key="2">
        <V base="C" sub="i" />
        <span style={{ fontStyle: "normal", margin: "0 6px" }}>(per <V base="A" sub="i" /> &gt; <V base="A" sub="soglia" />)</span>
        <Op>=</Op><V base="X" /><Op>+</Op>
        <span style={{ fontStyle: "normal" }}>(1 − <V base="X" />)</span><Op>·</Op>
        <Frac num={<span><V base="A" sub="i" /> − <V base="A" sub="soglia" /></span>} den={<span><V base="A" sub="max" /> − <V base="A" sub="soglia" /></span>} />
      </span>,
      <span key="3"><V base="P" sub="i" /><Op>=</Op><V base="C" sub="i" /><Op>·</Op><V base="P" sub="max" /></span>,
    ],
    legenda: [
      ["Cᵢ", "coefficiente attribuito al concorrente i-esimo"],
      ["Aᵢ", "ribasso offerto dal concorrente i-esimo"],
      ["Asoglia", "media aritmetica dei ribassi dei concorrenti"],
      ["Amax", "ribasso più conveniente tra le offerte"],
      ["X", "coefficiente del disciplinare: 0,80 · 0,85 · 0,90"],
      ["Pmax", "punteggio massimo dell'offerta economica"],
    ],
  },
};

/* ---------- Statistica ---------- */
function gauss() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function indiceIncentivo(formula: number, alfa: number) {
  if (formula === 1) return 1.0;
  if (formula === 2) return 0.22;
  if (formula === 3) return Math.min((1 - Math.pow(0.5, alfa)) / 0.5, 1);
  return 0.86;
}
function fattoreDispersione(formula: number) {
  return ({ 1: 0.18, 2: 0.30, 3: 0.25, 4: 0.12 } as any)[formula];
}
function mediaAttesa(formula: number, pmax: number, alfa: number) {
  const w = Math.min(Math.max(pmax, 0) / 30, 1);
  return 8 + 14 * w * indiceIncentivo(formula, alfa);
}

const PROFILI: Record<number, any> = {
  1: { agg: 0.32, pru: 0.15, dA: +1.0, sA: 0.35, sF: 0.55, dP: -1.7, sP: 0.90 },
  2: { agg: 0.15, pru: 0.30, dA: +1.3, sA: 0.60, sF: 0.95, dP: -1.2, sP: 1.00 },
  3: { agg: 0.15, pru: 0.25, dA: +1.7, sA: 0.50, sF: 0.50, dP: -1.0, sP: 0.70 },
  4: { agg: 0.12, pru: 0.15, dA: +0.8, sA: 0.30, sF: 0.32, dP: -0.9, sP: 0.45 },
};

function arrotondaRealistico(x: number) {
  const u = Math.random();
  if (u < 0.28) return Math.round(x * 2) / 2;
  if (u < 0.55) return Math.round(x * 100) / 100;
  return Math.round(x * 1000) / 1000;
}

function generaRibassi(formula: number, n: number, mu: number, sigma: number) {
  const p = PROFILI[formula];
  const out = [];
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    let r;
    if (u < p.agg || (i === 0 && n >= 4)) r = mu + p.dA * sigma + gauss() * p.sA * sigma;
    else if (u < 1 - p.pru) r = mu + gauss() * p.sF * sigma;
    else r = mu + p.dP * sigma + gauss() * p.sP * sigma;
    out.push(r);
  }
  if (n >= 8 && Math.random() < 0.3) {
    const idx = out.indexOf(Math.min(...out));
    out[idx] = mu - (2.0 + Math.random() * 1.2) * sigma;
  }
  const v = out.map((x) => arrotondaRealistico(Math.min(35, Math.max(0.5, x))));
  v.sort((a, b) => b - a);
  for (let i = 1; i < v.length; i++) if (v[i] >= v[i - 1]) v[i] = +(v[i - 1] - 0.011).toFixed(3);
  return v;
}

function DecimalInput({ value, onChange, min, max, step = 0.05 }: any) {
  const [focus, setFocus] = useState(false);
  const [testo, setTesto] = useState(String(value));
  return (
    <input
      type="number" step={step} min={min} max={max}
      value={focus ? testo : value}
      onFocus={() => { setTesto(String(value)); setFocus(true); }}
      onChange={(e) => {
        setTesto(e.target.value);
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) onChange(v);
      }}
      onBlur={() => {
        setFocus(false);
        let v = parseFloat(testo);
        if (isNaN(v)) v = min;
        v = Math.min(max, Math.max(min, v));
        onChange(v);
      }}
      className="w-full bg-transparent border-b border-navy/10 py-4 text-navy text-xl sm:text-2xl font-bold focus:outline-none focus:border-gold transition-colors font-mono"
    />
  );
}

function ImportoInput({ value, onChange }: any) {
  const [focus, setFocus] = useState(false);
  const [testo, setTesto] = useState(String(value));
  const mostra = focus ? testo : numIT.format(value || 0);
  return (
    <div className="relative">
      <input
        type="text" inputMode="numeric" value={mostra}
        onFocus={() => { setTesto(String(value || "")); setFocus(true); }}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          setTesto(raw);
          onChange(raw ? parseInt(raw, 10) : 0);
        }}
        className="w-full bg-transparent border-b border-navy/10 py-4 text-navy text-xl sm:text-2xl font-bold focus:outline-none focus:border-gold transition-colors pr-8 font-mono"
      />
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-navy/40 font-bold">€</span>
    </div>
  );
}

const KNEE = 35, POSK = 70, POSMAX = 100, VALMAX = 100;
const posToVal = (t: number) => (t <= POSK ? (t * KNEE) / POSK : KNEE + ((t - POSK) * (VALMAX - KNEE)) / (POSMAX - POSK));
const valToPos = (r: number) => (r <= KNEE ? (r * POSK) / KNEE : POSK + ((r - KNEE) * (POSMAX - POSK)) / (VALMAX - KNEE));

function Barra({ label, value, min, max, coloreText, onChange }: any) {
  const [focus, setFocus] = useState(false);
  const [testo, setTesto] = useState(String(value));
  const applica = () => {
    setFocus(false);
    let v = parseFloat(testo.replace(",", "."));
    if (isNaN(v)) v = value;
    v = Math.min(max, Math.max(min, v));
    onChange(v);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className={`text-[10px] font-bold tracking-[0.2em] uppercase ${coloreText}`}>{label}</div>
      <input
        type="range" min={0} max={POSMAX} step={0.2} value={valToPos(value)}
        onChange={(e) => onChange(+posToVal(parseFloat(e.target.value)).toFixed(1))}
        className={`w-full h-1 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-current ${coloreText}`}
      />
      <div className="relative w-[100px] mt-2">
        <input
          type="text" inputMode="decimal"
          value={focus ? testo : value.toFixed(2).replace(/\.?0+$/, "").replace(".", ",")}
          onFocus={() => { setTesto(String(value)); setFocus(true); }}
          onChange={(e) => setTesto(e.target.value)}
          onBlur={applica}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
          className={`w-full py-2 pl-3 pr-6 text-base font-bold font-mono bg-white border border-current rounded ${coloreText} focus:outline-none`}
        />
        <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs ${coloreText} pointer-events-none`}>%</span>
      </div>
    </div>
  );
}

export default function Simulatore() {
  const [formula, setFormula] = useState(1);
  const [importo, setImporto] = useState(5865349);
  const [pmax, setPmax] = useState(20);
  const [alfa, setAlfa] = useState(0.3);
  const [X, setX] = useState(0.8);
  const [nConc, setNConc] = useState(10);
  const [generato, setGenerato] = useState(false);

  const [righe, setRighe] = useState<any[]>([]);
  const [nextId, setNextId] = useState(1);

  const mu = mediaAttesa(formula, pmax, alfa);
  const det = DETTAGLI[formula];

  const genera = () => {
    const sigma = Math.max(mu * fattoreDispersione(formula), 0.8);
    const nTot = Math.max(2, Math.min(30, nConc));
    const vals = generaRibassi(formula, nTot - 1, mu, sigma);
    const m = vals.length;
    let rMia;
    if (m >= 4) rMia = (vals[2] + vals[3]) / 2;
    else if (m >= 2) rMia = (vals[m - 2] + vals[m - 1]) / 2;
    else rMia = vals[0] - 1;
    rMia = +Math.max(rMia, 0.5).toFixed(2);
    const nuove = [
      { id: 1, r: rMia, mine: true },
      ...vals.map((v, i) => ({ id: i + 2, r: v, mine: false })),
    ];
    setRighe(nuove);
    setNextId(nuove.length + 1);
    setGenerato(true);
  };

  const aggiorna = (id: number, val: number) => setRighe((rs) => rs.map((x) => (x.id === id ? { ...x, r: val } : x)));
  const marcaMia = (id: number) => setRighe((rs) => rs.map((x) => ({ ...x, mine: x.id === id })));
  const rimuovi = (id: number) => setRighe((rs) => rs.filter((x) => x.id !== id));
  const aggiungi = () => { setRighe((rs) => [...rs, { id: nextId, r: +mu.toFixed(1), mine: false }]); setNextId((n) => n + 1); };

  const miaRiga = righe.find((x) => x.mine);
  const concorrenti = righe.filter((x) => !x.mine);
  const minC = concorrenti.length ? Math.min(...concorrenti.map((x) => x.r)) : 0;
  const maxC = concorrenti.length ? Math.max(...concorrenti.map((x) => x.r)) : 0;

  const riscala = (nuovoMin: number, nuovoMax: number) => {
    const lo = Math.min(nuovoMin, nuovoMax), hi = Math.max(nuovoMin, nuovoMax);
    setRighe((rs) => {
      const conc = rs.filter((x) => !x.mine);
      const m = conc.length;
      if (m === 0) return rs;
      if (m === 1) return rs.map((x) => (x.mine ? x : { ...x, r: +hi.toFixed(2) }));

      const ord = [...conc].sort((a, b) => b.r - a.r || a.id - b.id);
      const span = hi - lo;
      const v0 = ord[0].r, vL = ord[m - 1].r;
      let g: number[] = [];
      for (let i = 0; i < m - 1; i++) {
        g.push(v0 > vL ? ((ord[i].r - ord[i + 1].r) / (v0 - vL)) * span : span / (m - 1));
      }
      const cap = (2.0 * span) / (m - 1);
      const gapMin = (0.02 * span) / (m - 1);
      for (let it = 0; it < 4; it++) {
        g = g.map((x) => Math.min(Math.max(x, gapMin), cap));
        const s = g.reduce((a, b) => a + b, 0);
        g = g.map((x) => (x * span) / s);
      }
      const nuovi = new Map();
      let corrente = hi;
      nuovi.set(ord[0].id, +corrente.toFixed(2));
      for (let i = 0; i < m - 1; i++) {
        corrente -= g[i];
        nuovi.set(ord[i + 1].id, +corrente.toFixed(2));
      }
      nuovi.set(ord[m - 1].id, +lo.toFixed(2));
      return rs.map((x) => (x.mine ? x : { ...x, r: nuovi.get(x.id) }));
    });
  };
  const GAP = 0.5;
  const setMia = (v: number) => { if (miaRiga) aggiorna(miaRiga.id, +v.toFixed(2)); };
  const setMax = (v: number) => { const vv = Math.max(v, minC + GAP); riscala(minC, vv); };
  const setMin = (v: number) => { const vv = Math.min(v, maxC - GAP); riscala(vv, maxC); };

  const etichette = useMemo(() => {
    const m: any = {}; let c = 0;
    righe.forEach((x) => { if (x.mine) m[x.id] = "La mia offerta"; else { c++; m[x.id] = `Concorrente ${c}`; } });
    return m;
  }, [righe]);

  const classifica = useMemo(() => {
    if (righe.length === 0) return [];
    const ribassi = righe.map((x) => Math.max(x.r, 0) / 100);
    const Rmax = Math.max(...ribassi, 0);
    const Pmin = importo * (1 - Rmax);
    const positivi = ribassi.filter((r) => r > 0);
    const media = positivi.length ? positivi.reduce((a, b) => a + b, 0) / positivi.length : 0;

    const out = righe.map((x) => {
      const r = Math.max(x.r, 0) / 100;
      const prezzo = importo * (1 - r);
      let punti = 0;
      if (r > 0 && Rmax > 0) {
        if (formula === 1) punti = (r / Rmax) * pmax;
        else if (formula === 2) punti = prezzo > 0 ? (Pmin / prezzo) * pmax : 0;
        else if (formula === 3) punti = Math.pow(r / Rmax, alfa) * pmax;
        else if (formula === 4) {
          const As = media, Amax = Rmax; let Ci;
          if (As <= 0) Ci = 0;
          else if (r <= As) Ci = (X * r) / As;
          else { const den = Amax - As; Ci = den > 0 ? X + (1 - X) * ((r - As) / den) : X; }
          punti = Ci * pmax;
        }
      }
      return { ...x, rEff: r, prezzo, punti };
    });
    out.sort((a, b) => b.punti - a.punti || b.rEff - a.rEff);
    return out.map((x, i) => ({ ...x, pos: i + 1 }));
  }, [righe, formula, importo, pmax, alfa, X]);

  return (
    <div className="w-full">
      {/* Intestazione */}
      <div className="text-center mb-12">
        <h3 className="text-navy text-2xl font-bold uppercase tracking-tighter mb-8">
           Simulatore ribasso economico
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            ["01", "Scegli la formula del disciplinare", ""],
            ["02", "Imposta importo, punti e offerte in gara", ""],
            ["03", "Genera i ribassi", ""],
            ["04", "Affina la classifica a mano o con le barre", ""],
          ].map(([n, title, desc]) => (
            <div key={n} className="text-center">
              <div className="text-gold text-2xl md:text-3xl font-bold mb-2 opacity-50">{n}</div>
              <div className="text-navy text-xs font-bold uppercase tracking-widest mb-2 leading-relaxed">{title}</div>
              <div className="text-text-main text-[11px] leading-relaxed px-4">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Formule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {Object.entries(DETTAGLI).map(([id, f]) => {
          const on = +id === formula;
          return (
            <button key={id} onClick={() => { setFormula(+id); setRighe([]); setNextId(1); setGenerato(false); }} 
              className={`text-left p-6 transition-all duration-300 border-t-4 border ${on ? 'border-navy border-t-gold bg-navy/5 shadow-inner' : 'border-navy/10 border-t-transparent bg-white hover:border-navy/30'}`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${on ? 'text-navy' : 'text-navy/50'}`}>{f.tag}</div>
              <div className={`text-sm md:text-base ${on ? 'text-navy font-bold' : 'text-navy'}`}>{f.mini}</div>
            </button>
          );
        })}
      </div>

      {/* Dettagli Formula */}
      <div className="bg-white border border-navy/10 p-6 md:p-10 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4 text-base md:text-xl text-navy">
          {det.righe.map((r: any, i: number) => (<div key={i}>{r}</div>))}
        </div>
        <div className="md:border-l border-navy/10 md:pl-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-4">Legenda Variabili</div>
          {det.legenda.map(([sim, desc]: any) => (
            <div key={sim} className="flex gap-4 text-[11px] md:text-xs mb-3 leading-relaxed">
              <span className="font-bold text-navy w-12 shrink-0 italic font-serif">{sim}</span>
              <span className="text-text-main">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Parametri */}
      <div className="bg-bg-neutral p-6 md:p-10 mb-8">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">Importo a base di gara</label>
              <ImportoInput value={importo} onChange={setImporto} />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">Punti massimi economici</label>
              <DecimalInput value={pmax} onChange={setPmax} min={1} max={100} step={1} />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">Numero offerte attese</label>
              <DecimalInput value={nConc} onChange={(v: any) => setNConc(Math.round(v))} min={2} max={30} step={1} />
            </div>
            {formula === 3 && (
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">Coefficiente Alfa</label>
                <DecimalInput value={alfa} onChange={setAlfa} min={0.05} max={2} step={0.05} />
              </div>
            )}
            {formula === 4 && (
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">Coefficiente X</label>
                <DecimalInput value={X} onChange={setX} min={0.5} max={0.95} step={0.05} />
              </div>
            )}
         </div>

         <div className="pt-8 border-t border-navy/10 flex flex-col md:flex-row items-center gap-6">
            <button onClick={genera} className="bg-navy text-white hover:bg-gold transition-colors duration-500 py-4 px-8 text-xs font-bold uppercase tracking-[0.2em] shrink-0 w-full md:w-auto">
              Genera ribassi e concorrenti
            </button>
            <p className="text-xs text-text-main leading-relaxed">
               La generazione dei ribassi è su base matematica, determinata dalla formula selezionata e dal peso dell'offerta economica sul totale dei punti di gara.
            </p>
         </div>
      </div>

      {/* Barre Scenario */}
      {generato && concorrenti.length > 0 && (
        <div className="bg-white border border-navy/10 p-6 md:p-10 mb-8 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">Scenario Rapido</div>
          <p className="text-xs text-text-main leading-relaxed mb-8">
            Le barre del massimo e del minimo riscalano tutti i concorrenti mantenendo le proporzioni; le correzioni fatte a mano in tabella vengono conservate e riscalate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Barra label="La tua offerta" value={miaRiga ? miaRiga.r : 0} min={0} max={100} coloreText="text-gold" onChange={setMia} />
            <Barra label="Ribasso Max" value={maxC} min={0} max={100} coloreText="text-navy" onChange={setMax} />
            <Barra label="Ribasso Min" value={minC} min={0} max={100} coloreText="text-navy/50" onChange={setMin} />
          </div>
        </div>
      )}

      {/* Tabella Classifica */}
      {!generato && (
        <div className="bg-white border-2 border-dashed border-navy/10 rounded p-8 md:p-12 text-center text-sm text-navy/50 leading-relaxed">
          Imposta i parametri e premi <strong className="text-navy">Genera ribassi e concorrenti</strong>: qui comparirà la classifica. La classifica e la tua offerta saranno modificabili liberamente.
        </div>
      )}
      {generato && (
        <div className="bg-white border border-navy/10 shadow-sm overflow-hidden">
           <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg-neutral/50 border-b border-navy/5">
             <div>
               <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">Classifica</div>
               <div className="text-xs text-text-main">{righe.length} offerte — i ribassi si modificano anche in tabella</div>
             </div>
             <button onClick={aggiungi} className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy border border-navy/20 hover:border-navy px-4 py-2 transition-colors">
               + Aggiungi Concorrente
             </button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-navy text-white text-[10px] uppercase tracking-[0.2em]">
                 <tr>
                   <th className="px-6 py-4 font-bold">Pos</th>
                   <th className="px-6 py-4 font-bold">Concorrente</th>
                   <th className="px-6 py-4 font-bold">Ribasso %</th>
                   <th className="px-6 py-4 font-bold text-right">Prezzo Offerto</th>
                   <th className="px-6 py-4 font-bold text-right">Punteggio</th>
                   <th className="px-4 py-4"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-navy/5">
                 {classifica.map((x) => (
                   <tr key={x.id} className={`transition-colors ${x.mine ? 'bg-gold/10' : 'hover:bg-bg-neutral'}`}>
                     <td className="px-6 py-4">
                       {x.pos === 1 ? (
                         <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">1°</span>
                       ) : (
                         <span className="text-navy/50 font-bold font-mono">{x.pos}°</span>
                       )}
                     </td>
                     <td className="px-6 py-4 flex items-center gap-3">
                       <button 
                         onClick={() => marcaMia(x.id)} 
                         title="Segna come la mia offerta" 
                         className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-all border ${x.mine ? 'bg-gold border-gold text-white' : 'bg-transparent border-navy/20 text-transparent hover:border-gold hover:text-gold'}`}
                       >
                         ★
                       </button>
                       <span className={`${x.mine ? 'text-gold font-bold' : 'text-navy'}`}>{etichette[x.id]}</span>
                     </td>
                     <td className="px-6 py-4">
                        <div className="relative w-[120px]">
                          <input
                            type="number" step={0.01} value={x.r}
                            onChange={(e) => aggiorna(x.id, +e.target.value || 0)}
                            className={`w-full py-2 pl-3 pr-8 font-mono bg-transparent border-b focus:outline-none transition-colors text-base ${x.mine ? 'border-gold text-gold font-bold' : 'border-navy/10 text-navy focus:border-navy'}`}
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-navy/40 pointer-events-none">%</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-right font-mono text-navy/70">
                       {eur.format(x.prezzo)}
                     </td>
                     <td className={`px-6 py-4 text-right font-mono font-bold text-lg ${x.mine ? 'text-gold' : 'text-navy'}`}>
                       {x.punti.toFixed(3)}
                     </td>
                     <td className="px-4 py-4 text-center">
                       <button 
                         onClick={() => rimuovi(x.id)} 
                         disabled={righe.length <= 1} 
                         className={`text-lg transition-opacity ${righe.length <= 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-40 hover:opacity-100 hover:text-red-500'}`}
                       >
                         ×
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      <div className="mt-8 text-center text-[10px] text-navy/40 uppercase tracking-widest max-w-3xl mx-auto leading-relaxed italic border-t border-navy/10 pt-8">
        I risultati sono indicativi. La formula effettiva è quella riportata nel disciplinare di gara. MBA Progetti non si assume responsabilità per decisioni basate su questo strumento.
      </div>
    </div>
  );
}
