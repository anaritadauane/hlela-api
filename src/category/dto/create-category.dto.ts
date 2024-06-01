import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateSubcategoryDto)
  // subcategories: Subcategory[];
}
