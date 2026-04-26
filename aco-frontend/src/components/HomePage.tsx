import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Target, 
  TrendingUp, 
  Users, 
  Heart, 
  ShieldCheck, 
  Globe, 
  Lock, 
  Percent, 
  LayoutDashboard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { mockProjects } from '../data/projectMockData';
import ProjectSummaryCard from './ProjectSummaryCard';
import { GlassCard } from './atoms/GlassCard';
import { cn } from '../utils/cn';

interface HomePageProps {
  onViewDetail: (id: string) => void;
  onNavigate: (view: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewDetail, onNavigate }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeWorkTab, setActiveWorkTab] = useState<'invest' | 'waqf'>('invest');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        if (data && Array.isArray(data) && data.length > 0) {
          setProjects(data.slice(0, 6)); // Hero/Featured projects
        } else {
          setProjects(mockProjects.slice(0, 6));
        }
      } catch (err) {
        setProjects(mockProjects.slice(0, 6));
      }
    };
    fetchProjects();
  }, []);

  const stats = [
    { label: "Proyek Aktif", value: 42, icon: <Target className="text-blue-600" /> },
    { label: "Total Investasi", value: "Rp 8.4B", icon: <TrendingUp className="text-emerald-600" /> },
    { label: "Wakaf Terkumpul", value: "Rp 2.1B", icon: <Heart className="text-pink-600" /> },
    { label: "Partisipan", value: "1.2K+", icon: <Users className="text-indigo-600" /> },
  ];

  const steps = {
    invest: [
      { id: "01", title: "Daftar & KYC", desc: "Registrasi akun dan upload dokumen identitas untuk verifikasi aman." },
      { id: "02", title: "Pilih Proyek", desc: "Jelajahi berbagai proyek produktif dengan transparansi RAB 100%." },
      { id: "03", title: "Konfirmasi", desc: "Tentukan nominal investasi dan setujui akad kerja sama syariah." },
      { id: "04", title: "Bagi Hasil", desc: "Terima laporan bulanan dan bagi hasil otomatis ke dashboard Anda." }
    ],
    waqf: [
      { id: "01", title: "Pilih Program", desc: "Cari program wakaf uang yang sesuai dengan niat jariah Anda." },
      { id: "02", title: "Ikrarkan Wakaf", desc: "Niatkan wakaf melalui sistem dengan akad yang sah secara syariah." },
      { id: "03", title: "Pantau Dampak", desc: "Dapatkan update real-time penyaluran manfaat wakaf ke mustahiq." },
      { id: "04", title: "Abadi", desc: "Dana wakaf Anda terjaga permanen dan terus mengalirkan pahala." }
    ]
  };

  const advantages = [
    { title: "Sesuai Syariah", desc: "Filter sistem yang mencegah pencampuran dana dan menjamin akad sah.", icon: <ShieldCheck size={32} /> },
    { title: "Transparan", desc: "Akses detail RAB dan monitoring real-time pergerakan dana proyek.", icon: <Globe size={32} /> },
    { title: "Dana Terisolasi", desc: "Empat pilar rekening terpisah untuk menjamin keamanan kategori dana.", icon: <Lock size={32} /> },
    { title: "Diawasi Penuh", desc: "Audit log internal yang immutable dan pemantauan pihak ketiga.", icon: <LayoutDashboard size={32} /> }
  ];

  return (
    <div className="space-y-40 pb-40 animate-in fade-in duration-1000">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Decors */}
        <div className="absolute top-0 inset-x-0 h-full pointer-events-none overflow-hidden opacity-50 dark:opacity-20 flex justify-center">
            <div className="w-[1200px] h-full bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[200px] translate-y-[-50%]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white dark:border-slate-800 rounded-full shadow-sm hover:scale-105 transition-transform cursor-default">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Next-Gen Waqf & Investment Ecosystem</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.8] max-w-5xl mx-auto">
            Masa <span className="text-blue-600">Depan</span> Keuangan <span className="text-blue-600">Syariah</span> Terpadu.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto italic leading-relaxed">
            Platform investasi dan wakaf produktif pertama yang mengutamakan transparansi penuh melalui sistem audit log immutable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <button 
              onClick={() => onNavigate({ view: 'browse', tab: 'investasi' })}
              className="group px-10 py-5 bg-blue-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              Mulai Investasi <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate({ view: 'browse', tab: 'wakaf' })}
              className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Wakafkan Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <GlassCard key={i} className="p-10 bg-white/70 dark:bg-slate-900/50 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {s.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.label}</p>
              <h3 className="text-4xl font-black italic text-slate-900 dark:text-white uppercase leading-none">{s.value}</h3>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 space-y-20 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter">Cara <span className="text-blue-600">Berpartisipasi</span></h2>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={() => setActiveWorkTab('invest')}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeWorkTab === 'invest' ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl" : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              )}
            >
              Investasi
            </button>
            <button 
              onClick={() => setActiveWorkTab('waqf')}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeWorkTab === 'waqf' ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl" : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              )}
            >
              Wakaf
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps[activeWorkTab].map((step, i) => (
            <div key={i} className="space-y-6 relative group">
              {i < 3 && <div className="hidden md:block absolute top-10 left-[80%] w-full h-[2px] bg-slate-100 dark:bg-slate-800 z-0" />}
              <div className="w-20 h-20 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto text-2xl font-black italic text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all relative z-10 shadow-sm">
                {step.id}
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black italic uppercase text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest max-w-[180px] mx-auto italic">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[200px] translate-x-1/2 translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6 space-y-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 text-blue-400">
                <CheckCircle2 size={24} />
                <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Proyek <span className="text-white">Pilihan</span></h2>
              </div>
              <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-lg italic">
                Inisiatif unggulan yang telah tervalidasi secara finansial dan syariah untuk akselerasi ekonomi kolektif.
              </p>
            </div>
            <button 
              onClick={() => onNavigate({ view: 'browse' })}
              className="px-10 py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3"
            >
              Lihat Katalog Lengkap <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((p) => (
              <div 
                key={p.id} 
                onClick={() => onViewDetail(p.id)}
                className="transform transition-all active:scale-95 cursor-pointer"
              >
                <ProjectSummaryCard 
                  project={p} 
                  onViewDetail={() => onViewDetail(p.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ADVANTAGES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Mengapa <span className="text-blue-600 text tracking-normal">ACO?</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Core Value & Platform integrity</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, i) => (
            <GlassCard key={i} className="p-10 space-y-6 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-center group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center mx-auto transition-colors group-hover:bg-blue-600 group-hover:text-white">
                {adv.icon}
              </div>
              <h3 className="text-lg font-black italic uppercase text-slate-900 dark:text-white">{adv.title}</h3>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest italic">{adv.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 6: CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-blue-600 rounded-[4rem] p-16 md:p-32 text-center text-white space-y-12 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 translate-y-[-50%] group-hover:scale-110 transition-transform duration-1000" />
          
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] relative z-10">
            Siap Berkontribusi <br /><span className="text-slate-900">Membangun</span> Negeri?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 relative z-10">
            <button 
              onClick={() => onNavigate({ view: 'register' })}
              className="px-12 py-6 bg-white text-blue-600 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              Daftar Sekarang <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => onNavigate({ view: 'browse' })}
              className="px-10 py-6 bg-blue-700 text-white border-2 border-blue-400/30 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-800 transition-all"
            >
              Browse Proyek
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
