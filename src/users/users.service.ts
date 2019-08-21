import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../core/interfaces/user';
import { Token } from '../core/interfaces/token';
import { UserPayloadDto } from './dto/userPayload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {}

  async findOne(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async login(username: string, password: string): Promise<UserPayloadDto> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user)
      throw new HttpException(
        'Bad username or password',
        HttpStatus.BAD_REQUEST,
      );
    if (!user.comparePassword(password))
      throw new HttpException(
        'Bad username or password',
        HttpStatus.BAD_REQUEST,
      );
    return { id: user.id, username: user.username };
  }

  async refreshToken(
    id: string,
    oldToken: string,
    newToken: string,
  ): Promise<void> {
    const token = await this.tokenModel
      .findOne({
        token: oldToken,
      })
      .populate('user')
      .exec();
    if (!token)
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    token.token = newToken;
    await token.save();
  }

  async addToken(id: string, token: string): Promise<void> {
    const user = await this.userModel
      .findById(id)
      .populate('tokens')
      .exec();
    if (!user) throw new BadRequestException();
    const maxTokensPerUser = 5;
    if (user.tokens.length >= maxTokensPerUser) {
      user.removeCascade(maxTokensPerUser);
    }
    const tokenIdDb = new this.tokenModel({
      token,
      user,
    });
    await tokenIdDb.save();
    user.tokens = [...user.tokens, tokenIdDb];
    await user.save();
  }

  async register(userDto: UserDto): Promise<UserPayloadDto> {
    const user = await this.userModel
      .findOne({
        username: userDto.username,
      })
      .exec();
    if (user)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    const userInDb = await this.userModel(userDto);
    await userInDb.save();
    return { id: userInDb.id, username: userInDb.username };
  }
}
