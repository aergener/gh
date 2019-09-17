import { Controller, Get, HttpCode } from '@nestjs/common';
import { TransactionSummariesService } from './transaction-summaries.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserTransactionSummary } from './interfaces/user-transaction-summary.interface';

@ApiUseTags('User Transaction Summaries')
@Controller('transaction-summaries')
export class TransactionSummariesController {
  constructor(
    private readonly transactionSummaryService: TransactionSummariesService,
  ) {}

  @ApiResponse({ status: 200, type: [UserTransactionSummary] })
  @Get()
  @HttpCode(200)
  listTransactionSummaries(): Promise<UserTransactionSummary[]> {
    return this.transactionSummaryService.getUserTransactionSummaries();
  }
}
