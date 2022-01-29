import {Column, Entity, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

@Entity()
export class Mail extends BaseEntity {
  @Column()
  @ApiProperty({description: '사용자의 이메일 개수 총합', example: 'test@test.com'})
  totalNumber: number;

  /* Relations */
  @OneToOne(() => User, user => user.mail)
  user: User;
}
