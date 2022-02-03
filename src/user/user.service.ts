import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {UpdateNotificationInfo} from './dto/updateNotificationInfo.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Err} from './../common/error';
import {gmail} from '@googleapis/gmail';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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

    // google oAuth2Client 인증
    const oAuth2Client = this.configService.get('googleOAuth2Client');
    oAuth2Client.setCredentials({refresh_token: user.googleRefreshToken});
    const {token} = await oAuth2Client.getAccessToken();
    oAuth2Client.setCredentials({access_token: token});

    // aws dynamoDB client 인증
    const dynamoDB = this.configService.get('dynamoDB');

    if (updateNotificationInfo.notification == 'YES') {
      // 정보 알람 동의 dynamoDB put
      try {
        await dynamoDB
          .put({
            TableName: 'InfoNotificationUser',
            Item: {
              gmail: user.gmail,
              deviceId: user.deviceId,
            },
          })
          .promise();
      } catch (error) {
        throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
      }
    } else if (updateNotificationInfo.notification == 'NO') {
      // 정보 알람 비동의 dynamoDB delete
      try {
        await dynamoDB
          .delete({
            TableName: 'InfoNotificationUser',
            Key: {gmail: user.gmail},
          })
          .promise();
      } catch (error) {
        throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
      }
    }

    // google gmail 인증
    const googleMail = gmail({
      version: 'v1',
      auth: oAuth2Client,
    });
    // 구독할 메일함 종류 : 보낸 메일함, 스팸 메일함
    const labels = ['INBOX', 'SPAM'];

    if (updateNotificationInfo.notificationLimit > 0) {
      // 메일 삭제 알람 동의 gmail watch
      await googleMail.users.watch({
        userId: user.gmail,
        requestBody: {
          labelIds: labels,
          labelFilterAction: 'include',
          topicName: this.configService.get('googlePubSub').topicName,
        },
      });
      // 메일 삭제 알람 동의 dynamoDB put
      try {
        await dynamoDB
          .put({
            TableName: 'DeleteMailNotificationUser',
            Item: {
              gmail: user.gmail,
              notificationLimit: updateNotificationInfo.notificationLimit,
              deviceId: user.deviceId,
              googleRefreshToken: user.googleRefreshToken,
            },
          })
          .promise();
      } catch (error) {
        throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
      }
    } else if (updateNotificationInfo.notificationLimit == 0) {
      // 메일 삭제 알람 비동의 gmail watch stop
      await googleMail.users.stop({
        userId: user.gmail,
      });
      // 메일 삭제 알람 비동이 dynamoDB delete
      try {
        await dynamoDB
          .delete({
            TableName: 'DeleteMailNotificationUser',
            Key: {gmail: user.gmail},
          })
          .promise();
      } catch (error) {
        throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
      }
    }

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
