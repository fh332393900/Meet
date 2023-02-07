import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as url from 'url';

@WebSocketGateway(3002, {
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class MeetGateway {
  @WebSocketServer() private socket: Server;

  private onlineSize = 0;

  /* 连接成功 */
  async handleConnection(client: Socket): Promise<any> {
    this.connectSuccess(client);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: any) {
    console.log(data);
    const roomid = url.parse(client.request.url, true).query
      .roomid; /*获取房间号 获取桌号*/
    client.to(roomid).emit('message', data);
  }

  handleDisconnect(client: Socket) {
    const roomid = url.parse(client.request.url, true).query
      .roomid; /*获取房间号 获取桌号*/
    client.join(roomid);
    this.onlineSize -= 1;
    this.socket.to(roomid).emit('bye');
    console.log(this.onlineSize, 'onlineSize');
  }

  connectSuccess(client) {
    const roomid = url.parse(client.request.url, true).query
      .roomid; /*获取房间号 获取桌号*/
    client.join(roomid);
    this.onlineSize += 1;
    client.emit('joined');
    if (this.onlineSize > 1) {
      client.to(roomid).emit('otherjoin');
    }
    console.log(this.onlineSize, 'onlineSize');
  }
}
