import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';

export enum UserRole {
  INVESTOR_MICRO = 'investor_micro',
  INVESTOR_ENTERPRISE = 'investor_enterprise',
  PROJECT_OWNER = 'project_owner',
  MUZAKKI = 'muzakki',
  MUNFIQ_MUTASHADIQ = 'munfiq_mutashadiq',
  WAKIF = 'wakif',
  MUSTAHIQ = 'mustahiq',
  INVESTMENT_OFFICER = 'investment_officer',
  PORTFOLIO_MONITOR = 'portfolio_monitor',
  FINANCE_OFFICER = 'finance_officer',
  ADMIN = 'admin',
}

export enum KYCStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ type: 'varchar', default: UserRole.INVESTOR_MICRO })
  role!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ type: 'varchar', default: KYCStatus.PENDING })
  kycStatus!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  department?: string;

  // JSONB column - stores role-specific profile data
  @Column({ type: 'jsonb', nullable: true })
  profileData?: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column({ nullable: true })
  refreshToken?: string;
}