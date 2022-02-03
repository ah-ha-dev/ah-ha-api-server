import {Controller, Get, UseGuards} from '@nestjs/common';
import {PlantHistoryService} from './plant-history.service';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {AuthUser} from './../common/decorator/user.decorator';
import {docs} from './plant-history.docs';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('plant-history')
@Controller('plant-history')
export class PlantHistoryController {
  constructor(private readonly plantHistoryService: PlantHistoryService) {}

  @Get()
  @docs.findAllPlantHistory('사용자 식물 히스토리 정보')
  @UseGuards(JwtAuthGuard)
  findAllPlantHistory(@AuthUser() user) {
    return this.plantHistoryService.findAllPlantHistory(user.id);
  }
}
