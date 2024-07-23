import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SpecificationsModule } from 'src/specifications/specifications.module';
import { RoutinesModule } from 'src/routines/routines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    SpecificationsModule,
    RoutinesModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
