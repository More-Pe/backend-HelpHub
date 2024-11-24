import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Level, Mode } from '../entities/hability.schema';
import { Skills } from '../../profile/entities/profile.schema';

export class CreateHabilityDto {
  @ApiProperty({
    example: 'Programador',
    description: 'title of hability',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Básico',
    description: 'level of knowledge',
    format: 'string',
  })
  @IsEnum(Level)
  @IsNotEmpty()
  level: Level;

  @ApiProperty({
    example: 'Online',
    description: 'Online/Presencial',
    format: 'string',
  })
  @IsEnum(Mode)
  @IsNotEmpty()
  mode: Mode;

  @ApiProperty({
    example: 'doing c++',
    description: 'hability described',
    format: 'string',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: [Skills.LENGUAGE, Skills.TUT],
    description: 'category/s of skill/s',
    format: 'string',
  })
  @IsNotEmpty()
  category: Skills[];
}
