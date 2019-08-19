import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return await this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return await this.userService.login(userDto);
  }
}
