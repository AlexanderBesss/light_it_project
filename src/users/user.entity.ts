import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column('text')
  password: string;

  @Column()
  tokens: Array<string> = new Array<string>();
}
