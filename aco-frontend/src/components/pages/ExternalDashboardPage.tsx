import React, { useState } from 'react';
import {
  TrendingUp, Heart, FileText, BarChart3, User,
  ArrowRight, CheckCircle2, Clock, AlertCircle,
  ChevronDown, ChevronRight, Building2, Shield, Download
} from 'lucide-react';
import { mockParticipations, Participation } from '../../data/participationMockData';

interface ExternalDashboardPageProps {
  currentUser: any;
  onKycClick: () => void;
  onBrowseClick: () => void;
  onViewParticipation: (id: string) => void;
}

type TabId = 'investasi' | 'wakaf_uang' | 'wakaf_aset';

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const statusColors: Record<string, string> = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Selesai': 'bg-slate-100 text-slate-600',
  'Gagal': 'bg-red-100 text-red-700',
  'Menunggu Tindak Lanjut ACO': 'bg-amber-100 text-amber-700',
  'Dalam Proses': 'bg-blue-100 text-blue-700',
};

const ExternalDashboardPage: React.FC<ExternalDashboardPageProps> = ({
  currentUser, onKycClick, onBrowseClick, onViewParticipation
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('investasi');

  const name = currentUser?.name || 'Pengguna';
  const kycStatus: 'Terverifikasi' | 'Menunggu Review' | 'Belum Diajukan' =
    currentUser?.kycVerified ? 'Terverifikasi' : 'Belum Diajukan';

  const kycBadge = {
    'Terverifikasi': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Menunggu Review': 'bg-amber-100 text-amber-700 border-amber-200',
    'Belum Diajukan': 'bg-slate-100 text-slate-500 border-slate-200',
  }[kycStatus];

  const investments = mockParticipations.filter(p => p.type === 'investasi');
  const waqfMoney = mockParticipations.filter(p => p.type === 'wakaf_uang');
  const waqfAsset = mockParticipations.filter(p => p.type === 'wakaf_aset');

  const totalInvestasi = investments.reduce((s, p) => s + p.nominal, 0);
  const totalProfit = investments.reduce((s, p) => s + (p.totalProfit || 0), 0);
  const totalWakaf = waqfMoney.reduce((s, p) => s + p.nominal, 0);
  const totalPartisipasi = mockParticipations.length;

  const tabs: { id: TabId; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'investasi', label: 'Investasi', icon: <TrendingUp size={16} />, count: investments.length },
    { id: 'wakaf_uang', label: 'Wakaf Uang', icon: <Heart size={16} />, count: waqfMoney.length },
    { id: 'wakaf_aset', label: 'Wakaf Aset', icon: <Building2 size={16} />, count: waqfAsset.length },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400 font-medium">Dashboard Saya</p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                Halo, {name.split(' ')[0]}! 👋
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${kycBadge}`}>
                {kycStatus === 'Terverifikasi' ? '✓' : '○'} KYC: {kycStatus}
              </span>
              {kycStatus !== 'Terverifikasi' && (
                <button
                  onClick={onKycClick}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all"
                >
                  Lengkapi KYC
                </button>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { label: 'Total Investasi Aktif', val: formatRp(totalInvestasi), icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Bagi Hasil Diterima', val: formatRp(totalProfit), icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Total Wakaf Uang', val: formatRp(totalWakaf), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Partisipasi Aktif', val: String(totalPartisipasi), icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                <p className="text-xl font-black text-slate-900">{card.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm mb-8 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon} {tab.label}
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Investasi Tab */}
        {activeTab === 'investasi' && (
          <div className="space-y-5">
            {investments.length === 0 ? (
              <EmptyState label="investasi" onBrowse={onBrowseClick} />
            ) : (
              investments.map(p => (
                <div
                  key={p.id}
                  onClick={() => onViewParticipation(p.id)}
                  className="bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${statusColors[p.status] || 'bg-slate-100 text-slate-500'}`}>
                          {p.status}
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase">Investasi</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg truncate group-hover:text-indigo-700 transition-colors">{p.projectTitle}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">Sejak {p.date} · Ref: {p.referenceNumber}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">{formatRp(p.nominal)}</p>
                      <p className="text-xs text-emerald-600 font-black">+{formatRp(p.totalProfit || 0)} bagi hasil</p>
                    </div>
                  </div>
                  {!p.disbursed && (
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-xl">
                        Dana belum disalurkan — dapat ditarik
                      </span>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Wakaf Uang Tab */}
        {activeTab === 'wakaf_uang' && (
          <div className="space-y-5">
            {waqfMoney.length === 0 ? (
              <EmptyState label="wakaf uang" onBrowse={onBrowseClick} />
            ) : (
              waqfMoney.map(p => (
                <div
                  key={p.id}
                  onClick={() => onViewParticipation(p.id)}
                  className="bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${statusColors[p.status] || 'bg-slate-100'}`}>
                          {p.status}
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase">Wakaf Uang</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg truncate group-hover:text-emerald-700 transition-colors">{p.projectTitle}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">Sejak {p.date}</p>
                      {p.impactReports && p.impactReports.length > 0 && (
                        <p className="text-xs text-emerald-600 font-bold mt-2">
                          📋 {p.impactReports.length} laporan dampak tersedia
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-slate-900">{formatRp(p.nominal)}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase mt-1">Permanen · Tidak Dapat Ditarik</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Wakaf Aset Tab */}
        {activeTab === 'wakaf_aset' && (
          <div className="space-y-5">
            {waqfAsset.length === 0 ? (
              <EmptyState label="wakaf aset" onBrowse={onBrowseClick} />
            ) : (
              waqfAsset.map(p => (
                <div
                  key={p.id}
                  onClick={() => onViewParticipation(p.id)}
                  className="bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${statusColors[p.status] || 'bg-slate-100'}`}>
                          {p.status}
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase">Wakaf Aset · {p.assetType}</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg truncate group-hover:text-blue-700 transition-colors">{p.projectTitle}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">{p.assetDetail}</p>
                      <p className="text-xs text-slate-400 font-medium">Diajukan: {p.date}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors mt-2 shrink-0" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ label: string; onBrowse: () => void }> = ({ label, onBrowse }) => (
  <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100">
    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <FileText size={28} className="text-slate-300" />
    </div>
    <p className="font-black text-slate-400 mb-2">Belum ada {label}</p>
    <p className="text-sm text-slate-400 mb-6">Mulai partisipasi dengan menjelajahi proyek kami.</p>
    <button
      onClick={onBrowse}
      className="px-8 py-3.5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
    >
      Browse Katalog <ArrowRight size={16} />
    </button>
  </div>
);

export default ExternalDashboardPage;
