import { Module } from '@nestjs/common';
import { MailHistoryService } from './mail-history.service';
import { MailHistoryController } from './mail-history.controller';

@Module({
  controllers: [MailHistoryController],
  providers: [MailHistoryService]
})
export class MailHistoryModule {}
