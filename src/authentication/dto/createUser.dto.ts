import { Min, Length } from 'class-validator';

export class CreateUserDto {
  @Length(5, 20)
  name: string;

  @Min(5)
  password: string;
}
