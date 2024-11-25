import { Test, TestingModule } from '@nestjs/testing';
import { HabilityController } from './hability.controller';
import { HabilityService } from './hability.service';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { UpdateHabilityDto } from './dto/update-hability.dto';
import { Level, Mode } from './entities/hability.schema';

describe('HabilityController', () => {
  let controller: HabilityController;
  let service: HabilityService;

  beforeEach(async () => {
    const mockService = {
      createHability: jest.fn(),
      findAll: jest.fn(),
      findOneById: jest.fn(),
      findUsersHabilities: jest.fn(),
      findOneByCategory: jest.fn(),
      updateHability: jest.fn(),
      removeHability: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabilityController],
      providers: [
        {
          provide: HabilityService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<HabilityController>(HabilityController);
    service = module.get<HabilityService>(HabilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createHability', () => {
    it('should call service.createHability with correct parameters', async () => {
      const dto: CreateHabilityDto = {
        title: 'New Hability',
        level: Level.BASIC,
        mode: Mode.ONLINE,
        description: 'Description of the new hability',
        category: [],
      };
      const userId = 'someUserId';

      await controller.createHability(dto, userId);

      expect(service.createHability).toHaveBeenCalledWith(dto, userId);
      expect(service.createHability).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('should call service.findOneById with correct id', async () => {
      const id = 'habilityId';

      await controller.findOneById(id);

      expect(service.findOneById).toHaveBeenCalledWith(id);
      expect(service.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUsersHabilities', () => {
    it('should call service.findUsersHabilities with correct user id', async () => {
      const userId = 'userId';

      await controller.findUsersHabilities(userId);

      expect(service.findUsersHabilities).toHaveBeenCalledWith(userId);
      expect(service.findUsersHabilities).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByCategory', () => {
    it('should call service.findOneByCategory with correct category', async () => {
      const category = 'category';

      await controller.findOneByCategory(category);

      expect(service.findOneByCategory).toHaveBeenCalledWith(category);
      expect(service.findOneByCategory).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateHability', () => {
    it('should call service.updateHability with correct parameters', async () => {
      const id = 'habilityId';
      const dto: UpdateHabilityDto = {
        title: 'Updated Hability',
        level: Level.HIGH,
        mode: Mode.PRESENTIAL,
        description: 'Updated description',
      };
      const userId = 'userId';

      await controller.updateHability(id, dto, userId);

      expect(service.updateHability).toHaveBeenCalledWith(id, dto, userId);
      expect(service.updateHability).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeHability', () => {
    it('should call service.removeHability with correct id', async () => {
      const id = 'habilityId';

      await controller.removeHability(id);

      expect(service.removeHability).toHaveBeenCalledWith(id);
      expect(service.removeHability).toHaveBeenCalledTimes(1);
    });
  });
});
