import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../common/entities/category.entity';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  exports: [TypeOrmModule],
  providers: [CategoriesService],
})
export class CategoriesModule {}
