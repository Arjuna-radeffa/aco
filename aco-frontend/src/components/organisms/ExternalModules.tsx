import React from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { MonitoringChart } from './MonitoringChart';
import { 
  ChevronRight, 
  Wallet, 
  TrendingUp, 
  Heart, 
  PieChart as PieChartIcon, 
  Download, 
  FileText, 
  Activity, 
  Clock, 
  ArrowUpRight, 
  Calendar,
  ShieldCheck,
  Search,
  Filter,
  PlusSquare
} from 'lucide-react';
import { useStore } from '../../store/useStore';

// --- SHARED EXTERNAL COMPONENTS ---

const DashboardCards: React.FC<{ role: string }> = ({ role }) => {
  const cards = [
    { label: 'Total Investasi Aktif', val: 'Rp 450.000.000', icon: <Wallet size={20} />, color: 'text-blue-600', show: role.includes('invest') },
    { label: 'Estimasi Bagi Hasil Q2', val: 'Rp 14.250.000', icon: <TrendingUp size={20} />, color: 'text-emerald-600', show: role.includes('invest') },
    { label: 'Total Wakaf Uang', val: 'Rp 25.000.000', icon: <Heart size={20} />, color: 'text-indigo-600', show: role.includes('wakif') },
    { label: 'Zakat & Infaq Terbayar', val: 'Rp 8.500.000', icon: <Activity size={20} />, color: 'text-amber-600', show: ['muzakki', 'munfiq', 'mutashadiq'].some(r => role.includes(r)) },
    { label: 'Partisipasi Aktif', val: '12 Proyek', icon: <PieChartIcon size={20} />, color: 'text-slate-900', show: true },
  ].filter(c => c.show);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.slice(0, 4).map((c, i) => (
        <GlassCard key={i} className="p-8 group hover:scale-[1.02] transition-all bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
             <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${c.color} group-hover:bg-current group-hover:text-white transition-all`}>
                {c.icon}
             </div>
             <ArrowUpRight size={16} className="text-slate-200 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-400" />
          </div>
          <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 italic tracking-[0.1em] mb-1">{c.label}</p>
          <h4 className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">{c.val}</h4>
        </GlassCard>
      ))}
    </div>
  );
};

// --- INVESTOR MODULES ---

export const ExternalDashboard: React.FC = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const projects = useStore((state: any) => state.projects);
  const role = currentUser?.role?.toLowerCase() || '';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Portfolio Overview</h1>
          <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">Welcome back, {currentUser?.name}</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
             currentUser?.kycVerified ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
           }`}>
              {currentUser?.kycVerified ? 'KYC Verified' : 'KYC Pending Review'}
           </div>
           <Calendar size={18} className="text-slate-300 dark:text-slate-600 mx-2" />
        </div>
      </div>

      <DashboardCards role={role} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-4">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 italic">Available Catalog (v3.1)</h3>
             <button className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 hover:tracking-[0.2em] transition-all">Explore Marketplace</button>
          </div>
          <div className="space-y-4">
             {/* Mocking sub-node expansion based on v3.1 Patch Notes */}
             {[
               { parent: 'Lumbung Pangan Berkah', title: 'Pabrik Penggilingan (Tahap 2)', status: 'healthy', openForWaqf: true, target: 'Rp 500M' },
               { parent: 'Logistik Pantura Express', title: 'Armada Truk Dingin', status: 'at_risk', openForWaqf: false, target: 'Rp 200M' },
               ...projects.slice(0, 1).map((p:any) => ({ parent: 'Root Node', title: p.title, status: p.status, openForWaqf: true, target: 'Multy' }))
             ].map((p: any, idx: number) => (
              <GlassCard key={idx} className="p-6 flex justify-between items-center hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer group bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center font-black italic text-xl">
                      {p.title[0]}
                   </div>
                   <div>
                      <h4 className="text-sm font-black italic text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase">{p.title}</h4>
                      <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Context: {p.parent} › {p.title}</p>
                   </div>
                </div>
                <div className="flex items-center gap-10">
                   <div className="text-right hidden md:block">
                      <p className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-600 mb-1">Status</p>
                      <StatusIndicator status={p.status as any} />
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-600 mb-1">Target</p>
                      <p className="text-xs font-black italic text-emerald-600 dark:text-emerald-400">{p.target}</p>
                   </div>
                   <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <GlassCard className="p-8 bg-slate-900 text-white border-0 shadow-2xl shadow-blue-500/20">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic opacity-50">Quick Actions</h5>
              <div className="space-y-3">
                 <button className="w-full py-4 bg-white/10 hover:bg-white text-[10px] font-black uppercase tracking-widest text-white hover:text-slate-900 rounded-2xl transition-all flex items-center justify-center gap-3">
                    <Download size={16} /> Tax Certificate
                 </button>
                 <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-[10px] font-black uppercase tracking-widest text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-3 border-0">
                    <PlusSquare size={16} /> New Contribution
                 </button>
              </div>
           </GlassCard>

           <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 italic text-slate-400 dark:text-slate-500">Impact Metrics</h5>
              <div className="space-y-8">
                {[
                  { label: 'CO2 Offset', val: '42.4 Tons', color: 'bg-emerald-500' },
                  { label: 'Jobs Created', val: '128 Persons', color: 'bg-blue-500' },
                  { label: 'Farmers Enabled', val: '14 Groups', color: 'bg-amber-500' }
                ].map((m, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <p className="text-[9px] font-black uppercase tracking-tight text-slate-600 dark:text-slate-400">{m.label}</p>
                       <p className="text-xs font-black italic text-slate-900 dark:text-white">{m.val}</p>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${m.color} rounded-full`} style={{ width: `${30 + i * 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export const InvestmentPortfolio: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase px-2">Investment Ledger</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 ml-2">Total ROI: +18.4% All Time</p>
        </div>
        <div className="flex gap-2">
           <button className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Filter size={14} /> Filter</button>
           <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Export XLSX</button>
        </div>
      </div>

       <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
          <table className="w-full text-left">
             <thead>
                <tr className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase italic tracking-[0.2em]">
                   <th className="p-8">Asset Description</th>
                   <th className="p-8">Entry Date</th>
                   <th className="p-8">Initial Cap</th>
                   <th className="p-8">Current Value</th>
                   <th className="p-8">Yield</th>
                </tr>
             </thead>
             <tbody className="text-[10px] font-bold text-slate-600">
                {[
                   { name: 'Micro-Credit (Agricultural)', date: '12 Jan 2026', initial: 'Rp 10.000.000', current: 'Rp 10.820.000', yield: '+8.2%' },
                   { name: 'Shared Logistics Hub', date: '04 Feb 2026', initial: 'Rp 50.000.000', current: 'Rp 52.400.000', yield: '+4.8%' },
                   { name: 'Eco-Tourism Cluster B', date: '21 Mar 2026', initial: 'Rp 25.000.000', current: 'Rp 25.000.000', yield: '0.0%' },
                ].map((row, i) => (
                   <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-400">
                      <td className="p-8 text-slate-900 dark:text-white font-black italic uppercase">{row.name}</td>
                      <td className="p-8 italic">{row.date}</td>
                      <td className="p-8">{row.initial}</td>
                      <td className="p-8 text-slate-900 dark:text-white font-black">{row.current}</td>
                      <td className="p-8">
                         <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black italic">{row.yield}</span>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

// --- WAQIF / DONOR MODULES ---

export const DonationTracking: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex justify-between items-center px-2">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-indigo-600">Philanthropy Dashboard</h2>
          <div className="flex items-center gap-10">
             <div className="text-right">
                <p className="text-[8px] font-black uppercase text-slate-400">Lifetime Impact</p>
                <p className="text-lg font-black italic text-indigo-600">Rp 124.500.000</p>
             </div>
             <ShieldCheck size={32} className="text-indigo-200" />
          </div>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-10 border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/10 dark:bg-indigo-900/10">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-indigo-400">Impact Utilization Flow</h4>
             <div className="relative pt-2">
                <div className="absolute left-[3px] top-6 bottom-4 w-0.5 bg-indigo-100" />
                <div className="space-y-10">
                  {[
                    { title: 'Project Kick-off', desc: 'Dana Wakaf telah disalurkan ke Nazir', date: '12 April 2026', done: true },
                    { title: 'Asset Acquisition', desc: 'Pembelian bibit unggul & alat tani', date: '15 April 2026', done: true },
                    { title: 'Productive Stage', desc: 'Memasuki tahap penanaman intensif', date: 'Pending', done: false }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-6 relative">
                       <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${s.done ? 'bg-indigo-600 shadow-lg shadow-indigo-400' : 'bg-slate-200'}`} />
                       <div>
                          <p className={`text-xs font-black italic ${s.done ? 'text-indigo-900' : 'text-slate-400'}`}>{s.title}</p>
                          <p className="text-[9px] font-bold text-slate-500 mt-1">{s.desc}</p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-indigo-400 mt-3">{s.date}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </GlassCard>

          <div className="space-y-6">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] px-4 text-slate-400">Available Certificates</h4>
             {[
               { title: 'Waqf Certificate - Building Foundation', date: 'issued: 14/03/26', id: 'WQF-9921-X' },
               { title: 'Zakat Tax Receipt - FY 2025', date: 'issued: 02/01/26', id: 'ZKT-4412-B' }
             ].map((cert, i) => (
               <GlassCard key={i} className="p-6 group hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-white transition-all bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-white/10 text-slate-400 dark:text-slate-500 group-hover:text-white">
                           <FileText size={20} />
                        </div>
                        <div>
                           <h6 className="text-[10px] font-black uppercase italic">{cert.title}</h6>
                           <p className="text-[8px] font-bold opacity-50 uppercase tracking-widest mt-1">{cert.id} • {cert.date}</p>
                        </div>
                     </div>
                     <button className="p-2 rounded-lg bg-slate-100 group-hover:bg-white text-slate-400 group-hover:text-slate-900 transition-all">
                        <Download size={14} />
                     </button>
                  </div>
               </GlassCard>
             ))}
             <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[9px] font-black uppercase text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                Download Annual Report Package (PDF)
             </button>
          </div>
       </div>
    </div>
  );
};

// --- MUSTAHIQ (BENEFICIARY) MODULES ---

export const BeneficiaryView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
       <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-emerald-600">Recipient Support Center</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Beneficiary ID: ACO-B-11242</p>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-10 border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900/50">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-emerald-600 dark:text-emerald-400 italic">Distribution Status</h4>
             <div className="space-y-8">
               {[
                 { label: 'Active Program', val: 'Beasiswa Pendidikan Menengah', s: 'Active' },
                 { label: 'Monthly Disbursement', val: 'Rp 750.000', s: 'Upcoming (25 April)' },
                 { label: 'Duration', val: '18 Months Remaining', s: 'Cycle 6 of 24' }
               ].map((item, i) => (
                 <div key={i}>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-black italic text-slate-900 uppercase">{item.val}</p>
                    <p className="text-[9px] font-bold text-emerald-600 mt-2 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {item.s}
                    </p>
                 </div>
               ))}
             </div>
          </GlassCard>

          <GlassCard className="p-10 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-slate-400 dark:text-slate-500 italic">Message from Nazir</h4>
             <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 italic text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                "Saudara [Mustahiq Name], penyaluran bulan ini akan difokuskan pada pengadaan buku teks semester genap. Pastikan kartu tanda penerima dalam kondisi baik untuk proses validasi fisik di kantor cabang terdekat."
                <div className="mt-6 flex items-center gap-3 not-italic">
                   <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[8px] font-black italic uppercase">N</div>
                   <div>
                      <p className="text-[9px] font-black uppercase">Tim Nazir ACO</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase">Supervisory Force</p>
                   </div>
                </div>
             </div>
          </GlassCard>
       </div>
    </div>
  );
};

// --- PROJECT OWNER VIEW ---

export const ProjectOwnerView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex justify-between items-end">
          <div>
             <h2 className="text-3xl font-black italic tracking-tighter uppercase">My Supervised Nodes</h2>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational ID: STAFF-A-412</p>
          </div>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all">
             <Activity size={16} /> Submit Daily Report
          </button>
       </div>

       <div className="grid grid-cols-3 gap-6">
          <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
             <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">Node Occupancy</p>
             <h4 className="text-2xl font-black italic text-slate-900 dark:text-white">84.2%</h4>
          </GlassCard>
          <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
             <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">Health Score</p>
             <h4 className="text-2xl font-black italic text-emerald-600 dark:text-emerald-400">EXCELLENT</h4>
          </GlassCard>
          <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
             <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">Yield Contribution</p>
             <h4 className="text-2xl font-black italic text-slate-900 dark:text-white">Rp 4.2M/mo</h4>
          </GlassCard>
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
             <h5 className="text-[10px] font-black uppercase tracking-[0.2em] italic">Active Sub-Nodes</h5>
             <div className="flex gap-4">
                <Search size={16} className="text-slate-300" />
                <Filter size={16} className="text-slate-300" />
             </div>
          </div>
          <div className="p-8 space-y-4">
             {[
               { name: 'Node 4-A: Warehouse Alpha', s: 'Operational', yield: '+12.4%' },
               { name: 'Node 4-B: Fleet Logistics', s: 'Maintenance', yield: 'N/A' },
               { name: 'Node 4-C: Sorting Center', s: 'Operational', yield: '+8.1%' }
             ].map((node, i) => (
               <div key={i} className="flex justify-between items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center text-[10px] font-black italic uppercase">{node.name.split(':')[0]}</div>
                     <div>
                        <p className="text-sm font-black italic uppercase tracking-tight text-slate-900 dark:text-white">{node.name.split(':')[1]}</p>
                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{node.name.split(':')[0]}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-10">
                     <div className="text-right">
                        <p className="text-[8px] font-black uppercase text-slate-300 mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${node.s === 'Operational' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{node.s}</span>
                     </div>
                     <div className="text-right">
                        <p className="text-[8px] font-black uppercase text-slate-300 mb-1">Yield Contrib</p>
                        <p className="text-xs font-black italic">{node.yield}</p>
                     </div>
                     <button className="text-[9px] font-black uppercase text-blue-600 tracking-widest">Manage</button>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};
