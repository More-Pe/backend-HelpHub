import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Rating')
@ApiBearerAuth()
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create rating' })
  @ApiResponse({ status: 201, description: 'Rating created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Error creating rating' })
  createReview(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.createReview(createRatingDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all rating by ID reciever (id_usrrv)' })
  @ApiResponse({ status: 200, description: 'Ratings fetched successfully' })
  @ApiNotFoundResponse({ description: 'No ratings found' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  findAllByUser(@Param('id') id: string) {
    return this.ratingService.findAllByUser(id);
  }
}
