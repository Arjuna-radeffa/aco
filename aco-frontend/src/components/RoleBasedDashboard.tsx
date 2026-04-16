import { LayoutDashboard, Wallet, RefreshCcw, History, PieChart, LogOut, Menu, Bell, Search, Plus } from 'lucide-react';
import { User, AuthResponse } from '../App';

interface RoleBasedDashboardProps {
  user: User;
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const getRoleNavigation = (role: string): NavItem[] => {
  const navMap: Record<string, NavItem[]> = {
    investor_micro: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Overview Portofolio' },
      { id: 'accounts', label: 'Rekening Saya', icon: <Wallet className="w-5 h-5" />, description: 'Detail Akun' },
      { id: 'investments', label: 'Investasi Saya', icon: <PieChart className="w-5 h-5" />, description: 'Portfolio Aktif' },
      { id: 'investment_explore', label: 'Investasi Baru', icon: <Plus className="w-5 h-5" />, description: 'Cari Proyek Baru' },
      { id: 'disbursements', label: 'Pencairan Profit', icon: <RefreshCcw className="w-5 h-5" />, description: 'Request Pencairan' },
      { id: 'history', label: 'Riwayat', icon: <History className="w-5 h-5" />, description: 'Transaksi & Laporan' },
    ],
    investor_enterprise: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Enterprise Overview' },
      { id: 'portfolio', label: 'Portfolio Manager', icon: <Wallet className="w-5 h-5" />, description: 'Manajemen Portofolio' },
      { id: 'investment_explore', label: 'Investasi Baru', icon: <Plus className="w-5 h-5" />, description: 'Cari Proyek Strategis' },
      { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-5 h-5" />, description: 'Laporan Advanced' },
      { id: 'api', label: 'API Integration', icon: <RefreshCcw className="w-5 h-5" />, description: 'Sistem API' },
      { id: 'reports', label: 'Reports', icon: <History className="w-5 h-5" />, description: 'Laporan Lengkap' },
    ],
    project_owner: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Overview Bisnis' },
      { id: 'input_data', label: 'Input Data', icon: <Plus className="w-5 h-5" />, description: 'Isi Data Content' },
      { id: 'proposal', label: 'Ajukan Proposal', icon: <RefreshCcw className="w-5 h-5" />, description: 'Pendanaan Baru' },
      { id: 'investors', label: 'Investor Saya', icon: <Wallet className="w-5 h-5" />, description: 'Daftar Investor' },
      { id: 'financial', label: 'Laporan Keuangan', icon: <PieChart className="w-5 h-5" />, description: 'Financial Reports' },
    ],
    muzakki: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Overview Zakat' },
      { id: 'input_data', label: 'Input Zakat', icon: <Plus className="w-5 h-5" />, description: 'Isi Data Content' },
      { id: 'calculator', label: 'Kalkulator Zakat', icon: <Wallet className="w-5 h-5" />, description: 'Hitung Zakat' },
      { id: 'allocation', label: 'Alokasi Asnaf', icon: <PieChart className="w-5 h-5" />, description: 'Distribusi 8 Asnaf' },
    ],
    munfiq_mutashadiq: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Overview Donasi' },
      { id: 'input_data', label: 'Input Donasi', icon: <Plus className="w-5 h-5" />, description: 'Isi Data Content' },
      { id: 'programs', label: 'Program Donasi', icon: <Wallet className="w-5 h-5" />, description: 'Pilih Program' },
      { id: 'impact', label: 'Dampak Donasi', icon: <History className="w-5 h-5" />, description: 'Melihat Hasil' },
    ],
    wakif: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Overview Wakaf' },
      { id: 'input_data', label: 'Input Wakaf', icon: <Plus className="w-5 h-5" />, description: 'Isi Data Content' },
      { id: 'register', label: 'Daftarkan Wakaf', icon: <Wallet className="w-5 h-5" />, description: 'Wakaf Baru' },
      { id: 'yield', label: 'Hasil Wakaf', icon: <History className="w-5 h-5" />, description: 'Monthly Yield' },
    ],
    mustahiq: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Status Manfaat' },
      { id: 'benefits', label: 'Manfaat Diterima', icon: <Wallet className="w-5 h-5" />, description: 'Bantuan & Dukungan' },
      { id: 'programs', label: 'Program Pemberdayaan', icon: <PieChart className="w-5 h-5" />, description: 'Pelatihan & Skil' },
      { id: 'progress', label: 'Progress Saya', icon: <History className="w-5 h-5" />, description: 'Tracking Kemajuan' },
      { id: 'upgrade', label: 'Upgrade ke Investor', icon: <RefreshCcw className="w-5 h-5" />, description: 'Transisi Status' },
    ],
    investment_officer: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Pipeline Overview' },
      { id: 'pipeline', label: 'Deal Pipeline', icon: <Wallet className="w-5 h-5" />, description: 'Proposal Queue' },
      { id: 'duediligence', label: 'Due Diligence', icon: <PieChart className="w-5 h-5" />, description: 'Verifikasi Deal' },
      { id: 'scheme', label: 'Scheme Designer', icon: <History className="w-5 h-5" />, description: 'Design Struktur' },
      { id: 'committee', label: 'Committee Recom', icon: <RefreshCcw className="w-5 h-5" />, description: 'Rekomendasi Komite' },
    ],
    portfolio_monitor: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Portfolio Status' },
      { id: 'monitor', label: 'Monitor Bisnis', icon: <Wallet className="w-5 h-5" />, description: 'Health Check' },
      { id: 'anomaly', label: 'Anomaly Detection', icon: <PieChart className="w-5 h-5" />, description: 'Deteksi Issue' },
      { id: 'intervention', label: 'Intervention Plan', icon: <History className="w-5 h-5" />, description: 'Aksi Korektif' },
      { id: 'reports', label: 'Final Reports', icon: <RefreshCcw className="w-5 h-5" />, description: 'Laporan Hasil' },
    ],
    finance_officer: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'Finance Overview' },
      { id: 'isolation', label: 'Fund Isolation', icon: <Wallet className="w-5 h-5" />, description: 'Isolasi Dana' },
      { id: 'reconciliation', label: 'Reconciliation', icon: <PieChart className="w-5 h-5" />, description: 'Rekonsiliasi' },
      { id: 'profit', label: 'Profit Calc', icon: <History className="w-5 h-5" />, description: 'Perhitungan Profit' },
      { id: 'liquidation', label: 'Liquidation', icon: <RefreshCcw className="w-5 h-5" />, description: 'Likuidasi Aset' },
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, description: 'System Overview' },
      { id: 'users', label: 'User Management', icon: <Wallet className="w-5 h-5" />, description: 'Kelola User' },
      { id: 'projects', label: 'Projects', icon: <PieChart className="w-5 h-5" />, description: 'Kelola Proyek' },
      { id: 'audit', label: 'Audit Log', icon: <History className="w-5 h-5" />, description: 'Audit Trail' },
      { id: 'settings', label: 'Settings', icon: <RefreshCcw className="w-5 h-5" />, description: 'Konfigurasi Sistem' },
    ],
  };

  return navMap[role] || [];
};

export const getRoleDescription = (role: string): string => {
  const descriptions: Record<string, string> = {
    investor_micro: 'Investor Mikro - Mengelola portofolio investasi kecil dengan transparansi penuh',
    investor_enterprise: 'Investor Enterprise - Portfolio management advanced dengan analytics dan API integration',
    project_owner: 'Pemilik Proyek - Mengajukan proposal bisnis dan mengelola investor relations',
    muzakki: 'Muzakki - Menghitung dan mendistribusikan zakat ke 8 asnaf dengan akurat',
    munfiq_mutashadiq: 'Munfiq/Mutashadiq - Berdonasi untuk program sosial dan melihat dampak',
    wakif: 'Wakif - Mengelola wakaf produktif untuk sustainable impact',
    mustahiq: 'Mustahiq - Menerima manfaat dan mengikuti program pemberdayaan',
    investment_officer: 'Investment Officer - Mengevaluasi proposal dan mendesain skema investasi',
    portfolio_monitor: 'Portfolio Monitor - Monitoring kesehatan bisnis dan deteksi anomali',
    finance_officer: 'Finance Officer - Mengelola isolasi dana dan rekonsiliasi keuangan',
    admin: 'Admin - Mengelola sistem platform dan user management',
  };

  return descriptions[role] || 'ACO Platform User';
};
