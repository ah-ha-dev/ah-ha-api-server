import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {PlantModule} from './plant/plant.module';
import {AuthModule} from './auth/auth.module';
import {MailHistoryModule} from './mail-history/mail-history.module';
import databaseConfig from './common/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    PlantModule,
    AuthModule,
    MailHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
