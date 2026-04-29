import React, { useState, useMemo } from 'react';
import { Calculator, Coins, Briefcase, Wallet, Info, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

type CalcType = 'profesi' | 'maal' | 'emas' | 'perdagangan' | 'pertanian' | 'tabungan' | 'ternak';

interface ZakatCalculatorProps {
  onNavigateToPayment?: () => void;
}

const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ onNavigateToPayment }) => {
  const [activeType, setActiveType] = useState<CalcType>('profesi');
  const [inputs, setInputs] = useState({
    income: '',
    bonus: '',
    wealth: '',
    goldWeight: '',
    goldPrice: '1200000', // Default price per gram
    tradeAssets: '',
    tradeCash: '',
    tradeDebt: '',
    cropYield: '',
    irrigationType: 'rainfed', // 'rainfed' (10%) or 'irrigated' (5%)
    animalType: 'cow', // 'cow' or 'sheep'
    animalCount: '',
    savings: '',
  });

  const calculation = useMemo(() => {
    let total = 0;
    let nishab = 0;
    let isObligatory = false;
    let nishabUnit = 'Rp';

    const price = parseFloat(inputs.goldPrice || '0');
    
    switch (activeType) {
      case 'profesi':
        nishab = 6850000; 
        const monthlyIncome = parseFloat(inputs.income || '0') + parseFloat(inputs.bonus || '0');
        total = monthlyIncome * 0.025;
        isObligatory = monthlyIncome >= nishab;
        break;
      case 'maal':
      case 'tabungan':
        nishab = 85 * price;
        const wealth = parseFloat(activeType === 'maal' ? inputs.wealth : inputs.savings || '0');
        total = wealth * 0.025;
        isObligatory = wealth >= nishab;
        break;
      case 'emas':
        nishab = 85;
        nishabUnit = 'gram';
        const weight = parseFloat(inputs.goldWeight || '0');
        total = (weight * price) * 0.025;
        isObligatory = weight >= nishab;
        break;
      case 'perdagangan':
        nishab = 85 * price;
        const tradeTotal = parseFloat(inputs.tradeAssets || '0') + parseFloat(inputs.tradeCash || '0') - parseFloat(inputs.tradeDebt || '0');
        total = tradeTotal * 0.025;
        isObligatory = tradeTotal >= nishab;
        break;
      case 'pertanian':
        nishab = 653; // kg gabah
        nishabUnit = 'kg gabah';
        const yieldAmount = parseFloat(inputs.cropYield || '0');
        const rate = inputs.irrigationType === 'rainfed' ? 0.10 : 0.05;
        total = (yieldAmount * 12000) * rate; // Mock rice price
        isObligatory = yieldAmount >= nishab;
        break;
      case 'ternak':
        const count = parseFloat(inputs.animalCount || '0');
        if (inputs.animalType === 'cow') {
          nishab = 30;
          nishabUnit = 'ekor';
          isObligatory = count >= nishab;
          // Simplified logic for cows: 1 cow for every 30
          total = Math.floor(count / 30) * 3000000; // Mock cow price for valuation
        } else {
          nishab = 40;
          nishabUnit = 'ekor';
          isObligatory = count >= nishab;
          total = Math.floor(count / 40) * 1500000; // Mock sheep price
        }
        break;
    }

    return { total: isObligatory ? total : 0, isObligatory, nishab, nishabUnit };
  }, [activeType, inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-emerald-500/5 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left: Inputs */}
        <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Calculator size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900 italic tracking-tight uppercase">Kalkulator Zakat Lengkap</h3>
          </div>

          <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl mb-10 gap-1">
            {(['profesi', 'maal', 'emas', 'perdagangan', 'pertanian', 'tabungan', 'ternak'] as CalcType[]).map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                  activeType === type ? "bg-white text-emerald-600 shadow-lg" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeType === 'profesi' && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pendapatan Per Bulan</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                    <input 
                      type="number" 
                      name="income"
                      value={inputs.income}
                      onChange={handleInputChange}
                      placeholder="0" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bonus/Pendapatan Lain</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                    <input 
                      type="number" 
                      name="bonus"
                      value={inputs.bonus}
                      onChange={handleInputChange}
                      placeholder="0" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                    />
                  </div>
                </div>
              </>
            )}

            {(activeType === 'maal' || activeType === 'tabungan') && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total {activeType === 'maal' ? 'Kekayaan' : 'Tabungan'}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                  <input 
                    type="number" 
                    name={activeType === 'maal' ? 'wealth' : 'savings'}
                    value={activeType === 'maal' ? inputs.wealth : inputs.savings}
                    onChange={handleInputChange}
                    placeholder="0" 
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                  />
                </div>
              </div>
            )}

            {activeType === 'emas' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Berat Emas (Gram)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="goldWeight"
                    value={inputs.goldWeight}
                    onChange={handleInputChange}
                    placeholder="0" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">gram</span>
                </div>
              </div>
            )}

            {activeType === 'perdagangan' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nilai Barang Dagangan</label>
                  <input type="number" name="tradeAssets" value={inputs.tradeAssets} onChange={handleInputChange} placeholder="0" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Uang Tunai & Piutang</label>
                  <input type="number" name="tradeCash" value={inputs.tradeCash} onChange={handleInputChange} placeholder="0" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hutang Jatuh Tempo</label>
                  <input type="number" name="tradeDebt" value={inputs.tradeDebt} onChange={handleInputChange} placeholder="0" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                </div>
              </div>
            )}

            {activeType === 'pertanian' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hasil Panen (Kg Gabah)</label>
                  <input type="number" name="cropYield" value={inputs.cropYield} onChange={handleInputChange} placeholder="0" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Metode Pengairan</label>
                  <select name="irrigationType" value={inputs.irrigationType} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold appearance-none">
                    <option value="rainfed">Tadah Hujan / Alami (10%)</option>
                    <option value="irrigated">Irigasi / Berbayar (5%)</option>
                  </select>
                </div>
              </div>
            )}

            {activeType === 'ternak' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Jenis Hewan</label>
                  <select name="animalType" value={inputs.animalType} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold appearance-none">
                    <option value="cow">Sapi / Kerbau</option>
                    <option value="sheep">Kambing / Domba</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Jumlah Ekor</label>
                  <input type="number" name="animalCount" value={inputs.animalCount} onChange={handleInputChange} placeholder="0" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
             <Info className="text-blue-500 shrink-0" size={18} />
             <p className="text-[10px] text-blue-700 font-medium leading-relaxed uppercase tracking-tighter">
                Nishab {activeType}: {calculation.nishabUnit === 'Rp' ? 'Rp ' + calculation.nishab.toLocaleString() : calculation.nishab + ' ' + calculation.nishabUnit}
                <br />
                {calculation.isObligatory 
                  ? 'Kekayaan Anda telah mencapai nishab. Wajib mengeluarkan zakat.' 
                  : 'Kekayaan Anda belum mencapai nishab. Anda tidak wajib berzakat, namun disarankan untuk bersedekah.'}
             </p>
          </div>
        </div>

        {/* Right: Result */}
        <div className="p-10 lg:p-14 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-4 italic">Total Zakat Anda</p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-10">
            Rp {calculation.total.toLocaleString()}
          </h2>

          <div className="space-y-4">
            <button
              onClick={onNavigateToPayment}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-3 uppercase text-xs tracking-widest active:scale-95 group"
            >
              Tunaikan Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest">
              Amanah Anda, Keberkahan Sesama.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
