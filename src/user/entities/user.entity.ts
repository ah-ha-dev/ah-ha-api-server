import {Column, Entity, JoinColumn, OneToOne, OneToMany} from 'typeorm';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {Plant} from './../../plant/entities/plant.entity';
import {Mail} from './../../mail/entities/mail.entity';
import {PlantHistory} from './../../plant-history/entities/plant-history.entity';

export enum GetNotification {
  YES = 'YES', // 환경 보호 알림 동의
  NO = 'NO', // 환경 보호 알림 해제
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
  deviceId: string;

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

  /* Relations */
  @OneToOne(() => Plant, plant => plant.user, {eager: true, onDelete: 'CASCADE'})
  @JoinColumn()
  plant: Plant;

  @OneToMany(() => PlantHistory, plantHistory => plantHistory.user)
  plantHistoryList: PlantHistory[];

  @OneToOne(() => Mail, mail => mail.user, {eager: true, onDelete: 'CASCADE'})
  @JoinColumn()
  mail: Mail;
}
