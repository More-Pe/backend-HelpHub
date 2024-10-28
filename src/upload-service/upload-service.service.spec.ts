import { Test, TestingModule } from '@nestjs/testing';
import { UploadServiceService } from './upload-service.service';

describe('UploadServiceService', () => {
  let service: UploadServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadServiceService],
    }).compile();

    service = module.get<UploadServiceService>(UploadServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
