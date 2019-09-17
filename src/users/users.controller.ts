import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './interfaces/user.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @ApiResponse({ status: 200, type: [UserDto] })
  @Get('/all')
  @HttpCode(200)
  listUsers(): Promise<UserDto[]> {
    return this.userService.list();
  }

  @ApiResponse({ status: 200, type: UserDto })
  @Get(':id')
  @HttpCode(200)
  retrieveUser(@Param('id') id: number): Promise<UserDto> {
    return this.userService.retrieve(id);
  }
}
