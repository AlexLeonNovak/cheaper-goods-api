import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ShopEntity } from './shop.entity';
import { ShopAddressEntity } from './shop-address.entity';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity('prices')
export class PriceEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'decimal', precision: 20, scale: 2, nullable: false })
  public price: number;

  @Column()
  public productId: number;

  @Column()
  public shopId: number;

  @Column()
  public addressId: number;

  @Column({ type: 'uuid' })
  public createdBy: string;

  @ApiProperty()
  @OneToMany(() => ProductEntity, product => product.id)
  @JoinTable()
  public product: ProductEntity;

  @ApiProperty()
  @OneToMany(() => ShopEntity, shop => shop.id)
  @JoinTable()
  public shop: ShopEntity;

  @ApiProperty()
  @OneToMany(() => ShopAddressEntity, address => address.id)
  @JoinTable()
  public address: ShopAddressEntity;

  @ApiProperty()
  @OneToMany(() => UserEntity, user => user.id)
  @JoinTable()
  public createdByUser: UserEntity;
}
