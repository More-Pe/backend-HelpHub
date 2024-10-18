import { Module } from '@nestjs/common';
import { HabilityService } from './hability.service';
import { HabilityController } from './hability.controller';

@Module({
  controllers: [HabilityController],
  providers: [HabilityService],
})
export class HabilityModule {}
