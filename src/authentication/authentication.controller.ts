import { Controller, UseGuards, Post, Body, Request, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { AuthUserDto } from './dto/authUser.dto';
import { ReturnTokenDto } from './dto/returnToken.dto';
import { UserPayloadDto } from './dto/userPayload.dto';
import { User } from './userDecorator';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@User() user: AuthUserDto): Promise<ReturnTokenDto> {
    return this.authenticationService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  refreshToken(@Headers('authorization') token, @Request() req): Promise<ReturnTokenDto> {
    return this.authenticationService.refreshToken(token, req.user);
  }

  @Post('register')
  async register(@Body() userDto: AuthUserDto): Promise<UserPayloadDto> {
    return await this.authenticationService.register(userDto);
  }
}
