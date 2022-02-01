import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {SwaggerMethodDoc} from 'src/common/types';
import {BaseUpdateResponseDto} from '../common/dto/base-update-response.dto';
import {GetMyInfoResponseBodyDto} from './dto/getMyInfo.dto';
import {UserController} from './user.controller';

export const docs: SwaggerMethodDoc<UserController> = {
  getMyInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 정보를 반환합니다.',
      }),
      ApiOkResponse({
        type: GetMyInfoResponseBodyDto,
      }),
      ApiResponse({
        status: 400,
        description: '존재하지 않는 사용자입니다.',
      }),
      ApiResponse({
        status: 401,
        description:
          '1. 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
      ApiResponse({
        status: 500,
        description: '서버에러가 발생했습니다.',
      }),
    );
  },
  updateNotificationInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자의 푸시 알람 정보를 업데이트합니다. \t\n 사용자가 환경 보호 정보 알림을 원하는 경우: "notification": "YES" /  사용자가 환경 보호 정보 알림을 원하지 않는 경우: "notification": "NO"  \t\n 사용자가 메일 삭제 알림을 원하는 경우: "notificationLimit" 0 이상 /  사용자가 메일 삭제 알림을 원하지 않는 경우: "notificationLimit": 0',
      }),
      ApiOkResponse({
        type: BaseUpdateResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: '존재하지 않는 사용자입니다.',
      }),
      ApiResponse({
        status: 401,
        description:
          '1. 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
      ApiResponse({
        status: 500,
        description: '서버에러가 발생했습니다.',
      }),
    );
  },
  deleteUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'user id에 해당하는 사용자를 삭제합니다.',
      }),
      ApiResponse({
        status: 400,
        description: '존재하지 않는 사용자입니다.',
      }),
      ApiResponse({
        status: 500,
        description: '서버에러가 발생했습니다.',
      }),
    );
  },
};
