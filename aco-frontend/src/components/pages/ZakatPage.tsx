import React, { useState } from 'react';
import { ArrowLeft, Heart, Shield, Info, HelpCircle, CheckCircle2 } from 'lucide-react';
import ZakatCalculator from '../organisms/ZakatCalculator';
import ZakatCard from '../molecules/ZakatCard';
import { mockZakatProjects } from '../../data/zakatMockData';
import { cn } from '../../utils/cn';

interface ZakatPageProps {
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

const ZakatPage: React.FC<ZakatPageProps> = ({ onBack, onSelectProject }) => {
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'info' | 'faq' | 'syarat'>('info');

  const filteredProjects = mockZakatProjects.filter(p => filter === 'All' || p.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none opacity-60" />
        <div className="container mx-auto px-6 relative z-10 text-center">
           <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8 shadow-sm">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800 italic">Layanan Zakat Terverifikasi Syariah</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter uppercase text-slate-900 leading-tight">
             Tunaikan <span className="text-emerald-600">Zakat</span>,<br />Bersihkan Harta & Jiwa.
           </h1>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium italic leading-relaxed">
             Hitung dan salurkan zakat Anda secara tepat sasaran melalui program pemberdayaan mustahiq yang transparan dan berdampak nyata.
           </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-10 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <ZakatCalculator />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 italic tracking-tight mb-2">Program Zakat Pilihan.</h2>
              <p className="text-slate-500 font-medium">Pilih program penyaluran yang sesuai dengan niat Anda.</p>
            </div>
            <div className="flex bg-white p-2 rounded-2xl border border-slate-100 gap-1 overflow-x-auto max-w-full">
              {['All', 'Fitrah', 'Profesi', 'Maal', 'Emas', 'Perdagangan'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase italic whitespace-nowrap transition-all",
                    filter === cat ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:text-slate-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ZakatCard key={project.id} project={project} onClick={onSelectProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Tabs Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-center border-b border-slate-100 mb-12">
            {[
              { id: 'info', label: 'Tentang Zakat', icon: Info },
              { id: 'syarat', label: 'Syarat & Ketentuan', icon: CheckCircle2 },
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-8 py-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab.id ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'info' && (
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
                <p>Zakat adalah bagian tertentu dari harta yang wajib dikeluarkan oleh setiap muslim apabila telah mencapai syarat yang ditetapkan. Sebagai salah satu rukun Islam, Zakat memiliki peran penting dalam menyeimbangkan ekonomi umat.</p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                   <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-4 italic">Zakat Maal</h4>
                      <p className="text-xs">Zakat yang dikenakan atas harta (maal) yang dimiliki oleh seseorang dengan syarat-syarat tertentu seperti emas, perak, uang simpanan, hasil pertanian, perdagangan, dll.</p>
                   </div>
                   <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-4 italic">Zakat Fitrah</h4>
                      <p className="text-xs">Zakat yang wajib dikeluarkan oleh setiap jiwa muslim di bulan Ramadhan sebagai pembersih bagi yang berpuasa dan bantuan bagi fakir miskin.</p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'syarat' && (
              <div className="space-y-4">
                {[
                  'Muslim (Beragama Islam)',
                  'Merdeka (Bukan budak)',
                  'Milik Sempurna (Harta milik sendiri)',
                  'Mencapai Nishab (Batas minimal harta)',
                  'Mencapai Haul (Kepemilikan satu tahun untuk Zakat Maal)',
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                    <span className="text-slate-800 font-bold uppercase text-[10px] tracking-widest">{s}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                {[
                  { q: 'Bagaimana jika saya tidak tahu harga emas hari ini?', a: 'Kalkulator kami menggunakan data harga emas terbaru yang diperbarui secara berkala sebagai standar perhitungan.' },
                  { q: 'Apakah pembayaran zakat di ACO tercatat secara legal?', a: 'Ya, setiap transaksi zakat akan mendapatkan bukti potong zakat resmi dan laporan penyaluran yang dapat dipantau di dashboard.' },
                  { q: 'Siapa saja yang berhak menerima zakat (Mustahiq)?', a: 'Zakat disalurkan kepada 8 asnaf (golongan) sesuai syariat Islam, diprioritaskan untuk fakir, miskin, dan fii sabilillah.' },
                ].map((item, i) => (
                  <div key={i} className="p-8 border border-slate-100 rounded-[2.5rem]">
                    <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-3 italic flex items-center gap-2">
                       <HelpCircle size={16} className="text-emerald-500" /> {item.q}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <div className="bg-slate-900 py-24 px-6 text-center text-white">
         <div className="max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-emerald-500 mx-auto mb-8 opacity-50 shadow-2xl" />
            <h2 className="text-3xl md:text-5xl font-black italic mb-10 leading-tight uppercase tracking-tighter">
              "Sedekah tidak akan mengurangi harta."
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-8"></div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">Prophetic Wisdom</p>
         </div>
      </div>
    </div>
  );
};

export default ZakatPage;
