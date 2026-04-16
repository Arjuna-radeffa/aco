import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZakatTransaction } from './entities/zakat-transaction.entity';

@Injectable()
export class ZakatService {
  constructor(
    @InjectRepository(ZakatTransaction)
    private zakatRepo: Repository<ZakatTransaction>,
  ) {}

  async findByUser(userId: string): Promise<ZakatTransaction[]> {
    return this.zakatRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findByType(userId: string, type: string): Promise<ZakatTransaction[]> {
    return this.zakatRepo.find({ where: { userId, type }, order: { createdAt: 'DESC' } });
  }

  async getTotalByUser(userId: string) {
    const result = await this.zakatRepo
      .createQueryBuilder('z')
      .select('SUM(z.amount)', 'total')
      .where('z.userId = :userId', { userId })
      .getRawOne();
    return Number(result?.total) || 0;
  }

  async create(data: Partial<ZakatTransaction>): Promise<ZakatTransaction> {
    const tx = this.zakatRepo.create(data);
    return this.zakatRepo.save(tx);
  }

  async findAll(): Promise<ZakatTransaction[]> {
    return this.zakatRepo.find({ relations: ['user'], order: { createdAt: 'DESC' } });
  }
}
