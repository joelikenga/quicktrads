import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand_red: "#E63946",
        brand_yellow: "#E9C46A",
        error_1: "#DC1827",
        error_2: "#FFF5F5",
        success_1: "#109368",
        success_2: "#F5FFFC",
        warning_1: "#BA8603",
        warning_2: "#FEFBF0",
        text_strong: "#141414",
        text_weak: "#525252",
        stroke_strong: "#7A7A7A",
        stroke_weak: "#F5F5F5",
        fill: "#FAFAFA",
        background: "#FFFFFF",
        switch_on: "#DDF8F0",
        text_weaker: "#B8B8B8",
        promotion_bg: "#DFDACF"
      },

      boxShadow: {
        'custom': '0px 8px 24px 0px rgba(20, 20, 20, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
