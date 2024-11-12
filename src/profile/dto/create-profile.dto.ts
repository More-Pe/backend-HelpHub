import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { TimeRange, DaysOfWeek, Skills } from '../entities/profile.schema';

export class CreateProfileDto {
  @ApiProperty({
    example: 'I am a passionate developer with 5 years of experience.',
    description: 'Profile description',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: [Skills.ANIMAL,Skills.HEALTH],
    description: 'List of skills the user is interested in',
    format: 'array of strings',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  interestedSkills: Skills[];

  @ApiProperty({
    example: '12345',
    description: 'Postal Code',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'https://example.com/profile-picture.jpg',
    description: 'Profile picture URL',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({
    example: TimeRange.MORNING,
    description: 'Preferred time range',
    enum: TimeRange,
  })
  @IsEnum(TimeRange)
  @IsNotEmpty()
  preferredTimeRange: TimeRange;

  @ApiProperty({
    example: [DaysOfWeek.MONDAY, DaysOfWeek.WEDNESDAY, DaysOfWeek.FRIDAY],
    description: 'Selected days of the week',
    enum: DaysOfWeek,
    isArray: true,
  })
  @IsArray()
  @IsEnum(DaysOfWeek, { each: true })
  @IsNotEmpty()
  selectedDays: DaysOfWeek[];

}