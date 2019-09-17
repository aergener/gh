import * as d3 from 'd3';

/**
 * Counts the number of transactions in an array of transactions. This is not
 * a trivial length check, b/c negative transactions are considered reversals
 * and thus must be subtracted from the transaction count.
 *
 * TODO: How to handle transactions with 0 amount? Currently not counted.
 */
import { Transaction } from '../transactions/transcations.entity';

export function countTransactions(transactions: Transaction[]): number {
  return transactions.reduce((cnt, transaction) => cnt + Math.sign(transaction.amount), 0);
}

/**
 * Groups transactions by month, then counts the number of transactions
 */
export function countTransactionsByMonth(transactions: Transaction[]): Array<{date: string, numTransactions: number}> {
  return d3.nest<Transaction, number>()
    .key((transaction: Transaction) => `${transaction.date.getMonth() + 1}/${transaction.date.getFullYear()}`)
    .rollup(this.countTransactions)
    .entries(transactions)
    .map(row => {
      return {date: row.key, numTransactions: row.value};
    });
}

/**
 * Sum transactions. Currently a simple sum of transaction amounts.
 */
export function sumTransactions(transactions: Transaction[]): number {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}
