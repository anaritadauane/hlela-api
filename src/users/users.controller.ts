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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponse, UserPayload } from './interfaces/users-login.interface';
import { UserRequest } from './interfaces/users-request.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { MeGuard } from 'src/common/guards/me.guard';
// import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @Public()
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    // call users service method to login user
    return this.usersService.login(loginUserDto);
  }

  @Get('profile')
  me(@Request() req: UserRequest): UserPayload {
    return req.user;
  }

  @Public()
  @Get()
  // @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);

    return user;
  }

  @Patch(':id')
  @UseGuards(MeGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(MeGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
