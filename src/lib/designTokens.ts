// src/lib/designTokens.ts
/**
 * Centralized design tokens for CoachPR.
 * These values are the single source of truth for colors, fonts, etc.
 * Separates brand colors from semantic UI and text tokens to prevent naming collisions.
 */
export const DESIGN_TOKENS = {
  // Core Surfaces
  background: "#07060C",
  shell: "#090A0A",
  card: "#111116",
  surfaceElevated: "#1D1D22",
  border: "#24242B",

  // Brand Accents
  brandLime: "#D4F60B",
  brandPurple: "#7C3AED",

  // Semantic Action Tokens
  primary: "#D4F60B",
  primaryForeground: "#090A0A",
  secondary: "#1D1D22",
  secondaryForeground: "#F5F5F5",

  // Typography & Content
  textPrimary: "#F5F5F5",
  textSecondary: "#A1A1AA",
  mutedForeground: "#A1A1AA",

  // Charts & Badges
  chartMuted: "#3F4438",
  accentPurple: "#7C3AED",
  accentPurpleForeground: "#FFFFFF",
} as const;
