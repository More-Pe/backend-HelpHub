import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { GetUserId } from '../decorators/get-user-id.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Profile')
@Controller('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create profile' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  @ApiConflictResponse({ description: 'User already has a profile' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Error creating profile' })
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @GetUserId() userId: string,
  ) {
    return this.profileService.createProfile(createProfileDto, userId);
  }

  @Get('allProfiles')
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'Profiles fetched successfully' })
  @ApiNotFoundResponse({ description: 'No profiles found' })
  @ApiResponse({ status: 406, description: 'Error fetching profiles' })
  async findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by profile ID' })
  @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @ApiResponse({ status: 406, description: 'Error fetching profile' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get profile by user ID (token)' })
  @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Profile not found for this user' })
  @ApiResponse({ status: 406, description: 'Error fetching profile' })
  async findByUserId(@GetUserId() userId: string) {
    return this.profileService.findByUserId(userId);
  }

  //should be this because they are need to choose every one id in home page.
  @Get('byUserId/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get profile by User ID' })
  @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Profile not found for this user' })
  @ApiResponse({ status: 406, description: 'Error fetching profile' })
  async findByUserId2(@Param('id') userId: string) {
    return this.profileService.findByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @ApiForbiddenResponse({
    description: 'You do not have permission to update this profile',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiResponse({ status: 406, description: 'Error updating profile' })
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUserId() userId: string,
  ) {
    return this.profileService.update(id, updateProfileDto, userId);
  }
}
