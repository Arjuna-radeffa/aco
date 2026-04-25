import React from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { Wallet, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { Project } from '../../types/appTypes';

interface WalletFlowProps {
  project: Project;
  amount: number;
}

export const WalletFlow: React.FC<WalletFlowProps> = ({ project, amount }) => {
  const profitEst = (amount * 0.12).toLocaleString('id-ID'); // Simulasi 12% profit
  
  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-2xl font-black italic tracking-tighter">Konfirmasi Dompet Dana</h3>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] italic">US-FR-01 Financial Integrity</p>
      </div>

      <GlassCard className="p-8 border-2 border-blue-500/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Saldo Tersedia</p>
              <p className="text-xl font-black text-slate-900">Rp 25.000.000</p>
            </div>
          </div>
          <StatusIndicator status="healthy" />
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 mb-8">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-500">Project</span>
            <span className="font-black text-slate-900 italic">{project.title}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-500">Nominal Amanah</span>
            <span className="font-black text-slate-900">Rp {amount.toLocaleString('id-ID')}</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-600" />
              <span className="text-[10px] font-black text-emerald-600 uppercase">Est. Bagi Hasil (1thn)</span>
            </div>
            <span className="text-lg font-black text-emerald-600">Rp {profitEst}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl text-[10px] text-blue-800 font-medium leading-relaxed border border-blue-100">
            <ShieldCheck size={16} className="shrink-0 text-blue-600" />
            <span>Dana Anda akan diisolasi dalam rekening kustodian syariah untuk keperluan proyek {project.title}.</span>
          </div>
          <button className="w-full py-5 bg-slate-900 text-white font-black rounded-[2.5rem] hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-2 group">
            Bayar & Konfirmasi <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
