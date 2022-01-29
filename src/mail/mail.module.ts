import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailController} from './mail.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {User} from './../user/entities/user.entity';
import {Mail} from './entities/mail.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Mail])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
