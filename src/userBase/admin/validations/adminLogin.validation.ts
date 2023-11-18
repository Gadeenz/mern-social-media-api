import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AdminLoginValidation {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
