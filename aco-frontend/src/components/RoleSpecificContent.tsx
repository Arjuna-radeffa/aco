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
          <p className="text-slate-600">Kelola portofolio investasi Anda dengan transparansi penuh</p>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-1">
                  <DollarSign className="w-4 h-4" />
                  Total Investasi
                </div>
                <div className="text-2xl font-bold text-blue-900">{data?.investmentBalance || 'Rp 0'}</div>
                <div className="text-xs text-blue-600 mt-2">{data?.activeInvestments || 0} Proyek Aktif</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Total Returns
                </div>
                <div className="text-2xl font-bold text-emerald-900">{data?.totalReturns || 'Rp 0'}</div>
                <div className="text-xs text-emerald-600 mt-2">Pencairan: {data?.nextDisbursement || '-'}</div>
              </div>


              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold mb-1">
                  <Target className="w-4 h-4" />
                  Dana Tersedia
                </div>
                <div className="text-2xl font-bold text-purple-900">Rp 45.000.000</div>
                <div className="text-xs text-purple-600 mt-2">Siap Investasi</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold mb-1">
                  <Clock className="w-4 h-4" />
                  Pending
                </div>
                <div className="text-2xl font-bold text-amber-900">2</div>
                <div className="text-xs text-amber-600 mt-2">Memerlukan Tindakan</div>
              </div>
            </div>

            {/* Portofolio Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart className="w-5 h-5 text-slate-900" />
                  <h2 className="text-lg font-semibold text-slate-900">Portfolio Breakdown</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Startup Tech Medan', amount: 50, profit: '+12.5%', status: 'Active' },
                    { name: 'Organic Coffee Beans', amount: 40, profit: '+8.3%', status: 'Active' },
                    { name: 'Solar Energy Sumatra', amount: 35, profit: '+25.1%', status: 'Active' },
                  ].map((inv, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900">{inv.name}</h3>
                          <p className="text-xs text-slate-500">Investasi Aktif</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                          {inv.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Rp {inv.amount}M</span>
                        <span className="text-emerald-600 font-semibold">{inv.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-slate-900" />
                  <h3 className="text-lg font-semibold text-slate-900">Status Akun</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <p className="text-xs text-emerald-600 font-semibold">KYC Status</p>
                    </div>
                    <p className="text-sm font-bold text-emerald-900 mt-1">Verified</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-blue-600 font-semibold">Bank Account</p>
                    </div>
                    <p className="text-sm font-bold text-blue-900 mt-1">BCA ••••7890</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <p className="text-xs text-purple-600 font-semibold">Member Since</p>
                    </div>
                    <p className="text-sm font-bold text-purple-900 mt-1">Jan 2024</p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <p className="text-xs text-amber-600 font-semibold">Annual Review</p>
                    </div>
                    <p className="text-sm font-bold text-amber-900 mt-1">30 May 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'accounts' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Akun Bank Terdaftar</h2>
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
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Investasi Aktif Saya</h2>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <p className="font-semibold">Proyek #{i}</p>
                  <p className="text-sm text-slate-600 mt-1">Rp 50.000.000 • Bagi Hasil: +12.5%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'disbursements' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Pencairan Profit</h2>
            </div>
            <p className="text-slate-600 mb-4">Profit tersedia: Rp 2.450.000</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Request Pencairan
            </button>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Riwayat Transaksi</h2>
            </div>
            <div className="text-sm text-slate-600 mb-4">Menampilkan 5 transaksi terbaru</div>
            <div className="space-y-3">
              {[
                { date: '2026-05-20', type: 'Investment', desc: 'Investasi Startup Tech Medan', amount: '+Rp 50.000.000', status: 'Completed' },
                { date: '2026-05-15', type: 'Return', desc: 'Return dari Organic Coffee Beans', amount: '+Rp 3.320.000', status: 'Completed' },
                { date: '2026-05-10', type: 'Withdrawal', desc: 'Pencairan Profit Bulanan', amount: '-Rp 2.450.000', status: 'Pending' },
                { date: '2026-05-05', type: 'Investment', desc: 'Investasi Solar Energy Sumatra', amount: '+Rp 35.000.000', status: 'Completed' },
                { date: '2026-04-28', type: 'Fee', desc: 'Biaya Manajemen (April)', amount: '-Rp 625.000', status: 'Completed' },
              ].map((tx, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {tx.status}
                        </span>
                        <span className="text-xs text-slate-500">{tx.type}</span>
                      </div>
                      <p className="font-semibold text-slate-900">{tx.desc}</p>
                      <p className="text-xs text-slate-500 mt-1">{tx.date}</p>
                    </div>
                    <div className={`font-semibold text-lg ${tx.amount.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>
                      {tx.amount}
                    </div>
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold mb-1">
                  <Wallet className="w-4 h-4" />
                  Total Portfolio
                </div>
                <div className="text-2xl font-bold text-purple-900">Rp 2.5 Billion</div>
                <div className="text-xs text-purple-600 mt-2">15 Assets</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-300 rounded-lg p-6">
                <div className="text-2xl font-bold text-indigo-900">+22.3%</div>
                <div className="text-xs text-indigo-600 mt-2">Bagi Hasil Tahunan</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-cyan-600 text-sm font-semibold mb-1">
                  <PieChart className="w-4 h-4" />
                  Diversification
                </div>
                <div className="text-2xl font-bold text-cyan-900">86%</div>
                <div className="text-xs text-cyan-600 mt-2">Risk Score: Low</div>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-rose-600 text-sm font-semibold mb-1">
                  <AlertCircle className="w-4 h-4" />
                  Alerts
                </div>
                <div className="text-2xl font-bold text-rose-900">1</div>
                <div className="text-xs text-rose-600 mt-2">Memerlukan Review</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart className="w-5 h-5 text-slate-900" />
                  <h2 className="text-lg font-semibold">Performance vs Benchmark</h2>
                </div>
                <div className="h-64 bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  Chart: Portfolio Performance
                </div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-5 h-5 text-slate-900" />
                  <h2 className="text-lg font-semibold">Asset Allocation</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Equities</span>
                    <div className="w-32 bg-slate-200 rounded-full h-2"><div className="bg-blue-600 h-2 w-8/12 rounded-full"></div></div>
                    <span className="text-sm font-semibold">60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fixed Income</span>
                    <div className="w-32 bg-slate-200 rounded-full h-2"><div className="bg-emerald-600 h-2 w-5/12 rounded-full"></div></div>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cash</span>
                    <div className="w-32 bg-slate-200 rounded-full h-2"><div className="bg-amber-600 h-2 w-3/12 rounded-full"></div></div>
                    <span className="text-sm font-semibold">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Portfolio Manager</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Startup Tech Jakarta', value: 'Rp 500M', allocation: '20%', status: 'Active' },
                { name: 'Organic Coffee Sumatra', value: 'Rp 400M', allocation: '16%', status: 'Active' },
                { name: 'Solar Energy Palembang', value: 'Rp 350M', allocation: '14%', status: 'Active' },
                { name: 'Fishery Cooperative Lombok', value: 'Rp 300M', allocation: '12%', status: 'Active' },
                { name: 'Agriculture Tech Bandung', value: 'Rp 250M', allocation: '10%', status: 'Active' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">Investment Value</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{item.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{item.value}</span>
                    <span className="text-sm text-slate-600">{item.allocation} of Portfolio</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Advanced Analytics</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-3">Performance Metrics (YTD)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Bagi Hasil</span>
                    <span className="font-semibold text-emerald-600">+22.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Sharpe Ratio</span>
                    <span className="font-semibold text-slate-900">2.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Volatility</span>
                    <span className="font-semibold text-amber-600">8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Max Drawdown</span>
                    <span className="font-semibold text-red-600">-5.1%</span>
                  </div>
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-3">Risk Analysis</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-200 rounded-full h-2"><div className="bg-emerald-600 h-2 w-7/12 rounded-full"></div></div>
                    <span className="text-xs text-slate-600">Low Risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-200 rounded-full h-2"><div className="bg-blue-600 h-2 w-5/12 rounded-full"></div></div>
                    <span className="text-xs text-slate-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-200 rounded-full h-2"><div className="bg-amber-600 h-2 w-3/12 rounded-full"></div></div>
                    <span className="text-xs text-slate-600">High Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCcw className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">API Integration</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">API Keys</p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 mb-3">
                  <p className="text-xs text-slate-600 mb-1">Production Key</p>
                  <code className="text-xs text-slate-900 break-all">sk_prod_8f3k2j9x4m1p5q8r2w9e3t6y</code>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">Rotate Key</button>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">Connected Applications</p>
                <div className="space-y-2">
                  {['TradingBot API', 'Dashboard Integration', 'Mobile App Backend'].map((app, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <span className="text-sm text-slate-600">{app}</span>
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Reports & Statements</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Q1 2026 Portfolio Report', date: 'Mar 31, 2026', type: 'Portfolio' },
                { name: 'Annual Investment Statement', date: 'Dec 31, 2025', type: 'Statement' },
                { name: 'Performance Analysis 2025', date: 'Jan 15, 2026', type: 'Analytics' },
                { name: 'Risk Assessment & Review', date: 'Jan 10, 2026', type: 'Risk' },
              ].map((report, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900">{report.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-600">{report.date}</span>
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">{report.type}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm font-semibold text-blue-600 hover:text-blue-700">Download</button>
                </div>
              ))}
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
          <p className="text-slate-600">Kelola proposal, investor relations, dan laporan keuangan proyek</p>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold mb-1">
                  <DollarSign className="w-4 h-4" />
                  Total Raised
                </div>
                <div className="text-2xl font-bold text-amber-900">Rp 500M</div>
                <div className="text-xs text-amber-600 mt-2">5 dari 8 Milestone</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-1">
                  <Users className="w-4 h-4" />
                  Active Investors
                </div>
                <div className="text-2xl font-bold text-emerald-900">12</div>
                <div className="text-xs text-emerald-600 mt-2">Micro + Enterprise</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Project Progress
                </div>
                <div className="text-2xl font-bold text-blue-900">65%</div>
                <div className="text-xs text-blue-600 mt-2">On Schedule</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
                <div className="text-2xl font-bold text-purple-900">+3.2%</div>
                <div className="text-xs text-purple-600 mt-2">Bagi Hasil Investor</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-slate-900" />
                <h2 className="text-lg font-semibold">Project Timeline</h2>
              </div>
              <div className="space-y-3">
                {['Phase 1: Land Acquisition', 'Phase 2: Construction', 'Phase 3: Testing', 'Phase 4: Operation'].map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white ${idx < 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{phase}</p>
                      <p className="text-xs text-slate-500">{idx < 2 ? 'Completed' : 'Upcoming'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'proposal' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Proposal Investasi</h2>
            </div>
            <div className="mb-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Create New Proposal
              </button>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Solar Farm Expansion - Phase 2', status: 'Active', target: 'Rp 1.2B', raised: 'Rp 890M', progress: 74 },
                { title: 'Coffee Processing Facility', status: 'Active', target: 'Rp 800M', raised: 'Rp 450M', progress: 56 },
                { title: 'Fishery Cooperative Development', status: 'Approved', target: 'Rp 600M', raised: 'Rp 600M', progress: 100 },
                { title: 'Agriculture Tech Innovation', status: 'Under Review', target: 'Rp 400M', raised: 'Rp 150M', progress: 37 },
              ].map((proposal, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{proposal.title}</p>
                      <p className="text-xs text-slate-500 mt-1">Target: {proposal.target} | Terkumpul: {proposal.raised}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      proposal.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      proposal.status === 'Approved' ? 'bg-blue-100 text-blue-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${proposal.progress}%`}}></div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{proposal.progress}% Funded</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'investors' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Investor Saya</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">12 Investors actively invested in your project</p>
            <div className="space-y-3">
              {[
                { name: 'PT. Investasi Maju Jaya', type: 'Enterprise', investment: 'Rp 250M', status: 'Active' },
                { name: 'Budi Santoso', type: 'Micro', investment: 'Rp 50M', status: 'Active' },
                { name: 'PT. Utama Capital', type: 'Enterprise', investment: 'Rp 200M', status: 'Active' },
                { name: 'Siti Nurhaliza', type: 'Micro', investment: 'Rp 75M', status: 'Active' },
                { name: 'CV. Sukses Bersama', type: 'Micro', investment: 'Rp 40M', status: 'Active' },
                { name: 'Ahmad Wijaya Corporation', type: 'Enterprise', investment: 'Rp 180M', status: 'Active' },
              ].map((investor, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900">{investor.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">{investor.type}</span>
                        <span className="text-xs text-slate-600">Investment: {investor.investment}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{investor.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Laporan Keuangan</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-3">Financial Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Revenue</span>
                    <span className="font-semibold text-emerald-600">Rp 500M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Operating Cost</span>
                    <span className="font-semibold text-red-600">Rp 150M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Net Profit</span>
                    <span className="font-semibold text-slate-900">Rp 350M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Profit Margin</span>
                    <span className="font-semibold">70%</span>
                  </div>
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-3">Cash Flow</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Investor Inflow</span>
                    <span className="font-semibold text-emerald-600">+Rp 125M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Profit Distribution</span>
                    <span className="font-semibold text-blue-600">+Rp 45M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Operating Expense</span>
                    <span className="font-semibold text-red-600">-Rp 30M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Net Cash</span>
                    <span className="font-semibold text-slate-900">Rp 140M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Komunikasi & Update</h2>
            </div>
            <div className="space-y-3">
              {[
                { date: '2026-05-15', title: 'Laporan Bulanan April', message: 'Profit 3.2% telah didistribusikan ke 12 investor', status: 'Sent' },
                { date: '2026-05-10', title: 'Update Konstruksi Phase 2', message: 'Fase konstruksi 2 sudah mencapai 65% progress', status: 'Sent' },
                { date: '2026-05-05', title: 'Pengumuman Dividen', message: 'Dividen Q1 2026 akan dibayarkan 20 Mei', status: 'Sent' },
                { date: '2026-04-28', title: 'Rapat Investor Tahunan', message: 'Jadwal rapat investor tahunan: 15 Juni 2026', status: 'Sent' },
              ].map((msg, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{msg.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{msg.message}</p>
                      <p className="text-xs text-slate-500 mt-2">{msg.date}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{msg.status}</span>
                  </div>
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
          <p className="text-slate-600">Kelola kewajiban zakat Anda dengan akurat dan penuh berkah</p>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-1">
                  <Package className="w-4 h-4" />
                  Harta Terkena Zakat
                </div>
                <div className="text-2xl font-bold text-green-900">Rp 250M</div>
                <div className="text-xs text-green-600 mt-2">Sudah Haul</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-1">
                  <Heart className="w-4 h-4" />
                  Zakat Kewajiban
                </div>
                <div className="text-2xl font-bold text-emerald-900">Rp 6.25M</div>
                <div className="text-xs text-emerald-600 mt-2">2.5% dari Harta</div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold mb-1">
                  <CheckCircle className="w-4 h-4" />
                  Sudah Dibayar
                </div>
                <div className="text-2xl font-bold text-teal-900">Rp 6.25M</div>
                <div className="text-xs text-teal-600 mt-2">100% Lunas</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-300 rounded-lg p-6">
                <div className="flex items-center gap-2 text-cyan-600 text-sm font-semibold mb-1">
                  <Calendar className="w-4 h-4" />
                  Haul Berikutnya
                </div>
                <div className="text-2xl font-bold text-cyan-900">15 June</div>
                <div className="text-xs text-cyan-600 mt-2">2026</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-slate-900" />
                <h2 className="text-lg font-semibold">Distribusi 8 Asnaf</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {['Fakir', 'Miskin', 'Amil', 'Muallaf', 'Riqab', 'Gharim', 'Fisabilillah', 'Ibnu Sabil'].map((asnaf, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <p className="font-semibold text-slate-900">{asnaf}</p>
                    <p className="text-sm text-slate-600 mt-1">Rp 781.25M</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Riwayat Pembayaran Zakat</h2>
            </div>
            <div className="space-y-3">
              {[
                { date: '2026-05-20', amount: 'Rp 6.25M', type: 'Pembayaran Zakat Tahunan', status: 'Completed' },
                { date: '2026-04-15', amount: 'Rp 520.83K', type: 'Zakat Profesi (April)', status: 'Completed' },
                { date: '2026-03-15', amount: 'Rp 520.83K', type: 'Zakat Profesi (Maret)', status: 'Completed' },
                { date: '2026-02-15', amount: 'Rp 520.83K', type: 'Zakat Profesi (Februari)', status: 'Completed' },
                { date: '2026-01-15', amount: 'Rp 520.83K', type: 'Zakat Profesi (Januari)', status: 'Completed' },
              ].map((tx, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                          {tx.status}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-900">{tx.type}</p>
                      <p className="text-xs text-slate-500 mt-1">{tx.date}</p>
                    </div>
                    <div className="font-semibold text-lg text-emerald-600">{tx.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'beneficiaries' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Penerima Manfaat</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">Total 8 kategori penerima manfaat zakat</p>
            <div className="space-y-3">
              {[
                { name: 'Kaum Fakir Miskin', count: 45, distribution: 'Rp 1.875M', description: 'Bantuan tunai dan kebutuhan pangan' },
                { name: 'Pelatih Zakat (Amil)', count: 8, distribution: 'Rp 781.25K', description: 'Gaji dan insentif untuk pengelola' },
                { name: 'Mualaf Baru', count: 12, distribution: 'Rp 781.25K', description: 'Bantuan kehidupan untuk muallaf' },
                { name: 'Tahanan (Riqab)', count: 5, distribution: 'Rp 390.63K', description: 'Pembayaran utang untuk pembebasan' },
              ].map((beneficiary, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{beneficiary.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{beneficiary.description}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">{beneficiary.count} orang</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Distribusi</span>
                    <span className="font-semibold text-emerald-600">{beneficiary.distribution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Pengaturan Zakat</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">Perhitungan Zakat</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Metode Perhitungan</span>
                    <span className="font-semibold">2.5% dari Total Harta</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tanggal Haul</span>
                    <span className="font-semibold">15 Juni 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Jenis Zakat</span>
                    <span className="font-semibold">Zakat Mal & Profesi</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">Notifikasi</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-slate-600">Pengingat pembayaran zakat</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-slate-600">Konfirmasi distribusi</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-600">Laporan bulanan</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Kalkulator Zakat</h2>
            </div>
            <div className="space-y-6">
              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <p className="font-semibold text-slate-900 mb-4">Input Harta</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-600 block mb-1">Harta Tunai</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="0" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" defaultValue="50000000" />
                      <span className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm">Rp</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 block mb-1">Emas (gram)</label>
                    <input type="number" placeholder="0" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" defaultValue="50" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 block mb-1">Properti & Bisnis</label>
                    <input type="number" placeholder="0" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" defaultValue="200000000" />
                  </div>
                </div>
              </div>
              <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Zakat yang Harus Dibayarkan</p>
                <p className="text-3xl font-bold text-emerald-600">Rp 6.250.000</p>
                <p className="text-xs text-slate-600 mt-2">2.5% dari total harta Rp 250M</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Alokasi 8 Asnaf</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: 'Fakir', desc: 'Orang Sangat Miskin', amount: 'Rp 781.25K', color: 'bg-rose-100 border-rose-300' },
                { name: 'Miskin', desc: 'Orang Miskin', amount: 'Rp 781.25K', color: 'bg-pink-100 border-pink-300' },
                { name: 'Amil', desc: 'Pengelola Zakat', amount: 'Rp 781.25K', color: 'bg-purple-100 border-purple-300' },
                { name: 'Muallaf', desc: 'Mualaf Baru', amount: 'Rp 781.25K', color: 'bg-blue-100 border-blue-300' },
                { name: 'Riqab', desc: 'Pembebasan Hamba', amount: 'Rp 781.25K', color: 'bg-emerald-100 border-emerald-300' },
                { name: 'Gharim', desc: 'Orang Terlilit Utang', amount: 'Rp 781.25K', color: 'bg-amber-100 border-amber-300' },
                { name: 'Fisabilillah', desc: 'Jalan Allah', amount: 'Rp 781.25K', color: 'bg-cyan-100 border-cyan-300' },
                { name: 'Ibnu Sabil', desc: 'Musafir Terlantar', amount: 'Rp 781.25K', color: 'bg-teal-100 border-teal-300' },
              ].map((asnaf, idx) => (
                <div key={idx} className={`p-4 border rounded-lg ${asnaf.color}`}>
                  <p className="font-semibold text-slate-900">{asnaf.name}</p>
                  <p className="text-xs text-slate-600 mt-1">{asnaf.desc}</p>
                  <p className="font-semibold text-slate-900 mt-2">{asnaf.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg font-semibold">Laporan Dampak Zakat</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="font-semibold text-slate-900 mb-3">Dampak Sosial</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Keluarga Terbantu</span>
                    <span className="font-semibold">45 keluarga</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Anak ke Sekolah</span>
                    <span className="font-semibold">87 anak</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bisnis Dimulai</span>
                    <span className="font-semibold">12 usaha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Penderita Kesehatan</span>
                    <span className="font-semibold">23 orang terbantu</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
                <p className="font-semibold text-slate-900 mb-3">Cerita Dampak</p>
                <div className="text-sm text-slate-700 leading-relaxed italic">
                  "Berkat zakat Anda, Ibu Ratna bisa memulai usaha tekstil dan sekarang bisa membiayai 3 anaknya ke sekolah. Terima kasih telah menjadi bagian dari perubahan hidupnya."
                </div>
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
    <div className="text-slate-600">
      <p>Dashboard untuk role {role} sedang dimuat...</p>
    </div>
  );
};
