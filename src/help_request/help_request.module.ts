import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpRequestController } from './help_request.controller';
import { HelpRequestService } from './help_request.service';
import { HelpRequest, HelpRequestSchema } from './entities/help_request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HelpRequest.name, schema: HelpRequestSchema }]),
  ],
  controllers: [HelpRequestController],
  exports: [HelpRequestService],
  providers: [HelpRequestService],
})
export class HelpRequestModule {}
