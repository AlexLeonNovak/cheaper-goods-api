import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from '../enums/product.enum';
import { CategoryEntity } from './category.entity';

@Entity('products')
export class ProductEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @ApiProperty()
  @Column({ default: ProductStatus.ACTIVE, length: 16 })
  status: ProductStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
