import {
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsPositive,
  IsUUID,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsObject()
  specifications?: Record<string, string>;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
