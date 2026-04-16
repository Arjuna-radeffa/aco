import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ default: 0 })
  targetBeneficiaries!: number;

  @Column({ default: 0 })
  actualBeneficiaries!: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  budget!: number;

  @Column({ type: 'varchar', default: 'active' })
  status!: string;

  @Column({ type: 'jsonb', nullable: true })
  supporters?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
