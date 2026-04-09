"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // เช็ค path ให้ตรงกับโปรเจกต์คุณ
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

  // 1. ดึงข้อมูลธนาคารมาแสดงใน Select
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
    setLoading(true);

    try {
      if (isLogin) {
        // --- ระบบ LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({
          email: `${formData.username.trim()}@superlotto.com`,
          password: formData.password,
        });
        if (error) throw new Error("Username หรือ Password ไม่ถูกต้อง");
        router.push("/dashboard");
      } else {
        // --- ระบบ REGISTER ---
        
        // 1. เช็คข้อมูลซ้ำก่อน (Username, Phone, Bank Account, Full Name)
        const { data: checkData } = await supabase
          .from("profiles")
          .select("username, phone_number, bank_account_number, first_name, last_name")
          .or(`username.eq.${formData.username},phone_number.eq.${formData.phone},bank_account_number.eq.${formData.bankAcc}`);

        if (checkData && checkData.length > 0) {
          const item = checkData[0];
          if (item.username === formData.username) throw new Error("Username นี้ถูกใช้ไปแล้ว");
          if (item.phone_number === formData.phone) throw new Error("เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว");
          if (item.bank_account_number === formData.bankAcc) throw new Error("เลขบัญชีนี้ถูกใช้ไปแล้ว");
        }

        // 2. สมัคร Auth User (Email จำลอง)
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `${formData.username.trim()}@superlotto.com`,
          password: formData.password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // 3. บันทึกลงตาราง Profiles (แก้จุดผิด await และชื่อคอลัมน์แล้ว)
          const { error: profileError } = await supabase.from("profiles").insert([
            {
              id: authData.user.id,
              username: formData.username.trim(),
              first_name: formData.firstName,
              last_name: formData.lastName,
              phone_number: formData.phone,
              bank_id: formData.bankId || null,
              bank_account_number: formData.bankAcc,
              balance: 0, // ยอดเงินเริ่มต้น
            },
          ]);

          if (profileError) throw profileError;

          alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      {/* Navbar เหมือนในรูป */}
      <nav className="w-full max-w-7xl flex justify-between items-center py-4 text-white">
        <div className="flex items-center gap-2">
          {/* คุณสามารถใส่โลโก้ไอคอนได้ที่นี่ */}
          <span className="text-xl font-bold">
            <span className="text-white">Super</span>
            <span className="text-amber-400">Lotto</span>
          </span>
        </div>
        <button className="bg-amber-400 text-slate-900 px-4 py-1.5 rounded-md font-medium text-sm">
          เข้าสู่ระบบ
        </button>
      </nav>

      {/* กล่องหลักแบบผสมสีทอง-ขาว */}
      <div className="w-full max-w-sm mt-10 md:mt-16 bg-white rounded-xl shadow-xl overflow-hidden">
        {/* ส่วนบนสีทอง (Header) */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-8 text-center text-slate-900">
          <p className="text-xs tracking-widest uppercase opacity-80 mb-2">
            THAILAND LOTTERY ONLINE
          </p>
          <h1 className="text-4xl font-extrabold mb-1">SuperLotto</h1>
          <p className="text-sm opacity-90">ระบบมั่นคง · ปลอดภัย · จ่ายจริง 100%</p>
        </div>

        {/* ส่วนล่างสีขาว (Form) */}
        <div className="p-6">
          {/* ตัวเลือก เข้สู่ระบบ / สมัครสมาชิก */}
          <div className="grid grid-cols-2 gap-px bg-slate-100 rounded-md mb-6 p-1 text-sm text-center">
            <button
              onClick={() => setIsLogin(true)}
              className={`${isLogin ? "bg-white text-slate-900 shadow" : "text-slate-600"} p-2 rounded`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`${!isLogin ? "bg-white text-slate-900 shadow" : "text-slate-600"} p-2 rounded`}
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                {/* ไอคอน */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  name="username"
                  placeholder="กรอก Username"
                  className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3 rounded-full text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                รหัสผ่าน
              </label>
              <div className="relative">
                {/* ไอคอน */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="กรอก Password"
                  className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3 rounded-full text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>

            <div className="text-right text-sm">
              <a href="#" className="text-slate-500 hover:text-slate-700">
                ลืมรหัสผ่าน?
              </a>
            </div>

            {/* ปุ่มหลัก เข้าสู่ระบบ */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-slate-800 to-slate-950 text-white font-medium py-3 rounded-full text-sm shadow-md hover:from-slate-700 hover:to-slate-900 transition-all mt-4"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          {/* ตัวคั่น 'หรือ' */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-400 uppercase">
              หรือ
            </span>
          </div>

          {/* ปุ่มรอง สมัครสมาชิก */}
          <button className="w-full bg-white text-slate-800 font-medium py-3 rounded-full text-sm border-2 border-slate-200 hover:bg-slate-50 transition-colors">
            สมัครสมาชิกใหม่
          </button>

          {/* ฟุตเตอร์เล็กด้านล่างสุด */}
          <div className="flex justify-center gap-4 text-xs text-slate-400 mt-8">
            <span>● SSL Secured</span>
            <span>● จ่ายจริงทุกงวด</span>
            <span>● 24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
