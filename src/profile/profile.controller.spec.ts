import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { DaysOfWeek, Skills, TimeRange } from './entities/profile.schema';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            createProfile: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByUserId: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProfile', () => {
    it('should call service.createProfile with correct parameters', async () => {
      const dto: CreateProfileDto = {
        description: 'Test description',
        interestedSkills: [Skills.ANIMAL],
        location: '12345',
        preferredTimeRange: TimeRange.AFTERNOON,
        selectedDays: [DaysOfWeek.SUNDAY, DaysOfWeek.SATURDAY],
      };
      const userId = 'userId';
      await controller.createProfile(dto, userId);
      expect(service.createProfile).toHaveBeenCalledWith(dto, userId);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct id', async () => {
      const id = 'profileId';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findByUserId', () => {
    it('should call service.findByUserId with correct userId', async () => {
      const userId = 'userId';
      await controller.findByUserId(userId);
      expect(service.findByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const id = 'profileId';
      const dto: UpdateProfileDto = {
        description: 'Updated description',
      };
      const userId = 'userId';
      await controller.update(id, dto, userId);
      expect(service.update).toHaveBeenCalledWith(id, dto, userId);
    });
  });
});
