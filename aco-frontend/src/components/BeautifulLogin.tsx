import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Lock, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { cn } from '../utils/cn';

const ROLES = [
  { id: 'ext-001', role: 'External User', email: 'external@aco.id' },
  { id: 'inv-001', role: 'Investor / Wakif', email: 'investor@aco.id' },
  { id: 'own-001', role: 'Project Owner', email: 'owner@aco.id' },
  { id: 'io-001', role: 'Investment Officer', email: 'io@aco.id' },
  { id: 'pm-001', role: 'Portfolio Monitor', email: 'pm@aco.id' },
  { id: 'naz-001', role: 'Nazir Admin', email: 'nazir@aco.id' },
  { id: 'fin-001', role: 'Finance Officer', email: 'finance@aco.id' },
  { id: 'obs-001', role: 'Auditor / Observer', email: 'auditor@aco.id' },
  { id: 'mus-001', role: 'Mustahiq', email: 'mustahiq@aco.id' },
  { id: 'adm-001', role: 'Super Admin', email: 'admin@aco.id' },
];

interface BeautifulLoginProps {
  onLogin: (data: any) => void;
  onQuickLogin: (role: string) => void;
  onBack: () => void;
}

const BeautifulLogin: React.FC<BeautifulLoginProps> = ({ onLogin, onQuickLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isDemoExpanded, setIsDemoExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate Login Logic
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1000);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-medium">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col gap-6">
        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Lock size={28} className="text-emerald-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase mb-2">Masuk ke ACO</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic opacity-60">Portal Ekosistem Syariah</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 italic">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold italic"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Password</label>
                <a href="#" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic hover:underline">Lupa?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-6 py-4 pr-14 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold italic"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs font-bold uppercase tracking-wider italic">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 text-white font-black italic uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Akses Dashboard
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-10 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic">
              Belum punya akun? <button onClick={() => onBack()} className="text-emerald-600 hover:underline inline-flex items-center gap-1 font-black">Mulai Sekarang</button>
            </p>
          </div>
        </div>

        {/* Demo Credentials Box - Updated Professional Style */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden transition-all duration-500">
          <button 
            onClick={() => setIsDemoExpanded(!isDemoExpanded)}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <UserCheck size={20} className="text-blue-600" />
              </div>
              <div className="text-left leading-tight">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 italic">Demo Access</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{ROLES.length} Experience Roles Available</p>
              </div>
            </div>
            <div className={cn(
              "w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all",
              isDemoExpanded && "bg-blue-600 text-white"
            )}>
              {isDemoExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {isDemoExpanded && (
            <div className="p-4 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => fillDemo(role.email)}
                  className="flex flex-col items-start p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-left group"
                >
                  <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1 italic px-1.5 py-0.5 bg-blue-50 rounded-md">Role: {role.role}</span>
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{role.email}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeautifulLogin;