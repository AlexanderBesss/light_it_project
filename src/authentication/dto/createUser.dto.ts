import { Min, Length } from 'class-validator';

export class CreateUserDto {
  @Length(5, 20)
  name: string;

  @Length(5, 30)
  password: string;
}
