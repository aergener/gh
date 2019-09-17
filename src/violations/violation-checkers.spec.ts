import {
  findSpendingLimitViolations,
  findTransactionCountViolations,
  findUserViolations, SPENDING_LIMIT,
  TRANSACTION_COUNT_LIMIT,
} from './violation-checkers';
import { Role } from '../roles/roles.entity';
import { UserTransactionSummary } from '../transaction-summaries/interfaces/user-transaction-summary.interface';

describe('findTransactionCountViolations', () => {
  it('should handle zero limits correctly', () => {
    expect(findTransactionCountViolations(zeroLimitSummary).length).toBe(1);
  });

  it('should handle no limits correctly', () => {
    expect(findTransactionCountViolations(noLimitSummary).length).toBe(0);
  });
});

describe('findSpendingLimitViolations', () => {
  it('should handle zero limits correctly', () => {
    expect(findSpendingLimitViolations(zeroLimitSummary).length).toBe(1);
  });

  it('should handle no limits correctly', () => {
    expect(findSpendingLimitViolations(noLimitSummary).length).toBe(0);
  });
});

describe('findUserViolations', () => {
  it('should work on typical data', () => {
    expect(
      findUserViolations(mockUserTransactionSummaries, [findSpendingLimitViolations, findTransactionCountViolations]),
    ).toEqual([
        { date: '1/2019', numTransactions: 5, numTransactionsLimit: 3, type: TRANSACTION_COUNT_LIMIT, userId: 1 },
        { amountSpent: 1700, spendingLimit: 1000, type: SPENDING_LIMIT, userId: 2 },
        { date: '1/2019', numTransactions: 5, numTransactionsLimit: 0, type: TRANSACTION_COUNT_LIMIT, userId: 2 },
        { date: '2/2019', numTransactions: 3, numTransactionsLimit: 0, type: TRANSACTION_COUNT_LIMIT, userId: 2 },
        { date: '3/2019', numTransactions: 1, numTransactionsLimit: 0, type: TRANSACTION_COUNT_LIMIT, userId: 2 },
    ]);
  });
});

/*********************
 ** TEST DATA BELOW **
 *********************/
const noLimitRole: Role = {
  id: null,
  title: null,
  maxAmount: null,
  maxTxnCount: null,
  canSend: null,
  canApprove: null,
  canApproveOwn: null,
};

const zeroLimitRole: Role = {
  id: null,
  title: null,
  maxAmount: 0,
  maxTxnCount: 0,
  canSend: null,
  canApprove: null,
  canApproveOwn: null,
};

const noLimitSummary: UserTransactionSummary = {
  userId: 1,
  role: noLimitRole,
  amountSpent: 100,
  numTransactions: [
    { date: '1/2019', numTransactions: 1 },
  ],
};

const zeroLimitSummary: UserTransactionSummary = {
  userId: 1,
  role: zeroLimitRole,
  amountSpent: 100,
  numTransactions: [
    { date: '1/2019', numTransactions: 1 },
  ],
};

const mockUserTransactionSummaries: UserTransactionSummary[] = [
  {
    userId: 1,
    role: {
      id: null,
      title: null,
      maxAmount: 1000,
      maxTxnCount: 3,
      canSend: null,
      canApprove: null,
      canApproveOwn: null,
    },
    numTransactions: [
      { date: '1/2019', numTransactions: 5 },
      { date: '2/2019', numTransactions: 3 },
      { date: '4/2019', numTransactions: 1 },
    ],
    amountSpent: 900,
  },
  {
    userId: 2,
    role: {
      id: null,
      title: null,
      maxAmount: 1000,
      maxTxnCount: 0,
      canSend: null,
      canApprove: null,
      canApproveOwn: null,
    },
    numTransactions: [
      { date: '1/2019', numTransactions: 5 },
      { date: '2/2019', numTransactions: 3 },
      { date: '3/2019', numTransactions: 1 },
      { date: '4/2019', numTransactions: 0 },
    ],
    amountSpent: 1700,
  },
  {
    userId: 2,
    role: {
      id: null,
      title: null,
      maxAmount: null,
      maxTxnCount: null,
      canSend: null,
      canApprove: null,
      canApproveOwn: null,
    },
    numTransactions: [
      { date: '1/2019', numTransactions: 5 },
      { date: '2/2019', numTransactions: 3 },
      { date: '3/2019', numTransactions: 1 },
      { date: '4/2019', numTransactions: 0 },
    ],
    amountSpent: 1700,
  },
];
