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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // firebase admin 설정
  /*
  TODO
  todo deviceId 받아서 테스트 해보기
  */

  // const ConfigService = firebaseConfig();
  // const adminConfig: ServiceAccount = {
  //   projectId: ConfigService.projectId,
  //   privateKey: ConfigService.privateKey,
  //   clientEmail: ConfigService.clientEmail,
  // };

  // admin.initializeApp({
  //   credential: admin.credential.cert(adminConfig),
  //   databaseURL: 'https://ahchacha-8f274-default-rtdb.firebaseio.com/',
  // });

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
