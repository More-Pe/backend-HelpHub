import { PartialType } from '@nestjs/swagger';
import { CreateUploadServiceDto } from './create-upload-service.dto';

export class UpdateUploadServiceDto extends PartialType(CreateUploadServiceDto) {}
