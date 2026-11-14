"use client";

import React, { useState } from "react";

interface InteractiveAnatomyModelProps {
  selectedMuscle: string;
  onSelectMuscle: (muscleId: string) => void;
  activeView: "front" | "back";
  onToggleView: (view: "front" | "back") => void;
}

export default function InteractiveAnatomyModel({
  selectedMuscle,
  onSelectMuscle,
  activeView,
  onToggleView,
}: InteractiveAnatomyModelProps) {
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);

  const isMuscleActive = (id: string) => selectedMuscle === id || hoveredMuscle === id;

  const getFillColor = (id: string) => {
    if (isMuscleActive(id)) {
      return "#A78BFA"; // Bright active royal purple glow
    }
    return "#2B1647"; // Dark anatomical muscle tone
  };

  const getStrokeColor = (id: string) => {
    if (isMuscleActive(id)) {
      return "#FFFFFF";
    }
    return "#582C8E";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#0A0514] border border-white/[0.06] rounded-3xl space-y-4">
      {/* Front / Back Toggle Buttons */}
      <div className="flex items-center gap-1.5 bg-[#140A24] p-1 rounded-2xl border border-white/[0.08] text-xs">
        <button
          type="button"
          onClick={() => onToggleView("front")}
          className={`px-4 py-1.5 rounded-xl font-bold transition ${
            activeView === "front"
              ? "bg-[#7C3AED] text-white shadow-md shadow-purple-950/60"
              : "text-slate-400 hover:text-white"
          }`}
        >
          مجسم أمامي (Front)
        </button>
        <button
          type="button"
          onClick={() => onToggleView("back")}
          className={`px-4 py-1.5 rounded-xl font-bold transition ${
            activeView === "back"
              ? "bg-[#7C3AED] text-white shadow-md shadow-purple-950/60"
              : "text-slate-400 hover:text-white"
          }`}
        >
          مجسم خلفي (Back)
        </button>
      </div>

      {/* SVG Anatomical Human Body Map */}
      <div className="relative w-64 h-96 flex items-center justify-center">
        <svg
          viewBox="0 0 200 320"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(124,58,237,0.25)] select-none cursor-pointer"
        >
          {/* Head & Neck Silhouette */}
          <ellipse cx="100" cy="22" rx="14" ry="17" fill="#1C1030" stroke="#4C267A" strokeWidth="1.5" />
          <path d="M94 38 L94 48 L106 48 L106 38 Z" fill="#1C1030" stroke="#4C267A" strokeWidth="1.5" />

          {activeView === "front" ? (
            // ==================== FRONT ANATOMICAL MUSCLES ====================
            <g>
              {/* Shoulders / Front Delts */}
              <path
                id="front-delts-left"
                d="M68 54 C60 56, 52 66, 54 78 C57 88, 64 88, 69 76 Z"
                fill={getFillColor("front-delts")}
                stroke={getStrokeColor("front-delts")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("front-delts")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("front-delts")}
              />
              <path
                id="front-delts-right"
                d="M132 54 C140 56, 148 66, 146 78 C143 88, 136 88, 131 76 Z"
                fill={getFillColor("front-delts")}
                stroke={getStrokeColor("front-delts")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("front-delts")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("front-delts")}
              />

              {/* Chest / Pectoralis Major */}
              <path
                id="chest-left"
                d="M72 54 L98 54 L98 84 C85 86, 70 82, 69 74 Z"
                fill={getFillColor("chest")}
                stroke={getStrokeColor("chest")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("chest")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("chest")}
              />
              <path
                id="chest-right"
                d="M102 54 L128 54 L131 74 C130 82, 115 86, 102 84 Z"
                fill={getFillColor("chest")}
                stroke={getStrokeColor("chest")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("chest")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("chest")}
              />

              {/* Biceps */}
              <path
                id="biceps-left"
                d="M52 82 C48 92, 48 108, 56 116 C62 116, 65 106, 62 92 Z"
                fill={getFillColor("biceps")}
                stroke={getStrokeColor("biceps")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("biceps")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("biceps")}
              />
              <path
                id="biceps-right"
                d="M148 82 C152 92, 152 108, 144 116 C138 116, 135 106, 138 92 Z"
                fill={getFillColor("biceps")}
                stroke={getStrokeColor("biceps")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("biceps")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("biceps")}
              />

              {/* Forearms */}
              <path d="M54 120 L46 150 L56 154 L62 122 Z" fill="#1F1235" stroke="#4C267A" strokeWidth="1" />
              <path d="M146 120 L154 150 L144 154 L138 122 Z" fill="#1F1235" stroke="#4C267A" strokeWidth="1" />

              {/* Abs & Core */}
              <g
                onMouseEnter={() => setHoveredMuscle("abs")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("abs")}
              >
                {/* 6-Pack grid segments */}
                <rect x="85" y="88" width="13" height="12" rx="2" fill={getFillColor("abs")} stroke={getStrokeColor("abs")} strokeWidth="1" />
                <rect x="102" y="88" width="13" height="12" rx="2" fill={getFillColor("abs")} stroke={getStrokeColor("abs")} strokeWidth="1" />
                <rect x="85" y="102" width="13" height="12" rx="2" fill={getFillColor("abs")} stroke={getStrokeColor("abs")} strokeWidth="1" />
                <rect x="102" y="102" width="13" height="12" rx="2" fill={getFillColor("abs")} stroke={getStrokeColor("abs")} strokeWidth="1" />
                <rect x="86" y="116" width="12" height="14" rx="2" fill={getFillColor("abs")} stroke={getStrokeColor("abs")} strokeWidth="1" />
                <rect x="102" y="116" width="12" height="14" rx="2" fill={getFillColor("abs")} stroke={getStrokeColor("abs")} strokeWidth="1" />
              </g>

              {/* Obliques / Flanks */}
              <path
                d="M72 88 C70 102, 72 118, 80 130 L82 124 C76 112, 75 98, 77 88 Z"
                fill={getFillColor("obliques")}
                stroke={getStrokeColor("obliques")}
                strokeWidth="1"
                onMouseEnter={() => setHoveredMuscle("obliques")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("obliques")}
              />
              <path
                d="M128 88 C130 102, 128 118, 120 130 L118 124 C124 112, 125 98, 123 88 Z"
                fill={getFillColor("obliques")}
                stroke={getStrokeColor("obliques")}
                strokeWidth="1"
                onMouseEnter={() => setHoveredMuscle("obliques")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("obliques")}
              />

              {/* Quads (Front Thighs) */}
              <path
                id="quads-left"
                d="M74 140 C68 160, 68 195, 78 220 L94 220 C96 195, 96 160, 94 140 Z"
                fill={getFillColor("quads")}
                stroke={getStrokeColor("quads")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("quads")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("quads")}
              />
              <path
                id="quads-right"
                d="M126 140 C132 160, 132 195, 122 220 L106 220 C104 195, 104 160, 106 140 Z"
                fill={getFillColor("quads")}
                stroke={getStrokeColor("quads")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("quads")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("quads")}
              />

              {/* Knees & Calves Front */}
              <ellipse cx="86" cy="227" rx="6" ry="5" fill="#1C1030" stroke="#4C267A" strokeWidth="1" />
              <ellipse cx="114" cy="227" rx="6" ry="5" fill="#1C1030" stroke="#4C267A" strokeWidth="1" />

              <path
                id="calves-left-front"
                d="M78 235 C74 250, 76 280, 84 295 L90 295 C92 280, 92 250, 90 235 Z"
                fill={getFillColor("calves")}
                stroke={getStrokeColor("calves")}
                strokeWidth="1"
                onMouseEnter={() => setHoveredMuscle("calves")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("calves")}
              />
              <path
                id="calves-right-front"
                d="M122 235 C126 250, 124 280, 116 295 L110 295 C108 280, 108 250, 110 235 Z"
                fill={getFillColor("calves")}
                stroke={getStrokeColor("calves")}
                strokeWidth="1"
                onMouseEnter={() => setHoveredMuscle("calves")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("calves")}
              />
            </g>
          ) : (
            // ==================== BACK ANATOMICAL MUSCLES ====================
            <g>
              {/* Traps (Trapezius) */}
              <path
                id="traps"
                d="M86 42 L114 42 L128 58 L100 86 L72 58 Z"
                fill={getFillColor("traps")}
                stroke={getStrokeColor("traps")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("traps")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("traps")}
              />

              {/* Rear Deltoids */}
              <path
                id="rear-delts-left"
                d="M68 54 C60 56, 52 66, 54 78 C58 84, 66 84, 70 76 Z"
                fill={getFillColor("rear-delts")}
                stroke={getStrokeColor("rear-delts")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("rear-delts")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("rear-delts")}
              />
              <path
                id="rear-delts-right"
                d="M132 54 C140 56, 148 66, 146 78 C142 84, 134 84, 130 76 Z"
                fill={getFillColor("rear-delts")}
                stroke={getStrokeColor("rear-delts")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("rear-delts")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("rear-delts")}
              />

              {/* Lats (Latissimus Dorsi V-Taper) */}
              <path
                id="lats-left"
                d="M72 76 C65 95, 70 115, 84 125 L98 90 Z"
                fill={getFillColor("lats")}
                stroke={getStrokeColor("lats")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("lats")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("lats")}
              />
              <path
                id="lats-right"
                d="M128 76 C135 95, 130 115, 116 125 L102 90 Z"
                fill={getFillColor("lats")}
                stroke={getStrokeColor("lats")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("lats")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("lats")}
              />

              {/* Triceps (Back of Arms) */}
              <path
                id="triceps-left"
                d="M50 82 C46 95, 48 112, 56 118 C60 116, 62 104, 60 90 Z"
                fill={getFillColor("triceps")}
                stroke={getStrokeColor("triceps")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("triceps")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("triceps")}
              />
              <path
                id="triceps-right"
                d="M150 82 C154 95, 152 112, 144 118 C140 116, 138 104, 140 90 Z"
                fill={getFillColor("triceps")}
                stroke={getStrokeColor("triceps")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("triceps")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("triceps")}
              />

              {/* Lower Back / Erector Spinae */}
              <path
                id="lower-back"
                d="M88 120 L112 120 L108 142 L92 142 Z"
                fill={getFillColor("lower-back")}
                stroke={getStrokeColor("lower-back")}
                strokeWidth="1"
                onMouseEnter={() => setHoveredMuscle("lower-back")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("lower-back")}
              />

              {/* Glutes */}
              <path
                id="glutes-left"
                d="M74 142 C68 155, 72 175, 96 175 L98 142 Z"
                fill={getFillColor("glutes")}
                stroke={getStrokeColor("glutes")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("glutes")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("glutes")}
              />
              <path
                id="glutes-right"
                d="M126 142 C132 155, 128 175, 104 175 L102 142 Z"
                fill={getFillColor("glutes")}
                stroke={getStrokeColor("glutes")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("glutes")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("glutes")}
              />

              {/* Hamstrings (Back of Thighs) */}
              <path
                id="hamstrings-left"
                d="M72 180 C68 200, 70 215, 80 225 L94 225 C96 210, 96 195, 94 180 Z"
                fill={getFillColor("hamstrings")}
                stroke={getStrokeColor("hamstrings")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("hamstrings")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("hamstrings")}
              />
              <path
                id="hamstrings-right"
                d="M128 180 C132 200, 130 215, 120 225 L106 225 C104 210, 104 195, 106 180 Z"
                fill={getFillColor("hamstrings")}
                stroke={getStrokeColor("hamstrings")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("hamstrings")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("hamstrings")}
              />

              {/* Calves (Back Gastrocnemius & Soleus) */}
              <path
                id="calves-left"
                d="M76 235 C70 255, 72 278, 82 295 L90 295 C92 280, 94 255, 90 235 Z"
                fill={getFillColor("calves")}
                stroke={getStrokeColor("calves")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("calves")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("calves")}
              />
              <path
                id="calves-right"
                d="M124 235 C130 255, 128 278, 118 295 L110 295 C108 280, 106 255, 110 235 Z"
                fill={getFillColor("calves")}
                stroke={getStrokeColor("calves")}
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredMuscle("calves")}
                onMouseLeave={() => setHoveredMuscle(null)}
                onClick={() => onSelectMuscle("calves")}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Selected Muscle Indicator Label */}
      <div className="text-center font-mono text-xs">
        <span className="text-slate-400 block text-[10px]">العضلة المحددة في المجسم:</span>
        <span className="text-white font-bold text-sm text-[#A78BFA]">
          {selectedMuscle.toUpperCase()} (اضغط على أي عضلة لاختيارها)
        </span>
      </div>
    </div>
  );
}
