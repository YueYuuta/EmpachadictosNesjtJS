import { LeerMenuDto } from '@modulos/menu/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerPedidoDetalleDto {
  @Expose()
  readonly PedidoDetalleID: number;

  @Expose()
  @Type(type => LeerMenuDto)
  readonly MenuID: LeerMenuDto;

  @Expose()
  readonly Cantidad: number;

  @Expose()
  readonly Total: number;
}
