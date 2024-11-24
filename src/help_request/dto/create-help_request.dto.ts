import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateHelpRequestDto {
  @ApiProperty({
    example: 'Recipe',
    description: 'Title of help request',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'I need help with a vegan cheese recipe that I cant come up with.',
    description: 'Help request description',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Cook',
    description: 'Category of the help request',
    format: 'string',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 'https://example.com/help_request-picture.jpg',
    description: 'Help request picture URL',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  profilePicture?: string;
}
