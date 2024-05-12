import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';

@Injectable()
export class MeGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // instance of the route
    const route = request.route.path.split('/')[1];
    const paramId = isNaN(parseInt(request.params.id))
      ? 0
      : parseInt(request.params.id);

    switch (route) {
      //  if the review belongs to the user
      case 'reviews':
        const review = await this.prismaService.review.findFirst({
          where: {
            id: paramId,
            userId: request.user.sub,
          },
        });

        return paramId === review?.id;
      default:
        return paramId === request.user.sub;
    }
  }
}
