import { Test, TestingModule } from '@nestjs/testing';
import { HabilityService } from './hability.service';

describe('HabilityService', () => {
  let service: HabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabilityService],
    }).compile();

    service = module.get<HabilityService>(HabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
