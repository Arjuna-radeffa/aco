import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';
import { Heart, Users, BarChart3, TrendingUp, AlertCircle, CheckCircle2, Clock, Shield, Target } from 'lucide-react';

interface FinanceOfficerDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const FinanceOfficerDashboard: React.FC<FinanceOfficerDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.financeOfficer || {
    totalFund: 'Rp 15.8B',
    isolated: '100%',
    reconciled: '98.5%',
    liquidity: '2.4B',
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon={dashboardIcons.cash} size="large" />
          Finance Officer Dashboard
        </h1>
        <p className="text-slate-600">Kelola isolasi dana dan rekonsiliasi keuangan</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-6">
              <div className="text-green-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon="monetization_on" /> Total Fund
              </div>
              <div className="text-2xl font-bold text-green-900">{dashboardData.totalFund}</div>
              <div className="text-xs text-green-600 mt-2">All Funds</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
              <div className="text-blue-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.lock} /> Isolated
              </div>
              <div className="text-2xl font-bold text-blue-900">{dashboardData.isolated}</div>
              <div className="text-xs text-blue-600 mt-2">Compliant</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6">
              <div className="text-emerald-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.verified} /> Reconciled
              </div>
              <div className="text-2xl font-bold text-emerald-900">{dashboardData.reconciled}</div>
              <div className="text-xs text-emerald-600 mt-2">This Month</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
              <div className="text-purple-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.trending_up} /> Liquidity
              </div>
              <div className="text-2xl font-bold text-purple-900">{dashboardData.liquidity}</div>
              <div className="text-xs text-purple-600 mt-2">Reserve</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'isolation' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon={dashboardIcons.lock} size="large" />
            <h2 className="text-lg font-semibold">Fund Isolation - Isolasi Dana</h2>
          </div>
          <div className="space-y-3">
            {[
              { account: 'Investor Micro Fund', bank: 'BNI Syariah', accountNo: '1234567890', balance: 'Rp 2.5B', isolated: true, lastVerify: '13 Apr 2026' },
              { account: 'Investor Enterprise Fund', bank: 'Mandiri Syariah', accountNo: '0987654321', balance: 'Rp 5.8B', isolated: true, lastVerify: '13 Apr 2026' },
              { account: 'Zakat Management Fund', bank: 'BNI Syariah', accountNo: '1122334455', balance: 'Rp 1.2B', isolated: true, lastVerify: '12 Apr 2026' },
              { account: 'Wakaf Productive Fund', bank: 'Mandiri Syariah', accountNo: '5544332211', balance: 'Rp 3.1B', isolated: true, lastVerify: '12 Apr 2026' },
              { account: 'Donation Program Fund', bank: 'BNI Syariah', accountNo: '6655778899', balance: 'Rp 2.2B', isolated: true, lastVerify: '11 Apr 2026' },
            ].map((fund, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{fund.account}</h3>
                    <p className="text-xs text-slate-600">{fund.bank} • {fund.accountNo}</p>
                  </div>
                  <span className="text-blue-600 font-bold">{fund.balance}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon={dashboardIcons.lock} /> Properly Isolated
                  </span>
                  <span>Verified: {fund.lastVerify}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">ZIS Fund Isolation Oversight</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Mandatory Shariah Compliance</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total ZIS Asset pool</p>
                  <p className="text-3xl font-black text-white tracking-tighter">Rp 6.52B</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
                    <CheckCircle2 size={12} /> ISOLATED
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Mustahiq Pool</p>
                  <p className="text-3xl font-black text-white tracking-tighter">Rp 1.24B</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-blue-400 font-bold">
                    <Users size={12} /> 1,240 RECIPIENTS
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Audit Transparency</p>
                  <p className="text-3xl font-black text-white tracking-tighter">100%</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-purple-400 font-bold">
                    <Shield size={12} /> VERIFIED
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-4 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/40">
                  Generate ZIS Isolation Report
                </button>
                <button className="flex-1 py-4 bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                  Mustahiq Disbursement Tool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reconciliation' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon={dashboardIcons.verified} size="large" />
            <h2 className="text-lg font-semibold">Reconciliation - Rekonsiliasi</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, month: 'March 2026', total: 'Rp 1.2B', unmatched: 0, status: 'Completed' },
              { id: 2, month: 'February 2026', total: 'Rp 1.5B', unmatched: 0, status: 'Completed' },
              { id: 3, month: 'January 2026', total: 'Rp 1.1B', unmatched: 2, status: 'Pending' },
            ].map((item) => (
              <div key={item.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.month}</h3>
                    <p className="text-sm text-slate-600">Total: {item.total}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-red-600">{item.unmatched} unmatched transactions</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceOfficerDashboard;
