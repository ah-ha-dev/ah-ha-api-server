import {Column, Entity, OneToOne} from 'typeorm';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

export enum Kind {
  GREENONION = 'GREENONION', // 대파
  TOMATO = 'TOMATO', // 토마토
  BROCCOLI = 'BROCCOLI', // 토마토
}

@Entity()
export class Plant extends BaseEntity {
  @Column()
  name: string;

  @Column({type: 'enum', enum: Kind})
  kind: Kind;

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
