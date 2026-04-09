export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at top, #1a1428 0%, #0a0a0f 60%)' }}>

      {/* Background decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)' }} />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-sm mx-4 p-8 rounded-2xl border"
        style={{
          background: '#13131f',
          borderColor: '#2a2a3a',
          boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 25px 50px rgba(0,0,0,0.6)'
        }}>

        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', boxShadow: '0 0 30px rgba(201,168,76,0.4)' }}>
            <span className="text-2xl">★</span>
          </div>
          <h1 className="text-2xl font-bold tracking-widest uppercase mb-1"
            style={{ fontFamily: 'Cinzel, serif', color: '#c9a84c' }}>
            SuperLotto
          </h1>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#666' }}>
            Thai Online · เข้าสู่ระบบ
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs mb-1.5 tracking-wider uppercase" style={{ color: '#888' }}>
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              placeholder="กรอก Username"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: '#0a0a0f',
                border: '1px solid #2a2a3a',
                color: '#fff',
              }}
              onFocus={e => e.target.style.borderColor = '#c9a84c'}
              onBlur={e => e.target.style.borderColor = '#2a2a3a'}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs mb-1.5 tracking-wider uppercase" style={{ color: '#888' }}>
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="กรอก Password"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: '#0a0a0f',
                border: '1px solid #2a2a3a',
                color: '#fff',
              }}
              onFocus={e => e.target.style.borderColor = '#c9a84c'}
              onBlur={e => e.target.style.borderColor = '#2a2a3a'}
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase mt-2 transition-all hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
              color: '#0a0a0f',
              boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
            }}>
            เข้าสู่ระบบ
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-xs mt-6" style={{ color: '#555' }}>
          ยังไม่มีบัญชี?{' '}
          <a href="/register" className="hover:underline" style={{ color: '#c9a84c' }}>
            สมัครสมาชิก
          </a>
        </p>

        {/* Footer */}
        <div className="mt-8 pt-4 text-center" style={{ borderTop: '1px solid #1e1e2e' }}>
          <p className="text-xs" style={{ color: '#333' }}>
            ระบบมั่นคง · ปลอดภัย · จ่ายจริง 100%
          </p>
        </div>
      </div>
    </main>
  );
}
