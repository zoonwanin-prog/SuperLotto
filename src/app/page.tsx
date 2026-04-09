import Link from 'next/link'
import { Ticket, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 antialiased">
      
      {/* 1. Header & Navigation (แบบพรีเมียม) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO ใหม่ */}
          <div className="flex items-center gap-2">
            <Ticket className="w-8 h-8 text-[#1e3a8a]" />
            <h1 className="text-3xl font-extrabold text-[#1e3a8a] tracking-tight">
              Super<span className="text-[#facc15]">Lotto</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-6 text-[17px]">
            <a href="/" className="font-medium text-[#1e3a8a] hover:text-[#1e3a8a]/80">หน้าแรก</a>
            <a href="/auth" className="font-medium text-slate-700 hover:text-[#1e3a8a]">สมัครสมาชิก</a>
            <Link href="/auth" className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#1e3a8a]/90 transition-all flex items-center gap-2">
              เข้าสู่ระบบ <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section (จัดเต็มความพรีเมียม) */}
      <section className="relative bg-[#1e3a8a] py-28 px-6 overflow-hidden">
        {/* กราฟิกพื้นหลังบางๆ */}
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center"></div>
        
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <span className="inline-block bg-[#facc15]/10 text-[#facc15] px-4 py-1.5 rounded-full text-[15px] font-semibold mb-4 border border-[#facc15]/20">
            ทางเข้าเล่นอย่างเป็นทางการ
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter leading-tight">
            Super<span className="text-[#facc15]">Lotto</span> Online
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-medium">
            ระบบซื้อหวยออนไลน์ที่ทันสมัยและพรีเมียมที่สุด มั่นคง ปลอดภัย จ่ายจริงทุกงวด
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/auth" 
              className="bg-[#facc15] text-[#1e3a8a] px-12 py-5 rounded-2xl font-bold text-[19px] hover:bg-[#facc15]/90 transition-all shadow-xl hover:-translate-y-1 transform"
            >
              สมัครสมาชิกซื้อหวยตอนนี้
            </Link>
            <Link 
              href="/auth" 
              className="bg-transparent border-2 border-white/50 text-white px-12 py-5 rounded-2xl font-bold text-[19px] hover:bg-white hover:text-[#1e3a8a] transition-all"
            >
              ดูผลหวยล่าสุด
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Feature Section (ปรับรูปแบบ Card ให้ดูพรีเมียม) */}
      <section className="py-24 bg-slate-50/50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card 1 - ปลอดภัย */}
          <div className="p-10 rounded-3xl bg-white border border-gray-100 text-center shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-gray-200 transition-all group">
            <div className="bg-blue-100/60 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-100">
              <ShieldCheck className="text-[#1e3a8a] w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#1e3a8a]">ปลอดภัย 100%</h3>
            <p className="text-slate-600 text-[17px] leading-relaxed">
              เก็บข้อมูลด้วยระบบ Supabase มาตรฐานระดับโลก มั่นใจได้ในความปลอดภัยของข้อมูลและเงินของคุณ
            </p>
          </div>

          {/* Card 2 - ฝากถอน */}
          <div className="p-10 rounded-3xl bg-white border border-gray-100 text-center shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-gray-200 transition-all group">
            <div className="bg-yellow-100/60 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-yellow-100">
              <Zap className="text-yellow-600 w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#1e3a8a]">ระบบฝาก-ถอนออโต้</h3>
            <p className="text-slate-600 text-[17px] leading-relaxed">
              ทำรายการรวดเร็วภายใน 30 วินาที ตลอด 24 ชม. รองรับทุกธนาคารชั้นนำในไทย
            </p>
          </div>

          {/* Card 3 - Agent */}
          <div className="p-10 rounded-3xl bg-white border border-gray-100 text-center shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-gray-200 transition-all group">
            <div className="bg-blue-100/60 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-100">
              <Users className="text-[#1e3a8a] w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#1e3a8a]">ระบบแนะนำเพื่อน</h3>
            <p className="text-slate-600 text-[17px] leading-relaxed">
              สร้างรายได้ง่ายๆ ด้วยการเป็น Agent แนะนำเพื่อน รับค่าคอมมิชชั่นสูงที่สุดทุกยอดการซื้อ
            </p>
          </div>

        </div>
      </section>

      {/* 4. Stats Section (ปรับให้ดู Minimal และน่าเชื่อถือ) */}
      <section className="bg-white py-16 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-around gap-10 text-center">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-extrabold text-[#1e3a8a]">1M+</div>
            <div className="text-slate-500 text-[17px] mt-2 font-medium">ผู้ใช้งานจริงทั้งหมด</div>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-extrabold text-[#1e3a8a]">24/7</div>
            <div className="text-slate-500 text-[17px] mt-2 font-medium">ฝ่ายบริการลูกค้ามืออาชีพ</div>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-extrabold text-[#1e3a8a]">99.9%</div>
            <div className="text-slate-500 text-[17px] mt-2 font-medium">ความพึงพอใจและไว้วางใจ</div>
          </div>
        </div>
      </section>

      {/* 5. Footer (เรียบหรู) */}
      <footer className="bg-slate-900 text-white py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#facc15]" />
            <span className="text-xl font-bold text-white">SuperLotto</span>
          </div>
          <p className="text-slate-400 text-[16px] text-center md:text-left">
            © 2026 SuperLotto Online (Thailand). All rights reserved.
          </p>
          <div className="flex gap-4 text-slate-400 text-[16px]">
            <a href="#" className="hover:text-white">ติดต่อเรา</a>
            <a href="#" className="hover:text-white">กติกา</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
