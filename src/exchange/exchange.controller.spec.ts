import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { AuthGuard } from '@nestjs/passport';

describe('ExchangeController', () => {
  let controller: ExchangeController;
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        {
          provide: ExchangeService,
          useValue: {
            createExchange: jest.fn(),
            findAllApp: jest.fn(),
            findOneByReciever: jest.fn(),
            findOneByDeclined: jest.fn(),
            updateExchange: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ExchangeController>(ExchangeController);
    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.createExchange with correct parameters', async () => {
      const createDto: CreateExchangeDto = {
        transmitter: 'transmitter123',
        reciever: 'receiver123',
        state: 'progress',
        date: '12-10-2024'
      };

      await controller.create(createDto);
      expect(service.createExchange).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAllApp with correct id', async () => {
      const id = 'user123';
      await controller.findAll(id);
      expect(service.findAllApp).toHaveBeenCalledWith(id);
    });
  });

  describe('findOneByReciever', () => {
    it('should call service.findOneByReciever with correct id', async () => {
      const id = 'receiver123';
      await controller.findOneByReciever(id);
      expect(service.findOneByReciever).toHaveBeenCalledWith(id);
    });
  });

  describe('findOneByRecieverDeclined', () => {
    it('should call service.findOneByDeclined with correct id', async () => {
      const id = 'user123';
      await controller.findOneByRecieverDeclined(id);
      expect(service.findOneByDeclined).toHaveBeenCalledWith(id);
    });
  });

  describe('updateExchange', () => {
    it('should call service.updateExchange with correct parameters', async () => {
      const id = 'exchange123';
      const updateDto: UpdateExchangeDto = {
        state: 'accepted',
        date: '13-10-2024'
      };

      await controller.updateExchange(id, updateDto);
      expect(service.updateExchange).toHaveBeenCalledWith(updateDto, id);
    });

    it('should allow partial updates', async () => {
      const id = 'exchange123';
      const updateDto: UpdateExchangeDto = {
        state: 'declined'
      };

      await controller.updateExchange(id, updateDto);
      expect(service.updateExchange).toHaveBeenCalledWith(updateDto, id);
    });
  });

  // Test error scenarios
  describe('error handling', () => {
    it('should handle service errors in create', async () => {
      const createDto: CreateExchangeDto = {
        transmitter: 'transmitter123',
        reciever: 'receiver123',
        state: 'progress',
        date: '12-10-2024'
      };

      jest.spyOn(service, 'createExchange').mockRejectedValue(new Error('Error creating exchange'));

      await expect(controller.create(createDto)).rejects.toThrow('Error creating exchange');
    });

    it('should handle service errors in findAll', async () => {
      const id = 'user123';
      jest.spyOn(service, 'findAllApp').mockRejectedValue(new Error('No exchanges found'));

      await expect(controller.findAll(id)).rejects.toThrow('No exchanges found');
    });
  });
});
