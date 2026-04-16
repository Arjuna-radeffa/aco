import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';

interface InvestmentOfficerDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const InvestmentOfficerDashboard: React.FC<InvestmentOfficerDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.investmentOfficer || {
    pipeline: 8,
    approved: 24,
    underDD: 3,
    rejected: 5,
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon={dashboardIcons.chart} size="large" />
          Investment Officer Dashboard
        </h1>
        <p className="text-slate-600">Evaluasi proposal dan rancang skema investasi</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-300 rounded-lg p-6">
              <div className="text-cyan-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.pipeline} /> Pipeline
              </div>
              <div className="text-2xl font-bold text-cyan-900">{dashboardData.pipeline}</div>
              <div className="text-xs text-cyan-600 mt-2">Proposal Menunggu</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
              <div className="text-blue-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.approved} /> Approved
              </div>
              <div className="text-2xl font-bold text-blue-900">{dashboardData.approved}</div>
              <div className="text-xs text-blue-600 mt-2">Tahun Ini</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 rounded-lg p-6">
              <div className="text-amber-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.review} /> Under Due Diligence
              </div>
              <div className="text-2xl font-bold text-amber-900">{dashboardData.underDD}</div>
              <div className="text-xs text-amber-600 mt-2">Active Review</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg p-6">
              <div className="text-red-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.rejected} /> Rejected
              </div>
              <div className="text-2xl font-bold text-red-900">{dashboardData.rejected}</div>
              <div className="text-xs text-red-600 mt-2">Criteria Mismatch</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'pipeline' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon={dashboardIcons.pipeline} size="large" />
            <h2 className="text-lg font-semibold">Deal Pipeline - Proposal Queue</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, company: 'Solar Farm Sumatra', amount: 'Rp 450M', owner: 'Rinto Harahap', stage: 'Dokumentasi', progress: 65 },
              { id: 2, company: 'Coffee Export Indonesia', amount: 'Rp 200M', owner: 'Budi Santoso', stage: 'Awal', progress: 30 },
              { id: 3, company: 'Fishery Collective', amount: 'Rp 150M', owner: 'Siti Nurhaliza', stage: 'Due Diligence', progress: 75 },
              { id: 4, company: 'AgTech Platform', amount: 'Rp 300M', owner: 'Ahmad Wijaya', stage: 'Negosiasi', progress: 50 },
              { id: 5, company: 'Goat Farming Network', amount: 'Rp 120M', owner: 'Farah Indah', stage: 'Awal', progress: 20 },
              { id: 6, company: 'Shea Butter Production', amount: 'Rp 180M', owner: 'Hendra Kusuma', stage: 'Evaluasi', progress: 45 },
              { id: 7, company: 'Textile Cooperative', amount: 'Rp 280M', owner: 'Nurul Azizah', stage: 'Due Diligence', progress: 80 },
              { id: 8, company: 'Organic Spice Trading', amount: 'Rp 95M', owner: 'Bambang Setiawan', stage: 'Awal', progress: 15 },
            ].map((proposal) => (
              <div key={proposal.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{proposal.company}</h3>
                    <p className="text-sm text-slate-600">Owner: {proposal.owner}</p>
                  </div>
                  <span className="text-cyan-600 font-bold">{proposal.amount}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{proposal.stage}</span>
                  <span className="text-xs text-slate-600">{proposal.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${proposal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'duediligence' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon={dashboardIcons.review} size="large" />
            <h2 className="text-lg font-semibold">Due Diligence - Verifikasi Deal</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, company: 'Fishery Collective', status: 'In Progress', completeness: 75, documents: 15, issues: 2 },
              { id: 2, company: 'Textile Cooperative', status: 'In Progress', completeness: 80, documents: 18, issues: 1 },
              { id: 3, company: 'Coffee Export Indonesia', status: 'Not Started', completeness: 0, documents: 0, issues: 0 },
              { id: 4, company: 'Solar Farm Sumatra', status: 'Completed', completeness: 100, documents: 25, issues: 0 },
            ].map((dd) => (
              <div key={dd.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{dd.company}</h3>
                    <p className="text-sm text-slate-600">DD Status: {dd.status}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${dd.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : dd.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                    {dd.completeness}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <span className="text-blue-700 font-semibold">{dd.documents}</span>
                    <p className="text-blue-600">Documents</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-red-700 font-semibold">{dd.issues}</span>
                    <p className="text-red-600">Issues</p>
                  </div>
                  <button className="bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200 transition font-semibold">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'scheme' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="architecture" size="large" />
            <h2 className="text-lg font-semibold">Scheme Designer - Desain Struktur</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Murabaha Scheme', type: 'Cost Plus', projects: 12, investors: 45, returns: '8-10%' },
              { name: 'Musharaka Scheme', type: 'Partnership', projects: 8, investors: 32, returns: '12-15%' },
              { name: 'Ijarah Scheme', type: 'Lease', projects: 5, investors: 18, returns: '7-9%' },
              { name: 'Wakaf Scheme', type: 'Endowment', projects: 3, investors: 12, returns: '5-6%' },
              { name: 'Qard Scheme', type: 'Interest-Free Loan', projects: 6, investors: 20, returns: 'Charity' },
              { name: 'Hybrid Scheme', type: 'Mixed', projects: 4, investors: 15, returns: '10-12%' },
            ].map((scheme, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{scheme.name}</h3>
                    <p className="text-xs text-slate-600">{scheme.type}</p>
                  </div>
                  <span className="text-purple-600 font-bold">{scheme.returns}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div className="bg-purple-50 p-2 rounded">
                    <p className="text-purple-600 font-semibold">{scheme.projects}</p>
                    <p className="text-purple-600">Projects</p>
                  </div>
                  <div className="bg-indigo-50 p-2 rounded">
                    <p className="text-indigo-600 font-semibold">{scheme.investors}</p>
                    <p className="text-indigo-600">Investors</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'committee' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon={dashboardIcons.people} size="large" />
            <h2 className="text-lg font-semibold">Committee Recom - Rekomendasi Komite</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, proposal: 'Solar Farm Sumatra', committee: 'Investment Committee', recommendation: 'Approved', vote: '5/5', date: '12 Apr 2026' },
              { id: 2, proposal: 'Fishery Collective', committee: 'Risk Committee', recommendation: 'Approved with Conditions', vote: '4/5', date: '11 Apr 2026' },
              { id: 3, proposal: 'Coffee Export Indonesia', committee: 'Investment Committee', recommendation: 'Pending Review', vote: '2/5', date: '10 Apr 2026' },
              { id: 4, proposal: 'AgTech Platform', committee: 'Innovation Committee', recommendation: 'Approved', vote: '5/5', date: '09 Apr 2026' },
            ].map((item) => (
              <div key={item.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.proposal}</h3>
                    <p className="text-sm text-slate-600">{item.committee}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.recommendation === 'Approved' ? 'bg-emerald-100 text-emerald-700' : item.recommendation === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.recommendation}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Vote: {item.vote}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentOfficerDashboard;
