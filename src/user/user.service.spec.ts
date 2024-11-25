import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { NotFoundException, NotAcceptableException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel;

  beforeEach(async () => {
    mockUserModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      mockUserModel.find.mockResolvedValue([]);
      mockUserModel.create.mockResolvedValue({
        save: jest.fn().mockResolvedValue(true),
      });

      const result = await service.createUser({
        email: 'test@example.com',
        password: 'Password123!',
        nameUser: 'Test',
        surnameUser: 'User',
        phone: '123456789',
        showPhone: true,
        optionCall: false,
        blocked: false,
        twoFa: '123456',
        role: 'user',
      });

      expect(result).toBeTruthy();
    });

    it('should throw NotAcceptableException if user already exists', async () => {
      mockUserModel.find.mockResolvedValue([{}]);

      await expect(
        service.createUser({
          email: 'test@example.com',
          password: 'Password123!',
          nameUser: 'Test',
          surnameUser: 'User',
          phone: '123456789',
          showPhone: true,
          optionCall: false,
          blocked: false,
          twoFa: '123456',
          role: 'user',
        }),
      ).rejects.toThrow(NotAcceptableException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUserModel.find.mockResolvedValue([{ email: 'test@example.com' }]);

      const result = await service.findAll();
      expect(result).toEqual([{ email: 'test@example.com' }]);
    });

    it('should throw NotFoundException if no users found', async () => {
      mockUserModel.find.mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  // Similar tests can be added for update, findOne, and findOneByIdUser methods

  describe('update', () => {
    it('should update a user and return a success message', async () => {
      const mockUser = { id: '123', nameUser: 'UpdatedName' };
      mockUserModel.findByIdAndUpdate.mockResolvedValue(mockUser);

      const result = await service.update('123', {
        nameUser: 'UpdatedName',
        surnameUser: 'UpdatedSurname',
        phone: '987654321',
        optionCall: true,
        showPhone: false,
      });

      expect(result).toBe('User 123 it was updated.');
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        service.update('123', {
          nameUser: 'UpdatedName',
          surnameUser: 'UpdatedSurname',
          phone: '987654321',
          optionCall: true,
          showPhone: false,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const mockUser = { email: 'test@example.com' };
      mockUserModel.find.mockResolvedValue([mockUser]);

      const result = await service.findOne('test@example.com');
      expect(result).toEqual([mockUser]);
    });

    it('should return an empty array if user is not found', async () => {
      mockUserModel.find.mockResolvedValue([]);

      const result = await service.findOne('nonexistent@example.com');
      expect(result).toEqual([]);
    });
  });
});
