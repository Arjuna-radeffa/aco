import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Gift,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Download,
  QrCode,
  CreditCard,
  Info,
  Percent,
  BarChart3,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { mockInfaqPrograms, mockInfaqTransactions } from '../../data/zisMockData';
import { InfaqProgram } from '../../types/zisTypes';

interface InfaqShadaqahFlowProps {
  onBack: () => void;
  onSuccess?: () => void;
}

type FlowStep = 'step1' | 'step2' | 'step3' | 'step4';
type DonationType = 'program' | 'general';

interface DonationFormData {
  donationType: DonationType;
  selectedProgramId?: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  sincerity: boolean;
  paymentMethod: 'bank_transfer' | 'cash';
}

const MIN_DONATION = 50000; // Rp 50,000

export const InfaqShadaqahFlow: React.FC<InfaqShadaqahFlowProps> = ({ onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('step1');
  const [donationData, setDonationData] = useState<DonationFormData>({
    donationType: 'program',
    amount: 0,
    donorName: '',
    donorEmail: '',
    sincerity: false,
    paymentMethod: 'bank_transfer',
  });
  const [receiptId, setReceiptId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get available programs (exclude general fund)
  const availablePrograms = mockInfaqPrograms.filter(p => !p.isGeneral && p.status === 'active');
  const generalFund = mockInfaqPrograms.find(p => p.isGeneral);

  const selectedProgram = donationData.selectedProgramId
    ? mockInfaqPrograms.find(p => p.id === donationData.selectedProgramId)
    : null;

  // =========================================================================
  // Step 1: Choose Program or General Fund
  // =========================================================================
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Pilih Jenis Donasi</h2>
        <p className="text-slate-600 mt-2">
          Infaq atau Shadaqah Anda akan membantu mereka yang membutuhkan
        </p>
      </div>

      <div className="space-y-4">
        {/* Program Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Donasi ke Program Spesifik
          </label>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availablePrograms.map(program => (
              <div
                key={program.id}
                onClick={() =>
                  setDonationData({ ...donationData, donationType: 'program', selectedProgramId: program.id })
                }
                className={cn(
                  'p-4 rounded-lg border-2 cursor-pointer transition-all',
                  donationData.donationType === 'program' && donationData.selectedProgramId === program.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-300 bg-white'
                )}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{program.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{program.beneficiaryDescription}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (program.currentAmount / (program.targetAmount || 1)) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">
                        {Math.round((program.currentAmount / (program.targetAmount || 1)) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Or Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">atau</span>
          </div>
        </div>

        {/* General Fund */}
        {generalFund && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Dana Infaq Umum
            </label>
            <div
              onClick={() =>
                setDonationData({ ...donationData, donationType: 'general', selectedProgramId: undefined })
              }
              className={cn(
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                donationData.donationType === 'general'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-300 bg-white'
              )}
            >
              <div className="flex items-start gap-4">
                <Gift className="w-12 h-12 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">{generalFund.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{generalFund.beneficiaryDescription}</p>
                  <p className="text-xs text-blue-600 mt-2">
                    Donasi Anda akan digunakan untuk kebutuhan mendesak yang paling membutuhkan
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          if (!donationData.selectedProgramId && donationData.donationType === 'program') {
            setErrors({ ...errors, program: 'Pilih program atau dana umum' });
            return;
          }
          setCurrentStep('step2');
        }}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
      >
        Lanjutkan
      </button>

      {errors.program && (
        <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {errors.program}
        </div>
      )}
    </div>
  );

  // =========================================================================
  // Step 2: Enter Amount
  // =========================================================================
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <DollarSign className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Jumlah Donasi</h2>
        <p className="text-slate-600 mt-2">
          {selectedProgram
            ? `Membantu: ${selectedProgram.name}`
            : 'Untuk: Dana Infaq Umum'}
        </p>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Jumlah Donasi (minimum Rp 50.000)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-600">Rp</span>
            <input
              type="number"
              value={donationData.amount || ''}
              onChange={e => {
                const amount = parseInt(e.target.value) || 0;
                setDonationData({ ...donationData, amount });
                if (amount > 0 && errors.amount) {
                  setErrors({ ...errors, amount: '' });
                }
              }}
              placeholder="0"
              className={cn(
                'w-full pl-8 pr-4 py-3 rounded-lg border-2 text-right text-lg font-semibold transition-colors',
                errors.amount ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-emerald-500'
              )}
            />
          </div>
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1 flex gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.amount}
            </p>
          )}
        </div>

        {/* Predefined Amounts */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Atau pilih jumlah
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[50000, 100000, 250000].map(amount => (
              <button
                key={amount}
                onClick={() => setDonationData({ ...donationData, amount })}
                className={cn(
                  'p-2 rounded-lg border-2 font-medium transition-all text-sm',
                  donationData.amount === amount
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-emerald-300 text-slate-700'
                )}
              >
                {amount.toLocaleString('id-ID', { notation: 'compact' })}
              </button>
            ))}
          </div>
        </div>

        {/* Donor Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Pendonor
            </label>
            <input
              type="text"
              value={donationData.donorName}
              onChange={e => setDonationData({ ...donationData, donorName: e.target.value })}
              placeholder="Nama Anda"
              className="w-full px-3 py-2 rounded border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={donationData.donorEmail}
              onChange={e => setDonationData({ ...donationData, donorEmail: e.target.value })}
              placeholder="email@example.com"
              className="w-full px-3 py-2 rounded border border-slate-300 text-sm"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Metode Pembayaran
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setDonationData({ ...donationData, paymentMethod: 'bank_transfer' })}
              className={cn(
                'w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3',
                donationData.paymentMethod === 'bank_transfer'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 hover:border-emerald-300'
              )}
            >
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-slate-900">Transfer Bank</p>
                <p className="text-xs text-slate-600">Transfer ke rekening kami</p>
              </div>
            </button>
            <button
              onClick={() => setDonationData({ ...donationData, paymentMethod: 'cash' })}
              className={cn(
                'w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3',
                donationData.paymentMethod === 'cash'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 hover:border-emerald-300'
              )}
            >
              <DollarSign className="w-5 h-5 text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">Tunai</p>
                <p className="text-xs text-slate-600">Serahkan langsung ke cabang</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('step1')}
          className="flex-1 border-2 border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Kembali
        </button>
        <button
          onClick={() => {
            let newErrors: Record<string, string> = {};
            if (!donationData.amount || donationData.amount < MIN_DONATION) {
              newErrors.amount = `Minimal donasi Rp ${MIN_DONATION.toLocaleString('id-ID')}`;
            }
            if (!donationData.donorName) {
              newErrors.donorName = 'Nama donor wajib diisi';
            }
            if (!donationData.donorEmail) {
              newErrors.donorEmail = 'Email wajib diisi';
            }

            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
              return;
            }

            setCurrentStep('step3');
          }}
          className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // Step 3: Confirmation
  // =========================================================================
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Konfirmasi Donasi</h2>
        <p className="text-slate-600 mt-2">Periksa kembali detail donasi Anda</p>
      </div>

      {/* Summary */}
      <div className="bg-slate-50 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-700">Jenis Donasi:</span>
          <span className="font-medium text-slate-900">
            {donationData.donationType === 'program' ? selectedProgram?.name : 'Dana Infaq Umum'}
          </span>
        </div>
        <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
          <span className="text-slate-700">Jumlah Donasi:</span>
          <span className="font-bold text-lg text-emerald-600">
            Rp {donationData.amount.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-700">Metode Pembayaran:</span>
          <span className="font-medium text-slate-900 capitalize">
            {donationData.paymentMethod === 'bank_transfer' ? 'Transfer Bank' : 'Tunai'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-700">Atas Nama:</span>
          <span className="font-medium text-slate-900">{donationData.donorName}</span>
        </div>
      </div>

      {/* Sincerity Checkbox */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={donationData.sincerity}
            onChange={e => {
              setDonationData({ ...donationData, sincerity: e.target.checked });
              if (e.target.checked && errors.sincerity) {
                setErrors({ ...errors, sincerity: '' });
              }
            }}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600"
          />
          <span className="text-sm text-slate-700">
            Saya bertekad untuk melakukan infaq dengan tulus ikhlas semata-mata karena Allah
            SWT, tanpa mengharapkan pujian dari siapapun. 🤲
          </span>
        </label>
        {errors.sincerity && (
          <p className="text-red-600 text-sm mt-2 flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.sincerity}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('step2')}
          className="flex-1 border-2 border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Kembali
        </button>
        <button
          onClick={() => {
            if (!donationData.sincerity) {
              setErrors({ ...errors, sincerity: 'Setujui pernyataan keikhlasan' });
              return;
            }
            // Generate receipt ID
            setReceiptId(`INFAQ-${Date.now()}`);
            setCurrentStep('step4');
          }}
          className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Proses Donasi
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // Step 4: Success Receipt
  // =========================================================================
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Donasi Berhasil!</h2>
        <p className="text-slate-600 mt-2">Terima kasih atas keikhlasan Anda</p>
      </div>

      {/* Receipt */}
      <div className="bg-white border-2 border-slate-200 rounded-lg p-6 space-y-4">
        <div className="text-center border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-600">Nomor Kuitansi</p>
          <p className="font-mono font-bold text-slate-900 text-lg">{receiptId}</p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Penerima:</span>
            <span className="font-medium">
              {donationData.donationType === 'program' ? selectedProgram?.name : 'Dana Infaq Umum'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Jumlah:</span>
            <span className="font-medium">Rp {donationData.amount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Tanggal:</span>
            <span className="font-medium">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Status:</span>
            <span className="font-medium text-green-600">Konfirmasi</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center py-4 border-t border-slate-200">
          <QrCode className="w-20 h-20 text-slate-400" />
        </div>

        <div className="text-center text-xs text-slate-600 bg-slate-50 p-3 rounded">
          <p>Kuitansi ini telah dikirim ke email Anda</p>
          <p className="font-mono mt-1">{donationData.donorEmail}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors">
          <Download className="w-4 h-4" />
          Unduh Kuitansi
        </button>
        <button
          onClick={() => {
            onSuccess?.();
            onBack();
          }}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Kembali ke Halaman Utama
        </button>
      </div>

      {/* Impact Message */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="text-sm text-slate-800">
          <span className="font-semibold text-emerald-700">💚 Alhamdulillah!</span> Donasi Anda akan
          langsung membantu yang membutuhkan. Semoga Allah menerima amal ibadah Anda dan memberkahi
          rezeki Anda.
        </p>
      </div>
    </div>
  );

  // =========================================================================
  // Main Render
  // =========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="font-bold text-slate-900">Infaq & Shadaqah</h1>
            <p className="text-xs text-slate-600">
              Langkah {currentStep === 'step1' ? '1' : currentStep === 'step2' ? '2' : currentStep === 'step3' ? '3' : '4'} dari 4
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{
              width:
                currentStep === 'step1'
                  ? '25%'
                  : currentStep === 'step2'
                    ? '50%'
                    : currentStep === 'step3'
                      ? '75%'
                      : '100%',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {currentStep === 'step1' && renderStep1()}
        {currentStep === 'step2' && renderStep2()}
        {currentStep === 'step3' && renderStep3()}
        {currentStep === 'step4' && renderStep4()}
      </div>
    </div>
  );
};

export default InfaqShadaqahFlow;
