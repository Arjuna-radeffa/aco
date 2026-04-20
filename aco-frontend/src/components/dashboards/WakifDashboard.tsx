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
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-8">
              <MaterialIcon icon="trending_up" /> 
              <h2 className="text-lg font-semibold">Distribusi Hasil & Dampak Sosial</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider italic">Mauquf Alaih (Beneficiaries)</h3>
                <div className="space-y-4 font-bold">
                  {[
                    { label: 'Pendidikan Santri', value: '45%', color: 'bg-blue-600' },
                    { label: 'Pemberdayaan Ekonomi', value: '35%', color: 'bg-emerald-500' },
                    { label: 'Kesehatan Masyarakat', value: '20%', color: 'bg-purple-500' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[10px] uppercase mb-1">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-slate-100">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: item.value }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <h3 className="text-sm font-bold text-blue-800 mb-4 uppercase tracking-wider">Yield Performance</h3>
                <div className="text-center py-4">
                  <p className="text-4xl font-black text-blue-900 tracking-tighter">Rp 12.4M</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Average Monthly Surplus</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { month: 'April 2026', yield: 'Rp 7.5M', distributed: 'Rp 7.5M', status: 'Lunas', schemes: 4 },
                { month: 'Maret 2026', yield: 'Rp 7.3M', distributed: 'Rp 7.3M', status: 'Lunas', schemes: 4 },
              ].map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-slate-900">{item.month}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Penyaluran Berkah • {item.schemes} Skema Aktif</p>
                    </div>
                    <span className="text-[10px] font-black px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase italic">{item.status}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mt-4 border-t border-slate-100 pt-3">
                    <span>Total Surplus: <span className="font-bold">{item.yield}</span></span>
                    <span className="font-black text-blue-600">Disalurkan: {item.distributed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'protection' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-8">
              <MaterialIcon icon="security" /> 
              <h2 className="text-lg font-semibold">Sertifikasi & Status Lahan</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <MaterialIcon icon="verified" size="large" />
                </div>
                <h3 className="text-sm font-bold text-emerald-800 mb-4 uppercase tracking-wider">Status Sertifikat AIW</h3>
                <div className="space-y-3 text-xs font-bold">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-100">
                    <MaterialIcon icon="check_circle" size="small" />
                    <span>Akta Ikrar Wakaf (AIW) Terbit</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-100">
                    <MaterialIcon icon="check_circle" size="small" />
                    <span>Nadzir Terverifikasi BWI</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider italic">Utilization Ratio</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-black text-slate-900 leading-none">92%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Productive</span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-slate-100">
                  <div className="bg-blue-600 h-full w-[92%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-2xl">
              <p className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MaterialIcon icon="description" size="small" />
                Cloud Documentation
              </p>
              <div className="space-y-2">
                {['Sertifikat Wakaf (SHM)', 'Surat Ikrar Wakaf resmi', 'Sertifikat Asuransi Syariah', 'Laporan Audit Syariah 2025'].map((doc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 text-xs hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all font-bold">
                    <span className="text-slate-600">{doc}</span>
                    <button className="text-blue-600 font-black hover:text-blue-800 flex items-center gap-1 active:scale-95">
                      <MaterialIcon icon="download" size="small" />
                      DOWNLOAD
                    </button>
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
