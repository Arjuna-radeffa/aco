import React, { useState } from 'react';
import { api } from '../services/api';
import { Send, Plus, Trash2, Edit2, Save } from 'lucide-react';

interface FormProps {
  user: any;
  token: string;
  onSuccess: () => void;
}

export const RoleBasedForms: React.FC<FormProps> = ({ user, token, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 1. PROJECT OWNER FORM: Create Project
  const ProjectOwnerForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      businessName: '',
      category: 'Peternakan',
      targetFunding: 0,
      description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await api.createProject(formData, token);
        setMessage('Proyek berhasil diajukan!');
        onSuccess();
      } catch (err: any) {
        setMessage('Error: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Buat Proposal Proyek Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Proyek</label>
            <input type="text" className="w-full p-2.5 bg-slate-50 border rounded-xl" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nama Bisnis</label>
            <input type="text" className="w-full p-2.5 bg-slate-50 border rounded-xl" required value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Kategori</label>
            <select className="w-full p-2.5 bg-slate-50 border rounded-xl" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>Peternakan</option><option>Pertanian</option><option>F&B</option><option>Fashion</option><option>Teknologi</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Target Pendanaan (IDR)</label>
            <input type="number" className="w-full p-2.5 bg-slate-50 border rounded-xl" required value={formData.targetFunding} onChange={e => setFormData({...formData, targetFunding: Number(e.target.value)})} />
          </div>
          <div className="col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Deskripsi Proyek</label>
            <textarea className="w-full p-2.5 bg-slate-50 border rounded-xl" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
          <Send size={18} /> {isLoading ? 'Mengirim...' : 'Kirim Proposal'}
        </button>
      </form>
    );
  };

  // 2. MUZAKKI / MUNFIQ / WAKIF FORM: Payment Form
  const PaymentForm = () => {
    const [formData, setFormData] = useState({
      amount: 0,
      type: user.role === 'muzakki' ? 'zakat' : user.role === 'wakif' ? 'waqf' : 'infaq',
      notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await api.post('/zakat/pay', formData, token);
        setMessage(`${formData.type.toUpperCase()} berhasil dibayarkan!`);
        onSuccess();
      } catch (err: any) {
        setMessage('Error: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Pembayaran {formData.type.toUpperCase()} Baru</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Jumlah (IDR)</label>
            <input type="number" className="w-full p-3 bg-slate-50 border rounded-xl text-lg font-bold" required value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Catatan / Niat</label>
            <textarea className="w-full p-2.5 bg-slate-50 border rounded-xl" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Opsional"></textarea>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
          <Save size={18} /> {isLoading ? 'Memproses...' : 'Proses Pembayaran'}
        </button>
      </form>
    );
  };

  // 3. ADMIN FORM: Manage Homepage Projects
  const AdminProjectForm = () => {
     const [projects, setProjects] = useState<any[]>([]);
     const [isFetching, setIsFetching] = useState(false);
     const [showForm, setShowForm] = useState(false);
     const [editProject, setEditProject] = useState<any>(null);

     const fetchProjects = async () => {
       setIsFetching(true);
       try {
         const data = await api.getProjects(token);
         setProjects(data);
       } catch (err) {}
       setIsFetching(false);
     };

     React.useEffect(() => { fetchProjects(); }, []);

     const [formData, setFormData] = useState({
       name: '', businessName: '', category: 'F&B', targetFunding: 0, status: 'active'
     });

     const handleSave = async (e: React.FormEvent) => {
       e.preventDefault();
       setIsLoading(true);
       try {
         if (editProject) {
            await api.updateProject(editProject.id, formData, token);
         } else {
            await api.createProject(formData, token);
         }
         setMessage('Project updated/created!');
         setShowForm(false);
         setEditProject(null);
         fetchProjects();
         onSuccess();
       } catch (err: any) {
         setMessage('Error: ' + err.message);
       } finally {
         setIsLoading(false);
       }
     };

     return (
       <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
         <div className="flex justify-between items-center border-b pb-2 mb-4">
           <h3 className="text-lg font-bold text-slate-900">Manage Homepage Projects</h3>
           <button onClick={() => { setShowForm(true); setEditProject(null); setFormData({name:'', businessName:'', category:'F&B', targetFunding:0, status:'active'}); }} className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-sm font-bold">
             <Plus size={16} /> Add Project
           </button>
         </div>

         {showForm && (
           <form onSubmit={handleSave} className="mb-8 p-4 bg-slate-50 rounded-xl border border-blue-100 space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <input placeholder="Project Name" className="p-2 bg-white border rounded-lg" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} required />
               <input placeholder="Business Name" className="p-2 bg-white border rounded-lg" value={formData.businessName} onChange={e=>setFormData({...formData, businessName:e.target.value})} required />
               <select className="p-2 bg-white border rounded-lg" value={formData.category} onChange={e=>setFormData({...formData, category:e.target.value})}>
                 <option>F&B</option><option>Peternakan</option><option>Fashion</option>
               </select>
               <input type="number" placeholder="Target Funding" className="p-2 bg-white border rounded-lg" value={formData.targetFunding} onChange={e=>setFormData({...formData, targetFunding:Number(e.target.value)})} required />
               <select className="p-2 bg-white border rounded-lg" value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})}>
                 <option>active</option><option>draft</option><option>funded</option>
               </select>
             </div>
             <div className="flex gap-2">
               <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">Save</button>
               <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg font-bold">Cancel</button>
             </div>
           </form>
         )}

         <div className="space-y-2 max-h-60 overflow-y-auto">
           {projects.map((p: any) => (
             <div key={p.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
               <div>
                 <div className="font-bold text-slate-900">{p.name}</div>
                 <div className="text-xs text-slate-500">{p.businessName} • {p.status}</div>
               </div>
               <div className="flex gap-2">
                 <button onClick={() => { setEditProject(p); setFormData({name:p.name, businessName:p.businessName, category:p.category, targetFunding:p.targetFunding, status:p.status}); setShowForm(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                   <Edit2 size={16} />
                 </button>
               </div>
             </div>
           ))}
         </div>
       </div>
     );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 mb-10">
      {message && (
        <div className={`p-4 rounded-xl border ${message.includes('Error') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
          {message}
        </div>
      )}
      
      {user.role === 'project_owner' && <ProjectOwnerForm />}
      {(user.role === 'muzakki' || user.role === 'munfiq_mutashadiq' || user.role === 'wakif') && <PaymentForm />}
      {user.role === 'admin' && <AdminProjectForm />}
      
      {user.role.includes('investor') && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Investasi Baru</h3>
          <p className="text-slate-500 text-sm mb-4 italic">Pilih proyek aktif di marketplace untuk melakukan investasi.</p>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Buka Marketplace</button>
        </div>
      )}
    </div>
  );
};
