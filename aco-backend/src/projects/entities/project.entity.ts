import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ProjectStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  FUNDED = 'funded',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ownerId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  businessName!: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  targetFunding!: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  raisedFunding!: number;

  @Column({ default: 0 })
  investorCount!: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  monthlyProfit!: number;

  @Column({ type: 'varchar', default: ProjectStatus.DRAFT })
  status!: string;

  @Column({ type: 'date', nullable: true })
  nextReportDue?: Date;

  @Column({ type: 'jsonb', nullable: true })
  documents?: Record<string, any>[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
