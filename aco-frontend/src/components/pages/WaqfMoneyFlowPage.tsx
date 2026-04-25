import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle,
  Heart, Landmark, Download, Clock
} from 'lucide-react';
import { mockProjects } from '../../data/projectMockData';

interface WaqfMoneyFlowPageProps {
  projectId: string;
  currentUser: any;
  onBack: () => void;
  onDashboardClick: () => void;
  onBrowseClick: () => void;
}

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const WaqfMoneyFlowPage: React.FC<WaqfMoneyFlowPageProps> = ({
  projectId, currentUser, onBack, onDashboardClick, onBrowseClick
}) => {
  const project = mockProjects.find(p => p.id === projectId) || mockProjects[0];
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nominal, setNominal] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [refNumber] = useState(() => 'WKF-2024-' + Date.now().toString().slice(-6));

  const nominalNum = parseInt(nominal.replace(/\D/g, '')) || 0;
  const wakifName = currentUser?.name || 'Hamba Allah';

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setNominal(raw ? parseInt(raw).toLocaleString('id-ID') : '');
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-14 max-w-md w-full shadow-xl text-center">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={52} className="text-emerald-500" />
          </div>
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Wakaf Diterima
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-4 mb-3 tracking-tight">
            Jazakallahu Khairan
          </h2>
          <p className="text-slate-500 leading-relaxed mb-2">Wakaf uang Anda sebesar</p>
          <p className="text-3xl font-black text-emerald-700 mb-2">{formatRp(nominalNum)}</p>
          <p className="text-slate-500 mb-4">untuk <strong>{project.title}</strong> telah diterima.</p>

          <div className="p-4 bg-slate-50 rounded-2xl text-left mb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Nomor Referensi Wakaf</p>
            <p className="font-black text-slate-900 font-mono">{refNumber}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => alert('Download PDF tanda terima (simulasi)')}
              className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} /> Download Tanda Terima
            </button>
            <button
              onClick={onDashboardClick}
              className="w-full py-4 border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all"
            >
              Lihat Detail Wakaf
            </button>
            <button onClick={onBrowseClick} className="w-full py-3 text-slate-400 font-bold text-sm hover:text-emerald-600 transition-colors">
              Kembali ke Browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={step === 1 ? onBack : () => setStep(1)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-emerald-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="font-black text-slate-900 text-lg tracking-tight">Flow Wakaf Uang</h1>
            <p className="text-xs text-slate-400 font-medium">Step {step} dari 2</p>
          </div>
          <div className="flex gap-2">
            {[1, 2].map(s => (
              <div key={s} className={`w-8 h-2 rounded-full transition-all ${step >= s ? 'bg-emerald-600' : 'bg-slate-100'}`} />
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
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
            <h2 className="text-xl font-black text-slate-900">Masukkan Nominal Wakaf</h2>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Nominal Wakaf</label>
              <div className="relative">
                <span className="absolute left-5 top-4 font-bold text-slate-400 text-lg">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={nominal}
                  onChange={handleNominalChange}
                  placeholder="500.000"
                  className="w-full py-4 pl-14 pr-5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-black text-slate-900 focus:outline-none focus:border-emerald-400 transition-all"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">Tidak ada minimal nominal. Setiap rupiah bernilai ibadah.</p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={nominalNum <= 0}
              className={`w-full py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                nominalNum > 0
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Lanjut <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Ikrar */}
        {step === 2 && (
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
            <h2 className="text-xl font-black text-slate-900">Ikrar & Konfirmasi Wakaf</h2>

            {/* Teks ikrar formal - dikunci */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Teks Ikrar Wakaf</p>
                <span className="text-[8px] font-black text-slate-400 bg-slate-200 px-2 py-0.5 rounded uppercase">Tidak Dapat Diedit</span>
              </div>
              <p className="text-sm text-slate-700 leading-loose font-medium italic">
                "Bismillahirrahmanirrahim. Saya, <strong className="not-italic text-slate-900">{wakifName}</strong>,
                dengan penuh keikhlasan mewakafkan uang sebesar{' '}
                <strong className="not-italic text-emerald-700">{formatRp(nominalNum)}</strong>{' '}
                untuk program <strong className="not-italic text-slate-900">{project.title}</strong>.
                Saya menyerahkan hak atas dana ini kepada Allah SWT melalui lembaga nazir yang terpercaya,
                semata-mata mengharapkan ridha Allah dan manfaat bagi umat."
              </p>
            </div>

            {/* Banner Permanen - dikunci */}
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-red-700 uppercase tracking-widest mb-1">Pernyataan Permanen</p>
                <p className="text-sm text-red-700 leading-relaxed font-medium">
                  Dana yang telah diwakafkan bersifat <strong>permanen dan tidak dapat ditarik kembali</strong> sesuai ketentuan wakaf dalam syariat Islam.
                </p>
                <span className="inline-block mt-2 text-[8px] font-black text-red-400 bg-red-100 px-2 py-0.5 rounded uppercase">Dikunci</span>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'}`}
              >
                {agreed && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <span className="text-sm text-slate-600 leading-relaxed font-medium">
                Saya memahami bahwa wakaf bersifat permanen dan dengan ini mengikrarkan wakaf uang saya.
              </span>
            </label>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-4 text-slate-600 font-bold text-sm hover:text-emerald-600 transition-colors">
                ← Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!agreed}
                className={`flex-1 py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  agreed
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Ikrarkan Wakaf <Heart size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaqfMoneyFlowPage;
