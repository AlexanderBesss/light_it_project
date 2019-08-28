import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserPayloadDto } from './dto/userPayload.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  @ApiBearerAuth()
  @ApiOkResponse({ description: '', type: UserPayloadDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
