import { Bind, Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';
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

@WebSocketGateway()
export class PedidoGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private Logger: Logger = new Logger('PedidoGateway');
  afterInit(server: Server) {
    this.Logger.log(`inicializado! ${server}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.Logger.log(`cliente conectado ${client}`);
  }
  handleDisconnect(client: any) {
    this.Logger.log(`cliente desconectado ${client}`);
  }

  sendToAll(msg: string) {
    this.wss.emit('alertToClient', { type: 'Alert', message: msg });
  }

  enviarDespachar(despachar: any) {
    this.wss.emit('enviarDespachar', { type: 'Alert', data: despachar });
  }
}
