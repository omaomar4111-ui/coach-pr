// tailwind.config.ts – Global design token integration for CoachPR
import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Layout Surfaces
        background: "var(--cp-background)",
        shell: "var(--cp-shell)",
        card: "var(--cp-card)",
        surface: "var(--cp-surface-elevated)",
        border: "var(--cp-border)",

        // Brand Distinct Colors
        "brand-lime": "var(--cp-brand-lime)",
        "brand-purple": "var(--cp-brand-purple)",

        // Semantic Component Roles
        primary: {
          DEFAULT: "var(--cp-primary)",
          foreground: "var(--cp-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--cp-secondary)",
          foreground: "var(--cp-secondary-foreground)",
        },

        // Text & Content Hierarchy
        "text-primary": "var(--cp-text-primary)",
        "text-secondary": "var(--cp-text-secondary)",
        "muted-foreground": "var(--cp-muted-foreground)",

        // Charts
        "chart-muted": "var(--cp-chart-muted)",
      },
    },
  },
  plugins: [],
};
