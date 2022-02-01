import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {API_PREFIX, DOC_PATH} from './constants';
import {HttpExceptionFilter} from './common/exception/httpException.filter';
import {TransformInterceptor} from './common/interceptor/transform.interceptor';
import * as admin from 'firebase-admin';
import {ServiceAccount} from 'firebase-admin';
import {ConfigService} from '@nestjs/config';
import firebaseConfig from './common/config/firebase.config';
import * as Sentry from '@sentry/node';
import sentryConfig from './common/config/sentry.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // firebase admin 설정
  /*
  TODO
  todo deviceId 받아서 테스트 해보기
  */
  const FirebaseConfig = firebaseConfig();
  const adminConfig: ServiceAccount = {
    projectId: FirebaseConfig.projectId,
    privateKey: FirebaseConfig.privateKey,
    clientEmail: FirebaseConfig.clientEmail,
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://ah-ha-gcp-default-rtdb.firebaseio.com/',
  });

  const SentryConfig = sentryConfig();
  Sentry.init({
    dsn: SentryConfig.dsn,
  });

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

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
