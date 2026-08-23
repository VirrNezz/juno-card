import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardView } from './types';
import { GothicBackground } from './components/GothicBackground';
import { SocialCard } from './components/SocialCard';
import { FursonaCard } from './components/FursonaCard';
import { GalleryCard } from './components/GalleryCard';
import { NavigationControls } from './components/NavigationControls';
import { GothicMusicPlayer } from './components/GothicMusicPlayer';
import { Toast } from './components/Toast';
import { Sparkles, Moon, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<CardView>('social');
  const [direction, setDirection] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const viewOrder: CardView[] = ['social', 'fursona', 'gallery'];

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  const handleNavigate = useCallback(
    (nextView: CardView) => {
      const currentIndex = viewOrder.indexOf(activeView);
      const nextIndex = viewOrder.indexOf(nextView);
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setActiveView(nextView);
    },
    [activeView, viewOrder]
  );

  const handleNext = useCallback(() => {
    const currentIndex = viewOrder.indexOf(activeView);
    const nextIndex = (currentIndex + 1) % viewOrder.length;
    setDirection(1);
    setActiveView(viewOrder[nextIndex]);
  }, [activeView, viewOrder]);

  const handlePrev = useCallback(() => {
    const currentIndex = viewOrder.indexOf(activeView);
    const prevIndex = (currentIndex - 1 + viewOrder.length) % viewOrder.length;
    setDirection(-1);
    setActiveView(viewOrder[prevIndex]);
  }, [activeView, viewOrder]);

  // Keyboard navigation support for Desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Swipe animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between py-6 px-3 sm:px-6 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] text-rose-100 selection:bg-[#fa0079] selection:text-white">
      {/* Dynamic Animated Gothic Canvas & Ambient Lighting */}
      <GothicBackground activeView={activeView} />

      {/* Gothic Music Player with Volume, Pause/Play, Track Selection & Public Folder Audio */}
      <GothicMusicPlayer onShowToast={showToast} />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center">
        {/* Top Gothic Header Brand */}
        <header className="text-center mb-3 select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#230011]/90 border border-[#fa0079]/30 shadow-[0_0_15px_rgba(250,0,121,0.2)] mb-1">
            <Moon className="w-3.5 h-3.5 text-[#fa0079]" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-rose-200">
              Noctis Sanctuary
            </span>
            <Sparkles className="w-3 h-3 text-[#d30066]" />
          </div>
        </header>

        {/* Floating Top Navigation Controls */}
        <NavigationControls
          activeView={activeView}
          onNavigate={handleNavigate}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Interactive Swipeable Card Container */}
        <div className="w-full relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeView}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -60 || velocity.x < -500) {
                  handleNext();
                } else if (swipe > 60 || velocity.x > 500) {
                  handlePrev();
                }
              }}
              className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {activeView === 'social' && (
                <SocialCard
                  onShowToast={showToast}
                  onNavigateToFursona={() => handleNavigate('fursona')}
                />
              )}

              {activeView === 'fursona' && (
                <FursonaCard
                  onShowToast={showToast}
                  onNavigateToSocial={() => handleNavigate('social')}
                />
              )}

              {activeView === 'gallery' && (
                <GalleryCard onShowToast={showToast} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Gothic Footer */}
      <footer className="relative z-10 mt-8 mb-2 text-center text-xs text-rose-400/60 font-mono select-none">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-rose-300/80">
          <span>Crafted with</span>
          <span>Dark System Operation</span>
        </div>
        <p className="text-[11px] text-rose-400/50">
          © {new Date().getFullYear()} Sun3ss 404 Not Found • BlackPaw Teams
        </p>
      </footer>

      {/* Global Toast Feedback Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
