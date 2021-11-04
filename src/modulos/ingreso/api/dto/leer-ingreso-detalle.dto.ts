import { LeerProductoDto } from '@modulos/producto/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerIngresoDetalleDto {
  @Expose()
  readonly IngresoDetalleID: number;
  @Type(type => LeerProductoDto)
  readonly ProductoID: LeerProductoDto;
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
  readonly Lote: string;
  @Expose()
  readonly Descripcion: string;
  @Expose()
  readonly PrecioCompra: number;
  @Expose()
  readonly PorcentajeGanancia: number;
  @Expose()
  readonly EstadoIva: boolean;
}
