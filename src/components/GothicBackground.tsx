import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { CardView } from '../types';

interface GothicBackgroundProps {
  activeView: CardView;
}

export const GothicBackground: React.FC<GothicBackgroundProps> = ({ activeView }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Deteksi ukuran layar / device saat komponen dimuat atau di-resize
  useEffect(() => {
    const checkDevice = () => {
      // Menggunakanbreakpoint standar mobile (di bawah 768px atau sentuh)
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Generate random drifting ember particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? '#fa0079' : i % 3 === 1 ? '#d30066' : '#850040',
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  // URL Background khusus Desktop dan Mobile/Android/iOS dari client
  // Silakan ganti path string di bawah dengan nama file gambar asli kiriman client
  const desktopBgUrl = '/images/juno-bg-desktop.png'; 
  const mobileBgUrl = '/images/juno-bg-android.png';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Base background: Otomatis berubah gambar/gradient sesuai device (Desktop vs Mobile) */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out bg-cover bg-center"
        style={{
          // Jika client mengirim gambar khusus, aktifkan baris backgroundImage di bawah:
          // backgroundImage: `url(${isMobile ? mobileBgUrl : desktopBgUrl})`,
          
          // Fallback gradient khusus menyesuaikan device & activeView jika gambar belum di-upload:
          background: isMobile
            ? (activeView === 'fursona'
                ? 'radial-gradient(ellipse at top, #36001a 0%, #1a000d 70%, #0a0004 100%)'
                : 'radial-gradient(ellipse at bottom, #2d0016 0%, #1a000d 60%, #080003 100%)')
            : (activeView === 'fursona'
                ? 'radial-gradient(ellipse at top center, #4a0024 0%, #36001a 30%, #230011 65%, #100007 100%)'
                : activeView === 'gallery'
                ? 'radial-gradient(ellipse at bottom left, #5e002d 0%, #36001a 35%, #230011 70%, #0d0006 100%)'
                : 'radial-gradient(ellipse at top, #36001a 0%, #230011 40%, #15000a 75%, #0d0006 100%)'),
        }}
      />

      {/* Dynamic ambient color orbs based on the active view */}
      <motion.div
        animate={{
          x: activeView === 'fursona' ? 60 : activeView === 'gallery' ? -40 : 0,
          y: activeView === 'fursona' ? -30 : activeView === 'gallery' ? 50 : 0,
          scale: activeView === 'fursona' ? 1.2 : 1.0,
          opacity: activeView === 'fursona' ? 0.7 : 0.45,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute -top-32 -left-20 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, #fa0079 0%, #ac0053 45%, #4a0024 75%, transparent 100%)',
        }}
      />

      <motion.div
        animate={{
          x: activeView === 'fursona' ? -50 : activeView === 'gallery' ? 30 : 0,
          y: activeView === 'fursona' ? 40 : activeView === 'gallery' ? -30 : 0,
          scale: activeView === 'fursona' ? 1.15 : 1.0,
          opacity: activeView === 'fursona' ? 0.6 : 0.4,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute -bottom-40 -right-20 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #c0005c 0%, #710037 40%, #230011 80%, transparent 100%)',
        }}
      />

      <motion.div
        animate={{
          opacity: activeView === 'fursona' ? 0.5 : 0.25,
          scale: activeView === 'fursona' ? 1.3 : 0.9,
        }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[95px]"
        style={{
          background: 'radial-gradient(circle, #850040 0%, #36001a 60%, transparent 100%)',
        }}
      />

      {/* Gothic Ornate filigree in the top corners */}
      <svg
        className="absolute top-0 left-0 w-36 h-36 sm:w-48 sm:h-48 text-[#fa0079]/15 pointer-events-none"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0,0 L200,0 C170,30 140,80 130,130 C120,80 80,40 0,0 Z" opacity="0.3" />
        <path d="M0,0 Q60,60 0,160 Q70,90 160,0 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="45" cy="45" r="5" fill="#fa0079" opacity="0.6" />
        <path d="M0,80 Q40,40 80,0" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M25,25 Q70,40 40,70 Z" fill="currentColor" opacity="0.25" />
      </svg>

      <svg
        className="absolute top-0 right-0 w-36 h-36 sm:w-48 sm:h-48 text-[#fa0079]/15 pointer-events-none -scale-x-100"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0,0 L200,0 C170,30 140,80 130,130 C120,80 80,40 0,0 Z" opacity="0.3" />
        <path d="M0,0 Q60,60 0,160 Q70,90 160,0 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="45" cy="45" r="5" fill="#fa0079" opacity="0.6" />
        <path d="M0,80 Q40,40 80,0" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M25,25 Q70,40 40,70 Z" fill="currentColor" opacity="0.25" />
      </svg>

      {/* Subtle gothic grid / lace pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fa0079 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Drifting glowing gothic embers */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
          animate={{
            y: ['0%', '-40%', '0%'],
            x: ['0%', `${(p.id % 2 === 0 ? 1 : -1) * 20}%`, '0%'],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.3],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle dark vignette border */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(10,0,5,0.85)] pointer-events-none" />
    </div>
  );
};
