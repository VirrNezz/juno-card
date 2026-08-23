import { OCProfile, SocialLink, GalleryPhoto, GalleryInput } from '../types';
import avatarImg from '/images/juno-pfp.jpg';
import fursonaImg from '/images/juno-pict.png';

export const PROFILE_INFO = {
  name: 'Juno Quinn',
  handle: '@juno quinn',
  role: 'Fursuiters & Furry Artist',
  bio: "Waiting Juno's request for bio hehe",
  location: 'Indonesia',
  status: 'Commissions Open (2/5 slots)',
  statusColor: '#d30066',
  avatar: avatarImg,
  fursonaImage: fursonaImg,
  badges: ['Content Creator', 'Furry Illustrator', 'Furries Dancer', 'Phonk Lover'],
  stats: [
    { label: 'Followers', value: '19M' },
    { label: 'Creations', value: '148+' },
    { label: 'Vibe Level', value: '1%' },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'tiktok',
    platform: 'tiktok',
    title: 'TikTok',
    subtitle: 'Daily gothic vlogs, cosplay & speedpaints',
    username: '@quinn.fluff_',
    url: 'https://tiktok.com/@quinn.fluff_',
    followers: '1K+',
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
    username: '@juno.quinn_',
    url: 'https://instagram.com/juno.quinn_?igsi=aGcwMGplN2trNWM3',
    followers: '501',
    badge: 'Active Feed',
    isVerified: true,
    accentColor: '#c0005c',
    hoverGlow: 'rgba(192, 0, 92, 0.35)',
    actionText: 'View Grid',
  },
  {
    id: 'twitter',
    platform: 'twitter',
    title: 'Twitter / X',
    subtitle: 'Sketches, commission updates & daily thoughts',
    username: '@Quinn_Fluff',
    url: 'https://twitter.com/Quinn_Fluff',
    followers: 'Follow',
    badge: 'Social',
    accentColor: '#850040',
    hoverGlow: 'rgba(133, 0, 64, 0.45)',
    actionText: 'Connect',
  },
  {
    id: 'whatsapp',
    platform: 'whatsapp',
    title: 'Saluran WhatsApp',
    subtitle: 'Broadcast info, update art & pengumuman slot',
    username: 'Juno Queen Channel',
    url: 'https://whatsapp.com/channel/0029Vb39c0x1Xqub1Yn71y28',
    followers: 'Channel',
    badge: 'Updates',
    accentColor: '#25D366',
    hoverGlow: 'rgba(37, 211, 102, 0.35)',
    actionText: 'Join Channel',
  },
];

export const OC_DATA: OCProfile = {
  name: 'Juno Quinn',
  alias: 'Juno / Quinn',
  title: 'Artist, Performer, Voice Actor',
  species: 'Wolf Succubus',
  archetype: 'High Adrenaline On FullMoon',
  pronouns: 'She / They',
  height: "5'9\" (175 cm) / Wingspan: 9ft",
  alignment: 'Chaotic Enigmatic',
  birthday: 'October 31st (Blood Moon)',
  shortBio: '',
  lore: 'Dwelling in the forgotten obsidian towers of the Noctis Realm, Nyx was forged beneath a shattered crimson eclipse. Blessed with both wolf agility and bat acoustics, she wanders between the mortal veil and dreamscapes, protecting lost wanderers who seek beauty in the dark.',
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
 * 📸 ART & PHOTO GALLERY LIST (ISI 2 FOTO DENGAN JUDUL TERPISAH)
 * ══════════════════════════════════════════════════════════════════════════════════
 */
export const GALLERY_PHOTOS_RAW: GalleryInput[] = [
  {
    url: /images/juno-pict.png,
    title: 'Juno Photo',
    artist: '@juno.quinn_',
    caption: 'Full body Chiroptera reference sheet with glowing crimson markings.',
    tags: ['Fursona', 'Ref Sheet', 'PNG'],
  },
  {
    url: /images/juno-pfp.jpg,
    title: 'Juno Photo Profile',
    artist: '@juno.quinn_',
    caption: 'Velvet portrait in the midnight coven chamber.',
    tags: ['Avatar', 'Gothic', 'Portrait'],
  },
];

// Helper to normalize strings or objects into GalleryPhoto format
export const GALLERY_PHOTOS: GalleryPhoto[] = GALLERY_PHOTOS_RAW.map((item, index) => {
  if (typeof item === 'string') {
    let filename = `Photo ${index + 1}`;
    if (item.startsWith('/') || item.startsWith('http')) {
      const segments = item.split('/');
      const lastSegment = segments[segments.length - 1]?.split('?')[0];
      if (lastSegment && lastSegment.includes('.')) {
        filename = lastSegment.split('.')[0].replace(/[-_]/g, ' ');
      }
    }
    const capitalizedTitle = filename.charAt(0).toUpperCase() + filename.slice(1);
    return {
      id: `photo-item-${index + 1}`,
      title: capitalizedTitle,
      artist: '@juno.quinn_',
      url: item,
      caption: `Art piece from collection (${item})`,
      tags: ['Gallery', item.endsWith('.png') ? 'PNG' : 'Photo'],
    };
  }
  return {
    ...item,
    id: item.id || `photo-item-${index + 1}`,
    title: item.title || `Photo ${index + 1}`,
    artist: item.artist || '@juno.quinn_',
  };
});
