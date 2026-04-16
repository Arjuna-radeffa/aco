// User role types for ACO platform
export enum UserRole {
  INVESTOR_MICRO = 'investor_micro',
  INVESTOR_ENTERPRISE = 'investor_enterprise',
  PROJECT_OWNER = 'project_owner',
  MUZAKKI = 'muzakki',
  MUNFIQ_MUTASHADIQ = 'munfiq_mutashadiq',
  WAKIF = 'wakif',
  MUSTAHIQ = 'mustahiq',
  INVESTMENT_OFFICER = 'investment_officer',
  PORTFOLIO_MONITOR = 'portfolio_monitor',
  FINANCE_OFFICER = 'finance_officer',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  lastLogin?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}