import React from 'react';
import { 
  TrendingUp, Wallet, PieChart, BarChart3, Users, AlertCircle, CheckCircle, Clock,
  DollarSign, Target, CreditCard, MoreVertical, Home, Settings, FileText, BarChart,
  Zap, Heart, Building2, Award, Shield, Activity, TrendingDown, Receipt, Calendar, Package, RefreshCcw, Plus
} from 'lucide-react';
import WakifDashboard from './dashboards/WakifDashboard';
import MustahiqDashboard from './dashboards/MustahiqDashboard';
import InvestmentOfficerDashboard from './dashboards/InvestmentOfficerDashboard';
import PortfolioMonitorDashboard from './dashboards/PortfolioMonitorDashboard';
import FinanceOfficerDashboard from './dashboards/FinanceOfficerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import MunfiqDashboard from './dashboards/MunfiqDashboard';
import ProjectsPage from './ProjectsPage';
import { MaterialIcon } from './dashboards/IconHelper';

interface RoleSpecificContentProps {
  role: string;
  activeTab: string;
  user: { name: string; email: string };
  data?: any;
  token?: string;
  onRefresh?: () => void;
  onTabChange?: (tab: string) => void;
}
import { RoleBasedForms } from './RoleBasedForms';

export const RoleSpecificContent: React.FC<RoleSpecificContentProps> = ({ role, activeTab, user, data, token, onRefresh, onTabChange }) => {
  // Catch-all for input_data tab
  if (activeTab === 'input_data') {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Plus className="w-8 h-8 text-blue-600" />
            Input Data Content
          </h1>
          <p className="text-slate-600">Lengkapi data untuk role {role}</p>
        </div>
        <RoleBasedForms user={user} token={token || ''} onSuccess={onRefresh || (() => {})} />
      </div>
    );
  }

  // Investor Micro Dashboard
  if (role === 'investor_micro') {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Wallet className="w-8 h-8 text-blue-600" />
            Investor Micro Dashboard
          </h1>
          <p className="text-slate-600 font-medium">Kelola portofolio investasi Anda dengan transparansi penuh</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <DollarSign className="w-4 h-4" />
                  Total Investasi
                </div>
                <div className="text-3xl font-black text-blue-900 tracking-tighter">{data?.investmentBalance || 'Rp 0'}</div>
                <p className="text-[10px] text-blue-600 font-bold mt-2 italic">{data?.activeInvestments || 0} Proyek Aktif</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Total Returns
                </div>
                <div className="text-3xl font-black text-emerald-900 tracking-tighter">{data?.totalReturns || 'Rp 0'}</div>
                <p className="text-[10px] text-emerald-600 font-bold mt-2 italic">Next: {data?.nextDisbursement || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Target className="w-4 h-4" />
                  Dana Tersedia
                </div>
                <div className="text-3xl font-black text-purple-900 tracking-tighter">Rp 45M</div>
                <p className="text-[10px] text-purple-600 font-bold mt-2 italic">Siap Diinvestasikan</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-1">
                   <Clock className="w-4 h-4" />
                  Pesan Sistem
                </div>
                <div className="text-3xl font-black text-amber-900 tracking-tighter">2</div>
                <p className="text-[10px] text-amber-600 font-bold mt-2 italic">Aksi Diperlukan</p>
              </div>
            </div>

            {/* Portofolio & Analysis Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <BarChart className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Portfolio Breakdown</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Cianjur Wakaf Residence', amount: 'Rp 50M', profit: '+12.5%', status: 'Active' },
                    { name: 'Bogor Sukuk Agro', amount: 'Rp 40M', profit: '+8.3%', status: 'Active' },
                  ].map((inv, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{inv.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{inv.amount} • {inv.status}</p>
                      </div>
                      <span className="text-emerald-600 font-black text-xs italic">{inv.profit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Performa & Verifikasi</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                       <CheckCircle className="w-4 h-4 text-emerald-600" />
                       <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">KYC Status</p>
                    </div>
                    <p className="text-xl font-black text-emerald-900">VERIFIED</p>
                  </div>
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                       <Shield className="w-4 h-4 text-blue-600" />
                       <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Shariah</p>
                    </div>
                    <p className="text-xl font-black text-blue-900">COMPLIANT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-xl font-bold">
              <CreditCard className="w-6 h-6 text-slate-900" />
              <h2>Akun Bank Terdaftar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Primary Account</p>
                <p className="font-semibold text-slate-900">BCA Savings Account</p>
                <p className="text-sm text-slate-500 mt-1">1234 5678 9012</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-xl font-bold">
              <TrendingUp className="w-6 h-6 text-slate-900" />
              <h2>Investasi Aktif Saya</h2>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
                  <p className="font-bold text-slate-900">Proyek Strategis #{i}</p>
                  <p className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-widest">Rp 50.000.000 • Est. Bagi Hasil: +12.5%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-xl font-bold">
              <Receipt className="w-6 h-6 text-slate-900" />
              <h2>Riwayat Transaksi</h2>
            </div>
            <div className="space-y-4">
              {[
                { date: '2026-05-20', type: 'Investment', desc: 'Investasi Startup Tech Medan', amount: '+Rp 50.000.000', status: 'Completed' },
                { date: '2026-05-15', type: 'Return', desc: 'Return dari Organic Coffee Beans', amount: '+Rp 3.320.000', status: 'Completed' },
              ].map((tx, idx) => (
                <div key={idx} className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">{tx.status}</span>
                      <p className="font-bold text-slate-900 mt-2">{tx.desc}</p>
                      <p className="text-xs text-slate-500 font-medium">{tx.date}</p>
                    </div>
                    <div className="text-xl font-black text-emerald-600">{tx.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'investment_explore' && (
          <ProjectsPage onBack={() => onTabChange?.('dashboard')} onLoginClick={() => onTabChange?.('input_data')} />
        )}
      </div>
    );
  }

  // Investor Enterprise Dashboard
  if (role === 'investor_enterprise') {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Building2 className="w-8 h-8 text-purple-600" />
            Enterprise Portfolio Management
          </h1>
          <p className="text-slate-600">Advanced analytics dan portfolio intelligence untuk investasi korporat</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Wallet className="w-4 h-4" />
                  Portfolio Value
                </div>
                <div className="text-3xl font-black text-purple-900 tracking-tighter">Rp 2.5B</div>
                <p className="text-[10px] text-purple-600 font-bold mt-2 italic">15 Assets Strategis</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Yield YTD
                </div>
                <div className="text-3xl font-black text-indigo-900 tracking-tighter">+22.3%</div>
                <p className="text-[10px] text-indigo-600 font-bold mt-2 italic">Rp 559.3M Surplus</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <PieChart className="w-4 h-4" />
                  ACO Diversity
                </div>
                <div className="text-3xl font-black text-cyan-900 tracking-tighter">86/100</div>
                <p className="text-[10px] text-cyan-600 font-bold mt-2 italic">Risk: LOW</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-rose-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <AlertCircle className="w-4 h-4" />
                  System Alert
                </div>
                <div className="text-3xl font-black text-rose-900 tracking-tighter">1</div>
                <p className="text-[10px] text-rose-600 font-bold mt-2 italic">Needs Review</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <BarChart className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Performance vs Benchmark</h2>
                </div>
                <div className="h-64 bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl flex items-center justify-center text-slate-500 font-bold italic">
                  Interactive Performance Chart
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Asset Allocation</h2>
                </div>
                <div className="space-y-6">
                  {[
                    { name: 'Equities', val: '60%', color: 'bg-blue-600' },
                    { name: 'Fixed Income', val: '25%', color: 'bg-emerald-600' },
                    { name: 'Cash', val: '15%', color: 'bg-amber-600' },
                  ].map((asset, idx) => (
                    <div key={idx} className="space-y-2">
                       <div className="flex justify-between text-sm font-bold text-slate-900 uppercase">
                         <span>{asset.name}</span>
                         <span>{asset.val}</span>
                       </div>
                       <div className="w-full bg-slate-100 rounded-full h-3">
                         <div className={`${asset.color} h-3 rounded-full`} style={{width: asset.val}}></div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-xl font-bold">
              <Wallet className="w-6 h-6 text-slate-900" />
              <h2>Portfolio Manager</h2>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Startup Tech Jakarta', value: 'Rp 500M', allocation: '20%', status: 'Active' },
                { name: 'Organic Coffee Sumatra', value: 'Rp 400M', allocation: '16%', status: 'Active' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-slate-900 text-lg uppercase tracking-tight">{item.name}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Allocation: {item.allocation}</p>
                    </div>
                    <span className="text-[10px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">{item.status}</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tighter">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Advanced Analytics</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">Performance Metrics</h3>
                <div className="space-y-4 text-sm font-bold">
                  <div className="flex justify-between">
                    <span className="text-slate-500 uppercase">Total Bagi Hasil</span>
                    <span className="text-emerald-600">+22.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 uppercase">Sharpe Ratio</span>
                    <span className="text-slate-900">2.45</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                 <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">Risk Analysis</h3>
                 <div className="space-y-4">
                    {[
                      { label: 'Low Risk', level: '70%', color: 'bg-emerald-600' },
                      { label: 'Medium Risk', level: '50%', color: 'bg-blue-600' },
                    ].map((risk, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                         <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                           <div className={`${risk.color} h-2`} style={{width: risk.level}}></div>
                         </div>
                         <span className="text-[10px] font-black uppercase text-slate-500 w-20">{risk.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investment_explore' && (
          <ProjectsPage onBack={() => onTabChange?.('dashboard')} onLoginClick={() => onTabChange?.('portfolio')} />
        )}
      </div>
    );
  }

  // Project Owner Dashboard
  if (role === 'project_owner') {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Building2 className="w-8 h-8 text-amber-600" />
            Project Owner Dashboard
          </h1>
          <p className="text-slate-600 font-medium">Kelola proposal, investor relations, dan laporan keuangan proyek</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <DollarSign className="w-4 h-4" />
                  Total Raised
                </div>
                <div className="text-3xl font-black text-amber-900 tracking-tighter">Rp 500M</div>
                <p className="text-[10px] text-amber-600 font-bold mt-2 italic">5 dari 8 Milestone</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Users className="w-4 h-4" />
                  Active Investors
                </div>
                <div className="text-3xl font-black text-emerald-900 tracking-tighter">12</div>
                <p className="text-[10px] text-emerald-600 font-bold mt-2 italic">Micro + Enterprise</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Project Progress
                </div>
                <div className="text-3xl font-black text-blue-900 tracking-tighter">65%</div>
                <p className="text-[10px] text-blue-600 font-bold mt-2 italic">On Schedule</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-3xl p-8 shadow-sm">
                 <div className="flex items-center gap-2 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Zap className="w-4 h-4" />
                  Efficiency
                </div>
                <div className="text-3xl font-black text-purple-900 tracking-tighter">+3.2%</div>
                <p className="text-[10px] text-purple-600 font-bold mt-2 italic">Bagi Hasil Investor</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Project Timeline</h2>
              </div>
              <div className="space-y-6">
                {['Phase 1: Land Acquisition', 'Phase 2: Construction', 'Phase 3: Testing', 'Phase 4: Operation'].map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${idx < 2 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className={`font-black text-lg ${idx < 2 ? 'text-slate-900' : 'text-slate-400'}`}>{phase}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{idx < 2 ? 'Completed & Verified' : 'Upcoming Milestone'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proposal' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-xl font-bold">
                <FileText className="w-6 h-6 text-slate-900" />
                <h2>Proposal Investasi</h2>
              </div>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
                + New Proposal
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Solar Farm Expansion - Phase 2', status: 'Active', progress: 74 },
                { title: 'Coffee Processing Facility', status: 'Active', progress: 56 },
              ].map((proposal, idx) => (
                <div key={idx} className="p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{proposal.title}</p>
                    </div>
                    <span className="text-[10px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">{proposal.status}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300" style={{width: `${proposal.progress}%`}}></div>
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-3 whitespace-pre">{proposal.progress}% Funded  •  Rp 1.2B Target  •  {proposal.progress * 12}M Raised</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Muzakki Dashboard
  if (role === 'muzakki') {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Heart className="w-8 h-8 text-green-600" />
            Muzakki Dashboard
          </h1>
          <p className="text-slate-600 font-medium">Kelola kewajiban zakat Anda dengan akurat dan penuh berkah</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Package className="w-4 h-4" />
                  Harta Zakat
                </div>
                <div className="text-3xl font-black text-green-900 tracking-tighter">Rp 250M</div>
                <p className="text-[10px] text-green-600 font-bold mt-2 italic">Sudah Haul</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Heart className="w-4 h-4" />
                  Kewajiban
                </div>
                <div className="text-3xl font-black text-emerald-900 tracking-tighter">Rp 6.25M</div>
                <p className="text-[10px] text-emerald-600 font-bold mt-2 italic">2.5% Lillah</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-teal-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <CheckCircle className="w-4 h-4" />
                  Lunas
                </div>
                <div className="text-3xl font-black text-teal-900 tracking-tighter">Rp 6.25M</div>
                <p className="text-[10px] text-teal-600 font-bold mt-2 italic">Barakallah</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-300 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Calendar className="w-4 h-4" />
                  Next Haul
                </div>
                <div className="text-3xl font-black text-cyan-900 tracking-tighter">15 Jun</div>
                <p className="text-[10px] text-cyan-600 font-bold mt-2 italic">Tahun 2026</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Distribusi 8 Asnaf</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Fakir', 'Miskin', 'Amil', 'Muallaf', 'Riqab', 'Gharim', 'Fisabilillah', 'Ibnu Sabil'].map((asnaf, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-emerald-50 transition-all cursor-default">
                    <p className="font-black text-slate-900 text-xs uppercase tracking-widest mb-1">{asnaf}</p>
                    <p className="text-[10px] text-emerald-600 font-bold italic">Rp 781M</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Wakif Dashboard
  if (role === 'wakif') {
    return (
      <WakifDashboard 
        activeTab={activeTab}
        data={data}
      />
    );
  }

  // Mustahiq Dashboard
  if (role === 'mustahiq') {
    return (
      <MustahiqDashboard 
        activeTab={activeTab}
        data={data}
      />
    );
  }

  // Investment Officer Dashboard
  if (role === 'investment_officer') {
    return (
      <InvestmentOfficerDashboard 
        activeTab={activeTab}
        data={data}
      />
    );
  }

  // Portfolio Monitor Dashboard
  if (role === 'portfolio_monitor') {
    return (
      <PortfolioMonitorDashboard 
        activeTab={activeTab}
        data={data}
      />
    );
  }

  // Finance Officer Dashboard
  if (role === 'finance_officer') {
    return (
      <FinanceOfficerDashboard 
        activeTab={activeTab}
        data={data}
      />
    );
  }

  // Admin Dashboard
  if (role === 'admin') {
    return (
      <AdminDashboard 
        activeTab={activeTab}
        data={data}
        token={token}
        onRefresh={onRefresh}
        user={user}
      />
    );
  }

  // Munfiq Dashboard
  if (role === 'munfiq_mutashadiq') {
    return (
      <MunfiqDashboard 
        activeTab={activeTab}
        data={data}
      />
    );
  }

  return (
    <div className="text-slate-600 p-8 bg-slate-50 rounded-3xl border border-slate-200 font-bold italic">
      <p>Dashboard untuk role {role} sedang dimuat atau tidak ditemukan.</p>
    </div>
  );
};
