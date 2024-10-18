import { Module } from '@nestjs/common';
import { HabilityService } from './hability.service';
import { HabilityController } from './hability.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hability,HabilitySchema } from './entities/hability.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hability.name, schema: HabilitySchema }])],
  controllers: [HabilityController],
  exports: [HabilityService],
  providers: [HabilityService],
})
export class HabilityModule {}
