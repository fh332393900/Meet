import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meet } from './entities/room.entity';
import * as url from 'url';

type WsResponse = {
  code: number;
  type?: string;
  data?: any;
  msg: string;
};

@WebSocketGateway({
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class MeetGateway {
  constructor(
    @InjectRepository(Meet)
    private readonly meetRepository: Repository<Meet>,
  ) {}

  @WebSocketServer() private socket: Server;
  private roomId: any;

  private roomListMap: Map<string, any>;

  private onlineSize = 0;

  /* 连接成功 */
  async handleConnection(client: Socket): Promise<any> {
    this.connectSuccess(client);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: any) {
    client.to(this.roomId).emit('message', data);
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(client: Socket, data: any) {
    this.socket.to(this.roomId).emit('chatMessage', data);
  }

  handleDisconnect(client: Socket) {
    this.onlineSize -= 1;
    client.to(this.roomId).emit('bye');
  }

  async connectSuccess(client: Socket) {
    const { roomId } = client.handshake.query;
    const meet = await this.meetRepository.findOne({
      meetId: roomId as string,
    });
    if (!meet) {
      const res: WsResponse = {
        code: -1,
        msg: 'roomId is not found',
      };
      client.emit('message', res);
      return client.disconnect();
    }
    this.roomId = roomId;
    client.join(roomId);
    this.onlineSize += 1;
    client.emit('joined');
    if (this.onlineSize > 1) {
      client.to(roomId).emit('otherjoin');
    }
  }
}
