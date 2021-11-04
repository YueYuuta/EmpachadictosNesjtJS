import { MenuDetalleModel } from './menu-detalle';
export class MenuModel {
  Detalle: MenuDetalleModel[];

  CategoriaID: number;

  Descripcion: string;

  PrecioVenta: number;

  EstadoIva: boolean;

  EstadoPrecioVentaDinamico: boolean;

  Fecha: string;

  MenuID?: number;

  PrecioCompra?: number;

  PrecioSinIva?: number;

  PorcentajeGanancia?: number;

  Imagen?: string;
}
