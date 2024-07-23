import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Username must be a string',
  })
  username?: string;

  @IsOptional()
  password?: string;
}
