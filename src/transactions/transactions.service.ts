import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transcations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * List all transactions. Optionally takes a start and end date to filter
   * transactions to a specific date range.
   * @param {Date} startDate
   * @param {Date} endDate
   * @return Promise<Transaction[]> List of transactions
   */
  list(startDate?: Date, endDate?: Date): Promise<Transaction[]> {
    let query = this.transactionRepository.createQueryBuilder().orderBy('date');
    if (startDate) {
      query = query.andWhere('date >= :startDate', { startDate: startDate.toISOString().slice(0, 10) });
    }
    if (endDate) {
      query = query.andWhere('date <= :endDate', { endDate: endDate.toISOString().slice(0, 10) });
    }
    return query.getMany();
  }
}
