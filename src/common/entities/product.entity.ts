import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ProductDependsKey, ProductStatus } from '../enums/product.enum';
import { CategoryEntity } from './category.entity';
import { BaseEntity } from './base.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  [ProductDependsKey.CATEGORIES]: CategoryEntity[];

  @ApiProperty({ enum: ProductStatus })
  @Column({ default: ProductStatus.ACTIVE, length: 16 })
  status: ProductStatus;
}
