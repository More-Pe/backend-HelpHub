import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Chat')
@Controller('chat')
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversation/:id_e/:id_r')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all conversation between two clients.' })
  @ApiResponse({ status: 200, description: 'Chats fetched successfully' })
  @ApiNotFoundResponse({ description: 'No chats found' })
  async findAllChats(@Param('id_e') id_e: string, @Param('id_r') id_r: string) {
    return this.chatService.findAllByIds(id_e, id_r);
  }
}
