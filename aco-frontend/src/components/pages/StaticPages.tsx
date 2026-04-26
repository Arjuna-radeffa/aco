import React from 'react';
import { FileText, ShieldCheck, Scale, Lock, Users, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../atoms/GlassCard';

interface TermsPageProps { onBack: () => void; }
interface PrivacyPageProps { onBack: () => void; }

export const TermsPage: React.FC<TermsPageProps> = () => (
  <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="max-w-4xl mx-auto px-6">
      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <FileText size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Syarat & <span className="text-blue-600">Ketentuan</span></h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Terakhir diperbarui: 26 April 2026</p>
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { icon: <Users size={20} />, title: '1. Penerimaan Ketentuan', content: 'Dengan menggunakan platform ACO, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini secara sadar dan tanpa paksaan.' },
            { icon: <ShieldCheck size={20} />, title: '2. Persyaratan Pengguna', content: 'Pengguna wajib berusia minimal 17 tahun dan memiliki identitas valid (KTP). Verifikasi KYC adalah syarat mutlak sebelum melakukan transaksi finansial.' },
            { icon: <AlertTriangle size={20} />, title: '3. Risiko Investasi', content: 'Setiap investasi mengandung risiko kehilangan modal. ACO tidak memberikan jaminan pemulihan pokok investasi (non-recourse principle).' },
            { icon: <Lock size={20} />, title: '4. Permanensi Wakaf', content: 'Dana wakaf yang telah dikonfirmasi bersifat permanen, abadi, dan tidak dapat ditarik kembali sesuai prinsip syariah Islam.' },
            { icon: <Scale size={20} />, title: '5. Kepatuhan Syariah', content: 'Seluruh operasional diawasi oleh Dewan Pengawas Syariah. Pelanggaran terhadap prinsip syariah akan mengakibatkan pembatalan transaksi secara sistem.' },
          ].map((section, i) => (
            <GlassCard key={i} className="p-10 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                {section.icon}
                <h3 className="text-lg font-black italic uppercase text-slate-900 dark:text-white">{section.title}</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">{section.content}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC<PrivacyPageProps> = () => (
  <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="max-w-4xl mx-auto px-6">
      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <ShieldCheck size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Kebijakan <span className="text-emerald-600">Privasi</span></h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Terakhir diperbarui: 26 April 2026</p>
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { icon: <FileText size={20} />, title: 'Data Identitas', content: 'Kami mengumpulkan data sensitif (KTP, NPWP, Selfie) hanya untuk keperluan kepatuhan regulasi KYC dan pelaporan pajak.' },
            { icon: <Lock size={20} />, title: 'Keamanan Data', content: 'Seluruh data dienkripsi menggunakan standar AES-256 dan protokol TLS 1.3 selama transmisi antara perangkat Anda ke server kami.' },
            { icon: <Users size={20} />, title: 'Pihak Ketiga', content: 'Kami tidak menjual data Anda. Data hanya dibagikan kepada Payment Gateway dan Otoritas Pengawas jika diwajibkan oleh hukum negara.' },
            { icon: <Scale size={20} />, title: 'Hak Akses', content: 'Pengguna memiliki hak penuh untuk meminta penghapusan data (right to be forgotten) setelah seluruh kewajiban kontrak investasi terpenuhi.' },
          ].map((section, i) => (
            <GlassCard key={i} className="p-10 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-4">
              <div className="flex items-center gap-3 text-emerald-600">
                {section.icon}
                <h3 className="text-lg font-black italic uppercase text-slate-900 dark:text-white">{section.title}</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">{section.content}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);
