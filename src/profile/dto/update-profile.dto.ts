import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsArray } from 'class-validator';
import { TimeRange, DaysOfWeek, Skills } from '../entities/profile.schema';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty({
    example: 'I am a passionate developer with 5 years of experience.',
    description: 'Profile description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: ['Computing', 'Languages', 'Tutoring'],
    description: 'List of skills the user is interested in',
    format: 'array of strings',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestedSkills?: Skills[];

  @ApiProperty({
    example: '12345',
    description: 'Postal Code',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: 'https://example.com/profile-picture.jpg',
    description: 'Profile picture URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({
    example: TimeRange.MORNING,
    description: 'Preferred time range',
    enum: TimeRange,
    required: false,
  })
  @IsEnum(TimeRange)
  @IsOptional()
  preferredTimeRange?: TimeRange;

  @ApiProperty({
    example: [DaysOfWeek.MONDAY, DaysOfWeek.WEDNESDAY, DaysOfWeek.FRIDAY],
    description: 'Selected days of the week',
    enum: DaysOfWeek,
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsEnum(DaysOfWeek, { each: true })
  @IsOptional()
  selectedDays?: DaysOfWeek[];
}
