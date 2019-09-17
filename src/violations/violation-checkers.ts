/**
 * Violation checkers are functions that take summarized user transactions and
 * return arrays of UserViolations.
 */
import { UserTransactionSummary } from '../transaction-summaries/interfaces/user-transaction-summary.interface';
import {
  UserViolation,
} from './interfaces/user-violation.interface';
import { ViolationCheckerInterface } from './interfaces/violation-checker.interface';
import { SpendingLimitViolation } from './interfaces/spending-limit-violation.interface';
import { TransactionCountViolation } from './interfaces/transaction-count-violation.interface';

export const SPENDING_LIMIT = 'SPENDING_LIMIT';
export const TRANSACTION_COUNT_LIMIT = 'TRANSACTION_COUNT_LIMIT';

/**
 * Find any transaction count violations.
 *
 * @param summary User transaction summary to check for violations
 * @return Array of transaction count violations
 */
export function findTransactionCountViolations(summary: UserTransactionSummary): TransactionCountViolation[] {
  const violations: TransactionCountViolation[] = [];

  // If maxTxnCnt is null, there is no limit, ad thus no violations
  if (summary.role.maxTxnCount === null) {
    return violations;
  }

  // Check if transaction limits were exceeded in any month
  for (const monthsTransactions of summary.numTransactions) {
    if (monthsTransactions.numTransactions > summary.role.maxTxnCount) {
      violations.push({
        userId: summary.userId,
        type: TRANSACTION_COUNT_LIMIT,
        date: monthsTransactions.date,
        numTransactions: monthsTransactions.numTransactions,
        numTransactionsLimit: summary.role.maxTxnCount,
      });
    }
  }

  return violations;
}

/**
 * Find if there are any spending limit violations.
 *
 * Note: This returns an array of violations, even though only one violation is checked for.
 * This is intentional, as it keeps the signature of this function in line with other violations
 * checking functions that may check for several violations at once.
 *
 * @param summary User transaction summary to check for violations
 * @return Array of spending limit violations
 */
export function findSpendingLimitViolations(summary: UserTransactionSummary): SpendingLimitViolation[] {
  const violations: SpendingLimitViolation[] = [];

  // If max amount is null, there is no limit, and thus no violations
  if (summary.role.maxAmount === null) {
    return violations;
  }

  // Check for spending limit violations
  if (summary.amountSpent > summary.role.maxAmount) {
    violations.push({
      userId: summary.userId,
      type: SPENDING_LIMIT,
      amountSpent: summary.amountSpent,
      spendingLimit: summary.role.maxAmount,
    });
  }

  return violations;
}

/**
 * Find all user violations.
 *
 * @param userSummaries The user transactions to check for violations
 * @param violationCheckers An array of functions that check for violations
 * @return List of user violations
 */
export function findUserViolations(userSummaries: UserTransactionSummary[], violationCheckers: ViolationCheckerInterface[]): UserViolation[] {
  // For all summaries, for all violation checkers, add any violations to array
  // TODO: standardized error handling of violation checks
  const violations: UserViolation[] = [];
  for (const summary of userSummaries) {
    for (const checker of violationCheckers) {
      violations.push(...checker(summary));
    }
  }
  return violations;
}
