import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ExternalLink, 
  Tag, 
  X, 
  Palette, 
  Clock, 
  ShieldCheck, 
  Coins, 
  Image as ImageIcon 
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/portfolioData';
import { GalleryItem } from '../types';

interface GalleryCardProps {
  onShowToast: (msg: string) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ onShowToast }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="w-full max-w-[480px] sm:max-w-[540px] mx-auto">
      {/* Outer Gothic Gallery Master Card */}
      <div 
        id="gothic-gallery-card"
        className="relative rounded-3xl p-5 sm:p-7 backdrop-blur-xl border border-[#c0005c]/30 shadow-[0_10px_45px_rgba(40,0,20,0.85),0_0_35px_rgba(250,0,121,0.2)] overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(165deg, rgba(58,0,28,0.9) 0%, rgba(35,0,17,0.94) 45%, rgba(18,0,9,0.98) 100%)',
        }}
      >
        {/* Ornate Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fa0079] to-transparent opacity-90" />
        <div className="absolute top-1/3 left-0 w-44 h-44 bg-[#fa0079]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Gallery Header */}
        <div className="relative z-10 text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#850040]/50 border border-[#fa0079]/40 text-rose-100 mb-2">
            <Palette className="w-3 h-3 text-[#fa0079]" />
            <span>Art Showcase & Commissions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-[#fa0079]">
            Velvet Gallery
          </h2>
          <p className="text-xs text-rose-300/80 mt-1 max-w-sm mx-auto">
            Selected gothic pieces, OC character concepts, and commission status.
          </p>
        </div>

        {/* Commission Status Banner */}
        <div className="relative z-10 p-3.5 rounded-2xl bg-gradient-to-r from-[#36001a] via-[#4a0024] to-[#230011] border border-[#fa0079]/40 shadow-inner mb-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fa0079] animate-ping" />
              <span className="text-xs sm:text-sm font-bold text-rose-100">
                Commissions: <span className="text-[#fa0079]">OPEN</span>
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#fa0079]/20 text-[#fa0079] border border-[#fa0079]/30">
              2 / 5 Slots
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-[#5e002d]/40 text-center text-[11px]">
            <div>
              <span className="text-rose-400/70 block">Icons / Head</span>
              <span className="font-bold text-rose-100 font-mono">$35+</span>
            </div>
            <div>
              <span className="text-rose-400/70 block">Half-Body</span>
              <span className="font-bold text-rose-100 font-mono">$65+</span>
            </div>
            <div>
              <span className="text-rose-400/70 block">Full Ref Sheet</span>
              <span className="font-bold text-rose-100 font-mono">$120+</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-3">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#120009] border border-[#710037]/50 hover:border-[#fa0079] transition-all cursor-pointer shadow-md"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120009] via-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[11px] font-bold text-rose-100 block truncate font-['Cinzel',serif]">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#fa0079] font-mono block truncate">
                  {item.artist}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order on VGen / External Link */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[#5e002d]/40">
          <a
            href="https://vgen.co/vespera"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-['Cinzel',serif] text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#850040] via-[#c0005c] to-[#fa0079] hover:from-[#980049] hover:to-[#fa0079] border border-[#fa0079]/50 shadow-[0_0_20px_rgba(250,0,121,0.4)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Request Custom Commission on VGen</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox / Modal for Art Item Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl bg-[#230011] border border-[#fa0079]/60 p-4 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-[#fa0079] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[60vh] bg-black">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-3">
                <h3 className="text-base font-bold text-white font-['Cinzel',serif]">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-[#fa0079] font-mono mt-0.5">
                  Artist: {selectedItem.artist}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedItem.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#36001a] text-rose-200 border border-[#710037]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
