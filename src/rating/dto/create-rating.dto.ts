import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsDate,
} from 'class-validator';
import { Skills } from '../../profile/entities/profile.schema';

export class CreateRatingDto {
  @ApiProperty({
    example: 'sdfsdfds31231311dsada',
    description: 'id_user',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  id_usrev: string;

  @ApiProperty({
    example: 'sdfsdasd2313sas11dsada',
    description: 'id_user who will recieve review',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  id_usrrv: string;

  @ApiProperty({
    example: '2',
    description: 'stars 1-5',
    format: 'string',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;

  @ApiProperty({
    example: 'it was a great experience',
    description: 'description of the review',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'sdfsdasd2313sas11dsada',
    description: 'category with you start this exchange',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Skills)
  category: Skills;
}
