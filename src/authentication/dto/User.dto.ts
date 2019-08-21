import { Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty()
  @Length(5, 30)
  username: string;

  @ApiModelProperty()
  @Length(5, 30)
  password: string;
}
