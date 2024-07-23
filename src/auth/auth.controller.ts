import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/decorator/role.decorator';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { RoleGuard } from 'src/roles/guards/role.guard';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Role(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Role(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.authService.update(id, user);
  }
}
