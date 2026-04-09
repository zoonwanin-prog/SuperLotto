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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="premium-card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0f172a]">
          {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" placeholder="ชื่อจริง" className="input-field" onChange={handleChange} required />
                <input name="lastName" placeholder="นามสกุล" className="input-field" onChange={handleChange} required />
              </div>
              <input name="phone" placeholder="เบอร์โทรศัพท์" className="input-field" onChange={handleChange} required />
              
              <select name="bankId" className="input-field" onChange={handleChange} required>
                <option value="">เลือกธนาคาร</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>{bank.name}</option>
                ))}
              </select>
              
              <input name="bankAcc" placeholder="เลขบัญชีธนาคาร" className="input-field" onChange={handleChange} required />
            </>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
            {loading ? "กำลังประมวลผล..." : isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500">
          {isLogin ? "ยังไม่มีบัญชี?" : "มีบัญชีอยู่แล้ว?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#1e3a8a] font-bold hover:underline"
          >
            {isLogin ? "สมัครที่นี่" : "ล็อกอินที่นี่"}
          </button>
        </p>
      </div>
    </div>
  );
}
