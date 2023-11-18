import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddAdminResponse {
  @IsOptional()
  @IsBoolean()
  added: boolean;

  @IsOptional()
  @IsMongoId()
  _id: string;

  @IsNumber()
  @IsOptional()
  active: number;

  @IsNumber()
  @IsOptional()
  isVerified: number;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  token: string;
}
