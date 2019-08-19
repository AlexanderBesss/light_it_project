import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Request,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  refreshToken(@Headers('authorization') token) {
    return this.authenticationService.refreshToken(token);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authenticationService.register(userDto);
  }
}
