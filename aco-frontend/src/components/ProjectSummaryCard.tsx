import React from "react";
import { Project } from "../types/projectTypes";
import { MapPin, ShieldCheck, Landmark, BadgeDollarSign, ArrowRight } from "lucide-react";
import VisualAllocationChart from "./VisualAllocationChart";

interface ProjectSummaryCardProps {
  project: Project;
  onViewDetail: (id: string) => void;
}

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ project, onViewDetail }) => {
  const { title, location, description, imageUrl, currentFunding, targetFunding, metadata } = project;
  const progress = (currentFunding / targetFunding) * 100;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {metadata.landStatus === "Wakaf" && (
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              Lahan Wakaf
            </span>
          )}
          {metadata.landStatus === "Commercial" && (
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <BadgeDollarSign className="w-3.5 h-3.5" />
              Komersil
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-200/50">
            {metadata.fundingType}
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-indigo-500" />
          {location}
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {title}
        </h2>
        
        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        {/* Ownership Model Highlight */}
        <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">Model Kepemilikan</p>
              <p className="text-sm font-bold text-slate-800">
                {metadata.ownershipModel} 
                <span className="text-slate-500 font-normal ml-1">
                  ({metadata.landStatus === "Wakaf" ? "Asset Umat" : "Developer Owned"})
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Target Pendanaan</p>
              <p className="text-lg font-bold text-slate-900">
                Rp {(targetFunding / 1000000000).toFixed(1)}M
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-indigo-600">{progress.toFixed(0)}% Terkumpul</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Allocation Widget */}
        <VisualAllocationChart 
          commercial={metadata.allocation.commercial} 
          social={metadata.allocation.social} 
        />

        <button 
          onClick={() => onViewDetail(project.id)}
          className="w-full mt-8 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          Lihat Detail Proyek
          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;
