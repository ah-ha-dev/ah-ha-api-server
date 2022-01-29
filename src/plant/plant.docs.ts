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
        description: '사용자의 식물을 생성합니다.',
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
        description: '사용자의 식물 정보를 반환합니다.',
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
        description: '사용자의 식물 정보를 업데이트합니다.',
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
          '사용자가 식물이 성장 완료한 경우, 다시 기르기 위해 사용합니다. \t\n 사용자의 식물의 level, score를 초기화합니다. 사용자가 기른 식물수(ordinalNumber)가 1 증가 합니다.',
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
