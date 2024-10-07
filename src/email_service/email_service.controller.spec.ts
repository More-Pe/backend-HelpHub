import { Test, TestingModule } from '@nestjs/testing';
import { EmailServiceController } from './email_service.controller';
import { EmailServiceService } from './email_service.service';

describe('EmailServiceController', () => {
  let controller: EmailServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailServiceController],
      providers: [EmailServiceService],
    }).compile();

    controller = module.get<EmailServiceController>(EmailServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
