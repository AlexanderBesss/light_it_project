import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/light_it_project', {
      useNewUrlParser: true,
    }),
    AuthenticationModule,
    UsersModule,
    UsersModule,
    ConfigModule,
  ],
  controllers: [],
  // providers: [ConfigService],
})
export class AppModule {}
