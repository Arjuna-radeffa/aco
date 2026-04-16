import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Investment } from '../investments/entities/investment.entity';
import { Project } from '../projects/entities/project.entity';
import { ZakatTransaction } from '../zakat/entities/zakat-transaction.entity';
import { FundAccount } from '../finance/entities/fund-account.entity';
import { Program } from '../programs/entities/program.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Investment) private investRepo: Repository<Investment>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(ZakatTransaction) private zakatRepo: Repository<ZakatTransaction>,
    @InjectRepository(FundAccount) private fundRepo: Repository<FundAccount>,
    @InjectRepository(Program) private programRepo: Repository<Program>,
  ) {}

  async getDashboardData(user: User) {
    const role = user.role;
    const profileData = user.profileData || {};

    switch (role) {
      case 'investor_micro':
      case 'investor_enterprise':
        return this.getInvestorDashboard(user, profileData);
      case 'project_owner':
        return this.getProjectOwnerDashboard(user, profileData);
      case 'muzakki':
        return this.getMuzakkiDashboard(user, profileData);
      case 'munfiq_mutashadiq':
        return this.getMunfiqDashboard(user, profileData);
      case 'wakif':
        return this.getWakifDashboard(user, profileData);
      case 'mustahiq':
        return this.getMustahiqDashboard(user, profileData);
      case 'investment_officer':
        return this.getInvestmentOfficerDashboard(user, profileData);
      case 'portfolio_monitor':
        return this.getPortfolioMonitorDashboard(user, profileData);
      case 'finance_officer':
        return this.getFinanceOfficerDashboard(user, profileData);
      case 'admin':
        return this.getAdminDashboard(user, profileData);
      default:
        return { role, user: { id: user.id, name: user.name, email: user.email } };
    }
  }

  private async getInvestorDashboard(user: User, profileData: any) {
    const investments = await this.investRepo.find({ where: { userId: user.id }, relations: ['project'] });
    const activeCount = investments.filter(i => i.status === 'active').length;
    const totalInvested = investments.reduce((s, i) => s + Number(i.amount), 0);
    const totalReturns = investments.reduce((s, i) => s + Number(i.returns), 0);

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus },
      summary: {
        investmentBalance: profileData.investmentBalance || totalInvested,
        zakatBalance: profileData.zakatBalance || 0,
        activeInvestments: activeCount || profileData.activeInvestments || 0,
        totalReturns: profileData.totalReturns || totalReturns,
        nextDisbursement: profileData.nextDisbursement || null,
        portfolioValue: profileData.portfolioValue || null,
        portfolioChange: profileData.portfolioChange || '+0%',
        apiIntegrationActive: profileData.apiIntegrationActive || false,
      },
      investments: investments.length ? investments : profileData.investments || [],
      recentTransactions: profileData.recentTransactions || [],
    };
  }

  private async getProjectOwnerDashboard(user: User, profileData: any) {
    const projects = await this.projectRepo.find({ where: { ownerId: user.id } });
    const activeProject = projects.find(p => p.status === 'active') || projects[0];

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus },
      summary: {
        businessName: activeProject?.businessName || profileData.businessName || '-',
        projectStatus: activeProject?.status || profileData.projectStatus || 'pending',
        fundingRaised: activeProject?.raisedFunding || profileData.fundingRaised || 0,
        investorCount: activeProject?.investorCount || profileData.investorCount || 0,
        monthlyProfit: activeProject?.monthlyProfit || profileData.monthlyProfit || 0,
        nextReportDue: activeProject?.nextReportDue || profileData.nextReportDue || null,
        fundingTarget: activeProject?.targetFunding || profileData.fundingTarget || 0,
      },
      projects: projects.length ? projects : profileData.projects || [],
      recentReports: profileData.recentReports || [],
    };
  }

  private async getMuzakkiDashboard(user: User, profileData: any) {
    const txs = await this.zakatRepo.find({ where: { userId: user.id, type: 'zakat' }, order: { createdAt: 'DESC' } });
    const totalZakat = txs.reduce((s, t) => s + Number(t.amount), 0);

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus },
      summary: {
        zakatBalance: profileData.zakatBalance || totalZakat,
        zakatYear: profileData.zakatYear || '1446H',
        lastDistribution: profileData.lastDistribution || null,
        asnafAllocation: profileData.asnafAllocation || txs[0]?.allocations || {
          fakir: 0, miskin: 0, amil: 0, muallaf: 0, riqab: 0, gharim: 0, fisabilillah: 0, ibn_sabil: 0,
        },
      },
      transactions: txs.length ? txs : profileData.transactions || [],
    };
  }

  private async getMunfiqDashboard(user: User, profileData: any) {
    const txs = await this.zakatRepo.find({ where: { userId: user.id, type: 'infaq' }, order: { createdAt: 'DESC' } });
    const programs = await this.programRepo.find({ where: { status: 'active' } });
    const total = txs.reduce((s, t) => s + Number(t.amount), 0);

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus },
      summary: {
        monthlyDonation: profileData.monthlyDonation || 0,
        activePrograms: profileData.activePrograms || programs.length,
        totalImpact: profileData.totalImpact || total,
        beneficiaries: profileData.beneficiaries || 0,
        programsSupported: profileData.programsSupported || [],
      },
      programs: programs.length ? programs.slice(0, 4) : profileData.programsList || [],
      transactions: txs.length ? txs : profileData.transactions || [],
    };
  }

  private async getWakifDashboard(user: User, profileData: any) {
    const txs = await this.zakatRepo.find({ where: { userId: user.id, type: 'waqf' }, order: { createdAt: 'DESC' } });

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus },
      summary: {
        waqfAsset: profileData.waqfAsset || 0,
        waqfType: profileData.waqfType || 'Productive Waqf',
        assetDescription: profileData.assetDescription || '-',
        monthlyYield: profileData.monthlyYield || 0,
        waqfNiyyah: profileData.waqfNiyyah || '-',
        registrationDate: profileData.registrationDate || null,
      },
      waqfTransactions: txs.length ? txs : profileData.transactions || [],
    };
  }

  private async getMustahiqDashboard(user: User, profileData: any) {
    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus },
      summary: {
        supportType: profileData.supportType || 'Penerima Manfaat',
        monthlySupport: profileData.monthlySupport || 0,
        programs: profileData.programs || [],
        empowermentStatus: profileData.empowermentStatus || 'Enrolled',
        enrollmentDate: profileData.enrollmentDate || null,
      },
      programs: profileData.programDetails || [],
    };
  }

  private async getInvestmentOfficerDashboard(user: User, profileData: any) {
    const allProjects = await this.projectRepo.find();
    const submitted = allProjects.filter(p => p.status === 'draft').length;
    const approved = allProjects.filter(p => p.status === 'active').length;

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus, department: user.department },
      summary: {
        pipeline: {
          submitted: profileData.pipeline?.submitted || submitted,
          underReview: profileData.pipeline?.underReview || 3,
          approved: profileData.pipeline?.approved || approved,
          rejected: profileData.pipeline?.rejected || 1,
        },
        dueDiligenceActive: profileData.dueDiligenceActive || 3,
        projectsManaged: profileData.projectsManaged || allProjects.length,
      },
      recentProjects: allProjects.slice(0, 5),
    };
  }

  private async getPortfolioMonitorDashboard(user: User, profileData: any) {
    const allProjects = await this.projectRepo.find({ where: { status: 'active' } });

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus, department: user.department },
      summary: {
        portfoliosMonitored: profileData.portfoliosMonitored || allProjects.length,
        healthStatus: profileData.healthStatus || 'Excellent',
        anomaliesDetected: profileData.anomaliesDetected || 0,
        interventionsPlanned: profileData.interventionsPlanned || 0,
        reportsSubmitted: profileData.reportsSubmitted || 0,
      },
      portfolios: allProjects.slice(0, 10),
    };
  }

  private async getFinanceOfficerDashboard(user: User, profileData: any) {
    const funds = await this.fundRepo.find();

    const fundIsolation = funds.reduce((acc, f) => {
      acc[f.type + 'Fund'] = Number(f.balance);
      return acc;
    }, {} as Record<string, number>);

    const totalPending = funds.reduce((s, f) => s + f.pendingTransactions, 0);
    const avgReconciliation = funds.length
      ? funds.reduce((s, f) => s + Number(f.reconciliationPercent), 0) / funds.length
      : 99.8;

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus, department: user.department },
      summary: {
        fundIsolation: Object.keys(fundIsolation).length ? fundIsolation : profileData.fundIsolation,
        reconciliationStatus: `${avgReconciliation.toFixed(1)}% Match`,
        pendingTransactions: totalPending || profileData.pendingTransactions || 0,
      },
      funds,
    };
  }

  private async getAdminDashboard(user: User, profileData: any) {
    const totalUsers = await this.userRepo.count();
    const activeProjects = await this.projectRepo.count({ where: { status: 'active' } });

    return {
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email, kycStatus: user.kycStatus, department: user.department },
      summary: {
        totalUsers: totalUsers || profileData.totalUsers || 0,
        activeProjects: activeProjects || profileData.activeProjects || 0,
        systemHealth: profileData.systemHealth || '100%',
        permissions: profileData.permissions || 'Full Access',
        auditLog: `Last Updated: ${new Date().toLocaleString('id-ID')}`,
      },
    };
  }
}
