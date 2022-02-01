import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import {User} from './../../user/entities/user.entity';

@Entity()
export class PlantHistory extends BaseEntity {
  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  kind: string;

  @Column()
  startTime: Date;

  @Column({nullable: true})
  finishTime: Date;

  /* Relations */
  @ManyToOne(() => User, user => user.plantHistoryList, {onDelete: 'CASCADE'})
  user: User;
}
