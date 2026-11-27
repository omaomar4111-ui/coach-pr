// src/lib/designTokens.ts
/**
 * Centralized design tokens for CoachPR.
 * These values are the single source of truth for colors, fonts, etc.
 * White‑label tenants can override them at runtime via the branding API.
 */
export const DESIGN_TOKENS = {
  background: "#07060C",
  shell: "#090A0A",
  card: "#111116",
  surfaceElevated: "#1D1D22",
  border: "#24242B",
  primary: "#D4F60B",
  primaryForeground: "#090A0A",
  secondary: "#7C3AED",
  secondaryForeground: "#FFFFFF",
  textPrimary: "#F5F5F5",
  textSecondary: "#A1A1AA",
  chartMuted: "#3F4438",
} as const;
