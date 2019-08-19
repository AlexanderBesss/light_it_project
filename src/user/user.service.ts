import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async register(userDto: UserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.name = userDto.name;
    userEntity.password = userDto.password;
    return await this.userRepository.save(userEntity);
  }

  async login(userDto: UserDto) {
    const user = await this.userRepository.findOne({ name: userDto.name });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!user.comparePassword(userDto.password) || user.name !== userDto.name) {
      throw new HttpException('bad password or name', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
