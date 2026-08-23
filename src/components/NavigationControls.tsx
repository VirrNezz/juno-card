import React from 'react';
import { ChevronLeft, ChevronRight, User, Sparkles, Image as ImageIcon } from 'lucide-react';
import { CardView } from '../types';

interface NavigationControlsProps {
  activeView: CardView;
  onNavigate: (view: CardView) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  activeView,
  onNavigate,
  onPrev,
  onNext,
}) => {
  const views: { id: CardView; label: string; icon: any }[] = [
    { id: 'social', label: 'Social Profile', icon: User },
    { id: 'fursona', label: 'OC / Fursona', icon: Sparkles },
    { id: 'gallery', label: 'Art Gallery', icon: ImageIcon },
  ];

  return (
    <>
      {/* Top Floating Glass Navigation Tabs (Universal for both desktop and mobile) */}
      <nav 
        aria-label="Portfolio sections"
        className="w-full max-w-[480px] sm:max-w-[540px] mx-auto mb-4 px-2 select-none"
      >
        <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#230011]/85 backdrop-blur-xl border border-[#fa0079]/30 shadow-[0_4px_20px_rgba(20,0,10,0.6)]">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = activeView === v.id;
            return (
              <button
                key={v.id}
                id={`nav-tab-${v.id}`}
                onClick={() => onNavigate(v.id)}
                className={`relative flex-1 py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'text-white font-bold shadow-[0_0_15px_rgba(250,0,121,0.5)]'
                    : 'text-rose-300/70 hover:text-rose-100 hover:bg-[#36001a]/60'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#850040] via-[#c0005c] to-[#fa0079] -z-10 animate-fade-in" />
                )}
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-[#fa0079]'}`} />
                <span className="truncate">{v.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Left & Right Floating Arrows (Visible on sm/md/lg screens) */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-0 right-0 z-30 max-w-4xl mx-auto">
        <div className="relative w-full h-full flex items-center justify-between px-4 lg:px-0">
          {/* Left Arrow Button */}
          <button
            id="btn-desktop-prev"
            onClick={onPrev}
            aria-label="Previous card"
            title="Previous card (Left Arrow Key)"
            className="pointer-events-auto -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full flex items-center justify-center bg-[#230011]/90 hover:bg-[#850040] text-rose-200 hover:text-white border border-[#fa0079]/40 hover:border-[#fa0079] shadow-[0_0_20px_rgba(250,0,121,0.3)] transition-all duration-200 hover:scale-110 active:scale-95 group backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5 text-[#fa0079] group-hover:text-white" />
          </button>

          {/* Right Arrow Button */}
          <button
            id="btn-desktop-next"
            onClick={onNext}
            aria-label="Next card"
            title="Next card (Right Arrow Key)"
            className="pointer-events-auto translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full flex items-center justify-center bg-[#230011]/90 hover:bg-[#850040] text-rose-200 hover:text-white border border-[#fa0079]/40 hover:border-[#fa0079] shadow-[0_0_20px_rgba(250,0,121,0.3)] transition-all duration-200 hover:scale-110 active:scale-95 group backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 text-[#fa0079] group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Indicator & Swipe Instruction */}
      <div className="md:hidden flex flex-col items-center justify-center mt-4 space-y-2 select-none">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {views.map((v, i) => (
            <button
              key={v.id}
              onClick={() => onNavigate(v.id)}
              aria-label={`Go to ${v.label}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeView === v.id
                  ? 'w-6 bg-[#fa0079] shadow-[0_0_8px_rgba(250,0,121,0.8)]'
                  : 'w-2 bg-[#5e002d]'
              }`}
            />
          ))}
        </div>

        {/* Swipe helper text */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400/60">
          <span>←</span>
          <span>Geser layar / Swipe kiri & kanan</span>
          <span>→</span>
        </div>
      </div>
    </>
  );
};
