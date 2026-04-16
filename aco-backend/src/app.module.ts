import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvestmentsModule } from './investments/investments.module';
import { ProjectsModule } from './projects/projects.module';
import { ZakatModule } from './zakat/zakat.module';
import { FinanceModule } from './finance/finance.module';
import { AdminModule } from './admin/admin.module';

import { User } from './users/entities/user.entity';
import { Investment } from './investments/entities/investment.entity';
import { Project } from './projects/entities/project.entity';
import { ZakatTransaction } from './zakat/entities/zakat-transaction.entity';
import { FundAccount } from './finance/entities/fund-account.entity';
import { Program } from './programs/entities/program.entity';
import { MustahiqSupport } from './users/entities/mustahiq-support.entity';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '2wsx1qaz'),
        database: configService.get('DB_NAME', 'aco_platform'),
        entities: [User, Investment, Project, ZakatTransaction, FundAccount, Program, MustahiqSupport],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    DashboardModule,
    InvestmentsModule,
    ProjectsModule,
    ZakatModule,
    FinanceModule,
    AdminModule,
    ProgramsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
