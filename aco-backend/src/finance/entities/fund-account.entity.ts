import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn
} from 'typeorm';

export enum FundType {
  INVESTMENT = 'investment',
  ZAKAT = 'zakat',
  INFAQ = 'infaq',
  WAQF = 'waqf',
}

@Entity('fund_accounts')
export class FundAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  type!: string;

  @Column()
  label!: string;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  balance!: number;

  @Column({ nullable: true })
  lastReconciled?: Date;

  @Column({ default: 0 })
  pendingTransactions!: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  reconciliationPercent!: number;

  @UpdateDateColumn()
  updatedAt!: Date;
}
