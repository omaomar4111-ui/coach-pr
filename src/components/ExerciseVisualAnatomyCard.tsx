"use client";

import React, { useState } from "react";
import Model, { IExerciseData } from "react-body-highlighter";

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
  const [modelSide, setModelSide] = useState<"anterior" | "posterior">("anterior");

  // Determine standard GIF fallback
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

  // Map Arabic/English muscle names to react-body-highlighter accepted slugs
  const getHighlighterMuscles = (): { muscles: string[]; side: "anterior" | "posterior"; titleAr: string } => {
    const text = (exerciseName + " " + primaryMuscle).toLowerCase();
    
    if (text.includes("chest") || text.includes("صدر") || text.includes("بنش") || text.includes("press")) {
      return { muscles: ["chest", "front-deltoids", "triceps"], side: "anterior", titleAr: "عضلات الصدر (Pectoralis Major) والترايسبس" };
    }
    if (text.includes("lat") || text.includes("سحب") || text.includes("ظهر") || text.includes("مجنص")) {
      return { muscles: ["upper-back", "biceps"], side: "posterior", titleAr: "عضلات الظهر والمجنص (Lats & Upper Back)" };
    }
    if (text.includes("row") || text.includes("تجديف")) {
      return { muscles: ["upper-back", "lower-back", "biceps", "trapezius"], side: "posterior", titleAr: "عضلات الظهر الأوسط والترابيس" };
    }
    if (text.includes("squat") || text.includes("اسكوات") || text.includes("quads") || text.includes("فخذ أمامي")) {
      return { muscles: ["quadriceps", "gluteal"], side: "anterior", titleAr: "الفخذ الأمامي (Quadriceps) والمقعدة" };
    }
    if (text.includes("hamstring") || text.includes("خلفي") || text.includes("ديدليفت") || text.includes("rdl")) {
      return { muscles: ["hamstring", "gluteal", "lower-back"], side: "posterior", titleAr: "الفخذ الخلفي (Hamstrings) وأسفل الظهر" };
    }
    if (text.includes("باي") || text.includes("biceps") || text.includes("curl")) {
      return { muscles: ["biceps", "forearm"], side: "anterior", titleAr: "عضلات البايسبس (Biceps Brachii)" };
    }
    if (text.includes("تراي") || text.includes("triceps") || text.includes("pushdown")) {
      return { muscles: ["triceps"], side: "posterior", titleAr: "عضلات الترايسبس (Triceps Brachii)" };
    }
    if (text.includes("كتف") || text.includes("delts") || text.includes("رفرفة")) {
      return { muscles: ["front-deltoids", "back-deltoids", "trapezius"], side: "anterior", titleAr: "عضلات الأكتاف (Deltoids)" };
    }
    if (text.includes("بطن") || text.includes("abs") || text.includes("core")) {
      return { muscles: ["abs", "obliques"], side: "anterior", titleAr: "عضلات البطن والجذع (Abs & Core)" };
    }

    return { muscles: ["chest"], side: "anterior", titleAr: "المجموعة العضلية المستهدفة" };
  };

  const muscleMeta = getHighlighterMuscles();
  const highlightData: IExerciseData[] = [
    {
      name: exerciseName,
      muscles: muscleMeta.muscles as any,
    },
  ];

  return (
    <div className="bg-[#0B0516] border border-purple-500/30 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
      {/* Switcher: Real Anatomy Loop (GIF) vs Professional 3D Muscle Anatomy Map */}
      <div className="flex items-center gap-1 bg-[#150A26] p-1 rounded-xl border border-white/[0.08] text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setActiveMode("gif")}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeMode === "gif"
              ? "bg-[#7C3AED] text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          حركة التمرين (Loop GIF)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveMode("anatomy");
            setModelSide(muscleMeta.side);
          }}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeMode === "anatomy"
              ? "bg-[#7C3AED] text-white shadow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          خريطة تشريح العضلات (3D Map)
        </button>
      </div>

      {/* Visual Display Container */}
      <div className="relative w-full max-w-[280px] h-64 bg-[#07030E] border border-white/[0.08] rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
        {activeMode === "gif" ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
              src={currentGif}
              alt={exerciseName}
              className="w-full h-full object-contain filter contrast-110"
              loading="lazy"
            />
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-purple-200 bg-black/80 px-2 py-0.5 rounded-full border border-purple-500/30">
              أناتومي الأداء الحركي (Loop)
            </span>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 bg-[#090412]">
            {/* Front / Back Toggle for Anatomy */}
            <div className="absolute top-2 left-2 z-10 flex gap-1 bg-black/70 p-0.5 rounded-lg border border-purple-500/20 text-[9px]">
              <button
                type="button"
                onClick={() => setModelSide("anterior")}
                className={`px-2 py-0.5 rounded ${modelSide === "anterior" ? "bg-[#7C3AED] text-white" : "text-slate-400"}`}
              >
                أمامي
              </button>
              <button
                type="button"
                onClick={() => setModelSide("posterior")}
                className={`px-2 py-0.5 rounded ${modelSide === "posterior" ? "bg-[#7C3AED] text-white" : "text-slate-400"}`}
              >
                خلفي
              </button>
            </div>

            <div className="w-40 h-56 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(167,139,250,0.35)]">
              <Model
                type={modelSide}
                data={highlightData}
                style={{ width: "9.5rem", padding: "0.2rem" }}
                bodyColor="#1F1235"
                highlightedColors={["#A78BFA", "#7C3AED"]}
              />
            </div>

            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#A78BFA] bg-black/80 px-2 py-0.5 rounded-full border border-purple-500/30">
              مجسم العضلات التشريحي المعتمد
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold text-white block">{exerciseName}</span>
        <span className="text-[11px] text-[#A78BFA] font-bold block">{muscleMeta.titleAr}</span>
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
