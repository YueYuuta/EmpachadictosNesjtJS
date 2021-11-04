import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { TipoCompra } from '@utils/enums';
import { IngresoDetalleModel } from './ingreso-detalle.model';

export class IngresoModel {
  IngresoID: number;

  Detalle: IngresoDetalleModel[];

  AlmacenID: number;

  UsuarioID: number;

  ProveedorID: number;

  Observacion?: string;

  TipoCompra: TipoCompra;

  TipoPago: tipoPago;

  Subtotal0?: number;

  Subtotal12?: number;

  Iva?: number;

  Subtotal?: number;

  Total?: number;

  TotalCompra?: number;

  Fecha?: string;
}
