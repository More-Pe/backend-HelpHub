import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.schema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  exports: [ChatService],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
