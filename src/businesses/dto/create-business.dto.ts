import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  description: string;

  @IsString()
  website: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  categoryId: number;

  // @Type(() => CreateSubcategoryDto)
  // subcategories: Subcategory[];
}
