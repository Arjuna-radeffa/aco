export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  participationType: "Investasi" | "Wakaf" | "Investasi & Wakaf";
  targetDana: number;
  terkumpul: number;
  pctKomersial: number;
  deskripsi: string;
  tanggalMulai: string;
  skemaPartisipasi: string;
  featuredOrder?: number;
};

export const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "ruko-cilandak",
    name: "Ruko Cilandak Commercial Hub",
    category: "Properti",
    participationType: "Investasi",
    targetDana: 5_000_000_000,
    terkumpul: 3_750_000_000,
    pctKomersial: 100,
    deskripsi:
      "Pengembangan 8 unit ruko tiga lantai di kawasan komersial Cilandak, Jakarta Selatan. Proyek ini menawarkan bagi hasil dari pendapatan sewa tahunan.",
    tanggalMulai: "2024-03-01",
    skemaPartisipasi:
      "Bagi hasil dari pendapatan sewa bersih dibagi proporsional sesuai porsi kepemilikan. Distribusi dilakukan setiap kuartal.",
    featuredOrder: 1,
  },
  {
    id: "2",
    slug: "logistik-halal-depok",
    name: "Armada Logistik Halal Depok",
    category: "Logistik",
    participationType: "Investasi",
    targetDana: 2_000_000_000,
    terkumpul: 1_400_000_000,
    pctKomersial: 70,
    deskripsi:
      "Pengadaan 10 unit armada kendaraan pengiriman bersertifikasi halal untuk melayani UMKM kuliner halal di wilayah Depok dan sekitarnya. 30% keuntungan disalurkan untuk pelatihan mitra UMKM.",
    tanggalMulai: "2024-05-15",
    skemaPartisipasi:
      "Bagi hasil dari pendapatan operasional armada setelah biaya operasional. Distribusi bulanan.",
    featuredOrder: 2,
  },
  {
    id: "3",
    slug: "wakaf-masjid-al-ikhlas",
    name: "Wakaf Produktif Masjid Al-Ikhlas",
    category: "Wakaf Produktif",
    participationType: "Wakaf",
    targetDana: 1_500_000_000,
    terkumpul: 980_000_000,
    pctKomersial: 0,
    deskripsi:
      "Program wakaf produktif untuk pengembangan fasilitas masjid Al-Ikhlas Bogor beserta unit usaha yang hasilnya digunakan untuk kegiatan sosial dan pendidikan di sekitar masjid.",
    tanggalMulai: "2024-01-10",
    skemaPartisipasi:
      "Wakaf uang. Seluruh hasil pengelolaan (minimal 90% setelah fee nazir) disalurkan ke program sosial-pendidikan masjid.",
    featuredOrder: 3,
  },
  {
    id: "4",
    slug: "umkm-batik-pekalongan",
    name: "UMKM Batik Pekalongan Bersama",
    category: "UMKM",
    participationType: "Investasi",
    targetDana: 800_000_000,
    terkumpul: 620_000_000,
    pctKomersial: 60,
    deskripsi:
      "Pendanaan modal kerja untuk 15 pengrajin batik tulis di Pekalongan. 40% keuntungan disisihkan untuk program beasiswa putra-putri pengrajin.",
    tanggalMulai: "2024-06-01",
    skemaPartisipasi:
      "Bagi hasil dari penjualan batik bersih. Distribusi semesteran.",
    featuredOrder: 4,
  },
  {
    id: "5",
    slug: "wakaf-klinik-griya-sehat",
    name: "Wakaf Klinik Griya Sehat",
    category: "Wakaf Produktif",
    participationType: "Wakaf",
    targetDana: 3_000_000_000,
    terkumpul: 1_100_000_000,
    pctKomersial: 0,
    deskripsi:
      "Wakaf produktif untuk pembangunan klinik kesehatan yang melayani masyarakat kurang mampu dengan biaya subsidi. Klinik dikelola secara profesional.",
    tanggalMulai: "2024-02-20",
    skemaPartisipasi:
      "Wakaf uang. Hasil pengelolaan klinik dikembalikan sebagai layanan kesehatan bersubsidi.",
    featuredOrder: 5,
  },
  {
    id: "6",
    slug: "apartemen-wakaf-jakarta",
    name: "Apartemen Syariah Jakarta Timur",
    category: "Properti",
    participationType: "Investasi",
    targetDana: 8_000_000_000,
    terkumpul: 2_400_000_000,
    pctKomersial: 80,
    deskripsi:
      "Pembangunan apartemen syariah 12 lantai di Jakarta Timur di atas lahan wakaf. 20% unit dialokasikan sebagai hunian bersubsidi untuk MBR.",
    tanggalMulai: "2024-04-01",
    skemaPartisipasi:
      "Bagi hasil dari penjualan dan pendapatan sewa unit komersial. Distribusi setelah selesai konstruksi.",
    featuredOrder: 6,
  },
  {
    id: "7",
    slug: "tambak-udang-sidoarjo",
    name: "Tambak Udang Vaname Sidoarjo",
    category: "UMKM",
    participationType: "Investasi",
    targetDana: 1_200_000_000,
    terkumpul: 200_000_000,
    pctKomersial: 100,
    deskripsi:
      "Pengembangan 5 petak tambak udang vaname intensif di Sidoarjo dengan teknologi bioflok. Proyeksi panen 3x per tahun.",
    tanggalMulai: "2024-07-01",
    skemaPartisipasi:
      "Bagi hasil dari penjualan panen bersih. Distribusi per siklus panen.",
  },
  {
    id: "8",
    slug: "wakaf-pesantren-darul-ulum",
    name: "Wakaf Pesantren Darul Ulum",
    category: "Wakaf Produktif",
    participationType: "Wakaf",
    targetDana: 2_500_000_000,
    terkumpul: 2_500_000_000,
    pctKomersial: 0,
    deskripsi:
      "Wakaf produktif untuk pengembangan unit usaha pesantren Darul Ulum Jombang. Hasil usaha digunakan untuk biaya operasional pesantren dan beasiswa santri.",
    tanggalMulai: "2023-11-01",
    skemaPartisipasi:
      "Wakaf uang. Seluruh hasil unit usaha untuk keberlangsungan pesantren.",
  },
  {
    id: "9",
    slug: "rumah-sakit-syariah-bekasi",
    name: "RS Syariah Amanah Bekasi",
    category: "Properti",
    participationType: "Investasi & Wakaf",
    targetDana: 15_000_000_000,
    terkumpul: 4_500_000_000,
    pctKomersial: 65,
    deskripsi:
      "Pembangunan rumah sakit syariah tipe C di Bekasi. 35% kapasitas layanan dialokasikan untuk pasien tidak mampu via wakaf produktif.",
    tanggalMulai: "2024-08-01",
    skemaPartisipasi:
      "Investor mendapat bagi hasil dari pendapatan layanan komersial RS. Porsi wakaf mendukung layanan sosial.",
  },
  {
    id: "10",
    slug: "minimarket-halal-network",
    name: "Minimarket Halal Network Jawa Barat",
    category: "UMKM",
    participationType: "Investasi",
    targetDana: 3_500_000_000,
    terkumpul: 3_150_000_000,
    pctKomersial: 85,
    deskripsi:
      "Jaringan 20 minimarket bersertifikasi halal di wilayah Jawa Barat. 15% keuntungan digunakan untuk pemberdayaan UMKM lokal sebagai pemasok.",
    tanggalMulai: "2024-03-15",
    skemaPartisipasi:
      "Bagi hasil dari margin penjualan bersih seluruh gerai. Distribusi triwulanan.",
  },
  {
    id: "11",
    slug: "solar-panel-pesantren",
    name: "Solar Panel 100 Pesantren",
    category: "Wakaf Produktif",
    participationType: "Investasi & Wakaf",
    targetDana: 5_000_000_000,
    terkumpul: 1_800_000_000,
    pctKomersial: 40,
    deskripsi:
      "Pemasangan panel surya di 100 pesantren se-Indonesia. 60% kapasitas energi untuk pesantren (sosial), 40% dijual ke PLN menghasilkan return investasi.",
    tanggalMulai: "2024-09-01",
    skemaPartisipasi:
      "Bagi hasil dari penjualan listrik ke PLN. Distribusi bulanan setelah instalasi selesai.",
  },
  {
    id: "12",
    slug: "cold-storage-halal-surabaya",
    name: "Cold Storage Halal Surabaya",
    category: "Logistik",
    participationType: "Investasi",
    targetDana: 4_000_000_000,
    terkumpul: 600_000_000,
    pctKomersial: 100,
    deskripsi:
      "Pembangunan fasilitas cold storage bersertifikasi halal kapasitas 500 ton di kawasan industri Surabaya untuk mendukung rantai pasok produk halal.",
    tanggalMulai: "2024-10-01",
    skemaPartisipasi:
      "Bagi hasil dari pendapatan sewa gudang dan jasa penyimpanan. Distribusi bulanan.",
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter(
  (p) => p.featuredOrder !== undefined
).sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
