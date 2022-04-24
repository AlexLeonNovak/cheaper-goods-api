import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../common/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDependsKeys, CategoryStatus } from '../../common/enums/category.enum';

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

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: [CategoryDependsKeys.ROOTS, CategoryDependsKeys.SUB],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    let roots = category[CategoryDependsKeys.ROOTS] || [];
    if (updateCategoryDto.roots) {
      const newRoots = await this.categoryRepo.findByIds(updateCategoryDto.roots);
      roots = [...newRoots, ...roots];
    }
    const updatedCategory = await this.categoryRepo.create({
      ...category,
      ...updateCategoryDto,
      [CategoryDependsKeys.ROOTS]: roots,
    });
    return this.categoryRepo.save(updatedCategory);
  }

  remove(id: number) {
    return this.categoryRepo.save({ id, status: CategoryStatus.DELETED });
  }
}
