import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '../users/entities/user.entity';
import { Investment } from '../investments/entities/investment.entity';
import { Project } from '../projects/entities/project.entity';
import { ZakatTransaction } from '../zakat/entities/zakat-transaction.entity';
import { FundAccount } from '../finance/entities/fund-account.entity';
import { Program } from '../programs/entities/program.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Investment, Project, ZakatTransaction, FundAccount, Program]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
