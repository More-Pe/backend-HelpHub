import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HabilityService } from './hability.service';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { UpdateHabilityDto } from './dto/update-hability.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetUserId } from '../decorators/get-user-id.decorator';

@Controller('hability')
@ApiTags('Hability')
@ApiBearerAuth()
export class HabilityController {
  constructor(private readonly habilityService: HabilityService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create hability' })
  @ApiResponse({ status: 201, description: 'Hability created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Error creating hability' })
  createHability(@Body() createHabilityDto: CreateHabilityDto,
  @GetUserId() userId: string,) {
    return this.habilityService.createHability(createHabilityDto, userId);
  }

  @Get('allHabilities')
  @ApiResponse({ status: 200, description: 'Habilities fetched successfully' })
  @ApiNotFoundResponse({ description: 'No habilities found' })
  @ApiOperation({ summary: 'Get all habilities' })
  findAll() {
    return this.habilityService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get hability by id' })
  @ApiResponse({ status: 200, description: 'Hability found!' })
  @ApiNotFoundResponse({ description: 'No hability found' })
  findOneById(@Param('id') id: string) {
    return this.habilityService.findOneById(id);
  }

  @Get('user-habilities/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get habilities by user_id' })
  @ApiResponse({ status: 200, description: 'Habilities found!' })
  @ApiNotFoundResponse({ description: 'No habilities found' })
  findUsersHabilities(@Param('id') id: string) {
    return this.habilityService.findUsersHabilities(id);
  }

  @Get('category-habilities/:category')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get habilities by category' })
  @ApiResponse({ status: 200, description: 'Habilities found!' })
  @ApiNotFoundResponse({ description: 'No habilities found' })
  findOneByCategory(@Param('category') category: string) {
    return this.habilityService.findOneByCategory(category);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Hability by ID of hability' })
  @ApiNotFoundResponse({ status: 404,description: 'No hability found' })
  @ApiResponse({ status: 200, description: 'Habilities updated' })
  updateHability(@Param('id') id: string, @Body() updateHabilityDto: UpdateHabilityDto,@GetUserId() userId: string) {
    return this.habilityService.updateHability(id, updateHabilityDto,userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Remove one hability by ID' })
  @ApiNotFoundResponse({ status: 404,description: 'No hability found' })
  @ApiResponse({ status: 200, description: 'Habilities removed' })
  removeHability(@Param('id') id: string) {
    return this.habilityService.removeHability(id);
  }
}
