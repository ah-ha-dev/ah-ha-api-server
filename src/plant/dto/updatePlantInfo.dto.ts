import {ApiProperty} from '@nestjs/swagger';
import {Kind} from '../entities/plant.entity';

export class UpdatePlantInfoDto {
  @ApiProperty({description: '식물의 이름', example: '식물이'})
  name: string;

  @ApiProperty({description: '식물의 종류', example: 'GREENONION'})
  kind: Kind;
}
