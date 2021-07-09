import { LeerAlmacenDto } from '@modulos/almacen/api/dto';
import { LeerMesaDto } from '@modulos/mesa/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

import { LeerDespacharDetalleDto } from './leer-despachar-detalle.dto';

@Exclude()
export class LeerDespacharDto {
  @Expose()
  readonly DespacharID: number;

  @Expose()
  @Type(type => LeerDespacharDetalleDto)
  readonly Detalle: LeerDespacharDetalleDto[];

  @Expose()
  @Type(type => LeerMesaDto)
  readonly MesaID: LeerMesaDto;

  @Expose()
  @Type(type => LeerAlmacenDto)
  readonly AlmacenID: LeerAlmacenDto;

  @Expose()
  readonly EstadoDespachar: boolean;

  @Expose()
  readonly Tipo: string;

  @Expose()
  readonly Fecha: string;
}
