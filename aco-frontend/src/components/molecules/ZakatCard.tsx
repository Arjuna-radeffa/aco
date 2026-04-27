import React from 'react';
import { Heart, Users, ChevronRight, Shield } from 'lucide-react';
import { ZakatProject } from '../../types/appTypes';

interface ZakatCardProps {
  project: ZakatProject;
  onClick?: (id: string) => void;
}

const ZakatCard: React.FC<ZakatCardProps> = ({ project, onClick }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 group flex flex-col">
      <div className="h-56 relative overflow-hidden bg-slate-200">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-lg">
          Zakat {project.type}
        </div>
        <div className="absolute bottom-6 left-6 z-20">
           <p className="text-[10px] text-emerald-300 font-black uppercase tracking-widest mb-1 italic">Impact Score</p>
           <p className="text-2xl font-black text-white">{project.impactScore}/100</p>
        </div>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="p-8 flex flex-1 flex-col">
        <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
          {project.title}
        </h4>
        <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
              <Users size={16} className="text-emerald-600 mb-1" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Beneficiaries</p>
              <p className="text-sm font-black text-slate-900 text-center">{project.targetBeneficiaries.toLocaleString()}</p>
           </div>
           <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
              <Shield size={16} className="text-emerald-600 mb-1" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Verified</p>
              <p className="text-sm font-black text-slate-900 text-center">SYARIAH</p>
           </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(project.id);
          }}
          className="mt-auto w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95 text-xs uppercase tracking-widest"
        >
          Bayar Zakat <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ZakatCard;
