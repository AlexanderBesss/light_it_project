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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async compare(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
