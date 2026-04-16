import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ order: { createdAt: 'ASC' } });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLogin: new Date() });
  }

  async updateProfile(id: string, data: Partial<User>): Promise<User | null> {
    // Don't allow password/email update via this method
    const { password, email, id: _, ...safeData } = data as any;
    await this.usersRepository.update(id, safeData);
    return this.findById(id);
  }

  async updateProfileData(id: string, profileData: Record<string, any>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    const merged = { ...(user.profileData || {}), ...profileData };
    await this.usersRepository.update(id, { profileData: merged });
    return this.findById(id);
  }

  async updateKycStatus(id: string, status: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.kycStatus = status;
    if (status === 'verified') user.isVerified = true;
    return this.usersRepository.save(user);
  }
}