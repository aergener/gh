import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { TransactionDto } from './interfaces/transaction.dto';
import { DatePipe } from '../util/date.pipe';

@ApiUseTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
  ) {}

  @ApiResponse({ status: 200, type: [TransactionDto] })
  @Get()
  listTransactions(): Promise<TransactionDto[]> {
    return this.transactionService.list();
  }

  @ApiResponse({ status: 200, type: [TransactionDto] })
  @ApiImplicitParam({ name: 'startDate', type: 'string', description: 'Start of date range (MMDDYYYY format)' })
  @ApiImplicitParam({ name: 'endDate', type: 'string', description: 'End of date range (MMDDYYY format)' })
  @Get(':startDate/:endDate')
  @HttpCode(200)
  listTransactionsFoo(
    @Param('startDate', DatePipe) startDate: Date,
    @Param('endDate', DatePipe) endDate: Date,
  ): Promise<TransactionDto[]> {
    return this.transactionService.list(startDate, endDate);
  }

}
