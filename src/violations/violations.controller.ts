import { Controller, Get, HttpCode } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserViolation } from './interfaces/user-violation.interface';

@ApiUseTags('Violations')
@Controller('violations')
export class ViolationsController {
  constructor(
    private violationService: ViolationsService,
  ) {}

  @ApiResponse({ status: 200, type: [UserViolation] })
  @Get()
  @HttpCode(200)
  listViolations(): Promise<UserViolation[]> {
    return this.violationService.list();
  }
}
