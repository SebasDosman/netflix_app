import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ContentController } from './controller/content.controller';
import { ContentService } from './service/content.service';
import { Content, ContentSchema } from './entities/content.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { 
        name: Content.name, 
        schema: ContentSchema 
      }
    ]),
    JwtModule.register({
      global : true,
      secret : process.env.JWT_SECRET_KEY,
      signOptions : { expiresIn: '24h'}

    }),
    AuthModule
  ],
  controllers: [ContentController],
  providers: [ContentService]
})


export class ContentModule { }
