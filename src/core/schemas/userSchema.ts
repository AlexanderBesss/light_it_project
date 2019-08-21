import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user';

export const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
});

UserSchema.methods.comparePassword = async function comparePassword(
  plainPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, this.password);
};

UserSchema.methods.removeCascade = async function removeCascade(length: number): Promise<void> {
  if (this.tokens.length >= length) {
    this.tokens.forEach(async token => {
      await token.remove();
    });
    this.tokens = [];
  }
};

UserSchema.pre('save', async function(next) {
  const user = this as User;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});
