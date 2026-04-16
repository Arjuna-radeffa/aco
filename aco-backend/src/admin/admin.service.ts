import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async getAllUsers(): Promise<Omit<User, 'password' | 'refreshToken'>[]> {
    const users = await this.userRepo.find({ order: { createdAt: 'ASC' } });
    return users.map(({ password, refreshToken, ...safe }) => safe);
  }

  async getPlatformStats() {
    const totalUsers = await this.userRepo.count();
    const verifiedUsers = await this.userRepo.count({ where: { isVerified: true } });
    const activeProjects = await this.projectRepo.count({ where: { status: 'active' } });
    const totalProjects = await this.projectRepo.count();
    return {
      totalUsers,
      verifiedUsers,
      activeProjects,
      totalProjects,
      systemHealth: '100%',
      lastUpdated: new Date().toISOString(),
    };
  }

  async updateUserRole(id: string, role: string): Promise<void> {
    await this.userRepo.update(id, { role });
  }

  async updateUserKyc(id: string, kycStatus: string): Promise<void> {
    const isVerified = kycStatus === 'verified';
    await this.userRepo.update(id, { kycStatus, isVerified });
  }
}
