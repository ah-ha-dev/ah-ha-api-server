import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {SwaggerMethodDoc} from 'src/common/types';
import {CreatePlantResponseBodyDto} from './dto/createPlant.dto';
import {GetPlantInfoResponseBodyDto} from './dto/getPlantInfo.dto';
import {PlantController} from './plant.controller';
import {BaseUpdateResponseDto} from './../common/dto/base-update-response.dto';

export const docs: SwaggerMethodDoc<PlantController> = {
  createPlant(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자의 식물을 생성합니다. 초기 설정 값은 socre: 0, level: 1, ordinalNumber: 0 입니다. \t\n 식물 종류는 GREENONION : 대파, TOMATO : 토마토, BROCCOLI : 브로콜리 입니다.',
      }),
      ApiCreatedResponse({
        type: CreatePlantResponseBodyDto,
      }),
      ApiResponse({
        status: 400,
        description: '1. 존재하지 않는 사용자입니다. \t\n 2. 사용자의 식물이 이미 존재합니다.',
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
  getPlantInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자의 식물 정보를 반환합니다. \t\n 식물 종류는 GREENONION : 대파, TOMATO : 토마토, BROCCOLI : 브로콜리 입니다. \t\n 레벨과 점수에 대한 정보는 다음과 같습니다. \t\n level 1 : 0 - 19 \t\n level 2 : 20 - 39 \t\n level 3 : 40 - 59 \t\n level 4 : 60 - 79 \t\n level 5 : 80 - 100 \t\n 식물 점수가 100 이상인 경우, 레벨 및 점수 갱신은 일어나지 않습니다.',
      }),
      ApiOkResponse({
        type: GetPlantInfoResponseBodyDto,
      }),
      ApiResponse({
        status: 400,
        description: '1. 존재하지 않는 사용자입니다. \t\n 2. 사용자의 식물이 존재하지 않습니다.',
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
  updatePlantInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자의 식물 정보를 업데이트합니다. \t\n 식물 종류는 GREENONION : 대파, TOMATO : 토마토, BROCCOLI : 브로콜리 입니다.',
      }),
      ApiOkResponse({
        type: BaseUpdateResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: '1. 존재하지 않는 사용자입니다. \t\n 2. 사용자의 식물이 존재하지 않습니다.',
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
  resetPlant(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자가 식물이 성장 완료한 경우, 다시 기르기 위해 사용합니다. name, kind는 새로 키우기 시작한 식물의 정보입니다. \t\n 사용자의 식물의 level, score를 초기화합니다. 사용자가 기른 식물수(ordinalNumber)가 1 증가 합니다. \t\n 식물 종류는 GREENONION : 대파, TOMATO : 토마토, BROCCOLI : 브로콜리 입니다.',
      }),
      ApiCreatedResponse({
        type: CreatePlantResponseBodyDto,
      }),
      ApiResponse({
        status: 400,
        description: '1. 존재하지 않는 사용자입니다. \t\n 2. 사용자의 식물이 존재하지 않습니다.',
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
