import { Module } from '@nestjs/common';
import { UploadServiceService } from './upload-service.service';
import { UploadServiceController } from './upload-service.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileSchema, Upload } from './entities/file.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MulterModule.register({}),
    MongooseModule.forFeature([{ name: Upload.name, schema: FileSchema }]),
  ],
  controllers: [UploadServiceController],
  providers: [UploadServiceService],
  exports: [UploadServiceService, MongooseModule], // Export service
})
export class UploadServiceModule {}
