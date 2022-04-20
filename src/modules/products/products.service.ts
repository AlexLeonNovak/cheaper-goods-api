import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { ProductDependsKey, ProductStatus } from '../../enums/product.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoriesRepo: Repository<CategoryEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const categories = await this.categoriesRepo.findByIds(createProductDto.categories);
    if (!categories.length) {
      throw new NotFoundException('Categories not found');
    }
    return this.productRepo.save({
      ...createProductDto,
      [ProductDependsKey.CATEGORIES]: categories,
    });
  }

  //TODO: Add pagination
  findAll() {
    return this.productRepo.find({ relations: [ProductDependsKey.CATEGORIES] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id }, relations: [ProductDependsKey.CATEGORIES] });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    const categories = await this.categoriesRepo.findByIds(updateProductDto.categories);
    if (!categories.length) {
      throw new NotFoundException('Categories not found');
    }
    const updatedProduct = await this.productRepo.create({
      ...product,
      ...updateProductDto,
      [ProductDependsKey.CATEGORIES]: categories,
    });
    return this.productRepo.save(updatedProduct);
  }

  remove(id: number) {
    return this.productRepo.save({ id, status: ProductStatus.DELETED });
  }
}
