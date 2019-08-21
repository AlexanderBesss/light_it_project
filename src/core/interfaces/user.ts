import { Document, Types } from 'mongoose';
import { Token } from './token';

export interface User extends Document {
  id: Types.ObjectId;
  username: string;
  password: string;
  tokens: Token[];
  comparePassword(password: string): Promise<boolean>;
  removeCascade(length: number): Promise<void>;
  hashPassword(): void;
}
