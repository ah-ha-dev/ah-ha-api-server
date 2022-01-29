import { Test, TestingModule } from '@nestjs/testing';
import { MailHistoryController } from './mail-history.controller';
import { MailHistoryService } from './mail-history.service';

describe('MailHistoryController', () => {
  let controller: MailHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailHistoryController],
      providers: [MailHistoryService],
    }).compile();

    controller = module.get<MailHistoryController>(MailHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
