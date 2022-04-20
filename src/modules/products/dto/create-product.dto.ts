import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { ProductStatus } from '../../../enums/product.enum';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly description?: string;

  @ApiProperty({ required: true, type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  public readonly categories: number[];

  @ApiProperty({ required: false, default: ProductStatus.ACTIVE, enum: ProductStatus })
  @IsOptional()
  @IsEnum(ProductStatus, { each: true, message: 'Status not correct' })
  public readonly status?: ProductStatus = ProductStatus.ACTIVE;
}
