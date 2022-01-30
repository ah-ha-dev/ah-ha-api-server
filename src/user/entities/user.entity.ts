import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {Plant} from './../../plant/entities/plant.entity';
import {Mail} from './../../mail/entities/mail.entity';

export enum GetNotification {
  YES = 'YES', // 한국어 자막
  NO = 'NO', // 영어 자막
}

@Entity()
export class User extends BaseEntity {
  @Column()
  gmail: string;

  @Column()
  googleRefreshToken: string;

  @Column({
    unique: true,
    nullable: true,
  })
  notification: GetNotification;

  @Column({
    unique: true,
    nullable: true,
  })
  notificationLimit: number;

  @Column({
    unique: true,
    nullable: true,
  })
  deviceId: string;

  /* Relations */
  @OneToOne(() => Plant, plant => plant.user, {eager: true, onDelete: 'CASCADE'})
  @JoinColumn()
  plant: Plant;

  @OneToOne(() => Mail, mail => mail.user, {eager: true, onDelete: 'CASCADE'})
  @JoinColumn()
  mail: Mail;
}
