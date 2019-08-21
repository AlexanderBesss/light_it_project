import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  // id: mongoose.Schema.Types.ObjectId,
  token: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
