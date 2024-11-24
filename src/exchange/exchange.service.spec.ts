import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ExchangeService } from './exchange.service';
import { Exchange } from './entities/exchange.schema';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let mockExchangeModel;

  beforeEach(async () => {
    mockExchangeModel = {
      find: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: getModelToken(Exchange.name),
          useValue: mockExchangeModel,
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createExchange', () => {
    it('should create a new exchange successfully', async () => {
      const createDto = {
        transmitter: 'user1',
        reciever: 'user2',
        state: 'progress',
        date: '2024-12-01',
      };

      mockExchangeModel.find.mockResolvedValue([]);
      mockExchangeModel.create.mockResolvedValue({
        save: jest.fn().mockResolvedValue(createDto),
      });

      const result = await service.createExchange(createDto);

      expect(mockExchangeModel.find).toHaveBeenCalledTimes(2);
      expect(mockExchangeModel.create).toHaveBeenCalledWith({
        transmitter: 'user1',
        reciever: 'user2',
        date: expect.any(String),
        state: 'progress',
      });
      expect(result).toEqual(createDto);
    });

    it('should throw ConflictException if exchange already exists', async () => {
      const createDto = {
        transmitter: 'user1',
        reciever: 'user2',
        state: 'progress',
        date: '2024-12-01',
      };

      mockExchangeModel.find.mockResolvedValue([createDto]);

      await expect(service.createExchange(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAllApp', () => {
    it('should return all accepted exchanges for a user', async () => {
      const userId = 'user1';
      const exchanges = [
        { transmitter: userId, reciever: 'user2', state: 'accepted' },
        { transmitter: 'user3', reciever: userId, state: 'accepted' },
      ];

      mockExchangeModel.find
        .mockResolvedValueOnce([exchanges[0]]) 
        .mockResolvedValueOnce([exchanges[1]]);

      const result = await service.findAllApp(userId);

      expect(mockExchangeModel.find).toHaveBeenCalledWith({ reciever: userId, state: 'accepted' });
      expect(mockExchangeModel.find).toHaveBeenCalledWith({ transmitter: userId, state: 'accepted' });
      expect(result).toEqual(exchanges);
    });

    it('should throw NotFoundException if no exchanges found', async () => {
      mockExchangeModel.find.mockResolvedValue([]);

      await expect(service.findAllApp('user1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByReciever', () => {
    it('should return exchanges for a specific reciever', async () => {
      const recieverId = 'user2';
      const exchanges = [{ transmitter: 'user1', reciever: recieverId, state: 'progress' }];

      mockExchangeModel.find.mockResolvedValue(exchanges);

      const result = await service.findOneByReciever(recieverId);

      expect(mockExchangeModel.find).toHaveBeenCalledWith({ reciever: recieverId, state: 'progress' });
      expect(result).toEqual(exchanges);
    });

    it('should throw NotFoundException if no exchanges found', async () => {
      mockExchangeModel.find.mockResolvedValue([]);

      await expect(service.findOneByReciever('user2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByDeclined', () => {
    it('should return declined exchanges for a user', async () => {
      const userId = 'user1';
      const exchanges = [
        { transmitter: userId, reciever: 'user2', state: 'declined' },
        { transmitter: 'user3', reciever: userId, state: 'declined' },
      ];

      mockExchangeModel.find
        .mockResolvedValueOnce([exchanges[0]]) // For first query
        .mockResolvedValueOnce([exchanges[1]]); // For second query

      const result = await service.findOneByDeclined(userId);

      expect(mockExchangeModel.find).toHaveBeenCalledWith({ reciever: userId, state: 'declined' });
      expect(mockExchangeModel.find).toHaveBeenCalledWith({ transmitter: userId, state: 'declined' });
      expect(result).toEqual(exchanges);
    });

    it('should throw NotFoundException if no declined exchanges found', async () => {
      mockExchangeModel.find.mockResolvedValue([]);

      await expect(service.findOneByDeclined('user1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateExchange', () => {
    it('should update an exchange state successfully', async () => {
      const id = 'exchange1';
      const updateDto = { state: 'completed' };
      const exchange = { id, state: 'progress' };

      mockExchangeModel.find.mockResolvedValue([exchange]);
      mockExchangeModel.findByIdAndUpdate.mockResolvedValue({ id, ...updateDto });

      const result = await service.updateExchange(updateDto, id);

      expect(mockExchangeModel.find).toHaveBeenCalledWith({ _id: id });
      expect(mockExchangeModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { state: 'completed' });
      expect(result).toContain('was updated!');
    });

    it('should throw NotFoundException if exchange is not found', async () => {
      mockExchangeModel.find.mockResolvedValue([]);

      await expect(service.updateExchange({ state: 'completed' }, 'exchange1')).rejects.toThrow(NotFoundException);
    });
  });
});
