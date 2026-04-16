import React, { useState } from 'react';
import { 
  Wallet, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  Users, 
  FileText, 
  AlertCircle, 
  Search,
  CheckCircle2,
  Clock,
  MoreVertical,
  LayoutDashboard,
  PieChart,
  History,
  Settings,
  LogOut
} from 'lucide-react';
import { User } from '../App';

interface BeautifulDashboardProps {
  user: User;
  onLogout: () => void;
}

const BeautifulDashboard: React.FC<BeautifulDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data berdasarkan narasi project ACO
  const accounts = [
    { id: 1, name: 'Rekening Investasi', balance: 'Rp 450.230.000.000', change: '+2.4%', color: 'bg-blue-600', icon: Wallet },
    { id: 2, name: 'Dana Zakat (8 Asnaf)', balance: 'Rp 12.450.000.000', change: '+1.2%', color: 'bg-emerald-600', icon: ShieldCheck },
    { id: 3, name: 'Infaq & Shadaqah', balance: 'Rp 3.120.500.000', change: '+0.8%', color: 'bg-amber-600', icon: Users },
    { id: 4, name: 'Wakaf Produktif', balance: 'Rp 85.000.000.000', change: '0.0%', color: 'bg-purple-600', icon: FileText },
  ];

  const pendingDisbursements = [
    { 
      id: 'DISB-001', 
      type: 'Bagi Hasil', 
      entity: 'Laundry Kiloan Malang', 
      target: '142 Investor (Inc. Rina)', 
      amount: 'Rp 45.000.000', 
      status: 'Wait Verification',
      date: '12 Apr 2024'
    },
    { 
      id: 'DISB-002', 
      type: 'Pencairan Modal', 
      entity: 'Logistik Bandung (Dimas)', 
      target: 'Vendor Armada', 
      amount: 'Rp 250.000.000', 
      status: 'Wait Verification',
      date: '13 Apr 2024'
    },
    { 
      id: 'DISB-003', 
      type: 'Zakat Mal', 
      entity: 'Program Beasiswa (Bu Tari)', 
      target: '30 Mustahiq', 
      amount: 'Rp 15.000.000', 
      status: 'Verification Process',
      date: '13 Apr 2024'
    }
  ];

  const reconciliationAlerts = [
    { id: 1, msg: 'Selisih Rp 5.000 pada VA Bank Mandiri (Investasi)', type: 'warning' },
    { id: 2, msg: '12 Transaksi Infaq belum terpetakan ke program', type: 'info' }
  ];

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      investor_micro: 'Investor Micro',
      investor_enterprise: 'Investor Enterprise',
      project_owner: 'Project Owner',
      muzakki: 'Muzakki (Zakat Giver)',
      munfiq_mutashadiq: 'Munfiq/Mutashadiq',
      wakif: 'Wakif',
      mustahiq: 'Mustahiq',
      investment_officer: 'Investment Officer',
      portfolio_monitor: 'Portfolio Monitor',
      finance_officer: 'Finance Officer',
      admin: 'Admin'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  const NavItem = ({ icon: Icon, label, active, onClick, badge }: {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
    badge?: string;
  }) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <Icon size={20} className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation - Fixed */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col shrink-0 z-50 overflow-hidden">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl italic">A</div>
          <span className="font-bold text-xl tracking-tight text-blue-400">ACO <span className="text-white font-normal opacity-80">Finance</span></span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem active={activeTab === 'overview'} icon={LayoutDashboard} label="Dashboard" onClick={() => setActiveTab('overview')} />
          <NavItem active={activeTab === 'accounts'} icon={Wallet} label="Isolasi Rekening" onClick={() => setActiveTab('accounts')} />
          <NavItem active={activeTab === 'disbursements'} icon={RefreshCcw} label="Verifikasi Disbursement" onClick={() => setActiveTab('disbursements')} badge="3" />
          <NavItem active={activeTab === 'reconciliation'} icon={History} label="Rekonsiliasi" onClick={() => setActiveTab('reconciliation')} />
          <NavItem active={activeTab === 'reports'} icon={PieChart} label="Laporan Audit" onClick={() => setActiveTab('reports')} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-white">{user.name}</p>
              <p className="text-xs text-slate-400 truncate text-white/50">{getRoleDisplayName(user.role)}</p>
            </div>
            <button 
              onClick={onLogout}
              className="ml-auto p-2 text-slate-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - With left margin for fixed sidebar */}
      <main className="ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-semibold text-slate-800">
            {activeTab === 'overview' && 'Overview Keuangan'}
            {activeTab === 'disbursements' && 'Antrean Verifikasi Penyaluran'}
            {activeTab === 'accounts' && 'Isolasi Rekening'}
            {activeTab === 'reconciliation' && 'Rekonsiliasi'}
            {activeTab === 'reports' && 'Laporan Audit'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <AlertCircle className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Account Isolation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accounts.map(acc => (
                <div key={acc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${acc.color} text-white shadow-lg`}>
                      <acc.icon size={24} />
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{acc.change}</span>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">{acc.name}</h3>
                  <p className="text-xl font-bold text-slate-900 tracking-tight">{acc.balance}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Verification Queue Table */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Butuh Verifikasi
                  </h2>
                  <button className="text-sm text-blue-600 font-medium hover:underline">Lihat Semua</button>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                        <th className="px-6 py-4">Tipe & Entitas</th>
                        <th className="px-6 py-4">Penerima</th>
                        <th className="px-6 py-4">Nominal</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pendingDisbursements.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{item.type}</div>
                            <div className="text-xs text-slate-400">{item.entity}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{item.target}</td>
                          <td className="px-6 py-4 font-mono font-medium text-slate-800">{item.amount}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                              <Clock size={12} /> {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                              Verify Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sidebar Info/Alerts */}
              <div className="space-y-6">
                {/* Reconciliation Summary */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <RefreshCcw size={80} />
                  </div>
                  <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest">Status Rekonsiliasi</h3>
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold">99.8%</p>
                        <p className="text-xs text-slate-400">Match with Bank Statement</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[99.8%]"></div>
                    </div>
                  </div>
                </div>

                {/* Alerts Dashboard */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    Finance Alerts
                  </h3>
                  <div className="space-y-3">
                    {reconciliationAlerts.map(alert => (
                      <div key={alert.id} className={`p-3 rounded-xl text-xs flex gap-3 ${alert.type === 'warning' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                        <div className="shrink-0 pt-0.5">
                          {alert.type === 'warning' ? <AlertCircle size={14} /> : <FileText size={14} />}
                        </div>
                        <p className="leading-relaxed font-medium">{alert.msg}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all border border-slate-100">
                    Lihat Semua Log
                  </button>
                </div>

                {/* Quick Reports Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="font-bold text-sm mb-2">Laporan Mingguan</h3>
                  <p className="text-xs text-indigo-100 mb-4 leading-relaxed opacity-80 italic">"Zakat Bapak Salim sudah 100% dialokasikan ke Program Pendidikan & Kesehatan."</p>
                  <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-xs font-bold transition-colors w-full justify-center">
                    <FileText size={14} /> Download PDF Transparansi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global CSS for minor tweaks */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BeautifulDashboard;