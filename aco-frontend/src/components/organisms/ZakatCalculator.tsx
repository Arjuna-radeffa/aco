import React, { useState, useMemo } from 'react';
import { Calculator, Coins, Briefcase, Wallet, Info, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

type CalcType = 'profesi' | 'maal' | 'emas';

const ZakatCalculator: React.FC = () => {
  const [activeType, setActiveType] = useState<CalcType>('profesi');
  const [inputs, setInputs] = useState({
    income: '',
    bonus: '',
    wealth: '',
    goldWeight: '',
    goldPrice: '1200000', // Default price per gram
  });

  const calculation = useMemo(() => {
    let total = 0;
    let nishab = 0;
    let isObligatory = false;

    // Nishab calculations (Approximate)
    // Profesi: 522kg beras / month (approx Rp 6-7M)
    // Maal: 85g gold / year (approx Rp 100M)
    // Emas: 85g
    
    const monthlyIncome = parseFloat(inputs.income || '0') + parseFloat(inputs.bonus || '0');
    const totalWealth = parseFloat(inputs.wealth || '0');
    const goldWeightValue = parseFloat(inputs.goldWeight || '0');
    const price = parseFloat(inputs.goldPrice || '0');

    if (activeType === 'profesi') {
      nishab = 6850000; // Monthly nishab
      total = monthlyIncome * 0.025;
      isObligatory = monthlyIncome >= nishab;
    } else if (activeType === 'maal') {
      nishab = 85 * price; // Yearly nishab
      total = totalWealth * 0.025;
      isObligatory = totalWealth >= nishab;
    } else if (activeType === 'emas') {
      nishab = 85; 
      total = (goldWeightValue * price) * 0.025;
      isObligatory = goldWeightValue >= nishab;
    }

    return { total: isObligatory ? total : 0, isObligatory, nishab };
  }, [activeType, inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <h3 className="text-xl font-black text-slate-900 italic tracking-tight uppercase">Kalkulator Zakat</h3>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-10">
            {(['profesi', 'maal', 'emas'] as CalcType[]).map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
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

            {activeType === 'maal' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Nilai Aset/Tabungan</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                  <input 
                    type="number" 
                    name="wealth"
                    value={inputs.wealth}
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
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
             <Info className="text-blue-500 shrink-0" size={18} />
             <p className="text-[10px] text-blue-700 font-medium leading-relaxed uppercase tracking-tighter">
                Nishab {activeType}: {activeType === 'emas' ? calculation.nishab + ' gram' : 'Rp ' + calculation.nishab.toLocaleString()} 
                <br />
                {calculation.isObligatory 
                  ? 'Kekayaan Anda telah mencapai nishab. Wajib mengeluarkan zakat 2.5%.' 
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
            <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-3 uppercase text-xs tracking-widest active:scale-95 group">
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
