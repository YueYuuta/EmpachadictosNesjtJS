import { LeerPedidoDto } from '@modulos/pedido/api/dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerMesaDto {
  @Expose()
  readonly MesaID: number;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly Fecha: string;

  @Expose()
  readonly PedidoID: number | null;

  @Expose()
  readonly Ocupado: boolean;

  @Expose()
  readonly AlmacenID: number;
}
