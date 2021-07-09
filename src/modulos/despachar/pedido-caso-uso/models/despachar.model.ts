import { DespacharDetalleModel } from './despachar-detalle.model';

export class DespacharModel {
  DespacharID?: number;

  Detalle: DespacharDetalleModel[];

  MesaID: number;

  AlmacenID?: number;

  PedidoID: number;

  UsuarioID: number;

  Tipo: string;
}
