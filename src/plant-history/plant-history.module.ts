import {Module} from '@nestjs/common';
import {PlantHistoryService} from './plant-history.service';
import {PlantHistoryController} from './plant-history.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from 'src/user/entities/user.entity';
import {PlantHistory} from './entities/plant-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PlantHistory])],
  controllers: [PlantHistoryController],
  providers: [PlantHistoryService],
  exports: [PlantHistoryService],
})
export class PlantHistoryModule {}
