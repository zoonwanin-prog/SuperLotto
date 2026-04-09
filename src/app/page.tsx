// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // เมื่อเข้าหน้าแรก (/) ระบบจะส่งผู้ใช้ไปที่หน้า /auth ทันที
  redirect('/auth');

  // ส่วนนี้จะไม่ถูกแสดงผล แต่ต้องมี return ไว้ตามโครงสร้าง React
  return null;
}
