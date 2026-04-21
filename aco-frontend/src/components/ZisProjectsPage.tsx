import React, { useState } from 'react';
import { ArrowLeft, Search, Heart, Users, ChevronRight, PieChart, Shield } from 'lucide-react';
import ZisProjectDetail from './ZisProjectDetail';

export interface ZisProject {
  id: string;
  title: string;
  category: 'Zakat' | 'Infaq' | 'Waqf';
  description: string;
  targetFunding: number;
  raisedFunding: number;
  beneficiaries: number;
  impactScore: number;
  image: string;
}

interface ZisProjectsPageProps {
  onBack: () => void;
  onDonationClick: () => void;
  onViewDetail: (id: string) => void;
}

const mockZisProjects: ZisProject[] = [
  {
    id: 'zis-1',
    title: 'Beasiswa Anak Yatim & Dhuafa',
    category: 'Zakat',
    description: 'Program pemberian beasiswa pendidikan tingkat SMA untuk 500 anak yatim di wilayah Jawa Barat.',
    targetFunding: 500000000,
    raisedFunding: 325000000,
    beneficiaries: 500,
    impactScore: 92,
    image: '/projects/education.png'
  },
  {
    id: 'zis-2',
    title: 'Pembangunan Sumur Bor Air Bersih',
    category: 'Infaq',
    description: 'Penyediaan air bersih melalui pembangunan sumur bor di 10 desa kekeringan di NTT.',
    targetFunding: 200000000,
    raisedFunding: 185000000,
    beneficiaries: 2000,
    impactScore: 95,
    image: '/projects/water.png'
  },
  {
    id: 'zis-3',
    title: 'Rumah Sakit Wakaf Indonesia',
    category: 'Waqf',
    description: 'Pembangunan fasilitas kesehatan gratis untuk masyarakat tidak mampu berbasis wakaf produktif.',
    targetFunding: 5000000000,
    raisedFunding: 1200000000,
    beneficiaries: 10000,
    impactScore: 98,
    image: '/projects/hospital.png'
  },
  {
    id: 'zis-4',
    title: 'Pemberdayaan Ekonomi Mikro',
    category: 'Zakat',
    description: 'Pelatihan dan modal usaha mikro untuk 100 ibu rumah tangga prasejahtera di sentra UMKM.',
    targetFunding: 150000000,
    raisedFunding: 45000000,
    beneficiaries: 100,
    impactScore: 88,
    image: '/projects/laundry.png'
  },
  {
    id: 'zis-5',
    title: 'Bantuan Pangan Lansia',
    category: 'Infaq',
    description: 'Paket makanan bergizi bulanan untuk lansia yang hidup sendirian di berbagai wilayah.',
    targetFunding: 100000000,
    raisedFunding: 98000000,
    beneficiaries: 300,
    impactScore: 90,
    image: '/projects/farm.png'
  }
];

const ZisProjectsPage: React.FC<ZisProjectsPageProps> = ({ onBack, onDonationClick, onViewDetail }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const filteredProjects = mockZisProjects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedProject = mockZisProjects.find(p => p.id === selectedProjectId);

  if (selectedProjectId && selectedProject) {
    return (
      <ZisProjectDetail 
        project={selectedProject} 
        onBack={() => setSelectedProjectId(null)} 
        onDonate={onDonationClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-bold uppercase text-xs tracking-tight">
            <ArrowLeft size={18} /> Kembali
          </button>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black italic">A</div>
             <span className="text-lg font-black text-slate-900 tracking-tighter">ACO <span className="text-emerald-600">ZIS Portal</span></span>
          </div>
          <button onClick={onDonationClick} className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
             Salurkan Dana
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Shield className="w-3 h-3" /> Transparansi Sosial Mutlak
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Aksi Nyata & Berkah</h1>
            <p className="text-slate-600 font-medium max-w-xl">Pilih program ZIS yang paling sesuai dengan amanah yang ingin Anda salurkan.</p>
          </div>
          
          <div className="w-full md:w-auto space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Cari program sosial..." 
                className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Zakat', 'Infaq', 'Waqf'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === cat 
                      ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Penerima Manfaat</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">15,432</h3>
                <p className="text-[10px] text-emerald-600 font-bold italic">+12% Bulan ini</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                <PieChart className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dana Tersalurkan</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Rp 2.8B</h3>
                <p className="text-[10px] text-blue-600 font-bold italic">Akumulasi YTD</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tingkat Transparansi</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">100%</h3>
                <p className="text-[10px] text-purple-600 font-bold italic">Verified Audit</p>
              </div>
           </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => {
            const progress = (project.raisedFunding / project.targetFunding) * 100;
            return (
              <div key={project.id} className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 group flex flex-col">
                <div className="h-64 relative overflow-hidden bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-lg ${
                    project.category === 'Zakat' ? 'bg-emerald-500 text-white' :
                    project.category === 'Infaq' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                  }`}>
                    {project.category}
                  </div>
                  <div className="absolute bottom-6 left-6 z-20">
                     <p className="text-[10px] text-emerald-300 font-black uppercase tracking-widest mb-1 italic">Social Impact Score</p>
                     <p className="text-2xl font-black text-white">{project.impactScore}/100</p>
                  </div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="p-10 flex flex-1 flex-col">
                  <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">{project.title}</h4>
                  <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Beneficiaries</p>
                        <p className="text-xl font-black text-slate-900 text-center">{project.beneficiaries.toLocaleString()}</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center text-xs">Target</p>
                        <p className="text-base font-black text-slate-900 text-center">
                          {project.targetFunding >= 1000000000 ? (project.targetFunding / 1000000000).toFixed(1) + 'B' : (project.targetFunding / 1000000).toFixed(0) + 'M'}
                        </p>
                     </div>
                  </div>

                  <div className="space-y-3 mb-10">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress Penyaluran</p>
                      <p className="text-sm font-black text-emerald-600 italic">{progress.toFixed(0)}%</p>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full bg-gradient-to-r ${
                          project.category === 'Zakat' ? 'from-emerald-500 to-emerald-600' :
                          project.category === 'Infaq' ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'
                        } transition-all duration-1000`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedProjectId(project.id)}
                    className="mt-auto w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95"
                  >
                    Donasi Sekarang <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="bg-slate-900 py-20 px-6 text-center text-white mt-12">
         <div className="max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-emerald-500 mx-auto mb-8 opacity-50" />
            <h2 className="text-2xl md:text-3xl font-black italic mb-6 leading-tight">"Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain."</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Prophetic Wisdom</p>
         </div>
      </div>
    </div>
  );
};

export default ZisProjectsPage;
