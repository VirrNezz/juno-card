import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Copy, 
  Check, 
  Image as ImageIcon,
  FolderOpen
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/portfolioData';
import { GalleryPhoto } from '../types';

interface GalleryCardProps {
  onShowToast: (msg: string) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ onShowToast }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const selectedPhoto: GalleryPhoto | null = 
    selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  const handleOpenPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
    setZoomScale(1);
    setCopiedUrl(false);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
    setZoomScale(1);
  };

  const handlePrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    const prev = (selectedPhotoIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setSelectedPhotoIndex(prev);
    setZoomScale(1);
    setCopiedUrl(false);
  }, [selectedPhotoIndex]);

  const handleNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    const next = (selectedPhotoIndex + 1) % GALLERY_PHOTOS.length;
    setSelectedPhotoIndex(next);
    setZoomScale(1);
    setCopiedUrl(false);
  }, [selectedPhotoIndex]);

  const toggleZoom = () => {
    setZoomScale((prev) => (prev === 1 ? 1.6 : prev === 1.6 ? 2.2 : 1));
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    onShowToast('🔗 Image link copied to clipboard!');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleNextPhoto, handlePrevPhoto]);

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
            <ImageIcon className="w-3.5 h-3.5 text-[#fa0079]" />
            <span>Photo & Art Showcase</span>
            <span className="text-[#fa0079] font-bold">({GALLERY_PHOTOS.length} items)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-[#fa0079]">
            Velvet Gallery
          </h2>
          <p className="text-xs text-rose-300/80 mt-1 max-w-sm mx-auto">
            Klik foto mana saja untuk memperbesar (Full HD Lightbox) & navigasi gambar.
          </p>
        </div>

        {/* Gallery Photos Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenPhoto(idx)}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-[#120009] border border-[#710037]/60 hover:border-[#fa0079] transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(250,0,121,0.35)]"
            >
              <img
                src={photo.url}
                alt={photo.title || `Photo ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  // Fallback placeholder if custom image path not found yet
                  (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80');
                }}
              />
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120009] via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
              
              {/* Hover Zoom Icon & Title */}
              <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                <div className="self-end p-1.5 rounded-full bg-black/60 text-[#fa0079] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-100 block truncate font-['Cinzel',serif]">
                    {photo.title}
                  </span>
                  <span className="text-[9px] text-[#fa0079] font-mono block truncate">
                    {photo.artist || '@vespera'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for Photo Zoom & Enlarge */}
      <AnimatePresence>
        {selectedPhoto && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl bg-[#1e000e] border border-[#fa0079]/50 p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(250,0,121,0.3)] overflow-hidden flex flex-col"
            >
              {/* Lightbox Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#5e002d]/50">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#fa0079]/20 text-[#fa0079] border border-[#fa0079]/30">
                    {selectedPhotoIndex + 1} / {GALLERY_PHOTOS.length}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold font-['Cinzel',serif] text-rose-100 truncate max-w-[180px] sm:max-w-xs">
                      {selectedPhoto.title}
                    </h3>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleZoom}
                    title={zoomScale > 1 ? 'Reset Zoom' : 'Zoom In'}
                    className="p-2 rounded-full bg-[#230011] hover:bg-[#36001a] text-rose-200 hover:text-white border border-[#710037]/50 transition-colors"
                  >
                    {zoomScale > 1 ? <ZoomOut className="w-4 h-4 text-[#fa0079]" /> : <ZoomIn className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleCopyLink(selectedPhoto.url)}
                    title="Copy Photo Link"
                    className="p-2 rounded-full bg-[#230011] hover:bg-[#36001a] text-rose-200 hover:text-white border border-[#710037]/50 transition-colors"
                  >
                    {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleCloseLightbox}
                    title="Close (Esc)"
                    className="p-2 rounded-full bg-[#fa0079] text-white hover:bg-[#c0005c] transition-colors ml-1 shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Photo Enlarged Display Area */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black/70 flex items-center justify-center min-h-[260px] max-h-[65vh] border border-[#5e002d]/40">
                <div 
                  className="w-full h-full flex items-center justify-center overflow-auto p-2 cursor-zoom-in"
                  onClick={toggleZoom}
                >
                  <motion.img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    animate={{ scale: zoomScale }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl transition-transform select-none"
                  />
                </div>

                {/* Left/Prev Arrow Button */}
                <button
                  onClick={handlePrevPhoto}
                  title="Previous Photo (Left Arrow)"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#fa0079] text-white backdrop-blur-md transition-all active:scale-95 shadow-lg border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right/Next Arrow Button */}
                <button
                  onClick={handleNextPhoto}
                  title="Next Photo (Right Arrow)"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#fa0079] text-white backdrop-blur-md transition-all active:scale-95 shadow-lg border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Meta & Caption */}
              <div className="mt-3 pt-2 border-t border-[#5e002d]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-rose-100 font-['Cinzel',serif] block">
                    {selectedPhoto.title}
                  </span>
                  {selectedPhoto.caption && (
                    <p className="text-[11px] text-rose-300/80 mt-0.5">
                      {selectedPhoto.caption}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#fa0079]">
                    {selectedPhoto.artist || '@vespera.goth'}
                  </span>
                  {selectedPhoto.tags && (
                    <div className="flex items-center gap-1">
                      {selectedPhoto.tags.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#36001a] text-rose-300 border border-[#710037]/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
