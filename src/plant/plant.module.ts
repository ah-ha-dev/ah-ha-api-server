import {Module} from '@nestjs/common';
import {PlantService} from './plant.service';
import {PlantController} from './plant.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Plant} from './entities/plant.entity';
import {User} from './../user/entities/user.entity';
import {PlantHistoryModule} from './../plant-history/plant-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plant]), PlantHistoryModule],
  controllers: [PlantController],
  providers: [PlantService],
  exports: [PlantService],
})
export class PlantModule {}
