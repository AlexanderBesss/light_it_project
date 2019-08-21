import { Document } from 'mongoose';
import { User } from './user';

export interface Token extends Document {
  token: string;
  user: User;
}
