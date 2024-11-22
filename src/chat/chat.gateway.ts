// chat.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './entities/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { format } from 'date-fns/format';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@InjectModel(Chat.name) private readonly chatModel: Model<Chat>) { }
  @WebSocketServer() server: Server;
  private users: Set<string> = new Set();
  private userSocketMap: Map<string, string> = new Map(); // Map for save relation between userId and sockedId { userId: socketId }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);//will dessapear later test stage
    const id = client.handshake.query.id; //save idUser form client
    if((id != undefined) || (id != null))
    {
      this.userSocketMap.set(id.toString(), client.id); // Set this userId with actual socketId
      this.users.add(client.id);
    }
    else{
      this.handleDisconnect(client);
    }
    
  }
  // When some client disconnect
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`); //will dessapear later test
    this.userSocketMap.forEach((socketId, userId) => { //look for active user in map and if disconnect it will be deleted.
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
      }
    });
    this.users.delete(client.id);
  }

  // That will be used with another collection, for admin usability
  @SubscribeMessage('messageToServer')
  @UseGuards(AuthGuard('jwt'))
  handleMessage(client: Socket, @MessageBody() data: string): void {
    console.log(`Mensaje recibido: ${data}`);
    // Emit all clients.
    this.server.emit('messageToClient', data);
  }

  // Send one message to one specific client
  @SubscribeMessage('privateMessage')
  @UseGuards(AuthGuard('jwt'))
  async handlePrivateMessage(client: Socket, @MessageBody() { from,to, message }: {from:string,to: string, message: string }) {
    console.log(`Mensaje privado para ${to}: ${message} `); //will dessapear later test
    // Save first message in BBDD.
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const chatCreate = await this.chatModel.create({
      from: from,to:to, message:message, timestamp:formattedDate
    });
    chatCreate.save();
    // Send this message to client, will do it in real-time only if another is connected.
    const targetClient = this.userSocketMap.get(to); // Obtener el socketId del destinatario
    if (targetClient) {
      this.server.to(targetClient).emit('privateMessage', message,formattedDate,from);
    }
  }
}
