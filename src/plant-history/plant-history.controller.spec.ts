import {Test, TestingModule} from '@nestjs/testing';
import {PlantHistoryController} from './plant-history.controller';
import {PlantHistoryService} from './plant-history.service';

describe('PlantHistoryController', () => {
  let controller: PlantHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantHistoryController],
      providers: [PlantHistoryService],
    }).compile();

    controller = module.get<PlantHistoryController>(PlantHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
