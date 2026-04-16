import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepo: Repository<Project>,
  ) {}

  async findByOwner(ownerId: string): Promise<Project[]> {
    return this.projectsRepo.find({ where: { ownerId }, order: { createdAt: 'DESC' } });
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepo.find({ relations: ['owner'], order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectsRepo.findOne({ where: { id }, relations: ['owner'] });
  }

  async create(data: Partial<Project>): Promise<Project> {
    const p = this.projectsRepo.create(data);
    return this.projectsRepo.save(p);
  }

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    await this.projectsRepo.update(id, data);
    return this.findById(id);
  }

  async countActive(): Promise<number> {
    return this.projectsRepo.count({ where: { status: 'active' } });
  }
}
