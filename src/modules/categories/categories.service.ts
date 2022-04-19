import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDependsKeys, CategoryStatus } from '../../enums/category.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    let roots: CategoryEntity[] = [];
    if (createCategoryDto.roots) {
      roots = await this.categoryRepo.findByIds(createCategoryDto.roots);
    }
    return await this.categoryRepo.save({
      ...createCategoryDto,
      [CategoryDependsKeys.ROOTS]: roots,
    });
  }

  findAll() {
    return this.categoryRepo.find({
      relations: [CategoryDependsKeys.ROOTS, CategoryDependsKeys.SUB],
    });
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: [CategoryDependsKeys.ROOTS, CategoryDependsKeys.SUB],
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: [CategoryDependsKeys.ROOTS],
    });
    let roots = category[CategoryDependsKeys.ROOTS] || [];
    if (updateCategoryDto.roots) {
      const newRoots = await this.categoryRepo.findByIds(updateCategoryDto.roots);
      roots = [...newRoots, ...roots];
    }
    const newCategory = await this.categoryRepo.create({
      ...category,
      ...updateCategoryDto,
      [CategoryDependsKeys.ROOTS]: roots,
    });
    return this.categoryRepo.save(newCategory);
  }

  remove(id: number) {
    return this.categoryRepo.save({ id, status: CategoryStatus.DELETED });
  }
}
