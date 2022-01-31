import {Module} from '@nestjs/common';
import {PushNotificationService} from './push-notification.service';

@Module({
  controllers: [],
  providers: [PushNotificationService],
})
export class PushNotificationModule {}
