import { Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiModelProperty({ required: true })
  @Length(5, 30)
  username: string;

  @ApiModelProperty({ required: true })
  @Length(5, 30)
  password: string;
}
