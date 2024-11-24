import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('exchange')
@ApiTags('Exchange')
@ApiBearerAuth()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  //@UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create exchange' })
  @ApiResponse({ status: 201, description: 'Exchange created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 406, description: 'Error creating exchange' })
  create(@Body() createExchangeDto: CreateExchangeDto) {
    return this.exchangeService.createExchange(createExchangeDto);
  }

  @Get('find-all-acepted/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all acepted by id user exchanged ' })
  @ApiResponse({ status: 200, description: 'Exchanges found!' })
  @ApiNotFoundResponse({ description: 'No exchanges found' })
  findAll(@Param('id') id: string) {
    return this.exchangeService.findAllApp(id);
  }

  @Get('findBy-reciever-progress/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get exchange by reciever and in state progress ' })
  @ApiResponse({ status: 200, description: 'Exchanges found!' })
  @ApiNotFoundResponse({ description: 'No exchanges found' })
  findOneByReciever(@Param('id') id: string) {
    return this.exchangeService.findOneByReciever(id);
  }

  @Get('findBy-all-declined/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get exchange by id user and in state declined ' })
  @ApiResponse({ status: 200, description: 'Exchanges found!' })
  @ApiNotFoundResponse({ description: 'No exchanges found' })
  findOneByRecieverDeclined(@Param('id') id: string) {
    return this.exchangeService.findOneByDeclined(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Exchange by ID' })
  @ApiNotFoundResponse({ status: 404, description: 'No exchange found' })
  @ApiResponse({ status: 200, description: 'Exchange updated' })
  updateExchange(
    @Param('id') id: string,
    @Body() updateExchangeDto: UpdateExchangeDto,
  ) {
    return this.exchangeService.updateExchange(updateExchangeDto, id);
  }
}
