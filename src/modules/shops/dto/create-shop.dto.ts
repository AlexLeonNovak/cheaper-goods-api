import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { ShopStatus } from '../../../common/enums/shop.enum';

export class CreateShopDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly description?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  public readonly addresses?: number[];

  @ApiProperty({ required: false, default: ShopStatus.ACTIVE, enum: ShopStatus })
  @IsOptional()
  @IsEnum(ShopStatus, { each: true, message: 'Status not correct' })
  public readonly status?: ShopStatus = ShopStatus.ACTIVE;
}
