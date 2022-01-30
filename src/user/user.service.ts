import {Injectable, BadRequestException} from '@nestjs/common';
import {UpdateNotificationInfo} from './dto/updateNotificationInfo.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Err} from './../common/error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMyInfo(userId: number) {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);

    delete user.googleRefreshToken;
    delete user.plant;
    delete user.mail;
    return user;
  }

  async updateNotificationInfo(userId: number, updateNotificationInfo: UpdateNotificationInfo) {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);

    await this.userRepository.update(userId, updateNotificationInfo);
    return '업데이트에 성공하였습니다.';
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);

    await this.userRepository.delete(user);

    return `${userId}번 사용자 삭제 완료했습니다.`;
  }
}
