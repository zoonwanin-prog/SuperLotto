'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, Lock, Mail, User, Phone, Landmark } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true) // สลับหน้า Login / Register
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState<{ id: string, name: string }[]>([])

  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    bankId: '',
    bankAcc: '',
    referrerId: ''
  })

  // ดึงรายชื่อธนาคารจากฐานข้อมูลมาแสดงใน Dropdown
  useEffect(() => {
    async function fetchBanks() {
      const { data } = await supabase.from('banks').select('id, name').eq('is_active', true)
      if (data) setBanks(data)
    }
    fetchBanks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        // --- ส่วนการเข้าสู่ระบบ ---
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (error) throw error
        alert('เข้าสู่ระบบสำเร็จ!')
        window.location.href = '/' // ไปหน้าแรก
      } else {
        // --- ส่วนการสมัครสมาชิก ---
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        })

        if (authError) throw authError

        if (authData.user) {
          // บันทึกข้อมูลลงตาราง profiles
          const { error: profileError } = await supabase.from('profiles').insert([{
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_number: formData.phone,
            bank_id: formData.bankId,
            bank_account_number: formData.bankAcc,
            referrer_id: formData.referrerId || null
          }])
          if (profileError) throw profileError
          alert('สมัครสมาชิกสำเร็จ!')
          setIsLogin(true)
        }
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100-80px)] flex items-center justify-center p-4 my-10">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Tab Switcher */}
        <div className="flex bg-[#1e3a8a] p-1">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-[17px] font-bold rounded-t-2xl transition-all ${isLogin ? 'bg-white text-[#1e3a8a]' : 'text-white hover:bg-white/10'}`}
          >
            เข้าสู่ระบบ
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-[17px] font-bold rounded-t-2xl transition-all ${!isLogin ? 'bg-white text-[#1e3a8a]' : 'text-white hover:bg-white/10'}`}
          >
            สมัครสมาชิก
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a8a]">
              {isLogin ? 'ยินดีต้อนรับกลับมา' : 'เปิดบัญชีใหม่กับเรา'}
            </h2>
            <p className="text-gray-500 text-[15px] mt-2">
              {isLogin ? 'กรุณากรอกข้อมูลเพื่อเข้าใช้งาน' : 'กรอกข้อมูลให้ครบถ้วนเพื่อเริ่มเดิมพัน'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                type="email" placeholder="อีเมล" className="input-field pl-11" required
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="รหัสผ่าน" className="input-field pl-11 pr-11" required
                onChange={e => setFormData({...formData, password: e.target.value})} 
              />
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* ส่วนที่แสดงเฉพาะตอน Register */}
            {!isLogin && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex gap-3">
                  <div className="relative w-1/2">
                    <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="ชื่อ" className="input-field pl-11" required
                      onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <input type="text" placeholder="นามสกุล" className="input-field" required
                    onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="เบอร์โทรศัพท์" className="input-field pl-11" required
                    onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>

                {/* ข้อมูลธนาคาร */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-3">
                  <label className="text-[#1e3a8a] font-bold text-[16px] flex items-center gap-2">
                    <Landmark className="w-4 h-4" /> ข้อมูลบัญชีรับเงิน
                  </label>
                  <select 
                    className="input-field bg-white" required
                    onChange={e => setFormData({...formData, bankId: e.target.value})}
                  >
                    <option value="">เลือกธนาคาร</option>
                    {banks.map(bank => <option key={bank.id} value={bank.id}>{bank.name}</option>)}
                  </select>
                  <input 
                    type="text" placeholder="เลขที่บัญชี" className="input-field bg-white" required
                    onChange={e => setFormData({...formData, bankAcc: e.target.value})} 
                  />
                </div>
                
                <input 
                  type="text" placeholder="รหัสผู้แนะนำ (ถ้ามี)" className="input-field"
                  onChange={e => setFormData({...formData, referrerId: e.target.value})} 
                />
              </div>
            )}

            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#facc15] hover:bg-[#eab308] text-[#1e3a8a] font-bold p-4 rounded-xl text-[18px] shadow-lg shadow-yellow-200 transition-all transform active:scale-[0.98] mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                  กำลังประมวลผล...
                </span>
              ) : (
                isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิกฟรี'
              )}
            </button>
          </form>

          {isLogin && (
            <p className="text-center mt-6 text-gray-400 text-[15px]">
              ลืมรหัสผ่าน? <span className="text-[#1e3a8a] font-semibold cursor-pointer hover:underline">คลิกที่นี่</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
