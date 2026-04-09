/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  /* ตั้งค่าให้รองรับการแสดงผลรูปภาพจากภายนอก (เช่น โลโก้ธนาคาร หรือรูปโปรไฟล์) */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // รองรับรูปภาพที่เก็บใน Supabase Storage
      },
    ],
  },
  
  /* ช่วยให้ตรวจหาข้อผิดพลาดในโค้ดได้เข้มงวดขึ้นในช่วงพัฒนา */
  reactStrictMode: true,

  /* ปิด warning บางตัวเกี่ยวกับฟอนต์หรือสไตล์ที่อาจกวนใจใน console */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
