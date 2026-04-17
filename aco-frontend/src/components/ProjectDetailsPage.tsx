import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Users, 
  Info,
  Calendar,
  AlertCircle,
  BarChart3,
  ChevronRight,
  Share2,
  Heart
} from 'lucide-react';
import { api } from '../services/api';

const getProjectImage = (title: string) => {
  const t = title?.toLowerCase() || '';
  if (t.includes('lumbung') || t.includes('pangan') || t.includes('farm')) return '/projects/farm.png';
  if (t.includes('ruko') || t.includes('properti')) return '/projects/ruko.png';
  if (t.includes('laundry') || t.includes('umkm')) return '/projects/laundry.png';
  return '/projects/farm.png'; // fallback
};

interface ProjectDetailsPageProps {
  projectId: string;
  onBack: () => void;
  onInvestClick: () => void;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ projectId, onBack, onInvestClick }) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await api.get('/projects/' + projectId);
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={60} className="text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Proyek Tidak Ditemukan</h2>
        <p className="text-slate-600 mb-6">Maaf, detail proyek yang Anda cari tidak tersedia.</p>
        <button onClick={onBack} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
          Kembali ke Eksplorasi
        </button>
      </div>
    );
  }

  const fundingPercent = ((project.raisedFunding / project.targetFunding) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Top Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-bold uppercase tracking-wider text-xs">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={18} />
            </div>
            Kembali
          </button>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
              <Heart size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Image & Info */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-[28rem] bg-slate-200 relative">
                <img 
                  src={getProjectImage(project.name || project.title)} 
                  alt={project.name || project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 inline-block shadow-lg shadow-blue-200">
                    {project.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
                    {project.name || project.title}
                  </h1>
                </div>
              </div>

              <div className="p-10 border-t border-slate-100">
                <div className="flex flex-wrap gap-8 items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimasi ROI</p>
                      <p className="text-xl font-bold text-slate-900">12 - 18% <span className="text-xs font-medium text-slate-400">/thn</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tingkat Risiko</p>
                      <p className="text-xl font-bold text-slate-900">Rendah - Sedang</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tenor</p>
                      <p className="text-xl font-bold text-slate-900">12 Bulan</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Info size={20} className="text-blue-600" /> Deskripsi Proyek
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {project.description || "Proyek ini bertujuan untuk mengembangkan ekosistem bisnis yang berkelanjutan dengan skema bagi hasil yang menguntungkan bagi seluruh pemangku kepentingan. Kami berkomitmen pada transparansi dan akuntabilitas dalam setiap tahapan operasional."}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Target size={16} className="text-blue-600" /> Tujuan Pendanaan</h4>
                        <p className="text-sm text-slate-600">Alokasi dana akan digunakan sepenuhnya untuk pengadaan aset infrastruktur, modal kerja operasional, dan pemasaran strategis.</p>
                     </div>
                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><BarChart3 size={16} className="text-blue-600" /> Proyeksi Bisnis</h4>
                        <p className="text-sm text-slate-600">Berdasarkan riset pasar, kami memproyeksikan pertumbuhan pendapatan yang stabil dengan tingkat BEP dalam waktu 8-10 bulan.</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Details Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-600" /> Ringkasan Finansial
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50/50 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">Target Pendanaan</p>
                      <p className="text-lg font-bold text-slate-900">Rp {project.targetFunding?.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="p-4 bg-blue-50/50 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wider mb-1">Minimum Investasi</p>
                      <p className="text-lg font-bold text-slate-900">Rp 1.000.000</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                     <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full">
                        <div className="flex justify-between items-end mb-4">
                          <p className="text-sm font-bold text-slate-600">Dana Terkumpul</p>
                          <p className="text-2xl font-black text-blue-600">{fundingPercent}%</p>
                        </div>
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden mb-4 shadow-inner">
                          <div 
                            className="h-full bg-blue-600 transition-all duration-1000 shadow-lg shadow-blue-300"
                            style={{ width: `${fundingPercent}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>Terpendaan: Rp {project.raisedFunding?.toLocaleString('id-ID')}</span>
                          <span>Sisa: Rp {(project.targetFunding - project.raisedFunding)?.toLocaleString('id-ID')}</span>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Sidebar Area (1 col) */}
          <div className="space-y-8">
            {/* Investment Box */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-500 mb-2">Investor Terdaftar</p>
                <div className="flex -space-x-3 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                      U{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                    +{project.investorCount || 0}
                  </div>
                </div>
                <p className="text-xs text-slate-400 italic">Bergabunglah dengan {project.investorCount || 0} investor lainnya.</p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-bold text-slate-900">Keuntungan Investasi:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" /> Bagi hasil bulanan otomatis
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" /> Laporan transparansi 24/7
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" /> Keanggotaan ACO Club
                  </li>
                </ul>
              </div>

              <button 
                onClick={onInvestClick}
                className="w-full py-5 bg-slate-900 text-white font-black text-lg rounded-3xl hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                MULAI INVESTASI <ChevronRight size={24} />
              </button>
              
              <p className="mt-6 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-loose">
                Amanah · Transparan · Berkelanjutan
              </p>
            </div>

            {/* Owner/Company Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Project Owner</p>
                    <h5 className="font-bold text-slate-900">{project.businessName || "ACO Enterprise"}</h5>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Proyek</span>
                    <span className="font-bold text-slate-900">12 Berhasil</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Lokasi</span>
                    <span className="font-bold text-slate-900">Malang, ID</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
