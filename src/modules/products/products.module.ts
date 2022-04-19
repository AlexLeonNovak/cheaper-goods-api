import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [TypeOrmModule],
  providers: [ProductsService],
})
export class ProductsModule {}
