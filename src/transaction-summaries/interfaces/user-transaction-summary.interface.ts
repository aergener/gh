import { ApiModelProperty } from '@nestjs/swagger';
import { RoleDto } from '../../roles/interfaces/role.dto';
import { TransactionCountByMonth } from './transaction-count-by-month.interface';

export class UserTransactionSummary {
  @ApiModelProperty()
  userId: number;

  @ApiModelProperty()
  role: RoleDto;

  @ApiModelProperty({ type: [TransactionCountByMonth] })
  numTransactions: TransactionCountByMonth[];

  @ApiModelProperty()
  amountSpent: number;
}
