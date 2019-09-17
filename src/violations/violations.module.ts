import { Module } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { ViolationsController } from './violations.controller';
import { TransactionSummariesModule } from '../transaction-summaries/transaction-summaries.module';

@Module({
  imports: [TransactionSummariesModule],
  providers: [ViolationsService],
  controllers: [ViolationsController],
})
export class ViolationsModule {}
