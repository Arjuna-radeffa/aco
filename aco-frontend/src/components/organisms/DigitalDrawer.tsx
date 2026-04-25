import React, { useState } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { FileText, Eye, CheckCircle, XCircle, ChevronRight, Upload, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DigitalDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'verify'>('files');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const mockFiles = [
    { id: '1', name: 'Surat_Izin_Lahan.pdf', type: 'PDF', date: '24 Apr 2026' },
    { id: '2', name: 'KTP_Wakif_Abdullah.jpg', type: 'JPG', date: '23 Apr 2026', needsVerify: true },
    { id: '3', name: 'Laporan_Keuangan_Q1.xlsx', type: 'XLSX', date: '20 Apr 2026' },
  ];

  return (
    <GlassCard className="max-w-4xl mx-auto min-h-[500px] flex flex-col p-0 overflow-hidden">
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('files')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'files' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
          }`}
        >
          Files & Documents
        </button>
        <button 
          onClick={() => setActiveTab('verify')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'verify' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
          }`}
        >
          Verification (KTP)
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left List */}
        <div className="w-1/3 border-r border-slate-100 bg-slate-50/50 p-4 space-y-3 overflow-y-auto">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              placeholder="Search documents..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {mockFiles.map((file) => (
            <button
              key={file.id}
              onClick={() => setSelectedFile(file.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedFile === file.id 
                ? 'bg-white border-blue-200 shadow-lg scale-[1.02]' 
                : 'bg-transparent border-transparent hover:bg-white/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${file.needsVerify ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  <FileText size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{file.date}</p>
                </div>
                {file.needsVerify && (
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                )}
              </div>
            </button>
          ))}
          
          <button className="w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all group">
            <Upload size={16} className="group-hover:-translate-y-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-wider">Upload New</span>
          </button>
        </div>

        {/* Right Preview/Action */}
        <div className="flex-1 p-8 bg-white flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <Eye size={40} />
                </div>
                <div>
                  <h4 className="text-lg font-black italic">Select a Document</h4>
                  <p className="text-xs text-slate-400 font-medium">Click on a file to preview or verify its contents.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full h-full flex flex-col"
              >
                <div className="flex-1 bg-slate-100 rounded-3xl mb-8 flex items-center justify-center relative group">
                  <div className="text-slate-400 flex flex-col items-center gap-2">
                    <FileText size={48} className="opacity-20" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40 italic">Document Preview</span>
                  </div>
                  {/* Floating Action Bar */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl hover:bg-blue-600 transition-all">Download</button>
                    <button className="px-6 py-2 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl hover:bg-slate-50 transition-all">Close</button>
                  </div>
                </div>

                {activeTab === 'verify' && (
                  <div className="flex items-center justify-between p-6 bg-slate-900 rounded-3xl text-white">
                    <div className="text-left">
                      <h5 className="text-sm font-black italic">Verifikasi Identitas</h5>
                      <p className="text-[10px] text-slate-400 font-medium">Pastikan data sesuai dengan dokumen resmi.</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-3 bg-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all ring-1 ring-red-500/50">
                        <XCircle size={20} />
                      </button>
                      <button className="px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 flex items-center gap-2 hover:bg-blue-500 transition-all cursor-pointer">
                        Approve <CheckCircle size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
};
