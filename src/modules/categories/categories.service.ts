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
    let root: CategoryEntity = null;
    if (createCategoryDto.root) {
      root = await this.categoryRepo.findOne({ id: createCategoryDto.root });
    }
    return await this.categoryRepo.save({
      ...createCategoryDto,
      [CategoryDependsKeys.ROOT]: root,
    });
  }

  findAll() {
    return this.categoryRepo.find({
      relations: [CategoryDependsKeys.ROOT, CategoryDependsKeys.SUB],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: [CategoryDependsKeys.ROOT, CategoryDependsKeys.SUB],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    let root = category[CategoryDependsKeys.ROOT] || null;
    if (updateCategoryDto.root) {
      root = await this.categoryRepo.findOne({ id: updateCategoryDto.root });
    }
    const updatedCategory = await this.categoryRepo.create({
      ...category,
      ...updateCategoryDto,
      [CategoryDependsKeys.ROOT]: root,
    });
    return this.categoryRepo.save(updatedCategory);
  }

  remove(id: number) {
    return this.categoryRepo.save({ id, status: CategoryStatus.DELETED });
  }
}
