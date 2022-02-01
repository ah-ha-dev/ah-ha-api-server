import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {SchedulerRegistry} from '@nestjs/schedule';
import {CronJob} from 'cron';
import * as admin from 'firebase-admin';
import {ConfigService} from '@nestjs/config';
import {PubSub} from '@google-cloud/pubsub';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {gmail} from '@googleapis/gmail';

@Injectable()
export class PushNotificationService implements OnApplicationBootstrap {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  onApplicationBootstrap() {
    // 메일 삭제 푸시 알림 작동
    this.sendDeleteMailPushNotification();

    // // 환경 보호 정보 알릶 작동
    // this.snedInformationPushNotification();
  }

  async sendDeleteMailPushNotification() {
    // google auth 인증
    const auth = this.configService.get('googleAuth');
    const oAuth2Client = this.configService.get('googleOAuth2Client');

    // google PubSub 인증
    const pubSubClient = new PubSub({auth});
    const subscription = pubSubClient.subscription(
      this.configService.get('googlePubSub').subscriptionName,
    );

    // aws dynamoDB client 인증
    const dynamoDB = this.configService.get('dynamoDB');

    // 메일 삭제 푸시 알림 동의 사용자 푸시 알림 보내는 로직
    const messageHandler = async message => {
      // 메일 삭제 푸시알림 동의 사용자 이메일 확인
      console.log(
        `Received message: id ${message.id}, data ${message.data}, attributes: ${JSON.stringify(
          message.attributes,
        )}`,
      );
      message.ack();

      const {emailAddress} = JSON.parse(`${message.data}`);
      const consentedUserEmail = emailAddress;
      const {Item} = await dynamoDB
        .get({
          TableName: 'DeleteMailNotificationUser',
          Key: {gmail: consentedUserEmail},
        })
        .promise();
      const consentedUser = Item;

      // 사용자 접근 권한 확인
      oAuth2Client.setCredentials({refresh_token: consentedUser.googleRefreshToken});
      const {token} = await oAuth2Client.getAccessToken();
      oAuth2Client.setCredentials({access_token: token});

      // 구글 메일 개수 확인
      const googleMail = gmail({
        version: 'v1',
        auth: oAuth2Client,
      });
      const labels = ['INBOX', 'SPAM'];
      let totalCount = 0;

      await Promise.all(
        labels.map(async label => {
          const {data} = await googleMail.users.labels.get({
            userId: consentedUserEmail,
            id: label,
          });
          totalCount += data.threadsTotal;
        }),
      );

      if (totalCount == consentedUser.notificationLimit) {
        // 사용자한테 보내는 푸시 알림 내용
        const token = consentedUser.deviceId;
        const content = {
          notification: {
            title: `${consentedUserEmail} 계정을 확인해주세요.`,
            body: `${consentedUser.notificationLimit}개의 메일이 쌓여있습니다.`,
          },
          token,
        };
        // firebase에 알람 보내는 로직
        // await admin
        //   .messaging()
        //   .send(content)
        //   .then(response => {
        //     console.log('Successfully sent push notification:', response);
        //   })
        //   .catch(error => {
        //     console.log('Error sending push notification:', error);
        //   });
      }
    };
    subscription.on('message', messageHandler);
    return;
  }

  async snedInformationPushNotification() {
    // const registrationToken = createPushNotificationDto.deviceId;
    // const notificationWord = NotificationWord[createPushNotificationDto.notification];
    // const clinicName = createPushNotificationDto.clinicName;
    // const clinicAddress = createPushNotificationDto.clinicAddress;
    // const replacedClinicAddress = clinicAddress.replace(clinicName, '');
    // const message = {
    //   notification: {
    //     title: `${createPushNotificationDto.nickname}님, ${notificationWord}시간 후에 PCR 검사를 꼭 받으세요.`,
    //     body: `${clinicName}(${replacedClinicAddress})`,
    //   },
    //   token: registrationToken,
    // };
    // const timebeforeCheck = NotificationTime[createPushNotificationDto.notification];
    // parseInt(timebeforeCheck);
    // const date = new Date(createPushNotificationDto.date);
    // date.setMinutes(date.getMinutes() - timebeforeCheck);
    // date.setHours(date.getHours() - 9);
    // const job = new CronJob(date, async () => {
    //   await admin
    //     .messaging()
    //     .send(message)
    //     .then(response => {
    //       console.log('Successfully sent message:', response);
    //     })
    //     .catch(error => {
    //       console.log('Error sending message:', error);
    //     });
    // });
    // this.schedulerRegistry.addCronJob(`${createPushNotificationDto.userId}-${date}`, job);
    // job.start();
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
    });
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
