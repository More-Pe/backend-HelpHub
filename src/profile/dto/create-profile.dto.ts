import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsString, IsOptional, IsMongoId } from "class-validator";
import { TimeRange, DaysOfWeek } from '../entities/profile.schema';

export class CreateProfileDto {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'User ID',
        format: 'string',
    })
    @IsMongoId()
    @IsNotEmpty()
    user: string;

    @ApiProperty({
        example: 'I am a passionate developer with 5 years of experience.',
        description: 'Profile description',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

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