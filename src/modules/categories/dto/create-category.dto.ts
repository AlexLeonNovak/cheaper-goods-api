import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { CategoryStatus } from '../../../enums/category.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
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
  public readonly roots?: number[];

  @ApiProperty({ required: false, default: CategoryStatus.ACTIVE, enum: CategoryStatus })
  @IsOptional()
  @IsEnum(CategoryStatus, { each: true, message: 'Status not correct' })
  public readonly status?: CategoryStatus = CategoryStatus.ACTIVE;
}
