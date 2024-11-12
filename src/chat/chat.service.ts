import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChateDocument } from './entities/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChateDocument>,
  ) { }

  // Get all chats about conversation beteween two id_clients.
  async findAllByIds(id_e: string, id_r: string): Promise<Chat[]> {
    try {
      const chats1 = await this.chatModel.find({ from: id_e, to: id_r });
      const chats2 = await this.chatModel.find({ from: id_r, to: id_e });
      const combinedChats = chats1.concat(chats2);
      if (combinedChats.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return combinedChats;

    } catch (error) {
      throw new NotFoundException({
        error: 'Not found!',
      })
    }
  }
}