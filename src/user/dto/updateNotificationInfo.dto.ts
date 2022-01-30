import {ApiProperty} from '@nestjs/swagger';
import {GetNotification} from '../entities/user.entity';

export class UpdateNotificationInfo {
  @ApiProperty({description: '사용자의 환경 보호 정보 알림 유무 ', example: 'YES'})
  notification: GetNotification;

  @ApiProperty({description: '사용자의 메일 삭제 알림 개수 ', example: '50'})
  notificationLimit: number;
}
