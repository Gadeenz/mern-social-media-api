import { IsMongoId } from 'class-validator';

export class IdValidator {
  @IsMongoId()
  id: string;
}
