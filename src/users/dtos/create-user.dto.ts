import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { RoleEnum } from 'src/roles/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is required',
  })
  @IsString({
    message: 'Username must be a string',
  })
  username: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @Length(6, 8, {
    message: 'Password must be between 6 and 8 characters',
  })
  password: string;

  @IsNotEmpty({
    message: 'Role is required',
  })
  @IsNumber()
  role: RoleEnum;
}
