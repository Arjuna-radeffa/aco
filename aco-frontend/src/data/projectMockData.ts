import { Project } from "../types/projectTypes";

export const mockProjects: Project[] = [
  {
    id: "cianjur-001",
    title: "Eco-Pesantren Residence Cianjur",
    location: "Cianjur, Jawa Barat",
    businessName: "Yayasan Wakaf Amanah",
    category: "Hybrid Housing",
    investorCount: 124,
    description: "Proyek hunian terpadu di atas lahan wakaf produktif. Proyek ini menggabungkan antara unit perumahan komersial dan fasilitas sosial pendidikan pesantren. Investor mendapatkan hak huni dan bagi hasil melalui model SHM Bangunan, sementara tanah tetap terjaga sebagai aset umat.",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
    targetFunding: 5000000000,
    currentFunding: 3200000000,
    metadata: {
      landStatus: "Wakaf",
      fundingType: "Private Investment",
      ownershipModel: "SHM Bangunan",
      allocation: {
        commercial: 60,
        social: 40,
      },
      features: ["Masjid Al-Barkah", "Pondok Pesantren", "Solar Panel", "Green Area"],
    },
    milestones: [
      { date: "Jan 2024", label: "Legalitas & Perizinan", status: "Completed", description: "Pengurusan izin IMB dan legalitas lahan wakaf." },
      { date: "Mar 2024", label: "Groundbreaking", status: "Completed", description: "Peletakan batu pertama dan pembersihan lahan." },
      { date: "Jun 2024", label: "Pembangunan Tahap 1", status: "Current", description: "Pembangunan 20 unit rumah pertama dan area masjid." },
      { date: "Dec 2024", label: "Handover Unit", status: "Upcoming", description: "Penyerahan kunci kepada pembeli dan operasional pesantren." },
    ],
    financialProjections: [
      { year: 2024, revenue: 1200000000, expense: 800000000, profit: 400000000 },
      { year: 2025, revenue: 2500000000, expense: 1200000000, profit: 1300000000 },
      { year: 2026, revenue: 3200000000, expense: 1500000000, profit: 1700000000 },
    ],
    socialImpacts: [
      { icon: "Users", title: "Pendidikan Gratis", impact: "Beasiswa untuk 50 santri yatim/piatu per tahun." },
      { icon: "Landmark", title: "Masjid Digital", impact: "Pembangunan masjid sebagai pusat literasi digital desa." },
      { icon: "TrendingUp", title: "Ekonomi Lokal", impact: "Penyediaan pasar UMKM untuk warga sekitar pesantren." },
    ],
    legalDocuments: [
      { name: "Sertifikat Wakaf Lahan", url: "#" },
      { name: "Prospektus Investasi", url: "#" },
      { name: "Izin Mendirikan Bangunan (IMB)", url: "#" },
    ],
  },
  {
    id: "bogor-001",
    title: "Bogor Holistic & Research Center",
    location: "Bogor, Jawa Barat",
    businessName: "PT Global Medika Riset",
    category: "Healthcare & Education",
    investorCount: 89,
    description: "Pusat riset kesehatan dan pendidikan yang dibangun di atas lahan komersil dengan skema pendanaan wakaf produktif dan sukuk. Proyek ini bertujuan menghasilkan pendapatan dari layanan rumah sakit yang hasilnya dialokasikan kembali untuk riset kesehatan masyarakat.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    targetFunding: 15000000000,
    currentFunding: 8500000000,
    metadata: {
      landStatus: "Commercial",
      fundingType: "Sukuk",
      ownershipModel: "SHM",
      allocation: {
        commercial: 70,
        social: 30,
      },
      features: ["International School", "Biotech Lab", "General Hospital", "Guest House"],
    },
    milestones: [
      { date: "Feb 2024", label: "Akuisisi Lahan", status: "Completed", description: "Finalisasi pembelian lahan komersil seluas 2 hektar." },
      { date: "May 2024", label: "Desain Arsitektur", status: "Completed", description: "Penyelesaian detail engineering design (DED)." },
      { date: "Aug 2024", label: "Konstruksi RS", status: "Upcoming", description: "Pembangunan gedung utama rumah sakit." },
    ],
    financialProjections: [
      { year: 2024, revenue: 500000000, expense: 400000000, profit: 100000000 },
      { year: 2025, revenue: 4500000000, expense: 2000000000, profit: 2500000000 },
      { year: 2026, revenue: 8000000000, expense: 3500000000, profit: 4500000000 },
    ],
    socialImpacts: [
      { icon: "Heart", title: "Layanan Kesehatan", impact: "Subsidi biaya berobat untuk 1000 warga prasejahtera." },
      { icon: "Users", title: "Pusat Pelatihan", impact: "Pelatihan tenaga medis baru secara berkala." },
    ],
    legalDocuments: [
      { name: "SHM Lahan Komersil", url: "#" },
      { name: "Akad Sukuk Wakaf", url: "#" },
      { name: "Izin Operasional RS", url: "#" },
    ],
  },
];
