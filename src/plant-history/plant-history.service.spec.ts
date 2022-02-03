import {Test, TestingModule} from '@nestjs/testing';
import {PlantHistoryService} from './plant-history.service';

describe('PlantHistoryService', () => {
  let service: PlantHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantHistoryService],
    }).compile();

    service = module.get<PlantHistoryService>(PlantHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
