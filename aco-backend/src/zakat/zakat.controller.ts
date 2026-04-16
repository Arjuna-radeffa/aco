import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ZakatService } from './zakat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('zakat')
@UseGuards(JwtAuthGuard)
export class ZakatController {
  constructor(private zakatService: ZakatService) {}

  @Get('transactions')
  async getMyTransactions(@Request() req, @Query('type') type?: string) {
    if (type) return this.zakatService.findByType(req.user.id, type);
    return this.zakatService.findByUser(req.user.id);
  }

  @Get('summary')
  async getSummary(@Request() req) {
    const total = await this.zakatService.getTotalByUser(req.user.id);
    return { totalPaid: total };
  }

  @Post('pay')
  async pay(@Request() req, @Body() body: any) {
    return this.zakatService.create({ ...body, userId: req.user.id, status: 'completed' });
  }
}
