import {Column, Entity, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

@Entity()
export class Mail extends BaseEntity {
  @Column()
  totalCount: number;

  /* Relations */
  @OneToOne(() => User, user => user.mail)
  user: User;
}
