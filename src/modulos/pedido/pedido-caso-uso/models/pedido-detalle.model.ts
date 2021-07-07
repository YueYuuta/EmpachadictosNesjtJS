export class PedidoDetalleModel {
  PedidoDetalleID?: number;

  MenuID: number;

  Cantidad: number;

  Total?: number;

  TotalCompra?: number;

  Descripcion?: string;

  PrecioCompra?: number;

  PrecioSinIva?: number;

  PrecioVenta?: number;

  PorcentajeGanancia?: number;

  EstadoIva?: boolean;

  EstadoPrecioVentaDinamico?: boolean;

  TotalsinIva?: number;

  Iva?: number;

  TotalIva?: number;
}
