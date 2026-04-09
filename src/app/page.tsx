import Link from 'next/link'
import { Ticket, ShieldCheck, Zap, Users } from 'lucide-react' // ต้องลง lucide-react ด้วย

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section - ส่วนต้อนรับด้านบน */}
      <section className="bg-[#1e3a8a] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#facc15] mb-6">
            LOTTO THAI ONLINE
          </h1>
          <p className="text-white text-[20px] mb-10 opacity-90">
            ระบบซื้อหวยออนไลน์ที่ทันสมัยที่สุด มั่นคง ปลอดภัย จ่ายจริงทุกงวด
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth" 
              className="bg-[#facc15] text-[#1e3a8a] px-10 py-4 rounded-xl font-bold text-[18px] hover:bg-yellow-400 transition-all shadow-lg"
            >
              สมัครสมาชิกซื้อหวย
            </Link>
            <Link 
              href="/auth" 
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-[18px] hover:bg-white hover:text-[#1e3a8a] transition-all"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section - จุดเด่นของเว็บ */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-slate-50 border border-gray-100 text-center shadow-sm">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-[#1e3a8a] w-8 h-8" />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#1e3a8a]">ปลอดภัย 100%</h3>
            <p className="text-gray-600 text-[17px]">
              เก็บข้อมูลด้วยระบบ Supabase ที่ได้รับมาตรฐานระดับโลก มั่นใจได้ในความปลอดภัย
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 border border-gray-100 text-center shadow-sm">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="text-yellow-600 w-8 h-8" />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#1e3a8a]">ระบบฝาก-ถอนออโต้</h3>
            <p className="text-gray-600 text-[17px]">
              ทำรายการรวดเร็วภายใน 30 วินาที รองรับทุกธนาคารชั้นนำในไทย
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 border border-gray-100 text-center shadow-sm">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-[#1e3a8a] w-8 h-8" />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#1e3a8a]">ระบบแนะนำเพื่อน</h3>
            <p className="text-gray-600 text-[17px]">
              สร้างรายได้ง่ายๆ ด้วยการเป็น Agent แนะนำเพื่อน รับค่าคอมมิชชั่นทุกยอดการซื้อ
            </p>
          </div>

        </div>
      </section>

      {/* Stats Section - สถิติเบื้องต้น */}
      <section className="bg-slate-50 py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-around gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#1e3a8a]">1M+</div>
            <div className="text-gray-500 text-[17px]">ผู้ใช้งานทั้งหมด</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1e3a8a]">24/7</div>
            <div className="text-gray-500 text-[17px]">ฝ่ายบริการลูกค้า</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1e3a8a]">99.9%</div>
            <div className="text-gray-500 text-[17px]">ความพึงพอใจ</div>
          </div>
        </div>
      </section>

    </div>
  )
}
