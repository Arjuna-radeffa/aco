import { ZakatProject } from '../types/appTypes';

export const mockZakatProjects: ZakatProject[] = [
  {
    id: 'zak-1',
    title: 'Zakat Fitrah: Beras untuk Dhuafa Pelosok',
    type: 'Fitrah',
    description: 'Penyaluran zakat fitrah dalam bentuk beras kualitas terbaik bagi masyarakat di daerah tertinggal, terdepan, dan terluar (3T).',
    targetBeneficiaries: 1200,
    impactScore: 98,
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=800&auto=format&fit=crop',
    minDonation: 45000,
    featured: true
  },
  {
    id: 'zak-2',
    title: 'Zakat Profesi: Beasiswa Pendidikan Yatim',
    type: 'Profesi',
    description: 'Bantuan biaya pendidikan bulanan untuk anak-anak yatim berprestasi yang berasal dari keluarga muzakki profesional.',
    targetBeneficiaries: 500,
    impactScore: 95,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    minDonation: 100000,
    featured: true
  },
  {
    id: 'zak-3',
    title: 'Zakat Maal: Modal Usaha Mikro Syariah',
    type: 'Maal',
    description: 'Penyaluran zakat maal sebagai modal usaha tanpa bunga bagi pedagang kecil untuk melepaskan diri dari jeratan rentenir.',
    targetBeneficiaries: 250,
    impactScore: 92,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    minDonation: 250000,
    featured: false
  },
  {
    id: 'zak-4',
    title: 'Zakat Emas: Fasilitas Kesehatan Gratis',
    type: 'Emas',
    description: 'Pemanfaatan zakat emas untuk pengadaan alat medis canggih di klinik-klinik gratis khusus mustahiq di seluruh Indonesia.',
    targetBeneficiaries: 5000,
    impactScore: 97,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    minDonation: 500000,
    featured: false
  },
  {
    id: 'zak-5',
    title: 'Zakat Perdagangan: Pangan Sehat Lansia',
    type: 'Perdagangan',
    description: 'Distribusi paket pangan bergizi secara rutin untuk lansia dhuafa di wilayah perkotaan padat penduduk.',
    targetBeneficiaries: 800,
    impactScore: 90,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    minDonation: 75000,
    featured: true
  }
];
