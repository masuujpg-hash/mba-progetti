import { useState } from 'react';
import { UploadSimple, CheckCircle } from '@phosphor-icons/react';

interface GareContactFormProps {
  defaultGaraName?: string;
  className?: string;
}

export default function GareContactForm({ defaultGaraName = '', className = '' }: GareContactFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nomeImpresa: '',
    nomeReferente: '',
    telefono: '',
    email: '',
    nomeGara: defaultGaraName,
    scadenzaGara: '',
    privacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert("È necessario accettare l'informativa sulla privacy.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className={`border-l-4 border-[#F5C400] bg-[#F8F9FA] p-6 sm:p-10 md:p-12 rounded-[2px] shadow-xs ${className}`}>
      {/* Header & Contatti Diretti */}
      <div className="mb-6 sm:mb-8">
        <span className="text-[#7b869d] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2 block font-outfit">
          VUOI UN PREVENTIVO PER UNA GARA D'APPALTO?
        </span>
        <h3 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-tight mb-2.5 font-outfit">
          CONTATTACI SUBITO
        </h3>
        <p className="text-[#1b2a4a] text-[15px] sm:text-base font-medium mb-3.5 font-outfit">
          Ti rispondiamo entro 24 ore.
        </p>
        <div className="space-y-1">
          <a 
            href="tel:+393286285861" 
            className="block text-[#1b2a4a] hover:text-[#F5C400] text-base sm:text-lg font-bold transition-colors font-outfit"
          >
            328 6285861
          </a>
          <a 
            href="mailto:arch.mariobiondi@gmail.com" 
            className="block text-[#1b2a4a] hover:text-[#F5C400] text-base sm:text-lg font-bold transition-colors font-outfit"
          >
            arch.mariobiondi@gmail.com
          </a>
        </div>
      </div>

      {/* Form o Messaggio di Successo */}
      {formSubmitted ? (
        <div className="bg-white p-8 border border-[#1b2a4a]/10 rounded-[2px] text-center space-y-3 shadow-xs">
          <CheckCircle size={44} className="text-[#F5C400] mx-auto" />
          <h4 className="text-[#1b2a4a] text-lg font-bold uppercase tracking-wide font-outfit">
            Richiesta Inviata con Successo
          </h4>
          <p className="text-[#3d4a66] text-[14px] leading-relaxed font-outfit">
            Il nostro team tecnico esaminerà i dettagli della gara e ti risponderà entro 24 ore lavorative.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormSubmitted(false);
              setSelectedFile(null);
              setFormData({
                nomeImpresa: '',
                nomeReferente: '',
                telefono: '',
                email: '',
                nomeGara: defaultGaraName,
                scadenzaGara: '',
                privacy: false
              });
            }}
            className="inline-block mt-3 text-xs uppercase tracking-wider text-[#1b2a4a] hover:text-[#F5C400] underline cursor-pointer"
          >
            Invia un'altra richiesta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <input 
              type="text" 
              required
              placeholder="Nome impresa" 
              value={formData.nomeImpresa}
              onChange={e => setFormData({ ...formData, nomeImpresa: e.target.value })}
              className="w-full bg-white border border-[#d0d7e2] hover:border-[#1b2a4a]/40 focus:border-[#F5C400] focus:outline-none h-12 px-4 text-[14px] sm:text-[15px] text-[#1b2a4a] placeholder:text-[#8a96a8] rounded-[2px] transition-colors font-outfit"
            />
            <input 
              type="text" 
              required
              placeholder="Nome referente" 
              value={formData.nomeReferente}
              onChange={e => setFormData({ ...formData, nomeReferente: e.target.value })}
              className="w-full bg-white border border-[#d0d7e2] hover:border-[#1b2a4a]/40 focus:border-[#F5C400] focus:outline-none h-12 px-4 text-[14px] sm:text-[15px] text-[#1b2a4a] placeholder:text-[#8a96a8] rounded-[2px] transition-colors font-outfit"
            />
            <input 
              type="tel" 
              required
              placeholder="Telefono" 
              value={formData.telefono}
              onChange={e => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full bg-white border border-[#d0d7e2] hover:border-[#1b2a4a]/40 focus:border-[#F5C400] focus:outline-none h-12 px-4 text-[14px] sm:text-[15px] text-[#1b2a4a] placeholder:text-[#8a96a8] rounded-[2px] transition-colors font-outfit"
            />
            <input 
              type="email" 
              required
              placeholder="E-mail" 
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white border border-[#d0d7e2] hover:border-[#1b2a4a]/40 focus:border-[#F5C400] focus:outline-none h-12 px-4 text-[14px] sm:text-[15px] text-[#1b2a4a] placeholder:text-[#8a96a8] rounded-[2px] transition-colors font-outfit"
            />
            <input 
              type="text" 
              placeholder="Nome della gara" 
              value={formData.nomeGara}
              onChange={e => setFormData({ ...formData, nomeGara: e.target.value })}
              className="w-full bg-white border border-[#d0d7e2] hover:border-[#1b2a4a]/40 focus:border-[#F5C400] focus:outline-none h-12 px-4 text-[14px] sm:text-[15px] text-[#1b2a4a] placeholder:text-[#8a96a8] rounded-[2px] transition-colors font-outfit"
            />
            <input 
              type="text" 
              placeholder="Scadenza della gara" 
              value={formData.scadenzaGara}
              onChange={e => setFormData({ ...formData, scadenzaGara: e.target.value })}
              className="w-full bg-white border border-[#d0d7e2] hover:border-[#1b2a4a]/40 focus:border-[#F5C400] focus:outline-none h-12 px-4 text-[14px] sm:text-[15px] text-[#1b2a4a] placeholder:text-[#8a96a8] rounded-[2px] transition-colors font-outfit"
            />

            {/* Box Caricamento File */}
            <div className="sm:col-span-2">
              <label className="w-full bg-white border border-[#d0d7e2] hover:border-[#F5C400] h-12 px-4 flex items-center justify-center gap-2.5 cursor-pointer transition-colors rounded-[2px] group">
                <UploadSimple size={18} className="text-[#1b2a4a] group-hover:text-[#F5C400] transition-colors shrink-0" />
                <span className="text-[#1b2a4a] text-xs sm:text-[13px] font-medium uppercase tracking-[0.15em] truncate font-outfit">
                  {selectedFile ? selectedFile.name : "ALLEGA IL BANDO DI GARA (PDF)"}
                </span>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="ml-2 text-xs text-red-500 hover:text-red-700 underline font-outfit"
                  >
                    Rimuovi
                  </button>
                )}
                <input 
                  type="file" 
                  accept=".pdf,.zip,.rar,.doc,.docx"
                  className="hidden" 
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* Checkbox Privacy */}
            <div className="sm:col-span-2 flex items-center gap-2.5 pt-1">
              <input 
                type="checkbox" 
                id={`privacy-check-${defaultGaraName.replace(/\s+/g, '-').toLowerCase() || 'general'}`}
                checked={formData.privacy}
                onChange={e => setFormData({ ...formData, privacy: e.target.checked })}
                className="accent-[#1b2a4a] cursor-pointer w-4 h-4 rounded-[1px]"
                required
              />
              <label 
                htmlFor={`privacy-check-${defaultGaraName.replace(/\s+/g, '-').toLowerCase() || 'general'}`}
                className="text-xs text-[#3d4a66] cursor-pointer select-none font-outfit"
              >
                Dichiaro di aver preso visione dell'informativa sulla privacy
              </label>
            </div>

            {/* Pulsante Invio */}
            <div className="sm:col-span-2 pt-1">
              <button 
                type="submit" 
                className="w-full bg-[#1b2a4a] hover:bg-[#F5C400] text-white hover:text-[#1b2a4a] h-[52px] px-[26px] py-[15px] text-[11px] font-medium uppercase tracking-[0.2em] transition-all rounded-[2px] shadow-xs cursor-pointer font-outfit"
              >
                INVIA RICHIESTA
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

