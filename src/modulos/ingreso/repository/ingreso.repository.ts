import { EntityRepository, Repository } from 'typeorm';
import { Ingreso } from '../entidates/ingreso.entity';

@EntityRepository(Ingreso)
export class IngresoRepository extends Repository<Ingreso> {}
