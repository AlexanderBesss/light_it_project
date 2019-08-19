import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Unique('unique', ['name'])
  @Column()
  name: string;

  @Column('text')
  password: string;

  @Column()
  tokens: Array<string> = new Array<string>();
}
