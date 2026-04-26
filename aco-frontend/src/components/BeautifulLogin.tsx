import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { mockLogin } from '../mockAuth';
import { cn } from '../utils/cn';
import { useStore } from '../store/useStore';

interface BeautifulLoginProps {
  onLogin: (authData: any) => void;
  onQuickLogin: (role: string) => void;
  onBack: () => void;
}

const BeautifulLogin: React.FC<BeautifulLoginProps> = ({ onLogin, onQuickLogin, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [isDemoExpanded, setIsDemoExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await mockLogin(email, password);
      onLogin(response);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
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
        <div className="flex-1 p-6 md:p-12 flex flex-col items-center overflow-y-auto relative custom-scrollbar">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold group z-20"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span>Kembali</span>
          </button>

          {/* Spacer to push content down */}
          <div className="w-full h-16 md:h-20 hidden md:block" />
          
          <div className="w-full max-w-md mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang Kembali</h1>
            <p className="text-slate-500 text-sm">Masuk untuk mengelola portofolio dan penyaluran Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-400">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Password</label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors italic">Lupa?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-400">
                  <Lock size={16} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs font-bold italic bg-red-50 p-3 rounded-xl border border-red-100">
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
              <label htmlFor="remember" className="text-[11px] font-bold text-slate-500 cursor-pointer select-none italic uppercase tracking-wider uppercase tracking-widest">Biarkan saya tetap masuk</label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-black italic uppercase tracking-tighter py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              {isLoading ? 'Processing...' : 'Sign In ke Dashboard'}
              {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            {/* Demo Credentials Box - Expandable */}
            <div className={cn(
              "mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 w-full max-w-md relative overflow-hidden transition-all duration-500 cursor-pointer group",
              isDemoExpanded ? "shadow-2xl shadow-blue-500/10 ring-2 ring-blue-500/10" : "hover:bg-white dark:hover:bg-slate-900 text-center"
            )}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsDemoExpanded(!isDemoExpanded); }}
                className="w-full flex justify-between items-center relative z-10"
              >
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Demo Credentials</h3>
                    <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest italic leading-none">10 Roles</span>
                  </div>
                  {!isDemoExpanded && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Click to expand access roles</p>}
                </div>
                <div className={cn("w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-transform duration-300", isDemoExpanded ? "rotate-180" : "animate-bounce")}>
                  <ChevronRight size={14} className={isDemoExpanded ? "rotate-90" : ""} />
                </div>
              </button>
              
              {isDemoExpanded && (
                <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar relative z-10 overscroll-contain">
                    {/* Category: Investors & Public */}
                    <div className="col-span-2 mb-2">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic border-b border-slate-100 dark:border-slate-800 pb-2">01. Public & Investors</div>
                    </div>
                    {[
                      { role: 'external_user', email: 'user@aco.com', name: 'Budi Santoso', badge: 'External' },
                      { role: 'investor_micro', email: 'rina@aco.com', name: 'Rina Wijaya', badge: 'Micro Inv' },
                      { role: 'investor_enterprise', email: 'budi@aco.com', name: 'Citra Corp', badge: 'Enterprise' },
                    ].map((user) => (
                      <button
                        key={user.email}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setEmail(user.email); setPassword('password123'); }}
                        className="text-left p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                      >
                        <div className="font-black italic text-[11px] text-slate-900 uppercase leading-tight group-hover:text-blue-600 transition-colors">{user.name}</div>
                        <div className="text-blue-600 text-[9px] font-black uppercase tracking-widest mt-1 opacity-70">{user.badge}</div>
                      </button>
                    ))}

                    {/* Category: ZISWAF & Partners */}
                    <div className="col-span-2 mt-4 mb-2">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic border-b border-slate-100 dark:border-slate-800 pb-2">02. ZISWAF & Partners</div>
                    </div>
                    {[
                      { role: 'wakif', email: 'mahmud@aco.com', name: 'Haji Mahmud', badge: 'Wakif' },
                      { role: 'muzakki', email: 'salim@aco.com', name: 'Pak Salim', badge: 'Muzakki' },
                      { role: 'mustahiq', email: 'ruslan@aco.com', name: 'Pak Ruslan', badge: 'Mustahiq' },
                      { role: 'project_owner', email: 'dimas@aco.com', name: 'Dimas Partner', badge: 'Owner' },
                    ].map((user) => (
                      <button
                        key={user.email}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setEmail(user.email); setPassword('password123'); }}
                        className="text-left p-4 rounded-2xl border border-slate-100 bg-white hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
                      >
                        <div className="font-black italic text-[11px] text-slate-900 uppercase leading-tight group-hover:text-emerald-600 transition-colors">{user.name}</div>
                        <div className="text-emerald-600 text-[9px] font-black uppercase tracking-widest mt-1 opacity-70">{user.badge}</div>
                      </button>
                    ))}

                    {/* Category: ACO Staff */}
                    <div className="col-span-2 mt-4 mb-2">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic border-b border-slate-100 dark:border-slate-800 pb-2">03. ACO Staff</div>
                    </div>
                    {[
                      { role: 'investment_officer', email: 'arief@aco.com', name: 'Arief', badge: 'Inv Officer' },
                      { role: 'portfolio_monitor', email: 'sinta@aco.com', name: 'Sinta', badge: 'Monitor' },
                      { role: 'finance_officer', email: 'hendra@aco.com', name: 'Hendra', badge: 'Finance' },
                    ].map((user) => (
                      <button
                        key={user.email}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setEmail(user.email); setPassword('password123'); }}
                        className="text-left p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                      >
                        <div className="font-black italic text-[11px] text-slate-900 uppercase leading-tight group-hover:text-indigo-600 transition-colors">{user.name}</div>
                        <div className="text-indigo-600 text-[9px] font-black uppercase tracking-widest mt-1 opacity-70">{user.badge}</div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <ShieldCheck size={16} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic leading-tight">
                      Password default: <span className="text-slate-900 dark:text-white">password123</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>

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