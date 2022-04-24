import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from '../../common/entities/shop.entity';
import { ShopAddressesModule } from '../shop-addresses/shop-addresses.module';

@Module({
  controllers: [ShopsController],
  imports: [TypeOrmModule.forFeature([ShopEntity]), ShopAddressesModule],
  exports: [TypeOrmModule],
  providers: [ShopsService],
})
export class ShopsModule {}
