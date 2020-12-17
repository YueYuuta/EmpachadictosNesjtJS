import { Exclude, Expose, Type } from 'class-transformer';

import { LeerMenuDetalleDto } from './leer-menu-detalle.dto';

@Exclude()
export class LeerMenuDto {
  @Expose()
  readonly MenuID: number;

  @Expose()
  @Type(type => LeerMenuDetalleDto)
  readonly Detalle: LeerMenuDetalleDto[];

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly PrecioCompra: number;

  @Expose()
  readonly PrecioSinIva: number;

  @Expose()
  readonly PrecioVenta: number;

  @Expose()
  readonly PorcentajeGanancia: number;

  @Expose()
  readonly EstadoIva: boolean;

  @Expose()
  readonly EstadoPrecioVentaDinamico: boolean;

  @Expose()
  readonly Imagen: string;

  @Expose()
  readonly Fecha: string;
}
