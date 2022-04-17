import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [TypeOrmModule],
  providers: [ProductService],
})
export class ProductModule {}
