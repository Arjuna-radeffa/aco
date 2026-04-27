import React from 'react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';
import { 
  ChevronRight, 
  Menu, 
  X, 
  Search,
  Globe,
  ShieldCheck,
  CreditCard,
  Heart
} from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: any) => void;
  simple?: boolean; // For Register/KYC as per spec
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children, 
  activeView, 
  onNavigate,
  simple = false 
}) => {
  const currentUser = useStore((state: any) => state.currentUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Beranda', view: 'home', id: 'p-nav-home' },
    { label: 'Browse', view: 'browse', id: 'p-nav-browse' },
    { label: 'Zakat', view: 'zakat', id: 'p-nav-zakat' },
    { label: 'Tentang ACO', view: 'about', id: 'p-nav-about' },
  ];

  const getDashboardView = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'arief':
      case 'investment officer': return 'dashboard';
      case 'sinta':
      case 'portfolio monitor': return 'dashboard';
      case 'hendra':
      case 'finance officer': return 'dashboard';
      case 'reza':
      case 'admin': return 'dashboard';
      default: return 'ex-dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500 selection:text-white">
      {/* --- NAVBAR --- */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50"
      )}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate({ view: 'home' })}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black italic text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">A</div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">ACO Platform</span>
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Professional Edge v2.0</span>
            </div>
          </div>

          {/* Nav Links (Desktop) - Hidden if "simple" */}
          {!simple && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate({ view: link.view })}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2",
                    activeView === link.view 
                      ? "text-emerald-600 dark:text-emerald-400" 
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {link.label}
                  {activeView === link.view && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-in fade-in zoom-in duration-300" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Auth Buttons / Dashboard */}
          <div className="flex items-center gap-4">
             {currentUser ? (
              <button 
                onClick={() => onNavigate({ view: getDashboardView(currentUser.role) })}
                className="px-6 py-2.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                Dashboard <ChevronRight size={14} />
              </button>
            ) : (
              !simple && (
                <>
                  <button 
                    onClick={() => onNavigate({ view: 'login' })}
                    className="hidden sm:block px-6 py-2.5 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Masuk
                  </button>
                  <button 
                    onClick={() => onNavigate({ view: 'register' })}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Daftar
                  </button>
                </>
              )
            )}

            {/* Mobile Toggle */}
            {!simple && (
              <button 
                className="md:hidden p-2 text-slate-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && !simple && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate({ view: link.view });
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- CONTENT --- */}
      <main className={cn(
        "pt-20",
        simple ? "" : "pb-0"
      )}>
        {children}
      </main>

      {/* --- FOOTER --- */}
      {!simple && (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-20 mt-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
             <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 dark:bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black italic text-xl">A</div>
                <span className="text-lg font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">ACO Platform</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-medium">
                Pionir ekosistem wakaf produktif dan investasi syariah terintegrasi. Membangun kemandirian umat melalui transparansi teknologi.
              </p>
              <div className="flex gap-4">
                {[Globe, ShieldCheck, CreditCard, Heart].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all cursor-pointer">
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white italic">Navigasi Utama</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => onNavigate({ view: link.view })}
                      className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white italic">Legals & Privacy</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => onNavigate({ view: 'terms' })} className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">Syarat & Ketentuan</button>
                </li>
                <li>
                  <button onClick={() => onNavigate({ view: 'privacy' })} className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">Kebijakan Privasi</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 pt-20 border-t border-slate-50 dark:border-slate-800/50 mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              © {new Date().getFullYear()} ACO Platform by Arjuna-radeffa. Semua hak dilindungi.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">System Operational</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
