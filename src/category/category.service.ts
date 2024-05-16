import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // try {
    const { name, description /*,subcategories*/ } = createCategoryDto;
    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        // subcategories: {
        //   create: subcategories.map((subcategory) => ({
        //     name: subcategory.name,
        //   })),
        // },
      },
    });
    return category;
    // } catch (error) {
    //   throw new HttpException(error, 500);
    // }
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { subcategories } = updateCategoryDto;
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      // update category
      const categoryUpdated = await this.prisma.category.update({
        where: { id },
        data: {
          ...updateCategoryDto,
          subcategories: {
            set: subcategories.map((subcategory) => ({ id: subcategory.id })),
          },
        },
      });
      return categoryUpdated;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.prisma.category.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.category.delete({
        where: { id },
      });
      return `Category with ${category.id} deleted!`;
    } catch (error) {
      // if category not found
      if (error.code === 'P2025') {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
