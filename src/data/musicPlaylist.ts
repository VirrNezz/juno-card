export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string; // url in /public/music/ or web URL
  theme: {
    accent: string;
    vibe: string;
  };
  // Fallback procedural gothic synth chord notes if file is not found
  chords: number[];
}

export const PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: '0_0',
    artist: 'Ilyhiryu',
    album: 'Juno Playlist',
    duration: 184,
    coverUrl: '/images/juno-song-cover-1.jfif',
    audioUrl: '/music/0_0.m4a',
    theme: {
      accent: '#fa0079',
      vibe: 'Phonk, Hardteck, More Adrenaline',
    },
    chords: [110, 164.81, 220, 261.63], // A minor / Phrygian
  },
  {
    id: 'track-2',
    title: 'Crimson Rose Requiem',
    artist: 'Nyx Shadow Wolves',
    album: 'Cathedral Shadows',
    duration: 215,
    coverUrl: '/src/assets/images/gothic_fursona_1787238760248.jpg',
    audioUrl: '/music/crimson-rose-requiem.mp3',
    theme: {
      accent: '#c0005c',
      vibe: 'Vampiric Post-Punk Bassline',
    },
    chords: [98, 146.83, 196, 246.94], // G minor / Aeolian
  },
  {
    id: 'track-3',
    title: 'Echoes of the Blood Moon',
    artist: 'Vespera Noctis',
    album: 'Lunar Eclipse EP',
    duration: 162,
    coverUrl: '/src/assets/images/gothic_fursona_1787238760248.jpg',
    audioUrl: '/music/echoes-of-blood-moon.mp3',
    theme: {
      accent: '#e7006f',
      vibe: 'Nocturnal Ambient Dream',
    },
    chords: [130.81, 196, 261.63, 311.13], // C minor / Ethereal
  },
];
