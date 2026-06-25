export interface SocialLink {
  id: string;
  title: string;
  url: string;
  iconName: string; // lucide icon name matching
  category: 'social' | 'gaming' | 'business';
  colorClass: string;
  isActive: boolean;
}

export interface GamingGear {
  id: string;
  category: 'PC Specification' | 'Peripheral' | 'Audio/Video' | 'Workspace';
  name: string;
  spec: string;
  usagePercent?: number;
  maintenanceStatus?: number;
}

export interface TikTokClip {
  id: string;
  title: string;
  thumbnailUrl: string;
  likes: string;
  views: string;
  tiktokUrl: string;
}

export interface CreatorStats {
  followers: string;
  totalLikes: string;
  viewsPerMonth: string;
  engagement: string;
  brandCompletedCount: number;
}

export interface BusinessInquiry {
  id: string;
  brandName: string;
  contactName: string;
  email: string;
  budget: string;
  pitch: string;
  packageType: string;
  status: 'Received' | 'Reviewing' | 'Accepted' | 'Declined';
  date: string;
  selectedPerks?: string[];
}

export interface CreatorProfileData {
  displayName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  tiktokHandle: string;
  businessEmail: string;
  stats: CreatorStats;
  links: SocialLink[];
  gear: GamingGear[];
  clips: TikTokClip[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

