import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { HabilityService } from './hability.service';
import { Hability } from './entities/hability.schema';

describe('HabilityService', () => {
  let service: HabilityService;
  let habilityModel: any;

  beforeEach(async () => {
    const mockHabilityModel = {
      find: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabilityService,
        {
          provide: getModelToken(Hability.name),
          useValue: mockHabilityModel,
        },
      ],
    }).compile();

    service = module.get<HabilityService>(HabilityService);
    habilityModel = module.get(getModelToken(Hability.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createHability', () => {
    it('should create a new hability successfully', async () => {
      const createDto = {
        title: 'New Hability',
        level: 'Básico',
        mode: 'Online',
        description: 'Description of the hability',
        category: [],
      };
      const userId = 'user123';

      habilityModel.find.mockResolvedValue([]);
      habilityModel.create.mockResolvedValue({ save: jest.fn().mockResolvedValue(createDto) });

      const result = await service.createHability(createDto as any, userId);

      expect(habilityModel.find).toHaveBeenCalledWith({ title: 'New Hability', user_id: userId });
      expect(habilityModel.create).toHaveBeenCalledWith({ ...createDto, user_id: userId });
      expect(result).toEqual(createDto);
    });

    it('should throw a ConflictException if hability title already exists', async () => {
      const createDto = { title: 'Duplicate Hability' };
      const userId = 'user123';

      habilityModel.find.mockResolvedValue([createDto]);

      await expect(service.createHability(createDto as any, userId)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all habilities', async () => {
      const habilities = [{ title: 'Hability 1' }, { title: 'Hability 2' }];
      habilityModel.find.mockResolvedValue(habilities);

      const result = await service.findAll();

      expect(habilityModel.find).toHaveBeenCalled();
      expect(result).toEqual(habilities);
    });

    it('should throw NotFoundException if no habilities found', async () => {
      habilityModel.find.mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUsersHabilities', () => {
    it('should return habilities for a specific user', async () => {
      const userId = 'user123';
      const habilities = [{ title: 'User Hability 1' }];
      habilityModel.find.mockResolvedValue(habilities);

      const result = await service.findUsersHabilities(userId);

      expect(habilityModel.find).toHaveBeenCalledWith({ user_id: userId });
      expect(result).toEqual(habilities);
    });

    it('should throw NotFoundException if user has no habilities', async () => {
      habilityModel.find.mockResolvedValue([]);

      await expect(service.findUsersHabilities('user123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneById', () => {
    it('should return a hability by ID', async () => {
      const hability = { _id: '123', title: 'Hability' };
      habilityModel.findOne.mockResolvedValue(hability);

      const result = await service.findOneById('123');

      expect(habilityModel.findOne).toHaveBeenCalledWith({ _id: '123' });
      expect(result).toEqual(hability);
    });

    it('should throw NotFoundException if hability is not found', async () => {
      habilityModel.findOne.mockResolvedValue(null);

      await expect(service.findOneById('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateHability', () => {
    it('should update a hability successfully', async () => {
      const id = '123';
      const userId = 'user123';
      const updateDto = { title: 'Updated Hability' };

      habilityModel.find.mockResolvedValue([{ _id: id, user_id: userId }]);
      habilityModel.findByIdAndUpdate.mockResolvedValue({ id, ...updateDto });

      const result = await service.updateHability(id, updateDto as any, userId);

      expect(habilityModel.find).toHaveBeenCalledWith({ _id: id, user_id: userId });
      expect(habilityModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateDto);
      expect(result).toContain('was updated!');
    });

    it('should throw NotFoundException if hability to update is not found', async () => {
      habilityModel.find.mockResolvedValue([]);

      await expect(service.updateHability('123', {} as any, 'user123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeHability', () => {
    it('should remove a hability successfully', async () => {
      const hability = { _id: '123', title: 'Hability' };
      habilityModel.findByIdAndDelete.mockResolvedValue(hability);

      const result = await service.removeHability('123');

      expect(habilityModel.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(result).toContain('was removed successfully');
    });

    it('should return failure message if hability does not exist', async () => {
      habilityModel.findByIdAndDelete.mockResolvedValue(null);

      const result = await service.removeHability('123');

      expect(habilityModel.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(result).toContain('Fail to remove');
    });
  });
});
