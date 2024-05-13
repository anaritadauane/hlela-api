import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserPayload } from './interfaces/users-login.interface';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      // create new user using prisma client
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: await hash(createUserDto.password, 10), // hash user's password
          firstName: createUserDto.firstName,
          surname: createUserDto.surname,
          username: createUserDto.username,
        },
      });

      // exclude password from response
      delete user.password;

      return user;
    } catch (error) {
      // check if email already registered and throw error
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    // find user by email
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserDto.email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // compare user password with the encryped password
      if (!(await compare(loginUserDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: UserPayload = {
        // payload for JWT
        id: user.id,
        email: user.email,
        username: user.username,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    users.map((user) => {
      delete user.password;
    });

    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.prisma.user.findFirstOrThrow({
        where: { id },
      });

      // update user
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          ...(updateUserDto.password && {
            password: await hash(updateUserDto.password, 10),
          }),
        },
      });

      delete userUpdated.password;
      return userUpdated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // if email is already registered
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      // find user by id
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      // delete user
      await this.prisma.user.delete({
        where: { id },
      });

      return `User with id ${user.id} deleted`;
    } catch (error) {
      // if user not found
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
