import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          text: createCommentDto.text,
          datePosted: createCommentDto.datePosted,
          review: { connect: { id: createCommentDto.reviewId } },
          user: { connect: { id: createCommentDto.userId } },
        },
      });
      return comment;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('Comment not found!');
      }

      throw new HttpException(error, 500);
    }
  }

  async getAllComments(): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany();
    return comments;
  }

  async getCommentById(id: number): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUniqueOrThrow({
        where: { id },
      });
      return comment;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found!');
      }
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      await this.prisma.review.findUniqueOrThrow({
        where: { id },
      });

      const commentUpdated = await this.prisma.review.update({
        where: { id },
        data: {
          ...updateCommentDto,
        },
      });
      return commentUpdated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Comment not found!');
      }
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      const comment = await this.prisma.review.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.review.delete({
        where: { id },
      });
      return `Comment  with id ${comment.id} deleted`;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Comment with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
