import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { getModelToken } from '@nestjs/mongoose';
import { DaysOfWeek, Profile, Skills, TimeRange } from './entities/profile.schema';
import { NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;
  let mockProfileModel;

  beforeEach(async () => {
    mockProfileModel = {
      findOne: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getModelToken(Profile.name),
          useValue: mockProfileModel,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create a new profile', async () => {
      mockProfileModel.findOne.mockResolvedValue(null);
      mockProfileModel.create.mockResolvedValue({});

      const result = await service.createProfile({
        description: 'Test description',
        interestedSkills: [Skills.ANIMAL],
        location: '12345',
        preferredTimeRange: TimeRange.MORNING,
        selectedDays: [DaysOfWeek.FRIDAY,DaysOfWeek.SATURDAY],
      }, 'userId');

      expect(result).toBeDefined();
    });

    it('should throw ConflictException if profile already exists', async () => {
      mockProfileModel.findOne.mockResolvedValue({});

      await expect(
        service.createProfile({
          description: 'Test description',
          interestedSkills: [Skills.ANIMAL],
          location: '12345',
          preferredTimeRange: TimeRange.AFTERNOON,
          selectedDays: [DaysOfWeek.FRIDAY,DaysOfWeek.SATURDAY],
        }, 'userId'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update a profile and return it', async () => {
      const mockProfile = { userId: 'userId', save: jest.fn().mockResolvedValue(true) };
      mockProfileModel.findById.mockResolvedValue(mockProfile);

      const result = await service.update('profileId', {
        description: 'Updated description',
      }, 'userId');

      expect(result).toBeTruthy();
    });

    it('should throw NotFoundException if profile is not found', async () => {
      mockProfileModel.findById.mockResolvedValue(null);

      await expect(
        service.update('profileId', {
          description: 'Updated description',
        }, 'userId'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user does not own the profile', async () => {
      const mockProfile = { userId: 'anotherUserId' };
      mockProfileModel.findById.mockResolvedValue(mockProfile);

      await expect(
        service.update('profileId', {
          description: 'Updated description',
        }, 'userId'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});