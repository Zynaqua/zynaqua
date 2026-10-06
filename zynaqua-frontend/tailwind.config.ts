import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: "#F7F5F1",
        surface: "#EAF4F6",
        footer: "#A1A1A8",
        fieldBorder: "#9A958D",
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#1FB958",
        },
        charcoal: {
          50: "#F7F5F1",
          100: "#E8E4DF",
          400: "#6B6B6B",
          700: "#3A3A3F",
          900: "#1A1A1A",
          950: "#0F0F10",
        },
        gold: {
          400: "#E8C574",
          500: "#D4A84B",
          600: "#B8860B",
          700: "#8A6508",
        },
        aqua: {
          50: "#EAF4F6",
          400: "#4FC3D9",
          500: "#2BA8C2",
          600: "#1E788B",
          700: "#17606F",
        },
      },

      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [],
};

export default config;