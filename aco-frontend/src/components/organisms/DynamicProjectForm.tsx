import React, { useState } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { ValidatedInput } from '../atoms/ValidatedInput';
import { useNazirValidation } from '../../hooks/useNazirValidation';
import { useStore } from '../../store/useStore';
import { LayoutGrid, MapPin, UserCheck, ShieldCheck, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DynamicProjectForm: React.FC = () => {
  const [category, setCategory] = useState<'Logistik' | 'Wakaf' | 'UMKM'>('UMKM');
  const [title, setTitle] = useState('');
  const [route, setRoute] = useState('');
  const [nazirQuota, setNazirQuota] = useState(0);
  const [wakif, setWakif] = useState('');
  const [nazir, setNazir] = useState('');
  
  const { error: nazirError, warning: nazirWarning } = useNazirValidation(nazirQuota);
  const updateProject = useStore((state: any) => state.updateProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nazirError) return;
    
    console.log('Saving Project:', { title, category, route, nazirQuota, wakif, nazir });
    // In real app, call updateProject or createProject
    alert('Project saved successfully!');
  };

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black italic tracking-tight">Dynamic Project Setup</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">US-IO-01 & 02 Compliant</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-1 bg-slate-100 rounded-2xl">
          {['UMKM', 'Logistik', 'Wakaf'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat as any)}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                category === cat 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <ValidatedInput 
            label="Project Title" 
            placeholder="Enter project name..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <AnimatePresence mode="wait">
            {category === 'Logistik' && (
              <motion.div
                key="logistik-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 overflow-hidden"
              >
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-3">
                  <MapPin className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Logistik Details</p>
                    <p className="text-[10px] text-blue-600 font-medium">Tentukan rute distribusi utama untuk armada logistik.</p>
                  </div>
                </div>
                <ValidatedInput 
                  label="Primary Route" 
                  placeholder="e.g. Jakarta - Surabaya" 
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                />
              </motion.div>
            )}

            {category === 'Wakaf' && (
              <motion.div
                key="wakaf-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 overflow-hidden"
              >
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                  <ShieldCheck className="text-emerald-600 mt-1" size={20} />
                  <div>
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Wakaf Governance</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Informasi legalitas Wakif dan Nazir yang mengelola aset.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <ValidatedInput 
                    label="Nama Wakif" 
                    placeholder="Pemberi Wakaf" 
                    value={wakif}
                    onChange={(e) => setWakif(e.target.value)}
                  />
                  <ValidatedInput 
                    label="Nama Nazir" 
                    placeholder="Pengelola" 
                    value={nazir}
                    onChange={(e) => setNazir(e.target.value)}
                  />
                </div>

                <ValidatedInput 
                  label="Nazir Quota (%)" 
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

        {/* US-IO-01 v3.1/v3.2 Revision: Node-level Participation Opportunities (Complete Asset Classes) */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-start gap-3 mb-4">
            <UserCheck className="text-slate-400 mt-1" size={20} />
            <div>
              <p className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-widest">Peluang Partisipasi Eksternal</p>
              <p className="text-[10px] font-medium text-slate-500">Konfigurasi ini bersifat independen per node (tidak diwariskan dari parent).</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <label className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-blue-300 transition-colors group">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">Investasi Dana</p>
                <p className="text-[9px] text-slate-400">Izinkan skema bagi hasil/profit share</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300" />
            </label>
            <label className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors group">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">Wakaf Dana (Uang)</p>
                <p className="text-[9px] text-slate-400">Wakaf tunai produktif (Cash Waqf)</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300" />
            </label>
            <label className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-emerald-300 transition-colors group">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">Wakaf Aset Bergerak</p>
                <p className="text-[9px] text-slate-400">Kendaraan, Mesin, Barang Modal</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300" />
            </label>
            <label className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-purple-300 transition-colors group">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">Wakaf Aset T. Bergerak</p>
                <p className="text-[9px] text-slate-400">Tanah, Gedung, Properti SHM</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-slate-300" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-xl"
        >
          <Save size={20} className="group-hover:scale-110 transition-transform" />
          Simpan Data Proyek
        </button>
      </form>
    </GlassCard>
  );
};
