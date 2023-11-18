import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class AdminLoginResponse {
  @IsOptional()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  token: string;

  @IsNumber()
  @IsOptional()
  active: number;
}
