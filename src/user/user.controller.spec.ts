import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findOneByIdUser: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call service.createUser with correct parameters', async () => {
      const dto: CreateUserDto = {
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
      };
      await controller.createUser(dto);
      expect(service.createUser).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct email', async () => {
      const email = 'test@example.com';
      await controller.findOne(email);
      expect(service.findOne).toHaveBeenCalledWith(email);
    });
  });

  describe('findOneByIdUser', () => {
    it('should call service.findOneByIdUser with correct id', async () => {
      const id = '123';
      await controller.findOneByIdUser(id);
      expect(service.findOneByIdUser).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const id = '123';
      const dto: UpdateUserDto = {
        nameUser: 'UpdatedName',
        surnameUser: 'UpdatedSurname',
        phone: '987654321',
        optionCall: true,
        showPhone: false,
      };
      await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });
});
