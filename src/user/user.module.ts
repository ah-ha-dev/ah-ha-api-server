import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {User} from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PushNotificationService} from './../push-notification/push-notification.service';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PushNotificationService],
})
export class UserModule {}
