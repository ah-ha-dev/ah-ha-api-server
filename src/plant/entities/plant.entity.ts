import {Column, Entity, OneToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

@Entity()
export class Plant extends BaseEntity {
  @Column()
  name: string;

  @Column()
  kind: string;

  @Column()
  score: number;

  @Column()
  level: number;

  @Column()
  ordinalNumber: number;

  /* Relations */
  @OneToOne(() => User, user => user.plant, {onDelete: 'CASCADE'})
  user: User;
}
