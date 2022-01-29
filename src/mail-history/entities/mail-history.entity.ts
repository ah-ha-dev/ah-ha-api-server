import {Column, Entity, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

@Entity()
export class MailHistory extends BaseEntity {
  @Column()
  @ApiProperty({description: '사용자의 받은 이메일 개수', example: 'test@test.com'})
  inboxNumber: number;

  @Column()
  @ApiProperty({description: '사용자의 보낸 이메일 개수', example: 'test@test.com'})
  sentNumber: number;

  @Column()
  @ApiProperty({description: '사용자의 스팸 이메일 개수', example: 'test@test.com'})
  spamNumber: number;

  @Column()
  @ApiProperty({description: '사용자의 휴지통 이메일 개수', example: 'test@test.com'})
  trashNumber: number;

  /* Relations */
  @OneToOne(() => User, user => user.mailHistory)
  user: User;
}
