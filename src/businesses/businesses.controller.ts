import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from '@prisma/client';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('business')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto): Promise<Business> {
    return this.businessesService.create(createBusinessDto);
  }

  @Get()
  findAll(): Promise<Business[]> {
    return this.businessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Business> {
    return this.businessesService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business> {
    return this.businessesService.update(+id, updateBusinessDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.businessesService.remove(+id);
  }
}
