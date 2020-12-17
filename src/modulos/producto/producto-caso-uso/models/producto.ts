export class ProductoModel {
  Categoria: number;

  Descripcion: string;

  PrecioCompra: number;

  PrecioVenta: number;

  EstadoIva: boolean;

  Fecha: string;

  Imagen?: string;

  ProductoID?: number;

  PrecioSinIva?: number;

  PorcentajeGanancia?: number;

  EstadoDescuento?: boolean;

  PrecioVentaConDescuento?: number;

  PorcentajeGananciaDescuento?: number;

  PrecioSinIvaDescuento?: number;
}
