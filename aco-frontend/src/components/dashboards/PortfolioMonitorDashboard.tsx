import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';

interface PortfolioMonitorDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const PortfolioMonitorDashboard: React.FC<PortfolioMonitorDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.portfolioMonitor || {
    healthy: 18,
    caution: 4,
    critical: 2,
    avgHealth: '82%',
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon="visibility" size="large" />
          Portfolio Monitor Dashboard
        </h1>
        <p className="text-slate-600">Monitor kesehatan bisnis dan deteksi anomali</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-300 rounded-lg p-6">
              <div className="text-teal-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.healthy} /> Healthy
              </div>
              <div className="text-2xl font-bold text-teal-900">{dashboardData.healthy}</div>
              <div className="text-xs text-teal-600 mt-2">Projects</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 rounded-lg p-6">
              <div className="text-amber-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.warning} /> Caution
              </div>
              <div className="text-2xl font-bold text-amber-900">{dashboardData.caution}</div>
              <div className="text-xs text-amber-600 mt-2">Needs Review</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg p-6">
              <div className="text-red-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.critical} /> Critical
              </div>
              <div className="text-2xl font-bold text-red-900">{dashboardData.critical}</div>
              <div className="text-xs text-red-600 mt-2">Intervention</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
              <div className="text-purple-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.health} /> Avg Health
              </div>
              <div className="text-2xl font-bold text-purple-900">{dashboardData.avgHealth}</div>
              <div className="text-xs text-purple-600 mt-2">Score</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'monitor' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="health_and_safety" size="large" />
            <h2 className="text-lg font-semibold">Monitor Bisnis - Health Check</h2>
          </div>
          <div className="space-y-3">
            {[
              { project: 'Solar Farm Sumatra', health: 95, revenue: '↑12%', issues: 0, status: 'Excellent' },
              { project: 'Coffee Export Indonesia', health: 88, revenue: '↑8%', issues: 0, status: 'Healthy' },
              { project: 'Fishery Collective', health: 72, revenue: '↓2%', issues: 2, status: 'Caution' },
              { project: 'AgTech Platform', health: 91, revenue: '↑15%', issues: 0, status: 'Healthy' },
              { project: 'Goat Farming Network', health: 65, revenue: '↓5%', issues: 3, status: 'Warning' },
              { project: 'Textile Cooperative', health: 78, revenue: '→0%', issues: 1, status: 'Monitor' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.project}</h3>
                    <p className="text-sm text-slate-600">Status: {item.status}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${item.health >= 85 ? 'text-teal-600' : item.health >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                      {item.health}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-emerald-50 p-2 rounded">
                    <span className="text-emerald-700 font-semibold">{item.revenue}</span>
                    <p className="text-emerald-600">Revenue YoY</p>
                  </div>
                  <div className={`${item.issues === 0 ? 'bg-emerald-50' : 'bg-red-50'} p-2 rounded`}>
                    <span className={`font-semibold ${item.issues === 0 ? 'text-emerald-700' : 'text-red-700'}`}>{item.issues}</span>
                    <p className={item.issues === 0 ? 'text-emerald-600' : 'text-red-600'}>Open Issues</p>
                  </div>
                  <button className="bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200 transition font-semibold text-xs">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'anomaly' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="notifications_active" size="large" />
            <h2 className="text-lg font-semibold">Anomaly Detection - Deteksi Issue</h2>
          </div>
          <div className="space-y-3">
            {[
              { date: '13 Apr 2026', project: 'Goat Farming Network', type: 'Revenue Drop', severity: 'High', change: '-8%', action: 'Needs Intervention' },
              { date: '13 Apr 2026', project: 'Fishery Collective', type: 'Expense Spike', severity: 'Medium', change: '+15%', action: 'Review Costs' },
              { date: '12 Apr 2026', project: 'Textile Cooperative', type: 'KPI Miss', severity: 'Medium', change: '-3%', action: 'Monitor' },
              { date: '11 Apr 2026', project: 'Coffee Export Indonesia', type: 'Volume Increase', severity: 'Low', change: '+5%', action: 'Positive Trend' },
              { date: '10 Apr 2026', project: 'Solar Farm Sumatra', type: 'Rate Anomaly', severity: 'Low', change: '+2%', action: 'Normal Variation' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.project}</h3>
                    <p className="text-sm text-slate-600">{item.type}</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${item.severity === 'High' ? 'bg-red-100 text-red-700' : item.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {item.severity}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>{item.change} Change</span>
                  <span>{item.action}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'intervention' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="engineering" size="large" />
            <h2 className="text-lg font-semibold">Intervention Plan - Aksi Korektif</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, project: 'Goat Farming Network', issue: 'Revenue Decline', plan: 'Market Expansion', owner: 'Rinto Harahap', deadline: '30 May 2026', status: 'In Progress', progress: 45 },
              { id: 2, project: 'Fishery Collective', issue: 'Cost Overrun', plan: 'Process Optimization', owner: 'Tari Suryani', deadline: '22 May 2026', status: 'In Progress', progress: 60 },
              { id: 3, project: 'Textile Cooperative', issue: 'KPI Miss', plan: 'Productivity Program', owner: 'Ahmad Wijaya', deadline: '15 Jun 2026', status: 'Planning', progress: 20 },
              { id: 4, project: 'Coffee Export Indonesia', issue: 'QC Issue', plan: 'Quality Audit', owner: 'Siti Nurhaliza', deadline: '25 Apr 2026', status: 'Completed', progress: 100 },
            ].map((item) => (
              <div key={item.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.project}</h3>
                    <p className="text-sm text-slate-600">{item.issue} → {item.plan}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Owner: {item.owner}</span>
                  <span>Deadline: {item.deadline}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="assessment" size="large" />
            <h2 className="text-lg font-semibold">Final Reports - Laporan Hasil</h2>
          </div>
          <div className="space-y-3">
            {[
              { month: 'March 2026', healthyCount: 18, cautionCount: 3, criticalCount: 1, avgScore: '84%', file: 'Portfolio_Report_Mar2026.pdf' },
              { month: 'February 2026', healthyCount: 19, cautionCount: 2, criticalCount: 1, avgScore: '85%', file: 'Portfolio_Report_Feb2026.pdf' },
              { month: 'January 2026', healthyCount: 17, cautionCount: 4, criticalCount: 2, avgScore: '80%', file: 'Portfolio_Report_Jan2026.pdf' },
              { month: 'December 2025', healthyCount: 16, cautionCount: 5, criticalCount: 2, avgScore: '78%', file: 'Portfolio_Report_Dec2025.pdf' },
            ].map((report, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-slate-900">{report.month}</h3>
                  <span className="text-purple-600 font-bold">{report.avgScore} Avg</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
                  <div className="bg-teal-50 p-2 rounded">
                    <p className="text-teal-600 font-semibold">{report.healthyCount}</p>
                    <p className="text-teal-600">Healthy</p>
                  </div>
                  <div className="bg-amber-50 p-2 rounded">
                    <p className="text-amber-600 font-semibold">{report.cautionCount}</p>
                    <p className="text-amber-600">Caution</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <p className="text-red-600 font-semibold">{report.criticalCount}</p>
                    <p className="text-red-600">Critical</p>
                  </div>
                  <button className="bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition font-semibold text-xs flex items-center justify-center gap-1">
                    <MaterialIcon icon="download" />
                    View
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

export default PortfolioMonitorDashboard;
