import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange } from './entities/exchange.schema';
import { Model } from 'mongoose';
import { format } from 'date-fns';

@Injectable()
export class ExchangeService {
  constructor(@InjectModel(Exchange.name) private readonly exchangeModel: Model<Exchange>) { }
  async createExchange(createExchangeDto: CreateExchangeDto): Promise<Exchange> {
    try {
      const {transmitter,reciever,date,state} = createExchangeDto;
      const formattedDate = format(new Date(), 'yyyy-MM-dd');
      //Check first if exists the same exchange.
      const existingChange = await this.exchangeModel.find({ transmitter: transmitter, reciever: reciever });
      const existingChange2 = await this.exchangeModel.find({ transmitter: reciever, reciever: transmitter });
      if ((existingChange.length | existingChange2.length) >= 1) {
        throw new ConflictException('This exchanged already exists');
      }
      
      
      const exchangeCreate = await this.exchangeModel.create({
        transmitter: transmitter,reciever:reciever, date:formattedDate, state:'progress'
      });
      return exchangeCreate.save();
    } catch {
      throw new NotAcceptableException({
        error: 'Error creating exchange!!',
      });
    }
  }

  async findAllApp(id:string) {
    try {
      const exchanges1 = await this.exchangeModel.find({ reciever: id ,state:'accepted' });
      const exchanges2 = await this.exchangeModel.find({ transmitter: id ,state:'accepted' });
      const combinedExchanges = exchanges1.concat(exchanges2);
      if (combinedExchanges.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return combinedExchanges;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }

  async findOneByReciever(id_reciever: string) {
    try {
      const exchanges = await this.exchangeModel.find({ reciever: id_reciever ,state:'progress' });
      if (exchanges.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return exchanges;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }

  async findOneByDeclined(id: string) {
    try {
      const exchanges1 = await this.exchangeModel.find({ reciever: id ,state:'declined' });
      const exchanges2 = await this.exchangeModel.find({ transmitter: id ,state:'declined' });
      const combinedExchanges = exchanges1.concat(exchanges2);
      if (combinedExchanges.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return combinedExchanges;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }

  async updateExchange(updateExchangeDto: UpdateExchangeDto,id:string) {
    try {
      // Verify sure that the exchange by ID to update is created and exists.
      const exchangeValid = await this.exchangeModel.find({ _id: id });
      if (!exchangeValid) {
        throw new NotFoundException({
          error: 'Not found!',
        })
      }
      else {
        const { transmitter,reciever,date,state } = updateExchangeDto;

        const exchangeUpdate = await this.exchangeModel.findByIdAndUpdate(id, { state: state });
        return "Exchange" + ' ' + exchangeUpdate.id + ' ' + "was updated!";
      }


    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }

  remove(id: number) {
    return `This action removes a #${id} exchange`;
  }
}
