import React from 'react';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Droplets, 
  BarChart4, 
  Scale, 
  Lock
} from 'lucide-react';
import { GlassCard } from '../atoms/GlassCard';
import { cn } from '../../utils/cn';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-32 pb-32 animate-in fade-in duration-700">
      {/* SECTION 1: Profil Organisasi */}
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Established 2026</span>
            </div>
            <h1 className="text-6xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.9]">
              Membangun <span className="text-blue-600">Kemandirian</span> Ekonomi Umat
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
              "ACO Platform hadir sebagai jembatan antara kebajikan tradisional (Wakaf) dan efisiensi modern (Investasi), menciptakan ekosistem finansial yang adil, transparan, dan berdampak nyata."
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard className="p-8 aspect-square flex flex-col justify-end bg-blue-600 border-none text-white overflow-hidden relative group">
              <div className="absolute top-4 right-4 opacity-20 group-hover:scale-110 transition-transform"><Target size={80} /></div>
              <h4 className="text-4xl font-black italic uppercase leading-none">1.2K+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest mt-2">Partisipan Aktif</p>
            </GlassCard>
            <GlassCard className="p-8 aspect-square flex flex-col justify-end bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h4 className="text-4xl font-black italic uppercase text-blue-600 leading-none">42</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Proyek Berjalan</p>
            </GlassCard>
            <GlassCard className="p-8 aspect-square flex flex-col justify-end bg-slate-900 text-white border-none">
              <h4 className="text-4xl font-black italic uppercase leading-none">100%</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Penyaluran Transparan</p>
            </GlassCard>
            <GlassCard className="p-8 aspect-square flex flex-col justify-end bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h4 className="text-4xl font-black italic uppercase text-slate-900 dark:text-white leading-none">Rp 12B</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Dana Terkelola</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* SECTION 2: Visi & Misi */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-blue-400">
              <Eye size={32} />
              <h2 className="text-2xl font-black uppercase tracking-widest italic">Visi Kami</h2>
            </div>
            <p className="text-3xl font-black italic tracking-tighter leading-tight uppercase">
              Menjadi standar global platform keuangan syariah yang mengintegrasikan wakaf produktif dan investasi riil melalui <span className="text-blue-500 underline decoration-4 underline-offset-8">imutable transparency</span>.
            </p>
          </div>
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-blue-400">
              <Target size={32} />
              <h2 className="text-2xl font-black uppercase tracking-widest italic">Misi Kami</h2>
            </div>
            <ul className="space-y-8">
              {[
                { title: "Demokratisasi Wakaf", desc: "Mempermudah akses wakaf produktif untuk semua lapisan masyarakat." },
                { title: "Proteksi Investor", desc: "Menyediakan instrumen investasi riil dengan manajemen risiko ketat." },
                { title: "Dampak Berkelanjutan", desc: "Memastikan setiap rupiah yang diamanahkan memberi manfaat abadi." }
              ].map((m, i) => (
                <li key={i} className="flex gap-6 group">
                  <span className="text-2xl font-black italic text-slate-700 group-hover:text-blue-500 transition-colors">0{i+1}</span>
                  <div>
                    <h4 className="text-lg font-black uppercase italic mb-1">{m.title}</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: Cara ACO Bekerja */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Mekanisme <span className="text-blue-600">Operasional</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Core Business Architecture v2.0</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <BarChart4 size={32} />, 
              title: "Investasi Riil", 
              desc: "Dana investasi diarahkan ke aset produktif (logistik, properti, UMKM) dengan bagi hasil proporsional berdasarkan akad Mudharabah/Musyarakah.",
              locked: "Tidak ada jaminan recovery pokok investasi."
            },
            { 
              icon: <Droplets size={32} />, 
              title: "Wakaf Produktif", 
              desc: "Wakaf dikelola sebagai aset abadi. Hasil pengelolaan disalurkan ke Mauquf 'Alaih (penerima manfaat) melalui program sosial ACO.",
              locked: "Pokok wakaf dijamin permanen oleh sistem."
            },
            { 
              icon: <Scale size={32} />, 
              title: "Wakaf Aset", 
              desc: "Platform memproses pengajuan aset fisik (tanah/bangunan). Proses hukum AIW dilakukan secara offline bersama notaris mitra.",
              locked: "Dokumen tervalidasi immutable di dalam dashboard."
            }
          ].map((item, i) => (
            <GlassCard key={i} className="p-10 space-y-6 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 group hover:border-blue-500 transition-all">
              <div className="w-16 h-16 rounded-[2rem] bg-slate-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
              <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-2 text-[9px] font-black uppercase text-red-500 tracking-widest">
                <Lock size={12} /> {item.locked}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 4: Kepatuhan Syariah */}
      <section className="bg-blue-600 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/20 rounded-full border border-white/20 backdrop-blur-md">
            <ShieldCheck size={20} />
            <span className="text-xs font-black uppercase tracking-widest">Dikuatkan oleh Sistem (System-Enforced)</span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Prinsip Syariah <span className="text-slate-900 underline decoration-white/20 decoration-8 underline-offset-[12px]">Tanpa Kompromi</span></h2>
          <div className="grid md:grid-cols-4 gap-8 pt-10">
            {[
              "Fee Nazir ≤ 10% Profit Bersih",
              "Pokok Wakaf Permanen & Abadi",
              "Penyaluran Zakat Khusus 8 Asnaf",
              "Account Isolation 100%"
            ].map((rule, i) => (
              <div key={i} className="p-8 bg-white/10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm text-center">
                <div className="w-10 h-10 rounded-full bg-white text-blue-600 mx-auto flex items-center justify-center font-black mb-4 italic leading-none">{i+1}</div>
                <p className="text-sm font-black uppercase tracking-widest leading-tight">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Struktur Dana */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] p-16 md:p-24 grid lg:grid-cols-2 gap-20 items-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="space-y-8 relative z-10">
            <h2 className="text-5xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.9]">
              Isolasi Dana <span className="text-blue-600 tracking-normal">4 Pilar</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm italic">
              Setiap kategori dana memiliki rekening terpisah. Tidak ada transaksi yang dapat memindahkan dana antar kategori tanpa persetujuan bertingkat (Finance & Admin).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {[
              { label: "Investasi", color: "bg-blue-600", val: "Mudharabah" },
              { label: "Sosial/Zakat", color: "bg-emerald-600", val: "Asnaf Sync" },
              { label: "Wakaf Uang", color: "bg-amber-600", val: "Permanen" },
              { label: "Waqf Asset", color: "bg-indigo-600", val: "Registry" }
            ].map((acc, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:translate-y-[-4px] transition-all group">
                <div className={cn("w-3 h-12 rounded-full mb-6 group-hover:scale-y-110 transition-transformOrigin-bottom", acc.color)} />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{acc.label}</h4>
                <p className="text-lg font-black italic text-slate-900 dark:text-white uppercase">{acc.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
