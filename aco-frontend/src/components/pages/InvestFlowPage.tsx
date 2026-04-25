import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockProjects } from '../../data/projectMockData';

interface InvestFlowPageProps {
  projectId: string;
  currentUser: any;
  onBack: () => void;
  onDashboardClick: () => void;
  onBrowseClick: () => void;
}

const formatRp = (n: number) =>
  'Rp ' + n.toLocaleString('id-ID');

const InvestFlowPage: React.FC<InvestFlowPageProps> = ({
  projectId, currentUser, onBack, onDashboardClick, onBrowseClick
}) => {
  const project = mockProjects.find(p => p.id === projectId) || mockProjects[0];
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nominal, setNominal] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [refNumber] = useState(() => 'INV-2024-' + Date.now().toString().slice(-6));

  const nominalNum = parseInt(nominal.replace(/\D/g, '')) || 0;
  const ownershipPct = project.targetFunding > 0
    ? ((nominalNum / project.targetFunding) * 100).toFixed(4)
    : '0';

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setNominal(raw ? parseInt(raw).toLocaleString('id-ID') : '');
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-14 max-w-md w-full shadow-xl text-center">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={52} className="text-emerald-500" />
          </div>
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Investasi Berhasil
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-4 mb-3 tracking-tight">
            Jazakallahu Khairan
          </h2>
          <p className="text-slate-500 leading-relaxed mb-2">
            Investasi Anda sebesar
          </p>
          <p className="text-3xl font-black text-indigo-700 mb-2">{formatRp(nominalNum)}</p>
          <p className="text-slate-500 mb-6">untuk <strong>{project.title}</strong> berhasil dikonfirmasi.</p>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-800 leading-relaxed mb-8">
            <p className="font-black mb-1">⚠️ Info Penting</p>
            Dana Anda dapat ditarik selama belum disalurkan ke proyek. Setelah disalurkan, investasi tidak dapat dibatalkan.
          </div>

          <div className="space-y-3">
            <button
              onClick={onDashboardClick}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Lihat Detail Investasi <ArrowRight size={16} />
            </button>
            <button
              onClick={onBrowseClick}
              className="w-full py-4 text-slate-600 font-bold text-sm hover:text-indigo-600 transition-colors"
            >
              Kembali ke Browse Katalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={step === 1 ? onBack : () => setStep(1)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="font-black text-slate-900 text-lg tracking-tight">Flow Investasi</h1>
            <p className="text-xs text-slate-400 font-medium">Step {step} dari 2</p>
          </div>
          {/* Step indicator */}
          <div className="flex gap-2">
            {[1, 2].map(s => (
              <div key={s} className={`w-8 h-2 rounded-full transition-all ${step >= s ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Project brief */}
        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm mb-8 flex gap-5 items-center">
          <img src={project.imageUrl} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{project.category}</p>
            <h3 className="font-black text-slate-900 text-lg truncate">{project.title}</h3>
            <div className="flex gap-4 mt-1 text-xs text-slate-500 font-medium">
              <span>Target: <strong className="text-slate-800">Rp {(project.targetFunding / 1e9).toFixed(1)}M</strong></span>
              <span>Sisa: <strong className="text-indigo-700">Rp {((project.targetFunding - project.currentFunding) / 1e9).toFixed(1)}M</strong></span>
            </div>
          </div>
        </div>

        {/* Step 1: Nominal */}
        {step === 1 && (
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
            <h2 className="text-xl font-black text-slate-900">Masukkan Nominal Investasi</h2>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Nominal Investasi</label>
              <div className="relative">
                <span className="absolute left-5 top-4 font-bold text-slate-400 text-lg">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={nominal}
                  onChange={handleNominalChange}
                  placeholder="10.000.000"
                  className="w-full py-4 pl-14 pr-5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-black text-slate-900 focus:outline-none focus:border-indigo-400 transition-all"
                />
              </div>
            </div>

            {nominalNum > 0 && (
              <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
                <TrendingUp size={20} className="text-indigo-500 shrink-0" />
                <p className="text-sm text-indigo-800 font-medium">
                  Nominal ini setara dengan{' '}
                  <strong className="font-black">{ownershipPct}% kepemilikan</strong> di proyek ini.
                </p>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={nominalNum <= 0}
              className={`w-full py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                nominalNum > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Lanjut <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
            <h2 className="text-xl font-black text-slate-900">Tinjau & Persetujuan</h2>

            {/* Summary */}
            <div className="space-y-3">
              {[
                ['Proyek', project.title],
                ['Nominal Investasi', formatRp(nominalNum)],
                ['Estimasi Kepemilikan', ownershipPct + '%'],
                ['Skema Bagi Hasil', '60% Shahibul Maal / 40% Mudharib'],
                ['Jadwal Distribusi', 'Setiap tanggal 5 per bulan'],
                ['Nomor Referensi', refNumber],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">{k}</span>
                  <span className="text-sm font-black text-slate-900 text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>

            {/* Risk Section - Locked */}
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-red-500 shrink-0" />
                <p className="text-xs font-black text-red-700 uppercase tracking-widest">Pernyataan Risiko</p>
                <span className="ml-auto text-[8px] font-black text-red-400 bg-red-100 px-2 py-0.5 rounded uppercase">Dikunci</span>
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                Investasi mengandung risiko. Tidak ada jaminan recovery atas modal yang diinvestasikan. Kinerja masa lalu tidak mencerminkan kinerja masa depan. Pastikan Anda memahami sepenuhnya risiko sebelum berpartisipasi.
              </p>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}
              >
                {agreed && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <span className="text-sm text-slate-600 leading-relaxed font-medium">
                Saya memahami dan menerima risiko investasi ini sepenuhnya.
              </span>
            </label>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-4 text-slate-600 font-bold text-sm hover:text-indigo-600 transition-colors">
                ← Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!agreed}
                className={`flex-1 py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  agreed
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Konfirmasi Investasi <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestFlowPage;
