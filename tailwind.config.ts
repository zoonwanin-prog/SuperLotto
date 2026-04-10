import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin"; // อย่าลืม import plugin

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // เพิ่ม Shadow ให้ Text
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 4px var(--tw-shadow-color)',
        lg: '4px 4px 8px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    // เพิ่ม Plugin สำหรับ textShadow
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'shadow-text': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
export default config;
