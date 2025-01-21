import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        bannerImg : "url('/pexels-photo.jpg')"

      },
      screens: {
        'xs': '340px',
        // => @media (min-width: 640px) { ... }
  
        'sm': '640px',
        // => @media (min-width: 1024px) { ... }
  
        'md': '768px',
        'lg':'1024px',
        'xl' : '1280px'
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
