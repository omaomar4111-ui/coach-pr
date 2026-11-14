"use client";

import React, { useState } from "react";

interface ExerciseVisualAnatomyCardProps {
  exerciseName: string;
  primaryMuscle: string;
  techniqueNote?: string;
  tempo?: string;
  gifUrl?: string;
}

export default function ExerciseVisualAnatomyCard({
  exerciseName,
  primaryMuscle,
  techniqueNote,
  tempo,
  gifUrl,
}: ExerciseVisualAnatomyCardProps) {
  const [activeMode, setActiveMode] = useState<"gif" | "anatomy">("gif");

  // Determine standard GIF fallback if not directly passed
  const getAutoGifUrl = (): string => {
    if (gifUrl && !gifUrl.includes("unsplash.com")) return gifUrl;
    const lower = (exerciseName + " " + primaryMuscle).toLowerCase();
    if (lower.includes("bench") || lower.includes("صدر") || lower.includes("بنش") || lower.includes("chest")) {
      if (lower.includes("عالي") || lower.includes("incline")) {
        return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-incline-bench-press.gif";
      }
      if (lower.includes("كابل") || lower.includes("تفتيح") || lower.includes("fly")) {
        return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/cable-standing-fly.gif";
      }
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif";
    }
    if (lower.includes("lat") || lower.includes("سحب") || lower.includes("ظهر") || lower.includes("مجنص")) {
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/cable-lat-pulldown-full-range-of-motion.gif";
    }
    if (lower.includes("row") || lower.includes("بار سحب")) {
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/barbell-bent-over-row.gif";
    }
    if (lower.includes("squat") || lower.includes("اسكوات") || lower.includes("رجل") || lower.includes("فخذ")) {
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-clean-grip-front-squat.gif";
    }
    if (lower.includes("باي") || lower.includes("bicep") || lower.includes("curl")) {
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif";
    }
    if (lower.includes("تراي") || lower.includes("tricep") || lower.includes("pushdown")) {
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-pushdown-with-rope-attachment.gif";
    }
    if (lower.includes("كتف") || lower.includes("رفرفة") || lower.includes("lateral")) {
      return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-lateral-raise.gif";
    }
    return "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif";
  };

  const currentGif = getAutoGifUrl();

  const getMuscleTitle = (m: string) => {
    switch (m.toLowerCase()) {
      case "chest":
        return "عضلات الصدر (Pectoralis Major & Minor)";
      case "back":
      case "lats":
        return "عضلات الظهر والمجنص (Latissimus Dorsi)";
      case "legs":
      case "quads":
        return "الفخذ الأمامي (Quadriceps)";
      case "shoulders":
      case "side-delts":
      case "front-delts":
        return "عضلات الأكتاف (Deltoids)";
      case "biceps":
        return "عضلات البايسبس (Biceps Brachii)";
      case "triceps":
        return "عضلات الترايسبس (Triceps Brachii)";
      default:
        return "المجموعة العضلية المستهدفة";
    }
  };

  const isChest = primaryMuscle.includes("chest") || exerciseName.includes("صدر") || exerciseName.includes("بنش");
  const isBack = primaryMuscle.includes("lats") || primaryMuscle.includes("back") || exerciseName.includes("ظهر") || exerciseName.includes("سحب");
  const isLegs = primaryMuscle.includes("quads") || primaryMuscle.includes("legs") || exerciseName.includes("أرجل") || exerciseName.includes("اسكوات");
  const isArms = primaryMuscle.includes("biceps") || primaryMuscle.includes("triceps") || exerciseName.includes("باي") || exerciseName.includes("تراي");

  return (
    <div className="bg-[#0B0516] border border-purple-500/30 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
      {/* Switcher: Real Exercise Anatomy Loop (GIF) vs 3D Muscle Target Highlight */}
      <div className="flex items-center gap-1 bg-[#150A26] p-1 rounded-xl border border-white/[0.08] text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setActiveMode("gif")}
          className={`px-3 py-1 rounded-lg transition ${
            activeMode === "gif"
              ? "bg-[#7C3AED] text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          حركة التمرين الأناتومي (Loop GIF)
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("anatomy")}
          className={`px-3 py-1 rounded-lg transition ${
            activeMode === "anatomy"
              ? "bg-[#7C3AED] text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          خريطة تفعيل العضلة (3D Target)
        </button>
      </div>

      {/* Visual Display Container */}
      <div className="relative w-full max-w-[280px] h-60 bg-[#07030E] border border-white/[0.08] rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
        {activeMode === "gif" ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
              src={currentGif}
              alt={exerciseName}
              className="w-full h-full object-contain filter contrast-110"
              loading="lazy"
            />
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-purple-200 bg-black/80 px-2 py-0.5 rounded-full border border-purple-500/30">
              أناتومي الأداء الحركي (Anatomy Loop)
            </span>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              {/* Anatomical Torso Silhouette */}
              <path
                d="M50 35 C40 40, 30 55, 34 75 C38 88, 44 88, 48 78 L52 110 L50 145 L75 145 L78 115 L82 115 L85 145 L110 145 L108 110 L112 78 C116 88, 122 88, 126 75 C130 55, 120 40, 110 35 Z"
                fill="#180D2B"
                stroke="#3F1D6E"
                strokeWidth="1.5"
              />
              {/* Head & Neck */}
              <ellipse cx="80" cy="20" rx="12" ry="14" fill="#180D2B" stroke="#3F1D6E" strokeWidth="1.5" />

              {/* CHEST HIGHLIGHT */}
              {isChest && (
                <g className="animate-pulse">
                  <path d="M54 44 C65 42, 78 44, 78 68 C68 70, 52 66, 50 58 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                  <path d="M106 44 C95 42, 82 44, 82 68 C92 70, 108 66, 110 58 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              )}

              {/* BACK HIGHLIGHT */}
              {isBack && (
                <g className="animate-pulse">
                  <path d="M52 50 C46 68, 52 90, 68 98 L78 65 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                  <path d="M108 50 C114 68, 108 90, 92 98 L82 65 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              )}

              {/* LEGS HIGHLIGHT */}
              {isLegs && (
                <g className="animate-pulse">
                  <path d="M54 112 C50 125, 52 142, 60 152 L74 152 C76 138, 76 122, 74 112 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                  <path d="M106 112 C110 125, 108 142, 100 152 L86 152 C84 138, 84 122, 86 112 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              )}

              {/* ARMS HIGHLIGHT */}
              {isArms && (
                <g className="animate-pulse">
                  <path d="M34 65 C30 75, 30 92, 38 100 C44 100, 46 92, 44 80 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                  <path d="M126 65 C130 75, 130 92, 122 100 C116 100, 114 92, 116 80 Z" fill="#A78BFA" opacity="0.9" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              )}
            </svg>

            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#A78BFA] bg-black/80 px-2 py-0.5 rounded-full border border-purple-500/30">
              مجسم تفعيل الألياف (Target Muscle)
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold text-white block">{exerciseName}</span>
        <span className="text-[11px] text-[#A78BFA] font-bold block">{getMuscleTitle(primaryMuscle)}</span>
        {tempo && <span className="text-[10px] text-slate-400 font-mono block">التمبو وسرعة التكرار: {tempo}</span>}
      </div>

      {techniqueNote && (
        <p className="text-[11px] text-slate-300 leading-relaxed bg-[#120722] p-2.5 rounded-xl border border-white/[0.04]">
          💡 <b>توجيه التكنيك الصحيح:</b> {techniqueNote}
        </p>
      )}
    </div>
  );
}
