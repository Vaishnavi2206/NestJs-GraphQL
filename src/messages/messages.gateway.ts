import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  }
})
export class MessagesGateway {
  @WebSocketServer()
  server:Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  // @UseGuards(WsGuard) A auth guard that validates incoming connections
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto);
    this.server.emit('message',message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    console.log("hit!");
    
    return this.messagesService.findAll();
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.join(data);
  }
}
