import {PartialType} from '@nestjs/swagger';
import {CreateMailHistoryDto} from './create-mail-history.dto';

export class UpdateMailHistoryDto extends PartialType(CreateMailHistoryDto) {}
