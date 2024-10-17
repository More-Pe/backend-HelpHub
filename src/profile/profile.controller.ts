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
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: 'Create profile' })
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @GetUserId() userId: string,
  ) {
    return this.profileService.createProfile(createProfileDto, userId);
  }

  @Get('allProfiles')
  @ApiOperation({ summary: 'Get all profiles' })
  async findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by profile ID' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get profile by user ID (token)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findByUserId(@GetUserId() userId: string) {
    return this.profileService.findByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUserId() userId: string,
  ) {
    return this.profileService.update(id, updateProfileDto, userId);
  }
}
