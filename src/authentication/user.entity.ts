import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column('text')
  password: string;

  comparePassword(plainPassword): boolean {
    return this.password === plainPassword;
  }
}
