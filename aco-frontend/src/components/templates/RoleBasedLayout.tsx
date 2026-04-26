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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  // Mock Notifications for P-SH-01
  const [notifications] = React.useState([
    { id: 1, type: 'kyc', text: '5 User baru menunggu verifikasi KYC', time: '2 jam lalu', read: false },
    { id: 2, type: 'project', text: 'Arief mengaktifkan proyek RS Harapan Bunda', time: '3 jam lalu', read: true },
    { id: 3, type: 'finance', text: 'Bagi hasil proyek Perumahan Asri siap dihitung', time: '5 jam lalu', read: false },
  ]);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home'); // Kembali ke homepage guest sesuai App.tsx view context
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
    if (['investor_micro', 'investor_enterprise', 'funder'].includes(role)) {
        return [
          { id: 'overview', icon: <Heart size={20} />, label: 'Universal Hub' },
          { id: 'ledger', icon: <FileText size={20} />, label: 'Investment Ledger' },
          { id: 'impact', icon: <ShieldCheck size={20} />, label: 'Philanthropy Impact' },
          { id: 'market', icon: <Search size={20} />, label: 'Explore Catalog' },
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
    
    // Add Notifications to common menu if not in header
    if (activeTab === 'notifications') {
       return [
         { id: 'notifications', icon: <Bell size={20} />, label: 'Notifikasi' },
         ...getMenuItemsForRole(role)
       ];
    }

    return getMenuItemsForRole(role);
  };

  const getMenuItemsForRole = (role: string) => {
    if (['arief', 'investment_officer', 'investment'].includes(role)) {
      return [
        { id: 'overview', icon: <LayoutGrid size={20} />, label: 'Daftar Proyek' },
        { id: 'add', icon: <PlusSquare size={20} />, label: 'Tambah Proyek' },
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
        { id: 'review', icon: <Clock size={20} />, label: 'Review Antrian' },
        { id: 'profit', icon: <Percent size={20} />, label: 'Kalkulasi Bagi Hasil' },
        { id: 'reconciliation', icon: <RefreshCw size={20} />, label: 'Rekonsiliasi' },
      ];
    }
    if (['reza', 'admin'].includes(role)) {
      return [
        { id: 'kyc', icon: <ShieldCheck size={20} />, label: 'Antrian KYC' },
        { id: 'users', icon: <Users size={20} />, label: 'Manajemen Pengguna' },
        { id: 'docs', icon: <File size={20} />, label: 'Validasi Dokumen' },
        { id: 'audit', icon: <History size={20} />, label: 'Audit Log' },
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
        if (activeTab === 'notifications') return <div className="p-8">Halaman Notifikasi (P-SH-02)</div>;
        if (activeTab === 'users') return <UserManagement />;
        if (activeTab === 'docs') return <DocumentQueue />;
        if (activeTab === 'audit') return <AuditLog />;
        return <KYCQueue />;
    }

    // EXTERNAL RENDERING
    if (['investor_micro', 'investor_enterprise', 'funder'].includes(role)) {
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
      <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-72'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-500 z-50 shadow-2xl shadow-slate-200/50 dark:shadow-none`}>
        <div className="p-7 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black italic text-xl shadow-xl shadow-blue-500/20">A</div>
             {!isSidebarCollapsed && (
                <div className="animate-in fade-in slide-in-from-left-2 transition-all">
                   <h2 className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">ACO ENGINE</h2>
                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Core Internal</p>
                </div>
             )}
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {getMenuItems().map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-all group ${
                activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none translate-x-2' 
                    : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{item.icon}</div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-1">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className={`p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-4'} transition-all`}>
            <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black italic shadow-sm shrink-0">
              {currentUser.name[0]}
            </div>
            {!isSidebarCollapsed && (
              <div className="truncate animate-in fade-in slide-in-from-left-2">
                <p className="text-[10px] font-black uppercase tracking-wider truncate text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase">{currentUser.role.replace('_', ' ')}</p>
              </div>
            )}
          </div>
          
          <button 
             onClick={() => setShowLogoutModal(true)}
             className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-4 px-4'} py-4 rounded-2xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group`}
          >
             <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
             {!isSidebarCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Logout System</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 shrink-0 z-40 transition-colors">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 transition-all"
            >
              <LayoutGrid size={20} />
            </button>
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={16} />
              <input 
                placeholder="Search across tree context..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-bold outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900 dark:text-white transition-all shadow-inner" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-all shadow-sm">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-3 rounded-2xl transition-all relative ${isNotifOpen ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-blue-600'}`}
              >
                <Bell size={22} />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 overflow-hidden"
                  >
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h4 className="font-black italic text-slate-900 dark:text-white">NOTIFIKASI</h4>
                      <button onClick={() => setActiveTab('notifications')} className="text-[10px] font-black text-blue-600 hover:underline tracking-widest uppercase">Lihat Semua</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-5 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0 cursor-pointer ${!n.read ? 'bg-blue-50/30' : ''}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'kyc' ? 'bg-amber-100 text-amber-600' : n.type === 'project' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                             {n.type === 'kyc' ? <ShieldCheck size={18} /> : n.type === 'project' ? <PlusSquare size={18} /> : <BarChart3 size={18} />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight mb-1">{n.text}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{n.time}</p>
                          </div>
                          {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800 mx-2" />
            
            {/* Quick Role Switcher for Demo (Moved to end) */}
            <select 
              onChange={(e) => setRole(e.target.value)}
              value={currentUser.role}
              className="bg-slate-900 dark:bg-blue-600 text-white text-[9px] font-black uppercase border-none rounded-2xl px-5 py-3 outline-none cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/10"
            >
              <optgroup label="Internal Team (ACO Staff)">
                <option value="arief">Investment: Arief</option>
                <option value="sinta">Monitoring: Sinta</option>
                <option value="hendra">Finance: Hendra</option>
                <option value="reza">Admin: Reza</option>
              </optgroup>
              <optgroup label="External Demo">
                <option value="investor_micro">Investor: Budi</option>
                <option value="funder">Universal Funder</option>
              </optgroup>
            </select>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-12 bg-slate-50 dark:bg-slate-950/50 relative">
          <div className="max-w-6xl mx-auto relative z-10 transition-colors">
            {renderModule()}
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setShowLogoutModal(false)}
               className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-white dark:bg-slate-900 w-full max-w-sm p-10 rounded-[3rem] shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800"
            >
               <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <LogOut size={32} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center mb-2 tracking-tight">Konfirmasi Logout</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 text-center font-medium leading-relaxed mb-8">
                  Apakah Anda yakin ingin keluar dari sistem ACO Core Internal?
               </p>
               <div className="flex gap-4">
                  <button 
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    BATAL
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 shadow-xl shadow-red-200 dark:shadow-none transition-all"
                  >
                    LOGOUT
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
