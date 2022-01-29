import {ApiProperty} from '@nestjs/swagger';
import {GetPlantInfoResponseDto} from './getPlantInfo.dto';
import {BasePostReponseDto} from './../../common/dto/base-post-response.dto';

export class CreatePlantDto {
  @ApiProperty({description: '식물의 이름', example: '식물이'})
  name: string;

  @ApiProperty({description: '식물의 종류', example: 'apple'})
  kind: string;
}

export class CreatePlantResponseBodyDto extends BasePostReponseDto {
  @ApiProperty()
  data: GetPlantInfoResponseDto;
}
