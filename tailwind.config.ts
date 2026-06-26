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
        forsythia: "#FFC801",
        "deep-saffron": "#FF9932",
        nocturnal: "#114C5A",
        oceanic: "#172B36",
        arctic: "#F1F6F4",
        "mystic-mint": "#D9E8E2",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "badge-in": "badgeIn 200ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
