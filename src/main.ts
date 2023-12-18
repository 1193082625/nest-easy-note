import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启跨域支持
  app.enableCors();
  await app.listen(3000);
}

export const handler = async (event, context) => {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const result = await app
    .getHttpAdapter()
    .getInstance()
    .handler(event, context);

  return result;
};

bootstrap();
