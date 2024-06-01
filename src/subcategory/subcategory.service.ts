// import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
// import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
// import { PrismaService } from 'src/core/services/prisma.service';
// // import { Subcategory } from '@prisma/client';

// @Injectable()
// export class SubcategoryService {
//   constructor(private prisma: PrismaService) {}
//   async create(
//     createSubcategoryDto: CreateSubcategoryDto,
//     categoryName: string,
//   ): Promise<Subcategory> {
//     try {
//       const category = await this.prisma.category.findFirst({
//         where: { name: categoryName },
//       });

//       if (!category) {
//         throw new HttpException('Category not found!', 404);
//       }

//       const { name, categoryId } = createSubcategoryDto;

//       if (categoryId !== category.id) {
//         throw new HttpException('Invalid category ID!', 400);
//       }

//       const subcategory = await this.prisma.subcategory.create({
//         data: {
//           name,
//           category: { connect: { id: category.id } },
//           // categoryId: category.id,
//         },
//       });
//       console.log(subcategory);

//       return subcategory;
//     } catch (error) {
//       throw new HttpException(error, 500);
//     }
//   }

//   async getAllSubcategories(): Promise<Subcategory[]> {
//     const subcategories = await this.prisma.subcategory.findMany();
//     return subcategories;
//   }

//   async getSubcategoryById(id: number): Promise<Subcategory> {
//     const subcategory = await this.prisma.subcategory.findUniqueOrThrow({
//       where: { id },
//     });
//     return subcategory;
//   }

//   async update(
//     id: number,
//     updateSubcategoryDto: UpdateSubcategoryDto,
//   ): Promise<Subcategory> {
//     try {
//       await this.prisma.subcategory.findUniqueOrThrow({
//         where: { id },
//       });

//       // update subcategory
//       const subcategoryUpdated = await this.prisma.subcategory.update({
//         where: { id },
//         data: {
//           ...updateSubcategoryDto,
//         },
//       });
//       return subcategoryUpdated;
//     } catch (error) {
//       throw new HttpException(error, 500);
//     }
//   }

//   async remove(id: number) {
//     try {
//       const subcategory = await this.prisma.subcategory.findUniqueOrThrow({
//         where: { id },
//       });

//       await this.prisma.subcategory.delete({
//         where: { id },
//       });
//       return `Subcategory with ${subcategory.id} deleted!`;
//     } catch (error) {
//       // if subcategory not found
//       if (error.code === 'P2025') {
//         throw new NotFoundException(`Subcategory with id ${id} not found`);
//       }
//       // throw error if any
//       throw new HttpException(error, 500);
//     }
//   }
// }
