import React from 'react';
import { ArrowLeft, Heart, Users, Shield, MapPin, Calendar, CheckCircle2, TrendingUp, Info, Share2, Download } from 'lucide-react';

interface ZisProjectDetailProps {
  project: {
    id: string;
    title: string;
    category: 'Zakat' | 'Infaq' | 'Waqf';
    description: string;
    targetFunding: number;
    raisedFunding: number;
    beneficiaries: number;
    impactScore: number;
    image: string;
  };
  onBack: () => void;
  onDonate: () => void;
}

const ZisProjectDetail: React.FC<ZisProjectDetailProps> = ({ project, onBack, onDonate }) => {
  const progress = (project.raisedFunding / project.targetFunding) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold uppercase text-[10px] tracking-widest transition-all">
            <ArrowLeft size={16} /> Back to Projects
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><Download size={18} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 pb-32">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Visuals & Info */}
          <div className="space-y-8">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 relative group">
              <img src={project.image} alt={project.title} className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block ${
                  project.category === 'Zakat' ? 'bg-emerald-500' :
                  project.category === 'Infaq' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {project.category} Verified
                </span>
                <h1 className="text-4xl font-black tracking-tighter leading-tight">{project.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Impact Score</p>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-emerald-600">{project.impactScore}%</span>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.impactScore}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shariah Audit</p>
                <div className="flex flex-col items-center">
                  <Shield className="text-blue-500 mb-1" size={20} />
                  <span className="text-[9px] font-black text-slate-900 uppercase">Compliant</span>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Verified</p>
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="text-emerald-500 mb-1" size={20} />
                  <span className="text-[9px] font-black text-slate-900 uppercase">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                 <Info className="text-emerald-500" size={20} /> Project Background
               </h3>
               <p className="text-slate-600 leading-relaxed font-medium mb-6">
                 {project.description} This project aims to provide sustainable impact through transparent fund management and community-led execution. Every contribution is tracked and reported in real-time.
               </p>
               <div className="space-y-4">
                 {[
                   { icon: <MapPin size={16} />, text: 'West Java, Indonesia' },
                   { icon: <Calendar size={16} />, text: 'Launched: Jan 2026' },
                   { icon: <Users size={16} />, text: 'Target: 5,000 Individuals' }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                     <div className="text-emerald-500">{item.icon}</div>
                     {item.text}
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Column: Funding & Impact Metrics */}
          <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 italic">Fundraising Progress</p>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Raised So Far</p>
                  <h2 className="text-4xl font-black tracking-tighter">Rp {project.raisedFunding.toLocaleString()}</h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-400 italic">{progress.toFixed(1)}%</p>
                </div>
              </div>

              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs font-bold text-slate-400 mb-10">
                <span>Total Target: Rp {project.targetFunding.toLocaleString()}</span>
                <span>Days Left: 14</span>
              </div>

              <button 
                onClick={onDonate}
                className="w-full py-5 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-950/40 text-sm uppercase tracking-widest"
              >
                Salurkan Dana Sekarang
              </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
                 <TrendingUp className="text-blue-500" size={20} /> Social Impact Projection
               </h3>
               
               <div className="space-y-6">
                 {[
                   { label: 'Beneficiary Reach', value: '1,240 / 5,000', progress: 24, color: 'bg-blue-500' },
                   { label: 'Resource Deployment', value: '85%', progress: 85, color: 'bg-emerald-500' },
                   { label: 'Community Engagement', value: 'Over 92%', progress: 92, color: 'bg-purple-500' }
                 ].map((stat, idx) => (
                   <div key={idx} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span>{stat.label}</span>
                       <span className="text-slate-900">{stat.value}</span>
                     </div>
                     <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.progress}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 italic">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    "Program ini sangat membantu kami yang sebelumnya kesulitan akses pendidikan. Sekarang anak-anak saya bisa sekolah dengan tenang."
                  </p>
                  <p className="text-[10px] font-black text-slate-900 mt-4 uppercase tracking-widest">— Ibu Sumiati, Penerima Manfaat</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZisProjectDetail;
