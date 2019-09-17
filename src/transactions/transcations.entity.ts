import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  originAccount: number;

  @Column()
  beneficiaryAccount: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  initiatorId: number;

  @ManyToOne(type => User, user => user.transactions)
  @JoinColumn({ name: 'initiatorId' })
  initiator?: User;

  @Column()
  approverId: number;

  @ManyToOne(type => User, user => user.transactionsApproved)
  @JoinColumn({ name: 'approverId' })
  approver?: User;

  @Column()
  companyId: number;

  @Column()
  date: Date;
}
