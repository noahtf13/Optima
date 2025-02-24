import type { Config } from "tailwindcss";
import { tokens } from './src/styles/tokens';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: tokens.colors.primary,
        gray: tokens.colors.gray,
      },
    },
  },
  darkMode: 'media',
  plugins: [],
} satisfies Config;
