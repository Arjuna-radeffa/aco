import React, { useState, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, Upload, X, CheckCircle2,
  AlertCircle, Clock, ShieldCheck, FileImage, Camera
} from 'lucide-react';

interface KycUploadPageProps {
  currentUser: any;
  onBack: () => void;
}

type KycStatus = 'Belum Diajukan' | 'Menunggu Review' | 'Ditolak' | 'Terverifikasi';

const KycUploadPage: React.FC<KycUploadPageProps> = ({ currentUser, onBack }) => {
  const [kycStatus] = useState<KycStatus>('Belum Diajukan');
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [npwpFile, setNpwpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const ktpRef = useRef<HTMLInputElement>(null);
  const npwpRef = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);

  const handleFile = (setter: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size <= 5 * 1024 * 1024) setter(f);
    else if (f) alert('Ukuran file maksimal 5MB');
  };

  const StatusBanner = () => {
    const configs: Record<KycStatus, { bg: string; icon: React.ReactNode; text: string; note?: string }> = {
      'Belum Diajukan': {
        bg: 'bg-slate-50 border-slate-200',
        icon: <AlertCircle size={20} className="text-slate-400" />,
        text: 'Status KYC: Belum Diajukan',
        note: 'Lengkapi dokumen di bawah untuk memulai verifikasi identitas Anda.'
      },
      'Menunggu Review': {
        bg: 'bg-amber-50 border-amber-200',
        icon: <Clock size={20} className="text-amber-500" />,
        text: 'Status KYC: Menunggu Review',
        note: 'Dokumen Anda sedang ditinjau oleh tim ACO. Proses biasanya 1-2 hari kerja.'
      },
      'Ditolak': {
        bg: 'bg-red-50 border-red-200',
        icon: <X size={20} className="text-red-500" />,
        text: 'Status KYC: Ditolak',
        note: 'Alasan: Foto KTP tidak terbaca jelas. Silakan upload ulang dengan kualitas yang lebih baik.'
      },
      'Terverifikasi': {
        bg: 'bg-emerald-50 border-emerald-200',
        icon: <CheckCircle2 size={20} className="text-emerald-500" />,
        text: 'Status KYC: Terverifikasi',
        note: 'Identitas Anda telah diverifikasi. Anda dapat berpartisipasi dalam semua proyek.'
      }
    };
    const cfg = configs[kycStatus];
    return (
      <div className={`p-5 rounded-2xl border ${cfg.bg} flex items-start gap-3 mb-8`}>
        <div className="shrink-0 mt-0.5">{cfg.icon}</div>
        <div>
          <p className="font-black text-slate-900 text-sm">{cfg.text}</p>
          {cfg.note && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cfg.note}</p>}
        </div>
      </div>
    );
  };

  const FileUploadBox: React.FC<{
    label: string; required?: boolean; file: File | null;
    onUpload: () => void; onClear: () => void; inputRef: React.RefObject<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
  }> = ({ label, required, file, onUpload, onClear, inputRef, onChange, icon }) => (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {label}
        </label>
        {required && <span className="text-[9px] font-black text-red-500 uppercase">Wajib</span>}
        {!required && <span className="text-[9px] font-black text-slate-300 uppercase">Opsional</span>}
      </div>
      {file ? (
        <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-emerald-800 truncate">{file.name}</p>
            <p className="text-[10px] text-emerald-600">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button onClick={onClear} className="text-slate-400 hover:text-red-500 transition-colors shrink-0">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="w-full p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 group"
        >
          <Upload size={20} />
          <span className="text-sm font-bold">Klik untuk upload (JPG/PNG/PDF max 5MB)</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={onChange} />
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-14 max-w-md w-full shadow-xl text-center">
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock size={48} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Pengajuan Terkirim!</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Dokumen KYC Anda sedang ditinjau oleh tim ACO. Proses verifikasi biasanya memakan waktu <strong>1-2 hari kerja</strong>.
          </p>
          <button onClick={onBack} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            Kembali <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-black text-slate-900 text-lg tracking-tight">Verifikasi KYC</h1>
            <p className="text-xs text-slate-400 font-medium">Identitas & Dokumen</p>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">
        <StatusBanner />

        {/* Info Section */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h3 className="font-black text-indigo-900 mb-2 flex items-center gap-2">
            <ShieldCheck size={18} /> Mengapa KYC Diperlukan?
          </h3>
          <p className="text-sm text-indigo-700 leading-relaxed">
            Verifikasi identitas diperlukan untuk keamanan transaksi, kepatuhan regulasi OJK, dan memastikan
            setiap partisipasi tercatat atas nama yang sah. Setelah terverifikasi, Anda dapat investasi dan berwakaf
            di semua proyek aktif.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
          <h2 className="text-xl font-black text-slate-900">Upload Dokumen</h2>

          <FileUploadBox
            label="Foto KTP" required
            file={ktpFile} icon={<FileImage size={20} />}
            onUpload={() => ktpRef.current?.click()}
            onClear={() => setKtpFile(null)}
            inputRef={ktpRef as React.RefObject<HTMLInputElement>}
            onChange={handleFile(setKtpFile)}
          />

          {/* KTP Guide */}
          <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-500 leading-relaxed">
            <p className="font-black text-slate-700 mb-1">Panduan Foto KTP:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ Seluruh kartu terlihat dalam frame</li>
              <li>✓ Teks terbaca jelas, tidak blur</li>
              <li>✓ Tidak ada pantulan cahaya / glare</li>
              <li>✓ Format JPG/PNG/PDF, max 5MB</li>
            </ul>
          </div>

          <FileUploadBox
            label="NPWP"
            file={npwpFile} icon={<FileImage size={20} />}
            onUpload={() => npwpRef.current?.click()}
            onClear={() => setNpwpFile(null)}
            inputRef={npwpRef as React.RefObject<HTMLInputElement>}
            onChange={handleFile(setNpwpFile)}
          />

          <FileUploadBox
            label="Selfie dengan KTP"
            file={selfieFile} icon={<Camera size={20} />}
            onUpload={() => selfieRef.current?.click()}
            onClear={() => setSelfieFile(null)}
            inputRef={selfieRef as React.RefObject<HTMLInputElement>}
            onChange={handleFile(setSelfieFile)}
          />

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => alert('Draft disimpan!')}
              className="flex-1 py-4 border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all"
            >
              Simpan Draft
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!ktpFile}
              className={`flex-1 py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                ktpFile
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Ajukan untuk Verifikasi <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 mb-3">Konfirmasi Pengajuan</h3>
            <p className="text-slate-500 leading-relaxed mb-8 text-sm">
              Pastikan semua dokumen yang Anda upload sudah benar dan terbaca sebelum mengajukan. Setelah diajukan, dokumen tidak dapat diubah sampai review selesai.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3.5 border-2 border-slate-200 font-black rounded-2xl hover:bg-slate-50 transition-all text-slate-700">
                Batal
              </button>
              <button
                onClick={() => { setShowConfirm(false); setSubmitted(true); }}
                className="flex-1 py-3.5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all"
              >
                Ajukan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycUploadPage;
