import { PartialType } from '@nestjs/swagger';
import { CreateHelpRequestDto } from './create-help_request.dto';

export class UpdateHelpRequestDto extends PartialType(CreateHelpRequestDto) {}
