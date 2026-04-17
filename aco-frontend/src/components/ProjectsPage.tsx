import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, BarChart3, Building2, Target, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

interface ProjectsPageProps {
  onBack: () => void;
  onLoginClick: () => void;
  onViewDetail: (id: string) => void;
}

const getProjectImage = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('lumbung') || t.includes('pangan') || t.includes('farm')) return '/projects/farm.png';
  if (t.includes('ruko') || t.includes('properti')) return '/projects/ruko.png';
  if (t.includes('laundry') || t.includes('umkm')) return '/projects/laundry.png';
  return '/projects/farm.png'; // fallback
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onLoginClick, onViewDetail }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories = ['All', 'Agribisnis', 'Properti', 'UMKM'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-semibold">
            <ArrowLeft size={20} /> Kembali
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
             <span className="text-lg font-bold text-slate-900">ACO <span className="text-blue-600">Projects</span></span>
          </div>
          <button onClick={onLoginClick} className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all">
            Mulai Investasi
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Eksplorasi Amanah</h1>
            <p className="text-slate-600">Temukan proyek-proyek pilihan yang transparan dan berdampak luas.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all group flex flex-col">
                <div className="h-56 bg-slate-100 relative overflow-hidden">
                   <img 
                     src={getProjectImage(project.name || project.title)} 
                     alt={project.name || project.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-600 border border-slate-100 italic">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-8 flex flex-1 flex-col">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{project.title || project.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Return</p>
                      <p className="text-lg font-bold text-emerald-600">{(project.monthlyProfit ? (project.monthlyProfit/project.targetFunding * 100).toFixed(1) : 10)}%</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Pendanaan</p>
                      <p className="text-sm font-bold text-slate-700">Rp {(project.targetFunding/1000000).toFixed(0)}Jt</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-bold text-slate-600">Terpendaan: <span className="text-blue-600">{((project.raisedFunding/project.targetFunding)*100).toFixed(0)}%</span></p>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-blue-600 transition-all duration-1000`} 
                        style={{ width: `${(project.raisedFunding/project.targetFunding)*100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button 
                      onClick={() => onViewDetail(project.id)}
                      className="w-full py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                      Lihat Detail <ChevronRight size={18} />
                    </button>
                    <button 
                      onClick={onLoginClick}
                      className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
                    >
                      Investasi Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LayoutGrid = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

export default ProjectsPage;
