import React from "react";
import { Project } from "../types/projectTypes";
import { ArrowRight, TrendingUp, Heart } from 'lucide-react';
import { cn } from '../utils/cn';

export function RasioBar({ pctKomersial }: { pctKomersial: number }) {
  const pctSosial = 100 - pctKomersial;

  if (pctKomersial === 100) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 italic">100% Komersial</span>
      </div>
    );
  }
  if (pctKomersial === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-amber-400" />
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 italic">100% Sosial</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden flex">
        <div
          className="h-full bg-emerald-500 rounded-l-full"
          style={{ width: `${pctKomersial}%` }}
        />
        <div
          className="h-full bg-amber-400 rounded-r-full"
          style={{ width: `${pctSosial}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 whitespace-nowrap italic">
        {pctKomersial}% · {pctSosial}%
      </span>
    </div>
  );
}

interface ProjectSummaryCardProps {
  project: Project;
  onViewDetail: (id: string) => void;
}

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ project, onViewDetail }) => {
  const progress = Math.round((project.currentFunding / project.targetFunding) * 100);
  const isFull = progress >= 100;

  return (
    <div 
      onClick={() => onViewDetail(project.id)}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-500 flex flex-col group cursor-pointer h-full"
    >
      {/* Thumbnail */}
      <div className="h-48 relative overflow-hidden bg-slate-100 italic">
        <img
          src={project.imageUrl || `https://images.unsplash.com/photo-1590664095641-dafa1871220a?q=80&w=600&auto=format&fit=crop`}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-slate-900 border border-white/20">
            {project.category}
          </span>
          <span className={cn(
            "px-3 py-1 rounded-full backdrop-blur-md text-[9px] font-black uppercase tracking-widest border border-white/20",
            project.metadata.landStatus === 'Wakaf' ? "bg-amber-500/90 text-white" : "bg-emerald-500/90 text-white"
          )}>
            {project.metadata.fundingType}
          </span>
        </div>

        {isFull && (
          <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full italic shadow-lg">
            Fully Funded
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Name */}
        <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-emerald-600 transition-colors">
          {project.title}
        </h3>

        {/* Rasio Bar */}
        <RasioBar pctKomersial={project.metadata.allocation.commercial} />

        {/* Status Mini */}
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} className="text-emerald-500" />
            <span>12 - 18% Target Yield</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart size={14} className="text-amber-500" />
            <span>24 Bulan</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-auto pt-4 border-t border-slate-50">
          <div className="flex justify-between items-end mb-2.5">
            <div className="space-y-0.5">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Terkumpul</p>
              <p className="text-sm font-bold text-slate-900 italic">Rp {project.currentFunding.toLocaleString('id-ID')}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-emerald-600 italic leading-none">{Math.min(progress, 100)}%</p>
            </div>
          </div>
          
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.3)]",
                progress >= 80 ? "bg-gradient-to-r from-emerald-400 to-amber-500" : "bg-gradient-to-r from-emerald-500 to-emerald-400"
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <p className="text-[10px] font-bold text-slate-400 mt-3 flex justify-between uppercase tracking-widest italic">
            <span>Target Dana</span>
            <span className="text-slate-900">Rp {project.targetFunding.toLocaleString('id-ID')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;
