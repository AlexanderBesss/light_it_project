import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(name);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const token = this.getToken(user);
    this.usersService.addToken(user.id, token);
    return {
      access_token: token,
    };
  }

  private getToken(user: UserDto): string {
    const { id, name } = user;
    const payload = { name, id };
    return this.jwtService.sign(payload);
  }

  async refreshToken(token: string) {
    const oldToken = token.split(' ')[1];
    const user = this.jwtService.decode(oldToken) as UserDto;
    const newToken = this.getToken(user);
    return await this.usersService.refreshToken(user.id, oldToken, newToken);
  }

  async register(userDto: CreateUserDto) {
    return await this.usersService.register(userDto);
  }
}
