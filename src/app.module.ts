import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MLIsAlphanumericValidator } from './validators/ml-is-alphanumeric.validator';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        database: config.get('DB_NAME'),
        host: config.get('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') === 'development',
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CategoriesModule,
  ],
  providers: [AppService, MLIsAlphanumericValidator],
})
export class AppModule {}
