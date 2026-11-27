// tailwind.config.ts – Global design token integration for CoachPR
import type { Config } from "tailwindcss";

/**
 * Design tokens sourced from the official CoachPR color system.
 * These are exposed as CSS variables and mapped to Tailwind utilities.
 */
const designTokens = {
  "--cp-background": "#07060C",
  "--cp-shell": "#090A0A",
  "--cp-card": "#111116",
  "--cp-surface-elevated": "#1D1D22",
  "--cp-border": "#24242B",
  "--cp-primary": "#D4F60B",
  "--cp-primary-foreground": "#090A0A",
  "--cp-secondary": "#7C3AED",
  "--cp-secondary-foreground": "#FFFFFF",
  "--cp-text-primary": "#F5F5F5",
  "--cp-text-secondary": "#A1A1AA",
  "--cp-chart-muted": "#3F4438",
} as const;

export default <Config>{
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--cp-background)",
        shell: "var(--cp-shell)",
        card: "var(--cp-card)",
        surface: "var(--cp-surface-elevated)",
        border: "var(--cp-border)",
        primary: "var(--cp-primary)",
        "primary-foreground": "var(--cp-primary-foreground)",
        secondary: "var(--cp-secondary)",
        "secondary-foreground": "var(--cp-secondary-foreground)",
        "text-primary": "var(--cp-text-primary)",
        "text-secondary": "var(--cp-text-secondary)",
        "chart-muted": "var(--cp-chart-muted)",
      },
    },
  },
  plugins: [],
};
