import React, { useState } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { ValidatedInput } from '../atoms/ValidatedInput';
import { useNazirValidation } from '../../hooks/useNazirValidation';
import { useStore } from '../../store/useStore';
import { LayoutGrid, MapPin, UserCheck, ShieldCheck, Save, AlertCircle, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DynamicProjectForm: React.FC = () => {
  const [category, setCategory] = useState<'Commercial' | 'Wakaf' | 'Social'>('Commercial');
  const [title, setTitle] = useState('');
  const [managementFee, setManagementFee] = useState(2);
  const [targetFunding, setTargetFunding] = useState(0);
  const [route, setRoute] = useState('');
  const [nazirQuota, setNazirQuota] = useState(0);
  const [wakif, setWakif] = useState('');
  const [nazir, setNazir] = useState('');
  const [isHybrid, setIsHybrid] = useState(false);
  
  const { error: nazirError, warning: nazirWarning } = useNazirValidation(nazirQuota);
  const updateProject = useStore((state: any) => state.updateProject);

  const feeError = category === 'Commercial' && managementFee < 2 ? 'Management Fee minimal 2% untuk Proyek Komersial' : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nazirError || feeError) return;
    
    console.log('Saving Project:', { title, category, managementFee, targetFunding, isHybrid });
    alert('Project configuration valid and saved to buffer!');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">Project <span className="text-blue-600">Architect</span></h2>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">Dynamic Form Engine US-IO-02 v2.0</p>
      </div>

      <GlassCard className="p-10 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-3 gap-4 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-[2rem]">
            {['Commercial', 'Wakaf', 'Social'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat as any)}
                className={`py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all ${
                  category === cat 
                  ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl translate-y-[-2px]' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <ValidatedInput 
                label="Core Project Title" 
                placeholder="e.g. RS Harapan Bunda Tower B" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <ValidatedInput 
                label="Target RAB (IDR)" 
                type="number"
                placeholder="0" 
                value={targetFunding}
                onChange={(e) => setTargetFunding(Number(e.target.value))}
                required
              />
            </div>

            <AnimatePresence mode="wait">
              {category === 'Commercial' && (
                <motion.div
                  key="comm-fields"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="p-8 bg-blue-50/30 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30 space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Percent size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-blue-900 dark:text-blue-400 tracking-wider">Commercial Economics</p>
                      <p className="text-[10px] text-blue-600 dark:text-blue-500 font-bold">P-IO-02: Strict Fee Validation Rule (Min 2%)</p>
                    </div>
                  </div>

                  <ValidatedInput 
                    label="Platform Management Fee (%)" 
                    type="number"
                    value={managementFee}
                    onChange={(e) => setManagementFee(Number(e.target.value))}
                    error={feeError || undefined}
                  />

                  <div className="flex items-center gap-2 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-blue-50 dark:border-blue-900/20">
                    <AlertCircle size={16} className="text-blue-500" />
                    <p className="text-[9px] font-black uppercase text-blue-400">ACO Core Policy: Minimum fee is mandatory for platform sustainability.</p>
                  </div>
                </motion.div>
              )}

              {category === 'Wakaf' && (
                <motion.div
                  key="wakaf-fields"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="p-8 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/30 space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-emerald-900 dark:text-emerald-400 tracking-wider">Social Governance</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold">Verified Entites required for Waqf nodes.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <ValidatedInput label="Nama Wakif" placeholder="Donor/Pemberi" value={wakif} onChange={(e) => setWakif(e.target.value)} />
                    <ValidatedInput label="Nama Nazir" placeholder="Manager/Pengelola" value={nazir} onChange={(e) => setNazir(e.target.value)} />
                  </div>

                  <ValidatedInput 
                    label="Nazir Revenue Share (%)" 
                    type="number"
                    value={nazirQuota}
                    onChange={(e) => setNazirQuota(Number(e.target.value))}
                    error={nazirError || undefined}
                    warning={nazirWarning || undefined}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <UserCheck className="text-slate-400" size={24} />
                <div>
                  <p className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-widest">Asset Participation</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Independent Node Configuration</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isHybrid} onChange={() => setIsHybrid(!isHybrid)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                <span className="ml-3 text-[10px] font-black uppercase text-slate-500">Hybrid Mode</span>
              </label>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {[
                { label: 'Investment', sub: 'Profit Sharing / Sukuk', color: 'blue' },
                { label: 'Cash Waqf', sub: 'Social Capital Pool', color: 'indigo' },
                { label: 'Movables Waqf', sub: 'Vehicles / Machines', color: 'emerald' },
                { label: 'Immovables Waqf', sub: 'Buildings / Land', color: 'purple' },
              ].map((item, i) => (
                <label key={i} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-blue-500 transition-all group">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-tighter">{item.label}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.sub}</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-slate-300 transition-all dark:bg-slate-800 dark:border-slate-700" />
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white text-xs font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:bg-blue-600 dark:hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group shadow-xl"
          >
            <Save size={20} className="group-hover:rotate-12 transition-transform" />
            Establish Project Node
          </button>
        </form>
      </GlassCard>
    </div>
  );
};
