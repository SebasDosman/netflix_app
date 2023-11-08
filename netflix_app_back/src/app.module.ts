import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { ContentModule } from './modules/content/content.module';
import { GenreModule } from './modules/genre/genre.module';
import { UserModule } from './modules/user/user.module';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    ContentModule,
    GenreModule,
    UserModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})


export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthorizationMiddleware)
        .forRoutes( { path: 'content', method: RequestMethod.POST }, 
                    { path: 'content/:id', method: RequestMethod.DELETE }, 
                    { path: 'content/:id', method: RequestMethod.PATCH },
                    { path: 'user', method: RequestMethod.POST },
                    { path: 'user/:id', method: RequestMethod.DELETE },
                    { path: 'genre', method: RequestMethod.POST },
                    { path: 'genre/:id', method: RequestMethod.PATCH },
                    { path: 'genre/:id', method: RequestMethod.DELETE }
        )
  }
}