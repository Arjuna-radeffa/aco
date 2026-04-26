import React, { useState } from 'react';
import { GlassCard } from '../atoms/GlassCard';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { MonitoringChart } from './MonitoringChart';
import { 
  Search, Filter, Activity, Clock, Percent, PlusSquare, 
  ChevronRight, RefreshCw, XCircle, Save, AlertCircle, Trash2, Shield, UserPlus,
  ArrowRight, Download, Eye, FileText, CheckCircle, Menu, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

// === HELPER COMPONENTS ===

const ProjectTreeNode: React.FC<{ project: any; level?: number; globalExpand?: boolean }> = ({ project, level = 0, globalExpand }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = project.children && project.children.length > 0;

  React.useEffect(() => {
    if (globalExpand !== undefined) {
      setIsExpanded(globalExpand);
    }
  }, [globalExpand]);

  return (
    <div className="space-y-2" style={{ marginLeft: `${level * 2}rem` }}>
      <div className="relative">
        <GlassCard 
          className={`p-5 hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer group bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 relative ${isExpanded && hasChildren ? 'border-blue-500 shadow-lg shadow-blue-500/5' : ''}`}
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
          {level > 0 && (
            <div className="absolute -left-6 top-1/2 w-6 h-[2px] bg-slate-200 dark:bg-slate-800" />
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black italic shadow-sm transition-colors ${
                level === 0 
                  ? 'bg-blue-600 text-white shadow-blue-200' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:text-blue-500'
              }`}>
                {project.title[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black italic text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h4>
                  {hasChildren && (
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-[8px] font-black text-blue-600 dark:text-blue-400 rounded-lg">
                      {project.children.length} NODES
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                  {project.category} {level === 0 ? '• CORE ROOT' : `• SUB-NODE L${level}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-0.5 tracking-widest">Allocation</p>
                <div className="flex items-center gap-2">
                   <div className="flex -space-x-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   </div>
                   <p className="text-[10px] font-black italic text-slate-900 dark:text-white">{project.metadata?.allocation?.commercial ?? 100}%/{project.metadata?.allocation?.social ?? 0}%</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-0.5 tracking-widest">RAB Value</p>
                <p className="text-xs font-black italic text-slate-900 dark:text-white">Rp {project.targetFunding?.toLocaleString() || '0'}</p>
              </div>

              <StatusIndicator status={project.currentFunding >= project.targetFunding ? 'healthy' : 'at_risk'} />
              
              {hasChildren && (
                <ChevronRight size={18} className={`text-slate-300 dark:text-slate-600 transition-all ${isExpanded ? 'rotate-90 text-blue-500' : ''}`} />
              )}
              
              {!hasChildren && (
                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-blue-600">
                  <Settings size={16} />
                </button>
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {hasChildren && isExpanded && (
        <div className="relative">
          <div className="absolute left-[1.25rem] top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800/50" />
          <div className="space-y-4 pt-2">
            {project.children.map((child: any) => (
              <ProjectTreeNode key={child.id} project={child} level={level + 1} globalExpand={globalExpand} />
            ))}
            <div style={{ marginLeft: `${(level + 1) * 2}rem` }}>
              <button className="w-full p-4 border-2 border-dashed border-slate-100 dark:border-slate-800/80 rounded-2xl text-[9px] font-black uppercase text-slate-300 dark:text-slate-600 hover:border-blue-300 dark:hover:border-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-3 group/add">
                <PlusSquare size={16} className="group-hover/add:scale-110 transition-transform" /> 
                Add New Sub-Project Node
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// === MODULES BY ROLE ===

// --- ARIEF: INVESTMENT OFFICER ---
export const ProjectsList: React.FC = () => {
  const projects = useStore((state: any) => state.projects);
  const [isAllExpanded, setIsAllExpanded] = useState<boolean | undefined>(undefined);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900/50 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase inline-flex items-center gap-4">
            Project Tree <span className="text-blue-600">Context</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">Hierarchical Management System v1.2</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500" />
            <input className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-bold outline-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner" placeholder="Search across nodes..." />
          </div>
          <button className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-all"><Filter size={20} /></button>
          <button 
            onClick={() => setIsAllExpanded(isAllExpanded === true ? false : true)}
            className="px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            {isAllExpanded === true ? 'Collapse All' : 'Expand Global'}
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {projects.map((p: any) => (
          <ProjectTreeNode key={p.id} project={p} globalExpand={isAllExpanded} />
        ))}
      </div>
    </div>
  );
};

// --- SINTA: PORTFOLIO MONITOR ---
export const MonitoringDashboard: React.FC = () => {
  const projects = useStore((state: any) => state.projects);
  
  const stats = [
    { label: 'Active Nodes', val: '42', color: 'text-blue-600', trend: '+12%' },
    { label: 'Avg Node Health', val: '94%', color: 'text-emerald-600', trend: 'Stable' },
    { label: 'Critical Variance', val: '3', color: 'text-red-500', trend: '+1' },
    { label: 'Review Latency', val: '1.2h', color: 'text-amber-500', trend: '-15%' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase inline-flex items-center gap-4">
            Health <span className="text-emerald-600">Surveillance</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">P-PM-01 Portfolio Monitoring v2.0</p>
        </div>
        <button className="px-8 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all">
          <Activity size={16} /> Live Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <GlassCard key={i} className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full group-hover:scale-110 transition-transform" />
            <p className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 italic tracking-widest relative z-10">{s.label}</p>
            <div className="flex items-end gap-3 relative z-10">
              <h4 className={`text-3xl font-black italic leading-none ${s.color}`}>{s.val}</h4>
              <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg text-slate-500">{s.trend}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((p: any) => (
          <GlassCard key={p.id} className="p-10 space-y-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 group hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black italic text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors uppercase">{p.title}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">{p.category} • {p.children?.length || 0} Sub-Nodes Linked</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusIndicator status={p.status || 'healthy'} />
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Aggregate Score: 98/100</span>
              </div>
            </div>
            <div className="h-40">
              <MonitoringChart data={p.reports || []} color={p.status === 'at_risk' ? '#f59e0b' : '#10b981'} />
            </div>
            <div className="pt-4 flex justify-between items-center">
              <button className="px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2">
                Node Analytics <ChevronRight size={14} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export const UpdateQueue: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">Update <span className="text-blue-600">Delta</span></h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 italic">Pending Review: 8 Revision Requests</p>
        </div>
      </div>
      <div className="space-y-6">
        {[
          { project: 'Lumbung Pangan Berkah', type: 'Financial Revision', delta: { old: 'Rp 450M', new: 'Rp 520M', icon: <Percent size={18} /> } },
        ].map((item, i) => (
          <GlassCard key={i} className="p-8 flex items-center justify-between bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">{item.delta.icon}</div>
              <div>
                <h4 className="text-lg font-black italic text-slate-900 dark:text-white uppercase">{item.project}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400 line-through">{item.delta.old}</span>
              <ArrowRight size={16} className="text-slate-300" />
              <span className="text-sm font-black text-blue-600">{item.delta.new}</span>
              <button className="ml-6 px-6 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Approve</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export const OverdueReports: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter text-red-600 uppercase">Emergency <span className="text-slate-900 dark:text-white">Watch</span></h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 italic">3 Overdue Reports Detected</p>
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <GlassCard key={i} className="p-8 flex items-center justify-between bg-white dark:bg-slate-900/50 border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center"><AlertCircle size={24} /></div>
              <div>
                <h4 className="text-lg font-black italic text-slate-900 dark:text-white uppercase tracking-tight">Project Node High Risk #{i}</h4>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Lapsed: 4 Days Overdue</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Issue Warning</button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// --- HENDRA: FINANCE OFFICER ---
export const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase inline-flex items-center gap-4">
            Treasury <span className="text-indigo-600">Command</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">P-FO-01 Master Treasury Engine v3.0</p>
        </div>
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20">Withdrawal Request</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Investment Pool', amount: '8.45B', color: 'bg-blue-600' },
          { label: 'Zakat/Social', amount: '1.22B', color: 'bg-emerald-600' },
          { label: 'Waqf Treasury', amount: '2.40B', color: 'bg-amber-600' },
          { label: 'Operational', amount: '450M', color: 'bg-slate-900' }
        ].map((f, i) => (
          <GlassCard key={i} className="p-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <p className="text-[9px] font-black uppercase text-slate-400 mb-2 italic tracking-widest">{f.label}</p>
            <h4 className="text-3xl font-black italic text-slate-900 dark:text-white mb-2 leading-none">Rp {f.amount}</h4>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export const ProfitSharing: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter text-emerald-600 uppercase inline-flex items-center gap-4">
            Profit <span className="text-slate-900 dark:text-white">Synthesizer</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">P-FO-04 Automated Distribution Engine</p>
        </div>
        <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">Execute Batch Payout</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="p-10 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-4 italic tracking-widest">Gross Yield Pool</p>
          <h4 className="text-4xl font-black italic text-slate-900 dark:text-white underline decoration-emerald-500 decoration-4 underline-offset-8">Rp 450.0M</h4>
        </GlassCard>
        <GlassCard className="p-10 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-4 italic tracking-widest">ACO Engine Fee (2%)</p>
          <h4 className="text-4xl font-black italic text-slate-900 dark:text-white underline decoration-blue-500 decoration-4 underline-offset-8">Rp 9.0M</h4>
        </GlassCard>
        <GlassCard className="p-10 bg-emerald-600 text-white shadow-2xl text-center relative overflow-hidden">
          <p className="text-[10px] font-black uppercase text-emerald-200 mb-4 italic tracking-widest relative z-10">Net Distributable</p>
          <h4 className="text-4xl font-black italic relative z-10 leading-none">Rp 441.0M</h4>
        </GlassCard>
      </div>
    </div>
  );
};

// --- REZA: ADMIN ---
export const AdminAuditLog: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase inline-flex items-center gap-4">
            Security <span className="text-red-600">Nexus</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">P-ADM-01 Master Audit & Governance v4.0</p>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { user: 'Hendra (Finance)', action: 'Profit Executed', target: 'Batch #901', time: '2m ago', risk: 'Elevated' },
          { user: 'Sinta (Portfolio)', action: 'Approved Delta', target: 'Lumbung Pangan', time: '12m ago', risk: 'Standard' },
          { user: 'System Context', action: 'Auth Failure', target: 'IP 192.168.1.104', time: '2h ago', risk: 'Critical' },
        ].map((log, i) => (
          <div key={i} className="flex items-center justify-between p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-red-500 transition-all group overflow-hidden relative shadow-sm">
             <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${log.risk === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                   {log.risk === 'Critical' ? <Shield size={24} /> : <FileText size={24} />}
                </div>
                <div>
                   <h4 className="text-lg font-black italic text-slate-900 dark:text-white uppercase">{log.user} • {log.action}</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.target} • {log.time}</p>
                </div>
             </div>
             <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${log.risk === 'Critical' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{log.risk} RISK</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">Identity <span className="text-blue-600">Vault</span></h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 italic">Internal Staff Access Control</p>
        </div>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center gap-3">
          <UserPlus size={18} /> Provision New Staff
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {[
          { name: 'Arief Kurniawan', role: 'Investment Officer', bio: 'Specializing in Productive Waqf architecture.', nodes: 12 },
          { name: 'Sinta Permata', role: 'Portfolio Monitor', bio: 'Risk mitigation and health surveillance.', nodes: 45 },
          { name: 'Hendra Wijaya', role: 'Finance Officer', bio: 'Treasury Command and Profit Synthesizer.', nodes: 8 },
          { name: 'Reza Admin', role: 'System Admin', bio: 'Nexus Security and Identity Vault.', nodes: 2 },
        ].map((staff, i) => (
          <GlassCard key={i} className="p-10 flex gap-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 group hover:border-blue-500 transition-all">
             <div className="w-24 h-24 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-black text-slate-300 italic uppercase shrink-0">{staff.name[0]}</div>
             <div className="flex-1">
                <h4 className="text-xl font-black italic text-slate-900 dark:text-white uppercase">{staff.name}</h4>
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">{staff.role}</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-6 italic">"{staff.bio}"</p>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 rounded-xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Managed Nodes</p>
                      <p className="text-sm font-black italic">{staff.nodes}</p>
                   </div>
                </div>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export const KYCQueue: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">KYC <span className="text-emerald-600">Verification</span></h2>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 italic">Pending: 15 Onboarding Requests</p>
         </div>
      </div>
       <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
             <thead>
                <tr className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase italic tracking-[0.3em]">
                   <th className="p-8">Entity Name</th>
                   <th className="p-8">Type</th>
                   <th className="p-8">Documentation</th>
                   <th className="p-8 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                {[
                   { name: 'PT Nusantara Food', cat: 'Commercial', doc: 'SK Kemendag' },
                   { name: 'Yayasan Al-Azhim', cat: 'Social', doc: 'Akta Wakaf' },
                ].map((tr, i) => (
                   <tr key={i} className="border-b border-slate-50 dark:border-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="p-8 font-black italic text-slate-900 dark:text-white uppercase">{tr.name}</td>
                      <td className="p-8 italic uppercase text-blue-600 dark:text-blue-400">{tr.cat}</td>
                      <td className="p-8">
                         <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-400" />
                            <span className="underline decoration-slate-300 underline-offset-4">{tr.doc}</span>
                         </div>
                      </td>
                      <td className="p-8 text-right">
                         <button className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Authorize</button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

// Aliases for layout compatibility
export const ReviewQueue = FinanceDashboard;
export const AuditLog = AdminAuditLog;
export const DocumentQueue = KYCQueue;
export const Reconciliation: React.FC = () => <div className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black italic text-slate-400">Reconciliation Engine Context (P-FO-02)</div>;
export const FinancialReports: React.FC = () => <div className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center font-black italic text-slate-400">Financial Reporting Context (P-SH-01)</div>;
