import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundAccount } from './entities/fund-account.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(FundAccount)
    private fundRepo: Repository<FundAccount>,
  ) {}

  async getAllFunds(): Promise<FundAccount[]> {
    return this.fundRepo.find();
  }

  async getFundByType(type: string): Promise<FundAccount | null> {
    return this.fundRepo.findOne({ where: { type } });
  }

  async updateFund(type: string, data: Partial<FundAccount>): Promise<FundAccount | null> {
    await this.fundRepo.update({ type }, data);
    return this.getFundByType(type);
  }

  async getReconciliationStatus() {
    const funds = await this.getAllFunds();
    const avgReconciliation =
      funds.reduce((sum, f) => sum + Number(f.reconciliationPercent), 0) / (funds.length || 1);
    const totalPending = funds.reduce((sum, f) => sum + f.pendingTransactions, 0);
    return {
      funds,
      avgReconciliation: avgReconciliation.toFixed(1) + '%',
      totalPending,
    };
  }
}
