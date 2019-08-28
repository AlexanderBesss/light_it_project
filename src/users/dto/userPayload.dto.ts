import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserPayloadDto {
  @ApiModelProperty({ required: true, type: String })
  id: Types.ObjectId;

  @ApiModelProperty()
  username: string;
}
