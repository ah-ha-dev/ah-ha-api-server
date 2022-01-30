import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {BasePostReponseDto} from './../../common/dto/base-post-response.dto';

export class GoogleLoginDto {
  @IsString()
  @ApiProperty({example: 'google12345'})
  authorizationCode: string;

  @IsString()
  @ApiProperty({example: '12345'})
  deviceId: string;
}

export class GoogleLoginResponseDto {
  @ApiProperty({example: '123456789'})
  accessToken: string;

  @ApiProperty({example: 'true'})
  hasPlant: boolean;
}

export class GoogleLoginResponseBodyDto extends BasePostReponseDto {
  @ApiProperty()
  data: GoogleLoginResponseDto;
}
