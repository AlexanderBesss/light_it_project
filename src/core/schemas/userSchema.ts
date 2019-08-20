import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
});

UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function comparePassword(
  plainPassword: string,
) {
  return await bcrypt.compare(plainPassword, this.password);
};
