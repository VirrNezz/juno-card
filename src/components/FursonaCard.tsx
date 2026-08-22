import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Moon, 
  Flame, 
  Eye, 
  Feather,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ArrowLeft
} from 'lucide-react';
import { OC_DATA, PROFILE_INFO } from '../data/portfolioData';

interface FursonaCardProps {
  onShowToast: (msg: string) => void;
  onNavigateToSocial?: () => void;
}

export const FursonaCard: React.FC<FursonaCardProps> = ({ onShowToast, onNavigateToSocial }) => {
  const [isLoreExpanded, setIsLoreExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'abilities'>('profile');

  return (
    <div className="w-full max-w-[480px] sm:max-w-[540px] mx-auto">
      {/* Outer Gothic Fursona Master Card */}
      <div 
        id="gothic-fursona-card"
        className="relative rounded-3xl p-5 sm:p-7 backdrop-blur-xl border border-[#e7006f]/30 shadow-[0_10px_45px_rgba(45,0,22,0.85),0_0_35px_rgba(250,0,121,0.2)] overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(165deg, rgba(62,0,30,0.9) 0%, rgba(35,0,17,0.94) 45%, rgba(18,0,9,0.98) 100%)',
        }}
      >
        {/* Ornate Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fa0079] to-transparent opacity-90" />
        <div className="absolute top-1/4 right-0 w-48 h-48 bg-[#fa0079]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-[#850040]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar with Navigation Back */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
          <button
            id="btn-back-to-socials"
            onClick={onNavigateToSocial}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#36001a]/80 hover:bg-[#5e002d] text-rose-200 hover:text-white border border-[#fa0079]/30 text-xs font-medium transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Socials</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#850040]/50 border border-[#fa0079]/40 text-rose-100 shadow-inner">
            <Moon className="w-3 h-3 text-[#fa0079]" />
            <span>OC Dossier • Ref Sheet</span>
          </div>
        </div>

        {/* Hero Character Portrait & Badges */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] rounded-2xl p-[2px] bg-gradient-to-tr from-[#fa0079] via-[#850040] to-[#230011] shadow-[0_8px_30px_rgba(250,0,121,0.25)] overflow-hidden">
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#120009]">
              <img
                src={PROFILE_INFO.fursonaImage}
                alt={OC_DATA.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Vignette over artwork */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120009] via-transparent to-black/30 pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#120009]/80 backdrop-blur-md border border-[#fa0079]/50 text-[11px] font-mono text-rose-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#fa0079]" />
                {OC_DATA.alignment}
              </div>

              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#120009]/80 backdrop-blur-md border border-[#c0005c]/40 text-[11px] font-mono text-rose-200">
                {OC_DATA.pronouns}
              </div>
            </div>
          </div>

          {/* Fursona Name & Species */}
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-[#fa0079]">
              {OC_DATA.name}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-[#e7006f] font-mono mt-0.5">
              {OC_DATA.alias}
            </p>
            <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#4a0024]/80 text-rose-200 border border-[#850040]">
              🐾 {OC_DATA.species}
            </div>
          </div>

          {/* Sub Navigation Tabs inside Fursona Card */}
          <div className="w-full flex items-center justify-center gap-1.5 mt-4 p-1 rounded-xl bg-[#230011]/90 border border-[#5e002d]/50">
            {[
              { id: 'profile', label: 'Dossier', icon: Bookmark },
              { id: 'abilities', label: 'Abilities', icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`btn-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#850040] to-[#fa0079] text-white shadow-md font-semibold'
                      : 'text-rose-300/70 hover:text-rose-100 hover:bg-[#36001a]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Profile & Lore Dossier */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 mt-4 space-y-3.5"
          >
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#230011]/70 border border-[#5e002d]/40">
                <span className="text-[10px] text-rose-400/60 uppercase font-mono block">Height & Wings</span>
                <span className="font-semibold text-rose-100 font-mono mt-0.5 block">{OC_DATA.height}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#230011]/70 border border-[#5e002d]/40">
                <span className="text-[10px] text-rose-400/60 uppercase font-mono block">Moon Birthday</span>
                <span className="font-semibold text-rose-100 font-mono mt-0.5 block">{OC_DATA.birthday}</span>
              </div>
            </div>

            {/* Short Bio Card */}
            <div className="p-3.5 rounded-2xl bg-[#2e0016]/75 border border-[#710037]/50 shadow-inner">
              <span className="text-[11px] font-bold text-[#fa0079] uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5">
                <Flame className="w-3.5 h-3.5" /> Character Bio
              </span>
              <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed font-normal">
                {OC_DATA.shortBio}
              </p>
            </div>

            {/* Expandable Lore */}
            <div className="rounded-2xl bg-[#230011]/80 border border-[#5e002d]/50 overflow-hidden">
              <button
                onClick={() => setIsLoreExpanded(!isLoreExpanded)}
                className="w-full p-3 flex items-center justify-between text-xs font-semibold text-rose-200 hover:text-white transition-colors text-left"
              >
                <span className="flex items-center gap-1.5 font-mono text-[#e7006f]">
                  <Moon className="w-3.5 h-3.5" /> Nocturnal Lore & Origin
                </span>
                {isLoreExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isLoreExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-3.5 pb-3.5 text-xs text-rose-200/80 leading-relaxed border-t border-[#4a0024]/60 pt-2.5"
                >
                  <p className="italic font-serif text-[13px] text-rose-100/90 mb-2">
                    &ldquo;{OC_DATA.lore}&rdquo;
                  </p>
                </motion.div>
              )}
            </div>

            {/* Personality Badges */}
            <div>
              <span className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider font-mono block mb-2">
                Personality Matrix
              </span>
              <div className="flex flex-wrap gap-1.5">
                {OC_DATA.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#36001a]/90 text-rose-200 border border-[#850040]/50"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Likes / Dislikes */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-3 rounded-xl bg-[#230011]/80 border border-[#5e002d]/40">
                <span className="text-[11px] font-bold text-[#fa0079] font-mono block mb-1.5">🖤 Likes</span>
                <ul className="space-y-1 text-rose-200/80 text-[11px]">
                  {OC_DATA.likes.slice(0, 4).map((l, i) => (
                    <li key={i}>• {l}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#230011]/80 border border-[#5e002d]/40">
                <span className="text-[11px] font-bold text-rose-400 font-mono block mb-1.5">✖ Dislikes</span>
                <ul className="space-y-1 text-rose-300/70 text-[11px]">
                  {OC_DATA.dislikes.slice(0, 4).map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reference Sheet Notes */}
            <div className="p-3 rounded-2xl bg-[#230011]/80 border border-[#710037]/50">
              <span className="text-[11px] font-bold text-[#e7006f] uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2">
                <Feather className="w-3.5 h-3.5" /> Artist Reference Notes
              </span>
              <ul className="space-y-1.5 text-xs text-rose-200/85">
                {OC_DATA.referenceNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#fa0079] font-bold mt-0.5">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Abilities & Power Attributes */}
        {activeTab === 'abilities' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 mt-4 space-y-3.5"
          >
            {/* Stat attribute meters */}
            <div className="p-3.5 rounded-2xl bg-[#230011]/80 border border-[#5e002d]/50 space-y-2.5">
              <span className="text-[11px] font-bold text-[#fa0079] uppercase tracking-wider font-mono block mb-1">
                Attributes & Affinity Meters
              </span>
              {OC_DATA.attributes.map((attr, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-rose-200">{attr.label}</span>
                    <span className="text-[#fa0079] font-bold">{attr.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#120009] border border-[#5e002d] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${attr.value}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#850040] via-[#c0005c] to-[#fa0079]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Specialized Abilities */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider font-mono block px-1">
                Gothic Spells & Hybrid Gifts
              </span>
              {OC_DATA.abilities.map((ability, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gradient-to-br from-[#2e0016] to-[#1a000d] border border-[#710037]/60 shadow-md"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-rose-100 font-['Cinzel',serif]">
                      {ability.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#850040] text-white">
                      {ability.affinity}
                    </span>
                  </div>
                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer Navigation Bar */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[#5e002d]/40 flex items-center justify-between gap-2">
          <button
            id="btn-return-social-card"
            onClick={onNavigateToSocial}
            className="w-full py-2.5 px-4 rounded-xl font-['Cinzel',serif] text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#4a0024] via-[#710037] to-[#850040] hover:from-[#5e002d] hover:to-[#980049] border border-[#fa0079]/30 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Social Profile Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
