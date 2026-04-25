import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsPageProps { onBack: () => void; }
interface PrivacyPageProps { onBack: () => void; }

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-50 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-black text-slate-900 text-lg">Syarat & Ketentuan</h1>
      </div>
    </nav>
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm prose prose-slate max-w-none">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <FileText size={28} className="text-indigo-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 m-0">Syarat & Ketentuan Penggunaan</h2>
            <p className="text-slate-400 text-sm m-0">Terakhir diperbarui: 1 Januari 2025</p>
          </div>
        </div>
        <div className="space-y-8 text-slate-600 leading-relaxed">
          {[
            { title: '1. Penerimaan Ketentuan', content: 'Dengan menggunakan platform ACO, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui, harap tidak menggunakan layanan kami.' },
            { title: '2. Persyaratan Pengguna', content: 'Anda harus berusia minimal 17 tahun dan memiliki identitas yang valid (KTP) untuk menggunakan layanan investasi dan wakaf. Akun yang dibuat dengan identitas palsu akan dinonaktifkan.' },
            { title: '3. Layanan Investasi', content: 'Investasi yang Anda lakukan melalui platform ini mengandung risiko. Tidak ada jaminan atas pengembalian modal. Kinerja masa lalu tidak mencerminkan kinerja masa depan. Anda wajib memahami risiko sebelum berinvestasi.' },
            { title: '4. Layanan Wakaf', content: 'Dana yang telah diwakafkan bersifat permanen dan tidak dapat ditarik kembali sesuai ketentuan syariat Islam. ACO bertindak sebagai lembaga nazir yang amanah dan bertanggungjawab.' },
            { title: '5. Privasi & Data', content: 'Kami mengumpulkan dan memproses data pribadi Anda sesuai dengan Kebijakan Privasi kami dan regulasi perlindungan data yang berlaku di Indonesia (UU PDP).' },
            { title: '6. Kepatuhan Syariah', content: 'Semua produk dan layanan di platform ini diawasi oleh Dewan Pengawas Syariah yang kompeten dan berpengalaman untuk memastikan kepatuhan terhadap prinsip-prinsip syariah Islam.' },
            { title: '7. Penyelesaian Sengketa', content: 'Setiap sengketa yang timbul akan diselesaikan melalui mediasi terlebih dahulu. Jika mediasi gagal, sengketa akan diselesaikan melalui BASYARNAS (Badan Arbitrase Syariah Nasional) Indonesia.' },
          ].map((section, i) => (
            <div key={i}>
              <h3 className="font-black text-slate-900 text-lg mb-2">{section.title}</h3>
              <p className="text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-50 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-black text-slate-900 text-lg">Kebijakan Privasi</h1>
      </div>
    </nav>
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <FileText size={28} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Kebijakan Privasi</h2>
            <p className="text-slate-400 text-sm">Terakhir diperbarui: 1 Januari 2025</p>
          </div>
        </div>
        <div className="space-y-8">
          {[
            { title: 'Data yang Kami Kumpulkan', content: 'Kami mengumpulkan data identitas (nama, email, HP, KTP), data transaksi (nominal investasi, wakaf), dan data perangkat (IP, browser) untuk keperluan operasional platform.' },
            { title: 'Penggunaan Data', content: 'Data Anda digunakan untuk: verifikasi identitas (KYC), pemrosesan transaksi, pengiriman laporan dan notifikasi, serta kepatuhan terhadap regulasi OJK dan PPATK.' },
            { title: 'Perlindungan Data', content: 'Kami menggunakan enkripsi TLS/SSL untuk semua transmisi data, penyimpanan terenkripsi untuk data sensitif, dan akses berlapis dengan multi-factor authentication untuk sistem internal kami.' },
            { title: 'Berbagi Data', content: 'Kami tidak menjual data pribadi Anda. Data hanya dibagikan kepada mitra yang diperlukan (payment gateway, auditor) dengan perjanjian kerahasiaan yang ketat, dan kepada otoritas regulasi jika diwajibkan hukum.' },
            { title: 'Hak Pengguna', content: 'Anda berhak mengakses, memperbaiki, dan meminta penghapusan data pribadi Anda (sesuai ketentuan yang berlaku). Hubungi privacy@aco-platform.id untuk permintaan terkait data.' },
          ].map((section, i) => (
            <div key={i}>
              <h3 className="font-black text-slate-900 text-lg mb-2">{section.title}</h3>
              <p className="text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
