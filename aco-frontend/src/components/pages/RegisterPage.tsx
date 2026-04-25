import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

interface RegisterPageProps {
  onBack: () => void;
  onLoginClick: () => void;
}

type Step = 'form' | 'success';

const RegisterPage: React.FC<RegisterPageProps> = ({ onBack, onLoginClick }) => {
  const [step, setStep] = useState<Step>('form');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', agreed: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.length < 3) e.name = 'Minimal 3 karakter';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid';
    if (!/^(\+62|08)\d{8,11}$/.test(form.phone)) e.phone = 'Format: +62xxx atau 08xxx (10-13 digit)';
    if (form.password.length < 8) e.password = 'Minimal 8 karakter';
    else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(form.password)) e.password = 'Harus mengandung huruf dan angka';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Konfirmasi password tidak cocok';
    if (!form.agreed) e.agreed = 'Wajib menyetujui syarat & ketentuan';
    return e;
  };

  const isValid = () => {
    return form.name.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      /^(\+62|08)\d{8,11}$/.test(form.phone) &&
      form.password.length >= 8 &&
      /(?=.*[a-zA-Z])(?=.*\d)/.test(form.password) &&
      form.password === form.confirmPassword &&
      form.agreed;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmittedEmail(form.email);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-14 max-w-md w-full shadow-xl text-center">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Email Terkirim!</h2>
          <p className="text-slate-500 leading-relaxed mb-2">
            Email verifikasi telah dikirim ke
          </p>
          <p className="font-black text-indigo-700 mb-6 break-all">{submittedEmail}</p>
          <p className="text-sm text-slate-400 leading-relaxed mb-10">
            Silakan cek inbox Anda. Link verifikasi berlaku selama <strong>24 jam</strong>.
            Akun Anda belum aktif sampai email diverifikasi.
          </p>
          <button
            onClick={onLoginClick}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            Ke Halaman Login <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const F = (field: keyof typeof form, val: string | boolean) =>
    setForm(f => ({ ...f, [field]: val }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-8 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={18} /> Kembali
        </button>

        <div className="bg-white rounded-[3rem] p-12 shadow-xl">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">ACO Platform</span>
            <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">Buat Akun Baru</h1>
            <p className="text-slate-400 mt-2 font-medium">Mulai perjalanan investasi & wakaf Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                value={form.name}
                onChange={e => F('name', e.target.value)}
                placeholder="Abdullah Fauzi"
                className={`w-full py-3.5 px-5 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-400'}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1 font-bold">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Alamat Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => F('email', e.target.value)}
                placeholder="email@contoh.com"
                className={`w-full py-3.5 px-5 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-400'}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1 font-bold">{errors.email}</p>}
            </div>

            {/* HP */}
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Nomor HP</label>
              <input
                type="text"
                value={form.phone}
                onChange={e => F('phone', e.target.value)}
                placeholder="08123456789 atau +6281234567890"
                className={`w-full py-3.5 px-5 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-400'}`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1 font-bold">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => F('password', e.target.value)}
                  placeholder="Min. 8 karakter, huruf + angka"
                  className={`w-full py-3.5 px-5 pr-12 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-400'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-slate-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1 font-bold">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => F('confirmPassword', e.target.value)}
                  placeholder="Ulangi password"
                  className={`w-full py-3.5 px-5 pr-12 bg-slate-50 border rounded-2xl text-sm font-bold focus:outline-none transition-all ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-indigo-400'}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3.5 text-slate-400">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 font-bold">{errors.confirmPassword}</p>}
            </div>

            {/* Checkbox TnC */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => F('agreed', !form.agreed)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${form.agreed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}
                >
                  {form.agreed && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className="text-sm text-slate-600 leading-relaxed font-medium">
                  Saya menyetujui{' '}
                  <span className="text-indigo-600 font-bold underline cursor-pointer">Syarat & Ketentuan</span>{' '}
                  dan{' '}
                  <span className="text-indigo-600 font-bold underline cursor-pointer">Kebijakan Privasi</span>{' '}
                  ACO.
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-red-500 mt-1 font-bold">{errors.agreed}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid()}
              className={`w-full py-4 font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 mt-2 ${
                isValid()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Daftar <ArrowRight size={16} />
            </button>

            <p className="text-center text-sm text-slate-500 font-medium pt-2">
              Sudah punya akun?{' '}
              <button type="button" onClick={onLoginClick} className="text-indigo-600 font-black hover:underline">
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
