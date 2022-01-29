import { Test, TestingModule } from '@nestjs/testing';
import { MailHistoryService } from './mail-history.service';

describe('MailHistoryService', () => {
  let service: MailHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailHistoryService],
    }).compile();

    service = module.get<MailHistoryService>(MailHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
