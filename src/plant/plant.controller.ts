import {Controller, Get, UseGuards} from '@nestjs/common';
import {PlantService} from './plant.service';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {AuthUser} from './../common/decorator/user.decorator';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getPlantInfo(@AuthUser() user) {
    return this.plantService.getPlantInfo(user.id);
  }
}
