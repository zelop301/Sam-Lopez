import { CreatorProfileData, FAQItem } from './types';

export const INITIAL_PROFILE_DATA: CreatorProfileData = {
  displayName: "Sammium Tech Industries",
  tagline: "Tactical FPS Competitor & Minimalist Desk Stylist",
  bio: "Crafting beautiful revolutionized desk setups, mechanical keyboard acoustics, and securing headshots in Valorant & Apex Legends on TikTok. Bridging mechanical precision with premium brand sponsorships.",
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
      spec: "AMD Ryzen 9 7900X (12 Cores, 5.6GHz)",
      usagePercent: 64,
      maintenanceStatus: 92
    },
    {
      id: "gear-gpu",
      category: "PC Specification",
      name: "GPU (Graphics Card)",
      spec: "ASUS ROG RTX 4080 Super 16GB Edition",
      usagePercent: 82,
      maintenanceStatus: 95
    },
    {
      id: "gear-keyboard-1",
      category: "Peripheral",
      name: "Custom Keyboard",
      spec: "Wobkey Rainy75 (FR4 Plate, Linear, Sound-Modded)",
      usagePercent: 45,
      maintenanceStatus: 88
    },
    {
      id: "gear-keyboard-2",
      category: "Peripheral",
      name: "Competitive Keyboard",
      spec: "Wooting 60HE (Alumaze Case, Lekker Analog Sensors)",
      usagePercent: 91,
      maintenanceStatus: 79
    },
    {
      id: "gear-mouse",
      category: "Peripheral",
      name: "Ultra-Light Gaming Mouse",
      spec: "Logitech G Pro X Superlight 2 (White)",
      usagePercent: 78,
      maintenanceStatus: 85
    },
    {
      id: "gear-audio",
      category: "Audio/Video",
      name: "Studio Mic",
      spec: "Shure SM7B Cardioid Microphone",
      usagePercent: 55,
      maintenanceStatus: 99
    },
    {
      id: "gear-interface",
      category: "Audio/Video",
      name: "Audio Mixer",
      spec: "Elgato Wave XLR Interface",
      usagePercent: 40,
      maintenanceStatus: 97
    },
    {
      id: "gear-headphones",
      category: "Audio/Video",
      name: "Studio Headphones",
      spec: "Beyerdynamic DT 990 Pro (80 Ohm)",
      usagePercent: 70,
      maintenanceStatus: 83
    },
    {
      id: "gear-monitor",
      category: "Workspace",
      name: "Gaming Display",
      spec: "ASUS ROG PG27AQDM OLED 240Hz 0.03ms",
      usagePercent: 88,
      maintenanceStatus: 94
    },
    {
      id: "gear-monitor-side",
      category: "Workspace",
      name: "Auxiliary Display",
      spec: "LG UltraFine 27-inch IPS (Portrait Mode)",
      usagePercent: 35,
      maintenanceStatus: 91
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
      title: "Revolutionized Desk Transformation Challenge - Cyberpunk Neon Edition",
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

export const FAQS_EN: FAQItem[] = [
  {
    category: 'Partnership',
    question: 'How do we get in touch for sponsored content or campaign integrations?',
    answer: 'You can submit an inquiry directly through our "Brand Inquiry / Pitch Engine" form below or email us at zelop301@gmail.com. Our partnership manager will respond with our media deck, rate sheet, and custom package proposals within 24–48 hours.'
  },
  {
    category: 'Deliverables',
    question: 'What are your typical turnaround times for custom reviews & short-form creation?',
    answer: 'Standard turnaround time is 7 to 14 business days from the receipt of the sample product, depending on the complexity of the video shot plan (such as detailed acoustic sound-tests, macro-lighting cinematic b-rolls, or multi-angle desk setups). Expedited production tracks are available on request.'
  },
  {
    category: 'Shipping/Hardware',
    question: 'Do you accept physical sample shipments, and what is your return policy?',
    answer: 'Yes, we accept physical shipments of keyboards, microphones, peripherals, and high-end desk lifestyle items for hands-on review. Please note that sample shipments are treated as studio evaluation units and are not returned unless pre-paid return shipment labels are provided in advance.'
  },
  {
    category: 'Deliverables',
    question: 'Can we request raw video deliverables or whitelisting advertising permissions?',
    answer: 'Absolutely. We offer licensing packages for raw 4K b-roll footage, separate detailed sound recordings, and Spark Ad authorization codes for paid social media magnification (TikTok Custom Identity, Instagram Partnership ads).'
  },
  {
    category: 'Partnership',
    question: 'Which product categories align best with your community audience?',
    answer: 'Our community has extremely high engagement in custom mechanical keyboards, high-end audiophile sound components (WAVE XLR, XLR Microphones, Studio Monitore), custom ergonomic office rigs, visual lighting systems (Nanoleaf, Hue, ambient panels), and clean tech workspace layout revolutionized structures.'
  }
];

export const FAQS_JA: FAQItem[] = [
  {
    category: '提携パートナー',
    question: 'スポンサー提携やキャンペーンの相談方法は？',
    answer: '下記の「ブランドお問合せ ＆ 提案エンジン」フォームから、または直接 zelop301@gmail.com までご連絡ください。案件担当者が24〜48時間以内にメディアデック、価格表、カスタム提案プランとともにご返信いたします。'
  },
  {
    category: '納品形式',
    question: '商品レビューやショート動画作成 of 標準的な納期は？',
    answer: 'サンプル到着後、通常7〜14営業日程度です（打鍵音質テスト、シネマティックなマクロBロール、マルチアングル配置など、高度な演出が含まれるため）。お急ぎの方向けの特急プランもご相談いただけます。'
  },
  {
    category: '配送・実機検証',
    question: '物理サンプルの発送や、その返却に関してのポリシーは？',
    answer: 'キーボード、マイク、その他周辺機器、およびデスク環境用ライフスタイル製品のサンプル受け入れを常時受け付けております。なお、サンプル品は実機評価ユニットとしてお預かりするため、事前に着払い返送ラベルのご提供がない限りご返却は致しかねます。'
  },
  {
    category: '納品形式',
    question: '動画素材の生データ提供、広告のホワイトリスト（Spark Ads）利用は可能ですか？',
    answer: 'はい、可能です。生データの4K Bロールフッテージ利用権、個別の高音質打鍵音ファイル、および広告用コード（TikTokカスタムID、Instagramタイアップ広告）のライセンスパッケージをご用意しております。'
  },
  {
    category: '提携パートナー',
    question: '視聴者層と最も親和性が高い製品カテゴリは何ですか？',
    answer: '当コミュニティでは、カスタムメカニカルキーボード、高音質オーディオ機材（WAVE XLR、コンデンサーマイク）、エルゴノミクスデスクチェアやデスクランプ、Nanoleafなどの部屋全体をおしゃれにする間接照明において抜群のエンゲージメントを誇ります。'
  }
];

