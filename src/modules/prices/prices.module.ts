import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceEntity } from '../../common/entities/price.entity';
import { ShopsModule } from '../shops/shops.module';
import { ShopAddressesModule } from '../shop-addresses/shop-addresses.module';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity]), ShopsModule, ShopAddressesModule, ProductsModule, UserModule],
  exports: [TypeOrmModule, PricesService],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
