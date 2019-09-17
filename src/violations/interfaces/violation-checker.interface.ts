import { UserViolation } from './user-violation.interface';
import { UserTransactionSummary } from '../../transaction-summaries/interfaces/user-transaction-summary.interface';

export type ViolationCheckerInterface = (summary: UserTransactionSummary) => UserViolation[];
