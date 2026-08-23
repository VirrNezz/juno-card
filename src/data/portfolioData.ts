import { OCProfile, SocialLink, GalleryPhoto, GalleryInput } from '../types';
import avatarImg from '/images/juno-pfp.jpg';
import fursonaImg from '/images/juno-pict.png';

export const PROFILE_INFO = {
  name: 'Vespera Noctis',
  handle: '@vespera.goth',
  role: 'Gothic Digital Artist & Furry Creator',
  bio: 'Dwelling in the crimson mist. Illustrating dark fantasies, gothic fursonas & velvet dreams. 🦇✨',
  location: 'Elysium / Shadow Realm',
  status: 'Commissions Open (2/5 slots)',
  statusColor: '#d30066',
  avatar: avatarImg,
  fursonaImage: fursonaImg,
  badges: ['Gothic Creator', 'Furry Illustrator', 'Vampiric Aesthetic', 'Darkwave Lover'],
  stats: [
    { label: 'Followers', value: '62.4K' },
    { label: 'Creations', value: '148+' },
    { label: 'Vibe Level', value: '100% Goth' },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'tiktok',
    platform: 'tiktok',
    title: 'TikTok',
    subtitle: 'Daily gothic vlogs, cosplay & speedpaints',
    username: '@vespera.goth',
    url: 'https://tiktok.com/@vespera.goth',
    followers: '43.9K',
    badge: 'Popular',
    isVerified: true,
    accentColor: '#fa0079',
    hoverGlow: 'rgba(250, 0, 121, 0.35)',
    actionText: 'Follow',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    title: 'Instagram',
    subtitle: 'HD art gallery, photoshoot dumps & sketches',
    username: '@vespera_noctis',
    url: 'https://instagram.com/vespera_noctis',
    followers: '18.5K',
    badge: 'Active Feed',
    isVerified: true,
    accentColor: '#c0005c',
    hoverGlow: 'rgba(192, 0, 92, 0.35)',
    actionText: 'View Grid',
  },
  {
    id: 'discord',
    platform: 'discord',
    title: 'Discord Server',
    subtitle: 'The Velvet Coven — Art hangout & commissions',
    username: 'discord.gg/velvetcoven',
    url: 'https://discord.gg/velvetcoven',
    followers: '1,420 members',
    badge: 'Community',
    accentColor: '#850040',
    hoverGlow: 'rgba(133, 0, 64, 0.45)',
    actionText: 'Join Coven',
  },
  {
    id: 'vgen',
    platform: 'vgen',
    title: 'VGen / Art Commissions',
    subtitle: 'Custom fursona ref sheets & gothic character art',
    username: 'vgen.co/vespera',
    url: 'https://vgen.co/vespera',
    followers: '★ 5.0 (48 Reviews)',
    badge: 'Slots Open',
    accentColor: '#d30066',
    hoverGlow: 'rgba(211, 0, 102, 0.4)',
    actionText: 'Order Art',
  },
  {
    id: 'spotify',
    platform: 'spotify',
    title: 'Midnight Darkwave Playlist',
    subtitle: 'Vampiric Synth, Post-Punk & Ethereal Goth',
    username: 'Playlist: Velvet Nocturne',
    url: 'https://open.spotify.com/playlist/gothic-velvet',
    badge: 'Now Playing',
    accentColor: '#5e002d',
    hoverGlow: 'rgba(94, 0, 45, 0.5)',
    actionText: 'Listen',
  },
];

export const OC_DATA: OCProfile = {
  name: 'Nyx Vespera',
  alias: 'The Velvet Stalker / Lunar Shade',
  title: 'Vampiric Shadow Bat-Wolf',
  species: 'Shadow Lupine x Chiroptera Hybrid',
  archetype: 'Gothic Night Sovereign',
  pronouns: 'She / They',
  height: "5'9\" (175 cm) / Wingspan: 9ft",
  alignment: 'Chaotic Enigmatic',
  birthday: 'October 31st (Blood Moon)',
  shortBio:
    'An ancient ethereal soul born from twilight shadows and crimson velvet. She weaves illusions through lunar vibrations and drinks rose-scented tea in abandoned gothic cathedrals.',
  lore:
    'Dwelling in the forgotten obsidian towers of the Noctis Realm, Nyx was forged beneath a shattered crimson eclipse. Blessed with both wolf agility and bat acoustics, she wanders between the mortal veil and dreamscapes, protecting lost wanderers who seek beauty in the dark.',
  personality: [
    'Mysterious & Elegant',
    'Deeply Loyal to Coven',
    'Nocturnal Dreamer',
    'Artistic Perfectionist',
    'Playful Sarcasm',
    'Soft for Sweet Pastries',
  ],
  likes: ['Crimson Roses', 'Darkwave & Organ Music', 'Silver Piercings', 'Midnight Rain', 'Earl Grey Tea', 'Old Book Smell'],
  dislikes: ['Direct Blinding Sunlight', 'Loud Engines', 'Silver Weaponry', 'Fake Promises', 'Cold Coffee'],
  colorPalette: [
    { hex: '#230011', name: 'Void Velvet', description: 'Primary base shadow coat & dark fur' },
    { hex: '#4a0024', name: 'Midnight Plum', description: 'Secondary wing membrane gradient' },
    { hex: '#850040', name: 'Crimson Blood', description: 'Eye iris, inner ears & silk ribbon' },
    { hex: '#c0005c', name: 'Gothic Rose', description: 'Chest fluff highlights & ear tips' },
    { hex: '#fa0079', name: 'Neon Thorn', description: 'Bioluminescent paw pads & magic runes' },
    { hex: '#ffffff', name: 'Silver Fang', description: 'Piercings, fangs & claw tips' },
  ],
  attributes: [
    { label: 'Agility & Flight', value: 94 },
    { label: 'Echolocation & Senses', value: 98 },
    { label: 'Dark Magic / Illusion', value: 88 },
    { label: 'Fluffiness', value: 100 },
    { label: 'Charm & Elegance', value: 92 },
  ],
  abilities: [
    {
      name: 'Crimson Veil (Shadow Form)',
      description: 'Dissolves into a swarm of luminous velvet bats to evade attacks or traverse locked spaces.',
      type: 'Movement',
      affinity: 'Blood Moon',
    },
    {
      name: 'Resonant Sonar Cry',
      description: 'Emits an ultrasonic wave that disorients foes and reveals hidden secrets across dark environments.',
      type: 'Sensory',
      affinity: 'Chiroptera',
    },
    {
      name: 'Thornbloom Enchantment',
      description: 'Summons ethereal black-and-magenta thorny vines that bind and pacify hostile entities.',
      type: 'Control',
      affinity: 'Flora Dark',
    },
  ],
  referenceNotes: [
    'Has 4 silver piercings on left ear, 2 on right ear',
    'Wing membranes have glowing magenta vein patterns in dark',
    'Eyes glow softly like hot embers under the moonlight',
    'Fluffy neck ruff made of ultra-soft obsidian wool',
    'Always wears a gothic lace choker with an onyx bat pendant',
  ],
};

/**
 * ══════════════════════════════════════════════════════════════════════════════════
 * 📸 ART & PHOTO GALLERY LIST
 * ══════════════════════════════════════════════════════════════════════════════════
 * CARA MENAMBAH FOTO BARU:
 * Anda bisa langsung memasukkan path foto (PNG, JPG, WEBP) dalam bentuk string:
 * 
 * Contoh:
 *   "/images/my_photo.png",
 *   "/images/fanart.jpg",
 *   "https://images.unsplash.com/...png"
 * 
 * Atau dalam format objek lengkap:
 *   { url: "/images/custom.png", title: "Midnight Bat", artist: "@vespera" }
 * ══════════════════════════════════════════════════════════════════════════════════
 */
export const GALLERY_PHOTOS_RAW: GalleryInput[] = [
  {
    id: 'photo-1',
    title: 'Nocturnal Sovereign - Official Fursona',
    artist: '@vespera.goth',
    url: fursonaImg,
    caption: 'Full body Chiroptera reference sheet with glowing crimson markings.',
    tags: ['Fursona', 'Ref Sheet', 'PNG'],
  },
  {
    id: 'photo-2',
    title: 'Gothic Vampire Silhouette',
    artist: '@vespera.goth',
    url: avatarImg,
    caption: 'Velvet portrait in the midnight coven chamber.',
    tags: ['Avatar', 'Gothic', 'Portrait'],
  },
  {
    id: 'photo-3',
    title: 'Crimson Rose in Dark Velvet',
    artist: 'Atmospheric Art',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    caption: 'Enchanted black rose glistening under the blood moon.',
    tags: ['Rose', 'Atmosphere', 'PNG'],
  },
  {
    id: 'photo-4',
    title: 'Cathedral Shadows & Obsidian Arch',
    artist: 'Gothic Architecture',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Ancient ruins lit by eerie celestial magenta lanterns.',
    tags: ['Cathedral', 'Aesthetic'],
  },
  {
    id: 'photo-5',
    title: 'Midnight Fog in Crimson Woods',
    artist: 'Darkwave Aesthetic',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    caption: 'The twilight path leading deeper into Noctis Sanctuary.',
    tags: ['Forest', 'Darkness'],
  },
  {
    id: 'photo-6',
    title: 'Vampiric Crystal & Thorns',
    artist: '@vespera.goth',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    caption: 'Glowing dark crystals harboring shadow magic.',
    tags: ['Crystal', 'Magic'],
  },
];

// Helper to normalize strings or objects into GalleryPhoto format
export const GALLERY_PHOTOS: GalleryPhoto[] = GALLERY_PHOTOS_RAW.map((item, index) => {
  if (typeof item === 'string') {
    // Generate clean title from filename
    const filename = item.split('/').pop()?.split('.')[0]?.replace(/[-_]/g, ' ') || `Photo ${index + 1}`;
    const capitalizedTitle = filename.charAt(0).toUpperCase() + filename.slice(1);
    return {
      id: `photo-item-${index + 1}`,
      title: capitalizedTitle,
      artist: '@vespera.goth',
      url: item,
      caption: `Art piece from /public/images/ (${item})`,
      tags: ['Gallery', item.endsWith('.png') ? 'PNG' : 'Photo'],
    };
  }
  return {
    ...item,
    id: item.id || `photo-item-${index + 1}`,
    title: item.title || `Photo ${index + 1}`,
    artist: item.artist || '@vespera.goth',
  };
});
