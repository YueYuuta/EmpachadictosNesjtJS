import { EntityRepository, Repository } from 'typeorm';
import { IngresoDetalle } from '../entidates/ingreso-detalle.entity';

@EntityRepository(IngresoDetalle)
export class IngresoDetalleRepository extends Repository<IngresoDetalle> {}
