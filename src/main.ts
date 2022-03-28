import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {API_PREFIX, DOC_PATH} from './constants';
import * as admin from 'firebase-admin';
import {ServiceAccount} from 'firebase-admin';
import {ConfigService} from '@nestjs/config';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // firebase admin 설정
  /*
  TODO
  todo pushToken 받아서 테스트 해보기
  */
  const configService = app.get<ConfigService>(ConfigService);

  const adminConfig: ServiceAccount = {
    projectId: configService.get('firebase').projectId,
    privateKey: configService.get('firebase').privateKey,
    clientEmail: configService.get('firebase').clientEmail,
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://ah-ha-gcp-default-rtdb.firebaseio.com/',
  });

  Sentry.init({
    dsn: configService.get('sentry').dsn,
  });

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('AH-HA API docs')
    .setDescription('The AH-HA API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOC_PATH, app, document);

  await app.listen(3000);
}
bootstrap();
