import { LeerMenuDto } from '@modulos/menu/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerPedidoDetalleDto {
  @Expose()
  @Type(type => LeerMenuDto)
  readonly MenuID: LeerMenuDto;

  @Expose()
  readonly MenuAlmacenID: number;

  @Expose()
  readonly PedidoDetalleID: number;

  @Expose()
  readonly Cantidad: number;

  @Expose()
  readonly Total: number;

  @Expose()
  readonly TotalsinIva: number;

  @Expose()
  readonly Iva: number;

  @Expose()
  readonly TotalIva: number;

  @Expose()
  readonly TotalCompra: number;

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
}
