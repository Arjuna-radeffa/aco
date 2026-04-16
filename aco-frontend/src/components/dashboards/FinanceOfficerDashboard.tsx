import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';

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
              { month: 'April 2026', totalTx: 1245, reconciled: 1242, unreconciled: 3, percentage: 99.8, status: 'Excellent', action: 'Review 3 Pending' },
              { month: 'March 2026', totalTx: 1183, reconciled: 1183, unreconciled: 0, percentage: 100, status: 'Complete', action: 'Closed' },
              { month: 'February 2026', totalTx: 1098, reconciled: 1098, unreconciled: 0, percentage: 100, status: 'Complete', action: 'Closed' },
              { month: 'January 2026', totalTx: 1256, reconciled: 1256, unreconciled: 0, percentage: 100, status: 'Complete', action: 'Closed' },
            ].map((month, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{month.month}</h3>
                    <p className="text-sm text-slate-600">{month.totalTx} Total Transactions</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${month.status === 'Complete' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {month.percentage}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <div className="bg-emerald-50 p-2 rounded">
                    <p className="text-emerald-700 font-semibold">{month.reconciled}</p>
                    <p className="text-emerald-600">Reconciled</p>
                  </div>
                  <div className={`${month.unreconciled === 0 ? 'bg-emerald-50' : 'bg-red-50'} p-2 rounded`}>
                    <p className={`font-semibold ${month.unreconciled === 0 ? 'text-emerald-700' : 'text-red-700'}`}>{month.unreconciled}</p>
                    <p className={month.unreconciled === 0 ? 'text-emerald-600' : 'text-red-600'}>Pending</p>
                  </div>
                  <button className="bg-cyan-100 text-cyan-700 text-xs rounded hover:bg-cyan-200 transition font-semibold">
                    {month.action}
                  </button>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${month.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profit' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="trending_up" size="large" />
            <h2 className="text-lg font-semibold">Profit Calculation - Perhitungan Profit</h2>
          </div>
          <div className="space-y-3">
            {[
              { project: 'Solar Farm Sumatra', revenue: 'Rp 450M', cost: 'Rp 320M', profit: 'Rp 130M', margin: '28.9%', distribution: 'In Process' },
              { project: 'Coffee Export Indonesia', revenue: 'Rp 200M', cost: 'Rp 140M', profit: 'Rp 60M', margin: '30%', distribution: 'Distributed' },
              { project: 'Fishery Collective', revenue: 'Rp 150M', cost: 'Rp 115M', profit: 'Rp 35M', margin: '23.3%', distribution: 'Pending Review' },
              { project: 'AgTech Platform', revenue: 'Rp 300M', cost: 'Rp 210M', profit: 'Rp 90M', margin: '30%', distribution: 'Calculated' },
              { project: 'Textile Cooperative', revenue: 'Rp 180M', cost: 'Rp 135M', profit: 'Rp 45M', margin: '25%', distribution: 'In Process' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.project}</h3>
                    <p className="text-xs text-slate-600">{item.distribution}</p>
                  </div>
                  <span className="text-green-600 font-bold">{item.profit}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-blue-600 font-semibold">{item.revenue}</p>
                    <p className="text-blue-600">Revenue</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <p className="text-red-600 font-semibold">{item.cost}</p>
                    <p className="text-red-600">Cost</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-green-600 font-semibold">{item.margin}</p>
                    <p className="text-green-600">Margin</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'liquidation' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="assignment_return" size="large" />
            <h2 className="text-lg font-semibold">Liquidation - Likuidasi Aset</h2>
          </div>
          <div className="space-y-3">
            {[
              { project: 'Early Coffee Project (Completed)', value: 'Rp 200M', status: 'Completed', investors: 8, returnRate: '12%', maturity: '15 Apr 2026', action: 'Liquidated' },
              { project: 'First Goat Farm (Matured)', value: 'Rp 120M', status: 'Pending', investors: 5, returnRate: '10%', maturity: '10 May 2026', action: 'Process Now' },
              { project: 'Fishery Phase 1', value: 'Rp 150M', status: 'Scheduled', investors: 6, returnRate: '11%', maturity: '30 Jul 2026', action: 'Schedule' },
              { project: 'Early Textile Project', value: 'Rp 80M', status: 'Completed', investors: 4, returnRate: '9%', maturity: '01 Apr 2026', action: 'Liquidated' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.project}</h3>
                    <p className="text-xs text-slate-600">{item.investors} Investors</p>
                  </div>
                  <span className="text-emerald-600 font-bold">{item.value}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs mb-2">
                  <div className={`${item.status === 'Completed' ? 'bg-emerald-50' : item.status === 'Pending' ? 'bg-amber-50' : 'bg-slate-50'} p-2 rounded`}>
                    <p className={`font-semibold ${item.status === 'Completed' ? 'text-emerald-700' : item.status === 'Pending' ? 'text-amber-700' : 'text-slate-700'}`}>{item.status}</p>
                    <p className={item.status === 'Completed' ? 'text-emerald-600' : item.status === 'Pending' ? 'text-amber-600' : 'text-slate-600'}>Status</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <p className="text-purple-600 font-semibold">{item.returnRate}</p>
                    <p className="text-purple-600">Return</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-blue-600 font-semibold text-xs">{item.maturity}</p>
                    <p className="text-blue-600 text-xs">Maturity</p>
                  </div>
                  <button className={`rounded text-xs font-semibold transition ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Pending' ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' : 'bg-slate-100 text-slate-700'}`}>
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceOfficerDashboard;
