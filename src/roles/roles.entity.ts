import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  maxAmount: number;

  @Column({ nullable: true })
  maxTxnCount: number;

  @Column()
  canSend: boolean;

  @Column()
  canApprove: boolean;

  @Column()
  canApproveOwn: boolean;

  @OneToMany(type => User, user => user.role)
  users?: User[];
}
