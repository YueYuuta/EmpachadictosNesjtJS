import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { TipoFactura } from '@utils/enums';
import { PedidoDetalleModel } from './pedido-detalle.model';

export class PedidoModel {
  PedidoID?: number;

  Detalle: PedidoDetalleModel[];

  UsuarioID: number;

  AlmacenID: number;

  ClienteID: number;

  Observacion: string;

  Fecha: string;

  TipoFactura: TipoFactura;

  TipoPago: tipoPago;

  Subtotal0?: number;

  Subtotal12?: number;

  Iva?: number;

  Subtotal?: number;

  Total?: number;

  TotalCompra?: number;
}
