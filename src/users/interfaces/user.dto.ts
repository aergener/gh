import { RoleDto } from '../../roles/interfaces/role.dto';
import { TransactionDto } from '../../transactions/interfaces/transaction.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  companyId: number;

  @ApiModelProperty()
  roleId: number;

  @ApiModelProperty()
  role: RoleDto;

  @ApiModelProperty({ type: [TransactionDto] })
  transactions: TransactionDto[];
}
