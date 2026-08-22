import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Copy, 
  ExternalLink, 
  Check, 
  Sparkles, 
  MapPin, 
  Share2, 
  Flame,
  BadgeCheck
} from 'lucide-react';
import { PROFILE_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { TikTokIcon, InstagramIcon, DiscordIcon, SpotifyIcon, VGenIcon } from './SocialIcons';

interface SocialCardProps {
  onShowToast: (msg: string) => void;
  onNavigateToFursona?: () => void;
}

export const SocialCard: React.FC<SocialCardProps> = ({ onShowToast, onNavigateToFursona }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, label: string, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onShowToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: 'Vespera Noctis | Gothic Portfolio',
        text: 'Check out Vespera Noctis - Gothic Artist & Furry Creator profile & socials!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Portfolio link copied to clipboard!');
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok':
        return <TikTokIcon className="w-5 h-5" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5" />;
      case 'discord':
        return <DiscordIcon className="w-5 h-5" />;
      case 'spotify':
        return <SpotifyIcon className="w-5 h-5" />;
      case 'vgen':
        return <VGenIcon className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-[480px] sm:max-w-[540px] mx-auto">
      {/* Outer Gothic Master Card */}
      <div 
        id="gothic-main-social-card"
        className="relative rounded-3xl p-5 sm:p-7 backdrop-blur-xl border border-[#fa0079]/25 shadow-[0_10px_40px_rgba(35,0,17,0.8),0_0_30px_rgba(250,0,121,0.15)] overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(165deg, rgba(54,0,26,0.88) 0%, rgba(35,0,17,0.92) 40%, rgba(18,0,9,0.96) 100%)',
        }}
      >
        {/* Top Accent Rim Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fa0079] to-transparent opacity-80" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fa0079]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#850040]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header Section: Profile & Moniker */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Bar with Share Action Button */}
          <div className="w-full flex items-center justify-end mb-2">
            <button
              id="btn-share-profile"
              onClick={handleShareProfile}
              title="Share Portfolio"
              className="p-2 rounded-full bg-[#36001a]/70 hover:bg-[#5e002d] text-rose-200 hover:text-white border border-[#fa0079]/20 transition-all duration-200 active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Avatar with Gothic Ring & Glow */}
          <div className="relative group my-2">
            {/* Outer pulsating ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#fa0079] via-[#c0005c] to-[#4a0024] opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500 animate-pulse" />
            
            {/* Ornate border frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-b from-[#fa0079] via-[#850040] to-[#230011] shadow-2xl overflow-hidden">
              <img
                src={PROFILE_INFO.avatar}
                alt={PROFILE_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
            </div>

            {/* Gothic Bat / Star Badge */}
            <div 
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#120009] border border-[#fa0079] text-[#fa0079] shadow-[0_0_10px_rgba(250,0,121,0.6)] cursor-pointer"
              title="View Fursona Dossier"
              onClick={onNavigateToFursona}
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          {/* Name & Moniker */}
          <div className="mt-3">
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
                {PROFILE_INFO.name}
              </h1>
              <BadgeCheck className="w-5 h-5 text-[#fa0079] drop-shadow-[0_0_6px_rgba(250,0,121,0.8)]" />
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-xs sm:text-sm font-medium text-[#e7006f] tracking-wide font-mono">
                {PROFILE_INFO.handle}
              </span>
              <span className="text-rose-400/40 text-xs">•</span>
              <span className="text-xs text-rose-300/80 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d30066]" />
                {PROFILE_INFO.location}
              </span>
            </div>
          </div>

          {/* Bio text */}
          <p className="mt-3 text-xs sm:text-sm text-rose-200/85 leading-relaxed max-w-md font-normal">
            {PROFILE_INFO.bio}
          </p>

          {/* Aesthetic tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
            {PROFILE_INFO.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#36001a]/80 text-rose-200 border border-[#850040]/40 shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Quick Stats Grid */}
          <div className="w-full grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-2xl bg-[#230011]/80 border border-[#5e002d]/40 text-center">
            {PROFILE_INFO.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-rose-100 font-mono tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] text-rose-300/60 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card In Card Section (Media Sosial Links) */}
        <div className="relative z-10 mt-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-300/70 font-mono flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#fa0079]" />
              Social Portals & Links
            </span>
            <span className="text-[11px] text-[#e7006f] font-mono">
              {SOCIAL_LINKS.length} Links
            </span>
          </div>

          {/* Nested Social Cards */}
          <div className="space-y-2.5">
            {SOCIAL_LINKS.map((link) => {
              const isCopied = copiedId === link.id;

              return (
                <motion.div
                  key={link.id}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group relative rounded-2xl p-3.5 sm:p-4 transition-all duration-300 border border-[#710037]/40 hover:border-[#fa0079]/70 overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(46,0,22,0.85) 0%, rgba(26,0,13,0.92) 100%)',
                    boxShadow: '0 4px 20px rgba(18,0,9,0.5)',
                  }}
                  onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                >
                  {/* Subtle inner hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 80% 50%, ${link.hoverGlow}, transparent 70%)`,
                    }}
                  />

                  {/* Left accent color strip */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: link.accentColor }}
                  />

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    {/* Left: Platform Icon & Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon container with gothic rim */}
                      <div 
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${link.accentColor} 0%, #230011 100%)`,
                          border: `1px solid ${link.accentColor}80`,
                        }}
                      >
                        {getSocialIcon(link.platform)}
                      </div>

                      {/* Titles and Subtitle */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-rose-100 tracking-tight truncate group-hover:text-white transition-colors">
                            {link.title}
                          </h3>
                          {link.isVerified && (
                            <BadgeCheck className="w-3.5 h-3.5 text-[#fa0079] shrink-0" />
                          )}
                          {link.badge && (
                            <span 
                              className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase text-white shadow-sm shrink-0"
                              style={{ backgroundColor: link.accentColor }}
                            >
                              {link.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-rose-300/70 truncate mt-0.5">
                          {link.subtitle}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono text-rose-200/90 font-medium">
                            {link.username}
                          </span>
                          {link.followers && (
                            <>
                              <span className="text-rose-400/40 text-[10px]">•</span>
                              <span className="text-[10px] text-rose-300/60 font-mono">
                                {link.followers}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions (Copy & Direct Arrow Link) */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Copy handle button */}
                      <button
                        type="button"
                        id={`btn-copy-${link.id}`}
                        title={`Copy ${link.username}`}
                        onClick={(e) => handleCopy(e, link.username, link.title, link.id)}
                        className="p-2 rounded-lg bg-[#36001a]/80 hover:bg-[#5e002d] text-rose-300 hover:text-white border border-[#710037]/50 transition-all active:scale-90"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-[#fa0079]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Direct visit button */}
                      <div className="p-2 rounded-lg bg-[#fa0079]/20 group-hover:bg-[#fa0079] text-[#fa0079] group-hover:text-white border border-[#fa0079]/40 transition-all duration-300 shadow-sm">
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner Button to OC / Fursona Card */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[#5e002d]/40 text-center">
          <button
            id="btn-switch-to-fursona-banner"
            onClick={onNavigateToFursona}
            className="w-full py-3 px-4 rounded-xl font-['Cinzel',serif] text-xs sm:text-sm font-bold tracking-widest uppercase text-white bg-gradient-to-r from-[#850040] via-[#c0005c] to-[#fa0079] hover:from-[#980049] hover:to-[#fa0079] shadow-[0_0_20px_rgba(250,0,121,0.4)] border border-[#fa0079]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,0,121,0.7)] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Explore Fursona & OC Dossier</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
          
          <p className="mt-2 text-[11px] text-rose-400/50 font-mono">
            Swipe left/right or use arrow buttons to navigate
          </p>
        </div>
      </div>
    </div>
  );
};
