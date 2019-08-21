import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/light_it_project', {
      useNewUrlParser: true,
    }),
    AuthenticationModule,
    UsersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
