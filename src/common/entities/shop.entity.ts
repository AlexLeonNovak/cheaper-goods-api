import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ShopDependsKey, ShopStatus } from '../enums/shop.enum';
import { BaseEntity } from './base.entity';
import { ShopAddressEntity } from './shop-address.entity';

@Entity('shops')
export class ShopEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ enum: ShopStatus })
  @Column({ default: ShopStatus.ACTIVE, length: 16 })
  status: ShopStatus;

  @ApiProperty({ type: [ShopAddressEntity] })
  @ManyToMany(() => ShopAddressEntity)
  @JoinTable()
  [ShopDependsKey.ADDRESSES]: ShopAddressEntity[];
}
