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
        brand: {
          navy: "#0A1128",       // Azul-marinho profundo
          navyDark: "#050814",   // Fundo escuro/Contrastes
          gold: "#D4AF37",       // Dourado metálico
          goldHover: "#B8952B",  // Dourado escuro para hover
          slate: "#1C2541",      // Azul intermediário para cards
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-cinzel)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
