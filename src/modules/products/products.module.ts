import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { CategoryEntity } from '../../entities/category.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  exports: [TypeOrmModule],
  providers: [ProductsService],
})
export class ProductsModule {}
