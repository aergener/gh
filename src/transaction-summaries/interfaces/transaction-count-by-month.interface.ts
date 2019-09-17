import { ApiModelProperty } from '@nestjs/swagger';

export class TransactionCountByMonth {
  @ApiModelProperty()
  date: string;

  @ApiModelProperty()
  numTransactions: number;
}