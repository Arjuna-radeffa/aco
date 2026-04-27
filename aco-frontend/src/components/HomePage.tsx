import React, { useState } from 'react';
import { 
  TrendingUp, 
  Heart, 
  Users, 
  FolderOpen, 
  Shield, 
  Eye, 
  Lock, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import ProjectSummaryCard from './ProjectSummaryCard';
import ZakatCard from './molecules/ZakatCard';
import { mockProjects } from '../data/projectMockData';
import { mockZakatProjects } from '../data/zakatMockData';
import { cn } from '../utils/cn';

interface HomePageProps {
  onViewDetail: (id: string) => void;
  onNavigate: (view: any) => void;
}

// --- Sub-components (Reference-based) ---

function StatCard({ icon: Icon, label, value }: {
  icon: any; label: string; value: string | number;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col gap-4 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group border-b-4 border-b-slate-100 hover:border-b-emerald-500">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <Icon size={24} className="text-emerald-600" />
      </div>
      <div>
        <p className="text-3xl font-black text-slate-900 italic tracking-tighter">
          {value}
        </p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
      </div>
    </div>
  );
}

function StepCard({ step, title, desc, active }: {
  step: number; title: string; desc: string; active?: boolean;
}) {
  return (
    <div className={cn(
      "relative flex flex-col gap-5 p-8 rounded-[2.5rem] border transition-all duration-500 h-full group",
      active 
        ? "bg-white border-emerald-100 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-50" 
        : "bg-slate-50 border-transparent opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-white hover:border-slate-100"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center font-black text-xl italic shadow-lg transition-colors duration-500",
        active ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600"
      )}>
        {step}
      </div>
      <div>
        <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors uppercase tracking-tight italic">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}

const HomePage: React.FC<HomePageProps> = ({ onViewDetail, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'investasi' | 'wakaf'>('investasi');
  const [filter, setFilter] = useState<{ komersial: boolean; sosial: boolean }>({ komersial: false, sosial: false });
  const [zakatFilter, setZakatFilter] = useState('All');

  const filteredProjects = mockProjects.filter(p => {
    const isKomersial = p.metadata.allocation.commercial === 100;
    const isSosial = p.metadata.allocation.social === 100;
    
    if (filter.komersial && filter.sosial) {
      return p.metadata.allocation.commercial > 0 || p.metadata.allocation.social > 0;
    }
    if (filter.komersial) return isKomersial;
    if (filter.sosial) return isSosial;
    
    return true; // Default
  }).slice(0, 3);

  const handleViewDetail = (id: string) => {
    onViewDetail(id);
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none opacity-40" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800 italic">
                Trusted by 1.3K+ Verified Participants
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-10 italic tracking-tighter uppercase text-slate-900 leading-[0.85]">
              Mewujudkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Amanah</span> <br /> 
              Dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Transparansi</span> Mutlak.
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 mb-14 max-w-2xl mx-auto font-medium italic leading-relaxed">
              Bergabunglah dalam ekosistem investasi dan sosial yang adil dengan teknologi tata kelola tercanggih di Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => onNavigate({ view: 'browse' })}
                className="px-14 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase tracking-[0.2em] rounded-2xl transition-all shadow-2xl shadow-emerald-500/30 active:scale-95 flex items-center justify-center gap-3 group"
              >
                Mulai Partisipasi
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FolderOpen} label="Proyek Terverifikasi" value="24" />
            <StatCard icon={TrendingUp} label="Total Investasi" value="Rp 18.5M" />
            <StatCard icon={Heart} label="Total Wakaf Uang" value="Rp 4.2M" />
            <StatCard icon={Users} label="Laporan Terbit" value="1.3K+" />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 italic tracking-tight mb-4">Mulai Hanya Dalam 4 Langkah.</h2>
            <div className="inline-flex bg-slate-100 rounded-2xl p-1.5 mt-6">
              <button onClick={() => setActiveTab('investasi')} className={cn("px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] italic", activeTab === 'investasi' ? "bg-white text-emerald-600 shadow-xl" : "text-slate-400")}>Investasi</button>
              <button onClick={() => setActiveTab('wakaf')} className={cn("px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] italic", activeTab === 'wakaf' ? "bg-white text-emerald-600 shadow-xl" : "text-slate-400")}>Wakaf</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === 'investasi' ? [
              { step: 1, title: "Register & KYC", desc: "Verifikasi identitas untuk keamanan transaksi Anda." },
              { step: 2, title: "Analisis Proyek", desc: "Pilih rincian bisnis yang ingin anda kembangkan." },
              { step: 3, title: "Akad Digital", desc: "Tanda tangani perjanjian bagi hasil secara sah." },
              { step: 4, title: "Hasil Berkah", desc: "Pantau profit secara periodik melalui dashboard." },
            ] : [
              { step: 1, title: "Niat & Register", desc: "Daftar sebagai Wakif dan pilih kategori program." },
              { step: 2, title: "Pilih Program", desc: "Pilih proyek wakaf produktif yang berdampak." },
              { step: 3, title: "Ikrar Wakaf", desc: "Lakukan setoran wakaf uang secara digital." },
              { step: 4, title: "Pantau Jariyah", desc: "Terima laporan audit pemanfaatan dana wakaf." },
            ]).map((step, idx) => (
              <StepCard key={idx} {...step} active={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Zakat & Sosial Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Heart className="w-3 h-3" /> Transparansi Sosial Mutlak
              </div>
              <h2 className="text-4xl font-bold text-slate-900 italic tracking-tight mb-2 uppercase">Zakat & Sosial.</h2>
              <p className="text-slate-500 font-medium max-w-md">Salurkan kewajiban Zakat Anda melalui program yang terverifikasi dan berdampak langsung.</p>
            </div>
            
            <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 gap-1 overflow-x-auto max-w-full">
              {['All', 'Fitrah', 'Profesi', 'Maal', 'Emas'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setZakatFilter(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase italic whitespace-nowrap transition-all",
                    zakatFilter === cat ? "bg-emerald-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockZakatProjects
              .filter(p => zakatFilter === 'All' || p.type === zakatFilter)
              .slice(0, 3)
              .map(project => (
                <ZakatCard key={project.id} project={project} onClick={(id) => onNavigate({ view: 'zakat-detail', projectId: id })} />
              ))}
          </div>

          <div className="mt-16 text-center">
             <button 
               onClick={() => onNavigate({ view: 'zakat' })}
               className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-700 transition-colors group"
             >
               Lihat Semua Program Zakat <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl font-bold text-slate-900 italic tracking-tight">Proyek Unggulan.</h2>
            <div className="flex bg-white p-2 rounded-2xl border border-slate-100 gap-2">
              <button onClick={() => setFilter(f => ({ ...f, komersial: !f.komersial }))} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase italic", filter.komersial ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-400")}>Komersial</button>
              <button onClick={() => setFilter(f => ({ ...f, sosial: !f.sosial }))} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase italic", filter.sosial ? "bg-amber-500 text-white" : "bg-slate-50 text-slate-400")}>Sosial</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectSummaryCard key={project.id} project={project} onViewDetail={handleViewDetail} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black text-white italic tracking-tighter mb-8 uppercase">Berdayakan Masa Depan Melalui Amanah.</h2>
          <div className="flex justify-center gap-5">
            <button 
              onClick={() => onNavigate({ view: 'register' })}
              className="px-12 py-5 bg-emerald-600 text-white font-black italic uppercase rounded-2xl"
            >
              Daftar Sekarang
            </button>
            <button 
              onClick={() => onNavigate({ view: 'login' })}
              className="px-12 py-5 bg-white/10 text-white font-black italic uppercase rounded-2xl"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
