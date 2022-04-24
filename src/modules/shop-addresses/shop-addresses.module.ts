import { Module } from '@nestjs/common';
import { ShopAddressesService } from './shop-addresses.service';
import { ShopAddressesController } from './shop-addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopAddressEntity } from '../../common/entities/shop-address.entity';

@Module({
  controllers: [ShopAddressesController],
  imports: [TypeOrmModule.forFeature([ShopAddressEntity])],
  exports: [TypeOrmModule, ShopAddressesService],
  providers: [ShopAddressesService],
})
export class ShopAddressesModule {}
