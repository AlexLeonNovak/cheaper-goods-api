import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryStatus } from '../enums/category.enum';
import { BaseEntity } from './base.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @ApiProperty({ type: () => CategoryDepends })
  @ManyToOne(() => CategoryEntity, c => c.subcategories, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  rootCategory?: CategoryEntity;

  @ApiProperty({ type: () => [CategoryDepends] })
  @OneToMany(() => CategoryEntity, c => c.rootCategory)
  subcategories?: CategoryEntity[];

  // @Column({ nullable: true })
  // @Index()
  // rootCategoryId?: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  // @ApiProperty({ type: () => [ProductEntity] })
  // @ManyToMany(() => ProductEntity)
  // [CategoryDependsKeys.PRODUCTS]: ProductEntity[];

  @ApiProperty({ enum: CategoryStatus })
  @Column({ default: CategoryStatus.ACTIVE, length: 16 })
  status: CategoryStatus;
}

class CategoryDepends {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: CategoryStatus })
  status: CategoryStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
