import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailHistoryService } from './mail-history.service';
import { CreateMailHistoryDto } from './dto/create-mail-history.dto';
import { UpdateMailHistoryDto } from './dto/update-mail-history.dto';

@Controller('mail-history')
export class MailHistoryController {
  constructor(private readonly mailHistoryService: MailHistoryService) {}

  @Post()
  create(@Body() createMailHistoryDto: CreateMailHistoryDto) {
    return this.mailHistoryService.create(createMailHistoryDto);
  }

  @Get()
  findAll() {
    return this.mailHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailHistoryDto: UpdateMailHistoryDto) {
    return this.mailHistoryService.update(+id, updateMailHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailHistoryService.remove(+id);
  }
}
