import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {SwaggerMethodDoc} from 'src/common/types';
import {GetMailNumberResponseBodyDto} from './dto/getMailNumber.dto';
import {MailController} from './mail.controller';

export const docs: SwaggerMethodDoc<MailController> = {
  getMailTotalCount(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 보낸 메일함 / 스팸 메일함에 있는 총 메일 개수를 반환합니다.',
      }),
      ApiOkResponse({
        type: GetMailNumberResponseBodyDto,
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
};
