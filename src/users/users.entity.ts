import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Transaction } from '../transactions/transcations.entity';
import { Role } from '../roles/roles.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  companyId: number;

  @Column()
  roleId: number;

  @ManyToOne(type => Role, role => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(type => Transaction, transaction => transaction.initiator)
  transactions: Transaction[];

  @OneToMany(type => Transaction, transaction => transaction.approver)
  transactionsApproved: Transaction[];
}
