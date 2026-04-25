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
  category: 'Logistik' | 'Wakaf' | 'Pertanian' | 'UMKM';
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
}

export interface Transaction {
  id: string;
  projectId: string;
  amount: number;
  type: 'investment' | 'wakaf' | 'profit_share';
  timestamp: string;
  status: 'pending' | 'completed';
}
