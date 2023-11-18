import { IsIn, IsOptional } from 'class-validator';

export class OrderStatusValidation {
  @IsOptional()
  @IsIn(['pending', 'delivered', 'declined'])
  status: 'pending' | 'delivered' | 'declined';
}
