import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class AuthenticationController {
  constructor(private readonly userService: AuthenticationService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return await this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return await this.userService.login(userDto);
  }
}
