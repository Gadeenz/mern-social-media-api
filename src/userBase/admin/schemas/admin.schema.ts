import { Schema } from 'mongoose';
import { BaseModel } from '../../base/schemas';

const options = { discriminatorKey: '__type' };
export const AdminModel = BaseModel.discriminator(
  'Admin',
  new Schema({}, options)
);
