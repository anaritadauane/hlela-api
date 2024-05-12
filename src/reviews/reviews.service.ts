import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      // new review
      const review = await this.prisma.review.create({
        data: {
          ...createReviewDto,
        },
      });

      return review;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('User not found');
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async getAllReviews(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany();
    return reviews;
  }

  async getReviewById(id: number): Promise<Review> {
    try {
      const review = await this.prisma.review.findUnique({
        where: { id },
      });
      return review;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Review not found');
      }
    }
  }

  async getAllReviewsByBusiness(id: number): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { id },
    });
    return reviews;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      await this.prisma.review.findUniqueOrThrow({
        where: { id },
      });

      const reviewUpdated = await this.prisma.review.update({
        where: { id },
        data: {
          ...updateReviewDto,
        },
      });
      return reviewUpdated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Review not found!');
      }
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      const review = await this.prisma.review.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.review.delete({
        where: { id },
      });
      return `Review  with id ${review.id} deleted`;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Review with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async incrementHelpfulCount(id: number) {
    try {
      const review = await this.prisma.review.findUniqueOrThrow({
        where: { id },
      });
      review.helpfulCount++;
      await this.prisma.review.update({
        where: { id },
        data: {
          helpfulCount: review.helpfulCount,
          ...review,
        },
      });
      return review;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Review with id ${id} not found`);
      }

      throw new HttpException(error, 500);
    }
  }
}
