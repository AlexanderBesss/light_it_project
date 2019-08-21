import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/User.dto';
import { PayloadDto } from './dto/payload.dto';
import { ReturnTokenDto } from './dto/returnToken.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.comparePassword(pass)) {
      return user;
    }
    return null;
  }

  async login(user: PayloadDto): Promise<ReturnTokenDto> {
    const token = this.getToken(user);
    await this.usersService.addToken(user.id, token);
    return {
      access_token: token,
    };
  }

  private getToken(user: PayloadDto): string {
    const { id, username } = user;
    const payload = { username, id };
    return this.jwtService.sign(payload);
  }

  async refreshToken(token: string): Promise<ReturnTokenDto> {
    const oldToken = token.split(' ')[1];
    const user = this.jwtService.decode(oldToken) as PayloadDto;
    const newToken = this.getToken(user);
    await this.usersService.refreshToken(user.id, oldToken, newToken);
    return { access_token: newToken };
  }

  async register(userDto: UserDto): Promise<PayloadDto> {
    return await this.usersService.register(userDto);
  }
}
