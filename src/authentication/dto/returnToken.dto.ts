import { ApiModelProperty } from "@nestjs/swagger";

export class ReturnTokenDto {
  @ApiModelProperty()
  access_token: string;
}
