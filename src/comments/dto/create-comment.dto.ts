import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsDate()
  datePosted: Date;

  @IsNumber()
  reviewId: number;

  @IsNumber()
  userId?: number;
}
