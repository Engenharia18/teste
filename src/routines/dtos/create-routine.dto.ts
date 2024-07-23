import { IsString } from 'class-validator';

export class CreateRoutineDto {
  @IsString({
    message: 'Name must be a string',
  })
  name: string;
}
