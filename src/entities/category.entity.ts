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
import { CategoryStatus } from '../enums/category.enum';
import { ProductEntity } from './product.entity';

@Entity('categories')
export class CategoryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty()
  @ManyToMany(() => CategoryEntity, c => c.children)
  @JoinTable()
  parents?: CategoryEntity[];

  @ApiProperty()
  @ManyToMany(() => CategoryEntity, c => c.parents)
  children?: CategoryEntity[];

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => ProductEntity)
  products: ProductEntity[];

  @ApiProperty()
  @Column({ default: CategoryStatus.ACTIVE, length: 16 })
  status: CategoryStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
