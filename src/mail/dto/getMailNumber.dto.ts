import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class GetMailNumberResponseDto {
  @ApiProperty({description: '이메일의 개수 총합', example: '1'})
  totalCount: number;
}

export class GetMailNumberResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: GetMailNumberResponseDto;
}
