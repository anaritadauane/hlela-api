import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  datePosted: Date;

  @IsNumber()
  helpfulCount: number;

  @IsNumber()
  userId: number;
}

// { id: number;
//   title: string;
//   description: string;
//   datePosted: Date;
//   helpfulCount: number;
//   userId: number;
//   businessId: number; }
