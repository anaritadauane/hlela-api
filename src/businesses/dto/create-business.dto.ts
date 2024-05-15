import { Subcategory } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsNumber, MinLength } from 'class-validator';
import { CreateSubcategoryDto } from 'src/subcategory/dto/create-subcategory.dto';

export class CreateBusinessDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  description: string;

  @IsString()
  website: string;

  @IsNumber()
  phoneNumber: number;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  categoryId: number;

  @Type(() => CreateSubcategoryDto)
  subcategories: Subcategory[];
}
