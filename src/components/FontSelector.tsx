import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, X, RotateCcw, Check } from 'lucide-react';

interface FontSelectorProps {
  displayFont: string;
  bodyFont: string;
  onDisplayFontChange: (font: string) => void;
  onBodyFontChange: (font: string) => void;
}

const DISPLAY_FONTS = [
  'Cabinet Grotesk',
  'Clash Display',
  'Zodiak',
  'Boska',
  'Panchang',
  'Tanker',
  'Clash Grotesk',
  'Erode',
];

const BODY_FONTS = [
  'Satoshi',
  'General Sans',
  'Switzer',
  'Archivo',
  'Clash Grotesk',
];

export default function FontSelector({
  displayFont,
  bodyFont,
  onDisplayFontChange,
  onBodyFontChange,
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    onDisplayFontChange('Cabinet Grotesk');
    onBodyFontChange('Satoshi');
  };

  return (
    <div className="fixed right-0 top-1/2 z-[9999] -translate-y-1/2 flex items-center">
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center justify-center w-12 h-12 bg-white border border-[rgba(0,0,0,0.06)] rounded-lg mr-4 transition-all hover:-translate-x-1 cursor-pointer"
            style={{
              boxShadow: '0 4px 6px rgba(0,0,0,0.02), 0 12px 40px rgba(0,0,0,0.08)',
            }}
          >
            <Type size={20} className="text-[#000046] group-hover:text-[#FF810A] transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[rgba(0,0,40,0.05)] cursor-pointer"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[340px] h-screen flex flex-col overflow-hidden border-l border-[rgba(0,0,0,0.06)]"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02), 0 12px 40px rgba(0,0,0,0.08)',
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-[rgba(0,0,0,0.06)] flex items-center justify-between bg-white/40">
                <span className="text-[11px] tracking-[2px] uppercase font-bold text-[#000046]">Typographie</span>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-[#FAEBDC] transition-colors cursor-pointer">
                  <X size={18} className="text-[#000046]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8" style={{ scrollbarWidth: 'thin' }}>
                {/* Display fonts */}
                <div>
                  <h3 className="text-[11px] tracking-[2px] uppercase text-[#231F20] mb-4 opacity-60">
                    Police de titres (Display)
                  </h3>
                  <div className="space-y-2">
                    {DISPLAY_FONTS.map((font) => (
                      <button
                        key={font}
                        onClick={() => onDisplayFontChange(font)}
                        className={`w-full text-left p-3 border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          displayFont === font
                            ? 'border-[#FF810A] bg-white'
                            : 'border-[rgba(0,0,0,0.04)] bg-transparent hover:border-[rgba(0,0,0,0.1)] hover:bg-white/50'
                        }`}
                      >
                        <div>
                          <p className="text-[14px] font-medium text-[#000046] mb-0.5" style={{ fontFamily: font }}>
                            {font}
                          </p>
                          <p className="text-[10px] text-[#231F20]/50 tracking-wider" style={{ fontFamily: font }}>
                            Aa Bb Cc 123
                          </p>
                        </div>
                        {displayFont === font && <Check size={14} className="text-[#FF810A]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body fonts */}
                <div>
                  <h3 className="text-[11px] tracking-[2px] uppercase text-[#231F20] mb-4 opacity-60">
                    Police de corps (Body)
                  </h3>
                  <div className="space-y-2">
                    {BODY_FONTS.map((font) => (
                      <button
                        key={font}
                        onClick={() => onBodyFontChange(font)}
                        className={`w-full text-left p-3 border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          bodyFont === font
                            ? 'border-[#FF810A] bg-white'
                            : 'border-[rgba(0,0,0,0.04)] bg-transparent hover:border-[rgba(0,0,0,0.1)] hover:bg-white/50'
                        }`}
                      >
                        <div>
                          <p className="text-[14px] font-medium text-[#000046] mb-0.5" style={{ fontFamily: font }}>
                            {font}
                          </p>
                          <p className="text-[10px] text-[#231F20]/50 tracking-wider" style={{ fontFamily: font }}>
                            Aa Bb Cc 123
                          </p>
                        </div>
                        {bodyFont === font && <Check size={14} className="text-[#FF810A]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="p-6 bg-[#FAEBDC]/40 border-t border-[rgba(0,0,0,0.06)]">
                <h3 className="text-[11px] tracking-[2px] uppercase text-[#231F20] mb-3 opacity-40">Apercu</h3>
                <div className="space-y-2">
                  <p className="text-[20px] leading-tight text-[#000046]" style={{ fontFamily: displayFont }}>
                    Libre d'etre de votre cote
                  </p>
                  <p className="text-[13px] leading-relaxed text-[#231F20]/80" style={{ fontFamily: bodyFont }}>
                    Accompagner les familles dans la structuration et la perennite de leur patrimoine.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 w-full py-3 flex items-center justify-center gap-2 border border-[#000046]/10 text-[11px] tracking-[2px] uppercase font-bold text-[#000046] hover:bg-[#000046] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  Reinitialiser
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
