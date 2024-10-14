import type { Config } from "tailwindcss";

const config: Config = {
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
        primary: "#4338ca",
        "primary-hover": "#312e81",
        //"primary-light": "#e0e7ff",
        //"primary-light-hover": "#c7d2fe",
        "primary-light": "#ede9fe",
        "primary-light-hover": "#ddd6fe",
      },
    },
  },
  plugins: [],
};
export default config;
