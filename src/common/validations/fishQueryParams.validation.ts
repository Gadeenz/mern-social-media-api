import { IsIn, IsOptional } from 'class-validator';

export class FishQueryParamsValidation {
  @IsOptional()
  @IsIn(['tilapia', 'mackerel', 'grouper'])
  fish: 'tilapia' | 'mackerel' | 'grouper';
}
