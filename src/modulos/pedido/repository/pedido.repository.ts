import { EntityRepository, Repository } from 'typeorm';
import { Pedido } from '../entidates/pedido.entity';

@EntityRepository(Pedido)
export class PedidoRepository extends Repository<Pedido> {}
