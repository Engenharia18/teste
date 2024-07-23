import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Role } from 'src/roles/decorator/role.decorator';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/roles/guards/role.guard';

@Role(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('find')
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('find/:id')
  findByID(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findByID(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('find/username')
  findByUsername(@Body() user: string) {
    return this.usersService.findByUsername(user);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
