'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Lock, Phone, Landmark, CreditCard } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState<{ id: string, name: string }[]>([])

  const [formData, setFormData] = useState({
    username: '', // เพิ่ม username
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

    // สร้าง Email จำลองจาก Username (เพื่อให้เข้ากับระบบ Supabase Auth)
    const mockEmail = `${formData.username}@superlotto.com`

    if (isLogin) {
      // --- LOGIN ด้วย Username ---
      const { error } = await supabase.auth.signInWithPassword({
        email: mockEmail,
        password: formData.password,
      })
      if (error) alert('Username หรือ Password ไม่ถูกต้อง')
      else window.location.href = '/'
    } else {
      // --- REGISTER ---
      // 1. เช็คก่อนว่า Username ซ้ำไหม
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', formData.username)
        .single()

      if (existingUser) {
        alert('Username นี้มีผู้อื่นใช้แล้ว กรุณาเปลี่ยนใหม่')
        setLoading(false)
        return
      }

      // 2. สมัครสมาชิก
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: mockEmail,
        password: formData.password,
      })

      if (authError) {
        alert(authError.message)
      } else if (authData.user) {
        // 3. บันทึกข้อมูลลง Profiles
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: authData.user.id,
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
          bank_id: formData.bankId,
          bank_account_number: formData.bankAcc
        }])
        
        if (profileError) alert('เกิดข้อผิดพลาดในการบันทึกโปรไฟล์')
        else alert('สมัครสมาชิกสำเร็จ!')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="flex bg-[#1e3a8a]">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-4 font-bold text-[17px] ${isLogin ? 'text-[#facc15] border-b-4 border-[#facc15]' : 'text-white/60'}`}>เข้าสู่ระบบ</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-4 font-bold text-[17px] ${!isLogin ? 'text-[#facc15] border-b-4 border-[#facc15]' : 'text-white/60'}`}>สมัครสมาชิก</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* Username & Password (ใช้ทั้ง Login/Register) */}
          <div className="relative">
            <User className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Username" className="input-field pl-11" required
              onChange={e => setFormData({...formData, username: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
            <input type="password" placeholder="Password" className="input-field pl-11" required
              onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          {/* ฟิลด์เพิ่มเติมเฉพาะตอน Register */}
          {!isLogin && (
            <div className="space-y-4 pt-2">
              <div className="flex gap-2">
                <input type="text" placeholder="ชื่อจริง" className="input-field" required
                  onChange={e => setFormData({...formData, firstName: e.target.value})} />
                <input type="text" placeholder="นามสกุล" className="input-field" required
                  onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="เบอร์โทรศัพท์" className="input-field pl-11" required
                  onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-2xl space-y-3">
                <p className="text-[#1e3a8a] font-bold text-[16px]">ข้อมูลธนาคารรับเงิน</p>
                <select className="input-field" required onChange={e => setFormData({...formData, bankId: e.target.value})}>
                  <option value="">เลือกธนาคาร</option>
                  {banks.map(bank => <option key={bank.id} value={bank.id}>{bank.name}</option>)}
                </select>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="เลขบัญชีธนาคาร" className="input-field pl-11" required
                    onChange={e => setFormData({...formData, bankAcc: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
            {loading ? 'กำลังประมวลผล...' : (isLogin ? 'เข้าสู่ระบบ' : 'ยืนยันการสมัคร')}
          </button>
        </form>
      </div>
    </div>
  )
}
