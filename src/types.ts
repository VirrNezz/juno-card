export type CardView = 'social' | 'fursona' | 'gallery';

export interface SocialLink {
  id: string;
  platform: 'tiktok' | 'instagram' | 'discord' | 'twitter' | 'spotify' | 'twitch' | 'vgen' | 'email';
  title: string;
  subtitle: string;
  username: string;
  url: string;
  followers?: string;
  badge?: string;
  isVerified?: boolean;
  accentColor: string;
  hoverGlow: string;
  actionText?: string;
}

export interface OCAbility {
  name: string;
  description: string;
  type: string;
  affinity: string;
}

export interface OCProfile {
  name: string;
  alias: string;
  title: string;
  species: string;
  archetype: string;
  pronouns: string;
  height: string;
  alignment: string;
  birthday: string;
  lore: string;
  shortBio: string;
  personality: string[];
  likes: string[];
  dislikes: string[];
  abilities: OCAbility[];
  colorPalette: {
    hex: string;
    name: string;
    description: string;
  }[];
  attributes: {
    label: string;
    value: number; // 0 - 100
  }[];
  referenceNotes: string[];
}

export interface GalleryPhoto {
  id: string;
  title?: string;
  artist?: string;
  url: string; // direct path like /images/art.png, asset import, or URL
  caption?: string;
  tags?: string[];
}

// Support both simple string list like ["/images/art1.png", "/images/art2.jpg"] and objects
export type GalleryInput = string | GalleryPhoto;
