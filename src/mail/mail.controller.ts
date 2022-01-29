import {Controller, Get, UseGuards} from '@nestjs/common';
import {MailService} from './mail.service';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {AuthUser} from './../common/decorator/user.decorator';
import {ApiTags} from '@nestjs/swagger';
import {docs} from './mail.docs';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('count')
  @docs.getMailTotalCount('사용자 메일 개수')
  @UseGuards(JwtAuthGuard)
  getMailTotalCount(@AuthUser() user) {
    return this.mailService.getMailTotalCount(user.id);
  }
}
