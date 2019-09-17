import { countTransactionsByMonth, sumTransactions } from './transaction-aggregators';
import { Transaction } from '../transactions/transcations.entity';

describe('countTransactionsByMonth', () => {
  it('should properly handle negative transactions', () => {
    expect(countTransactionsByMonth(mockTransactions)).toEqual([
      { date: '1/2019', numTransactions: 0 },
      { date: '2/2019', numTransactions: 2 },
    ]);
  });
});

describe('sumTransactions', () => {
  it('should properly sum transactions', () => {
    expect(sumTransactions(mockTransactions)).toEqual(500);
  });
});

// Test data
const mockTransactions: Transaction[] = [
  { id: null, category: null, type: null, originAccount: null, beneficiaryAccount: null,
    description: null, initiatorId: null, approverId: null, companyId: null,
    date: new Date(2019, 0, 10), amount: 100,
  },
  { id: null, category: null, type: null, originAccount: null, beneficiaryAccount: null,
    description: null, initiatorId: null, approverId: null, companyId: null,
    date: new Date(2019, 0, 11), amount: -100,
  },
  { id: null, category: null, type: null, originAccount: null, beneficiaryAccount: null,
    description: null, initiatorId: null, approverId: null, companyId: null,
    date: new Date(2019, 1, 10), amount: 200,
  },
  { id: null, category: null, type: null, originAccount: null, beneficiaryAccount: null,
    description: null, initiatorId: null, approverId: null, companyId: null,
    date: new Date(2019, 1, 11), amount: 300,
  },
];
