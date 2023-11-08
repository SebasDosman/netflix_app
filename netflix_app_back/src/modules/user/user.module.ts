import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './entities/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema 
      }
    ]),

    JwtModule.register({
      global : true,
      secret : process.env.JWT_SECRET_KEY,
      signOptions : { expiresIn: '24h'}
    }),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})


export class UserModule { }

