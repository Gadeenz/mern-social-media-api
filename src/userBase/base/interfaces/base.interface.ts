export interface IBase {
  _id?: string;
  name: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  token?: string;
  email?: string;
  active?: number;
  suspended?: number;
  picturePath: string;
  friends: any[];
  location: String;
  occupation: String;
  viewedProfile: Number;
  impressions: Number;
}
