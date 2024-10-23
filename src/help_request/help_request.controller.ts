import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HelpRequestService } from './help_request.service';
import { CreateHelpRequestDto } from './dto/create-help_request.dto';
import { UpdateHelpRequestDto } from './dto/update-help_request.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { GetUserId } from '../decorators/get-user-id.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Help Requests')
@Controller('help-requests')
@ApiBearerAuth()
export class HelpRequestController {
  constructor(private readonly helpRequestService: HelpRequestService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create help request' })
  @ApiResponse({ status: 201, description: 'Help request created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Error creating help request' })
  createHelpRequest(
    @Body() createHelpRequestDto: CreateHelpRequestDto,
    @GetUserId() userId: string,
  ) {
    return this.helpRequestService.createHelpRequest(createHelpRequestDto, userId);
  }

  @Get('allHelpRequests')
  @ApiOperation({ summary: 'Get all help requests' })
  @ApiResponse({ status: 200, description: 'Help requests fetched successfully' })
  @ApiNotFoundResponse({ description: 'No help requests found' })
  @ApiResponse({ status: 406, description: 'Error fetching help requests' })
  findAll() {
    return this.helpRequestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get help request by ID' })
  @ApiResponse({ status: 200, description: 'Help request fetched successfully' })
  @ApiNotFoundResponse({ description: 'Help request not found' })
  @ApiResponse({ status: 406, description: 'Error fetching help request' })
  findOne(@Param('id') id: string) {
    return this.helpRequestService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get help requests by user ID (token)' })
  @ApiResponse({ status: 200, description: 'Help requests fetched successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No help requests found for this user' })
  @ApiResponse({ status: 406, description: 'Error fetching help requests' })
  findByUserId(@GetUserId() userId: string) {
    return this.helpRequestService.findByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update help request' })
  @ApiResponse({ status: 200, description: 'Help request updated successfully' })
  @ApiNotFoundResponse({ description: 'Help request not found' })
  @ApiForbiddenResponse({
    description: 'You do not have permission to update this help request',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiResponse({ status: 406, description: 'Error updating help request' })
  update(
    @Param('id') id: string,
    @Body() updateHelpRequestDto: UpdateHelpRequestDto,
    @GetUserId() userId: string,
  ) {
    return this.helpRequestService.update(id, updateHelpRequestDto, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete help request' })
  @ApiResponse({ status: 200, description: 'Help request deleted successfully' })
  @ApiNotFoundResponse({ description: 'Help request not found' })
  @ApiForbiddenResponse({
    description: 'You do not have permission to delete this help request',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Error deleting help request' })
  remove(@Param('id') id: string, @GetUserId() userId: string) {
    return this.helpRequestService.remove(id, userId);
  }
}