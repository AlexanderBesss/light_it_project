import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useCreateIndex: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    AuthenticationModule,
    UsersModule,
  ],
  controllers: [],
})
export class AppModule {}
