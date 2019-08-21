import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/authUser.dto';
import { UserPayloadDto } from './dto/userPayload.dto';
import { ReturnTokenDto } from './dto/returnToken.dto';
import { User } from '../core/interfaces/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserPayloadDto> {
    const user = await this.usersService.findOne(username);
    if (user && user.comparePassword(pass)) {
      return user;
    }
    throw new HttpException('Bad username or password', HttpStatus.BAD_REQUEST);
  }

  async login(userDto: AuthUserDto): Promise<ReturnTokenDto> {
    const user = await this.validateUser(userDto.username, userDto.password);
    const token = this.getToken(user);
    await this.usersService.addToken(user.id, token);
    return {
      access_token: token,
    };
  }

  private getToken(userPayload: UserPayloadDto): string {
    const { id, username } = userPayload;
    const payload = { username, id };
    return this.jwtService.sign(payload);
  }

  async refreshToken(token: string): Promise<ReturnTokenDto> {
    const oldToken = token.split(' ')[1];
    const user = this.jwtService.decode(oldToken) as UserPayloadDto;
    const newToken = this.getToken(user);
    await this.usersService.refreshToken(user.id, oldToken, newToken);
    return { access_token: newToken };
  }

  async register(userDto: AuthUserDto): Promise<UserPayloadDto> {
    return await this.usersService.register(userDto);
  }
}
