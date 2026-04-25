// Mock data for External User participations

export interface Participation {
  id: string;
  projectId: string;
  projectTitle: string;
  type: 'investasi' | 'wakaf_uang' | 'wakaf_aset';
  nominal: number;
  date: string;
  status: 'Aktif' | 'Selesai' | 'Gagal' | 'Menunggu Tindak Lanjut ACO' | 'Dalam Proses';
  referenceNumber: string;
  ownershipPercent?: number;
  profitSharingScheme?: string;
  disbursed?: boolean;
  profitHistory?: { period: string; nominal: number; date: string }[];
  totalProfit?: number;
  impactReports?: { date: string; summary: string }[];
  assetType?: 'Tidak Bergerak' | 'Bergerak';
  assetDetail?: string;
  statusHistory?: { date: string; status: string; note: string }[];
}

export const mockParticipations: Participation[] = [
  {
    id: "part-001",
    projectId: "bogor-001",
    projectTitle: "Bogor Islamic Center Complex",
    type: "investasi",
    nominal: 25000000,
    date: "15 Februari 2024",
    status: "Aktif",
    referenceNumber: "INV-2024-0215-0089",
    ownershipPercent: 0.167,
    profitSharingScheme: "60% Shahibul Maal / 40% Mudharib",
    disbursed: true,
    totalProfit: 3125000,
    profitHistory: [
      { period: "Maret 2024", nominal: 875000, date: "5 Apr 2024" },
      { period: "April 2024", nominal: 1000000, date: "5 Mei 2024" },
      { period: "Mei 2024", nominal: 1250000, date: "5 Jun 2024" },
    ],
  },
  {
    id: "part-002",
    projectId: "bandung-001",
    projectTitle: "Wakaf Masjid Agung Al-Ikhlas Bandung",
    type: "wakaf_uang",
    nominal: 500000,
    date: "3 Maret 2024",
    status: "Aktif",
    referenceNumber: "WKF-2024-0303-0312",
    impactReports: [
      { date: "1 Apr 2024", summary: "Pondasi masjid mencapai 40% pengerjaan. Dana wakaf terserap dengan baik." },
      { date: "1 Mei 2024", summary: "Kolom utama masjid selesai, pengerjaan dinding dimulai. Terima kasih atas dukungan wakif." },
      { date: "1 Jun 2024", summary: "Atap masjid 60% selesai. Estimasi peresmian tetap pada jadwal Juni 2025." },
    ],
  },
  {
    id: "part-003",
    projectId: "cianjur-001",
    projectTitle: "Eco-Pesantren Residence Cianjur",
    type: "investasi",
    nominal: 15000000,
    date: "20 Januari 2024",
    status: "Aktif",
    referenceNumber: "INV-2024-0120-0024",
    ownershipPercent: 0.3,
    profitSharingScheme: "60% Shahibul Maal / 40% Mudharib",
    disbursed: false,
    totalProfit: 0,
    profitHistory: [],
  },
  {
    id: "part-004",
    projectId: "-",
    projectTitle: "Sebidang Tanah di Bekasi",
    type: "wakaf_aset",
    nominal: 0,
    date: "10 April 2024",
    status: "Dalam Proses",
    referenceNumber: "WKA-2024-0410-0007",
    assetType: "Tidak Bergerak",
    assetDetail: "Tanah dan Bangunan, 200 m², SHM, Bekasi Barat",
    statusHistory: [
      { date: "10 Apr 2024", status: "Menunggu Tindak Lanjut ACO", note: "Pengajuan diterima oleh sistem." },
      { date: "15 Apr 2024", status: "Dalam Proses", note: "ACO menghubungi wakif untuk jadwal survei lokasi. PIC: Reza Pratama (0812-3456-7890)." },
    ],
  },
];
