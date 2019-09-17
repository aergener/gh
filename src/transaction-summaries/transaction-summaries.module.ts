import { Module } from '@nestjs/common';
import { TransactionSummariesService } from './transaction-summaries.service';
import { TransactionSummariesController } from './transaction-summaries.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  exports: [TransactionSummariesService],
  providers: [TransactionSummariesService],
  controllers: [TransactionSummariesController],
})
export class TransactionSummariesModule {}
