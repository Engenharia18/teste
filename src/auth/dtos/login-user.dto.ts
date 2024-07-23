import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: 'Please provide a username',
  })
  @IsString({
    message: 'Username must be a string',
  })
  username: string;

  @IsNotEmpty({
    message: 'Please provide a password',
  })
  @Length(6, 8, {
    message: 'Password must be between 6 and 8 characters',
  })
  password: string;
}
