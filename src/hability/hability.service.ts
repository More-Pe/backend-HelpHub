import { Injectable } from '@nestjs/common';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { UpdateHabilityDto } from './dto/update-hability.dto';

@Injectable()
export class HabilityService {
  create(createHabilityDto: CreateHabilityDto) {
    return 'This action adds a new hability';
  }

  findAll() {
    return `This action returns all hability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hability`;
  }

  update(id: number, updateHabilityDto: UpdateHabilityDto) {
    return `This action updates a #${id} hability`;
  }

  remove(id: number) {
    return `This action removes a #${id} hability`;
  }
}
