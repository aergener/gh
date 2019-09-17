import { ApiModelProperty } from '@nestjs/swagger';
import { UserViolation } from './user-violation.interface';

export class TransactionCountViolation extends UserViolation {
  @ApiModelProperty()
  date: string;

  @ApiModelProperty()
  numTransactions: number;

  @ApiModelProperty()
  numTransactionsLimit: number;
}
