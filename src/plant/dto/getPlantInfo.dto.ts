import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class GetPlantInfoResponseDto {
  @ApiProperty({description: '식물의 아이디', example: '1'})
  id: number;

  @ApiProperty({description: '식물의 이름', example: '식물이'})
  name: string;

  @ApiProperty({description: '식물의 종류', example: 'apple'})
  kind: string;

  @ApiProperty({description: '식물의 점수', example: '0'})
  score: number;

  @ApiProperty({description: '식물의 레벨', example: '1'})
  level: number;

  @ApiProperty({description: '성장 완료된 식물의 개수', example: '1'})
  ordinalNumber: number;
}

export class GetPlantInfoResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: GetPlantInfoResponseDto;
}
