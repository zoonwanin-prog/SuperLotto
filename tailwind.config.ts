import type { Config } from "tailwindcss";

const config: Config = {
  // *** เช็ค 3 บรรทัดนี้ให้ดี ถ้ามี src ต้องใส่ ./src/ นำหน้า ***
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // เพิ่มโทนสีน้ำเงิน-เหลืองไว้เรียกใช้ได้ง่ายๆ (Optional)
      colors: {
        primary: "#0f172a",
        accent: "#eab308",
      },
    },
  },
  plugins: [],
};
export default config;
