export interface IAdmin {
  email: string;
  password: string;
  phoneNumber?: string;
  token: string;
  active?: number;
  confirmationCode?: number;
  isVerified?: number;
}
