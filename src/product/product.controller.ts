import { Role } from 'src/roles/decorator/role.decorator';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { RoleGuard } from 'src/roles/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProductDto } from './dtos/update-product.dto';

@Role(RoleEnum.ADMIN, RoleEnum.SUPPORT)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req: any) {
    return this.productService.create(createProductDto, req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('find')
  findAll() {
    return this.productService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('find/:name')
  findByName(@Param('name') name: CreateProductDto['name']) {
    return this.productService.findByName(name);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/add-routine')
  addRoutine(
    @Body('productId', ParseIntPipe) productId: number,
    @Body('routineIds') routineIds: number[],
  ) {
    return this.productService.routine_for_product(productId, routineIds);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/remove-routine')
  removeRoutine(
    @Body('productId', ParseIntPipe) productId: number,
    @Body('routineIds') routineIds: number[],
  ) {
    return this.productService.removeRoutine(productId, routineIds);
  }
}
