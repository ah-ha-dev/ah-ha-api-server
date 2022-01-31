import {Module} from '@nestjs/common';
import {PushNotificationService} from './push-notification.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entities/user.entity';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [PushNotificationService],
})
export class PushNotificationModule {}
