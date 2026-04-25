import React from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { MonitoringChart } from './MonitoringChart';
import { ChevronRight, Filter, Search, Download, ShieldCheck, UserPlus, Clock, Activity, AlertCircle, Percent, RefreshCw, FileText, File, History, XCircle, PlusSquare, Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';

// --- ARIEF: INVESTMENT OFFICER ---

export const ProjectsList: React.FC = () => {
  const projects = useStore((state: any) => state.projects);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-72">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500" />
          <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl text-xs outline-none text-slate-900 dark:text-white dark:placeholder-slate-500" placeholder="Search projects..." />
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Filter size={18} /></button>
          <button className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Expand All</button>
        </div>
      </div>
      
      <div className="space-y-4">
        {projects.map((p: any) => (
          <div key={p.id} className="space-y-2">
            <GlassCard 
              className={`p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer group bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 ${expandedId === p.id ? 'border-blue-500 shadow-lg shadow-blue-500/10' : ''}`}
              onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black italic">
                    {p.title[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black italic text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{p.category} | Root Project</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-0.5">Total RAB</p>
                    <p className="text-xs font-black italic text-slate-900 dark:text-white">Rp {p.targetAmount?.toLocaleString() || '0'}</p>
                  </div>
                  <StatusIndicator status={p.status} />
                  <ChevronRight size={18} className={`text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all ${expandedId === p.id ? 'rotate-90 text-blue-500' : ''}`} />
                </div>
              </div>
            </GlassCard>
            
            {expandedId === p.id && (
              <div className="pl-12 space-y-3 animate-in slide-in-from-top-4 fade-in duration-300">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <p className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-300 italic">Sub-Project Node {i}</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">RAB: Rp 45.000.000</p>
                       <button className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest opacity-0 group-hover:opacity-100 transition-all">View Detail</button>
                    </div>
                  </div>
                ))}
                <button className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2">
                   <PlusSquare size={14} /> Add Sub-Node
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SINTA: PORTFOLIO MONITOR ---

export const MonitoringDashboard: React.FC = () => {
  const projects = useStore((state: any) => state.projects);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Projects', val: '24', color: 'text-blue-600' },
          { label: 'Recent Updates', val: '156', color: 'text-emerald-600' },
          { label: 'Overdue Reports', val: '3', color: 'text-red-500' },
          { label: 'Need Review', val: '12', color: 'text-amber-500' }
        ].map((s, i) => (
          <GlassCard key={i} className="p-6 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <p className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">{s.label}</p>
            <p className={`text-2xl font-black italic ${s.color}`}>{s.val}</p>
            <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 mt-4 rounded-full overflow-hidden">
               <div className={`h-full bg-current ${s.color}`} style={{ width: '60%' }} />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.slice(0, 2).map((p: any) => (
          <GlassCard key={p.id} className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-black italic">{p.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Health Metric Analysis</p>
              </div>
              <StatusIndicator status={p.status} />
            </div>
            <div className="h-48">
              <MonitoringChart data={p.reports} color={p.status === 'at_risk' ? '#f59e0b' : '#2563eb'} />
            </div>
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Last updated: 2h ago</span>
              </div>
              <button className="text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all">Deep Dive</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export const UpdateQueue: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">Update Queue</h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Pending Review: 8 Projects</p>
        </div>
        <button className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Verify Batch</button>
      </div>

      <div className="space-y-4">
        {[
          { project: 'Lumbung Pangan Berkah', type: 'RAB Update', time: '10m ago', status: 'Priority' },
          { project: 'Logistik Pantura Express', type: 'Health Monitor', time: '2h ago', status: 'Standard' },
          { project: 'Pemberdayaan Lele Bioflok', type: 'Document Upload', time: '5h ago', status: 'Standard' },
        ].map((item, i) => (
          <GlassCard key={i} className="p-6 flex justify-between items-center hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Activity size={18} /></div>
               <div>
                  <h4 className="text-sm font-black italic text-slate-900 dark:text-white">{item.project}</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{item.type} • {item.time}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <span className={`text-[8px] font-black px-2 py-1 rounded-lg ${item.status === 'Priority' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-300'}`}>{item.status}</span>
               <button className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest hover:tracking-[0.2em] transition-all">Review</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export const OverdueReports: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight uppercase text-red-600">Overdue Criticals</h2>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">High Risk: 3 Projects</p>
        </div>
        <button className="px-6 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">Send Final Warning</button>
      </div>

      <div className="space-y-4">
        {[
          { project: 'Tanah Wakaf Cipayung', days: '14 Days Overdue', severity: 'Critical' },
          { project: 'UMKM Kerajinan Bambu', days: '5 Days Overdue', severity: 'Warning' },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="flex justify-between items-center">
               <div>
                  <h4 className="text-xl font-black italic text-slate-900 dark:text-white">{item.project}</h4>
                  <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mt-1">{item.days}</p>
               </div>
               <button className="px-6 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic group-hover:bg-red-600 transition-all">Escalate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HENDRA: FINANCE OFFICER ---

export const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Investment Fund', amount: '8.4B', color: 'bg-blue-600' },
          { label: 'Zakat Pool', amount: '1.2B', color: 'bg-emerald-600' },
          { label: 'Infaq & Social', amount: '450M', color: 'bg-amber-500' },
          { label: 'Waqf Treasury', amount: '2.4B', color: 'bg-indigo-600' }
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${f.color}`} />
            <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic tracking-widest">{f.label}</p>
            <h4 className="text-2xl font-black italic leading-none text-slate-900 dark:text-white">Rp {f.amount}</h4>
            <p className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 mt-3 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> +2.4% vs last month
            </p>
          </div>
        ))}
      </div>

      <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
         <div className="flex justify-between items-center mb-10">
            <h5 className="text-[10px] font-black uppercase tracking-widest italic leading-none text-slate-900 dark:text-white">Treasury Allocation</h5>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors">
               <Download size={14} /> Export Report
            </button>
         </div>
         <div className="space-y-8">
            {[
               { name: 'Infrastructure Development', active: 65, total: '2.4B' },
               { name: 'Micro-Education Loans', active: 42, total: '890M' },
               { name: 'Agricultural Waqf', active: 88, total: '1.2B' }
            ].map((p, i) => (
               <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-tight text-slate-900 dark:text-slate-300">{p.name}</p>
                        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500">Target Realization: {p.active}%</p>
                     </div>
                     <span className="text-xs font-black italic text-slate-900 dark:text-white">Rp {p.total}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.active}%` }} />
                  </div>
               </div>
            ))}
         </div>
      </GlassCard>
    </div>
  );
};

export const ReviewQueue: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black italic tracking-tight uppercase text-blue-600">Financial Review</h2>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase">Approved: 124</div>
           <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black uppercase">Pending: 12</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase italic tracking-widest">
                  <th className="p-6">Entity</th>
                  <th className="p-6">Amount</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Action</th>
               </tr>
            </thead>
            <tbody className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
               {[
                  { name: 'Investasi - Bpk. Agus', amount: 'Rp 25.000.000', cat: 'Investment' },
                  { name: 'Wakaf - Ibu Siti', amount: 'Rp 10.000.000', cat: 'Waqf' },
                  { name: 'Infaq Digital', amount: 'Rp 2.500.000', cat: 'Infaq' },
               ].map((tr, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                     <td className="p-6">{tr.name}</td>
                     <td className="p-6 font-black italic text-slate-900 dark:text-white">{tr.amount}</td>
                     <td className="p-6 uppercase italic text-blue-600 dark:text-blue-400">{tr.cat}</td>
                     <td className="p-6">
                        <button className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest hover:text-blue-900 dark:hover:text-blue-300 transition-colors">Authorize</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export const ProfitSharing: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight text-emerald-600 uppercase">Profit Distribution Engine</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Calculation Ready</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Execute Payout</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">Basis Profit (NET)</p>
          <h4 className="text-2xl font-black italic text-slate-900 dark:text-white">Rp 450.000.000</h4>
        </GlassCard>
        <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">ACO Fee (2%)</p>
          <h4 className="text-2xl font-black italic text-slate-900 dark:text-white">Rp 9.000.000</h4>
        </GlassCard>
        <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic">Investor Pool</p>
          <h4 className="text-2xl font-black italic text-slate-900 dark:text-white">Rp 441.000.000</h4>
        </GlassCard>
      </div>

      <GlassCard className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
        <h5 className="text-[10px] font-black uppercase tracking-widest italic mb-6 text-slate-900 dark:text-white">Distribution Breakdown</h5>
        <div className="space-y-4">
          {[
            { tag: 'INV-001', name: 'Micro-Funding Alpha', amount: 'Rp 120.000.000', share: '27.2%' },
            { tag: 'INV-002', name: 'Logistics Expansion', amount: 'Rp 280.000.000', share: '63.5%' },
            { tag: 'INV-003', name: 'Social Impact Fund', amount: 'Rp 41.000.000', share: '9.3%' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">{item.tag}</p>
                <p className="text-sm font-black italic text-slate-900 dark:text-slate-200">{item.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 dark:text-white">{item.amount}</p>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Share: {item.share}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export const Reconciliation: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight uppercase text-indigo-600">Audit & Reconciliation</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Variance detected: 0.02% (Within limit)</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Filter size={14} /> Filter Source
          </button>
          <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Verify All</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 dark:bg-slate-800 text-white italic text-[10px] font-black uppercase tracking-widest">
              <th className="p-6">Transaction Node</th>
              <th className="p-6">Projected (RAB)</th>
              <th className="p-6">Realized</th>
              <th className="p-6">Variance</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
            {[
              { node: 'Building Foundation A', rab: 'Rp 450M', real: 'Rp 452M', var: '+Rp 2M', status: 'Warning' },
              { node: 'Fleet Maintenance Q2', rab: 'Rp 120M', real: 'Rp 118M', var: '-Rp 2M', status: 'Healthy' },
              { node: 'IT Infrastructure', rab: 'Rp 85M', real: 'Rp 85M', var: 'Rp 0', status: 'Healthy' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                <td className="p-6 text-slate-900 dark:text-white">{row.node}</td>
                <td className="p-6">{row.rab}</td>
                <td className="p-6">{row.real}</td>
                <td className="p-6 font-black italic text-slate-900 dark:text-white">{row.var}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                    row.status === 'Healthy' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FinancialReports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
       <div>
          <h2 className="text-3xl font-black italic tracking-tight uppercase text-slate-800 dark:text-slate-100">Master Reports</h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Generated daily at 00:00 UTC</p>
       </div>

       <div className="grid grid-cols-2 gap-6">
          {[
             { title: 'Consolidated Ledger Q1', date: 'April 2026', size: '2.4 MB' },
             { title: 'Tax Impact Analysis', date: 'March 2026', size: '1.1 MB' },
             { title: 'Waqf Productivity Rpt', date: 'April 2026', size: '4.8 MB' },
             { title: 'ZIS Distribution Log', date: 'Feb 2026', size: '0.9 MB' },
          ].map((rpt, i) => (
             <GlassCard key={i} className="p-8 group hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-white transition-all bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-white/10 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-white mb-6">
                      <Download size={24} />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-[0.2em] italic text-slate-500 group-hover:text-slate-400">PDF/XLS</span>
                </div>
                <h4 className="text-lg font-black italic mb-2 text-slate-900 dark:text-white group-hover:text-white">{rpt.title}</h4>
                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 group-hover:border-white/10 mt-6">
                   <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-blue-200">{rpt.date}</p>
                   <p className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 group-hover:text-white">{rpt.size}</p>
                </div>
             </GlassCard>
          ))}
       </div>
    </div>
  );
};

// --- REZA: ADMIN ---

export const KYCQueue: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight uppercase text-blue-600">Identity Authority</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Awaiting Verification: 42 Profiles</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest"><Filter size={14} /></button>
           <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Auto-Verify Enabled</button>
        </div>
      </div>

       <div className="grid gap-4">
          {[
             { name: 'Dr. Michael Chen', country: 'Singapore', status: 'Enhanced Due Diligence' },
             { name: 'Ahmad Fauzi', country: 'Indonesia', status: 'Standard' },
             { name: 'Jessica Miller', country: 'USA', status: 'Enhanced Due Diligence' },
          ].map((u, i) => (
             <GlassCard key={i} className="p-6 flex justify-between items-center bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black italic text-slate-400 dark:text-slate-500">MC</div>
                   <div>
                      <h4 className="text-sm font-black italic text-slate-900 dark:text-white">{u.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{u.country} | CID-{Math.floor(Math.random() * 9000) + 1000}</p>
                   </div>
                </div>
                <div className="text-right flex items-center gap-6">
                   <span className="text-[8px] font-black uppercase px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">{u.status}</span>
                   <button className="px-6 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-[1rem] text-[9px] font-black uppercase tracking-widest italic hover:scale-105 transition-all">Review Docs</button>
                </div>
             </GlassCard>
          ))}
       </div>
    </div>
  );
};

export const DocumentQueue: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div>
          <h2 className="text-3xl font-black italic tracking-tight uppercase text-amber-600">Project Validation</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pending Validation: 125 Docs</p>
       </div>

       <div className="space-y-3">
          {[
             { file: 'SHM_Lot_A_11.pdf', proj: 'Tanah Wakaf Cipayung', type: 'Legal', uploader: 'Arief W.' },
             { file: 'RAB_Final_v2.xlsx', proj: 'Lumbung Pangan', type: 'Financial', uploader: 'Arief W.' },
          ].map((doc, i) => (
             <div key={i} className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black italic">!</div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-500">{doc.proj}</p>
                      <h4 className="text-sm font-bold italic text-slate-900 dark:text-white">{doc.file}</h4>
                   </div>
                </div>
                <div className="text-right flex items-center gap-8">
                   <div>
                      <p className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500">Uploader</p>
                      <p className="text-[10px] font-bold text-slate-900 dark:text-slate-300">{doc.uploader}</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"><XCircle size={16} /></button>
                      <button className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><ShieldCheck size={16} /></button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export const AuditLog: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black italic tracking-tight uppercase">System Audit Log</h2>
          <button className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 hover:text-blue-600 transition-colors">
             <Download size={16} /> Archive Logs
          </button>
       </div>

       <GlassCard className="p-0 overflow-hidden bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
          <div className="p-6 bg-slate-900 dark:bg-slate-950 text-slate-400 font-mono text-[10px] flex justify-between uppercase tracking-widest font-black italic">
             <span>Timestamp</span>
             <span>Action</span>
             <span>Security Hash</span>
          </div>
          <div className="p-8 space-y-4 font-mono text-[10px] text-slate-900 dark:text-slate-300">
             {[
                { time: '16:04:12', user: 'Hendra G.', act: 'Authorized Transaction TRX-9921', hash: 'e3b0c442...' },
                { time: '15:58:33', user: 'Admin System', act: 'Scheduled Database Backup', hash: 'd41d8cd9...' },
                { time: '15:45:01', user: 'Reza Admin', act: 'Rejected KYC Profile SID-004', hash: '811f5926...' },
                { time: '15:30:12', user: 'Arief W.', act: 'Created Project Node "Phase 2"', hash: '098f6bcd...' },
             ].map((log, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/50 pb-4 last:border-0 last:pb-0">
                   <div className="flex gap-6">
                      <span className="text-blue-600 dark:text-blue-400 font-black">{log.time}</span>
                      <span className="text-slate-900 dark:text-white font-black uppercase italic">[{log.user}]</span>
                      <span className="text-slate-500 dark:text-slate-400">{log.act}</span>
                   </div>
                   <span className="text-slate-400 dark:text-slate-500 opacity-50">{log.hash}</span>
                </div>
             ))}
          </div>
       </GlassCard>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
         <div>
            <h4 className="text-2xl font-black italic tracking-tight uppercase">Internal Authority</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Active Personas: 12</p>
         </div>
         <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center gap-2 hover:bg-blue-500 transition-all">
            <UserPlus size={16} /> Invite Executive
         </button>
      </div>

       <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
          <table className="w-full text-left">
             <thead>
                <tr className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase italic tracking-widest">
                   <th className="p-6">Name</th>
                   <th className="p-6">Role</th>
                   <th className="p-6">Status</th>
                   <th className="p-6">Permissions</th>
                </tr>
             </thead>
             <tbody className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                {[
                   { name: 'Arief Wijaksana', role: 'Investment Officer', s: 'Active' },
                   { name: 'Sinta K. Monitoring', role: 'Portfolio Monitor', s: 'Active' },
                   { name: 'Hendra G. Finance', role: 'Finance Officer', s: 'Active' },
                   { name: 'Reza Admin', role: 'Super Admin', s: 'Active' },
                ].map((u, i) => (
                   <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                      <td className="p-6 text-slate-900 dark:text-white">{u.name}</td>
                      <td className="p-6 uppercase italic text-blue-600 dark:text-blue-400">{u.role}</td>
                      <td className="p-6"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2" />{u.s}</td>
                      <td className="p-6">
                        <div className="flex gap-2">
                           <button className="text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all"><Settings size={14} /></button>
                           <button className="text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-all"><XCircle size={14} /></button>
                        </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
