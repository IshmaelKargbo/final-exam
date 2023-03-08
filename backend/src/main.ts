import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import IoRedis from 'ioredis';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3001',
  });

  // redus
  const RedisStore = connectRedis(session);
  const redisClient = new IoRedis('redis://localhost:6379');

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'McQfTjWmZq4t7w!z4u7x!A%D*F-JaNd',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 5,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(config.get('PORT'));
}
bootstrap();
