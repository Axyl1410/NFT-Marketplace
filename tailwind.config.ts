import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: "475px",
      },
      colors: {
        background: {
          DEFAULT: "#f4f4f4",
          dark: "#15171b",
        },
        text: {
          DEFAULT: "#070b28",
          dark: "#ededed",
        },
        nav: {
          DEFAULT: "#ededed",
          dark: "#1a2230",
        },
        border: {
          DEFAULT: "#e8e8e8",
          dark: "#29282e",
        },
        link: {
          DEFAULT: "#4479e2",
        },
        linkShade: {
          DEFAULT: "#ebeff8",
        },
        bluebg: {
          DEFAULT: "#ededed",
          dark: "#1a2230",
        },
        textSecondary: {
          DEFAULT: "#4f576c",
          dark: "#98a1b6",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
