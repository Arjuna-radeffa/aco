import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('finance')
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Get('funds')
  async getFunds() {
    return this.financeService.getAllFunds();
  }

  @Get('reconciliation')
  async getReconciliation() {
    return this.financeService.getReconciliationStatus();
  }
}
