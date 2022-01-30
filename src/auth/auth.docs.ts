import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiBody, ApiResponse} from '@nestjs/swagger';
import {SwaggerMethodDoc} from 'src/common/types';
import {AuthController} from './auth.controller';
import {GoogleLoginDto, GoogleLoginResponseBodyDto} from './dto/google-login.dto';

export const docs: SwaggerMethodDoc<AuthController> = {
  logInWithGoogle(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '구글 로그인을 진행합니다. 새로운 유저인 경우, 추가적으로 회원가입을 진행합니다. \t\n응답으로 accessToken과 hasPlant를 반환합니다. \t\n식물을 설정했던 사용자인 경우 hasPlant: true, 식물을 설정하지 않은 사용자인 경우 hasPlant: false를 반환합니다.',
      }),
      ApiBody({type: GoogleLoginDto}),
      ApiCreatedResponse({
        type: GoogleLoginResponseBodyDto,
      }),
      ApiResponse({
        status: 400,
        description: '유효하지 않은 인가코드입니다.',
      }),
      ApiResponse({
        status: 500,
        description: '서버에러가 발생했습니다.',
      }),
    );
  },
};
