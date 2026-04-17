import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole, KYCStatus } from '../users/entities/user.entity';
import { Project, ProjectStatus } from '../projects/entities/project.entity';
import { FundAccount } from '../finance/entities/fund-account.entity';
import { Program } from '../programs/entities/program.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '2wsx1qaz',
    database: 'aco_platform',
    entities: [User, Project, FundAccount, Program],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Data Source has been initialized!');

  const userRepository = dataSource.getRepository(User);
  const projectRepository = dataSource.getRepository(Project);
  const fundRepository = dataSource.getRepository(FundAccount);
  const programRepository = dataSource.getRepository(Program);

  // Clear existing data
  await projectRepository.query('TRUNCATE "projects" CASCADE');
  await userRepository.query('TRUNCATE "users" CASCADE');
  await fundRepository.query('TRUNCATE "fund_accounts" CASCADE');
  await programRepository.query('TRUNCATE "programs" CASCADE');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Seed Fund Accounts
  const funds = [
    { type: 'investment', label: 'Investment Fund', balance: 2450000000000, pendingTransactions: 12, reconciliationPercent: 99.8 },
    { type: 'zakat', label: 'Zakat Fund', balance: 125000000000, pendingTransactions: 5, reconciliationPercent: 100 },
    { type: 'infaq', label: 'Infaq Fund', balance: 85000000000, pendingTransactions: 2, reconciliationPercent: 99.5 },
    { type: 'waqf', label: 'Waqf Fund', balance: 500000000000, pendingTransactions: 0, reconciliationPercent: 100 },
  ];
  await fundRepository.save(funds);

  // 2. Seed Programs
  const programs = [
    { name: 'Pemberdayaan UMKM Perempuan', description: 'Program modal usaha untuk ibu rumah tangga produktif', category: 'Ekonomi', targetBeneficiaries: 500, actualBeneficiaries: 234, budget: 1500000000 },
    { name: 'Program Beasiswa Anak Yatim', description: 'Beasiswa pendidikan untuk anak yatim piatu jenjang SD-SMA', category: 'Pendidikan', targetBeneficiaries: 200, actualBeneficiaries: 145, budget: 800000000 },
    { name: 'Klinik Kesehatan Gratis', description: 'Layanan kesehatan cuma-cuma untuk warga lansia', category: 'Kesehatan', targetBeneficiaries: 1000, actualBeneficiaries: 876, budget: 1200000000 },
    { name: 'Rumah Panen Urban Farming', description: 'Pelatihan dan sarana urban farming di lahan sempit', category: 'Lingkungan', targetBeneficiaries: 50, actualBeneficiaries: 42, budget: 300000000 },
  ];
  await programRepository.save(programs);

  // 3. Seed 11 Demo Users
  const users = [
    {
      email: 'rina@aco.com',
      password: passwordHash,
      name: 'Rina Wijaya',
      role: 'investor_micro',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        investmentBalance: 'Rp 45.230.000',
        zakatBalance: 'Rp 0',
        activeInvestments: 3,
        totalReturns: 'Rp 2.450.000',
        nextDisbursement: '15 April 2026',
        recentTransactions: [
          { date: '2026-04-10', type: 'Investment', amount: 'Rp 5.000.000', status: 'Completed' },
          { date: '2026-04-01', type: 'Return', amount: 'Rp 850.000', status: 'Completed' }
        ]
      }
    },
    {
      email: 'budi@aco.com',
      password: passwordHash,
      name: 'Budi Santoso',
      role: 'investor_enterprise',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        investmentBalance: 'Rp 450.230.000.000',
        zakatBalance: 'Rp 12.450.000',
        portfolioValue: 'Rp 500.000.000.000',
        activeInvestments: 12,
        totalReturns: 'Rp 24.500.000.000',
        apiIntegrationActive: true
      }
    },
    {
      email: 'dimas@aco.com',
      password: passwordHash,
      name: 'Dimas Pratama',
      role: 'project_owner',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        businessName: 'Toko Laundry Malang',
        projectStatus: 'Active',
        fundingRaised: 'Rp 150.000.000',
        investorCount: 23,
        monthlyProfit: 'Rp 18.500.000',
        nextReportDue: '30 April 2026'
      }
    },
    {
      email: 'salim@aco.com',
      password: passwordHash,
      name: 'Pak Salim Hartono',
      role: 'muzakki',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        zakatBalance: 'Rp 25.000.000',
        zakatYear: '1447H',
        lastDistribution: '25 Maret 2026',
        asnafAllocation: {
          fakir: 'Rp 5.000.000',
          miskin: 'Rp 5.000.000',
          amil: 'Rp 2.500.000',
          muallaf: 'Rp 2.500.000',
          riqab: 'Rp 2.500.000',
          gharim: 'Rp 2.500.000',
          fisabilillah: 'Rp 3.000.000',
          ibn_sabil: 'Rp 2.000.000'
        }
      }
    },
    {
      email: 'tari@aco.com',
      password: passwordHash,
      name: 'Bu Tari Rahayu',
      role: 'munfiq_mutashadiq',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        monthlyDonation: 'Rp 5.000.000',
        activePrograms: 4,
        totalImpact: 'Rp 45.000.000',
        beneficiaries: 234,
        programsSupported: [
           'Pemberdayaan UMKM Perempuan', 
           'Program Beasiswa Anak Yatim', 
           'Klinik Kesehatan Gratis', 
           'Rumah Panen Urban Farming'
        ]
      }
    },
    {
      email: 'mahmud@aco.com',
      password: passwordHash,
      name: 'Haji Mahmud',
      role: 'wakif',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        waqfAsset: 'Rp 500.000.000',
        waqfType: 'Productive Waqf (Wakaf Produktif)',
        assetDescription: 'Toserba Waralaba di Jakarta & Surabaya',
        monthlyYield: 'Rp 8.500.000',
        waqfNiyyah: 'Untuk Dakwah Islam dan Pendidikan',
        registrationDate: '01 Januari 2024'
      }
    },
    {
      email: 'ruslan@aco.com',
      password: passwordHash,
      name: 'Pak Ruslan',
      role: 'mustahiq',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      profileData: {
        supportType: 'Penerima Manfaat (Beneficiary)',
        monthlySupport: 'Rp 2.000.000',
        programs: ['Program Pelatihan Otomotif', 'Bansos Produktif', 'Fasilitasi Pinjaman Modal Usaha'],
        empowermentStatus: 'Transitioning to Investor',
        enrollmentDate: '15 Juli 2024'
      }
    },
    {
      email: 'arief@aco.com',
      password: passwordHash,
      name: 'Arief Wijaksana',
      role: 'investment_officer',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      department: 'Investment Management',
      profileData: {
        pipeline: { submitted: 5, underReview: 3, approved: 12, rejected: 1 },
        dueDiligenceActive: 3,
        projectsManaged: 28
      }
    },
    {
      email: 'sinta@aco.com',
      password: passwordHash,
      name: 'Sinta Kusuma',
      role: 'portfolio_monitor',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      department: 'Portfolio Management',
      profileData: {
        portfoliosMonitored: 28,
        healthStatus: 'Excellent',
        anomaliesDetected: 1,
        interventionsPlanned: 1,
        reportsSubmitted: 47
      }
    },
    {
      email: 'hendra@aco.com',
      password: passwordHash,
      name: 'Hendra Gunawan',
      role: 'finance_officer',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      department: 'Finance',
      profileData: {
        fundIsolation: {
          investmentFund: 'Rp 2.450.000.000.000',
          zakatFund: 'Rp 125.000.000.000',
          infaqFund: 'Rp 85.000.000.000',
          waqfFund: 'Rp 500.000.000.000'
        },
        reconciliationStatus: '99.8% Match',
        pendingTransactions: 12
      }
    },
    {
      email: 'reza@aco.com',
      password: passwordHash,
      name: 'Reza Pratama',
      role: 'admin',
      isVerified: true,
      kycStatus: KYCStatus.VERIFIED,
      department: 'Platform Operations',
      profileData: {
        permissions: 'Full Access',
        totalUsers: 1247,
        activeProjects: 89,
        systemHealth: '100%',
        auditLog: 'Last Updated: 13 April 2026 12:30'
      }
    }
  ];

  const savedUsers = await userRepository.save(users);

  // 4. Seed Projects (for Homepage & Project Owner)
  const po1 = savedUsers.find(u => u.role === 'project_owner');
  const projectList = [
    {
      ownerId: po1?.id,
      name: 'Lumbung Pangan Sukabumi',
      businessName: 'Lumbung Pangan',
      description: 'Pengembangan lumbung pangan modern untuk ketahanan pangan daerah.',
      category: 'Agribisnis',
      targetFunding: 750000000,
      raisedFunding: 450000000,
      investorCount: 56,
      monthlyProfit: 22000000,
      status: ProjectStatus.ACTIVE,
      nextReportDue: new Date('2026-05-10')
    },
    {
      ownerId: po1?.id,
      name: 'Ruko Syariah Mediterania',
      businessName: 'Syariah Property',
      description: 'Pembangunan ruko komersial dengan skema kepemilikan syariah tanpa riba.',
      category: 'Properti',
      targetFunding: 1200000000,
      raisedFunding: 850000000,
      investorCount: 34,
      monthlyProfit: 0,
      status: ProjectStatus.ACTIVE,
      nextReportDue: new Date('2026-05-30')
    },
    {
      ownerId: po1?.id,
      name: 'Ekspansi Laundry Eco',
      businessName: 'Eco Laundry',
      description: 'Pembukaan 3 cabang baru laundry ramah lingkungan di area kampus.',
      category: 'UMKM',
      targetFunding: 250000000,
      raisedFunding: 250000000,
      investorCount: 18,
      monthlyProfit: 12500000,
      status: ProjectStatus.FUNDED,
      nextReportDue: new Date('2026-04-30')
    },
    {
      ownerId: po1?.id,
      name: 'Kopi Arabika Gayo V2',
      businessName: 'Gayo Coffee Co',
      description: 'Peningkatan kapasitas produksi dan pengolahan biji kopi arabika gayo kualitas ekspor.',
      category: 'Agribisnis',
      targetFunding: 300000000,
      raisedFunding: 180000000,
      investorCount: 42,
      monthlyProfit: 15000000,
      status: ProjectStatus.ACTIVE,
      nextReportDue: new Date('2026-05-15')
    }
  ];
  await projectRepository.save(projectList);

  console.log('Database seeded successfully! 🎉');
  await dataSource.destroy();
}

seed().catch(error => {
  console.error('Seeding error:', error);
  process.exit(1);
});