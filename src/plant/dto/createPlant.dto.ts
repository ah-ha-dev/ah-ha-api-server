import {ApiProperty} from '@nestjs/swagger';
import {GetPlantInfoResponseDto} from './getPlantInfo.dto';
import {BasePostReponseDto} from './../../common/dto/base-post-response.dto';
import {Kind} from '../entities/plant.entity';
import {IsEnum} from 'class-validator';

export class CreatePlantDto {
  @ApiProperty({description: '식물의 이름', example: '식물이'})
  name: string;

  @IsEnum(Kind)
  @ApiProperty({description: '식물의 종류', example: 'GREENONION'})
  kind: Kind;
}

export class CreatePlantResponseBodyDto extends BasePostReponseDto {
  @ApiProperty()
  data: GetPlantInfoResponseDto;
}
