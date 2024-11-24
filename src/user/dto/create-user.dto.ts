import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Matches,
  IsOptional,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'too@gmail.com',
    description: 'username',
    format: 'string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'fffD33454',
    description: 'password',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password should contain minimum 6 digits.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password should contain mínimum one Mayusc, one number, and one symbol',
  })
  password: string;

  @ApiProperty({
    example: 'Toni',
    description: 'name',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  nameUser: string;

  @ApiProperty({
    example: 'Fernandez',
    description: 'surname',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  surnameUser: string;

  @ApiProperty({
    example: '123456',
    description: 'phoneNumber',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'false',
    description: 'optionCall',
    format: 'string',
  })
  @IsBoolean()
  optionCall: boolean;

  @ApiProperty({
    example: 'false',
    description: 'optionPhone',
    format: 'string',
  })
  @IsBoolean()
  showPhone: boolean;

  @ApiProperty({
    example: 'false',
    description: 'blocked',
    format: 'string',
  })
  @IsBoolean()
  blocked: boolean;

  @ApiProperty({
    example: '445667',
    description: 'twoFacode',
    format: 'string',
  })
  @IsOptional()
  @Matches(/^\d{6}$/, { message: 'The code must be exactly 6 digits long' })
  @IsString()
  twoFa: string;

  @ApiProperty({
    example: 'user',
    description: 'role',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  role: string = 'user';
}
