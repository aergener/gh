import { ApiModelProperty } from '@nestjs/swagger';

export class UserViolation {
  @ApiModelProperty()
  userId: number;

  @ApiModelProperty()
  type: string;
}
