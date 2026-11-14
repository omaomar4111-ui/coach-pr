export interface RankTier {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  borderGlow: string;
  minPoints: number;
  badgeBg: string;
  perksAr: string[];
}

export const GAMIFIED_RANKS: RankTier[] = [
  {
    id: "bronze",
    nameAr: "برونزي (Bronze)",
    nameEn: "Bronze Warrior",
    icon: "🥉",
    color: "#CD7F32",
    borderGlow: "border-amber-700/50",
    minPoints: 0,
    badgeBg: "bg-amber-950/40 text-amber-300",
    perksAr: ["بداية الرحلة وتسجيل أول 5 تمرينات", "شارات الالتزام اليومية"]
  },
  {
    id: "silver",
    nameAr: "فضي (Silver)",
    nameEn: "Silver Striker",
    icon: "🥈",
    color: "#C0C0C0",
    borderGlow: "border-slate-400/50",
    minPoints: 500,
    badgeBg: "bg-slate-800 text-slate-200",
    perksAr: ["الوصول لـ 14 يوم التزام متواصل (Streak)", "فتح عداد PR كسر الأرقام الشخصية"]
  },
  {
    id: "gold",
    nameAr: "ذهبي (Gold)",
    nameEn: "Gold Beast",
    icon: "🥇",
    color: "#FFD700",
    borderGlow: "border-yellow-500/50",
    minPoints: 1200,
    badgeBg: "bg-yellow-950/40 text-yellow-300",
    perksAr: ["تسجيل أكثر من 50 تمرين بنجاح", "شارة الالتزام بالدايت 90%+"]
  },
  {
    id: "platinum",
    nameAr: "بلاتينيوم (Platinum)",
    nameEn: "Platinum Elite",
    icon: "💠",
    color: "#00E5FF",
    borderGlow: "border-cyan-500/50",
    minPoints: 2500,
    badgeBg: "bg-cyan-950/40 text-cyan-300",
    perksAr: ["إتمام 3 أشهر بدون انقطاع", "تحليل الزوايا الحركية بالفيديو غير المحدود"]
  },
  {
    id: "diamond",
    nameAr: "دايموند (Diamond)",
    nameEn: "Diamond Legend",
    icon: "💎",
    color: "#B9F2FF",
    borderGlow: "border-blue-400/60 shadow-[0_0_15px_rgba(185,242,255,0.3)]",
    minPoints: 5000,
    badgeBg: "bg-blue-950/50 text-blue-200",
    perksAr: ["كسر 15 رقم قياسي PR شخصي", "أولوية قصوى لمراجعة الفورم تشيك من الكابتن خلال 60 دقيقة"]
  },
  {
    id: "crown",
    nameAr: "كراون (Crown)",
    nameEn: "Crown Master",
    icon: "👑",
    color: "#FFB300",
    borderGlow: "border-amber-400/80 shadow-[0_0_25px_rgba(255,179,0,0.4)]",
    minPoints: 10000,
    badgeBg: "bg-amber-900/40 text-amber-200",
    perksAr: ["أعلى 1% من المتدربين والمدربين التزاماً", "ظهور اسم الكابتن واللاعب في صدارة Hall of Fame"]
  },
  {
    id: "ace-conqueror",
    nameAr: "كونكورر (Conqueror)",
    nameEn: "Grand Conqueror",
    icon: "🔥",
    color: "#FF1744",
    borderGlow: "border-red-500/90 shadow-[0_0_35px_rgba(255,23,68,0.5)]",
    minPoints: 20000,
    badgeBg: "bg-red-950/60 text-red-200",
    perksAr: ["لقب بطل النخبة CoachPRB Conqueror", "شهادة معتمدة موثقة في ملف المدرب واللاعب"]
  }
];

export interface CoachCertificate {
  id: string;
  title: string;
  issuingBody: string; // e.g. ISSA, NASM, ACE, IFBB
  year: number;
  verificationBadge: string;
  verified: boolean;
  publicClientInquiries: number;
}
