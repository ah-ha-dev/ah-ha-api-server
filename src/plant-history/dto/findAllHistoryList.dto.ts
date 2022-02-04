import {ApiProperty} from '@nestjs/swagger';
import {BaseGetReponseDto} from '../../common/dto/base-get-response.dto';
import {Kind} from '../entities/plant-history.entity';

export class findAllHistoryList {
  @ApiProperty({description: '식물의 아이디', example: '1'})
  id: number;

  @ApiProperty({description: '식물의 이름', example: '식물이'})
  name: string;

  @ApiProperty({description: '식물의 종류', example: 'GREENONION'})
  kind: Kind;

  @ApiProperty({description: '식물의 키우기 시작한 시간', example: '2022-02-01T12:07:05.000Z'})
  startTime: number;

  @ApiProperty({description: '식물의 키우시 종료한 시간', example: '2022-02-01T12:07:05.000Z'})
  finishTime: number;
}

export class findAllHistoryListResponseBodyDto extends BaseGetReponseDto {
  @ApiProperty({type: [findAllHistoryList]})
  data: findAllHistoryList[];
}
