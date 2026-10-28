import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        md: "56px",
      },
      screens: {
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: "#0B3B6E",
          blue: "#0A7BDB",
          blueDark: "#0A57A3",
          blueLight: "#0A94F0",
          sky: "#F0F8FF",
          ink: "#0A0A0A",
          muted: "#5B6B7B",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #0A57A3 0%, #0A94F0 100%)",
      },
      borderRadius: {
        button: "8px",
        card: "16px",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
