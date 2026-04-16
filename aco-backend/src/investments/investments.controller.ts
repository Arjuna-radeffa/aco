import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('investments')
@UseGuards(JwtAuthGuard)
export class InvestmentsController {
  constructor(private investmentsService: InvestmentsService) {}

  @Get()
  async getMyInvestments(@Request() req) {
    return this.investmentsService.findByUser(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() body: any) {
    return this.investmentsService.create({ ...body, userId: req.user.id });
  }
}
