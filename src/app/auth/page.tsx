"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<{ id: string; name: string }[]>([]);

  // ข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    bankId: "",
    bankAcc: "",
  });

  // ดึงข้อมูลธนาคาร
  useEffect(() => {
    const fetchBanks = async () => {
      const { data } = await supabase.from("banks").select("*").order("name");
      if (data) setBanks(data);
    };
    fetchBanks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const mockEmail = `${formData.username.trim()}@superlotto.com`;

      if (isLogin) {
        // --- ระบบ LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({
          email: mockEmail,
          password: formData.password,
        });
        if (error) throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        router.push("/dashboard");
      } else {
        // --- ระบบ REGISTER ---
        // 1. ตรวจสอบข้อมูลเบื้องต้น
        if (!formData.bankId) throw new Error("กรุณาเลือกธนาคาร");

        // 2. สมัคร User ใน Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: mockEmail,
          password: formData.password,
        });
        if (authError) throw authError;

        if (authData.user) {
          // 3. บันทึกโปรไฟล์ลงตาราง profiles
          const { error: profileError } = await supabase.from("profiles").insert([
            {
              id: authData.user.id,
              username: formData.username.trim(),
              first_name: formData.firstName,
              last_name: formData.lastName,
              phone_number: formData.phone,
              bank_id: formData.bankId,
              bank_account_number: formData.bankAcc,
              balance: 0,
            },
          ]);
          if (profileError) throw profileError;
          alert("สมัครสมาชิกสำเร็จ!");
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center p-4">
      {/* Header / Logo Section */}
      <div className="w-full max-w-7xl flex justify-between items-center py-6">
        <div className="text-2xl font-bold tracking-tighter italic">
          <span className="text-white">SUPER</span>
          <span className="text-[#fbbf24]">LOTTO</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden mt-4">
        {/* Top Gold Section */}
        <div className="bg-gradient-to-b from-[#fbbf24] to-[#d97706] p-8 text-center">
          <p className="text-[10px] tracking-[0.2em] font-bold text-[#451a03] mb-1">THAILAND LOTTERY ONLINE</p>
          <h1 className="text-4xl font-black text-[#0f172a] drop-shadow-sm">SuperLotto</h1>
          <p className="text-xs font-medium text-[#451a03] mt-1">ระบบมั่นคง · ปลอดภัย · จ่ายจริง 100%</p>
        </div>

        <div className="p-6 pt-8">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? "bg-white text-[#0f172a] shadow" : "text-slate-500"}`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? "bg-white text-[#0f172a] shadow" : "text-slate-500"}`}
            >
              สมัครสมาชิก
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">ชื่อผู้ใช้</label>
              <input
                name="username"
                type="text"
                placeholder="กรอก Username"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 outline-none transition-all text-sm"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 ml-1">รหัสผ่าน</label>
              <input
                name="password"
                type="password"
                placeholder="กรอก Password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 outline-none transition-all text-sm"
                onChange={handleChange}
                required
              />
            </div>

            {/* ส่วนที่เพิ่มขึ้นมาเมื่อสมัครสมาชิก */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 ml-1">ชื่อจริง</label>
                    <input name="firstName" placeholder="ชื่อ" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#fbbf24]" onChange={handleChange} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 ml-1">นามสกุล</label>
                    <input name="lastName" placeholder="นามสกุล" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#fbbf24]" onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 ml-1">เบอร์โทรศัพท์</label>
                  <input name="phone" placeholder="08x-xxxxxxx" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#fbbf24]" onChange={handleChange} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 ml-1">ธนาคาร</label>
                  <select name="bankId" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#fbbf24]" onChange={handleChange} required>
                    <option value="">เลือกธนาคาร</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 ml-1">เลขบัญชี</label>
                  <input name="bankAcc" placeholder="ระบุเลขบัญชี" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#fbbf24]" onChange={handleChange} required />
                </div>
              </>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-slate-400 hover:text-[#d97706]">ลืมรหัสผ่าน?</button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f172a] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
            >
              {loading ? "กำลังประมวลผล..." : isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิกใหม่"}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 flex justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">● SSL Secured</span>
            <span className="flex items-center gap-1">● จ่ายจริงทุกงวด</span>
            <span className="flex items-center gap-1">● 24/7 Support</span>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-slate-500 text-[10px]">© 2026 SuperLotto Thailand Online. All rights reserved.</p>
    </div>
  );
}
