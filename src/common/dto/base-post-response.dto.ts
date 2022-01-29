import {ApiProperty} from '@nestjs/swagger';

export class BasePostReponseDto {
  @ApiProperty({example: '201'})
  code: number;

  @ApiProperty({example: ''})
  message: string;
}
