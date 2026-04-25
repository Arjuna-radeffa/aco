import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight, Shield, TrendingUp, Building2, Menu, X, BarChart3, Target, Users, LayoutGrid, Clock, ChevronDown, CheckCircle2, Heart } from 'lucide-react';
import { api } from '../services/api';
import { Project } from '../types/projectTypes';
import { mockProjects } from '../data/projectMockData';
import ProjectSummaryCard from './ProjectSummaryCard';

interface HomePageProps {
  onLoginClick: () => void;
  onQuickLoginClick: (role: string) => void;
  onViewProjects: () => void;
  onViewZisProjects: () => void;
  onViewDetail: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginClick, onQuickLoginClick, onViewProjects, onViewZisProjects, onViewDetail }) => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        if (data && Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          // Fallback to mock data if API returns empty
          setProjects(mockProjects);
        }
      } catch (err) {
        console.error('Failed to fetch projects for homepage:', err);
        // Fallback to mock data on error (like SyntaxError from HTML response)
        setProjects(mockProjects);
      }
    };
    fetchProjects();
  }, []);

  const getProjectImage = (title: string) => {
    const t = title?.toLowerCase() || '';
    if (t.includes('lumbung') || t.includes('pangan') || t.includes('farm')) return '/projects/farm.png';
    if (t.includes('ruko') || t.includes('properti')) return '/projects/ruko.png';
    if (t.includes('laundry') || t.includes('umkm')) return '/projects/laundry.png';
    return '/projects/farm.png';
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const roles = [
    { title: 'External User', description: 'Jelajahi proyek publik, investasi & wakaf tanpa kerumitan. Daftar gratis.', roles: ['investasi_mikro', 'funder'], color: 'from-indigo-600 to-violet-600', labels: ['Investor (Demo)', 'Universal Funder (Demo)'] },
    { title: 'Investor', description: 'Kelola portofolio investasi Anda dengan transparansi penuh dan laporan real-time.', roles: ['Investasi Mikro', 'Investasi Enterprise'], color: 'from-blue-600 to-cyan-600', labels: ['Investasi Mikro', 'Investasi Enterprise'] },
    { title: 'Universal Funder', description: 'Integrasi donasi ZIS, wakaf aset/dana, dan investasi dalam satu ekosistem.', roles: ['Funder'], color: 'from-emerald-600 to-teal-600', labels: ['Muzakki / Wakif'] },
    { title: 'Officer', description: 'Kelola dan awasi operasional ACO Platform dengan kontrol penuh.', roles: ['Finance', 'Investment', 'Portfolio Monitor'], color: 'from-amber-600 to-orange-600', labels: ['Finance', 'Investment', 'Portfolio Monitor'] }
  ];

  const faqs = [
    { q: "Bagaimana cara menjadi investor di ACO?", a: "Pendaftaran dapat dilakukan langsung melalui portal dengan verifikasi KYC yang mudah dan cepat." },
    { q: "Apakah dana sosial (ZISWAF) dikelola secara terpisah?", a: "Ya, kami menggunakan sistem isolasi rekening yang ketat untuk memastikan dana sosial tidak bercampur dengan dana operasional atau investasi." },
    { q: "Bagaimana transparansi laporan proyek?", a: "Setiap proyek memiliki dashboard real-time yang dapat diakses oleh investor, mencakup laporan keuangan dan progres fisik." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg italic">A</div>
            <span className="text-xl font-bold tracking-tight">ACO <span className="text-blue-600">Platform</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
            <button onClick={onViewProjects} className="hover:text-blue-600 transition-colors">Proyek</button>
            <a href="#zis" className="hover:text-blue-600 transition-colors">ZIS</a>
            <a href="#vision" className="hover:text-blue-600 transition-colors">Visi & Misi</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Fitur</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimoni</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onLoginClick} className="hidden sm:block px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-200">Portal Login</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden bg-white border-b border-slate-200 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="p-6 space-y-4 font-bold text-slate-600">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-600">Tentang Kami</a>
            <button onClick={() => { onViewProjects(); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-600">Semua Proyek</button>
            <button onClick={() => { onViewZisProjects(); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-600">Proyek ZIS</button>
            <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-600">Visi & Misi</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-600">Fitur Utama</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-600">Testimoni</a>
            <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="w-full py-3 bg-blue-600 text-white rounded-xl">Portal Login</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-4 md:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 border border-blue-200 rounded-full text-blue-700 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Platform Keuangan Syariah Terintegrasi
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
                Kelola Amanah dengan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 italic">
                  Transparansi Mutlak
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                Ekosistem investasi dan sosial yang adil. Isolasi rekening ketat, verifikasi dewan syariah, dan audit transparansi untuk semua pihak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={onLoginClick} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-xl">
                  Masuk Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#about" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all text-center flex items-center justify-center">Pelajari Lebih Lanjut</a>
              </div>
            </div>
            <div className="relative flex justify-center py-10 lg:py-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-20"></div>
              <div className="relative z-10 w-64 h-64 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center border border-slate-100">
                <div className="text-9xl font-black bg-gradient-to-br from-blue-600 to-emerald-600 bg-clip-text text-transparent italic">A</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study: Proyek Berkelanjutan */}
      <section className="py-24 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-indigo-600 font-black uppercase tracking-widest text-sm mb-2">Model Bisnis Dinamis</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Case Study: Proyek Berkelanjutan</h3>
              <p className="text-slate-600 mt-4 max-w-2xl font-medium leading-relaxed">
                Platform ACO mendukung berbagai model kepemilikan dan pendanaan, mulai dari Proyek di Lahan Wakaf (Hybrid Ownership) hingga Sukuk Bagi Hasil pada Lahan Komersil.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 italic">Role Recommendation</p>
                <p className="text-sm font-bold text-slate-800">Investment Officer & Investor</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {mockProjects.slice(0, 3).map((project) => (
              <ProjectSummaryCard
                key={project.id}
                project={project}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
          {mockProjects.length > 3 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {mockProjects.slice(3).map((project) => (
                <ProjectSummaryCard
                  key={project.id}
                  project={project}
                  onViewDetail={onViewDetail}
                />
              ))}
            </div>
          )}

          <div className="mt-16 p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h4 className="text-2xl font-bold italic">Siap Menghitung Akad?</h4>
              <p className="text-slate-400 font-medium">Beralih ke dashboard untuk mensimulasikan bagi hasil dan alokasi asnaf secara real-time.</p>
            </div>
            <button onClick={onLoginClick} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 whitespace-nowrap shrink-0">
              Buka Dashboard Simulasi
            </button>
          </div>
        </div>
      </section>

      {/* ZIS (Zakat, Infaq, Shadaqah) Section */}
      <section id="zis" className="py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm mb-4">Ekonomi Sosial</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Zakat, Infaq, & Shadaqah</h3>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
              Salurkan amanah Anda melalui program sosial berkelanjutan yang terintegrasi. Transparansi penuh dari Muzakki hingga Mustahiq.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Zakat Maal', 
                desc: 'Sucikan harta Anda dengan perhitungan akurat sesuai syariat.', 
                impact: '8 Asnaf Terverifikasi',
                icon: <Heart className="w-8 h-8 text-emerald-600" />,
                bg: 'bg-emerald-50'
              },
              { 
                title: 'Infaq Program', 
                desc: 'Dukung program sosial dan kemanusiaan yang berdampak luas.', 
                impact: '12 Program Aktif',
                icon: <Users className="w-8 h-8 text-blue-600" />,
                bg: 'bg-blue-50'
              },
              { 
                title: 'Wakaf Produktif', 
                desc: 'Abadikan manfaat harta Anda melalui pengelolaan aset produktif.', 
                impact: '5 Aset Berjalan',
                icon: <Building2 className="w-8 h-8 text-purple-600" />,
                bg: 'bg-purple-50'
              }
            ].map((item, idx) => (
              <div key={idx} className={`${item.bg} p-10 rounded-[3rem] border border-white shadow-xl hover:-translate-y-2 transition-all duration-300`}>
                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm">{item.icon}</div>
                <h4 className="text-2xl font-black mb-4 text-slate-900 italic">{item.title}</h4>
                <p className="text-slate-600 font-medium mb-8 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {item.impact}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-3xl border border-emerald-100 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-xl font-black italic text-slate-900">Donasi Cepat Tanpa Login</h4>
              <p className="text-sm font-medium text-slate-500 mt-1">Salurkan zakat/infaq seketika via QRIS atau Virtual Account</p>
            </div>
            <div className="flex w-full md:w-auto relative items-center">
              <span className="absolute left-4 text-slate-400 font-bold">Rp</span>
              <input type="number" placeholder="50.000" className="w-full md:w-64 pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 focus:outline-none focus:border-emerald-500" />
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 whitespace-nowrap">
              Bayar Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section id="proyek" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-2">Direktori Investasi</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Pilih Amanah Anda</h3>
              <p className="text-slate-600 mt-2 max-w-lg font-medium">Temukan peluang investasi syariah yang berdampak nyata.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => scroll('left')} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-600 shadow-sm transition-all"><ChevronRight size={20} className="rotate-180" /></button>
              <button onClick={() => scroll('right')} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-600 shadow-sm transition-all"><ChevronRight size={20} /></button>
              <button onClick={onViewProjects} className="ml-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 text-sm">Lihat Semua <ArrowRight size={16} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {projects.map((p) => {
              const raised = p.currentFunding ?? p.raisedFunding ?? 0;
              const pct = p.targetFunding > 0 ? Math.min(100, (raised / p.targetFunding) * 100) : 0;
              const pctStr = pct.toFixed(0);
              const title = p.title || p.name || 'Proyek';
              return (
                <div key={p.id} className="min-w-[300px] md:min-w-[360px] bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all group flex flex-col snap-start shrink-0">
                  <div className="h-48 relative overflow-hidden">
                    <img src={p.imageUrl || getProjectImage(title)} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black uppercase text-slate-700 border border-slate-100">{p.category}</div>
                  </div>
                  <div className="p-7 flex flex-1 flex-col">
                    <h4 className="text-lg font-bold text-slate-900 mb-5 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{title}</h4>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Return</p>
                        <p className="text-lg font-bold text-emerald-600">14-16%</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Partisipan</p>
                        <p className="text-lg font-bold text-slate-700">{p.investorCount ?? '—'}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span className="text-blue-600">{pctStr}% terpenuhi</span>
                        <span>dari {p.targetFunding >= 1e9 ? (p.targetFunding / 1e9).toFixed(1) + 'M' : (p.targetFunding / 1e6).toFixed(0) + 'Jt'}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${pctStr}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => onViewDetail(p.id)}
                        className="flex-1 py-3.5 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-1"
                      >
                        Detail <ChevronRight size={16} />
                      </button>
                      <button
                        onClick={onLoginClick}
                        className="flex-1 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all text-sm"
                      >
                        Investasi
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complex Hierarchy Showcase - Wakaf Bogor */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[150px] -mr-96 -mt-96"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-emerald-400 font-black uppercase tracking-widest text-sm mb-4">Showcase Hirarki Kompleks v3.2</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Komplek Wakaf Terpadu Bogor</h3>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
              Contoh struktur multi-node dimana aset komersial menopang aset sosial secara mandiri dalam satu payung wakaf besar.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {/* Parent Node */}
            <div className="bg-slate-800 border-2 border-emerald-500/50 p-8 rounded-3xl w-full max-w-md text-center relative z-20 shadow-2xl">
               <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Root Parent (Tertutup)</div>
               <h4 className="text-2xl font-black italic">Yayasan Wakaf Bogor Raya</h4>
               <p className="text-sm text-slate-400 font-medium mt-2">Pusat kelola terpadu. Pendanaan di level ini sudah ditutup.</p>
            </div>
            
            <div className="w-1 h-12 bg-slate-700"></div>
            <div className="w-full max-w-4xl border-t-2 border-slate-700 relative">
               <div className="w-1 h-12 bg-slate-700 absolute left-1/4 top-0"></div>
               <div className="w-1 h-12 bg-slate-700 absolute right-1/4 top-0"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mt-12">
               {/* Commercial Wing */}
               <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h5 className="text-xl font-black italic text-blue-400">Pilar Komersial</h5>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Investasi Terbuka</p>
                     </div>
                     <Building2 className="text-blue-500/50" size={32} />
                  </div>
                  <div className="space-y-4">
                     <div onClick={() => onViewDetail('3')} className="p-4 bg-slate-800 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-blue-500 border border-transparent transition-all">
                        <div>
                           <p className="font-bold text-white group-hover:text-blue-400 transition-colors">RS Harapan Bunda</p>
                           <p className="text-[10px] text-slate-400">Target: Rp 12M</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase rounded">Investasi</span>
                     </div>
                     <div onClick={() => onViewDetail('4')} className="p-4 bg-slate-800 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-blue-500 border border-transparent transition-all">
                        <div>
                           <p className="font-bold text-white group-hover:text-blue-400 transition-colors">Perumahan Asri Cluster</p>
                           <p className="text-[10px] text-slate-400">Target: Rp 45M</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase rounded">Investasi</span>
                     </div>
                  </div>
               </div>

               {/* Social Wing */}
               <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h5 className="text-xl font-black italic text-emerald-400">Pilar Sosial</h5>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Wakaf Terbuka</p>
                     </div>
                     <Heart className="text-emerald-500/50" size={32} />
                  </div>
                  <div className="space-y-4">
                     <div onClick={() => onViewDetail('1')} className="p-4 bg-slate-800 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-emerald-500 border border-transparent transition-all">
                        <div>
                           <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">Masjid Raya Al-Muhajirin</p>
                           <p className="text-[10px] text-slate-400">Target Wakaf: Rp 5M</p>
                        </div>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase rounded">W. Dana</span>
                     </div>
                     <div onClick={() => onViewDetail('2')} className="p-4 bg-slate-800 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-emerald-500 border border-transparent transition-all">
                        <div>
                           <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">Taman Bermain Anak</p>
                           <p className="text-[10px] text-slate-400">Kebutuhan Eskavator</p>
                        </div>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[9px] font-black uppercase rounded">W. Aset</span>
                     </div>
                  </div>
               </div>
            </div>
            <p className="text-sm font-bold italic text-slate-500 mt-12 text-center max-w-2xl">
               *Sesuai spesifikasi v3.2, pengunjung bisa menyalurkan wakaf spesifik ke "Taman Bermain Anak" meskipun yayasan induk ("Yayasan Wakaf Bogor Raya") sudah ditutup pendanaannya.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-inner relative transition-transform group-hover:scale-95 duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-emerald-600/10"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center">
                    <h4 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 italic">Empowering</h4>
                    <p className="text-blue-600 font-black text-2xl uppercase tracking-[0.2em]">The Ummah</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm hidden lg:block transform rotate-3 hover:rotate-0 transition-transform cursor-default">
                <p className="text-sm font-medium italic opacity-80 leading-relaxed">"ACO bukan sekadar platform, tapi gerakan revolusi transparansi amanah dalam ekosistem syariah modern."</p>
                <p className="mt-6 font-black text-blue-400 text-xs tracking-widest uppercase">— Tim ACO Indonesia</p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm">Filosofi Kami</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Membangun Ekosistem Keuangan yang Adil</h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                ACO (Amanah, Capital, & Organization) lahir dari semangat mengembalikan nilai-masing-masing dalam pengelolaan dana masyarakat, baik investasi produktif maupun dana sosial ZISWAF.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield size={18} />, text: "Transparansi mutlak dengan laporan real-time melalui dashboard." },
                  { icon: <Target size={18} />, text: "Isolasi dana yang ketat untuk keamanan dan kepatuhan syariah." },
                  { icon: <CheckCircle2 size={18} />, text: "Verifikasi berkelanjutan oleh Dewan Pengawas Syariah." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                    <div className="w-10 h-10 bg-blue-100/50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <p className="text-slate-700 font-bold leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] -ml-64 -mb-64"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-blue-400 font-black uppercase tracking-widest text-sm mb-4">Misi & Visi</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6">Pilar Pergerakan Kami</h3>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Tiga fundament utama yang menjamin keberlanjutan dan keberkahan setiap aktivitas di platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Shield size={40} />, title: "Amanah", desc: "Integritas tinggi dalam menjaga kepercayaan setiap rupiah yang dititipkan.", color: "text-blue-400" },
              { icon: <TrendingUp size={40} />, title: "Capital", desc: "Menggerakkan modal secara produktif untuk keberlanjutan ekonomi umat.", color: "text-emerald-400" },
              { icon: <Building2 size={40} />, title: "Organization", desc: "Tata kelola modern berbasis sistem yang profesional dan transparan.", color: "text-purple-400" }
            ].map((v, i) => (
              <div key={i} className="relative group bg-white/5 border border-white/10 p-12 rounded-[3.5rem] hover:bg-white/10 transition-all duration-500">
                <div className={`${v.color} mb-8 group-hover:scale-110 transition-transform origin-left`}>{v.icon}</div>
                <h4 className="text-3xl font-black mb-4 italic tracking-tighter">{v.title}</h4>
                <p className="text-slate-400 font-medium leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">Fitur Utama</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Kelebihan ACO Platform</h3>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">Dukungan teknologi modern untuk pengelolaan keuangan yang aman dan syariah.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-blue-100 group">
              <BarChart3 className="mb-4 text-blue-600" size={40} /><h3 className="font-black mb-2 text-lg">Investasi Transparan</h3><p className="text-sm text-slate-600 font-medium leading-relaxed">Akses real-time laporan keuangan dan audit berkala untuk setiap proyek.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-emerald-100 group">
              <Users className="mb-4 text-emerald-600" size={40} /><h3 className="font-black mb-2 text-lg">Isolasi Rekening</h3><p className="text-sm text-slate-600 font-medium leading-relaxed">Pemisahan dana investasi dan sosial yang ketat untuk menjaga kemurnian amanah.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-amber-100 group">
              <CheckCircle2 className="mb-4 text-amber-600" size={40} /><h3 className="font-black mb-2 text-lg">Verifikasi Syariah</h3><p className="text-sm text-slate-600 font-medium leading-relaxed">Kepatuhan penuh diawasi Dewan Pengawas Syariah dari setiap proses bisnis.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-purple-100 group">
              <Clock className="mb-4 text-purple-600" size={40} /><h3 className="font-black mb-2 text-lg">Audit Terbuka</h3><p className="text-sm text-slate-600 font-medium leading-relaxed">Setiap transaksi dapat diverifikasi secara publik untuk menjamin kejujuran.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">Testimoni</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Kesan Mereka Bersama Kami</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Hj. Ahmad Fauzi", role: "Investor Mikro", quote: "Transparansi di ACO luar biasa. Saya bisa pantau tiap rupiah yang saya investasikan setiap hari lewat dashboard." },
              { name: "Sarah Malik", role: "Muzakki", quote: "Penyaluran Zakat yang sangat profesional. Laporan distribusinya sangat detail dan terdokumentasi dengan baik." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 relative group hover:shadow-2xl transition-shadow">
                <div className="text-blue-600 mb-6 opacity-20"><Target size={40} /></div>
                <p className="text-lg text-slate-700 font-bold mb-8 leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="font-black text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Grid */}
      <section id="roles" className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm">Ekosistem 11 Role</h2>
            <h3 className="text-4xl font-extrabold tracking-tight">Pilih Peran Anda</h3>
            <p className="text-slate-600 font-medium">Klik pada peran untuk masuk ke portal demo yang sesuai</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r, i) => (
              <div
                key={i}
                className={`p-8 bg-gradient-to-br ${r.color} rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between min-h-[320px] transition-all hover:-translate-y-2 hover:shadow-2xl`}
                onMouseEnter={() => setHoveredRole(r.title)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <div>
                  <h4 className="text-xl font-black mb-3 italic tracking-tighter">{r.title}</h4>
                  <p className="text-sm text-white/80 font-bold leading-relaxed">{r.description}</p>
                </div>
                <div className={`space-y-2 mt-6 transition-all duration-300 ${hoveredRole === r.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  {(r.labels ?? r.roles).map((label: string, ri: number) => (
                    <button
                      key={ri}
                      onClick={() => onQuickLoginClick(r.roles[ri] ?? label.toLowerCase().replace(/\s+/g, '_'))}
                      className="w-full py-3 bg-white/20 hover:bg-white/40 rounded-2xl text-[10px] font-black uppercase tracking-wider text-left px-5 flex items-center justify-between transition-all"
                    >
                      {label} <ChevronRight size={14} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">FAQ</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pertanyaan Populer</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm transition-all">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-black text-slate-800 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">{i + 1}</span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`text-slate-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-40 py-8 px-12' : 'max-h-0'}`}>
                  <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center font-black text-3xl italic shadow-2xl">A</div>
            <h4 className="text-3xl font-extrabold tracking-tighter">ACO Platform Indonesia</h4>
          </div>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            Membangun kemandirian ekonomi umat melalui sinergi investasi produktif dan optimalisasi dana sosial yang terintegrasi secara profesional dan transparan.
          </p>
          <div className="flex justify-center gap-6 text-sm font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
          </div>
          <div className="pt-12 border-t border-slate-800 text-slate-600 text-xs font-bold font-mono">
            © 2024 ACO ENGINE v2.1. DESIGNED FOR TRANSPARENCY & GROWTH.
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default HomePage;
