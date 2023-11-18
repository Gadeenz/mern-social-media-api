import { Model } from 'mongoose';
import { IBase } from './base.interface';

export interface IBaseModel extends Model<IBase> {
  // declare any static methods here
  findUserByPhoneNumberAndPassword(
    phoneNumber: string,
    password: string
  ): Promise<IBase>;
  findUserByEmailAndPassword(email: string, password: string): Promise<IBase>;
}
