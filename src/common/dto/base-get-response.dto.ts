import {ApiProperty} from '@nestjs/swagger';

export class BaseGetReponseDto {
  @ApiProperty({example: '200'})
  code: number;

  @ApiProperty({example: ''})
  message: string;
}
