import {Injectable} from '@nestjs/common';
import {CreateMailHistoryDto} from './dto/create-mail-history.dto';
import {UpdateMailHistoryDto} from './dto/update-mail-history.dto';

@Injectable()
export class MailHistoryService {
  create(createMailHistoryDto: CreateMailHistoryDto) {
    return 'This action adds a new mailHistory';
  }

  findAll() {
    return `This action returns all mailHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailHistory`;
  }

  update(id: number, updateMailHistoryDto: UpdateMailHistoryDto) {
    return `This action updates a #${id} mailHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailHistory`;
  }
}
