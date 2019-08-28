import { Controller, UseGuards, Post, Body, Request, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { AuthUserDto } from './dto/authUser.dto';
import { ReturnTokenDto } from './dto/returnToken.dto';
import { UserPayloadDto } from './dto/userPayload.dto';
import { User } from './userDecorator';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOkResponse({ description: 'register new user', type: ReturnTokenDto })
  @ApiBadRequestResponse({ description: 'bad request' })
  @Post('login')
  async login(@User() user: AuthUserDto): Promise<ReturnTokenDto> {
    return this.authenticationService.login(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'token refreshed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  refreshToken(@Headers('authorization') token, @Request() req): Promise<ReturnTokenDto> {
    return this.authenticationService.refreshToken(token, req.user);
  }

  @ApiCreatedResponse({ description: 'register new user', type: UserPayloadDto })
  @ApiBadRequestResponse({ description: 'bad request' })
  @Post('register')
  async register(@Body() userDto: AuthUserDto): Promise<UserPayloadDto> {
    return await this.authenticationService.register(userDto);
  }
}
