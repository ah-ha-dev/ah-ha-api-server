import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {MailService} from './mail.service';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {AuthUser} from './../common/decorator/user.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('labels')
  @UseGuards(JwtAuthGuard)
  getMailNumber(@AuthUser() user) {
    return this.mailService.getMailNumber(user.id);
  }
}
