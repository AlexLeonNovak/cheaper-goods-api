import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './filters/http-exception.filter';

const { PORT = 5000, NODE_ENV = 'development', COOKIE_SECRET = 'cookie_secret' } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: NODE_ENV === 'production' ? '*' : true,
    },
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser(COOKIE_SECRET));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));
}

bootstrap();
