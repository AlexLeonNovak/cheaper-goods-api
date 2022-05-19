import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { MLIsAlphanumericValidator } from './common/validators/ml-is-alphanumeric.validator';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ShopAddressesModule } from './modules/shop-addresses/shop-addresses.module';
import { ShopsModule } from './modules/shops/shops.module';
import { PricesModule } from './modules/prices/prices.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        database: config.get('PGDB_NAME'),
        host: config.get('PGDB_HOST', 'localhost'),
        port: +config.get<number>('PGDB_PORT', 5432),
        username: config.get('PGDB_USER'),
        password: config.get('PGDB_PASS'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize: true, //config.get('NODE_ENV') === 'development',
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    ShopsModule,
    ShopAddressesModule,
    PricesModule,
  ],
  providers: [
    AppService,
    MLIsAlphanumericValidator,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
