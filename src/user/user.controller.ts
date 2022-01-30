import {Controller, Get, Body, Patch, Delete, UseGuards, Param} from '@nestjs/common';
import {UserService} from './user.service';
import {UpdateNotificationInfo} from './dto/updateNotificationInfo.dto';
import {ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {AuthUser} from './../common/decorator/user.decorator';
import {docs} from './user.docs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @docs.getMyInfo('사용자 정보')
  @UseGuards(JwtAuthGuard)
  getMyInfo(@AuthUser() user) {
    return this.userService.getMyInfo(user.id);
  }

  @Patch('me/notification')
  @docs.updateNotificationInfo('사용자 푸시 알림 정보 업데이트')
  @UseGuards(JwtAuthGuard)
  updateNotificationInfo(@AuthUser() user, @Body() updateNotificationInfo: UpdateNotificationInfo) {
    return this.userService.updateNotificationInfo(user.id, updateNotificationInfo);
  }

  @Delete(':id')
  @docs.deleteUser('사용자 삭제(개발용 API)')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
