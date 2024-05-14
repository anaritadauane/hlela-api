import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubcategoryDto } from '../../subcategory/dto/create-subcategory.dto';
import { Subcategory } from '@prisma/client';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSubcategoryDto)
  subcategories?: Subcategory[];
}
