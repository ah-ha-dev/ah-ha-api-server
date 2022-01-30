import {ApiProperty} from '@nestjs/swagger';
import {BaseGetReponseDto} from './../../common/dto/base-get-response.dto';

export class GetMailNumberResponseDto {
  @ApiProperty({description: '이메일의 개수 총합', example: '1'})
  totalCount: number;
}

export class GetMailNumberResponseBodyDto extends BaseGetReponseDto {
  @ApiProperty()
  data: GetMailNumberResponseDto;
}
