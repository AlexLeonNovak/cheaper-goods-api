import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { CategoryStatus } from '../../../enums/category.enum';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly name: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => sanitizeHtml(value))
  public readonly description?: string;

  @IsOptional()
  @IsArray()
  public readonly roots?: number[];

  @IsOptional()
  @IsEnum(CategoryStatus, { each: true, message: 'Status not correct' })
  public readonly status?: CategoryStatus = CategoryStatus.ACTIVE;
}
