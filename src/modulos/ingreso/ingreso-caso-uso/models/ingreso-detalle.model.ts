export class IngresoDetalleModel {
  ProductoID: number;

  Cantidad: number;

  Total?: number;

  TotalsinIva?: number;

  Iva?: number;

  TotalIva?: number;

  Descripcion?: string;

  PrecioCompra?: number;

  PorcentajeGanancia?: number;

  EstadoIva?: boolean;

  Lote?: string;

  IngresoDetalleID?: number;

  IngresoID?: number;
}
