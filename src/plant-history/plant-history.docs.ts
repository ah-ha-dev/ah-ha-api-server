import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {SwaggerMethodDoc} from 'src/common/types';
import {findAllHistoryListResponseBodyDto} from './dto/findAllHistoryList.dto';
import {PlantHistoryController} from './plant-history.controller';

export const docs: SwaggerMethodDoc<PlantHistoryController> = {
  findAllPlantHistory(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자의 식물 히스토리 정보를 반환합니다. 순서는 오래된 정보부터 최신 정보 순으로 정렬하여 반환합니다.',
      }),
      ApiOkResponse({
        type: findAllHistoryListResponseBodyDto,
      }),
      ApiResponse({
        status: 400,
        description: '1. 존재하지 않는 사용자입니다.',
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
