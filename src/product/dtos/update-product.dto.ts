import { IsOptional, Length } from 'class-validator';

export class UpdateProductDto {
  @Length(7, 7, {
    message: 'Name must be 7 characters',
  })
  name?: string;

  @IsOptional()
  description?: string;
}
