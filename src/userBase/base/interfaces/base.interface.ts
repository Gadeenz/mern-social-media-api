export interface IBase {
  _id?: string;
  name: string;
  password: string;
  phoneNumber: string;
  token?: string;
  email?: string;
  active?: number;
  suspended?: number;
}
