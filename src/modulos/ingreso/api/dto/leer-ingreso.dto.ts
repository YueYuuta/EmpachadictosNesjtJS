import { LeerAlmacenDto } from '@modulos/almacen/api/dto';
import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { LeerProveedorDto } from '@modulos/proveedor/api/dto';
import { TipoFactura } from '@utils/enums';
import { Exclude, Expose, Type } from 'class-transformer';

import { LeerIngresoDetalleDto } from './leer-ingreso-detalle.dto';

@Exclude()
export class LeerIngresoDto {
  @Expose()
  readonly IngresoID: number;

  @Expose()
  @Type(type => LeerIngresoDetalleDto)
  readonly Detalle: LeerIngresoDetalleDto[];

  @Expose()
  @Type(type => LeerProveedorDto)
  readonly ProveedorID: LeerProveedorDto;

  @Expose()
  @Type(type => LeerAlmacenDto)
  readonly AlmacenID: LeerAlmacenDto;

  @Expose()
  readonly Observacion: string;

  @Expose()
  readonly Fecha: string;

  @Expose()
  readonly TipoCompra: TipoFactura;

  @Expose()
  readonly TipoPago: tipoPago;

  @Expose()
  readonly Subtotal0: number;

  @Expose()
  readonly Subtotal12: number;

  @Expose()
  readonly Iva: number;

  @Expose()
  readonly Subtotal: number;

  @Expose()
  readonly Total: number;

  @Expose()
  readonly TotalCompra: number;
}
