import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle2, Settings, Lock, Toggle2, Info, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { mockZISPlatformConfig } from '../../data/zisMockData';
import { ZISPlatformConfiguration, ZakatConfiguration } from '../../types/zisTypes';

interface ZISConfigurationPageProps {
  onBack?: () => void;
}

type ConfigSection = 'zakat' | 'profit_sharing' | 'infaq' | 'waqf';

export const ZISConfigurationPage: React.FC<ZISConfigurationPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<ConfigSection>('zakat');
  const [config, setConfig] = useState<ZISPlatformConfiguration>(mockZISPlatformConfig);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // =========================================================================
  // Zakat Configuration
  // =========================================================================
  const renderZakatConfig = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-medium text-blue-900">Shariah Compliance Note (BL-9.3)</p>
          <p className="mt-1">
            Amil fee (biaya pengelola zakat) tidak boleh melebihi 12.5% dari total zakat yang
            dikumpulkan
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nisab Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nisab (Batasan Wajib Zakat)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={config.zakatConfig.nisabAmount}
              onChange={e => {
                const amount = parseInt(e.target.value);
                if (amount > 0) {
                  setConfig({
                    ...config,
                    zakatConfig: { ...config.zakatConfig, nisabAmount: amount },
                  });
                }
              }}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:border-emerald-500 outline-none"
            />
            <div className="px-4 py-2 bg-slate-100 rounded-lg flex items-center text-slate-600">
              IDR
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Setara dengan 85 gram emas. Default: Rp 6.850.000
          </p>
        </div>

        {/* Amil Percentage */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Amil Fee (Biaya Pengelola)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="12.5"
              value={config.zakatConfig.amilPercentage}
              onChange={e => {
                const percentage = parseFloat(e.target.value);
                if (percentage >= 0 && percentage <= 12.5) {
                  setConfig({
                    ...config,
                    zakatConfig: { ...config.zakatConfig, amilPercentage: percentage },
                  });
                } else if (percentage > 12.5) {
                  setErrors({ ...errors, amilPercentage: 'Maximum 12.5% per Shariah compliance' });
                }
              }}
              className={cn(
                'flex-1 px-4 py-2 rounded-lg border focus:outline-none',
                errors.amilPercentage
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-300 focus:border-emerald-500'
              )}
            />
            <div className="px-4 py-2 bg-slate-100 rounded-lg flex items-center text-slate-600">
              %
            </div>
          </div>
          {errors.amilPercentage && (
            <p className="text-red-600 text-xs mt-1">{errors.amilPercentage}</p>
          )}
          <p className="text-xs text-slate-600 mt-1">Max: 12.5% (Shariah Compliance)</p>
        </div>

        {/* Active Zakat Types */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Jenis Zakat yang Aktif
          </label>
          <div className="space-y-2">
            {['maal', 'profesi', 'fitrah', 'emas', 'perdagangan', 'tabungan'].map(type => (
              <label key={type} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded">
                <input
                  type="checkbox"
                  checked={config.zakatConfig.activeZakatTypes.includes(type as any)}
                  onChange={e => {
                    if (e.target.checked) {
                      setConfig({
                        ...config,
                        zakatConfig: {
                          ...config.zakatConfig,
                          activeZakatTypes: [...config.zakatConfig.activeZakatTypes, type as any],
                        },
                      });
                    } else {
                      setConfig({
                        ...config,
                        zakatConfig: {
                          ...config.zakatConfig,
                          activeZakatTypes: config.zakatConfig.activeZakatTypes.filter(t => t !== type),
                        },
                      });
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <span className="text-sm text-slate-700 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Auto Distribute */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <p className="font-medium text-slate-900">Otomatis Distribusi ke Asnaf</p>
            <p className="text-xs text-slate-600 mt-1">
              Sistem akan otomatis mendistribusikan zakat ke 8 asnaf sesuai konfigurasi
            </p>
          </div>
          <button
            onClick={() =>
              setConfig({
                ...config,
                zakatConfig: {
                  ...config.zakatConfig,
                  autoDistributeToAsnaf: !config.zakatConfig.autoDistributeToAsnaf,
                },
              })
            }
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              config.zakatConfig.autoDistributeToAsnaf
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-200 text-slate-700'
            )}
          >
            {config.zakatConfig.autoDistributeToAsnaf ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // Profit Sharing Configuration
  // =========================================================================
  const renderProfitSharingConfig = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-medium text-purple-900">Profit Sharing (Bagi Hasil)</p>
          <p className="mt-1">
            Shariah rules (BL-4.3): Fee Nazir max 10% + Profit Share max 30%. Mustahiq minimum
            50%.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Enable Profit Sharing */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <p className="font-medium text-slate-900">Aktifkan Bagi Hasil</p>
            <p className="text-xs text-slate-600 mt-1">
              Izinkan proyek wakaf produktif untuk membagi keuntungan
            </p>
          </div>
          <button
            onClick={() =>
              setConfig({
                ...config,
                profitSharingConfig: {
                  ...config.profitSharingConfig,
                  enabled: !config.profitSharingConfig.enabled,
                },
              })
            }
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              config.profitSharingConfig.enabled
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-200 text-slate-700'
            )}
          >
            {config.profitSharingConfig.enabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {config.profitSharingConfig.enabled && (
          <>
            {/* Max Nazir Fee */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Fee Nazir (%)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={config.profitSharingConfig.maxNazirFee}
                onChange={e => {
                  const fee = parseFloat(e.target.value);
                  if (fee >= 0 && fee <= 10) {
                    setConfig({
                      ...config,
                      profitSharingConfig: {
                        ...config.profitSharingConfig,
                        maxNazirFee: fee,
                      },
                    });
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-purple-500 outline-none"
              />
              <p className="text-xs text-slate-600 mt-1">Max: 10% (Shariah Compliance)</p>
            </div>

            {/* Max Profit Share */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Profit Share (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={config.profitSharingConfig.maxProfitSharePercentage}
                onChange={e => {
                  const share = parseFloat(e.target.value);
                  if (share >= 0 && share <= 50) {
                    setConfig({
                      ...config,
                      profitSharingConfig: {
                        ...config.profitSharingConfig,
                        maxProfitSharePercentage: share,
                      },
                    });
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-purple-500 outline-none"
              />
            </div>

            {/* Min Mustahiq */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Min Mustahiq Share (%)
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={config.profitSharingConfig.minMustahiqPercentage}
                onChange={e => {
                  const mustahiq = parseFloat(e.target.value);
                  if (mustahiq >= 50 && mustahiq <= 100) {
                    setConfig({
                      ...config,
                      profitSharingConfig: {
                        ...config.profitSharingConfig,
                        minMustahiqPercentage: mustahiq,
                      },
                    });
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-purple-500 outline-none"
              />
              <p className="text-xs text-slate-600 mt-1">Min: 50% (Shariah Compliance)</p>
            </div>

            {/* Requires Approval */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p className="font-medium text-slate-900">Memerlukan Persetujuan</p>
                <p className="text-xs text-slate-600 mt-1">
                  Setiap alokasi profit sharing harus disetujui admin
                </p>
              </div>
              <button
                onClick={() =>
                  setConfig({
                    ...config,
                    profitSharingConfig: {
                      ...config.profitSharingConfig,
                      requiresApproval: !config.profitSharingConfig.requiresApproval,
                    },
                  })
                }
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  config.profitSharingConfig.requiresApproval
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-700'
                )}
              >
                {config.profitSharingConfig.requiresApproval ? 'ON' : 'OFF'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // Infaq Configuration
  // =========================================================================
  const renderInfaqConfig = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-medium text-green-900">Infaq & Shadaqah Configuration</p>
          <p className="mt-1">Atur kategori program infaq dan kebijakan pengumpulan dana</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Enable General Fund */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <p className="font-medium text-slate-900">Aktifkan Dana Umum</p>
            <p className="text-xs text-slate-600 mt-1">
              Izinkan donasi ke dana infaq umum (general fund)
            </p>
          </div>
          <button
            onClick={() =>
              setConfig({
                ...config,
                infaqConfig: {
                  ...config.infaqConfig,
                  enableGeneralFund: !config.infaqConfig.enableGeneralFund,
                },
              })
            }
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              config.infaqConfig.enableGeneralFund
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-200 text-slate-700'
            )}
          >
            {config.infaqConfig.enableGeneralFund ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Max Program Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Max Durasi Program (Hari)
          </label>
          <input
            type="number"
            min="30"
            max="730"
            value={config.infaqConfig.maxProgramDuration}
            onChange={e => {
              const duration = parseInt(e.target.value);
              if (duration > 0) {
                setConfig({
                  ...config,
                  infaqConfig: { ...config.infaqConfig, maxProgramDuration: duration },
                });
              }
            }}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-green-500 outline-none"
          />
          <p className="text-xs text-slate-600 mt-1">
            Maksimal berapa hari sebuah program infaq dapat berjalan
          </p>
        </div>

        {/* Active Categories */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Kategori Program Aktif
          </label>
          <div className="space-y-2">
            {['pendidikan', 'kesehatan', 'usaha', 'infrastruktur', 'bencana', 'dakwah'].map(
              cat => (
                <label key={cat} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded">
                  <input
                    type="checkbox"
                    checked={config.infaqConfig.activeInfaqCategories.includes(cat)}
                    onChange={e => {
                      if (e.target.checked) {
                        setConfig({
                          ...config,
                          infaqConfig: {
                            ...config.infaqConfig,
                            activeInfaqCategories: [
                              ...config.infaqConfig.activeInfaqCategories,
                              cat,
                            ],
                          },
                        });
                      } else {
                        setConfig({
                          ...config,
                          infaqConfig: {
                            ...config.infaqConfig,
                            activeInfaqCategories: config.infaqConfig.activeInfaqCategories.filter(
                              c => c !== cat
                            ),
                          },
                        });
                      }
                    }}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700 capitalize">{cat}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // Waqf Configuration
  // =========================================================================
  const renderWaqfConfig = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-medium text-orange-900">Waqf Social Report Configuration</p>
          <p className="mt-1">
            Atur frekuensi laporan kondisi aset wakaf dan pengingat pengelola
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Reporting Frequency */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Frekuensi Laporan Kondisi Aset
          </label>
          <div className="space-y-2">
            {['monthly', 'quarterly', 'yearly'].map(freq => (
              <label key={freq} className="flex items-center gap-3 p-3 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="reportingFrequency"
                  value={freq}
                  checked={config.waqfConfig.reportingFrequency === freq}
                  onChange={() =>
                    setConfig({
                      ...config,
                      waqfConfig: { ...config.waqfConfig, reportingFrequency: freq as any },
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700 capitalize">
                  {freq === 'monthly' ? 'Bulanan' : freq === 'quarterly' ? 'Triwulanan' : 'Tahunan'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reminder Days */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Pengingat Sebelum Jadwal Laporan (Hari)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={config.waqfConfig.reminderDaysBeforeDue}
            onChange={e => {
              const days = parseInt(e.target.value);
              if (days > 0) {
                setConfig({
                  ...config,
                  waqfConfig: { ...config.waqfConfig, reminderDaysBeforeDue: days },
                });
              }
            }}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-orange-500 outline-none"
          />
          <p className="text-xs text-slate-600 mt-1">
            Sistem akan mengingatkan pengelola H-X hari sebelum jadwal laporan
          </p>
        </div>

        {/* Require Photo Documentation */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <p className="font-medium text-slate-900">Wajib Dokumentasi Foto</p>
            <p className="text-xs text-slate-600 mt-1">
              Setiap laporan kondisi aset harus disertai foto kondisi terkini
            </p>
          </div>
          <button
            onClick={() =>
              setConfig({
                ...config,
                waqfConfig: {
                  ...config.waqfConfig,
                  requiresPhotoDocumentation: !config.waqfConfig.requiresPhotoDocumentation,
                },
              })
            }
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              config.waqfConfig.requiresPhotoDocumentation
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-200 text-slate-700'
            )}
          >
            {config.waqfConfig.requiresPhotoDocumentation ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // Main Render
  // =========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Konfigurasi Platform ZIS</h1>
              <p className="text-sm text-slate-600 mt-1">
                Kelola pengaturan Zakat, Infaq, Shadaqah, dan Wakaf
              </p>
            </div>
            <Settings className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {[
              { id: 'zakat', label: 'Zakat', icon: '🕌' },
              { id: 'profit_sharing', label: 'Bagi Hasil', icon: '📊' },
              { id: 'infaq', label: 'Infaq & Shadaqah', icon: '❤️' },
              { id: 'waqf', label: 'Wakaf', icon: '🏛️' },
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as ConfigSection)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-medium',
                  activeSection === section.id
                    ? 'bg-emerald-100 text-emerald-700 border-l-4 border-emerald-600'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <span className="inline-block mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              {activeSection === 'zakat' && renderZakatConfig()}
              {activeSection === 'profit_sharing' && renderProfitSharingConfig()}
              {activeSection === 'infaq' && renderInfaqConfig()}
              {activeSection === 'waqf' && renderWaqfConfig()}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    setSaveStatus('saving');
                    setTimeout(() => setSaveStatus('success'), 1000);
                    setTimeout(() => setSaveStatus('idle'), 3000);
                  }}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors',
                    saveStatus === 'success'
                      ? 'bg-green-100 text-green-700'
                      : saveStatus === 'saving'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  )}
                >
                  {saveStatus === 'saving' ? (
                    <>Menyimpan...</>
                  ) : saveStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Tersimpan
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Simpan Konfigurasi
                    </>
                  )}
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
            </div>

            {/* Audit Log */}
            <div className="mt-6 bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Audit Log Perubahan
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {config.auditLog.map((log, idx) => (
                  <div key={idx} className="flex gap-3 text-sm p-3 bg-slate-50 rounded">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{log.changedBy}</p>
                      <p className="text-xs text-slate-600">
                        {new Date(log.timestamp).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-xs text-slate-600">
                      {Object.keys(log.changes).length} perubahan
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZISConfigurationPage;
