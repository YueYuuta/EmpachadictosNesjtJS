import { EntityRepository, Repository } from 'typeorm';
import { DespacharDetalle } from '../entidates/despachar-detalle.entity';

@EntityRepository(DespacharDetalle)
export class DespacharDetalleRepository extends Repository<DespacharDetalle> {}
