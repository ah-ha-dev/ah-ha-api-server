import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {Plant} from './../../plant/entities/plant.entity';
import {MailHistory} from './../../mail-history/entities/mail-history.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  @ApiProperty({description: '사용자의 구글 이메일', example: 'test@test.com'})
  gmail: string;

  @Column()
  @ApiProperty({description: '사용자의 구글 ID', example: '1234'})
  googleAccount: string;

  @Column()
  @ApiProperty({description: '사용자의 구글 리프레시 토큰', example: '123456789'})
  googleRefreshToken: string;

  @Column()
  @ApiProperty({description: '사용자의 푸시 알림 받고 싶은 메일 개수', example: 'true'})
  notificationLimit: boolean;

  @Column({
    unique: true,
    nullable: true,
  })
  @ApiProperty({description: '사용자의 디바이스 아이디', example: '123456789'})
  deviceId: string;

  /* Relations */
  @OneToOne(() => Plant, plant => plant.user, {onDelete: 'CASCADE'})
  @JoinColumn()
  plant: Plant;

  @OneToOne(() => MailHistory, mailHistory => mailHistory.user, {onDelete: 'CASCADE'})
  @JoinColumn()
  mailHistory: MailHistory;
}
