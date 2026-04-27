export interface User {
  id: string;
  name: string;
  role: 'arief' | 'sinta' | 'hendra' | 'reza' | 'investor_micro' | 'investor_enterprise' | 'funder' | 'mustahiq' | 'project_owner';
  avatar?: string;
  kycVerified?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Logistik' | 'Wakaf' | 'Pertanian' | 'UMKM' | 'Zakat';
  status: 'healthy' | 'at_risk' | 'critical';
  progress: number;
  targetFunding: number;
  raisedFunding: number;
  nazirQuota?: number; // for Wakaf
  route?: string; // for Logistik
  details: {
    description: string;
    rute?: string;
    wakif?: string;
    nazir?: string;
  };
  reports: (number | null)[]; // For chart visualization
  metadata: {
    allocation: {
      commercial: number;
      social: number;
    }
  }
}

export interface ZakatProject {
  id: string;
  title: string;
  type: 'Fitrah' | 'Profesi' | 'Maal' | 'Emas' | 'Perdagangan';
  description: string;
  targetBeneficiaries: number;
  impactScore: number;
  image: string;
  minDonation: number;
  featured?: boolean;
}

export interface Transaction {
  id: string;
  projectId: string;
  amount: number;
  type: 'investment' | 'wakaf' | 'zakat' | 'profit_share';
  timestamp: string;
  status: 'pending' | 'completed';
}
