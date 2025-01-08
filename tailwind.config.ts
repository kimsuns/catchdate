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
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".no-scrollbar": {
          "-webkit-scrollbar": "none",
          "-ms-overflow-style": "none" /* IE 10+ */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
} satisfies Config;
