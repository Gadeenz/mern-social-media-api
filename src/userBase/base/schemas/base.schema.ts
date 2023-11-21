import { compare } from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { IBase, IBaseModel } from '../interfaces';
import HttpException from '../../../common/exceptions/HttpException';

const collection = 'users';

const baseOptions = {
  discriminatorKey: '__type',
  collection,
  timestamps: true,
};

const BaseSchema = new Schema<IBase>(
  {
    name: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      sparse: true,
      trim: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
      minlength: 6,
      validate(value: string) {
        if (value.toLowerCase().includes('password')) {
          throw new HttpException(400, 'pass should not contain "pass"');
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 13,
      unique: true,
    },
    token: {
      type: String,
      required: false,
    },
    active: {
      type: Number,
      default: 1,
    },
    suspended: {
      // can't login
      type: Number,
      default: 0,
    },
    picturePath: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  baseOptions
);

BaseSchema.statics.findUserByPhoneNumberAndPassword = async function find(
  phoneNumber,
  password
) {
  const user = await this.findOne({ phoneNumber });
  // return { user: false };
  if (!user) {
    throw new HttpException(400, 'الرجاء التأكد من رقم الجوال وكلمة المرور');
  }
  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    throw new HttpException(400, 'الرجاء التأكد من رقم الجوال وكلمة المرور');
  }
  return {
    _id: user._id,
    phoneNumber: user.phoneNumber,
    name: user.name,
    emial: user.email,
    token: user.token,
    active: user.active,
    suspended: user?.suspended,
  };
};

BaseSchema.statics.findUserByEmailAndPassword = async function find(
  email,
  password
) {
  const admin = await this.findOne({ email });
  // return { user: false };
  if (!admin) {
    throw new HttpException(
      400,
      'الرجاء التأكد من البريد الإلكتروني وكلمة المرور'
    );
  }
  const isMatched = await compare(password, admin.password);

  if (!isMatched) {
    throw new HttpException(
      400,
      'الرجاء التأكد من البريد الإلكتروني وكلمة المرور'
    );
  }
  return {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    token: admin.token,
    active: admin.active,
    suspended: admin?.suspended,
  };
};

export const BaseModel = model<IBase, IBaseModel>('Base', BaseSchema);
