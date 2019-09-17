import { Injectable } from '@nestjs/common';
import { findSpendingLimitViolations, findTransactionCountViolations, findUserViolations } from './violation-checkers';
import { UserViolation } from './interfaces/user-violation.interface';
import { TransactionSummariesService } from '../transaction-summaries/transaction-summaries.service';

@Injectable()
export class ViolationsService {
  constructor(
    private readonly transactionSummariesService: TransactionSummariesService,
  ) {}

  /**
   * List all violations. A violation occurs when:
   *   - A user exceeds their maximum spending limit
   *   - A user exceeds their maximum number of monthly transactions
   *
   * Assumptions:
   *   - negative transactions are reversals of previous transactions
   *     - they should be subtracted from total amount spent
   *     - they should count negatively against the transaction limit
   *   - maxAmount is a total spending limit (not by period, or per transaction)
   */
  async list(): Promise<UserViolation[]> {
    const transactionSummaries = await this.transactionSummariesService.getUserTransactionSummaries();
    const violationCheckers = [findTransactionCountViolations, findSpendingLimitViolations];
    return findUserViolations(transactionSummaries, violationCheckers);
  }
}
