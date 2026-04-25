import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, Building2, Heart, Download, FileText, ChevronRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockParticipations } from '../../data/participationMockData';

interface ParticipationDetailPageProps {
  participationId: string;
  onBack: () => void;
}

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const statusColors: Record<string, string> = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Selesai': 'bg-slate-100 text-slate-600',
  'Gagal': 'bg-red-100 text-red-700',
  'Menunggu Tindak Lanjut ACO': 'bg-amber-100 text-amber-700',
  'Dalam Proses': 'bg-blue-100 text-blue-700',
};

const ParticipationDetailPage: React.FC<ParticipationDetailPageProps> = ({ participationId, onBack }) => {
  const p = mockParticipations.find(x => x.id === participationId) || mockParticipations[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="font-black text-slate-900 text-lg tracking-tight truncate">{p.projectTitle}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${statusColors[p.status] || 'bg-slate-100'}`}>
                {p.status}
              </span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {p.type === 'investasi' ? 'Investasi' : p.type === 'wakaf_uang' ? 'Wakaf Uang' : 'Wakaf Aset'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Ringkasan Section */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-8">Ringkasan Partisipasi</h2>
          <div className="space-y-4">
            {[
              ['Nominal Partisipasi', formatRp(p.nominal)],
              ['Tanggal Konfirmasi', p.date],
              ['Nomor Referensi', p.referenceNumber],
              ['Jenis Partisipasi', p.type === 'investasi' ? 'Investasi' : p.type === 'wakaf_uang' ? 'Wakaf Uang' : 'Wakaf Aset'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-start py-3 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500 font-medium">{k}</span>
                <span className="text-sm font-black text-slate-900 text-right max-w-[60%] font-mono">{v}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert('Download PDF bukti partisipasi (simulasi)')}
            className="mt-6 w-full py-4 border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Download size={16} /> Download Bukti Partisipasi
          </button>
        </div>

        {/* Investasi Section */}
        {p.type === 'investasi' && (
          <>
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-8">Detail Investasi</h2>
              <div className="space-y-4 mb-8">
                {[
                  ['Porsi Kepemilikan', `${p.ownershipPercent}%`],
                  ['Skema Bagi Hasil', p.profitSharingScheme || '-'],
                  ['Status Penyaluran Dana', p.disbursed ? 'Sudah Disalurkan' : 'Belum Disalurkan'],
                  ['Total Bagi Hasil Diterima', formatRp(p.totalProfit || 0)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{k}</span>
                    <span className={`text-sm font-black text-right ${k === 'Status Penyaluran Dana' && !p.disbursed ? 'text-amber-600' : 'text-slate-900'}`}>{v}</span>
                  </div>
                ))}
              </div>

              {!p.disbursed && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 mb-6">
                  <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">Dana Anda belum disalurkan ke proyek. Anda masih dapat menarik dana ini.</p>
                </div>
              )}

              {!p.disbursed && (
                <button
                  onClick={() => alert('Konfirmasi penarikan dana (simulasi)')}
                  className="w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  Tarik Dana
                </button>
              )}
            </div>

            {/* Riwayat Bagi Hasil */}
            {p.profitHistory && p.profitHistory.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-8">Riwayat Bagi Hasil</h2>
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Periode</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Nominal</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Transfer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {p.profitHistory.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{row.period}</td>
                          <td className="px-6 py-4 text-right font-black text-emerald-600">{formatRp(row.nominal)}</td>
                          <td className="px-6 py-4 text-right text-slate-500 font-medium">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Wakaf Uang Section */}
        {p.type === 'wakaf_uang' && p.impactReports && (
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-8">Laporan Dampak</h2>
            <div className="space-y-6 relative">
              <div className="absolute left-5 top-2 bottom-0 w-0.5 bg-slate-100"></div>
              {p.impactReports.map((r, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 z-10 shadow-sm">
                    <Heart size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{r.date}</p>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{r.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wakaf Aset Section */}
        {p.type === 'wakaf_aset' && (
          <>
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-8">Detail Aset</h2>
              <div className="space-y-3">
                {[
                  ['Jenis Aset', p.assetType || '-'],
                  ['Detail', p.assetDetail || '-'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{k}</span>
                    <span className="text-sm font-black text-slate-900 text-right max-w-[60%]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {p.statusHistory && (
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-8">Riwayat Status</h2>
                <div className="space-y-6 relative">
                  <div className="absolute left-5 top-2 bottom-0 w-0.5 bg-slate-100"></div>
                  {p.statusHistory.map((s, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 z-10 shadow-sm">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.date}</p>
                        <p className="font-bold text-slate-900 text-sm mb-1">{s.status}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{s.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ParticipationDetailPage;
