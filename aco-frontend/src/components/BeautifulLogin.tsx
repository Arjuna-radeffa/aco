import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { api } from '../services/api';

interface BeautifulLoginProps {
  onLogin: (authData: any) => void;
  onQuickLogin: (role: string) => void;
}

const BeautifulLogin: React.FC<BeautifulLoginProps> = ({ onLogin, onQuickLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.login({ email, password });
      onLogin(response);
    } catch (err: any) {
      setError(err.message || 'Login failed. Pastikan backend sudah jalan di port 3001.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-blue-100 overflow-hidden">
      {/* Container Utama */}
      <div className="w-full h-full bg-white overflow-hidden flex flex-col md:flex-row">
        
        {/* Bagian Kiri: Branding & Narasi (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 relative p-12 flex-col justify-between overflow-hidden h-screen">
          {/* Dekorasi Background */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-2xl italic text-white shadow-lg shadow-blue-500/30">
                A
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                ACO <span className="text-blue-400 font-light">Platform</span>
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-white leading-tight mb-6">
              Mengelola Amanah dengan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Transparansi Mutlak.
              </span>
            </h2>
            
            <p className="text-slate-400 leading-relaxed max-w-sm mb-8">
              Bergabunglah dalam ekosistem investasi dan sosial yang adil bagi pemilik modal maupun penerima manfaat.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="text-emerald-400 w-5 h-5" />
                <span>Terverifikasi dan Diawasi Dewan Syariah</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <Globe className="text-blue-400 w-5 h-5" />
                <span>Isolasi Dana Investasi & ZISWAF yang Ketat</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-slate-500 text-xs">
              © 2024 ACO (Amanah, Capital, & Organization). <br />
              Versi Narasi 2.0 — Membangun Lingkaran Sempurna.
            </p>
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="flex-1 p-8 md:p-16 flex flex-col items-center overflow-y-auto">
          {/* Spacer to push content down */}
          <div className="w-full h-12 md:h-24 hidden md:block" />
          
          <div className="w-full max-w-md mb-10">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang Kembali</h1>
            <p className="text-slate-500 text-sm">Masuk untuk mengelola portofolio dan penyaluran Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Lupa Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center gap-2 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer select-none">Biarkan saya tetap masuk</label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              {isLoading ? 'Signing In...' : 'Sign In ke Dashboard'}
              {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">🎭 Demo Credentials - Pilih User</h3>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">11 Roles</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto">
              {/* Investor Section */}
              <div className="col-span-2">
                <div className="text-xs font-bold text-slate-700 mb-2 text-center">👤 INVESTORS</div>
              </div>
              
              {[
                { role: 'investor_micro', email: 'rina@aco.com', name: 'Rina Wijaya', badge: 'Micro' },
                { role: 'investor_enterprise', email: 'budi@aco.com', name: 'Budi Santoso', badge: 'Enterprise' },
              ].map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password123');
                  }}
                  className="text-left p-3 rounded-lg border border-blue-200 bg-white hover:bg-blue-100 hover:border-blue-400 transition text-xs"
                >
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-slate-500 text-xs truncate">{user.email}</div>
                  <div className="text-blue-600 text-xs font-semibold">{user.badge}</div>
                </button>
              ))}

              {/* Project Owner */}
              <div className="col-span-2 mt-2">
                <div className="text-xs font-bold text-slate-700 mb-2 text-center">🏢 PROJECT OWNER</div>
              </div>
              
              {[
                { role: 'project_owner', email: 'dimas@aco.com', name: 'Dimas Pratama', badge: 'Owner' },
              ].map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password123');
                  }}
                  className="text-left col-span-2 p-3 rounded-lg border border-amber-200 bg-white hover:bg-amber-100 hover:border-amber-400 transition text-xs"
                >
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-slate-500 text-xs">{user.email}</div>
                </button>
              ))}

              {/* ZIS Section */}
              <div className="col-span-2 mt-2">
                <div className="text-xs font-bold text-slate-700 mb-2 text-center">🕌 ZAKAT, INFAQ, WAKAF</div>
              </div>

              {[
                { role: 'muzakki', email: 'salim@aco.com', name: 'Pak Salim', badge: 'Muzakki' },
                { role: 'munfiq_mutashadiq', email: 'tari@aco.com', name: 'Bu Tari', badge: 'Munfiq' },
                { role: 'wakif', email: 'mahmud@aco.com', name: 'Haji Mahmud', badge: 'Wakif' },
                { role: 'mustahiq', email: 'ruslan@aco.com', name: 'Pak Ruslan', badge: 'Mustahiq' },
              ].map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password123');
                  }}
                  className="text-left p-3 rounded-lg border border-green-200 bg-white hover:bg-green-100 hover:border-green-400 transition text-xs"
                >
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-green-600 text-xs font-semibold">{user.badge}</div>
                </button>
              ))}

              {/* Staff Section */}
              <div className="col-span-2 mt-2">
                <div className="text-xs font-bold text-slate-700 mb-2 text-center">👨‍💼 ACO STAFF</div>
              </div>

              {[
                { role: 'investment_officer', email: 'arief@aco.com', name: 'Arief', badge: 'Inv Officer' },
                { role: 'portfolio_monitor', email: 'sinta@aco.com', name: 'Sinta', badge: 'Monitor' },
                { role: 'finance_officer', email: 'hendra@aco.com', name: 'Hendra', badge: 'Finance' },
                { role: 'admin', email: 'reza@aco.com', name: 'Reza', badge: 'Admin' },
              ].map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password123');
                  }}
                  className="text-left p-3 rounded-lg border border-purple-200 bg-white hover:bg-purple-100 hover:border-purple-400 transition text-xs"
                >
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-purple-600 text-xs font-semibold">{user.badge}</div>
                </button>
              ))}
            </div>
            
            <p className="text-xs text-slate-600 mt-3 text-center italic">
              💡 Click user to fill email, then click SignIn. Password semua: <span className="font-mono font-bold text-slate-900">password123</span>
            </p>
          </div>

          {/* Footer Form */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center w-full max-w-md">
            <p className="text-sm text-slate-500">
              Belum punya akun? <br className="md:hidden" />
              <a href="#" className="font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                Mulai Investasi atau Berdonasi
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </p>
            
            {/* Mustahiq Path */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 w-full">
              <p className="text-xs text-emerald-800 font-medium">
                Penerima Manfaat (Mustahiq)? 
                <a href="#" className="ml-2 font-bold underline hover:text-emerald-900">Upgrade ke Investor di sini</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulLogin;