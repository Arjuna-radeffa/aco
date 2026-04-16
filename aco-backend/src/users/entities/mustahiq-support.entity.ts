import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity('mustahiq_support')
export class MustahiqSupport {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  supportType?: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  monthlySupport!: number;

  @Column({ type: 'jsonb', nullable: true })
  programs?: string[];

  @Column({ nullable: true })
  empowermentStatus?: string;

  @Column({ nullable: true })
  enrollmentDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
