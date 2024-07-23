import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specifications } from './entities/specifications.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SpecificationsService {
  constructor(
    @InjectRepository(Specifications)
    private specificationsRepository: Repository<Specifications>,
  ) {}

  async create(
    description: string,
    name: string,
    product: Product,
  ): Promise<Specifications> {
    const specification = new Specifications();
    specification.name = name;
    specification.description = description;
    specification.productId = product;

    const createSpecification =
      this.specificationsRepository.create(specification);

    return this.specificationsRepository.save(createSpecification);
  }
}
