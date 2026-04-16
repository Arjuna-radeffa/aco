import React from 'react';
import { MaterialIcon, dashboardIcons } from './IconHelper';
import { RoleBasedForms } from '../RoleBasedForms';

interface MustahiqDashboardProps {
  activeTab: string;
  data?: any;
  token?: string;
  onRefresh?: () => void;
  user?: any;
}

const MustahiqDashboard: React.FC<MustahiqDashboardProps> = ({ activeTab, data, token, onRefresh, user }) => {
  const dashboardData = data?.mustahiq || {
    totalReceived: 'Rp 18.5M',
    period: 'Tahun Ini',
    programsJoined: 5,
    progress: '45%',
    rating: '9/10',
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MaterialIcon icon="favorite" size="large" />
          Mustahiq Dashboard
        </h1>
        <p className="text-slate-600">Terima manfaat dan ikuti program pemberdayaan</p>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-300 rounded-lg p-6">
              <div className="text-rose-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.gift} /> Total Diterima
              </div>
              <div className="text-2xl font-bold text-rose-900">{dashboardData.totalReceived}</div>
              <div className="text-xs text-rose-600 mt-2">{dashboardData.period}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-300 rounded-lg p-6">
              <div className="text-pink-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.program} /> Program Diikuti
              </div>
              <div className="text-2xl font-bold text-pink-900">{dashboardData.programsJoined}</div>
              <div className="text-xs text-pink-600 mt-2">Pemberdayaan</div>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 border border-fuchsia-300 rounded-lg p-6">
              <div className="text-fuchsia-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.trending} /> Progress
              </div>
              <div className="text-2xl font-bold text-fuchsia-900">{dashboardData.progress}</div>
              <div className="text-xs text-fuchsia-600 mt-2">Menuju Swamandiri</div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-300 rounded-lg p-6">
              <div className="text-violet-600 text-sm font-semibold mb-1 flex items-center gap-1">
                <MaterialIcon icon={dashboardIcons.star} /> Rating
              </div>
              <div className="text-2xl font-bold text-violet-900">{dashboardData.rating}</div>
              <div className="text-xs text-violet-600 mt-2">Komunitas</div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'benefits' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="card_giftcard" /> 
            <h2 className="text-lg font-semibold">Manfaat Diterima</h2>
          </div>
          <div className="space-y-3">
            {[
              { type: 'Bantuan Pangan', amount: 'Rp 2M', received: '2026-05-10', status: 'Received', beneficiary: 'Program Zakat' },
              { type: 'Beasiswa Pendidikan', amount: 'Rp 3.5M', received: '2026-04-15', status: 'Received', beneficiary: 'Program Beasiswa' },
              { type: 'Bantuan Modal Usaha', amount: 'Rp 10M', received: '2026-03-20', status: 'Received', beneficiary: 'Wakaf Produktif' },
              { type: 'Biaya Kesehatan', amount: 'Rp 1.5M', received: '2026-02-28', status: 'Received', beneficiary: 'Wakaf Rumah Sakit' },
            ].map((benefit, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{benefit.type}</p>
                    <p className="text-xs text-slate-600 mt-1">Dari: {benefit.beneficiary}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{benefit.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Diterima: {benefit.received}</span>
                  <span className="font-semibold text-emerald-600">{benefit.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'programs' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="school" /> 
            <h2 className="text-lg font-semibold">Program Pemberdayaan</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Pelatihan Jahit & Bordir', duration: '3 bulan', completion: 85, instructor: 'Bu Ratna', status: 'Active' },
              { name: 'Kursus Tata Boga', duration: '2 bulan', completion: 100, instructor: 'Bu Siti', status: 'Completed' },
              { name: 'Pelatihan Digital Marketing', duration: '4 bulan', completion: 45, instructor: 'Pak Budi', status: 'Active' },
              { name: 'Kelas Literasi Keuangan', duration: '2 bulan', completion: 60, instructor: 'Bu Ani', status: 'Active' },
            ].map((program, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{program.name}</p>
                    <p className="text-xs text-slate-600 mt-1">Instruktur: {program.instructor} | Durasi: {program.duration}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    program.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>{program.status}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${program.completion}%`}}></div>
                </div>
                <p className="text-xs text-slate-600 mt-1">{program.completion}% Selesai</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="trending_up" /> 
            <h2 className="text-lg font-semibold">Progress Menuju Swamandiri</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-3">Tahap Pemberdayaan</p>
              <div className="space-y-3">
                {[
                  { stage: '1. Identifikasi Potensi', status: 'Completed' },
                  { stage: '2. Pelatihan Keterampilan', status: 'Completed' },
                  { stage: '3. Pendampingan Bisnis', status: 'In Progress' },
                  { stage: '4. Modal Usaha', status: 'Planned' },
                  { stage: '5. Mandiri Finansial', status: 'Planned' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-300'
                    }`}>
                      {item.status === 'Completed' ? '✓' : item.status === 'In Progress' ? '→' : '○'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{item.stage}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
              <p className="font-semibold text-slate-900 mb-2">Target Jangka Panjang</p>
              <p className="text-sm text-slate-700">Anda dalam track yang baik menuju kemandirian finansial. Dengan melanjutkan program hingga tahap 5, Anda diproyeksikan dapat lepas dari kategori mustahiq dalam 18 bulan ke depan.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'upgrade' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon icon="trending_up" /> 
            <h2 className="text-lg font-semibold">Upgrade ke Status Investor</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg bg-amber-50">
              <p className="font-semibold text-slate-900 mb-2">Persyaratan Upgrade</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="text-emerald-600"><MaterialIcon icon="check_circle" /></div>
                  <span className="text-slate-700">Telah menyelesaikan 2+ program pemberdayaan ✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-emerald-600"><MaterialIcon icon="check_circle" /></div>
                  <span className="text-slate-700">Memiliki usaha/gaji stabil ✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-slate-400"><MaterialIcon icon="radio_button_unchecked" /></div>
                  <span className="text-slate-700">Surplus keuangan minimal 3 bulan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-slate-400"><MaterialIcon icon="radio_button_unchecked" /></div>
                  <span className="text-slate-700">Keluarga tidak lagi kategori mustahiq</span>
                </div>
              </div>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="font-semibold text-slate-900 mb-2">Progress Upgrade</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">3 dari 4 syarat terpenuhi</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">Ajukan Upgrade ke Investor Micro</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MustahiqDashboard;
