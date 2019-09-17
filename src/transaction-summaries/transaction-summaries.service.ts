import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UserTransactionSummary } from './interfaces/user-transaction-summary.interface';
import { countTransactionsByMonth, sumTransactions } from './transaction-aggregators';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionSummariesService {
  constructor(
    private readonly userService: UsersService,
  ) {}

  private summarizeUserTransactions(users: User[]): UserTransactionSummary[] {
    return users.map(user => {
      return {
        userId: user.id,
        role: user.role,
        numTransactions: countTransactionsByMonth(user.transactions),
        amountSpent: sumTransactions(user.transactions),
      };
    });
  }

  async getUserTransactionSummaries(): Promise<UserTransactionSummary[]> {
    const users = await this.userService.list();
    return this.summarizeUserTransactions(users);
  }
}
