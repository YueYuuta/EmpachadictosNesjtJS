import { EntityRepository, Repository } from 'typeorm';
import { PedidoDetalle } from '../entidates/pedido-detalle.entity';

@EntityRepository(PedidoDetalle)
export class PedidoDetalleRepository extends Repository<PedidoDetalle> {}
