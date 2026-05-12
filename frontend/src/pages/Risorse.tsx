import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ChartLineUp, PlusMinus, Info } from '@phosphor-icons/react';

const anim = { 
  initial: { opacity: 0, y: 30 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

export default function Risorse() {
  const [activeTab, setActiveTab] = useState<'lineare' | 'minimo' | 'alfa' | 'bilineare'>('lineare');

  const [baseImporto, setBaseImporto] = useState<string>('614374.40');
  const [maxPoints, setMaxPoints] = useState<string>('10');
  const [ribassoMax, setRibassoMax] = useState<string>('28');
  const [tuoRibasso, setTuoRibasso] = useState<string>('15');
  
  const [prezzoMin, setPrezzoMin] = useState<string>('442349.57');
  const [alfa, setAlfa] = useState<string>('0.3');
  const [coeffX, setCoeffX] = useState<string>('0.80');
  const [aSoglia, setASoglia] = useState<string>('14.60');

  // Logic remains identical to previous version for correctness
  const b = parseFloat(baseImporto) || 0;
  const mp = parseFloat(maxPoints) || 0;
  const rM = parseFloat(ribassoMax) || 0;
  const tR = parseFloat(tuoRibasso) || 0;
  const pMin = parseFloat(prezzoMin) || 0;
  const alf = parseFloat(alfa) || 0;
  const cx = parseFloat(coeffX) || 0;
  const as = parseFloat(aSoglia) || 0;

  const prezzoOfferto = b * (1 - (tR / 100));

  let punti = 0;
  if (activeTab === 'lineare') {
    punti = rM > 0 && tR > 0 ? (tR / rM) * mp : 0;
  } else if (activeTab === 'minimo') {
    punti = prezzoOfferto > 0 ? (pMin / prezzoOfferto) * mp : 0;
  } else if (activeTab === 'alfa') {
    if (rM > 0 && tR > 0) {
      punti = Math.pow((tR / rM), alf) * mp;
    }
  } else if (activeTab === 'bilineare') {
    if (as > 0 && tR > 0) {
      let ci = 0;
      if (tR <= as) {
        ci = cx * (tR / as);
      } else {
        if (rM === as) ci = cx;
        else ci = cx + (1 - cx) * ((tR - as) / (rM - as));
      }
      punti = ci * mp;
    }
  }

  punti = Math.min(Math.max(punti, 0), mp);
  const isAnomalo = punti >= (0.8 * mp) && mp > 0;

  let pointsToEval: number[] = [];
  if (activeTab === 'lineare' || activeTab === 'alfa') {
    if (rM > 0) {
      pointsToEval.push(rM);
      [0.9, 0.8, 0.6, 0.4, 0.2].forEach(p => pointsToEval.push(rM * p));
    }
  } else if (activeTab === 'minimo') {
    if (pMin > 0 && b > 0) {
      const minRibasso = (1 - (pMin / b)) * 100;
      pointsToEval.push(minRibasso);
      [0.9, 0.8, 0.6, 0.4, 0.2].forEach(p => pointsToEval.push(minRibasso * p));
    }
  } else if (activeTab === 'bilineare') {
    if (rM > 0 && as > 0) {
      pointsToEval.push(rM, as);
      pointsToEval.push(as * 0.5);
      pointsToEval.push(as + (rM - as) * 0.5);
    }
  }
  if (tR > 0) pointsToEval.push(tR);
  pointsToEval = [...new Set(pointsToEval.map(p => Math.round(p * 100) / 100))].sort((x, y) => y - x);

  const renderRow = (val: number, idx: number) => {
    let rowScore = 0;
    const rowPrice = b * (1 - (val / 100));
    
    if (activeTab === 'lineare') {
      rowScore = rM > 0 ? Math.min((val / rM), 1) * mp : 0;
    } else if (activeTab === 'minimo') {
      rowScore = rowPrice > 0 ? (pMin / rowPrice) * mp : 0;
    } else if (activeTab === 'alfa') {
      rowScore = rM > 0 ? Math.pow((Math.min(val, rM) / rM), alf) * mp : 0;
    } else if (activeTab === 'bilineare') {
       if (as > 0) {
          let ci = 0;
          if (val <= as) ci = cx * (val / as);
          else ci = (rM === as) ? cx : cx + (1 - cx) * ((val - as) / (rM - as));
          rowScore = Math.min(Math.max(ci, 0), 1) * mp;
       }
    }
    const isUserRow = Math.abs(val - tR) < 0.001;
    let label = "";
    if (activeTab === 'bilineare') {
      if (val === rM) label = "(Max)";
      else if (val === as) label = "(Soglia)";
    } else if (activeTab === 'minimo') {
      const minRibasso = (1 - (pMin / b)) * 100;
      if (Math.abs(val - minRibasso) < 0.01) label = "(Pmin)";
    } else if (val === rM) label = "(Max)";
    if (isUserRow) label = "(Tu)";

    return (
      <tr key={idx} className={`${isUserRow ? 'bg-gold/10 text-navy font-bold' : 'text-gray border-b border-lgray hover:bg-surface'} transition-colors`}>
        <td className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-30">{idx + 1}°</td>
        <td className="p-4 font-sans font-bold text-navy">{val.toFixed(2)}% {label && <span className="text-[10px] uppercase font-bold text-gold ml-2">{label}</span>}</td>
        <td className="p-4 font-sans">€ {rowPrice.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
        <td className="p-4 text-right font-bold text-lg">{rowScore.toFixed(3).replace('.', ',')}</td>
      </tr>
    );
  };

  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <section className="relative h-[40dvh] min-h-[400px] w-full flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/media/hero/slide5.webp" 
            alt="Risorse MBA Progetti" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1454165833767-027ff330267e?q=80&w=2070&auto=format&fit=crop'; }}
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">Risorse</h1>
            <div className="w-24 h-1 bg-gold mb-6" />
            <p className="text-white/60 text-lg md:text-xl font-sans max-w-[600px] leading-relaxed">
              Strumenti operativi e contenuti tecnici per supportare la tua strategia nel mondo degli appalti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CALCOLATORE */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...anim} className="text-center mb-20 max-w-[800px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-8">Simulatore di Punteggio</h2>
            <p className="text-gray text-lg leading-relaxed font-sans">
              Uno strumento professionale per calcolare l'attribuzione del punteggio economico secondo le principali formule ministeriali.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* TABS */}
            <div className="flex justify-center mb-10 overflow-x-auto pb-4 no-scrollbar">
              <div className="bg-white p-1 rounded-sm border border-lgray inline-flex shadow-sm min-w-max">
                {[
                  { id: 'lineare', label: 'Formula Lineare', icon: Calculator },
                  { id: 'minimo', label: 'Prezzo Minimo', icon: Calculator },
                  { id: 'alfa', label: 'Esponenziale (α)', icon: PlusMinus },
                  { id: 'bilineare', label: 'Bilineare', icon: ChartLineUp }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${activeTab === tab.id ? 'bg-navy text-white shadow-lg' : 'text-navy/40 hover:text-navy hover:bg-lgray'}`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-sm shadow-2xl border border-lgray overflow-hidden flex flex-col lg:flex-row">
              {/* INPUT PANEL */}
              <div className="p-8 md:p-12 lg:w-[45%] border-b lg:border-b-0 lg:border-r border-lgray bg-surface/50">
                <h3 className="text-xs font-bold text-navy mb-10 uppercase tracking-[0.4em] flex items-center gap-3">
                  <div className="w-8 h-px bg-gold" /> Configurazione
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <InputItem label="Importo Base (€)" val={baseImporto} setter={setBaseImporto} />
                  <InputItem label="Punteggio Max" val={maxPoints} setter={setMaxPoints} />
                  <InputItem label="Ribasso Max (%)" val={ribassoMax} setter={setRibassoMax} />

                  {activeTab === 'minimo' && <InputItem label="Prezzo Minimo (€)" val={prezzoMin} setter={setPrezzoMin} />}
                  {activeTab === 'alfa' && <InputItem label="Coeff. Alfa (α)" val={alfa} setter={setAlfa} />}
                  {activeTab === 'bilineare' && (
                    <>
                      <InputItem label="Soglia (%)" val={aSoglia} setter={setASoglia} />
                      <InputItem label="Coeff. X" val={coeffX} setter={setCoeffX} />
                    </>
                  )}

                  <div className="sm:col-span-2 pt-6 border-t border-lgray">
                    <label className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-3 block">Il Tuo Ribasso (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={tuoRibasso} 
                      onChange={(e) => setTuoRibasso(e.target.value)}
                      className="w-full bg-white border-2 border-gold/20 rounded-sm px-6 py-4 text-navy font-bold text-2xl focus:outline-none focus:border-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <ResultBox label="Prezzo Offerto" val={b > 0 ? prezzoOfferto.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) : "€ 0,00"} />
                    <ResultBox label="Anomalia (4/5)" val={isAnomalo ? "CRITICO" : "SICURO"} color={isAnomalo ? "text-red-500" : "text-green-500"} />
                  </div>
                  <div className="bg-navy text-white p-8 rounded-sm text-center">
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] block mb-2 text-white/40">Punteggio Stimato</span>
                    <span className="text-5xl font-bold block text-gold">
                      {punti.toFixed(3).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              {/* GRADUATORIA PANEL */}
              <div className="p-8 md:p-12 lg:w-[55%] bg-white">
                <div className="flex items-center justify-between mb-10">
                  <h4 className="text-xs font-bold text-navy uppercase tracking-[0.4em]">Graduatoria</h4>
                  <div className="group relative">
                     <Info size={18} className="text-gold cursor-help" />
                     <div className="absolute bottom-full right-0 mb-4 w-64 p-4 bg-navy text-white text-[10px] leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl">
                        {activeTab === 'lineare' && 'Pi = Pmax × (Ri / Rmax)'}
                        {activeTab === 'minimo' && 'Pi = Pmax × (Pmin / Po)'}
                        {activeTab === 'alfa' && 'Pi = Pmax × (Ri / Rmax)^α'}
                        {activeTab === 'bilineare' && 'Interpolata su soglia.'}
                     </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar border border-lgray">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-surface text-navy font-bold sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="p-4 text-[10px] uppercase tracking-widest w-12">Pos.</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest">Ribasso %</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest">Prezzo</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest text-right">Punti</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-lgray">
                      {pointsToEval.length > 0 ? (
                        pointsToEval.map((val, idx) => {
                          if (val <= 0) return null;
                          return renderRow(val, idx);
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-16 text-center text-gray/40 font-medium text-lg">
                            Inserisci i dati per simulare la graduatoria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INSIGHTS */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...anim} className="text-center mb-24 max-w-[800px] mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-8">Approfondimenti</h2>
            <p className="text-gray text-lg leading-relaxed font-sans">
              Analisi tecniche e aggiornamenti normativi per restare sempre un passo avanti nel mercato dei lavori pubblici.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <InsightCard 
              tag="Normativa"
              title="Le novità del D.Lgs. 36/2023"
              text="Una guida pratica alle principali modifiche normative e ai loro effetti sulla redazione delle offerte tecniche."
              icon="📄"
            />
            <InsightCard 
              tag="Strategia"
              title="Come calcolare il ribasso ottimale"
              text="Strategie e simulatori per massimizzare il punteggio complessivo senza rischiare l'anomalia economica."
              icon="📊"
            />
            <InsightCard 
              tag="Innovazione"
              title="BIM e Gare: vantaggi concreti"
              text="Come il modello informativo migliora la qualità dell'offerta e facilita la valutazione della commissione."
              icon="📦"
            />
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="bg-navy py-24 md:py-32 px-6 text-center">
        <motion.div {...anim}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 leading-tight">Hai bisogno di una consulenza <br /><span className="text-gold font-medium">strategica per la tua gara?</span></h2>
          <Link to="/contatti" className="inline-flex items-center gap-4 bg-gold text-white px-12 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-navy transition-all duration-500 shadow-xl">
            Contattaci <ArrowRight size={20} weight="bold" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function InputItem({ label, val, setter }: { label: string, val: string, setter: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">{label}</label>
      <input 
        type="number" 
        step="0.01"
        value={val} 
        onChange={(e) => setter(e.target.value)}
        className="bg-white border-b border-lgray px-0 py-3 text-navy font-sans font-bold focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

function ResultBox({ label, val, color = "text-navy" }: { label: string, val: string, color?: string }) {
  return (
    <div className="bg-white p-6 rounded-sm border border-lgray text-center shadow-sm">
      <span className="text-[10px] text-navy/30 uppercase font-bold tracking-widest block mb-2">{label}</span>
      <span className={`text-sm md:text-base font-bold font-sans ${color} block truncate`}>
        {val}
      </span>
    </div>
  );
}

function InsightCard({ tag, title, text, icon }: { tag: string, title: string, text: string, icon: string }) {
  return (
    <motion.div {...anim} className="group cursor-pointer">
      <div className="aspect-video bg-surface rounded-sm mb-8 overflow-hidden relative border border-lgray">
        <div className="absolute top-6 left-6 bg-navy text-white text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 z-10">
          {tag}
        </div>
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-colors duration-700" />
        <div className="w-full h-full flex items-center justify-center text-5xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-500">
        {title}
      </h3>
      <p className="text-gray text-sm leading-relaxed mb-6 font-sans">
        {text}
      </p>
      <div className="flex items-center gap-4 text-gold font-bold text-[10px] uppercase tracking-[0.2em]">
        Leggi Tutto <ArrowRight size={16} />
      </div>
    </motion.div>
  );
}
