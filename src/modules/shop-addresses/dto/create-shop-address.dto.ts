import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { ShopAddressStatus } from '../../../common/enums/shop.enum';

export class CreateShopAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly address: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 6 })
  public readonly latitude: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 6 })
  public readonly longitude: number;

  @ApiProperty({ required: false, default: ShopAddressStatus.ACTIVE, enum: ShopAddressStatus })
  @IsOptional()
  @IsEnum(ShopAddressStatus, { each: true, message: 'Status not correct' })
  public readonly status?: ShopAddressStatus = ShopAddressStatus.ACTIVE;
}
