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
        // Deep charcoal / black — primary brand color
        charcoal: {
          50: "#f7f7f8",
          100: "#eeeef0",
          400: "#6b6b70",
          700: "#2b2b30",
          900: "#111113",
          950: "#0a0a0b",
        },

        // Warm gold — secondary / accent
        gold: {
          400: "#e8c574",
          500: "#d4af37",
          600: "#b8942a",
        },

        // Water blue / aqua — used sparingly
        aqua: {
          400: "#4fc3d9",
          500: "#2ba8c2",
          600: "#1e8ba3",
        },
      },

      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },

  plugins: [],
};

export default config;