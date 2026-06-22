import { CreatorProfileData } from './types';

export const INITIAL_PROFILE_DATA: CreatorProfileData = {
  displayName: "ZELO",
  tagline: "Tactical FPS Competitor & Minimalist Desk Stylist",
  bio: "Crafting beautiful desk aesthetics, mechanical keyboard acoustics, and securing headshots in Valorant & Apex Legends on TikTok. Bridging mechanical precision with premium brand sponsorships.",
  avatarUrl: "", // We can use an inline styled visual or allow generating
  tiktokHandle: "@zelo_gaming",
  businessEmail: "zelop301@gmail.com",
  stats: {
    followers: "245K",
    totalLikes: "8.2M",
    viewsPerMonth: "1.4M",
    engagement: "12.4%",
    brandCompletedCount: 24
  },
  links: [
    {
      id: "link-tiktok",
      title: "TikTok (Primary Content)",
      url: "https://www.tiktok.com/@zelo_gaming",
      iconName: "Tv",
      category: "social",
      colorClass: "from-rose-500 to-pink-600",
      isActive: true
    },
    {
      id: "link-twitch",
      title: "Twitch Live Stream",
      url: "https://www.twitch.tv/zelo_gaming",
      iconName: "Gamepad2",
      category: "social",
      colorClass: "from-violet-600 to-purple-600",
      isActive: true
    },
    {
      id: "link-youtube",
      title: "YouTube Shorts & Tech Reviews",
      url: "https://www.youtube.com/@zelo_gaming",
      iconName: "Youtube",
      category: "social",
      colorClass: "from-red-600 to-rose-600",
      isActive: true
    },
    {
      id: "link-instagram",
      title: "Workspace & Desk Styling IG",
      url: "https://www.instagram.com/zelo_gaming",
      iconName: "Instagram",
      category: "social",
      colorClass: "from-amber-500 to-orange-600",
      isActive: true
    },
    {
      id: "link-facebook",
      title: "Facebook Gaming Corner",
      url: "https://www.facebook.com/zelo_gaming",
      iconName: "Facebook",
      category: "social",
      colorClass: "from-blue-600 to-indigo-600",
      isActive: true
    },
    {
      id: "link-website",
      title: "Official Personal Website",
      url: "https://zelogaming.xo.je",
      iconName: "Globe",
      category: "social",
      colorClass: "from-cyan-500 to-blue-600",
      isActive: true
    },
    {
      id: "link-sponsor-form",
      title: "Sponsor Pitch & Media Proposal",
      url: "#sec-pitch",
      iconName: "Briefcase",
      category: "business",
      colorClass: "from-teal-500 to-emerald-600",
      isActive: true
    }
  ],
  gear: [
    {
      id: "gear-cpu",
      category: "PC Specification",
      name: "Processor",
      spec: "AMD Ryzen 9 7900X (12 Cores, 5.6GHz)"
    },
    {
      id: "gear-gpu",
      category: "PC Specification",
      name: "GPU (Graphics Card)",
      spec: "ASUS ROG RTX 4080 Super 16GB Edition"
    },
    {
      id: "gear-keyboard-1",
      category: "Peripheral",
      name: "Custom Keyboard",
      spec: "Wobkey Rainy75 (FR4 Plate, Linear, Sound-Modded)"
    },
    {
      id: "gear-keyboard-2",
      category: "Peripheral",
      name: "Competitive Keyboard",
      spec: "Wooting 60HE (Alumaze Case, Lekker Analog Sensors)"
    },
    {
      id: "gear-mouse",
      category: "Peripheral",
      name: "Ultra-Light Gaming Mouse",
      spec: "Logitech G Pro X Superlight 2 (White)"
    },
    {
      id: "gear-audio",
      category: "Audio/Video",
      name: "Studio Mic",
      spec: "Shure SM7B Cardioid Microphone"
    },
    {
      id: "gear-interface",
      category: "Audio/Video",
      name: "Audio Mixer",
      spec: "Elgato Wave XLR Interface"
    },
    {
      id: "gear-headphones",
      category: "Audio/Video",
      name: "Studio Headphones",
      spec: "Beyerdynamic DT 990 Pro (80 Ohm)"
    },
    {
      id: "gear-monitor",
      category: "Workspace",
      name: "Gaming Display",
      spec: "ASUS ROG PG27AQDM OLED 240Hz 0.03ms"
    },
    {
      id: "gear-monitor-side",
      category: "Workspace",
      name: "Auxiliary Display",
      spec: "LG UltraFine 27-inch IPS (Portrait Mode)"
    }
  ],
  clips: [
    {
      id: "clip-1",
      title: "Clutch 1v5 in Radiant Lobby with Custom Keyboard Acoustical Sound Test",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      likes: "42.8K",
      views: "340K",
      tiktokUrl: "https://tiktok.com"
    },
    {
      id: "clip-2",
      title: "Aesthetic Desk Transformation Challenge - Cyberpunk Neon Edition",
      thumbnailUrl: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=600&auto=format&fit=crop",
      likes: "88.1K",
      views: "1.2M",
      tiktokUrl: "https://tiktok.com"
    },
    {
      id: "clip-3",
      title: "My Wooting 60HE Hall-effect Rapid Trigger Settings for Ultimate Aim Assist",
      thumbnailUrl: "https://images.unsplash.com/photo-1618979268029-30dfbc6c478c?q=80&w=600&auto=format&fit=crop",
      likes: "21.5K",
      views: "215K",
      tiktokUrl: "https://tiktok.com"
    }
  ]
};
