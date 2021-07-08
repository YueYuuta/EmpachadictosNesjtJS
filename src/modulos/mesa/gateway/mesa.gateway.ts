import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { LeerMesaDto } from '../api/dto';

@WebSocketGateway()
export class MesaGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private Logger: Logger = new Logger('MesaGateway');
  afterInit(server: Server) {
    this.Logger.log(`inicializado! ${server}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.Logger.log(`cliente conectado ${client}`);
  }
  handleDisconnect(client: any) {
    this.Logger.log(`cliente desconectado ${client}`);
  }
  @SubscribeMessage('message')
  handleMessage(payload: any): WsResponse<string> {
    return { event: 'message', data: payload };
  }

  @WebSocketServer() wss: Server;

  emitirEventoCambioOcupado(mesa: LeerMesaDto) {
    this.wss.emit('cambioOcupado', { type: 'Alert', message: mesa });
  }
}
