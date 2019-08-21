import { Types } from 'mongoose';

export interface UserPayloadDto {
  id?: Types.ObjectId;
  username: string;
}
