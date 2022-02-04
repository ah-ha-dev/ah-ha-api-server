import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

export enum Kind {
  GREENONION = 'GREENONION', // 대파
  TOMATO = 'TOMATO', // 토마토
  BROCCOLI = 'BROCCOLI', // 토마토
}

@Entity()
export class PlantHistory extends BaseEntity {
  @Column({nullable: true})
  name: string;

  @Column({nullable: true, type: 'enum', enum: Kind})
  kind: Kind;

  @Column()
  startTime: Date;

  @Column({nullable: true})
  finishTime: Date;

  /* Relations */
  @ManyToOne(() => User, user => user.plantHistoryList, {onDelete: 'CASCADE'})
  user: User;
}
