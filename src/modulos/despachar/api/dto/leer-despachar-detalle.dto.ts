import { LeerMenuDto } from '@modulos/menu/api/dto';
import { LeerProductoDto } from '@modulos/producto/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerDespacharDetalleDto {
  @Expose()
  readonly DespacharDetalleID: number;

  @Expose()
  @Type(type => LeerProductoDto)
  readonly ProductoID: LeerProductoDto;

  @Expose()
  readonly Cantidad: number;

  @Expose()
  readonly Observacion: string;

  @Expose()
  readonly EstadoDespachar: boolean;

  @Expose()
  readonly EstadoDespacharTipo: boolean;
}
