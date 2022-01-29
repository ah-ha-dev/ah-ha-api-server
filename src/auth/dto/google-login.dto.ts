import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class GoogleLoginDto {
  @IsString()
  @ApiProperty({example: 'google12345'})
  authorizationCode: string;
}

export class GoogleLoginResponseDto {
  @ApiProperty({example: '123456789'})
  accessToken: string;
}

export class GoogleLoginResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: GoogleLoginResponseDto;
}
