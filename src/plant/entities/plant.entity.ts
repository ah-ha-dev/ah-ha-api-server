import {Column, Entity, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

@Entity()
export class Plant extends BaseEntity {
  @Column()
  @ApiProperty({description: '식물의 점수', example: '20'})
  score: number;

  @Column()
  @ApiProperty({description: '식물의 레벨', example: '2'})
  level: number;

  /* Relations */
  @OneToOne(() => User, user => user.plant)
  user: User;
}
