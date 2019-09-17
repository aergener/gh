import { ApiModelProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  category: string;

  @ApiModelProperty()
  type: string;

  @ApiModelProperty()
  originAccount: number;

  @ApiModelProperty()
  beneficiaryAccount: number;

  @ApiModelProperty()
  amount: number;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  initiatorId: number;

  @ApiModelProperty()
  approverId: number;

  @ApiModelProperty()
  companyId: number;

  @ApiModelProperty({ type: 'string', format: 'date-time' })
  date: Date;
}
