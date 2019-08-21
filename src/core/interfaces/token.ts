import { Document, Types } from 'mongoose';
import { User } from './user';

export interface Token extends Document {
  id: Types.ObjectId;
  token: string;
  user: User;
}
