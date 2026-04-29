import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Heart,
  TrendingUp,
  Users,
  Building2,
  Calendar,
  Download,
  ArrowLeft,
  Info,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  mockZakatDistributions,
  mockInfaqPrograms,
  mockWaqfSocialAssets,
  ASNAF_TYPES,
  mockAssetConditionReports,
} from '../../data/zisMockData';

interface TransparencyPageProps {
  onBack?: () => void;
}

type ActiveTab = 'zakat' | 'infaq' | 'waqf_social' | 'waqf_productive';

// Sample data for charts
const zakatMonthlyData = [
  { month: 'Jan', collected: 250000000, distributed: 180000000 },
  { month: 'Feb', collected: 300000000, distributed: 210000000 },
  { month: 'Mar', collected: 280000000, distributed: 200000000 },
  { month: 'Apr', collected: 500000000, distributed: 437500000 },
];

const infaqCategoryData = [
  { name: 'Pendidikan', value: 380000000, percentage: 48 },
  { name: 'Kesehatan', value: 625000000, percentage: 31 },
  { name: 'Usaha', value: 195000000, percentage: 12 },
  { name: 'Infrastruktur', value: 130000000, percentage: 9 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];

export const TransparencyPage: React.FC<TransparencyPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('zakat');

  // =========================================================================
  // ZAKAT TAB
  // =========================================================================
  const renderZakatTab = () => {
    const totalCollected = mockZakatDistributions.reduce((sum, d) => sum + d.totalAmount, 0);
    const totalDistributed = mockZakatDistributions.reduce((sum, d) => sum + d.amountAfterAmil, 0);
    const totalAsnafBeneficiaries = mockZakatDistributions.reduce(
      (sum, d) => sum + d.allocations.filter(a => a.allocatedAmount > 0).length,
      0
    );

    const asnafTotals: Record<string, number> = {};
    mockZakatDistributions.forEach(dist => {
      dist.allocations.forEach(alloc => {
        asnafTotals[alloc.asnaf] = (asnafTotals[alloc.asnaf] || 0) + alloc.allocatedAmount;
      });
    });

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-emerald-900 font-medium">Total Zakat Terkumpul</p>
            <p className="text-3xl font-bold text-emerald-700 mt-2">
              Rp {totalCollected.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-emerald-700 mt-1">Seluruh tahun</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-medium">Terdistribusi</p>
            <p className="text-3xl font-bold text-blue-700 mt-2">
              Rp {totalDistributed.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {Math.round((totalDistributed / totalCollected) * 100)}% dari total
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-900 font-medium">Asnaf Terdukung</p>
            <p className="text-3xl font-bold text-purple-700 mt-2">8</p>
            <p className="text-xs text-purple-700 mt-1">Fakir, Miskin, Amil, dll</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-4">
            <p className="text-sm text-pink-900 font-medium">Penerima Manfaat</p>
            <p className="text-3xl font-bold text-pink-700 mt-2">{totalAsnafBeneficiaries}</p>
            <p className="text-xs text-pink-700 mt-1">Kelompok penerima</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tren Bulanan
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={zakatMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(value: any) => `Rp ${(value / 1000000).toFixed(0)}M`} />
                <Legend />
                <Line type="monotone" dataKey="collected" stroke="#10b981" name="Terkumpul" />
                <Line type="monotone" dataKey="distributed" stroke="#3b82f6" name="Terdistribusi" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asnaf Distribution */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Distribusi Asnaf (Terakhir)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(asnafTotals).map(([asnaf, amount]) => ({
                name: ASNAF_TYPES[asnaf as any]?.split(' ')[0] || asnaf,
                amount,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(value: any) => `Rp ${(value / 1000000).toFixed(0)}M`} />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asnaf Table */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Rincian Penerima Asnaf</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-900">Asnaf</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-900">Deskripsi</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-900">Total Alokasi</th>
                  <th className="px-4 py-3 text-center font-medium text-slate-900">% dari Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {Object.entries(ASNAF_TYPES).map(([key, name]) => (
                  <tr key={key} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-900">{name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {key === 'fakir' && 'Sangat miskin tanpa penghasilan'}
                      {key === 'miskin' && 'Miskin dengan pendapatan kurang dari nisab'}
                      {key === 'amil' && 'Pengelola dan pegawai lembaga zakat'}
                      {key === 'muallaf' && 'Baru memeluk agama Islam'}
                      {key === 'riqab' && 'Budak atau tawanan yang ingin merdeka'}
                      {key === 'gharim' && 'Orang yang berutang untuk hal baik'}
                      {key === 'fisabilillah' && 'Pejuang di jalan Allah'}
                      {key === 'ibnu_sabil' && 'Musafir yang terputus dari tujuan'}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      Rp {(asnafTotals[key] || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {Math.round(((asnafTotals[key] || 0) / (totalDistributed || 1)) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distribution History */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Riwayat Distribusi</h3>
          <div className="space-y-3">
            {mockZakatDistributions.map(dist => (
              <div key={dist.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">{dist.distributionDate}</p>
                  <p className="text-xs text-slate-600">{dist.allocations.filter(a => a.allocatedAmount > 0).length} asnaf</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">
                    Rp {dist.amountAfterAmil.toLocaleString('id-ID')}
                  </p>
                  <span className="text-xs text-green-600">✓ Selesai</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // INFAQ TAB
  // =========================================================================
  const renderInfaqTab = () => {
    const activePrograms = mockInfaqPrograms.filter(p => p.status === 'active');
    const totalCollected = mockInfaqPrograms.reduce((sum, p) => sum + p.currentAmount, 0);

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-900 font-medium">Total Terkumpul</p>
            <p className="text-3xl font-bold text-red-700 mt-2">
              Rp {totalCollected.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-900 font-medium">Program Aktif</p>
            <p className="text-3xl font-bold text-orange-700 mt-2">{activePrograms.length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900 font-medium">Penerima Manfaat</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">
              {mockInfaqPrograms.reduce((sum, p) => sum + (p.currentBeneficiaries || 0), 0)}
            </p>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Distribusi Kategori
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <Pie data={infaqCategoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={100}>
              {infaqCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </ResponsiveContainer>
        </div>

        {/* Programs */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Program Infaq Aktif</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockInfaqPrograms.filter(p => !p.isGeneral).map(program => (
              <div key={program.id} className="border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors">
                {program.image && (
                  <img src={program.image} alt={program.name} className="w-full h-40 object-cover" />
                )}
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-slate-900">{program.name}</h4>
                  <p className="text-xs text-slate-600">{program.beneficiaryDescription}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (program.currentAmount / (program.targetAmount || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-600 font-medium">
                      {Math.round((program.currentAmount / (program.targetAmount || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                    <p>
                      Terkumpul: Rp {program.currentAmount.toLocaleString('id-ID')}
                      {program.targetAmount && ` / Rp ${program.targetAmount.toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // WAQF SOCIAL TAB
  // =========================================================================
  const renderWaqfSocialTab = () => {
    const totalAssets = mockWaqfSocialAssets.reduce((sum, a) => sum + a.estimatedValue, 0);
    const totalBeneficiaries = mockWaqfSocialAssets.reduce((sum, a) => {
      const report = mockAssetConditionReports.find(r => r.assetId === a.id);
      return sum + (report?.beneficiariesCount || 0);
    }, 0);

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 rounded-lg p-4">
            <p className="text-sm text-violet-900 font-medium">Total Aset Wakaf</p>
            <p className="text-3xl font-bold text-violet-700 mt-2">
              Rp {totalAssets.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-900 font-medium">Jumlah Aset</p>
            <p className="text-3xl font-bold text-indigo-700 mt-2">{mockWaqfSocialAssets.length}</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-lg p-4">
            <p className="text-sm text-cyan-900 font-medium">Penerima Manfaat</p>
            <p className="text-3xl font-bold text-cyan-700 mt-2">{totalBeneficiaries}</p>
          </div>
        </div>

        {/* Assets List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Aset Wakaf Sosial</h3>
          {mockWaqfSocialAssets.map(asset => {
            const report = mockAssetConditionReports.find(r => r.assetId === asset.id);
            return (
              <div
                key={asset.id}
                className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex gap-4">
                  {asset.images[0] && (
                    <img src={asset.images[0]} alt={asset.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">{asset.name}</h4>
                        <p className="text-xs text-slate-600">{asset.location}</p>
                      </div>
                      <span
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          asset.currentCondition === 'good'
                            ? 'bg-green-100 text-green-700'
                            : asset.currentCondition === 'needs_maintenance'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        )}
                      >
                        {asset.currentCondition === 'good' && '✓ Baik'}
                        {asset.currentCondition === 'needs_maintenance' && '⚠ Perlu Perawatan'}
                        {asset.currentCondition === 'needs_repair' && '🔧 Perlu Perbaikan'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{asset.purpose}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-600">Nilai Estimasi</p>
                        <p className="font-medium text-slate-900">
                          Rp {asset.estimatedValue.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Penerima Manfaat</p>
                        <p className="font-medium text-slate-900">{report?.beneficiariesCount || 0} jiwa</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Laporan Terakhir</p>
                        <p className="font-medium text-slate-900">{asset.conditionReportDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // =========================================================================
  // WAQF PRODUCTIVE TAB
  // =========================================================================
  const renderWaqfProductiveTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-medium text-blue-900">Wakaf Produktif (Bagi Hasil)</p>
          <p className="mt-1">
            Aset wakaf yang dikelola secara produktif dengan pembagian keuntungan sesuai prinsip Shariah
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-900 font-medium">Total Aset Produktif</p>
          <p className="text-3xl font-bold text-green-700 mt-2">Rp 5.2B</p>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-900 font-medium">Laba Tahun Ini</p>
          <p className="text-3xl font-bold text-teal-700 mt-2">Rp 1.4B</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4">
          <p className="text-sm text-emerald-900 font-medium">Distribusi Mustahiq</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">Rp 680M</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Proyek-Proyek Produktif</h3>
        <div className="space-y-3">
          {[
            {
              name: 'Pertokoan Wakaf Masjid Al-Hadi',
              location: 'Jakarta Timur',
              profit: 250000000,
              beneficiaries: 150,
            },
            {
              name: 'Gedung Kantor Wakaf Yayasan',
              location: 'Jakarta Selatan',
              profit: 180000000,
              beneficiaries: 280,
            },
          ].map((project, idx) => (
            <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
              <h4 className="font-medium text-slate-900">{project.name}</h4>
              <p className="text-xs text-slate-600 mt-1">{project.location}</p>
              <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                <div>
                  <p className="text-xs text-slate-600">Keuntungan Q1 2024</p>
                  <p className="font-semibold text-slate-900">
                    Rp {project.profit.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Mustahiq Dibantu</p>
                  <p className="font-semibold text-slate-900">{project.beneficiaries} orang</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // Main Render
  // =========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Transparansi ZIS & Wakaf</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Laporan publik penyaluran zakat, infaq, shadaqah, dan wakaf
                </p>
              </div>
            </div>
            <Heart className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto border-b border-slate-200 pb-0">
          {[
            { id: 'zakat', label: '🕌 Zakat', icon: Heart },
            { id: 'infaq', label: '❤️ Infaq & Shadaqah', icon: Heart },
            { id: 'waqf_social', label: '🏛️ Wakaf Sosial', icon: Building2 },
            { id: 'waqf_productive', label: '📈 Wakaf Produktif', icon: TrendingUp },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={cn(
                'px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'zakat' && renderZakatTab()}
          {activeTab === 'infaq' && renderInfaqTab()}
          {activeTab === 'waqf_social' && renderWaqfSocialTab()}
          {activeTab === 'waqf_productive' && renderWaqfProductiveTab()}

          {/* Download Report */}
          <div className="flex justify-center pt-4">
            <button className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
              <Download className="w-4 h-4" />
              Unduh Laporan Lengkap (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyPage;
