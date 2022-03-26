import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {Mail} from './entities/mail.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';
import {gmail} from '@googleapis/gmail';
import {ConfigService} from '@nestjs/config';
import {User} from './../user/entities/user.entity';
import {PlantService} from './../plant/plant.service';
import {Err} from './../common/error';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly plantService: PlantService,
    private connection: Connection,
  ) {}

  async getMailTotalCount(userId: number): Promise<any> {
    const oAuth2Client = this.configService.get('googleOAuth2Client');

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['mail', 'plant'],
    });

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);

    oAuth2Client.setCredentials({refresh_token: user.googleRefreshToken});
    const {token} = await oAuth2Client.getAccessToken();
    oAuth2Client.setCredentials({access_token: token});

    const googleMail = gmail({
      version: 'v1',
      auth: oAuth2Client,
    });
    // 가져올 메일함 종류 : 보낸 메일함, 스팸 메일함
    const labels = ['INBOX', 'SPAM'];
    let totalCount = 0;

    await Promise.all(
      labels.map(async label => {
        const {data} = await googleMail.users.labels.get({
          userId: user.gmail,
          id: label,
        });
        totalCount += data.threadsTotal;
      }),
    );

    if (!user.mail) {
      await this.mailRepository.save({totalCount, user});
    } else {
      // 전에 있었던 메일 개수 보다 현재 메일 개수가 적은 경우 (사용자가 메일을 삭제한 경우)

      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const score = user.mail.totalCount - totalCount;
        if (score > 0) await this.plantService.updatePlantScore(user.plant.id, score);
        await this.mailRepository.update(user.mail.id, {totalCount});

        await queryRunner.commitTransaction();
      } catch {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
      } finally {
        await queryRunner.release();
      }
    }
    return {totalCount};
  }
}
