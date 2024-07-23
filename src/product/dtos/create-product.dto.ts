import { IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({
    message: 'Name must be a string',
  })
  @Length(7, 7, {
    message: 'Name must be 7 characters',
  })
  name: string;

  @IsString({
    message: 'Description must be a string',
  })
  description: string;
}
