import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {GetPlantInfoResponseDto} from './getPlantInfo.dto';

export class CreatePlantDto {
  @ApiProperty({description: '식물의 이름', example: '식물이'})
  name: string;

  @ApiProperty({description: '식물의 종류', example: 'apple'})
  kind: string;
}

export class CreatePlantResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: GetPlantInfoResponseDto;
}
