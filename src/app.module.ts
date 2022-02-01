import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {PlantModule} from './plant/plant.module';
import {AuthModule} from './auth/auth.module';
import {MailModule} from './mail/mail.module';
import databaseConfig from './common/config/database.config';
import authConfig from './common/config/auth.config';
import googleOAuth2ClientConfig from './common/config/googleOAuth2Client.config';
import {ScheduleModule} from '@nestjs/schedule';
import {PushNotificationModule} from './push-notification/push-notification.module';
import googleAuthConfig from './common/config/googleAuth.config';
import googlePubSubConfig from './common/config/googlePubSub.config';
import awsConfig from './common/config/dynamoDB.config';
import dynamoDBConfig from './common/config/dynamoDB.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        authConfig,
        googleOAuth2ClientConfig,
        googleAuthConfig,
        googlePubSubConfig,
        dynamoDBConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    PlantModule,
    AuthModule,
    MailModule,
    ScheduleModule.forRoot(),
    PushNotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
