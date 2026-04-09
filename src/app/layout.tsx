import type { Metadata } from "next";
import { Inter } from "next/font/google"; // หรือใช้ฟอนต์ไทยที่คุณชอบ
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lotto Thai - เว็บหวยออนไลน์อันดับหนึ่ง",
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
        {/* คุณสามารถใส่ Navbar ไว้ตรงนี้เพื่อให้โชว์ทุกหน้า */}
        <header className="bg-[#1e3a8a] text-[#facc15] p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">LOTTO LOGO</h1>
            <nav className="space-x-4 text-white">
              <a href="/" className="hover:text-[#facc15]">หน้าแรก</a>
              <a href="/auth" className="hover:text-[#facc15]">เข้าสู่ระบบ</a>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">
          {children} 
        </main>

        {/* Footer ที่จะโชว์ทุกหน้า */}
        <footer className="bg-slate-900 text-white p-8 text-center text-[15px]">
          <p>© 2026 Lotto Thai Online. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
