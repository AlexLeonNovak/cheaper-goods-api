import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../common/entities/product.entity';
import { CategoryEntity } from '../../common/entities/category.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  exports: [TypeOrmModule, ProductsService],
  providers: [ProductsService],
})
export class ProductsModule {}
