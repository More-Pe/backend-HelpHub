import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../decorators/get-user-id.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiOperation({ summary: 'Create profile' })
  createProfile(@Body() createProfileDto: CreateProfileDto, @GetUserId() userId: string) {
    return this.profileService.createProfile(createProfileDto, userId);
  }

  @Get('allProfiles')
  @ApiOperation({ summary: 'Get all profiles' })
  async findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by ID' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update profile' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
}
