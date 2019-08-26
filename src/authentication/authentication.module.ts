import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthenticationService, JwtStrategy],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
