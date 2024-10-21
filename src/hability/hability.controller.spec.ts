import { Test, TestingModule } from '@nestjs/testing';
import { HabilityController } from './hability.controller';
import { HabilityService } from './hability.service';

describe('HabilityController', () => {
  let controller: HabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabilityController],
      providers: [HabilityService],
    }).compile();

    controller = module.get<HabilityController>(HabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
