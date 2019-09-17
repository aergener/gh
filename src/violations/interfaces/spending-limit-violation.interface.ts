import { ApiModelProperty } from '@nestjs/swagger';
import { UserViolation } from './user-violation.interface';

export class SpendingLimitViolation extends UserViolation {
  @ApiModelProperty()
  amountSpent: number;

  @ApiModelProperty()
  spendingLimit: number;
}