import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class Pagination {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  pageNumber: number = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;
}
