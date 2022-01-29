import {Injectable} from '@nestjs/common';
import {Mail} from './entities/mail.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {gmail} from '@googleapis/gmail';
import {ConfigService} from '@nestjs/config';
import {OAuth2Client} from 'google-auth-library';
import {User} from './../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async getMailNumber(userId: number) {
    const oAuth2Client = this.configService.get('googleOAuth2Client');
    console.log(oAuth2Client);

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['mail'],
    });

    oAuth2Client.setCredentials({refresh_token: user.googleRefreshToken});
    const {token} = await oAuth2Client.getAccessToken();

    oAuth2Client.setCredentials({access_token: token});
    const googleMail = gmail({
      version: 'v1',
      auth: oAuth2Client,
    });

    // // 사용자 전체 리스트 가져오는 코드
    // const labels = [];
    // const {data} = await googleMail.users.labels.list({
    //   userId: user.gmail,
    // });
    // const list = data.labels;

    // for (const label of list) {
    //   labels.push(label.name);
    // }

    // 사용자 메일함 리스트 목록
    const labels = ['INBOX', 'SENT', 'SPAM', 'TRASH'];
    let totalNumber = 0;

    const mailList = await Promise.all(
      labels.map(async label => {
        const {data} = await googleMail.users.labels.get({
          userId: user.gmail,
          id: label,
        });
        totalNumber += data.threadsTotal;
        return data;
      }),
    );

    if (!user.mail) {
      await this.mailRepository.save({totalNumber, user});
    } else {
      await this.mailRepository.update(user.mail.id, {totalNumber});
    }
    return {mailList};
  }
}
