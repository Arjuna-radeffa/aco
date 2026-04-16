import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ZakatType {
  ZAKAT = 'zakat',
  INFAQ = 'infaq',
  WAQF = 'waqf',
  SADAQAH = 'sadaqah',
}

export enum ZakatStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  DISTRIBUTED = 'distributed',
}

@Entity('zakat_transactions')
export class ZakatTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'numeric', precision: 20, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', default: ZakatType.ZAKAT })
  type!: string;

  @Column({ type: 'varchar', default: ZakatStatus.PENDING })
  status!: string;

  // Asnaf allocations stored as JSONB
  @Column({ type: 'jsonb', nullable: true })
  allocations?: Record<string, number>;

  @Column({ nullable: true })
  hijriYear?: string;

  @Column({ nullable: true })
  notes?: string;

  // For waqf: asset details
  @Column({ type: 'jsonb', nullable: true })
  waqfDetails?: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;
}
