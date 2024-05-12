import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Review } from '@prisma/client';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserRequest } from 'src/users/interfaces/users-request.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { MeGuard } from 'src/common/guards/me.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: UserRequest,
  ): Promise<Review> {
    createReviewDto.userId = req.user.id;
    return this.reviewService.create(createReviewDto);
  }

  @Public()
  @Get()
  getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }

  @Public()
  @Get(':id')
  getReviewByID(@Param('id') id: string) {
    return this.reviewService.getReviewById(+id);
  }

  @Patch(':id')
  @UseGuards(MeGuard)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(MeGuard)
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }

  @Public()
  @Patch('id/helpful')
  helpfulcount(@Param('id') id: string) {
    return this.reviewService.incrementHelpfulCount(+id);
  }
}
