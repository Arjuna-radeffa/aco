import {
  InfaqProgram,
  InfaqTransaction,
  InfaqReport,
  WaqfSocialAsset,
  AssetConditionReport,
  ZakatDistribution,
  AsnafAllocation,
  ProfitSharingConfiguration,
  ProjectProfitAllocation,
  ZISPlatformConfiguration,
  AsnafType,
} from '../types/zisTypes';

// ============================================================================
// INFAQ & SHADAQAH MOCK DATA
// ============================================================================

export const mockInfaqPrograms: InfaqProgram[] = [
  {
    id: 'inf-1',
    name: 'Program Pendidikan Anak Yatim 2024',
    description: 'Beasiswa penuh untuk 100 anak yatim di sekolah dasar hingga menengah',
    category: 'pendidikan',
    targetAmount: 500000000, // 500 juta
    currentAmount: 380000000,
    collectorAmount: 380000000,
    targetBeneficiaries: 100,
    currentBeneficiaries: 85,
    beneficiaryDescription: 'Anak-anak yatim berusia 6-18 tahun dari keluarga kurang mampu',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    image: '/projects/education.png',
    impactScore: 96,
    excessFundsAction: 'transfer_to_general',
    isGeneral: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-04-29T10:30:00Z',
  },
  {
    id: 'inf-2',
    name: 'Klinik Kesehatan Gratis Wilayah Terpencil',
    description: 'Pembangunan klinik kesehatan gratis di 5 wilayah perkotaan tertinggal',
    category: 'kesehatan',
    targetAmount: 750000000,
    currentAmount: 625000000,
    collectorAmount: 625000000,
    targetBeneficiaries: 50000,
    currentBeneficiaries: 42000,
    beneficiaryDescription: 'Masyarakat miskin tanpa akses ke layanan kesehatan',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    image: '/projects/hospital.png',
    impactScore: 94,
    excessFundsAction: 'refund',
    isGeneral: false,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-04-29T10:30:00Z',
  },
  {
    id: 'inf-3',
    name: 'Modal Usaha Mikro Tanpa Bunga',
    description: 'Memberikan modal usaha untuk 200 pengrajin lokal',
    category: 'usaha',
    targetAmount: 1000000000,
    currentAmount: 850000000,
    collectorAmount: 850000000,
    targetBeneficiaries: 200,
    currentBeneficiaries: 175,
    beneficiaryDescription: 'Pengrajin lokal dan UMKM yang belum bankable',
    status: 'target_met',
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    image: '/projects/laundry.png',
    impactScore: 91,
    excessFundsAction: 'next_program',
    isGeneral: false,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-04-29T10:30:00Z',
  },
  {
    id: 'inf-general',
    name: 'Dana Infaq Umum',
    description: 'Dana infaq dan shadaqah umum untuk kebutuhan mendesak',
    category: 'lainnya',
    targetAmount: undefined,
    currentAmount: 125000000,
    collectorAmount: 125000000,
    targetBeneficiaries: undefined,
    currentBeneficiaries: 450,
    beneficiaryDescription: 'Penerima manfaat mendesak yang ditentukan oleh manajemen',
    status: 'active',
    startDate: '2024-01-01',
    image: '/projects/water.png',
    impactScore: 88,
    excessFundsAction: 'transfer_to_general',
    isGeneral: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-04-29T10:30:00Z',
  },
];

export const mockInfaqTransactions: InfaqTransaction[] = [
  {
    id: 'infq-txn-1',
    donorId: 'user-123',
    donorName: 'Budi Santoso',
    donorEmail: 'budi@email.com',
    programId: 'inf-1',
    amount: 5000000,
    paymentMethod: 'bank_transfer',
    date: '2024-04-28T14:30:00Z',
    status: 'confirmed',
    receiptUrl: 'https://example.com/receipt/infq-txn-1.pdf',
    notes: 'Donasi untuk program pendidikan',
    createdAt: '2024-04-28T14:30:00Z',
    updatedAt: '2024-04-28T14:35:00Z',
  },
  {
    id: 'infq-txn-2',
    donorId: 'user-124',
    donorName: 'Siti Rahma',
    donorEmail: 'siti@email.com',
    programId: 'inf-2',
    amount: 2500000,
    paymentMethod: 'bank_transfer',
    date: '2024-04-27T10:15:00Z',
    status: 'confirmed',
    receiptUrl: 'https://example.com/receipt/infq-txn-2.pdf',
    createdAt: '2024-04-27T10:15:00Z',
    updatedAt: '2024-04-27T10:20:00Z',
  },
  {
    id: 'infq-txn-3',
    donorId: 'user-125',
    donorName: 'Ahmad Wijaya',
    donorEmail: 'ahmad@email.com',
    programId: 'inf-general',
    amount: 500000,
    paymentMethod: 'cash',
    date: '2024-04-26T16:45:00Z',
    status: 'confirmed',
    notes: 'Sedekah untuk general fund',
    createdAt: '2024-04-26T16:45:00Z',
    updatedAt: '2024-04-26T16:50:00Z',
  },
];

export const mockInfaqReports: InfaqReport[] = [
  {
    id: 'infq-rep-1',
    programId: 'inf-1',
    reportPeriod: 'quarterly',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    totalCollected: 250000000,
    totalSpent: 180000000,
    balance: 70000000,
    activitiesCompleted: [
      'Distribusi beasiswa ke 50 siswa',
      'Kunjungan sekolah dan monitoring',
      'Bantuan perlengkapan sekolah',
    ],
    beneficiariesImpacted: 50,
    mediaLinks: [
      'https://example.com/media/1',
      'https://example.com/media/2',
    ],
    createdBy: 'admin-001',
    createdAt: '2024-04-05T10:00:00Z',
  },
];

// ============================================================================
// WAQF SOCIAL MOCK DATA
// ============================================================================

export const mockWaqfSocialAssets: WaqfSocialAsset[] = [
  {
    id: 'waqf-1',
    name: 'Masjid Al-Hadi Kelurahan Merdeka',
    description: 'Masjid dengan fasilitas penuh termasuk TPA dan perpustakaan',
    assetType: 'immovable',
    location: 'Jl. Merdeka No. 45, Jakarta Timur',
    coordinates: { lat: -6.2088, lng: 106.9753 },
    estimatedValue: 2500000000,
    purpose: 'Tempat ibadah dan pusat kegiatan masyarakat',
    beneficiaryDescription: 'Masyarakat Kelurahan Merdeka dan sekitarnya (~5000 jiwa)',
    currentCondition: 'good',
    waqifName: 'Haji Bambang Irawan',
    waqifEmail: 'bambang@email.com',
    managementType: 'social',
    registrationDate: '2015-06-01',
    conditionReportDate: '2024-04-15',
    images: ['https://images.unsplash.com/photo-1542401886-65d27afda266?w=600'],
    legalDocuments: ['https://example.com/docs/waqf-1-legal.pdf'],
    createdAt: '2015-06-01T00:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z',
  },
  {
    id: 'waqf-2',
    name: 'Perpustakaan Komunitas Bina Nusantara',
    description: 'Perpustakaan gratis dengan 10,000 koleksi buku',
    assetType: 'immovable',
    location: 'Jl. Pendidikan No. 12, Bandung',
    coordinates: { lat: -6.9147, lng: 107.6098 },
    estimatedValue: 800000000,
    purpose: 'Pusat pembelajaran dan literasi masyarakat',
    beneficiaryDescription: 'Pelajar dan masyarakat umum Kota Bandung (~3000 pengunjung/bulan)',
    currentCondition: 'needs_maintenance',
    waqifName: 'Ibu Siti Nurhaliza',
    waqifEmail: 'siti@email.com',
    managementType: 'social',
    registrationDate: '2018-03-15',
    conditionReportDate: '2024-04-20',
    images: ['https://images.unsplash.com/photo-150784272343-583f20270319?w=600'],
    legalDocuments: ['https://example.com/docs/waqf-2-legal.pdf'],
    createdAt: '2018-03-15T00:00:00Z',
    updatedAt: '2024-04-20T14:30:00Z',
  },
];

export const mockAssetConditionReports: AssetConditionReport[] = [
  {
    id: 'acr-1',
    assetId: 'waqf-1',
    reportDate: '2024-04-15',
    currentCondition: 'good',
    maintenanceNeeded: undefined,
    repairEstimate: undefined,
    beneficiariesCount: 5200,
    activitiesReport: 'Rutin pembersihan masjid, pengajian 3x seminggu, TPA aktif 40 siswa',
    photos: [
      'https://images.unsplash.com/photo-1542401886-65d27afda266?w=600',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
    ],
    reportedBy: 'Ahmad Suripto',
    nextReportDate: '2024-07-15',
    createdAt: '2024-04-15T10:00:00Z',
  },
  {
    id: 'acr-2',
    assetId: 'waqf-2',
    reportDate: '2024-04-20',
    currentCondition: 'needs_maintenance',
    maintenanceNeeded: 'Perbaikan atap dan cat ulang ruang baca utama',
    repairEstimate: 50000000,
    beneficiariesCount: 3100,
    activitiesReport: '2500+ pengunjung bulan ini, 45 aktivitas komunitas, 12 program literasi',
    photos: [
      'https://images.unsplash.com/photo-1507842872343-583f20270319?w=600',
    ],
    reportedBy: 'Dina Kusuma',
    nextReportDate: '2024-07-20',
    createdAt: '2024-04-20T14:30:00Z',
  },
];

// ============================================================================
// ZAKAT DISTRIBUTION & ASNAF MOCK DATA
// ============================================================================

export const ASNAF_TYPES: Record<AsnafType, string> = {
  fakir: 'Fakir (Sangat Miskin)',
  miskin: 'Miskin (Kurang Mampu)',
  amil: 'Amil (Pengelola Zakat)',
  muallaf: 'Muallaf (Baru Masuk Islam)',
  riqab: 'Riqab (Budak/Tawanan)',
  gharim: 'Gharim (Berhutang Untuk Hal Baik)',
  fisabilillah: 'Fisabilillah (Untuk Jalan Allah)',
  ibnu_sabil: 'Ibnu Sabil (Musafir Terputus)',
};

export const mockZakatDistributions: ZakatDistribution[] = [
  {
    id: 'zdist-1',
    distributionDate: '2024-04-15',
    totalAmount: 500000000,
    amountAfterAmil: 437500000,
    amilPercentage: 12.5,
    amilAmount: 62500000,
    allocations: [
      {
        asnaf: 'fakir',
        asnafName: ASNAF_TYPES.fakir,
        allocatedAmount: 65625000,
        recipientName: 'Kelompok Fakir Rt 01/05 Menteng',
        description: 'Bantuan modal usaha dan kebutuhan dasar',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'miskin',
        asnafName: ASNAF_TYPES.miskin,
        allocatedAmount: 65625000,
        recipientName: 'Yayasan Pemberdayaan Masyarakat Miskin',
        description: 'Program pelatihan keterampilan dan bantuan pendidikan',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'amil',
        asnafName: ASNAF_TYPES.amil,
        allocatedAmount: 62500000,
        recipientName: 'Tim Manajemen ZIS ACO',
        description: 'Gaji dan operasional pengelolaan zakat',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'muallaf',
        asnafName: ASNAF_TYPES.muallaf,
        allocatedAmount: 65625000,
        recipientName: 'Jaringan Muallaf Indonesia',
        description: 'Bantuan stabilisasi dan bimbingan rohani',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'riqab',
        asnafName: ASNAF_TYPES.riqab,
        allocatedAmount: 43750000,
        recipientName: 'Organisasi Perlindungan Anak',
        description: 'Pembebasan dari perbudakan dan rehabilitasi',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'gharim',
        asnafName: ASNAF_TYPES.gharim,
        allocatedAmount: 65625000,
        recipientName: 'Program Pelunasan Utang Produktif',
        description: 'Pelunasan utang untuk modal usaha yang produktif',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'fisabilillah',
        asnafName: ASNAF_TYPES.fisabilillah,
        allocatedAmount: 65625000,
        recipientName: 'Pusat Dakwah Islam Terpadu',
        description: 'Program dakwah, pendidikan agama, dan media dakwah',
        distributedAt: '2024-04-15T10:30:00Z',
      },
      {
        asnaf: 'ibnu_sabil',
        asnafName: ASNAF_TYPES.ibnu_sabil,
        allocatedAmount: 0,
        recipientName: 'Belum ada penerima terdaftar',
        description: 'Dialokasikan untuk bulan depan',
        distributedAt: undefined,
      },
    ],
    distributedBy: 'hendra',
    status: 'completed',
    notes: 'Distribusi bulanan Ramadan 1445 H',
    createdAt: '2024-04-15T09:00:00Z',
    updatedAt: '2024-04-15T11:00:00Z',
  },
];

// ============================================================================
// PROFIT SHARING MOCK DATA
// ============================================================================

export const mockProfitSharingConfig: ProfitSharingConfiguration = {
  enabled: true,
  maxNazirFee: 10, // max 10% per BL-4.3
  maxProfitSharePercentage: 30,
  minMustahiqPercentage: 50, // min 50% per BL-4.3
  requiresApproval: true,
  updatedAt: '2024-01-15T00:00:00Z',
  updatedBy: 'admin-001',
};

export const mockProjectProfitAllocations: ProjectProfitAllocation[] = [
  {
    id: 'ppa-1',
    projectId: 'proj-wakaf-1',
    allocationPeriod: 'Q1 2024',
    totalProfit: 200000000,
    amilFeePercentage: 12.5,
    amilFeeAmount: 25000000,
    nazirFeePercentage: 5,
    nazirFeeAmount: 10000000,
    waqifSharePercentage: 33.75,
    waqifShareAmount: 67500000,
    mustahiqPercentage: 48.75,
    mustahiqAmount: 97500000,
    status: 'distributed',
    approvedBy: 'admin-001',
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z',
  },
];

// ============================================================================
// ZIS PLATFORM CONFIGURATION MOCK DATA
// ============================================================================

export const mockZISPlatformConfig: ZISPlatformConfiguration = {
  zakatConfig: {
    nisabAmount: 6850000, // Nisab setara 85 gram emas
    amilPercentage: 12.5, // max 12.5% per BL-9.3
    activeZakatTypes: ['maal', 'profesi', 'fitrah', 'emas', 'perdagangan', 'tabungan'],
    allowedPaymentMethods: ['bank_transfer', 'cash', 'check'],
    requiresApproval: false,
    autoDistributeToAsnaf: false,
    updatedAt: '2024-01-01T00:00:00Z',
    updatedBy: 'admin-001',
  },

  profitSharingConfig: mockProfitSharingConfig,

  infaqConfig: {
    enableGeneralFund: true,
    activeInfaqCategories: [
      'pendidikan',
      'kesehatan',
      'usaha',
      'infrastruktur',
      'bencana',
      'dakwah',
      'lainnya',
    ],
    requiresApproval: false,
    maxProgramDuration: 365,
    updatedAt: '2024-01-01T00:00:00Z',
    updatedBy: 'admin-001',
  },

  waqfConfig: {
    reportingFrequency: 'quarterly',
    reminderDaysBeforeDue: 7,
    requiresPhotoDocumentation: true,
    updatedAt: '2024-01-01T00:00:00Z',
    updatedBy: 'admin-001',
  },

  auditLog: [
    {
      timestamp: '2024-04-29T10:00:00Z',
      changedBy: 'admin-001',
      changes: {
        nisabAmount: { from: 6850000, to: 6850000 },
        amilPercentage: { from: 12.5, to: 12.5 },
      },
    },
  ],
};
