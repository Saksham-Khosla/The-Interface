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
        bg: "#F3F1EA",
        surface: "#FAF9F5",
        ink: {
          DEFAULT: "#151513",
          2: "#6C6962",
          3: "#9A958E",
        },
        rule: {
          DEFAULT: "#CCC8BE",
          lt: "#E0DBD2",
        },
        cobalt: "#4165E8",
        lime: "#EFFFA5",
        blush: "#F5E5DF",
        "ti-purple": "#33278C",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        editorial: "1320px",
      },
      animation: {
        "fade-up": "fadeUp 0.38s ease 0.06s both",
        "blink": "blink 0.85s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
