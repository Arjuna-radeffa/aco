import React, { useState } from 'react';
import { ArrowLeft, Shield, Heart, CheckCircle2, QrCode, CreditCard, Info, User, Mail, Wallet } from 'lucide-react';
import { mockZakatProjects } from '../../data/zakatMockData';
import { cn } from '../../utils/cn';

interface ZakatDetailPageProps {
  projectId: string;
  onBack: () => void;
}

const NIAT_DATA: Record<string, { arabic: string; latin: string; translation: string }> = {
  'Fitrah': {
    arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِيْ فَرْضًا لِلّٰهِ تَعَالَى',
    latin: "Nawaitu an ukhrija zakaatal fithri 'an nafsii fardhan lillaahi ta'aalaa.",
    translation: 'Aku niat mengeluarkan zakat fitrah untuk diriku sendiri, fardu karena Allah Ta’ala.'
  },
  'Default': {
    arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ مَالِيْ فَرْضًا لِلّٰهِ تَعَالَى',
    latin: "Nawaitu an ukhrija zakaatal maali fardhan lillaahi ta'aalaa.",
    translation: 'Aku niat mengeluarkan zakat hartaku, fardu karena Allah Ta’ala.'
  }
};

const ZakatDetailPage: React.FC<ZakatDetailPageProps> = ({ projectId, onBack }) => {
  const project = mockZakatProjects.find(p => p.id === projectId);
  const [step, setStep] = useState<'form' | 'qris'>('form');
  const [hasReadNiat, setHasReadNiat] = useState(false);
  const [formData, setFormData] = useState({
    amount: project?.minDonation.toString() || '100000',
    name: '',
    email: '',
    phone: ''
  });

  if (!project) return <div>Project not found</div>;

  const niat = NIAT_DATA[project.type] || NIAT_DATA['Default'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasReadNiat) return;
    setStep('qris');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-black uppercase text-[10px] tracking-widest transition-all">
            <ArrowLeft size={16} /> Kembali
          </button>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black italic">A</div>
             <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">Zakat <span className="text-emerald-600">Detail</span></span>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left: Project Details (2 columns) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 relative group aspect-video">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="px-4 py-1.5 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                  Verified Zakat {project.type}
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase italic">{project.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Impact Score', value: `${project.impactScore}/100`, icon: Shield, color: 'text-emerald-600' },
                { label: 'Beneficiaries', value: project.targetBeneficiaries.toLocaleString(), icon: CheckCircle2, color: 'text-blue-600' },
                { label: 'Shariah Status', value: 'SYARIAH', icon: Heart, color: 'text-rose-600' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 text-center shadow-sm">
                  <item.icon className={cn("mx-auto mb-2", item.color)} size={20} />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 uppercase italic">
                 <Info className="text-emerald-500" size={24} /> Tentang Program
               </h3>
               <p className="text-slate-600 leading-relaxed font-medium mb-8 text-lg">
                 {project.description} Setiap dana yang Anda salurkan akan dikelola secara profesional dan transparan melalui ekosistem ACO Platform untuk menjangkau mereka yang paling membutuhkan sesuai syariat Islam.
               </p>
               <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4 italic">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                    <Shield size={20} />
                  </div>
                  <p className="text-sm text-emerald-800 font-bold leading-relaxed uppercase tracking-tight">
                    "Program ini telah melalui verifikasi Dewan Pengawas Syariah untuk memastikan ketepatan sasaran 8 Asnaf Penerima Zakat."
                  </p>
               </div>
            </div>

            {/* Kabar Terkini / Updates */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2 uppercase italic">
                 <CheckCircle2 className="text-blue-500" size={24} /> Kabar Terkini Penyaluran
               </h3>
               <div className="space-y-8">
                  {[
                    { date: '24 Apr 2026', title: 'Pendistribusian Tahap I Selesai', desc: 'Dana zakat telah disalurkan kepada 120 penerima manfaat di wilayah Jawa Barat dalam bentuk paket sembako.' },
                    { date: '18 Apr 2026', title: 'Verifikasi Data Mustahiq', desc: 'Tim lapangan telah menyelesaikan verifikasi faktual untuk calon penerima manfaat kluster pendidikan.' }
                  ].map((update, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-slate-100 last:border-0 pb-2">
                       <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-emerald-500 rounded-full" />
                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{update.date}</p>
                       <h4 className="text-slate-900 font-bold mb-2">{update.title}</h4>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">{update.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* List Muzakki (Donors) */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2 uppercase italic">
                 <Heart className="text-rose-500" size={24} /> Muzakki Terkini
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Arjuna Radeffa', amount: 500000, time: '2 jam lalu' },
                    { name: 'Budi Santoso', amount: 1000000, time: '5 jam lalu' },
                    { name: 'Citra Kirana', amount: 250000, time: '12 jam lalu' },
                    { name: 'Dedi Cahyadi', amount: 150000, time: '1 hari lalu' },
                  ].map((muzakki, i) => {
                    const censoredName = muzakki.name.substring(0, 3) + 'xxxx' + (muzakki.name.split(' ').length > 1 ? ' ' + muzakki.name.split(' ')[1].substring(0, 1) + 'xxx' : '');
                    return (
                      <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                               <User size={18} />
                            </div>
                            <div>
                               <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{censoredName}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{muzakki.time}</p>
                            </div>
                         </div>
                         <p className="text-xs font-black text-emerald-600 italic">Rp {muzakki.amount.toLocaleString()}</p>
                      </div>
                    );
                  })}
               </div>
            </div>
          </div>

          {/* Right: Payment Sidebar (1 column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              {/* Niat Box */}
              <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 italic">Niat Zakat {project.type}</h4>
                <p className="text-2xl font-bold mb-4 text-right italic leading-relaxed" dir="rtl">{niat.arabic}</p>
                <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed border-t border-white/10 pt-4 mb-2">{niat.latin}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic leading-relaxed mb-6">"{niat.translation}"</p>
                
                <label className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all group">
                   <input 
                     type="checkbox" 
                     checked={hasReadNiat}
                     onChange={(e) => setHasReadNiat(e.target.checked)}
                     className="w-5 h-5 rounded-lg accent-emerald-500 cursor-pointer"
                   />
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300">Saya sudah membaca niat</span>
                </label>
              </div>

              {/* Payment Form Card */}
              <div className={cn(
                "bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 transition-all",
                !hasReadNiat && step === 'form' ? "opacity-50 grayscale pointer-events-none" : ""
              )}>
                {!hasReadNiat && step === 'form' && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-10 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100">
                      Baca Niat Terlebih Dahulu
                    </p>
                  </div>
                )}
                {step === 'form' ? (
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nominal Zakat</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                        <input 
                          type="number" 
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-black text-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap (Muzakki)</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Fulan bin Fulan"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Konfirmasi</label>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">Opsional</span>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          name="email"
                          placeholder="email@anda.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">Opsional</span>
                      </div>
                      <div className="relative">
                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="0812xxxx"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 uppercase text-xs tracking-widest active:scale-95 group"
                    >
                      Lanjutkan Pembayaran <CreditCard size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                       <button onClick={() => setStep('form')} className="text-[10px] font-black text-slate-400 uppercase hover:text-emerald-600 transition-colors">Edit Data</button>
                       <span className="text-[10px] font-black text-emerald-600 uppercase">QRIS Payment</span>
                    </div>
                    
                    <div className="bg-white p-6 border-2 border-slate-100 rounded-[2rem] inline-block shadow-inner relative overflow-hidden group">
                       <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="w-48 h-48 bg-slate-50 flex items-center justify-center border border-slate-100 rounded-xl relative">
                          <QrCode size={120} className="text-slate-900" />
                          {/* Mock scanning animation */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-bounce" />
                       </div>
                    </div>

                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Bayar</p>
                       <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Rp {parseInt(formData.amount).toLocaleString()}</h3>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">Order ID</span>
                          <span className="text-slate-900">ACO-ZAK-{Math.floor(Math.random()*9000)+1000}</span>
                       </div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">Expired In</span>
                          <span className="text-rose-500">23:59:59</span>
                       </div>
                    </div>

                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                      Silakan scan kode QR di atas menggunakan aplikasi mobile banking atau e-wallet Anda.
                    </p>

                    <button 
                      onClick={() => window.location.reload()}
                      className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all text-[10px] uppercase tracking-widest"
                    >
                      Konfirmasi Sudah Bayar
                    </button>
                  </div>
                )}
              </div>

              {/* Secure Info */}
              <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                 <Shield size={12} className="text-emerald-500" /> Transaksi Terenkripsi & Aman
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatDetailPage;
