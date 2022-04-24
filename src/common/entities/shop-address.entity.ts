import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { ShopAddressStatus } from '../enums/shop.enum';
import { BaseEntity } from './base.entity';

@Entity('shop_addresses')
export class ShopAddressEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 8, scale: 6, nullable: true })
  latitude: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude: number;

  @ApiProperty({ enum: ShopAddressStatus })
  @Column({ default: ShopAddressStatus.ACTIVE, length: 16 })
  status: ShopAddressStatus;

  isDeleted() {
    return this.status === ShopAddressStatus.DELETED;
  }
}
