import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { SpacesModule } from './spaces/spaces.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/easy-notes'),
    NotesModule,
    UsersModule,
    TagsModule,
    SpacesModule,
    JwtModule.register({
      secret: 'notes',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply() // AuthMiddleware
      .exclude(
        // 设置可能需要排除的接口 登录、注册、忘记密码、公共资源（如静态文件、公共api）、健康检查接口、第三方回调接口
        { path: '/login', method: RequestMethod.ALL },
        { path: '/register', method: RequestMethod.ALL },
        { path: 'public/resource', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
