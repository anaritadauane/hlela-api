import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { Business } from '@prisma/client';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}
  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    try {
      const {
        name,
        description,
        website,
        phoneNumber,
        email,
        address,
        categoryId,
      } = createBusinessDto;

      const business = await this.prisma.business.create({
        data: {
          name,
          description,
          website,
          phoneNumber,
          email,
          address,
          category: { connect: { id: categoryId } },
        },
      });
      return business;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Business not found!');
      }

      throw new HttpException(error, 500);
    }
  }

  async findAll(): Promise<Business[]> {
    const businesses = await this.prisma.business.findMany();
    return businesses;
  }

  async findOne(id: number): Promise<Business> {
    try {
      const business = await this.prisma.business.findUniqueOrThrow({
        where: { id },
      });
      return business;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Business not found!');
      }

      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updateBusinessDto: UpdateBusinessDto) {
    try {
      await this.prisma.business.findFirstOrThrow({
        where: { id },
      });

      const businessUpdated = await this.prisma.business.update({
        where: { id },
        data: {
          ...updateBusinessDto,
        },
      });
      return businessUpdated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Business with id ${id} not found!`);
      }
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const business = await this.prisma.business.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.business.delete({
        where: { id },
      });

      return `Business with id ${business.id} deleted`;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Business with id ${id} not found`);
      }
      throw new HttpException(error, 500);
    }
  }
}
