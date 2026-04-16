import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepo: Repository<Investment>,
  ) {}

  async findByUser(userId: string): Promise<Investment[]> {
    return this.investmentsRepo.find({
      where: { userId },
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<Investment[]> {
    return this.investmentsRepo.find({
      relations: ['user', 'project'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: Partial<Investment>): Promise<Investment> {
    const inv = this.investmentsRepo.create(data);
    return this.investmentsRepo.save(inv);
  }

  async getTotalByUser(userId: string) {
    const result = await this.investmentsRepo
      .createQueryBuilder('inv')
      .select('SUM(inv.amount)', 'total')
      .addSelect('SUM(inv.returns)', 'totalReturns')
      .where('inv.userId = :userId', { userId })
      .getRawOne();
    return {
      total: Number(result?.total) || 0,
      totalReturns: Number(result?.totalReturns) || 0,
    };
  }

  async countActive(userId: string): Promise<number> {
    return this.investmentsRepo.count({ where: { userId, status: 'active' } });
  }
}
