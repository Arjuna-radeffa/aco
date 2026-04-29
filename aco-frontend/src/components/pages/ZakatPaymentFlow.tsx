import React, { useState } from 'react';
import { ArrowLeft, Calculator, Shield, Download, CheckCircle2, QrCode, CreditCard, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ZakatPaymentFlowProps {
  onBack: () => void;
  onPaymentSuccess?: (transactionId: string) => void;
}

type ZakatType = 'maal' | 'profesi' | 'fitrah' | 'emas' | 'perdagangan' | 'tabungan' | 'lainnya';

const ZAKAT_TYPES: { id: ZakatType; name: string; description: string; nisabInfo: string }[] = [
  {
    id: 'maal',
    name: 'Zakat Maal',
    description: 'Zakat atas harta kekayaan yang telah mencapai nishab dan haul',
    nisabInfo: 'Nishab: 85 gram emas (≈ Rp 6.850.000)'
  },
  {
    id: 'profesi',
    name: 'Zakat Profesi',
    description: 'Zakat penghasilan dari gaji, honorarium, atau pendapatan profesional',
    nisabInfo: 'Nishab: Pendapatan bulanan ≥ Rp 6.850.000'
  },
  {
    id: 'fitrah',
    name: 'Zakat Fitrah',
    description: 'Zakat yang wajib dikeluarkan setiap muslim di bulan Ramadhan',
    nisabInfo: 'Standar: 2.5 kg beras atau setara per jiwa'
  },
  {
    id: 'emas',
    name: 'Zakat Emas/Perak',
    description: 'Zakat atas kepemilikan emas dan perak yang telah mencapai nishab',
    nisabInfo: 'Nishab emas: 85 gram, perak: 595 gram'
  },
  {
    id: 'perdagangan',
    name: 'Zakat Perdagangan',
    description: 'Zakat atas usaha perdagangan dengan aset yang berputar',
    nisabInfo: 'Nishab: Nilai aset dagang ≥ Rp 6.850.000'
  },
  {
    id: 'tabungan',
    name: 'Zakat Tabungan',
    description: 'Zakat atas tabungan dan deposito yang telah mencapai haul',
    nisabInfo: 'Nishab: Saldo tabungan ≥ Rp 6.850.000'
  },
  {
    id: 'lainnya',
    name: 'Zakat Lainnya',
    description: 'Jenis zakat lainnya sesuai ketentuan syariah',
    nisabInfo: 'Sesuai ketentuan jenis zakat terkait'
  }
];

const ZakatPaymentFlow: React.FC<ZakatPaymentFlowProps> = ({ onBack, onPaymentSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType] = useState<ZakatType | null>(null);
  const [amount, setAmount] = useState('');
  const [showCalculator, setShowCalculator] = useState(true);
  const [hasConfirmedIntention, setHasConfirmedIntention] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTypeSelect = (type: ZakatType) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleContinueToConfirmation = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep(3);
  };

  const handlePayment = async () => {
    if (!hasConfirmedIntention || !selectedType || !amount) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      onPaymentSuccess?.('ZAK-' + Date.now());
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8 shadow-sm">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800 italic">
            Layanan Zakat Terverifikasi Syariah
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter uppercase text-slate-900">
          Bayar <span className="text-emerald-600">Zakat</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium italic leading-relaxed">
          Pilih jenis zakat yang ingin Anda tunaikan. ACO sebagai amil zakat terpercaya akan menyalurkan
          kepada 8 asnaf yang berhak sesuai syariat Islam.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ZAKAT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeSelect(type.id)}
            className="p-6 bg-white border border-slate-200 rounded-[2rem] text-left hover:border-emerald-300 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight uppercase italic">
              {type.name}
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3">
              {type.description}
            </p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
              {type.nisabInfo}
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const selectedZakatType = ZAKAT_TYPES.find(t => t.id === selectedType);
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-black uppercase text-[10px] tracking-widest transition-all"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
            Step 2/4: Kalkulator & Nominal
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-emerald-500/5 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase">
              {selectedZakatType?.name}
            </h2>
          </div>

          {/* Calculator Accordion */}
          <div className="mb-6">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-2xl border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <Calculator size={18} className="text-emerald-600" />
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Kalkulator Zakat
                </span>
              </div>
              <span className="text-sm text-slate-400 font-bold">
                {showCalculator ? 'Sembunyikan' : 'Tampilkan'}
              </span>
            </button>

            {showCalculator && (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl mt-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Input sesuai jenis zakat
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nilai..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest">
                    Hitung Zakat
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-[10px] text-blue-700 font-bold uppercase tracking-widest leading-relaxed">
                    Kalkulator ini bersifat estimasi. Nominal final adalah keputusan Anda sepenuhnya
                    berdasarkan niat dan keikhlasan.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-2 mb-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Nominal Zakat Final
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                Rp
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-black text-lg"
                min="0"
              />
            </div>
          </div>

          <button
            onClick={handleContinueToConfirmation}
            disabled={!amount || parseFloat(amount) <= 0}
            className={cn(
              "w-full py-4 bg-emerald-600 text-white font-black rounded-2xl transition-all uppercase text-xs tracking-widest",
              (!amount || parseFloat(amount) <= 0) ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-500 active:scale-95"
            )}
          >
            Lanjut ke Konfirmasi
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <Shield size={12} className="text-emerald-500" /> Dana zakat disalurkan ke rekening Dana Zakat yang terisolasi
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setStep(2)}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-black uppercase text-[10px] tracking-widest transition-all"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
          Step 3/4: Konfirmasi Pembayaran
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-emerald-500/5 mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6 italic tracking-tight uppercase text-center">
          Konfirmasi Zakat
        </h2>

        {/* Summary */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Jenis Zakat
              </p>
              <p className="font-black text-slate-900 uppercase italic">
                {ZAKAT_TYPES.find(t => t.id === selectedType)?.name}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Nominal
              </p>
              <p className="font-black text-emerald-600 uppercase italic">
                Rp {parseFloat(amount).toLocaleString()}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Rekening Tujuan
              </p>
              <p className="font-bold text-slate-900">
                Dana Zakat ACO (Rekening Terisolasi)
              </p>
            </div>
          </div>
        </div>

        {/* Transparency Info */}
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 mb-6">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-700 font-medium leading-relaxed uppercase tracking-tighter">
              Laporan distribusi zakat ACO dapat dipantau secara publik di halaman Transparansi kami.
              Setiap rupiah disalurkan kepada 8 asnaf yang berhak sesuai syariat Islam.
            </p>
          </div>
        </div>

        {/* Intention Confirmation */}
        <label className={cn(
          "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer mb-6",
          hasConfirmedIntention 
            ? "bg-emerald-50 border-emerald-200" 
            : "bg-slate-50 border-slate-200 hover:border-emerald-300"
        )}>
          <input
            type="checkbox"
            checked={hasConfirmedIntention}
            onChange={(e) => setHasConfirmedIntention(e.target.checked)}
            className="w-5 h-5 rounded-lg accent-emerald-500 cursor-pointer"
          />
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            hasConfirmedIntention ? "text-emerald-700" : "text-slate-500"
          )}>
            Saya berniat menunaikan zakat dan menyerahkan kepada ACO sebagai amil untuk didistribusikan kepada yang berhak.
          </span>
        </label>

        <button
          onClick={handlePayment}
          disabled={!hasConfirmedIntention || isProcessing}
          className={cn(
            "w-full py-4 bg-emerald-600 text-white font-black rounded-2xl transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3",
            (!hasConfirmedIntention || isProcessing) ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-500 active:scale-95"
          )}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              Bayar Zakat <CreditCard size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const transactionId = 'ZAK-' + Date.now();
    
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 italic tracking-tight uppercase">
            Zakat Diterima!
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Jazakallahu khairan. Pembayaran zakat Anda sebesar{' '}
            <strong className="text-emerald-600 not-italic">
              Rp {parseFloat(amount).toLocaleString()}
            </strong>{' '}
            ({ZAKAT_TYPES.find(t => t.id === selectedType)?.name}) telah diterima.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-emerald-500/5 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Nomor Referensi
              </p>
              <p className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">
                {transactionId}
              </p>
            </div>
            
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Tanggal
              </p>
              <p className="text-sm font-bold text-slate-900">
                {new Date().toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button className="w-full py-3 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3 mb-3">
              Download Bukti Zakat <Download size={16} />
            </button>
            
            <button className="w-full py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase text-xs tracking-widest">
              Pantau Distribusi Zakat
            </button>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white py-12">
      <div className="container mx-auto px-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default ZakatPaymentFlow;