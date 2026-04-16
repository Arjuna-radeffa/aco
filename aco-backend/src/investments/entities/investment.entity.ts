import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export enum InvestmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  projectId?: string;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  amount!: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  returnRate!: number;

  @Column({ type: 'varchar', default: InvestmentStatus.ACTIVE })
  status!: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  returns!: number;

  @Column({ nullable: true })
  fundType?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
