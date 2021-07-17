import { LeerAlmacenDto } from '@modulos/almacen/api/dto';
import { LeerClienteDto } from '@modulos/cliente/api/dto';
import { LeerMesaDto } from '@modulos/mesa/api/dto';
import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { LeerUsuarioDto } from '@modulos/usuario/api/dto/leer-usuario.dto';
import { TipoFactura } from '@utils/enums';
import { Exclude, Expose, Type } from 'class-transformer';

import { LeerPedidoDetalleDto } from './leer-pedido-detalle.dto';

@Exclude()
export class LeerPedidoDto {
  @Expose()
  readonly PedidoID: number;

  @Expose()
  @Type(type => LeerPedidoDetalleDto)
  readonly Detalle: LeerPedidoDetalleDto[];

  @Expose()
  @Type(type => LeerUsuarioDto)
  readonly UsuarioID: LeerUsuarioDto;

  @Expose()
  @Type(type => LeerAlmacenDto)
  readonly AlmacenID: LeerAlmacenDto;

  @Expose()
  @Type(type => LeerClienteDto)
  readonly ClienteID: LeerClienteDto;

  @Expose()
  @Type(type => LeerMesaDto)
  readonly MesaID: LeerMesaDto;

  @Expose()
  readonly Observacion: string;

  @Expose()
  readonly Fecha: string;

  @Expose()
  readonly TipoFactura: TipoFactura;

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
