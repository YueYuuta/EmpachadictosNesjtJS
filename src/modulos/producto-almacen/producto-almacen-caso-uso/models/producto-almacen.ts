export class CrearProductoAlmacenIngresoModel {
  AlmacenID: number;

  ProductoID: number;
}

export class CrearProductoAlmacenIngresoDetalleModel {
  IngresoDetalle: number;

  PrecioCompra: number;

  Lote: string;

  ProductoAlmacenID?: number;

  IngresoDetalleID: number;
}

export class CrearProductoAlmacenEgresoModel {
  EgresoDetalle: number;

  AlmacenID: number;

  ProductoID: number;

  ProductoAlmacenID: number;
}
