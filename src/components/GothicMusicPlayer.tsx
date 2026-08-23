import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Music, 
  Disc, 
  ListMusic, 
  ChevronUp, 
  ChevronDown, 
  Sparkles
} from 'lucide-react';
import { PLAYLIST, Track } from '../data/musicPlaylist';

interface GothicMusicPlayerProps {
  onShowToast?: (msg: string) => void;
}

export const GothicMusicPlayer: React.FC<GothicMusicPlayerProps> = ({ onShowToast }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(PLAYLIST[0].duration);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const synthTimerRef = useRef<any>(null);

  const currentSong: Track = PLAYLIST[currentSongIndex] || PLAYLIST[0];

  // Stop procedural synth
  const stopProceduralSynth = useCallback(() => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      try {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      } catch (e) {}
    }
    setTimeout(() => {
      oscNodesRef.current.forEach((osc) => {
        try { osc.stop(); } catch (e) {}
      });
      oscNodesRef.current = [];
    }, 150);
  }, []);

  // Play procedural gothic synth fallback
  const startProceduralSynth = useCallback((song: Track) => {
    try {
      stopProceduralSynth();
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      const targetGain = isMuted ? 0 : volume * 0.08;
      masterGain.gain.setValueAtTime(targetGain, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const chords = song.chords || [110, 164.81, 220, 261.63];
      const oscs: OscillatorNode[] = [];

      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low-pass filter for gothic velvet tone
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 120, ctx.currentTime);

        // Vibrato / tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.3 + idx * 0.15, ctx.currentTime);
        lfoGain.gain.setValueAtTime(2.0, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);

        if (panner) {
          panner.pan.setValueAtTime(idx % 2 === 0 ? -0.45 : 0.45, ctx.currentTime);
          oscGain.connect(panner);
          panner.connect(masterGain);
        } else {
          oscGain.connect(masterGain);
        }

        osc.start();
        oscs.push(osc);
      });

      oscNodesRef.current = oscs;

      // Song progress timer simulation
      synthTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= song.duration) {
            handleNextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Synth playback failed:', err);
    }
  }, [volume, isMuted, stopProceduralSynth]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      stopProceduralSynth();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          startProceduralSynth(currentSong);
        });
      } else {
        startProceduralSynth(currentSong);
      }
      if (onShowToast) onShowToast(`🎵 Now Playing: ${currentSong.title}`);
    }
  };

  const handleNextSong = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % PLAYLIST.length;
    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);
    setDuration(PLAYLIST[nextIndex].duration);
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = PLAYLIST[nextIndex].audioUrl;
          audioRef.current.play().catch(() => {
            startProceduralSynth(PLAYLIST[nextIndex]);
          });
        } else {
          startProceduralSynth(PLAYLIST[nextIndex]);
        }
      }, 50);
    }
  }, [currentSongIndex, isPlaying, startProceduralSynth]);

  const handlePrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);
    setDuration(PLAYLIST[prevIndex].duration);
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = PLAYLIST[prevIndex].audioUrl;
          audioRef.current.play().catch(() => {
            startProceduralSynth(PLAYLIST[prevIndex]);
          });
        } else {
          startProceduralSynth(PLAYLIST[prevIndex]);
        }
      }, 50);
    }
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setDuration(PLAYLIST[index].duration);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = PLAYLIST[index].audioUrl;
        audioRef.current.play().catch(() => {
          startProceduralSynth(PLAYLIST[index]);
        });
      } else {
        startProceduralSynth(PLAYLIST[index]);
      }
    }, 50);
    if (onShowToast) onShowToast(`🎵 Playing: ${PLAYLIST[index].title}`);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : newVol * 0.08,
        audioCtxRef.current.currentTime
      );
    }
  };

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (audioRef.current) {
      audioRef.current.volume = newMute ? 0 : volume;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        newMute ? 0 : volume * 0.08,
        audioCtxRef.current.currentTime
      );
    }
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProceduralSynth();
    };
  }, [stopProceduralSynth]);

  return (
    <>
      {/* HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || currentSong.duration);
          }
        }}
        onEnded={handleNextSong}
        onError={() => {
          if (isPlaying) {
            startProceduralSynth(currentSong);
          }
        }}
      />

      {/* Floating Juno Playlist Pill / Bar */}
      <div className="fixed top-4 right-4 z-40 flex flex-col items-end">
        {/* Compact Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[#230011]/90 backdrop-blur-xl border border-[#fa0079]/40 shadow-[0_0_20px_rgba(250,0,121,0.35)] cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Animated Vinyl Disc Icon */}
          <div 
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#850040] via-[#c0005c] to-[#fa0079] flex items-center justify-center text-white shadow-md ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Disc className="w-4 h-4" />
          </div>

          {/* Song Name marquee text */}
          <div className="max-w-[90px] sm:max-w-[140px] truncate text-left pr-1">
            <div className="text-[11px] font-bold text-rose-100 truncate flex items-center gap-1 font-['Cinzel',serif]">
              {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-[#fa0079] animate-ping" />}
              {currentSong.title}
            </div>
            <div className="text-[9px] text-rose-300/70 truncate font-mono">
              {isPlaying ? currentSong.artist : 'Juno Playlist'}
            </div>
          </div>

          {/* Quick Play/Pause on Pill */}
          <button
            id="btn-pill-play"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-1.5 rounded-full bg-[#36001a] hover:bg-[#fa0079] text-rose-200 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Expand chevron */}
          <div className="text-rose-400/60 pr-1">
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </motion.div>

        {/* Expanded Juno Playlist Drawer / Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="mt-2 w-[310px] sm:w-[340px] rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#36001a]/95 via-[#230011]/98 to-[#120009] backdrop-blur-2xl border border-[#fa0079]/40 shadow-[0_15px_40px_rgba(20,0,10,0.85),0_0_30px_rgba(250,0,121,0.25)] select-none text-rose-100"
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between pb-3 border-b border-[#5e002d]/50">
                <div className="flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-[#fa0079]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-['Cinzel',serif]">
                    Juno Playlist
                  </span>
                </div>
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  title="Toggle Playlist"
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
                    showPlaylist
                      ? 'bg-[#fa0079] text-white border-[#fa0079]'
                      : 'bg-[#230011] text-rose-300 border-[#710037] hover:bg-[#36001a]'
                  }`}
                >
                  <ListMusic className="w-3 h-3" />
                  <span>Songs ({PLAYLIST.length})</span>
                </button>
              </div>

              {/* Playlist View or Now Playing View */}
              {showPlaylist ? (
                /* Song List (Jumlah track/song otomatis terhitung lewat PLAYLIST.length) */
                <div className="py-3 space-y-2 max-h-[240px] overflow-y-auto pr-1">
                  {PLAYLIST.map((s, idx) => {
                    const isSelected = idx === currentSongIndex;
                    return (
                      <div
                        key={s.id}
                        onClick={() => selectSong(idx)}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#850040] to-[#fa0079]/40 border border-[#fa0079] text-white'
                            : 'bg-[#230011]/80 hover:bg-[#36001a] border border-[#5e002d]/40 text-rose-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xs font-mono font-bold text-[#fa0079]">
                            0{idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate font-['Cinzel',serif]">
                              {s.title}
                            </div>
                            <div className="text-[10px] text-rose-300/70 truncate">
                              {s.artist}
                            </div>
                          </div>
                        </div>
                        {isSelected && isPlaying && (
                          <div className="flex items-center gap-0.5">
                            <span className="w-1 h-3 bg-[#fa0079] animate-pulse" />
                            <span className="w-1 h-4 bg-[#fa0079] animate-pulse delay-75" />
                            <span className="w-1 h-2 bg-[#fa0079] animate-pulse delay-150" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Now Playing Art & Meta */
                <div className="py-3 flex flex-col items-center text-center">
                  {/* Vinyl Album Art */}
                  <div className="relative group my-2">
                    <div 
                      className={`w-28 h-28 rounded-2xl p-1 bg-gradient-to-tr from-[#fa0079] via-[#850040] to-[#230011] shadow-[0_0_20px_rgba(250,0,121,0.3)] overflow-hidden transition-transform duration-500 ${
                        isPlaying ? 'scale-105' : ''
                      }`}
                    >
                      <img
                        src={currentSong.coverUrl}
                        alt={currentSong.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Glowing audio wave indicator */}
                    {isPlaying && (
                      <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#120009] border border-[#fa0079] text-[#fa0079]">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '5s' }} />
                      </div>
                    )}
                  </div>

                  {/* Song Titles */}
                  <h3 className="mt-2 text-sm font-extrabold font-['Cinzel',serif] text-rose-100 tracking-wide">
                    {currentSong.title}
                  </h3>
                  <p className="text-xs text-[#e7006f] font-mono mt-0.5">
                    {currentSong.artist}
                  </p>
                  <span className="text-[10px] text-rose-300/60 font-mono mt-0.5">
                    {currentSong.theme.vibe}
                  </span>

                  {/* Progress Slider */}
                  <div className="w-full mt-3.5 space-y-1">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={(e) => {
                        const newTime = parseFloat(e.target.value);
                        setCurrentTime(newTime);
                        if (audioRef.current) {
                          audioRef.current.currentTime = newTime;
                        }
                      }}
                      className="w-full h-1.5 rounded-lg appearance-none bg-[#230011] accent-[#fa0079] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-rose-300/70">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Main Playback Controls */}
                  <div className="w-full flex items-center justify-center gap-4 mt-2">
                    <button
                      id="btn-player-prev"
                      onClick={handlePrevSong}
                      title="Previous Song"
                      className="p-2 rounded-full bg-[#230011] hover:bg-[#36001a] text-rose-200 hover:text-white border border-[#710037]/50 active:scale-95 transition-all"
                    >
                      <SkipBack className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      id="btn-player-play-main"
                      onClick={togglePlay}
                      title={isPlaying ? 'Pause' : 'Play'}
                      className="p-3 rounded-full bg-gradient-to-tr from-[#850040] via-[#c0005c] to-[#fa0079] text-white shadow-[0_0_15px_rgba(250,0,121,0.6)] active:scale-90 transition-all hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      id="btn-player-next"
                      onClick={handleNextSong}
                      title="Next Song"
                      className="p-2 rounded-full bg-[#230011] hover:bg-[#36001a] text-rose-200 hover:text-white border border-[#710037]/50 active:scale-95 transition-all"
                    >
                      <SkipForward className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Volume Control Slider & Mute button */}
                  <div className="w-full flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#5e002d]/40">
                    <button
                      onClick={toggleMute}
                      title={isMuted ? 'Unmute' : 'Mute'}
                      className="text-rose-300 hover:text-[#fa0079] transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-24 sm:w-28 h-1 rounded-lg appearance-none bg-[#230011] accent-[#fa0079] cursor-pointer"
                    />

                    <span className="text-[10px] font-mono text-rose-300/70 w-7 text-right">
                      {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
