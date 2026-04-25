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
  Heart,
  Landmark,
  FileText,
  Download,
  CheckCircle2,
  PieChart,
  MapPin,
  ArrowRight,
  Activity
} from 'lucide-react';
import { api } from '../services/api';
import { Project } from '../types/projectTypes';
import { mockProjects } from '../data/projectMockData';
import VisualAllocationChart from './VisualAllocationChart';

interface ProjectDetailsPageProps {
  projectId: string;
  onBack: () => void;
  onInvestClick: (id?: string) => void;
  onWaqfClick?: (id?: string) => void;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ projectId, onBack, onInvestClick, onWaqfClick }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'impact' | 'docs' | 'updates' | 'subprojects'>('overview');
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [selectedSubNode, setSelectedSubNode] = useState<{name: string, type: string} | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const mockProject = mockProjects.find(p => p.id === projectId);
        if (mockProject) {
          setProject(mockProject);
          setLoading(false);
          return;
        }

        const data = await api.get('/projects/' + projectId);
        if (data) {
          const enrichedProject: Project = {
            ...data,
            metadata: data.metadata || {
              landStatus: "Commercial",
              fundingType: "Equity",
              ownershipModel: "SHM",
              allocation: { commercial: 100, social: 0 },
              features: []
            },
            milestones: data.milestones || [],
            financialProjections: data.financialProjections || [],
            socialImpacts: data.socialImpacts || [],
            legalDocuments: data.legalDocuments || [],
            investorCount: data.investorCount || 0,
            businessName: data.businessName || "ACO Enterprise",
            category: data.category || "General"
          };
          setProject(enrichedProject);
        }
      } catch (err) {
        console.error('Failed to fetch project details:', err);
        const mockProject = mockProjects.find(p => p.id === projectId);
        if (mockProject) {
          setProject(mockProject);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={80} className="text-slate-200 mb-6" />
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Proyek Tidak Ditemukan</h2>
        <p className="text-slate-600 mb-8 max-w-md">Maaf, detail proyek yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <button onClick={onBack} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          Kembali ke Eksplorasi
        </button>
      </div>
    );
  }

  const fundingPercent = Math.min(100, (project.currentFunding / project.targetFunding) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-all font-bold uppercase tracking-widest text-[10px]">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft size={18} />
            </div>
            Back to Discovery
          </button>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-thighter">
              <Share2 size={16} /> Share
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[32rem] group">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                    {project.category}
                  </span>
                  <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                    {project.metadata.landStatus}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tighter">
                  {project.title}
                </h1>
                <div className="flex items-center gap-6 text-white/80 font-medium">
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-indigo-400" /> {project.location}</span>
                  <span className="flex items-center gap-2"><Building2 size={18} className="text-indigo-400" /> {project.businessName}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 z-40 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', label: 'Ringkasan Proyek', icon: Info },
                { id: 'subprojects', label: 'Pilih Sub-Proyek', icon: Target },
                { id: 'financial', label: 'Proyeksi Finansial', icon: TrendingUp },
                { id: 'impact', label: 'Dampak Sosial', icon: Heart },
                { id: 'docs', label: 'Dokumen & Legal', icon: FileText },
                { id: 'updates', label: 'Updates & Donatur', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {activeTab === 'overview' && (
                <div className="space-y-12">
                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Detail Akad & Deskripsi</h3>
                      <p className="text-slate-600 leading-relaxed text-lg mb-10">
                        {project.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50">
                            <h4 className="font-black text-indigo-700 mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                              <ShieldCheck size={18} /> Model Kepemilikan (Ownership)
                            </h4>
                            <p className="text-slate-900 font-bold mb-2">{project.metadata.ownershipModel}</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {project.metadata.landStatus === 'Wakaf' 
                                ? "Lahan berstatus tanah wakaf yang tidak boleh diperjualbelikan. Investor memiliki hak milik atas bangunan (SHM Bangunan) selama masa guna." 
                                : "Lahan berstatus komersil milik Mudharib. Investor memiliki hak kepemilikan proporsional sesuai besaran investasi."}
                            </p>
                         </div>
                         <div className="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100/50">
                            <h4 className="font-black text-emerald-700 mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                              <Landmark size={18} /> Model Pendanaan (Fund Type)
                            </h4>
                            <p className="text-slate-900 font-bold mb-2">{project.metadata.fundingType}</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Sesuai dengan prinsip {project.metadata.fundingType === 'Sukuk' ? 'Syariah Sukuk Mudharabah' : 'Bagi Hasil (Musyarakah)'}. Tidak ada unsur Riba dan transparansi laporan bulanan.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Timeline & Milestone</h3>
                      <div className="space-y-10 relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                        {project.milestones.map((ms, i) => (
                          <div key={i} className="flex gap-10 relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg ${
                              ms.status === 'Completed' ? 'bg-emerald-500 text-white' :
                              ms.status === 'Current' ? 'bg-indigo-600 text-white animate-pulse' :
                              'bg-white border-2 border-slate-200 text-slate-300'
                            }`}>
                              {ms.status === 'Completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{ms.date}</p>
                              <h4 className="text-xl font-bold text-slate-900 mb-2">{ms.label}</h4>
                              <p className="text-slate-500 leading-relaxed">{ms.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'subprojects' && (
                <div className="space-y-12">
                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight relative z-10">Struktur Kompleks (Pilih Unit Alokasi)</h3>
                      <p className="text-sm font-medium text-slate-500 mb-8 relative z-10">Silakan pilih unit spesifik di bawah ini untuk mengalokasikan investasi/wakaf Anda secara langsung.</p>
                      
                      <div className="grid md:grid-cols-2 gap-8 relative z-10">
                         <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase text-indigo-600 tracking-widest px-4 flex items-center gap-2">
                               <Building2 size={16} /> Pilar Komersial
                            </h4>
                            {[
                               { name: 'RS Harapan Bunda', type: 'Investasi', target: 'Rp 5.0M', icon: Building2 },
                               { name: 'Perumahan Asri', type: 'Investasi', target: 'Rp 3.5M', icon: Landmark }
                            ].map((item) => (
                               <button 
                                 key={item.name}
                                 onClick={() => {
                                    setSelectedSubNode({ name: item.name, type: item.type });
                                    setShowGuestForm(true);
                                 }}
                                 className={`w-full p-8 text-left border-[2px] rounded-[2.5rem] transition-all group relative overflow-hidden ${
                                    selectedSubNode?.name === item.name 
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-[1.02]' 
                                    : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl text-slate-900'
                                 }`}
                               >
                                  <div className="flex justify-between items-start">
                                     <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${selectedSubNode?.name === item.name ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                                           <item.icon size={24} />
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedSubNode?.name === item.name ? 'text-indigo-200' : 'text-indigo-500'}`}>{item.type}</p>
                                        <h5 className="text-xl font-black italic tracking-tight">{item.name}</h5>
                                     </div>
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedSubNode?.name === item.name ? 'bg-indigo-500' : 'bg-slate-50 text-slate-300'}`}>
                                        <ArrowRight size={20} className={selectedSubNode?.name === item.name ? 'text-white' : 'group-hover:translate-x-1 transition-transform'} />
                                     </div>
                                  </div>
                                  <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                     <span className={selectedSubNode?.name === item.name ? 'text-indigo-100' : 'text-slate-400'}>Target: {item.target}</span>
                                     <span className={`px-4 py-2 rounded-full ${selectedSubNode?.name === item.name ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                                        Pilih Unit
                                     </span>
                                  </div>
                               </button>
                            ))}
                         </div>

                         <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase text-emerald-600 tracking-widest px-4 flex items-center gap-2">
                               <Heart size={16} /> Pilar Sosial
                            </h4>
                            {[
                               { name: 'Masjid Raya Integrasi', type: 'Wakaf Dana', target: 'Rp 2.5M', icon: Landmark },
                               { name: 'Taman Bermain Anak', type: 'Wakaf Aset', target: 'Rp 1.0M', icon: Heart }
                            ].map((item) => (
                               <button 
                                 key={item.name}
                                 onClick={() => {
                                    setSelectedSubNode({ name: item.name, type: item.type });
                                    setShowGuestForm(true);
                                 }}
                                 className={`w-full p-8 text-left border-[2px] rounded-[2.5rem] transition-all group relative overflow-hidden ${
                                    selectedSubNode?.name === item.name 
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xl shadow-emerald-200 scale-[1.02]' 
                                    : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-xl text-slate-900'
                                 }`}
                               >
                                  <div className="flex justify-between items-start">
                                     <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${selectedSubNode?.name === item.name ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                                           <item.icon size={24} />
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedSubNode?.name === item.name ? 'text-emerald-200' : 'text-emerald-500'}`}>{item.type}</p>
                                        <h5 className="text-xl font-black italic tracking-tight">{item.name}</h5>
                                     </div>
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedSubNode?.name === item.name ? 'bg-emerald-500' : 'bg-slate-50 text-slate-300'}`}>
                                        <ArrowRight size={20} className={selectedSubNode?.name === item.name ? 'text-white' : 'group-hover:translate-x-1 transition-transform'} />
                                     </div>
                                  </div>
                                  <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                     <span className={selectedSubNode?.name === item.name ? 'text-emerald-100' : 'text-slate-400'}>Target: {item.target}</span>
                                     <span className={`px-4 py-2 rounded-full ${selectedSubNode?.name === item.name ? 'bg-white text-emerald-600' : 'bg-emerald-600 text-white opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                                        Pilih Unit
                                     </span>
                                  </div>
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'financial' && (
                <div className="space-y-12">
                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Proyeksi Bagi Hasil (Profit)</h3>
                      <div className="overflow-hidden rounded-[2rem] border border-slate-100">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-slate-50">
                              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Tahun Fiskal</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Pendapatan</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Biaya Ops</th>
                              <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Net Profit</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {project.financialProjections.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-6 font-bold text-slate-900">{row.year}</td>
                                <td className="px-8 py-6 text-right font-medium text-slate-600">Rp {row.revenue.toLocaleString('id-ID')}</td>
                                <td className="px-8 py-6 text-right font-medium text-slate-600">Rp {row.expense.toLocaleString('id-ID')}</td>
                                <td className="px-8 py-6 text-right font-black text-indigo-600">Rp {row.profit.toLocaleString('id-ID')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-4">
                        <BarChart3 className="text-indigo-600 shrink-0" size={24} />
                        <div>
                          <p className="text-sm font-bold text-indigo-700">Analisis Mudharabah</p>
                          <p className="text-sm text-indigo-900/70 leading-relaxed mt-1">
                            Bagi hasil dihitung dari Net Profit dengan nisbah yang disepakati (misal: 60% Shahibul Maal, 40% Mudharib). Pembayaran dilakukan setiap tanggal 5 setiap bulannya.
                          </p>
                        </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Penggunaan Dana (Amanah Modal)</h3>
                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                               <span className="font-bold text-slate-600">Capex (Konstruksi)</span>
                               <span className="font-black text-slate-900">70%</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                               <span className="font-bold text-slate-600">Opex (Operational)</span>
                               <span className="font-black text-slate-900">20%</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                               <span className="font-bold text-slate-600">Dana Cadangan</span>
                               <span className="font-black text-slate-900">10%</span>
                            </div>
                         </div>
                         <div className="flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full border-8 border-indigo-100 flex items-center justify-center">
                               <PieChart size={64} className="text-indigo-200" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'impact' && (
                <div className="space-y-12">
                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Distribusi Manfaat (Asnaf Allocation)</h3>
                      <VisualAllocationChart 
                        commercial={project.metadata.allocation.commercial} 
                        social={project.metadata.allocation.social} 
                      />
                      <div className="mt-12 grid md:grid-cols-2 gap-8">
                        {project.socialImpacts.map((impact, i) => (
                          <div key={i} className="flex gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                               {impact.icon === 'Users' ? <Users size={28} /> : 
                                impact.icon === 'Landmark' ? <Landmark size={28} /> : 
                                <Heart size={28} />}
                            </div>
                            <div>
                               <h4 className="font-black text-slate-900 mb-2">{impact.title}</h4>
                               <p className="text-sm text-slate-500 leading-relaxed">{impact.impact}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-12">
                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Legalitas & Kepatuhan</h3>
                      <div className="space-y-4">
                        {project.legalDocuments.map((doc, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                   <FileText size={20} />
                                </div>
                                <div>
                                   <p className="font-bold text-slate-900">{doc.name}</p>
                                   <p className="text-xs text-slate-400 uppercase font-black">Verified by ACO Legal</p>
                                </div>
                             </div>
                             <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
                                <Download size={20} />
                             </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-12 p-10 bg-[#0F172A] rounded-[2.5rem] text-white">
                         <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 shadow-2xl shadow-indigo-500/50">
                               <ShieldCheck size={48} />
                            </div>
                            <div>
                               <h4 className="text-2xl font-bold mb-2 italic">Dewan Pengawas Syariah (DPS)</h4>
                               <p className="text-slate-400 leading-relaxed font-medium">
                                 Proyek ini telah melalui proses telaah dan validasi oleh Dewan Pengawas Syariah independen untuk menjamin kesesuaian dengan akad Mudharabah/Musyarakah tanpa Riba.
                               </p>
                               <div className="mt-6 flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest">
                                  <CheckCircle2 size={16} /> Status: Fully Compliant
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'updates' && (
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Kabar & Progress</h3>
                      <div className="space-y-8 relative">
                         <div className="absolute left-6 top-2 bottom-0 w-0.5 bg-slate-100"></div>
                         {[
                           { title: 'Pengecoran Pondasi Tahap 2', date: 'Hari ini, 14:30 WIB', type: 'progress' },
                           { title: 'Pengajuan RAB Material Disetujui', date: 'Kemarin, 09:00 WIB', type: 'admin' },
                           { title: 'Tender Vendor Logistik Selesai', date: '3 Hari Lalu', type: 'progress' },
                           { title: 'Pembebasan Lahan 100% Clear', date: 'Minggu Lalu', type: 'progress' }
                         ].map((u, i) => (
                           <div key={i} className="flex gap-6 relative">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-sm ${u.type === 'progress' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                 {u.type === 'progress' ? <Building2 size={20} /> : <CheckCircle2 size={20} />}
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-slate-900 mb-1">{u.title}</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{u.date}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm">
                      <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Daftar Kontributor</h3>
                      <div className="space-y-6">
                         {[
                           { name: 'Ham*** ***', t: 'Wakaf Dana', val: 'Rp 5.000.000', time: '5 Menit yang lalu' },
                           { name: 'Suh***', t: 'Investasi', val: 'Rp 10.000.000', time: '1 Jam yang lalu' },
                           { name: 'Hamba Allah', t: 'Wakaf', val: 'Rp 50.000', time: '3 Jam yang lalu' },
                           { name: 'Ind*** ***', t: 'Investasi', val: 'Rp 25.000.000', time: 'Kemarin' },
                           { name: 'Hamba Allah', t: 'Infaq', val: 'Rp 1.000.000', time: 'Kemarin' },
                         ].map((d, i) => (
                           <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                              <div className="flex gap-4 items-center">
                                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Users size={16} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black italic uppercase text-slate-800">{d.name}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{d.t} • {d.time}</p>
                                 </div>
                              </div>
                              <p className="text-sm font-black text-slate-900">{d.val}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl sticky top-28 z-30">
                <div className="mb-10">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Amanah Modal Terkumpul</p>
                   <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black text-slate-900">Rp {(project.currentFunding / 1000000000).toFixed(1)}M</span>
                      <span className="text-slate-400 font-bold">/ {(project.targetFunding / 1000000000).toFixed(1)}M</span>
                   </div>
                   <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-lg shadow-indigo-200"
                        style={{ width: `${fundingPercent}%` }}
                      ></div>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-indigo-600">{fundingPercent.toFixed(1)}% Terpenuhi</span>
                      <span className="text-slate-400">{project.investorCount} Shahibul Maal</span>
                   </div>
                </div>

                <div className="space-y-6 mb-10">
                   <div className="flex justify-between items-center py-4 border-b border-slate-50">
                      <span className="text-sm font-bold text-slate-500">Min. Amanah</span>
                      <span className="font-black text-slate-900 italic">Rp 10.000.000</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-slate-50">
                      <span className="text-sm font-bold text-slate-500">Estimasi Bagi Hasil</span>
                      <span className="font-black text-emerald-600 italic">14 - 16% / thn</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-slate-50">
                      <span className="text-sm font-bold text-slate-500">Mulai Operasional</span>
                      <span className="font-black text-slate-900 italic">1 Jan 2025</span>
                   </div>
                </div>

                {showGuestForm ? (
                  <div className="border border-indigo-100 bg-indigo-50/30 p-6 rounded-[2rem] animate-in fade-in slide-in-from-top-4 space-y-4 mb-8">
                     <div className="flex justify-between items-center mb-2">
                        <h5 className="font-black italic uppercase text-indigo-900">
                           {selectedSubNode ? 'Tujuan Alokasi' : 'Guest Checkout'}
                        </h5>
                        <button onClick={() => {
                           setShowGuestForm(false);
                           setSelectedSubNode(null);
                        }} className="text-indigo-400 hover:text-indigo-900"><ArrowLeft size={16} /></button>
                     </div>

                     {selectedSubNode && (
                        <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between">
                           <div>
                              <p className="text-[8px] font-black uppercase text-indigo-500 tracking-widest">Unit Re-Selection</p>
                              <p className="text-xs font-bold text-slate-900">{selectedSubNode.name}</p>
                           </div>
                           <span className="text-[8px] font-black px-2 py-1 bg-indigo-50 text-indigo-600 rounded uppercase">{selectedSubNode.type}</span>
                        </div>
                     )}

                     <div>
                        <label className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Nama (Opsional)</label>
                        <input type="text" placeholder="Hamba Allah" className="w-full bg-white border border-indigo-100 py-3 px-4 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-500" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Nominal</label>
                        <div className="relative">
                          <span className="absolute left-4 top-3 font-bold text-slate-400">Rp</span>
                          <input type="number" placeholder="10.000.000" className="w-full bg-white border border-indigo-100 py-3 pl-12 pr-4 rounded-xl text-sm font-black focus:outline-none focus:border-indigo-500" />
                        </div>
                     </div>
                     <button 
                       onClick={() => alert(`Alokasi ke ${selectedSubNode?.name || 'Proyek Utama'} Berhasil!`)}
                       className="w-full py-4 mt-2 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                     >
                        Bayar via QRIS <ArrowRight size={16} />
                     </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowGuestForm(true)}
                    className="w-full py-6 bg-slate-900 text-white font-black text-xl rounded-2xl hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
                  >
                    {selectedSubNode ? 'LANJUT ALOKASI' : 'SALURKAN AMANAH'} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                )}
                
                <p className="mt-8 text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.3em] leading-loose">
                  Trust · Accuracy · Synergy
                </p>
             </div>

             <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Sosok Mudharib</h4>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                      <Building2 size={32} />
                   </div>
                   <div>
                      <h5 className="font-black text-slate-900 text-lg">{project.businessName}</h5>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
                         <ShieldCheck size={12} /> Verified Mudharib
                      </div>
                   </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                  {project.businessName} adalah entitas pengelola berpengalaman lebih dari 10 tahun dalam pengembangan kawasan edukasi berbasis syariah.
                </p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Track Record</p>
                      <p className="font-bold text-slate-900">12 Proyek</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Avg. Returns</p>
                      <p className="font-bold text-slate-900">15.2%</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProjectDetailsPage;
