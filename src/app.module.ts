import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { RolesModule } from './roles/roles.module';
import { ViolationsModule } from './violations/violations.module';
import { TransactionSummariesModule } from './transaction-summaries/transaction-summaries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TransactionsModule,
    RolesModule,
    ViolationsModule,
    TransactionSummariesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
