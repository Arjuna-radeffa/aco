import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronRight, Shield, TrendingUp, Building2, Menu, X, BarChart3, Target, Users, LayoutGrid, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onLoginClick: () => void;
  onQuickLoginClick: (role: string) => void;
  onViewProjects: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginClick, onQuickLoginClick, onViewProjects }) => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const roles = [
    { title: 'Investor', description: 'Kelola portofolio investasi Anda dengan transparansi penuh', roles: ['Investasi Mikro', 'Investasi Enterprise'], color: 'from-blue-600 to-cyan-600' },
    { title: 'Filantropi', description: 'Penyalur Zakat, Infaq, dan Shadaqah dengan terpercaya', roles: ['Muzakki', 'Munfiq', 'Mutashadiq'], color: 'from-emerald-600 to-teal-600' },
    { title: 'Wakaf', description: 'Kelola aset wakaf produktif untuk generasi mendatang', roles: ['Wakif'], color: 'from-purple-600 to-pink-600' },
    { title: 'Officer', description: 'Kelola dan awasi operasional ACO Platform', roles: ['Finance', 'Investment', 'Portfolio Monitor'], color: 'from-amber-600 to-orange-600' }
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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg italic">A</div>
            <span className="text-xl font-bold tracking-tight">ACO <span className="text-blue-600">Platform</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
            <button onClick={onViewProjects} className="hover:text-blue-600 transition-colors">Proyek</button>
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
            {[
              { id: 1, title: "Lumbung Pangan Sukabumi", cat: "Agribisnis", roi: "12-15%", tenor: "12 Bln", img: "/projects/farm.png", progress: 75, target: "500jt" },
              { id: 2, title: "Ruko Syariah Mediterania", cat: "Properti", roi: "10-12%", tenor: "24 Bln", img: "/projects/ruko.png", progress: 40, target: "2.5M" },
              { id: 3, title: "Ekspansi Laundry Eco", cat: "UMKM", roi: "15-18%", tenor: "18 Bln", img: "/projects/laundry.png", progress: 90, target: "150jt" },
              { id: 4, title: "Kopi Arabika Gayo V2", cat: "Agribisnis", roi: "14-16%", tenor: "12 Bln", img: "/projects/farm.png", progress: 60, target: "300jt" }
            ].map((p) => (
              <div key={p.id} className="min-w-[300px] md:min-w-[380px] bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all group flex flex-col snap-start">
                <div className="h-52 relative overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-100 italic">{p.cat}</div>
                </div>
                <div className="p-8 flex flex-1 flex-col">
                  <h4 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">{p.title}</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ROI Est.</p><p className="text-lg font-bold text-emerald-600">{p.roi}</p></div>
                    <div className="text-right space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tenor</p><p className="text-lg font-bold text-slate-700">{p.tenor}</p></div>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500"><span>Terpendaan {p.progress}%</span><span>Target {p.target}</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{width: `${p.progress}%`}}></div></div>
                  </div>
                  <button onClick={onLoginClick} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95">Investasi Sekarang</button>
                </div>
              </div>
            ))}
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
                className={`p-10 bg-gradient-to-br ${r.color} rounded-[3rem] text-white shadow-xl flex flex-col justify-between min-h-[350px] transition-all hover:-translate-y-3 hover:shadow-2xl`}
                onMouseEnter={() => setHoveredRole(r.title)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <div>
                  <h4 className="text-2xl font-black mb-3 italic tracking-tighter">{r.title}</h4>
                  <p className="text-sm text-white/80 font-bold leading-relaxed">{r.description}</p>
                </div>
                <div className={`space-y-2 mt-8 transition-all duration-300 ${hoveredRole === r.title ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {r.roles.map((rn, ri) => (
                    <button 
                      key={ri} 
                      onClick={() => onQuickLoginClick(rn.toLowerCase().replace(/\s+/g, '_'))}
                      className="w-full py-3 bg-white/20 hover:bg-white/40 rounded-2xl text-[10px] font-black uppercase tracking-wider text-left px-5 flex items-center justify-between"
                    >
                      {rn} <ChevronRight size={14} />
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
                           <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">{i+1}</span>
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
