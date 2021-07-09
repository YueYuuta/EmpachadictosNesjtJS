import { PantallaEnum } from '@modulos/producto/entidates/pantalla.enum';

export class ProductoModel {
  Categoria: number;

  Descripcion: string;

  Pantalla: PantallaEnum;

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
