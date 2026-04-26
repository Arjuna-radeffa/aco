export type LandStatus = "Wakaf" | "Commercial";
export type FundingType = "Sukuk" | "Profit Sharing" | "Equity" | "Private Investment";
export type OwnershipModel = "SHM Bangunan" | "SHM" | "HGB";

export interface ProjectMetadata {
  landStatus: LandStatus;
  fundingType: FundingType;
  ownershipModel: OwnershipModel;
  allocation: {
    commercial: number; // e.g., 60 for 60%
    social: number; // e.g., 40 for 40%
  };
  features: string[];
}

export interface Milestone {
  date: string;
  label: string;
  status: "Completed" | "Current" | "Upcoming";
  description: string;
}

export interface FinancialProjection {
  year: number;
  revenue: number;
  expense: number;
  profit: number;
}

export interface SocialImpactDetail {
  icon: string;
  title: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  targetFunding: number;
  currentFunding: number;
  investorCount: number;
  businessName: string;
  category: string;
  metadata: ProjectMetadata;
  milestones: Milestone[];
  financialProjections: FinancialProjection[];
  socialImpacts: SocialImpactDetail[];
  legalDocuments: { name: string; url: string }[];
  parentId?: string;
  children?: Project[];
}
