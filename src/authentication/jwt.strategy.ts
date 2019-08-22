import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserPayloadDto } from './dto/userPayload.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configServise: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configServise.get('SECRET'),
    });
  }

  async validate(payload: UserPayloadDto): Promise<UserPayloadDto> {
    const { id: id, username } = payload;
    return { id: id, username };
  }
}
