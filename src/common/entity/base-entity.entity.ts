import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({description: '아이디', example: '1'})
  id: number;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
