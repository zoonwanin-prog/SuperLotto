'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Lock, Phone, CreditCard } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState<{ id: string, name: string }[]>([])

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    bankId: '',
    bankAcc: '',
  })

  useEffect(() => {
    async function getBanks() {
      const { data } = await supabase.from('banks').select('*').eq('is_active', true)
      if (data) setBanks(data)
    }
    getBanks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const mockEmail = `${formData.username}@superlotto.com`

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email: mockEmail, password: formData.password })
      if (error) alert('Username หรือ Password ไม่ถูกต้อง')
      else window.location.href = '/'
    } else {
      const { data: existingUser } = await supabase.from('profiles').select('username').eq('username', formData.username).single()
      if (existingUser) { alert('Username นี้มีผู้อื่นใช้แล้ว กรุณาเปลี่ยนใหม่'); setLoading(false); return }

      const { data: authData, error: authError } = await supabase.auth.signUp({ email: mockEmail, password: formData.password })
      if (authError) { alert(authError.message) }
      else if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: authData.user.id, username: formData.username,
          first_name: formData.firstName, last_name: formData.lastName,
          phone_number: formData.phone, bank_id: formData.bankId, bank_account_number: formData.bankAcc
        }])
        if (profileError) alert('เกิดข้อผิดพลาดในการบันทึกโปรไฟล์')
        else alert('สมัครสมาชิกสำเร็จ!')
      }
    }
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(145deg, #0a1640 0%, #0f1f5c 40%, #1a3a8f 75%, #0d2d6e 100%)' }}
    >
      {/* Decorative rings */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full border border-white/[0.04] absolute" />
        <div className="w-[420px] h-[420px] rounded-full border border-yellow-400/[0.06] absolute" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[390px] rounded-[22px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]">

        {/* Header ทอง */}
        <div
          className="px-8 py-8 text-center"
          style={{ background: 'linear-gradient(135deg, #ca8a04 0%, #eab308 35%, #fde68a 60%, #eab308 80%, #ca8a04 100%)' }}
        >
          <p className="text-[10px] font-medium tracking-[4px] text-navy-800 uppercase mb-2"
            style={{ color: 'rgba(15,31,92,0.5)' }}>
            Thailand Lottery Online
          </p>
          <h1 className="text-[38px] font-extrabold tracking-wide leading-none"
            style={{ color: '#0f1f5c', fontFamily: "'Prompt', sans-serif" }}>
            SuperLotto
          </h1>
          <p className="text-[12px] font-light mt-2" style={{ color: 'rgba(15,31,92,0.55)' }}>
            ระบบมั่นคง · ปลอดภัย · จ่ายจริง 100%
          </p>
        </div>

        {/* Body ขาว */}
        <div className="bg-white px-8 pt-7 pb-8">

          {/* Tab */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-7">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200
                ${isLogin ? 'bg-white text-[#0f1f5c] shadow-md' : 'text-slate-400'}`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200
                ${!isLogin ? 'bg-white text-[#0f1f5c] shadow-md' : 'text-slate-400'}`}
            >
              สมัครสมาชิก
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5 tracking-wide">ชื่อผู้ใช้</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <input
                  type="text" placeholder="กรอก Username" required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-slate-800 outline-none focus:border-[#0f1f5c] focus:bg-white focus:ring-2 focus:ring-blue-900/10 transition-all placeholder:text-slate-300 placeholder:font-light"
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5 tracking-wide">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <input
                  type="password" placeholder="กรอก Password" required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-slate-800 outline-none focus:border-[#0f1f5c] focus:bg-white focus:ring-2 focus:ring-blue-900/10 transition-all placeholder:text-slate-300 placeholder:font-light"
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Register fields */}
            {!isLogin && (
              <div className="space-y-4 pt-1">
                <div className="flex gap-3">
                  <input type="text" placeholder="ชื่อจริง" required
                    className="w-full py-3 px-4 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-slate-800 outline-none focus:border-[#0f1f5c] focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-light"
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  <input type="text" placeholder="นามสกุล" required
                    className="w-full py-3 px-4 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-slate-800 outline-none focus:border-[#0f1f5c] focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-light"
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                  <input type="text" placeholder="เบอร์โทรศัพท์" required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-slate-200 bg-slate-50 text-[15px] text-slate-800 outline-none focus:border-[#0f1f5c] focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-light"
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>

                {/* Bank section */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-3 border border-blue-100">
                  <p className="text-[12px] font-semibold text-[#0f1f5c] tracking-wide uppercase flex items-center gap-2">
                    <span className="w-1 h-4 bg-yellow-400 rounded-full inline-block" />
                    ข้อมูลธนาคารรับเงิน
                  </p>
                  <select required
                    className="w-full py-3 px-4 rounded-xl border-[1.5px] border-slate-200 bg-white text-[15px] text-slate-700 outline-none focus:border-[#0f1f5c] transition-all"
                    onChange={e => setFormData({ ...formData, bankId: e.target.value })}>
                    <option value="">เลือกธนาคาร</option>
                    {banks.map(bank => <option key={bank.id} value={bank.id}>{bank.name}</option>)}
                  </select>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                    <input type="text" placeholder="เลขบัญชีธนาคาร" required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-slate-200 bg-white text-[15px] text-slate-800 outline-none focus:border-[#0f1f5c] transition-all placeholder:text-slate-300 placeholder:font-light"
                      onChange={e => setFormData({ ...formData, bankAcc: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full py-4 rounded-xl text-[17px] font-semibold text-white tracking-wide transition-all mt-2 disabled:opacity-60"
              style={{ background: '#0f1f5c', borderBottom: '3px solid #eab308' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1e3a8a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0f1f5c')}
            >
              {loading ? 'กำลังประมวลผล...' : (isLogin ? 'เข้าสู่ระบบ' : 'ยืนยันการสมัคร')}
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex justify-center mt-6 pt-5 border-t border-slate-100">
            {['SSL Secured', 'จ่ายจริงทุกงวด', '24/7 Support'].map((t, i) => (
              <div key={i} className={`flex items-center gap-1.5 text-[11px] text-slate-300 font-light px-3 ${i < 2 ? 'border-r border-slate-200' : ''}`}>
                <span className="w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-[11px] font-light text-white/20 tracking-widest">
        © 2026 SuperLotto Thai Online · All rights reserved.
      </p>
    </div>
  )
}
