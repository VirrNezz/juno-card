import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<any>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Dark ambient harmonic frequencies (Gothic Minor / Phrygian chords)
        const freqs = [110, 164.81, 220, 261.63]; // A2, E3, A3, C4
        const oscs: OscillatorNode[] = [];

        freqs.forEach((f, index) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const oscGain = ctx.createGain();

          osc.type = index % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          // Gentle vibrato LFO
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2 + index * 0.1, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
          
          if (panner) {
            panner.pan.setValueAtTime((index % 2 === 0 ? -0.4 : 0.4), ctx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(panner);
            panner.connect(masterGain);
          } else {
            osc.connect(oscGain);
            oscGain.connect(masterGain);
          }

          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio initialization error:', err);
      }
    } else {
      // Stop audio
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          oscNodesRef.current.forEach(osc => {
            try { osc.stop(); } catch(e){}
          });
          oscNodesRef.current = [];
          setIsPlaying(false);
        }, 300);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      oscNodesRef.current.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
      id="btn-sound-toggle"
      onClick={toggleSound}
      title={isPlaying ? 'Mute Gothic Ambient Drone' : 'Play Velvet Gothic Atmosphere'}
      className={`fixed top-4 right-4 z-40 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 active:scale-90 ${
        isPlaying
          ? 'bg-[#fa0079] text-white border-[#fa0079] shadow-[0_0_16px_rgba(250,0,121,0.8)]'
          : 'bg-[#230011]/80 text-rose-300 hover:text-white border-[#710037]/50 hover:border-[#fa0079]'
      }`}
    >
      {isPlaying ? (
        <div className="flex items-center gap-1.5 px-1">
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase hidden sm:inline">Ambience ON</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-1">
          <VolumeX className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase hidden sm:inline">Ambience</span>
        </div>
      )}
    </button>
  );
};
