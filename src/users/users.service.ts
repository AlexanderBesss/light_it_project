import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username });
  }

  async refreshToken(id: string, oldToken: string, newToken: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException();
    const index = user.tokens.findIndex(token => token === oldToken);
    if (index !== -1) {
      user.tokens[index] = newToken;
      await this.userRepository.save(user);
      return { access_token: newToken };
    }
    throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
  }

  async addToken(id: string, token: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException();
    user.tokens.push(token);
    await this.userRepository.save(user);
  }

  async register(userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      username: userDto.username,
    });
    if (user)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    const userEntity = new UserEntity();
    userEntity.username = userDto.username;
    userEntity.password = userDto.password;
    await this.userRepository.save(userEntity);
    userEntity.username = userDto.username;
    userEntity.password = userDto.password;
    return await this.userRepository.save(userEntity);
  }
}
