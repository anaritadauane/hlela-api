// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Query,
// } from '@nestjs/common';
// import { SubcategoryService } from './subcategory.service';
// import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
// import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
// import { AdminGuard } from 'src/common/guards/admin.guard';
// import { Public } from 'src/common/decorators/public.decorator';

// @Controller('subcategories')
// export class SubcategoryController {
//   constructor(private readonly subcategoryService: SubcategoryService) {}

//   @Public()
//   @Post()
//   create(
//     @Body() createSubcategoryDto: CreateSubcategoryDto,
//     @Query('categoryName') categoryName: string,
//   ) {
//     return this.subcategoryService.create(createSubcategoryDto, categoryName);
//   }

//   @Get()
//   findAll() {
//     return this.subcategoryService.getAllSubcategories();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.subcategoryService.getSubcategoryById(+id);
//   }

//   @UseGuards(AdminGuard)
//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateSubcategoryDto: UpdateSubcategoryDto,
//   ) {
//     return this.subcategoryService.update(+id, updateSubcategoryDto);
//   }

//   @UseGuards(AdminGuard)
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.subcategoryService.remove(+id);
//   }
// }
