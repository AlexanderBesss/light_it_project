import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Headers,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { UserDto } from './dto/User.dto';
import { ReturnTokenDto } from './dto/returnToken.dto';
import { PayloadDto } from './dto/payload.dto';
import { User } from './userDecorator';
import { UserPayloadDto } from 'src/users/dto/userPayload.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: UserDto, @Request() req): Promise<ReturnTokenDto> {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  refreshToken(@Headers('authorization') token): Promise<ReturnTokenDto> {
    return this.authenticationService.refreshToken(token);
  }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<PayloadDto> {
    return await this.authenticationService.register(userDto);
  }
}
