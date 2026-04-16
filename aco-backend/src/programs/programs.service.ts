import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programsRepo: Repository<Program>,
  ) {}

  async findAll(): Promise<Program[]> {
    return this.programsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Program | null> {
    return this.programsRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Program>): Promise<Program> {
    const p = this.programsRepo.create(data);
    return this.programsRepo.save(p);
  }

  async countActive(): Promise<number> {
    return this.programsRepo.count({ where: { status: 'active' } });
  }
}
