import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecificationsService } from 'src/specifications/specifications.service';
import { Repository } from 'typeorm';
import { RoutinesService } from './../routines/routines.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private specificationsService: SpecificationsService,
    private routinesService: RoutinesService,
  ) {}

  async create(createproduct: CreateProductDto, user: any): Promise<Product> {
    const id = user.userId.id;
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const product = new Product();
    product.name = createproduct.name;
    product.addedById = id;

    const createProduct = this.productRepository.create(product);
    if (!createProduct) {
      throw new BadRequestException('Product not created');
    }
    const result = await this.productRepository.save(createProduct);

    await this.specificationsService.create(
      createproduct.description,
      result.name,
      result,
    );
    return result;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['addedById', 'routines'],
    });

    if (!products) {
      return null;
    }

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = this.productRepository.findOne({
      where: { id },
      relations: ['addedById', 'routines'],
    });

    if (!product) {
      return null;
    }

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = this.productRepository.findOne({
      where: { name },
      relations: ['addedById', 'routines'],
    });

    if (!product) {
      return null;
    }

    return product;
  }

  async update(id: number, product: UpdateProductDto): Promise<Product> {
    const productToUpdate = await this.findOne(id);
    if (productToUpdate === null) {
      throw new BadRequestException('Product not found');
    }

    const result = await this.productRepository.save({
      ...productToUpdate,
      ...product,
    });

    return result;
  }

  async remove(id: number): Promise<any> {
    const product = await this.findOne(id);
    if (product === null) {
      throw new BadRequestException('Product not found');
    }

    product.addedById = null;
    product.routines = [];
    product.addedSpecifications = null;
    await this.productRepository.delete(id);

    return {
      message: 'Product deleted',
    };
  }

  async routine_for_product(
    productId: number,
    routineIds: number[],
  ): Promise<Product> {
    const product = await this.findOne(productId);
    if (product === null) {
      throw new BadRequestException('Product not found');
    }

    const routines = await this.routinesService.findAll();
    if (routines === null) {
      throw new BadRequestException('Routine not found');
    }

    const routine = routines.filter((routine) =>
      routineIds.includes(routine.id),
    );

    product.routines = product.routines || [];

    product.routines.push(...routine);

    return await this.productRepository.save(product);
  }

  async removeRoutine(
    productId: number,
    routineIds: number[],
  ): Promise<Product> {
    const product = await this.findOne(productId);
    if (product === null) {
      throw new BadRequestException('Product not found');
    }

    product.routines = product.routines || [];

    product.routines = product.routines.filter(
      (routine) => !routineIds.includes(routine.id),
    );

    return await this.productRepository.save(product);
  }
}
