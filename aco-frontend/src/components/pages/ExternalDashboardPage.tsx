import React, { useState } from 'react';
import {
  TrendingUp, Heart, FileText, BarChart3, User,
  ArrowRight, CheckCircle2, Clock, AlertCircle,
  ChevronDown, ChevronRight, Building2, Shield, Download, Zap, Gift, Users
} from 'lucide-react';
import { mockParticipations, Participation } from '../../data/participationMockData';
import { mockInfaqPrograms, mockZakatDistributions, mockWaqfSocialAssets } from '../../data/zisMockData';

interface ExternalDashboardPageProps {
  currentUser: any;
  onKycClick: () => void;
  onBrowseClick: () => void;
  onViewParticipation: (id: string) => void;
}

type TabId = 'investasi' | 'wakaf_uang' | 'wakaf_aset' | 'zakat' | 'infaq' | 'waqf' | 'assistance';

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const statusColors: Record<string, string> = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Selesai': 'bg-slate-100 text-slate-600',
  'Gagal': 'bg-red-100 text-red-700',
  'Menunggu Tindak Lanjut ACO': 'bg-amber-100 text-amber-700',
  'Dalam Proses': 'bg-blue-100 text-blue-700',
  'active': 'bg-emerald-100 text-emerald-700',
  'target_met': 'bg-blue-100 text-blue-700',
};

const roleLabels: Record<string, string> = {
  'muzakki': '🕌 Muzakki (Pembayar Zakat)',
  'infaq_donor': '❤️ Donatur Infaq & Shadaqah',
  'waqf_donor': '🏛️ Wakif (Penyumbang Wakaf)',
  'mustahiq': '🤝 Mustahiq (Penerima Bantuan)',
  'investor_micro': '📈 Investor Mikro',
};

const ExternalDashboardPage: React.FC<ExternalDashboardPageProps> = ({
  currentUser, onKycClick, onBrowseClick, onViewParticipation
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('investasi');

  const name = currentUser?.name || 'Pengguna';
  const role = currentUser?.role || 'external_user';
  const kycStatus: 'Terverifikasi' | 'Menunggu Review' | 'Belum Diajukan' =
    currentUser?.kycVerified ? 'Terverifikasi' : 'Belum Diajukan';

  const kycBadge = {
    'Terverifikasi': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Menunggu Review': 'bg-amber-100 text-amber-700 border-amber-200',
    'Belum Diajukan': 'bg-slate-100 text-slate-500 border-slate-200',
  }[kycStatus];

  // === DETERMINE TABS BASED ON ROLE ===
  const getTabsForRole = () => {
    if (role === 'muzakki') {
      return [{ id: 'zakat' as TabId, label: '🕌 Pembayaran Zakat', icon: <Zap size={16} />, count: 3 }];
    }
    if (role === 'infaq_donor') {
      return [{ id: 'infaq' as TabId, label: '❤️ Infaq & Shadaqah', icon: <Heart size={16} />, count: 4 }];
    }
    if (role === 'waqf_donor') {
      return [{ id: 'waqf' as TabId, label: '🏛️ Wakaf Saya', icon: <Building2 size={16} />, count: 2 }];
    }
    if (role === 'mustahiq') {
      return [{ id: 'assistance' as TabId, label: '🤝 Bantuan yang Diterima', icon: <Gift size={16} />, count: 5 }];
    }
    // Default investor view
    const investments = mockParticipations.filter(p => p.type === 'investasi');
    const waqfMoney = mockParticipations.filter(p => p.type === 'wakaf_uang');
    const waqfAsset = mockParticipations.filter(p => p.type === 'wakaf_aset');
    return [
      { id: 'investasi' as TabId, label: 'Investasi', icon: <TrendingUp size={16} />, count: investments.length },
      { id: 'wakaf_uang' as TabId, label: 'Wakaf Uang', icon: <Heart size={16} />, count: waqfMoney.length },
      { id: 'wakaf_aset' as TabId, label: 'Wakaf Aset', icon: <Building2 size={16} />, count: waqfAsset.length },
    ];
  };

  const tabs = getTabsForRole();
  const defaultTab = tabs.length > 0 ? tabs[0].id : 'investasi';

  // === GET SUMMARY DATA ===
  const getSummaryCards = () => {
    if (role === 'muzakki') {
      return [
        { label: 'Total Zakat Dibayar', val: 'Rp 25.000.000', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Dibayarkan Tahun Ini', val: 'Rp 10.000.000', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Asnaf Terbantu', val: '4 Kategori', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Status KYC', val: kycStatus, icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
      ];
    }
    if (role === 'infaq_donor') {
      return [
        { label: 'Total Donasi Infaq', val: 'Rp 15.000.000', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Program Aktif', val: '4 Program', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Penerima Manfaat', val: '2,500+ Orang', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Periode Donasi', val: 'Jan - Apr 2024', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      ];
    }
    if (role === 'waqf_donor') {
      return [
        { label: 'Nilai Total Wakaf', val: 'Rp 500.000.000', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Aset yang Dikelola', val: '2 Aset', icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Benefisiari Aktif', val: '1,200+ Orang', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Keuntungan Tahun Ini', val: 'Rp 45.000.000', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      ];
    }
    if (role === 'mustahiq') {
      return [
        { label: 'Total Bantuan Diterima', val: 'Rp 8.000.000', icon: Gift, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Bantuan Aktif', val: '3 Program', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Perlengkapan Sekolah', val: 'Rp 2.000.000', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Status Verifikasi', val: kycStatus, icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
      ];
    }
    // Default investor
    const investments = mockParticipations.filter(p => p.type === 'investasi');
    const totalInvestasi = investments.reduce((s, p) => s + p.nominal, 0);
    const totalProfit = investments.reduce((s, p) => s + (p.totalProfit || 0), 0);
    const waqfMoney = mockParticipations.filter(p => p.type === 'wakaf_uang');
    const totalWakaf = waqfMoney.reduce((s, p) => s + p.nominal, 0);
    return [
      { label: 'Total Investasi Aktif', val: formatRp(totalInvestasi), icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { label: 'Bagi Hasil Diterima', val: formatRp(totalProfit), icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Total Wakaf Uang', val: formatRp(totalWakaf), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Partisipasi Aktif', val: String(mockParticipations.length), icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];
  };

  const summaryCards = getSummaryCards();

  // === SET DEFAULT TAB ===
  const currentTab = tabs.some(t => t.id === activeTab) ? activeTab : defaultTab;

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
            {summaryCards.map((card, i) => (
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
                currentTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon} {tab.label}
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${currentTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ZIS TABS */}
        {/* Zakat Tab (Muzakki) */}
        {currentTab === 'zakat' && (
          <div className="space-y-5">
            <div className="bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm">
              <h3 className="font-black text-slate-900 text-lg mb-4">📋 Riwayat Pembayaran Zakat</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Pembayaran Zakat Fitrah 2024</p>
                    <p className="text-sm text-slate-400">10 April 2024</p>
                  </div>
                  <p className="font-black text-emerald-600 text-lg">Rp 750.000</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Pembayaran Zakat Maal Riwayat 1</p>
                    <p className="text-sm text-slate-400">15 Februari 2024</p>
                  </div>
                  <p className="font-black text-emerald-600 text-lg">Rp 5.000.000</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Pembayaran Zakat Maal Riwayat 2</p>
                    <p className="text-sm text-slate-400">20 Januari 2024</p>
                  </div>
                  <p className="font-black text-emerald-600 text-lg">Rp 4.250.000</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Infaq Tab (Infaq Donor) */}
        {currentTab === 'infaq' && (
          <div className="space-y-5">
            {mockInfaqPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex gap-6">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${statusColors[program.status] || 'bg-slate-100'}`}>
                        {program.status}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">{program.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{program.description}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Terkumpul</p>
                        <p className="font-black text-emerald-600">{formatRp(program.currentAmount)}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Penerima</p>
                        <p className="font-black text-slate-900">{program.currentBeneficiaries}+ orang</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Waqf Tab (Waqf Donor) */}
        {currentTab === 'waqf' && (
          <div className="space-y-5">
            {mockWaqfSocialAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">{asset.assetName}</h3>
                    <p className="text-sm text-slate-600">{asset.location}</p>
                  </div>
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 uppercase">
                    {asset.assetType}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Nilai Aset</p>
                    <p className="font-black text-slate-900">{formatRp(asset.assetValue)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Kondisi</p>
                    <p className="font-black text-emerald-600">{asset.condition}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Penerima Manfaat</p>
                    <p className="font-black text-slate-900">{asset.beneficiaries}+ orang</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assistance Tab (Mustahiq) */}
        {currentTab === 'assistance' && (
          <div className="space-y-5">
            <div className="bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm">
              <h3 className="font-black text-slate-900 text-lg mb-4">🎓 Bantuan Pendidikan</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div>
                    <p className="font-bold text-slate-900">Beasiswa Tahun Ajaran 2024</p>
                    <p className="text-sm text-slate-400">Dari Program Pendidikan Anak Yatim</p>
                  </div>
                  <p className="font-black text-emerald-600 text-lg">Rp 2.000.000</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div>
                    <p className="font-bold text-slate-900">Bantuan Kesehatan</p>
                    <p className="text-sm text-slate-400">Pemeriksaan kesehatan gratis</p>
                  </div>
                  <p className="font-black text-blue-600 text-lg">Rp 500.000</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div>
                    <p className="font-bold text-slate-900">Santunan Rutin</p>
                    <p className="text-sm text-slate-400">Bantuan bulanan dari Dana Infaq Umum</p>
                  </div>
                  <p className="font-black text-purple-600 text-lg">Rp 300.000/bulan</p>
                </div>
              </div>
              <button className="w-full py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all">
                📋 Lihat Detail Bantuan
              </button>
            </div>
          </div>
        )}

        {/* Investasi Tab */}
        {currentTab === 'investasi' && (
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
        {currentTab === 'wakaf_uang' && (
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
        {currentTab === 'wakaf_aset' && (
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
