import { PartialType } from '@nestjs/swagger';
import { CreateHabilityDto } from './create-hability.dto';

export class UpdateHabilityDto extends PartialType(CreateHabilityDto) {}
