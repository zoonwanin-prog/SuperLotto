// src/components/auth/RegisterForm.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // อย่าลืมสร้างไฟล์นี้เพื่อ init supabase client
import { Bank } from "@/types";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  
  // States สำหรับจัดการข้อมูล
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    lastName: "",
    phone: "",
    bankName: "",
    bankAccount: "",
  });

  // ดึงรายชื่อธนาคารจาก Database เมื่อโหลดหน้า
  useEffect(() => {
    async function fetchBanks() {
      const { data, error } = await supabase
        .from("banks")
        .select("*")
        .order('bank_name_th', { ascending: true }); // เรียงตามชื่อไทย

      if (error) {
        console.error("Error fetching banks:", error);
      } else if (data) {
        setBanks(data);
      }
    }
    fetchBanks();
  }, []);

  // จัดการการเปลี่ยนแปลงข้อมูลใน Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(null); // ล้าง Error เมื่อ User เริ่มพิมพ์ใหม่
  };

  // ฟังก์ชันสมัครสมาชิก
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // --- Client-side Validation (ตรวจสอบเบื้องต้น) ---
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }
    
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      setErrorMsg("เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก");
      setLoading(false);
      return;
    }
    
    if (!/^\d+$/.test(formData.bankAccount)) {
        setErrorMsg("เลขบัญชีธนาคารต้องเป็นตัวเลขเท่านั้น");
        setLoading(false);
        return;
    }

    // --- ส่งข้อมูลไป Supabase ---
    // สร้าง Fake Email จาก Username เพื่อใช้กับ Supabase Auth
    const fakeEmail = `${formData.username.toLowerCase()}@superlotto.internal`;

    const { data, error } = await supabase.auth.signUp({
      email: fakeEmail,
      password: formData.password,
      options: {
        // ข้อมูลเหล่านี้จะวิ่งไปที่ Trigger ใน SQL
        data: {
          username: formData.username,
          full_name: formData.fullName,
          last_name: formData.lastName,
          phone: formData.phone,
          bank_name: formData.bankName,
          bank_account: formData.bankAccount,
        },
      },
    });

    if (error) {
      // ตรวจสอบ Error ที่มาจาก Unique Constraint ใน Database
      if (error.message.includes("profiles_username_key")) {
        setErrorMsg("Username นี้มีผู้ใช้งานแล้ว");
      } else if (error.message.includes("profiles_phone_key")) {
        setErrorMsg("เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว");
      } else if (error.message.includes("profiles_bank_account_key")) {
        setErrorMsg("เลขบัญชีธนาคารนี้ถูกใช้งานแล้ว");
      } else {
        setErrorMsg("สมัครสมาชิกไม่สำเร็จ: " + error.message);
      }
      setLoading(false);
    } else {
      setSuccessMsg("สมัครสมาชิกสำเร็จ! กำลังนำคุณไปหน้าเข้าสู่ระบบ...");
      // ไปหน้า Login หลังจากสำเร็จ 2 วินาที
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  // Tailwind Class เช็ตซ้ำๆ
  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <form onSubmit={handleRegister} className="space-y-6">
        
        {/* ข้อความแจ้งเตือน Error/Success */}
        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm font-medium border border-red-200">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg text-sm font-medium border border-emerald-200">
            ✅ {successMsg}
          </div>
        )}

        {/* ส่วนที่ 1: ข้อมูลบัญชี */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-sky-950 mb-5">ข้อมูลบัญชีผู้ใช้</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="username" className={labelClass}>Username</label>
              <input type="text" id="username" name="username" required value={formData.username} onChange={handleInputChange} className={inputClass} placeholder="เช่น superlotto01" />
            </div>
            <div></div> {/* Space empty */}
            <div>
              <label htmlFor="password" className={labelClass}>รหัสผ่าน</label>
              <input type="password" id="password" name="password" required value={formData.password} onChange={handleInputChange} className={inputClass} placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>ยืนยันรหัสผ่าน</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} className={inputClass} placeholder="••••••••" />
            </div>
          </div>
        </div>

        {/* ส่วนที่ 2: ข้อมูลส่วนตัว */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-sky-950 mb-5">ข้อมูลส่วนตัว</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className={labelClass}>ชื่อจริง</label>
              <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleInputChange} className={inputClass} placeholder="สมชาย" />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>นามสกุล</label>
              <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className={inputClass} placeholder="ใจดี" />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>เบอร์โทรศัพท์ (10 หลัก)</label>
              <input type="tel" id="phone" name="phone" required maxLength={10} value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="08XXXXXXXX" />
            </div>
          </div>
        </div>

        {/* ส่วนที่ 3: ข้อมูลธนาคาร */}
        <div>
          <h2 className="text-xl font-semibold text-sky-950 mb-5">ข้อมูลธนาคาร (สำหรับรับเงิน)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="bankName" className={labelClass}>ธนาคาร</label>
              <select id="bankName" name="bankName" required value={formData.bankName} onChange={handleInputChange} className={`${inputClass} appearance-none bg-white`}>
                <option value="">-- เลือกธนาคาร --</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.bank_name_th}>
                    {bank.bank_name_th}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bankAccount" className={labelClass}>เลขที่บัญชีธนาคาร / เบอร์วอลเล็ท</label>
              <input type="text" id="bankAccount" name="bankAccount" required value={formData.bankAccount} onChange={handleInputChange} className={inputClass} placeholder="ตัวเลขเท่านั้น" />
            </div>
          </div>
        </div>

        {/* ปุ่มส่งฟอร์ม */}
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-sky-700 hover:bg-sky-800'} text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                กำลังประมวลผล...
              </span>
            ) : "ยืนยันการสมัครสมาชิก"}
          </button>
        </div>
      </form>
    </div>
  );
}
