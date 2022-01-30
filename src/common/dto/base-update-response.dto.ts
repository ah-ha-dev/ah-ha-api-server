import {ApiProperty} from '@nestjs/swagger';
import {BaseGetReponseDto} from './base-get-response.dto';

export class BaseUpdateResponseDto extends BaseGetReponseDto {
  @ApiProperty({example: '업데이트에 성공하였습니다.'})
  data;
}
