import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';

interface MunfiqDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const MunfiqDashboard: React.FC<MunfiqDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.munfiq || {
    totalDonation: 'Rp 75.5M',
    period: 'Sepanjang Tahun',
    supportedPrograms: 18,
    beneficiaries: '1,250',
    impactScore: '9.2/10',
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon={dashboardIcons.heart} size="large" />
          Munfiq/Mutashadiq Dashboard
        </h1>
        <p className="text-slate-600">Berdonasi untuk program sosial dan lihat dampaknya</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg p-6">
              <div className="text-red-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.heart} /> Total Donasi
              </div>
              <div className="text-2xl font-bold text-red-900">{dashboardData.totalDonation}</div>
              <div className="text-xs text-red-600 mt-2">{dashboardData.period}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-300 rounded-lg p-6">
              <div className="text-pink-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.donor_program} /> Program Didukung
              </div>
              <div className="text-2xl font-bold text-pink-900">{dashboardData.supportedPrograms}</div>
              <div className="text-xs text-pink-600 mt-2">Program Sosial</div>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-300 rounded-lg p-6">
              <div className="text-rose-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.beneficiary} /> Penerima Manfaat
              </div>
              <div className="text-2xl font-bold text-rose-900">{dashboardData.beneficiaries}</div>
              <div className="text-xs text-rose-600 mt-2">Orang</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
              <div className="text-purple-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.impact} /> Impact Score
              </div>
              <div className="text-2xl font-bold text-purple-900">{dashboardData.impactScore}</div>
              <div className="text-xs text-purple-600 mt-2">Sangat Berdampak</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'programs' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="folder_open" /> 
            <h2 className="text-lg font-semibold">Program Donasi</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Program Beasiswa Pendidikan', target: 'Rp 500M', collected: 'Rp 450M', progress: 90, description: 'Bantuan pendidikan untuk anak yatim' },
              { name: 'Rumah Sakit Layanan Gratis', target: 'Rp 800M', collected: 'Rp 600M', progress: 75, description: 'Pemeriksaan kesehatan gratis' },
              { name: 'Modal Usaha Mikro', target: 'Rp 300M', collected: 'Rp 280M', progress: 93, description: 'Bantuan modal untuk UMKM' },
              { name: 'Rumah Tahfiz Al-Quran', target: 'Rp 400M', collected: 'Rp 200M', progress: 50, description: 'Fasilitas belajar Al-Quran' },
            ].map((program, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{program.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{program.description}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>{program.collected} / {program.target}</span>
                  <span className="font-semibold">{program.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: `${program.progress}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'monthly' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="calendar_month" /> 
            <h2 className="text-lg font-semibold">Donasi Bulanan</h2>
          </div>
          <div className="space-y-3">
            {[
              { program: 'Program Beasiswa', amount: 'Rp 5M/bulan', status: 'Active', since: 'Jan 2025' },
              { program: 'Rumah Sakit Gratis', amount: 'Rp 3M/bulan', status: 'Active', since: 'Mar 2025' },
              { program: 'Modal Usaha Mikro', amount: 'Rp 2M/bulan', status: 'Active', since: 'Feb 2025' },
            ].map((recurring, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-900">{recurring.program}</p>
                  <p className="text-xs text-slate-600 mt-1">Sejak: {recurring.since}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{recurring.amount}</p>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{recurring.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'impact' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="trending_up" /> 
            <h2 className="text-lg font-semibold">Dampak Donasi Anda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-3">Statistik Dampak</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Anak Sekolah</span>
                  <span className="font-semibold">450 anak</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Pasien Kesehatan</span>
                  <span className="font-semibold">2,300 orang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">UMKM Berkembang</span>
                  <span className="font-semibold">180 usaha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Al-Quran Hafal</span>
                  <span className="font-semibold">120 hafidz</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-pink-50 border border-pink-300 rounded-lg">
              <p className="font-semibold text-slate-900 mb-3">Cerita Inspiratif</p>
              <div className="text-sm text-slate-700 leading-relaxed italic">
                "Berkat donasi Anda, saya bisa masuk sekolah dan impian menjadi guru akan terwujud. Terima kasih telah percaya pada saya!"
                <br/><br/>
                <span className="font-semibold">- Putri, 14 tahun</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="description" /> 
            <h2 className="text-lg font-semibold">Laporan Donasi</h2>
          </div>
          <div className="space-y-3">
            {[
              { month: 'April 2026', amount: 'Rp 10M', programs: 4, beneficiaries: 850, status: 'Completed' },
              { month: 'Maret 2026', amount: 'Rp 10M', programs: 4, beneficiaries: 920, status: 'Completed' },
              { month: 'Februari 2026', amount: 'Rp 10M', programs: 4, beneficiaries: 780, status: 'Completed' },
              { month: 'Januari 2026', amount: 'Rp 10M', programs: 4, beneficiaries: 950, status: 'Completed' },
            ].map((report, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-900">{report.month} Report</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-600">
                      <span>Donasi: {report.amount}</span>
                      <span>Program: {report.programs}</span>
                      <span>Penerima: {report.beneficiaries} orang</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{report.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MunfiqDashboard;
