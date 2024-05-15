import {
  IsString,
  IsNotEmpty,
  MinLength,
  // IsAlphanumeric,
  IsEmail,
  IsBoolean,
  // Matches,
} from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  // @IsAlphanumeric(null, {
  //     message: 'Username does not allow other than alpha numeric chars.',
  //   })
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  // @Matches(passwordRegEx, { message: ''})
  password: string;

  @IsBoolean()
  isAdmin?: boolean;
}
