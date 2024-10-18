import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabilityService } from './hability.service';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { UpdateHabilityDto } from './dto/update-hability.dto';

@Controller('hability')
export class HabilityController {
  constructor(private readonly habilityService: HabilityService) {}

  @Post()
  create(@Body() createHabilityDto: CreateHabilityDto) {
    return this.habilityService.create(createHabilityDto);
  }

  @Get()
  findAll() {
    return this.habilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabilityDto: UpdateHabilityDto) {
    return this.habilityService.update(+id, updateHabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habilityService.remove(+id);
  }
}
