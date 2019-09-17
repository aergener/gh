import { ApiModelProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  maxAmount: number;

  @ApiModelProperty()
  maxTxnCount: number;

  @ApiModelProperty()
  canSend: boolean;

  @ApiModelProperty()
  canApprove: boolean;

  @ApiModelProperty()
  canApproveOwn: boolean;
}
