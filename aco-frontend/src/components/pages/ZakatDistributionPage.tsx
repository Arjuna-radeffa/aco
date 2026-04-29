import React, { useState } from 'react';
import {
  ArrowLeft,
  Wallet,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  DollarSign,
  Info,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  mockZakatDistributions,
  ASNAF_TYPES,
  mockZISPlatformConfig,
} from '../../data/zisMockData';
import { ZakatDistribution } from '../../types/zisTypes';

interface ZakatDistributionPageProps {
  onBack?: () => void;
}

type ViewMode = 'form' | 'history';

interface DistributionForm {
  totalAmount: number;
  amilPercentage: number;
  allocations: Array<{
    asnaf: string;
    allocatedAmount: number;
    recipientName: string;
    description: string;
  }>;
  notes: string;
}

export const ZakatDistributionPage: React.FC<ZakatDistributionPageProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('form');
  const [distributions, setDistributions] = useState<ZakatDistribution[]>(mockZakatDistributions);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [form, setForm] = useState<DistributionForm>({
    totalAmount: 500000000,
    amilPercentage: mockZISPlatformConfig.zakatConfig.amilPercentage,
    allocations: Object.entries(ASNAF_TYPES).map(([key, name]) => ({
      asnaf: key,
      allocatedAmount: 0,
      recipientName: '',
      description: '',
    })),
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // =========================================================================
  // Calculations
  // =========================================================================
  const amilAmount = form.totalAmount * (form.amilPercentage / 100);
  const amountAfterAmil = form.totalAmount - amilAmount;
  const totalAllocated = form.allocations.reduce((sum, a) => sum + a.allocatedAmount, 0);
  const remainingAmount = amountAfterAmil - totalAllocated;
  const amilPercentageOfGross = (amilAmount / form.totalAmount) * 100;

  // =========================================================================
  // Form Validation
  // =========================================================================
  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (form.totalAmount <= 0) {
      newErrors.totalAmount = 'Total harus lebih dari 0';
    }

    if (form.amilPercentage < 0 || form.amilPercentage > 12.5) {
      newErrors.amilPercentage = 'Amil fee maksimal 12.5%';
    }

    if (totalAllocated !== amountAfterAmil) {
      newErrors.allocations = `Total alokasi harus sama dengan jumlah setelah amil (Rp ${amountAfterAmil.toLocaleString('id-ID')})`;
    }

    form.allocations.forEach((alloc, idx) => {
      if (alloc.allocatedAmount > 0 && !alloc.recipientName) {
        newErrors[`recipient-${idx}`] = 'Nama penerima wajib diisi jika ada alokasi';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================================================================
  // Form Render
  // =========================================================================
  const renderFormView = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-medium text-blue-900">Distribusi Zakat ke 8 Asnaf</p>
          <p className="mt-1">
            Asalkan tidak melebihi 12.5% untuk fee amil dan minimal 50% untuk mustahiq
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Total Zakat Terkumpul
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={form.totalAmount}
              onChange={e => setForm({ ...form, totalAmount: parseInt(e.target.value) || 0 })}
              className={cn(
                'flex-1 px-4 py-2 rounded-lg border focus:outline-none',
                errors.totalAmount
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-300 focus:border-emerald-500'
              )}
            />
            <div className="px-3 py-2 bg-slate-100 rounded-lg flex items-center text-slate-600 text-sm">
              IDR
            </div>
          </div>
          {errors.totalAmount && <p className="text-red-600 text-xs mt-1">{errors.totalAmount}</p>}
        </div>

        {/* Amil Percentage */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fee Amil (%)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="12.5"
              step="0.1"
              value={form.amilPercentage}
              onChange={e => setForm({ ...form, amilPercentage: parseFloat(e.target.value) || 0 })}
              className={cn(
                'flex-1 px-4 py-2 rounded-lg border focus:outline-none',
                errors.amilPercentage
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-300 focus:border-emerald-500'
              )}
            />
            <div className="px-3 py-2 bg-slate-100 rounded-lg flex items-center text-slate-600 text-sm">
              %
            </div>
          </div>
          {errors.amilPercentage && <p className="text-red-600 text-xs mt-1">{errors.amilPercentage}</p>}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-4">
          <p className="text-sm text-emerald-900 font-medium">Fee Amil</p>
          <p className="text-2xl font-bold text-emerald-700 mt-2">
            Rp {amilAmount.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-emerald-700 mt-1">{form.amilPercentage}% dari total</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-medium">Untuk Distribusi</p>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            Rp {amountAfterAmil.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-blue-700 mt-1">Setelah dikurangi amil</p>
        </div>
        <div
          className={cn(
            'rounded-lg p-4 border',
            remainingAmount === 0
              ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
              : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
          )}
        >
          <p className={cn('text-sm font-medium', remainingAmount === 0 ? 'text-green-900' : 'text-orange-900')}>
            Sisa Alokasi
          </p>
          <p className={cn('text-2xl font-bold mt-2', remainingAmount === 0 ? 'text-green-700' : 'text-orange-700')}>
            Rp {remainingAmount.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {errors.allocations && (
        <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {errors.allocations}
        </div>
      )}

      {/* Asnaf Allocation Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Asnaf</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Alokasi</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Penerima</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {form.allocations.map((alloc, idx) => (
              <tr key={alloc.asnaf} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{ASNAF_TYPES[alloc.asnaf as any]}</p>
                    <p className="text-xs text-slate-600">{alloc.asnaf}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={alloc.allocatedAmount || ''}
                    onChange={e => {
                      const newAllocations = [...form.allocations];
                      newAllocations[idx].allocatedAmount = parseInt(e.target.value) || 0;
                      setForm({ ...form, allocations: newAllocations });
                      if (errors.allocations) {
                        setErrors({ ...errors, allocations: '' });
                      }
                    }}
                    placeholder="0"
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:border-emerald-500 outline-none"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={alloc.recipientName}
                    onChange={e => {
                      const newAllocations = [...form.allocations];
                      newAllocations[idx].recipientName = e.target.value;
                      setForm({ ...form, allocations: newAllocations });
                    }}
                    placeholder="Nama penerima"
                    className={cn(
                      'w-full px-2 py-1 text-sm border rounded focus:outline-none',
                      errors[`recipient-${idx}`]
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-300 focus:border-emerald-500'
                    )}
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={alloc.description}
                    onChange={e => {
                      const newAllocations = [...form.allocations];
                      newAllocations[idx].description = e.target.value;
                      setForm({ ...form, allocations: newAllocations });
                    }}
                    placeholder="Deskripsi"
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:border-emerald-500 outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Catatan (opsional)
        </label>
        <textarea
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          placeholder="Catatan tentang distribusi ini..."
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={() => setShowConfirmation(true)}
          disabled={remainingAmount !== 0}
          className={cn(
            'flex-1 py-2 px-4 rounded-lg font-medium transition-colors',
            remainingAmount === 0
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          )}
        >
          Lanjutkan ke Konfirmasi
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-slate-900">Konfirmasi Distribusi</h3>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Zakat:</span>
                <span className="font-medium">Rp {form.totalAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fee Amil ({form.amilPercentage}%):</span>
                <span className="font-medium">Rp {amilAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="text-slate-600">Untuk Distribusi:</span>
                <span className="font-medium">Rp {amountAfterAmil.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-900">
                ✓ Semua alokasi sudah terdistribusi dengan benar
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  // Save distribution
                  const newDistribution: ZakatDistribution = {
                    id: `zdist-${Date.now()}`,
                    distributionDate: new Date().toISOString().split('T')[0],
                    totalAmount: form.totalAmount,
                    amilAmount: amilAmount,
                    amountAfterAmil: amountAfterAmil,
                    amilPercentage: form.amilPercentage,
                    allocations: form.allocations.map(a => ({
                      ...a,
                      asnafName: ASNAF_TYPES[a.asnaf as any],
                      distributedAt: new Date().toISOString(),
                    })),
                    distributedBy: 'hendra',
                    status: 'completed',
                    notes: form.notes,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };

                  setDistributions([newDistribution, ...distributions]);
                  setShowConfirmation(false);
                  setViewMode('history');
                }}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
              >
                Proses Distribusi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // History View
  // =========================================================================
  const renderHistoryView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Riwayat Distribusi</h3>
        <button
          onClick={() => setViewMode('form')}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4" />
          Distribusi Baru
        </button>
      </div>

      {distributions.length === 0 ? (
        <div className="text-center py-12">
          <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Belum ada distribusi</p>
        </div>
      ) : (
        <div className="space-y-4">
          {distributions.map(dist => (
            <div key={dist.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-slate-900">{dist.distributionDate}</h4>
                  <p className="text-sm text-slate-600">{dist.id}</p>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  {dist.status === 'completed' ? 'Selesai' : dist.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600">Total Zakat</p>
                  <p className="text-lg font-bold text-slate-900">
                    Rp {dist.totalAmount.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Fee Amil</p>
                  <p className="text-lg font-bold text-slate-900">
                    Rp {dist.amilAmount.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Asnaf Terdistribusi</p>
                  <p className="text-lg font-bold text-slate-900">{dist.allocations.length}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Penerima</p>
                  <p className="text-lg font-bold text-slate-900">
                    {dist.allocations.filter(a => a.allocatedAmount > 0).length}
                  </p>
                </div>
              </div>

              {/* Allocation Summary */}
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-slate-900 mb-3 text-sm">Detail Alokasi Asnaf</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dist.allocations
                    .filter(a => a.allocatedAmount > 0)
                    .map(alloc => (
                      <div key={alloc.asnaf} className="text-xs">
                        <p className="text-slate-600 font-medium">{alloc.asnafName}</p>
                        <p className="text-slate-900 font-bold mt-1">
                          Rp {alloc.allocatedAmount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-slate-500 mt-1 truncate">{alloc.recipientName}</p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-2 text-xs">
                <button className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium transition-colors">
                  <Download className="w-3 h-3 inline mr-1" />
                  Laporan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // =========================================================================
  // Main Render
  // =========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
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
                <h1 className="text-2xl font-bold text-slate-900">Distribusi Zakat ke Asnaf</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Kelola dan buat distribusi zakat ke 8 asnaf dengan sesuai hukum Islam
                </p>
              </div>
            </div>
            <Wallet className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setViewMode('form')}
            className={cn(
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              viewMode === 'form'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            )}
          >
            Form Distribusi
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={cn(
              'px-4 py-2 font-medium text-sm border-b-2 transition-colors',
              viewMode === 'history'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            )}
          >
            Riwayat
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          {viewMode === 'form' ? renderFormView() : renderHistoryView()}
        </div>
      </div>
    </div>
  );
};

export default ZakatDistributionPage;
