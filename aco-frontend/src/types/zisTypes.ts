/**
 * ZIS (Zakat, Infaq, Shadaqah) & Waqf Types
 * Extended type definitions for comprehensive ZIS implementation
 */

// ============================================================================
// ZAKAT TYPES
// ============================================================================

export type ZakatType = 'maal' | 'profesi' | 'fitrah' | 'emas' | 'perdagangan' | 'tabungan' | 'lainnya';
export type ZakatStatus = 'pending' | 'confirmed' | 'distributed' | 'failed';
export type AsnafType = 'fakir' | 'miskin' | 'amil' | 'muallaf' | 'riqab' | 'gharim' | 'fisabilillah' | 'ibnu_sabil';

export interface ZakatTransaction {
  id: string;
  muzakkiId: string;
  muzakkiName: string;
  zakatType: ZakatType;
  amount: number;
  nisabStatus: boolean;
  paymentMethod: 'bank_transfer' | 'cash' | 'check';
  bankAccount?: string;
  date: string; // ISO date
  status: ZakatStatus;
  notes?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AsnafAllocation {
  asnaf: AsnafType;
  asnafName: string;
  allocatedAmount: number;
  recipientName: string;
  description: string;
  distributedAt?: string;
}

export interface ZakatDistribution {
  id: string;
  distributionDate: string;
  totalAmount: number;
  amountAfterAmil: number;
  amilPercentage: number;
  amilAmount: number;
  allocations: AsnafAllocation[];
  distributedBy: string; // User ID (Finance Officer)
  status: 'pending' | 'confirmed' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ZakatReceipt {
  id: string;
  transactionId: string;
  receiptNumber: string;
  muzakkiName: string;
  muzakkiEmail: string;
  zakatType: ZakatType;
  amount: number;
  paymentDate: string;
  verificationCode: string;
  downloadUrl?: string;
  generatedAt: string;
}

export interface ZakatConfiguration {
  nisabAmount: number; // in IDR
  amilPercentage: number; // max 12.5%
  activeZakatTypes: ZakatType[];
  allowedPaymentMethods: string[];
  requiresApproval: boolean;
  autoDistributeToAsnaf: boolean;
  updatedAt: string;
  updatedBy: string;
}

// ============================================================================
// INFAQ & SHADAQAH TYPES
// ============================================================================

export type InfaqProgramStatus = 'active' | 'completed' | 'target_met' | 'paused' | 'cancelled';

export interface InfaqProgram {
  id: string;
  name: string;
  description: string;
  category: 'pendidikan' | 'kesehatan' | 'usaha' | 'infrastruktur' | 'bencana' | 'dakwah' | 'lainnya';
  targetAmount?: number; // null for general fund
  currentAmount: number;
  collectorAmount: number; // donations so far
  targetBeneficiaries?: number;
  currentBeneficiaries?: number;
  beneficiaryDescription: string;
  status: InfaqProgramStatus;
  startDate: string;
  endDate?: string;
  image?: string;
  impactScore: number; // 0-100
  excessFundsAction: 'refund' | 'transfer_to_general' | 'next_program'; // How to handle excess
  isGeneral: boolean; // true for general infaq fund
  createdAt: string;
  updatedAt: string;
}

export interface InfaqTransaction {
  id: string;
  donorId: string;
  donorName: string;
  donorEmail: string;
  programId?: string; // null for general fund
  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'check' | 'card';
  date: string;
  status: 'pending' | 'confirmed' | 'failed';
  receiptUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InfaqReport {
  id: string;
  programId: string;
  reportPeriod: 'monthly' | 'quarterly' | 'yearly' | 'final';
  startDate: string;
  endDate: string;
  totalCollected: number;
  totalSpent: number;
  balance: number;
  activitiesCompleted: string[];
  beneficiariesImpacted: number;
  mediaLinks: string[];
  createdBy: string;
  createdAt: string;
}

// ============================================================================
// WAQF SOCIAL TYPES
// ============================================================================

export type WaqfAssetType = 'immovable' | 'movable' | 'cash_based' | 'productive';
export type AssetCondition = 'good' | 'needs_maintenance' | 'needs_repair' | 'critical' | 'abandoned';

export interface WaqfSocialAsset {
  id: string;
  name: string;
  description: string;
  assetType: WaqfAssetType;
  location: string;
  coordinates?: { lat: number; lng: number };
  estimatedValue: number;
  purpose: string;
  beneficiaryDescription: string;
  currentCondition: AssetCondition;
  waqifName: string;
  waqifEmail: string;
  managementType: 'social' | 'productive'; // BL-11: Social vs Productive Waqf
  registrationDate: string;
  conditionReportDate?: string;
  images: string[];
  legalDocuments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AssetConditionReport {
  id: string;
  assetId: string;
  reportDate: string;
  currentCondition: AssetCondition;
  maintenanceNeeded?: string;
  repairEstimate?: number;
  beneficiariesCount: number;
  activitiesReport?: string;
  photos: string[];
  reportedBy: string;
  nextReportDate: string;
  createdAt: string;
}

export interface AssetMonitoringSchedule {
  id: string;
  assetId: string;
  reportingFrequency: 'monthly' | 'quarterly' | 'yearly';
  nextDueDate: string;
  reminderDaysBeforeDue: number; // e.g., 7 days
  assignedTo?: string;
  createdAt: string;
}

// ============================================================================
// PROFIT SHARING TYPES (Waqf Productive)
// ============================================================================

export interface ProfitSharingConfiguration {
  enabled: boolean;
  maxNazirFee: number; // percentage, max 10% per BL-4.3
  maxProfitSharePercentage: number; // of remaining profit
  minMustahiqPercentage: number; // min 50% per BL-4.3
  requiresApproval: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface ProjectProfitAllocation {
  id: string;
  projectId: string;
  allocationPeriod: string; // 'Q1 2024', 'FY 2024'
  totalProfit: number;
  amilFeePercentage: number;
  amilFeeAmount: number;
  nazirFeePercentage: number;
  nazirFeeAmount: number;
  waqifSharePercentage: number;
  waqifShareAmount: number;
  mustahiqPercentage: number;
  mustahiqAmount: number;
  status: 'pending' | 'approved' | 'distributed' | 'cancelled';
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WaqifBagiHasil {
  id: string;
  waqifId: string;
  waqifName: string;
  projectId: string;
  allocationId: string;
  claimedAmount: number;
  claimDate: string;
  paymentDate?: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  bankAccount?: string;
  updatedAt: string;
}

// ============================================================================
// FUND ACCOUNT TYPES (BL-7: Isolated Fund Accounts)
// ============================================================================

export interface IsolatedFundAccount {
  id: string;
  fundName: string; // Zakat, Infaq General, Waqf Social, Waqf Productive, Community Donation
  fundType: 'zakat' | 'infaq_general' | 'waqf_social' | 'waqf_productive' | 'community';
  balance: number;
  totalIncome: number;
  totalExpenditure: number;
  bankAccountNumber: string;
  currency: string; // IDR
  lastReconciled: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// TRANSPARENCY & REPORTING TYPES
// ============================================================================

export interface TransparencyZakatReport {
  id: string;
  reportPeriod: string; // 'Q1 2024'
  totalZakatCollected: number;
  amilFeeDeducted: number;
  netZakatDistributed: number;
  asnafDistributionBreakdown: Record<AsnafType, number>; // amount per asnaf
  beneficiariesCount: number;
  programsSupported: string[];
  generatedAt: string;
}

export interface TransparencyInfaqReport {
  id: string;
  reportPeriod: string;
  totalInfaqCollected: number;
  activePrograms: number;
  completedPrograms: number;
  totalBeneficiaries: number;
  programsList: InfaqProgram[];
  generatedAt: string;
}

export interface TransparencyWaqfReport {
  id: string;
  reportPeriod: string;
  totalWaqfAssets: number;
  waqfSocialAssets: WaqfSocialAsset[];
  waqfProductiveAssets: WaqfSocialAsset[];
  conditionSummary: Record<AssetCondition, number>; // count per condition
  profitDistributed?: number;
  generatedAt: string;
}

// ============================================================================
// ADMIN CONFIGURATION TYPES
// ============================================================================

export interface ZISPlatformConfiguration {
  // Section 1: Zakat Configuration
  zakatConfig: ZakatConfiguration;
  
  // Section 2: Profit Sharing Configuration
  profitSharingConfig: ProfitSharingConfiguration;
  
  // Section 3: Infaq & Shadaqah Configuration
  infaqConfig: {
    enableGeneralFund: boolean;
    activeInfaqCategories: string[];
    requiresApproval: boolean;
    maxProgramDuration: number; // days
    updatedAt: string;
    updatedBy: string;
  };
  
  // Section 4: Waqf Social Report Configuration
  waqfConfig: {
    reportingFrequency: 'monthly' | 'quarterly' | 'yearly';
    reminderDaysBeforeDue: number;
    requiresPhotoDocumentation: boolean;
    updatedAt: string;
    updatedBy: string;
  };
  
  // General
  auditLog: Array<{
    timestamp: string;
    changedBy: string;
    changes: Record<string, any>;
  }>;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface ZISNotification {
  id: string;
  userId: string;
  type: 'zakat_payment_success' | 'distribution_ready' | 'asset_report_due' | 'program_complete' | 'payment_failed';
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

// ============================================================================
// VALIDATION & HELPER TYPES
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface FormFieldError {
  field: string;
  message: string;
  code: string;
}

// ============================================================================
// EXPORT SUMMARY
// ============================================================================
/**
 * Total Types: 30+
 * Categories: Zakat, Infaq, Waqf Social, Profit Sharing, Fund Accounts, Transparency, Admin Config
 * 
 * Key Features:
 * - Shariah compliance rules (BL-4.3, BL-7.1, BL-11.2, etc.)
 * - Isolated fund account structure (5 separate accounts)
 * - Transparent audit trails with timestamps
 * - Role-based data access patterns
 * - Flexible status tracking for all transactions
 */
