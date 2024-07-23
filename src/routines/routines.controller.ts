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
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dtos/create-routine.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/roles/guards/role.guard';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { Role } from 'src/roles/decorator/role.decorator';

@Role(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoutineDto: CreateRoutineDto,
  ) {
    return this.routinesService.update(id, updateRoutineDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.remove(id);
  }
}
