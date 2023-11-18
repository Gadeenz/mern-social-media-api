import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AddAdminValidation {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  name: string;
}
