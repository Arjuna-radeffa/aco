import { Project, User, Transaction } from '../types/appTypes';

export const mockUsers: User[] = [
  { id: '1', name: 'Arief Wijaksana', role: 'arief' },
  { id: '2', name: 'Sinta Portfolio', role: 'sinta' },
  { id: '3', name: 'Hendra Finance', role: 'hendra' },
  { id: '4', name: 'Reza Admin', role: 'reza' },
  { id: '5', name: 'Budi (Micro Investor)', role: 'investor_micro' },
  { id: '6', name: 'Citra (Corp Investor)', role: 'investor_enterprise' },
  { id: '7', name: 'Sholeh (Zakat Giver)', role: 'muzakki' },
  { id: '8', name: 'Hassan (Wakif Asset)', role: 'wakif' },
  { id: '9', name: 'Maimunah (Recipient)', role: 'mustahiq' },
  { id: '10', name: 'Mitra Tani Sejahtera', role: 'project_owner' },
  { id: '11', name: 'Ahmad (Munfiq)', role: 'munfiq' },
  { id: '12', name: 'Zaid (Mutashadiq)', role: 'mutashadiq' },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Lumbung Pangan Berkah',
    category: 'Wakaf',
    status: 'healthy',
    progress: 85,
    targetFunding: 1000000000,
    raisedFunding: 850000000,
    nazirQuota: 10,
    details: {
      description: 'Pengelolaan sawah wakaf produktif untuk ketahanan pangan lokal.',
      wakif: 'Bpk. Abdullah',
      nazir: 'Yayasan Amanah'
    },
    reports: [60, 65, null, 75, 80, 85]
  },
  {
    id: 'p2',
    title: 'Logistik Pantura Express',
    category: 'Logistik',
    status: 'at_risk',
    progress: 40,
    targetFunding: 500000000,
    raisedFunding: 200000000,
    route: 'Jakarta - Semarang',
    details: {
      description: 'Armada logistik jalur pantai utara untuk UMKM.',
      rute: 'Jakarta - Cirebon - Tegal - Semarang'
    },
    reports: [10, 20, 30, null, 40]
  },
  {
    id: 'p3',
    title: 'Pemberdayaan Lele Bioflok',
    category: 'UMKM',
    status: 'healthy',
    progress: 100,
    targetFunding: 50000000,
    raisedFunding: 50000000,
    details: {
      description: 'Budidaya lele sistem bioflok untuk kelompok tani muda.'
    },
    reports: [20, 40, 60, 80, 100]
  }
];

export const mockTransactions: Transaction[] = [
  { id: 't1', projectId: 'p1', amount: 5000000, type: 'wakaf', timestamp: '2026-04-20T10:00:00Z', status: 'completed' },
  { id: 't2', projectId: 'p2', amount: 10000000, type: 'investment', timestamp: '2026-04-21T14:30:00Z', status: 'pending' },
];
