import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';

interface WakifDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const WakifDashboard: React.FC<WakifDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.wakif || {
    totalWakaf: 'Rp 500M',
    schemes: '3 Skema Produktif',
    monthlyYield: 'Rp 15M/bulan',
    beneficiaries: 850,
    insurance: 'Asuransi',
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon={dashboardIcons.wakif} size="large" />
          Wakif Dashboard
        </h1>
        <p className="text-slate-600">Kelola wakaf produktif untuk dampak sosial berkelanjutan</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-300 rounded-lg p-6">
              <div className="text-indigo-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.building} /> Total Wakaf
              </div>
              <div className="text-2xl font-bold text-indigo-900">{dashboardData.totalWakaf}</div>
              <div className="text-xs text-indigo-600 mt-2">{dashboardData.schemes}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
              <div className="text-blue-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.chart} /> Hasil Wakaf
              </div>
              <div className="text-2xl font-bold text-blue-900">{dashboardData.monthlyYield}</div>
              <div className="text-xs text-blue-600 mt-2">Monthly Yield</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded-lg p-6">
              <div className="text-emerald-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.people} /> Penerima Manfaat
              </div>
              <div className="text-2xl font-bold text-emerald-900">{dashboardData.beneficiaries}</div>
              <div className="text-xs text-emerald-600 mt-2">Orang</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
              <div className="text-purple-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.shield} /> Perlindungan
              </div>
              <div className="text-2xl font-bold text-purple-900 flex items-center gap-1">
                <MaterialIcon icon="check_circle" /> {dashboardData.insurance}
              </div>
              <div className="text-xs text-purple-600 mt-2">Terlindungi</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'register' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="add" /> 
            <h2 className="text-lg font-semibold">Daftarkan Wakaf Baru</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <p className="font-semibold text-slate-900 mb-3">Informasi Wakaf</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Jenis Wakaf</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>Tanah/Properti</option>
                    <option>Bangunan/Kios</option>
                    <option>Uang Tunai</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Nilai Wakaf</label>
                  <input type="text" placeholder="Rp 0" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-sm text-slate-600 block mb-1">Penerima Manfaat</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>Program Pendidikan</option>
                    <option>Program Kesehatan</option>
                    <option>Program Keagamaan</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">Daftarkan Wakaf</button>
          </div>
        </div>
      )}

      {activeTab === 'scheme' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="schema" /> 
            <h2 className="text-lg font-semibold">Skema Wakaf Produktif</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Wakaf Tanah Pertanian', yield: 'Rp 1.5M/bulan', beneficiary: '120 keluarga', status: 'Active' },
              { name: 'Wakaf Kios Perdagangan', yield: 'Rp 2M/bulan', beneficiary: '50 pedagang', status: 'Active' },
              { name: 'Wakaf Rumah Sakit', yield: 'Rp 3M/bulan', beneficiary: '500 pasien/bulan', status: 'Active' },
              { name: 'Wakaf Pesantren', yield: 'Rp 1M/bulan', beneficiary: '200 santri', status: 'Active' },
            ].map((scheme, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{scheme.name}</p>
                    <p className="text-xs text-slate-600 mt-1">Penerima: {scheme.beneficiary}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{scheme.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Hasil Bulanan</span>
                  <span className="font-semibold text-blue-600">{scheme.yield}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'yield' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="trending_up" /> 
            <h2 className="text-lg font-semibold">Hasil Wakaf Bulanan</h2>
          </div>
          <div className="space-y-3">
            {[
              { month: 'April 2026', yield: 'Rp 7.5M', distributed: 'Rp 7.5M', status: 'Completed', schemes: 4 },
              { month: 'Maret 2026', yield: 'Rp 7.3M', distributed: 'Rp 7.3M', status: 'Completed', schemes: 4 },
              { month: 'Februari 2026', yield: 'Rp 7.2M', distributed: 'Rp 7.2M', status: 'Completed', schemes: 4 },
              { month: 'Januari 2026', yield: 'Rp 7.5M', distributed: 'Rp 7.5M', status: 'Completed', schemes: 4 },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{item.month}</p>
                    <p className="text-xs text-slate-600 mt-1">Dari {item.schemes} skema wakaf produktif</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{item.status}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Hasil: {item.yield}</span>
                  <span className="font-semibold">Disalurkan: {item.distributed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'protection' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="security" /> 
            <h2 className="text-lg font-semibold">Perlindungan Aset Wakaf</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg bg-emerald-50">
              <p className="font-semibold text-slate-900 mb-2">Status Perlindungan</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Asuransi Harta</span>
                  <span className="font-semibold text-emerald-600">✓ Tertanggung</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sertifikat Wakaf</span>
                  <span className="font-semibold text-emerald-600">✓ Terverifikasi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Penjaga Amanah</span>
                  <span className="font-semibold text-emerald-600">✓ Ditunjuk</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Surat Ikrar</span>
                  <span className="font-semibold text-emerald-600">✓ Terdokumentasi</span>
                </div>
              </div>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-2">Dokumen Perlindungan</p>
              <div className="space-y-2">
                {['Sertifikat Wakaf', 'Surat Ikrar Wakaf', 'Sertifikat Asuransi', 'Laporan Audit Tahunan'].map((doc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 text-sm hover:bg-slate-50 rounded">
                    <span className="text-slate-600">{doc}</span>
                    <button className="text-blue-600 font-semibold text-xs hover:text-blue-700">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WakifDashboard;
