import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryDependsKeys, CategoryStatus } from '../enums/category.enum';
import { ProductEntity } from './product.entity';

@Entity('categories')
export class CategoryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({ type: () => [CategoryDepends] })
  @ManyToMany(() => CategoryEntity, c => c[CategoryDependsKeys.SUB])
  @JoinTable()
  [CategoryDependsKeys.ROOTS]?: CategoryEntity[];

  @ApiProperty({ type: () => [CategoryDepends] })
  @ManyToMany(() => CategoryEntity, c => c[CategoryDependsKeys.ROOTS])
  [CategoryDependsKeys.SUB]?: CategoryEntity[];

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  // @ApiProperty({ type: () => [ProductEntity] })
  @ManyToMany(() => ProductEntity)
  [CategoryDependsKeys.PRODUCTS]: ProductEntity[];

  @ApiProperty({ enum: CategoryStatus })
  @Column({ default: CategoryStatus.ACTIVE, length: 16 })
  status: CategoryStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
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
