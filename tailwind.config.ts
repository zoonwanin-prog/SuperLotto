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
        // น้ำเงินเข้มที่คุณต้องการ
        primary: {
          DEFAULT: "#1e3a8a",
          dark: "#172554",
          light: "#3b82f6",
        },
        // เหลืองทองที่คุณต้องการ
        secondary: {
          DEFAULT: "#facc15",
          dark: "#eab308",
          light: "#fde047",
        },
      },
      fontSize: {
        // ตั้งค่า font size หลักเป็น 17px
        base: ['17px', '26px'], 
      },
    },
  },
  plugins: [],
};

export default config;
