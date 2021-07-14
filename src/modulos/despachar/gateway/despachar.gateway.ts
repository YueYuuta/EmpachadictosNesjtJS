import { Bind, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { EditarDespacharCasoUso } from '../pedido-caso-uso/editar';

@WebSocketGateway()
export class DespacharGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly _editarDespacharService: EditarDespacharCasoUso,
  ) {}
  private Logger: Logger = new Logger('DespacharGateway');
  afterInit(server: Server) {
    this.Logger.log(`inicializado! ${server}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.Logger.log(`cliente conectado ${client}`);
  }
  handleDisconnect(client: any) {
    this.Logger.log(`cliente desconectado ${client}`);
  }
  // @SubscribeMessage('message')
  // handleMessage(payload: any): WsResponse<string> {
  //   return { event: 'message', data: payload };
  // }

  @WebSocketServer() wss: Server;

  sendToAll(msg: string) {
    this.wss.emit('alertToClient', { type: 'Alert', message: msg });
  }

  async pedidoCompletado(msg: boolean) {
    this.wss.emit('pedidoCompletado', { type: 'Alert', data: msg });
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('EstadoDespacharCompletadoServer')
  async handleMessage(@MessageBody() payload: { DespacharID: number }) {
    await this._editarDespacharService.cambiarEstadoDespachar(
      payload.DespacharID,
      true,
    );
    console.log('esttooo', payload);
    this.wss.emit('EstadoDespacharCompletadoCliente', {
      type: 'Alert',
      data: payload,
    });
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('EstadoDespacharCompletadoDespacharServer')
  async handleMessageDespachar(
    @MessageBody() payload: { DespacharID: number },
  ) {
    await this._editarDespacharService.cambiarEstadoDespacharPrincipal(
      payload.DespacharID,
      true,
    );
    console.log('esttooofdgdfgdfgdfg', payload);
    this.wss.emit('EstadoDespacharCompletadoDespacharCliente', {
      type: 'Alert',
      data: payload,
    });
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('notificarCambioADespacharServer')
  async notificarCambioDespachar(
    @MessageBody() payload: { DespacharID: number },
  ) {
    const respuesta = await this._editarDespacharService.cambiarEstadoNotificacionDespachar(
      payload.DespacharID,
      true,
    );
    console.log('payload', payload, respuesta);
    console.log('esttooo', payload);
    this.wss.emit('notificarCambioADespacharCliente', {
      type: 'Alert',
      data: payload,
    });
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('notificarDesactivarNotificacionServer')
  async cambioNotificacion(@MessageBody() payload: { DespacharID: number }) {
    const respuesta = await this._editarDespacharService.cambiarEstadoNotificacionDespachar(
      payload.DespacharID,
      false,
    );
    console.log('payload', payload, respuesta);
    console.log('esttooo', payload);
    this.wss.emit('notificarDesactivarNotificacionCliente', {
      type: 'Alert',
      data: payload,
    });
  }
}
