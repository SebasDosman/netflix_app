import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { Genre, GenreSchema } from './entities/genre.entity';
import { GenreController } from './controller/genre.controller';
import { GenreService } from './service/genre.service';


@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Genre.name,
        schema: GenreSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '24h'},
    }),
    AuthModule
  ]
})


export class GenreModule { }