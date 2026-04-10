// src/app/(auth)/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    // พื้นหลังโทนฟ้าเข้ม (Primary)
    <main className="min-h-screen bg-sky-950 flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* โลโก้ SuperLotto */}
      <div className="mb-10 text-center">
        <Link href="/">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter shadow-text">
            {/* Super สีแดง, Lotto สีเหลือง */}
            <span className="text-red-600">Super</span>
            <span className="text-yellow-400">Lotto</span>
          </h1>
        </Link>
        <p className="text-sky-200 mt-2 text-lg">ระบบซื้อหวยออนไลน์ มาตรฐานสากล</p>
      </div>

      {/* Component ฟอร์มที่เราเขียนไว้ */}
      <RegisterForm />

      {/* ลิงก์ไปหน้า Login */}
      <div className="mt-8 text-center text-sky-200">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/login" className="text-yellow-300 font-semibold hover:text-yellow-200 underline transition">
          เข้าสู่ระบบที่นี่
        </Link>
      </div>
    </main>
  );
}
