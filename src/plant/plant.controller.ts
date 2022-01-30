import {Controller, Get, UseGuards, Post, Body, Patch} from '@nestjs/common';
import {PlantService} from './plant.service';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {AuthUser} from './../common/decorator/user.decorator';
import {ApiTags} from '@nestjs/swagger';
import {docs} from './plant.docs';
import {CreatePlantDto} from './dto/createPlant.dto';

@ApiTags('plant')
@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  @docs.createPlant('사용자 식물 생성')
  @UseGuards(JwtAuthGuard)
  createPlant(@AuthUser() user, @Body() createPlant: CreatePlantDto) {
    return this.plantService.createPlant(user.id, createPlant);
  }

  @Get()
  @docs.getPlantInfo('사용자 식물 정보')
  @UseGuards(JwtAuthGuard)
  getPlantInfo(@AuthUser() user) {
    return this.plantService.getPlantInfo(user.id);
  }

  @Patch()
  @docs.updatePlantInfo('사용자 식물 정보 업데이트')
  @UseGuards(JwtAuthGuard)
  updatePlantInfo(@AuthUser() user, @Body() createPlant: CreatePlantDto) {
    return this.plantService.updatePlantInfo(user.id, createPlant);
  }

  @Post('reset')
  @docs.resetPlant('사용자 식물 레벨 / 점수 초기화')
  @UseGuards(JwtAuthGuard)
  resetPlant(@AuthUser() user, @Body() createPlant: CreatePlantDto) {
    return this.plantService.resetPlant(user.id, createPlant);
  }
}
