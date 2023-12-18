import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.usersService.login(userDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
}
