import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('programs')
@UseGuards(JwtAuthGuard)
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  async getAll() {
    return this.programsService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.programsService.create(body);
  }
}
