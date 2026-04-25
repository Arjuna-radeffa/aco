import React from 'react';
import { useStore } from '../../store/useStore';
import { DynamicProjectForm } from '../organisms/DynamicProjectForm';
import { MonitoringChart } from '../organisms/MonitoringChart';
import { DigitalDrawer } from '../organisms/DigitalDrawer';
import { WalletFlow } from '../organisms/WalletFlow';
import { GlassCard } from '../atoms/GlassCard';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { LayoutGrid, BarChart3, Wallet, Users, Activity, Settings, Bell, Search, ChevronRight, XCircle, PlusSquare, AlertCircle, Clock, Percent, RefreshCw, FileText, ShieldCheck, File, History, LogOut, Heart, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ProjectsList, 
  MonitoringDashboard, 
  UpdateQueue, 
  OverdueReports, 
  FinanceDashboard, 
  ReviewQueue, 
  ProfitSharing, 
  Reconciliation, 
  FinancialReports,
  KYCQueue,
  DocumentQueue,
  AuditLog,
  UserManagement 
} from '../organisms/InternalModules';
import { 
  ExternalDashboard, 
  InvestmentPortfolio, 
  DonationTracking, 
  BeneficiaryView, 
  ProjectOwnerView 
} from '../organisms/ExternalModules';

export const RoleBasedLayout: React.FC = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const setCurrentUser = useStore((state: any) => state.setCurrentUser);
  const setCurrentView = useStore((state: any) => state.setCurrentView);
  const projects = useStore((state: any) => state.projects);
  const setRole = useStore((state: any) => state.setRole);

  const [activeTab, setActiveTab] = React.useState('overview');
  const [isDark, setIsDark] = React.useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('homepage');
  };

  const toggleTheme = () => {
     setIsDark(!isDark);
     if (!isDark) {
         document.documentElement.classList.add('dark');
     } else {
         document.documentElement.classList.remove('dark');
     }
  };

  // Reset tab when role changes
  React.useEffect(() => {
    if (['reza', 'admin'].includes(currentUser?.role?.toLowerCase())) {
        setActiveTab('kyc');
    } else {
        setActiveTab('overview');
    }
  }, [currentUser?.role]);

  if (!currentUser) return null;

  const role = currentUser.role.toLowerCase();

  const getMenuItems = () => {
    // INTERNAL STAFF ROLES
    if (['arief', 'investment_officer', 'investment'].includes(role)) {
      return [
        { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Daftar Proyek' },
        { id: 'add', icon: <PlusSquare size={20} />, label: 'Tambah Proyek' },
        { id: 'reports', icon: <BarChart3 size={20} />, label: 'Reporting Hub' },
      ];
    }
    if (['sinta', 'portfolio_monitor'].includes(role)) {
      return [
        { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Dashboard Monitoring' },
        { id: 'updates', icon: <Activity size={20} />, label: 'Antrian Update' },
        { id: 'overdue', icon: <AlertCircle size={20} />, label: 'Proyek Terlambat' },
      ];
    }
    if (['hendra', 'finance_officer', 'finance'].includes(role)) {
      return [
        { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Dashboard Keuangan' },
        { id: 'review', icon: <Clock size={20} />, label: 'Review Transaksi' },
        { id: 'profit', icon: <Percent size={20} />, label: 'Bagi Hasil' },
        { id: 'reconciliation', icon: <RefreshCw size={20} />, label: 'Rekonsiliasi' },
      ];
    }
    if (['reza', 'admin'].includes(role)) {
      return [
        { id: 'kyc', icon: <ShieldCheck size={20} />, label: 'Antrian KYC' },
        { id: 'users', icon: <Users size={20} />, label: 'User Control' },
        { id: 'docs', icon: <File size={20} />, label: 'Validasi Dokumen' },
        { id: 'audit', icon: <History size={20} />, label: 'System Logs' },
      ];
    }

    // EXTERNAL ROLES
    if (['investor_micro', 'investor_enterprise'].includes(role)) {
        return [
          { id: 'overview', icon: <LayoutGrid size={20} />, label: 'My Portfolio' },
          { id: 'ledger', icon: <FileText size={20} />, label: 'Investment Ledger' },
          { id: 'market', icon: <Search size={20} />, label: 'Explore Market' },
        ];
    }
    if (['muzakki', 'munfiq', 'mutashadiq', 'wakif'].includes(role)) {
        return [
          { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Donation Hub' },
          { id: 'impact', icon: <Heart size={20} />, label: 'Impact Tracking' },
          { id: 'market', icon: <PlusSquare size={20} />, label: 'Donate Now' },
        ];
    }
    if (['mustahiq'].includes(role)) {
        return [
          { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Support Center' },
          { id: 'history', icon: <History size={20} />, label: 'Aid History' },
        ];
    }
    if (['project_owner'].includes(role)) {
        return [
          { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Manager Desk' },
          { id: 'reports', icon: <Activity size={20} />, label: 'Daily Reports' },
          { id: 'funds', icon: <Wallet size={20} />, label: 'Fund Requests' },
        ];
    }
    
    return [];
  };

  const renderModule = () => {
    // INTERNAL RENDERING
    if (['arief', 'investment_officer', 'investment'].includes(role)) {
        if (activeTab === 'add') return <DynamicProjectForm />;
        return <ProjectsList />;
    }
    if (['sinta', 'portfolio_monitor'].includes(role)) {
        if (activeTab === 'updates') return <UpdateQueue />;
        if (activeTab === 'overdue') return <OverdueReports />;
        return <MonitoringDashboard />;
    }
    if (['hendra', 'finance_officer', 'finance'].includes(role)) {
        if (activeTab === 'review') return <ReviewQueue />;
        if (activeTab === 'profit') return <ProfitSharing />;
        if (activeTab === 'reconciliation') return <Reconciliation />;
        return <FinanceDashboard />;
    }
    if (['reza', 'admin'].includes(role)) {
        if (activeTab === 'users') return <UserManagement />;
        if (activeTab === 'docs') return <DocumentQueue />;
        if (activeTab === 'audit') return <AuditLog />;
        return <KYCQueue />;
    }

    // EXTERNAL RENDERING
    if (['investor_micro', 'investor_enterprise', 'muzakki', 'munfiq', 'mutashadiq', 'wakif'].includes(role)) {
        if (activeTab === 'ledger') return <InvestmentPortfolio />;
        if (activeTab === 'impact') return <DonationTracking />;
        return <ExternalDashboard />;
    }
    if (['mustahiq'].includes(role)) {
        return <BeneficiaryView />;
    }
    if (['project_owner'].includes(role)) {
        return <ProjectOwnerView />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 dark:text-slate-500 space-y-6 bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
        <XCircle size={64} className="opacity-20 text-red-500" />
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white">Access Denied</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Security Fault: Role Mapping Inconsistency Detected</p>
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl">
             <p className="font-mono text-[10px] text-red-600 dark:text-red-400 italic">ERR_ROLE_UNAUTHORIZED_OR_NULL: role='{currentUser.role}'</p>
          </div>
        </div>
        <button 
          onClick={() => setRole('arief')}
          className="mt-4 px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95"
        >
          Reset Authority to Arief
        </button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} flex transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all z-20">
        <div className="p-6 mb-8">
          <div className="w-12 h-12 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black italic text-xl shadow-xl">A</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {getMenuItems().map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-all ${
                activeTab === item.id 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {item.icon}
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 dark:from-blue-900/50 to-indigo-100 dark:to-indigo-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
              {currentUser.name[0]}
            </div>
            <div className="hidden lg:block truncate overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-wider truncate w-32">{currentUser.name}</p>
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">{currentUser.role}</p>
            </div>
          </div>
          <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 p-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
          >
             <LogOut size={18} className="group-hover:scale-110 transition-transform" />
             <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Logout System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 z-10 transition-colors">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={16} />
            <input 
              placeholder="Search command (Ctrl + K)" 
              className="w-full pl-12 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900 dark:text-white transition-colors" 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-all">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Quick Role Switch for Demo */}
            <select 
              onChange={(e) => setRole(e.target.value)}
              value={currentUser.role}
              className="bg-slate-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase border-none rounded-xl px-4 py-2 outline-none cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
            >
              <optgroup label="Internal Staff">
                <option value="arief">Officer: Arief</option>
                <option value="sinta">Monitor: Sinta</option>
                <option value="hendra">Finance: Hendra</option>
                <option value="reza">Admin: Reza</option>
              </optgroup>
              <optgroup label="External Investors">
                <option value="investor_micro">Investor: Micro</option>
                <option value="investor_enterprise">Investor: Enterprise</option>
              </optgroup>
              <optgroup label="External Philanthropy">
                <option value="muzakki">Donor: Muzakki</option>
                <option value="wakif">Donor: Wakif</option>
                <option value="munfiq">Donor: Munfiq</option>
              </optgroup>
              <optgroup label="Partners & Benefits">
                <option value="project_owner">Mitra: Owner</option>
                <option value="mustahiq">User: Mustahiq</option>
              </optgroup>
            </select>
            <button className="p-3 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-12 bg-slate-50 dark:bg-slate-950/50 relative">
          <div className="max-w-6xl mx-auto relative z-10 transition-colors">
            {renderModule()}
          </div>
        </div>
      </main>
    </div>
  );
};
