═══════════════════════════════════════════════════════════════════════
🎵 PUBLIC MUSIC FOLDER: /public/music/
═══════════════════════════════════════════════════════════════════════
Taruh file audio lagu/musik Anda di folder ini!
Format yang didukung: .mp3, .wav, .ogg, .aac

Contoh file yang bisa Anda taruh:
- /music/velvet-nocturne.mp3
- /music/crimson-rose-requiem.mp3
- /music/lagu-favorit.mp3

Cara mengatur daftar putar di /src/data/musicPlaylist.ts:

export const PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'Judul Lagu Kamu',
    artist: 'Nama Artis',
    album: 'Nama Album',
    duration: 180, // detik
    coverUrl: '/images/cover.png',
    audioUrl: '/music/lagu-favorit.mp3',
    ...
  }
];
═══════════════════════════════════════════════════════════════════════
