import {ApiProperty} from '@nestjs/swagger';
import {GetNotification} from '../entities/user.entity';
import {BaseGetReponseDto} from './../../common/dto/base-get-response.dto';

export class GetMyInfo {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({description: '사용자의 구글 이메일', example: 'ah.ha.developer@gmail.com'})
  gamil: string;

  @ApiProperty({description: '사용자의 환경 보호 정보 알림 유무 ', example: 'YES'})
  notification: GetNotification;

  @ApiProperty({description: '사용자의 메일 삭제 알림 개수 ', example: '50'})
  notificationLimit: number;

  @ApiProperty({description: '사용자의 디바이스 아이디', example: '12345'})
  pushToken: string;
}

export class GetMyInfoResponseBodyDto extends BaseGetReponseDto {
  @ApiProperty()
  data: GetMyInfo;
}
