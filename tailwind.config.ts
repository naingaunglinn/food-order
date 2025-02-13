import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: '#ED1C24',
        gray: '#E0E0E0',
        blue: '#0047BB',
        'blue-link': '#0042EC'
      },
      fontFamily: {
        rubik: ['var(--font--rubik)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
