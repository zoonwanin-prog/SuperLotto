import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // บรรทัดนี้สำคัญมากเพื่อให้ Tailwind ทำงาน

const inter = Inter({ subsets: ["latin"] });

// ส่วนที่จัดการเรื่องหัวข้อเว็บ (SEO)
export const metadata: Metadata = {
  title: "SuperLotto - เว็บหวยออนไลน์อันดับหนึ่ง",
  description: "ระบบซื้อหวยออนไลน์ ปลอดภัย มั่นใจ 100%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.className} bg-slate-50 text-[17px] text-slate-900 antialiased`}>
        
        {/* --- ส่วนหัวของเว็บ (Navbar) --- */}
        <header className="bg-[#1e3a8a] text-[#facc15] p-4 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Super<span className="text-white">Lotto</span>
            </h1>
            <nav className="space-x-6 text-white font-medium">
              <a href="/" className="hover:text-[#facc15] transition-colors">หน้าแรก</a>
              <a href="/auth" className="bg-[#facc15] text-[#1e3a8a] px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                เข้าสู่ระบบ
              </a>
            </nav>
          </div>
        </header>

        {/* --- ส่วนเนื้อหาหลักที่เปลี่ยนไปตามแต่ละหน้า --- */}
        <main className="min-h-screen">
          {children} 
        </main>

        {/* --- ส่วนท้ายของเว็บ (Footer) --- */}
        <footer className="bg-slate-900 text-white p-10 text-center text-[15px] border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <p className="opacity-80">© 2026 SuperLotto Thai Online. All rights reserved.</p>
            <p className="mt-2 text-[#facc15] font-semibold">ระบบมั่นคง ปลอดภัย จ่ายจริง 100%</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
